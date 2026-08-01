import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const HOST = '127.0.0.1';
const PREVIEW_PORT = 4174;
const DEBUG_PORT = 9333;
const BASE_URL = `http://${HOST}:${String(PREVIEW_PORT)}/`;
const EXPECTED_IMAGE_SLOT_IDS = Array.from(
  { length: 12 },
  (_, index) => `image-slot-${String(index + 1).padStart(2, '0')}`,
);

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function findChrome() {
  const candidates = [
    process.env['CHROME_PATH'],
    process.platform === 'win32'
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined,
    process.platform === 'win32'
      ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
      : undefined,
    process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : undefined,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
  ].filter(Boolean);

  const chromePath = candidates.find((candidate) => existsSync(candidate));
  if (!chromePath) throw new Error('Chrome was not found. Set CHROME_PATH and try again.');
  return chromePath;
}

async function waitForUrl(url, attempts = 80) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {
      // The process can take a moment to start listening.
    }
    await delay(100);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    if (this.socket.readyState === WebSocket.OPEN) return;
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(String(event.data));
      if (message.id) {
        const request = this.pending.get(message.id);
        if (!request) return;
        this.pending.delete(message.id);
        if (message.error) request.reject(new Error(message.error.message));
        else request.resolve(message.result);
        return;
      }

      const handlers = this.listeners.get(message.method) ?? [];
      handlers.forEach((handler) => handler(message.params));
    });
  }

  on(method, handler) {
    const handlers = this.listeners.get(method) ?? [];
    handlers.push(handler);
    this.listeners.set(method, handlers);
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.socket.close();
  }
}

async function run() {
  const workspace = process.cwd();
  const artifactsDirectory = await mkdtemp(join(tmpdir(), 'before-you-publish-qa-'));
  const chromeProfile = await mkdtemp(join(tmpdir(), 'before-you-publish-chrome-'));
  const viteExecutable = process.execPath;
  const viteEntry = join(workspace, 'node_modules', 'vite', 'bin', 'vite.js');
  const preview = spawn(
    viteExecutable,
    [viteEntry, 'preview', '--host', HOST, '--port', String(PREVIEW_PORT), '--strictPort'],
    { cwd: workspace, stdio: 'ignore' },
  );
  let chrome;
  let client;

  try {
    await waitForUrl(BASE_URL);
    chrome = spawn(
      findChrome(),
      [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        `--remote-debugging-port=${String(DEBUG_PORT)}`,
        `--user-data-dir=${chromeProfile}`,
        '--window-size=1440,900',
        BASE_URL,
      ],
      { stdio: 'ignore' },
    );

    await waitForUrl(`http://${HOST}:${String(DEBUG_PORT)}/json/list`);
    const targets = await (await fetch(`http://${HOST}:${String(DEBUG_PORT)}/json/list`)).json();
    const pageTarget = targets.find((target) => target.type === 'page');
    if (!pageTarget?.webSocketDebuggerUrl) throw new Error('Chrome page target was not found.');

    client = new CdpClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();
    await Promise.all([
      client.send('Page.enable'),
      client.send('Runtime.enable'),
      client.send('Log.enable'),
      client.send('Network.enable'),
    ]);

    const consoleErrors = [];
    const failedRequests = [];
    client.on('Runtime.exceptionThrown', (params) => {
      consoleErrors.push(params.exceptionDetails?.text ?? 'Unhandled runtime exception');
    });
    client.on('Log.entryAdded', (params) => {
      if (params.entry?.level === 'error') consoleErrors.push(params.entry.text);
    });
    client.on('Runtime.consoleAPICalled', (params) => {
      if (params.type === 'error') consoleErrors.push('console.error called');
    });
    client.on('Network.responseReceived', (params) => {
      if (params.response?.status >= 400) {
        failedRequests.push(`${String(params.response.status)} ${params.response.url}`);
      }
    });

    async function evaluate(expression) {
      const response = await client.send('Runtime.evaluate', {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
      if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
      return response.result?.value;
    }

    async function setViewport(width, height, mobile = false, deviceScaleFactor = 1) {
      await client.send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        screenWidth: width,
        screenHeight: height,
        deviceScaleFactor,
        mobile,
      });
      await client.send('Emulation.setTouchEmulationEnabled', { enabled: mobile });
    }

    async function navigate(url = BASE_URL) {
      await client.send('Page.navigate', { url });
      await delay(700);
    }

    async function screenshot(name) {
      const capture = await client.send('Page.captureScreenshot', {
        format: 'png',
        fromSurface: true,
        captureBeyondViewport: false,
      });
      const path = join(artifactsDirectory, name);
      await writeFile(path, Buffer.from(capture.data, 'base64'));
      return path;
    }

    async function scrollToSection(id) {
      await evaluate(`(() => {
        const target = document.getElementById(${JSON.stringify(id)});
        if (!target) return false;
        const root = document.documentElement;
        const previousBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);
        root.style.scrollBehavior = previousBehavior;
        return true;
      })()`);
    }

    async function scrollToSelector(selector, block = 'center') {
      await evaluate(`(() => {
        const target = document.querySelector(${JSON.stringify(selector)});
        if (!target) return false;
        const root = document.documentElement;
        const previousBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        target.scrollIntoView({ block: ${JSON.stringify(block)} });
        root.style.scrollBehavior = previousBehavior;
        return true;
      })()`);
    }

    async function readLanguageState() {
      return evaluate(`(() => {
        const group = document.querySelector('header [role="group"]');
        const buttons = group ? [...group.querySelectorAll('button[aria-pressed]')] : [];
        const activeIndex = buttons.findIndex(
          (button) => button.getAttribute('aria-pressed') === 'true',
        );
        const rect = group?.getBoundingClientRect();
        const style = group ? getComputedStyle(group) : null;
        let storedLocale = null;
        let structuredLanguage = null;

        try {
          storedLocale = window.localStorage.getItem('before-you-publish-locale');
        } catch {
          storedLocale = 'unavailable';
        }

        try {
          const structuredData = document.querySelector('script[type="application/ld+json"]');
          structuredLanguage = structuredData
            ? JSON.parse(structuredData.textContent ?? '{}').inLanguage ?? null
            : null;
        } catch {
          structuredLanguage = 'invalid';
        }

        return {
          activeLocale: activeIndex === 0 ? 'en' : activeIndex === 1 ? 'ru' : null,
          buttonCount: buttons.length,
          lang: document.documentElement.lang,
          ogLocale: document.querySelector('meta[property="og:locale"]')?.content ?? null,
          ogTitle: document.querySelector('meta[property="og:title"]')?.content ?? null,
          pressedCount: buttons.filter(
            (button) => button.getAttribute('aria-pressed') === 'true',
          ).length,
          storedLocale,
          structuredLanguage,
          switcherVisible: Boolean(
            rect &&
              style &&
              rect.width > 0 &&
              rect.height > 0 &&
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.right <= window.innerWidth &&
              rect.bottom <= window.innerHeight &&
              style.display !== 'none' &&
              style.visibility !== 'hidden' &&
              Number(style.opacity) > 0
          ),
          title: document.title,
          twitterTitle: document.querySelector('meta[name="twitter:title"]')?.content ?? null,
        };
      })()`);
    }

    async function selectLanguage(locale) {
      const buttonIndex = locale === 'en' ? 0 : 1;
      const clicked = await evaluate(`(() => {
        const group = document.querySelector('header [role="group"]');
        const buttons = group ? [...group.querySelectorAll('button[aria-pressed]')] : [];
        const button = buttons[${String(buttonIndex)}];
        if (!button) return false;
        button.click();
        return true;
      })()`);
      await delay(150);
      return clicked;
    }

    async function readThemeState() {
      return evaluate(`(() => {
        const root = document.documentElement;
        const trigger = document.querySelector('[data-theme-trigger]');
        const triggerRect = trigger?.getBoundingClientRect();
        const triggerStyle = trigger ? getComputedStyle(trigger) : null;
        let storedTheme = null;

        try {
          storedTheme = localStorage.getItem('before-you-publish-theme');
        } catch {
          storedTheme = 'unavailable';
        }

        return {
          colorScheme: getComputedStyle(root).colorScheme,
          gameAnimation: getComputedStyle(document.querySelector('.cozy-guide'), '::before')
            .animationName,
          metaColorScheme: document.querySelector('meta[name="color-scheme"]')?.content ?? null,
          metaThemeColor: document.querySelector('meta[name="theme-color"]')?.content ?? null,
          storedTheme,
          theme: root.dataset.theme ?? null,
          triggerExpanded: trigger?.getAttribute('aria-expanded') ?? null,
          triggerVisible: Boolean(
            triggerRect &&
              triggerStyle &&
              triggerRect.width > 0 &&
              triggerRect.height > 0 &&
              triggerRect.left >= 0 &&
              triggerRect.right <= window.innerWidth &&
              triggerStyle.visibility !== 'hidden'
          ),
        };
      })()`);
    }

    async function selectTheme(theme) {
      const opened = await evaluate(`(() => {
        const trigger = document.querySelector('[data-theme-trigger]');
        if (!trigger) return false;
        trigger.click();
        return true;
      })()`);
      if (!opened) return false;
      await delay(80);
      const clicked = await evaluate(`(() => {
        const option = document.querySelector(
          '[data-theme-option=${JSON.stringify(theme)}]',
        );
        if (!option) return false;
        option.click();
        return true;
      })()`);
      await delay(250);
      return clicked;
    }

    async function readViewportState(width) {
      return evaluate(`(() => {
        const root = document.documentElement;
        const bodyScrollWidth = document.body?.scrollWidth ?? 0;
        const scrollWidth = Math.max(root.scrollWidth, bodyScrollWidth);
        return {
          width: ${String(width)},
          scrollWidth,
          rootScrollWidth: root.scrollWidth,
          bodyScrollWidth,
          clientWidth: root.clientWidth,
          scrollX: window.scrollX,
          visualOffsetLeft: window.visualViewport?.offsetLeft ?? 0,
          overflow: scrollWidth > root.clientWidth,
          h1Count: document.querySelectorAll('h1').length,
          lang: root.lang,
        };
      })()`);
    }

    async function readRiskMeterClearance(sectionId) {
      return evaluate(`(() => {
        const section = document.getElementById(${JSON.stringify(sectionId)});
        const content = section?.firstElementChild;
        const meter = document.querySelector('[data-active-risk-band] ol');
        const contentRect = content?.getBoundingClientRect();
        const meterRect = meter?.getBoundingClientRect();
        const clearance =
          contentRect && meterRect ? meterRect.left - contentRect.right : null;

        return {
          sectionPaddingRight: section ? getComputedStyle(section).paddingRight : null,
          contentRight: contentRect?.right ?? null,
          meterLeft: meterRect?.left ?? null,
          clearance,
          overlaps: clearance !== null ? clearance < 0 : true,
        };
      })()`);
    }

    async function readInspectionState() {
      return evaluate(`(() => {
        const content = document.querySelector('[data-inspection-content]');
        return {
          clientHeight: content?.clientHeight ?? null,
          scrollHeight: content?.scrollHeight ?? null,
          clipped: content ? content.scrollHeight > content.clientHeight : true,
        };
      })()`);
    }

    async function readStatementLayoutState(sectionId) {
      return evaluate(`(() => {
        const section = document.getElementById(${JSON.stringify(sectionId)});
        const statement = section?.querySelector('[data-section-statement]');
        const text = statement?.querySelector('[data-section-statement-text]');
        const sources = statement?.querySelector('[data-section-statement-sources]');
        if (!statement || !text || !sources) return { found: false };

        const rectFor = (element) => {
          const rect = element.getBoundingClientRect();
          return {
            bottom: rect.bottom,
            height: rect.height,
            left: rect.left,
            right: rect.right,
            top: rect.top,
            width: rect.width,
          };
        };
        const intersects = (first, second) =>
          first.left < second.right - 0.5 &&
          first.right > second.left + 0.5 &&
          first.top < second.bottom - 0.5 &&
          first.bottom > second.top + 0.5;
        const statementRect = rectFor(statement);
        const textRect = rectFor(text);
        const sourceRect = rectFor(sources);
        const linkRects = [...sources.querySelectorAll('a')].map(rectFor);
        const linkCollisions = linkRects.some((rect, index) =>
          linkRects.slice(index + 1).some((other) => intersects(rect, other)),
        );
        const linksClipped = linkRects.some(
          (rect) =>
            rect.left < statementRect.left - 1 ||
            rect.right > statementRect.right + 1 ||
            rect.top < statementRect.top - 1 ||
            rect.bottom > statementRect.bottom + 1,
        );
        const expectedReadableWidth = Math.min(240, statementRect.width - 40);

        return {
          found: true,
          linkCollisions,
          linksClipped,
          linkCount: linkRects.length,
          sourceOverlapsText: intersects(sourceRect, textRect),
          sourcesBelowText: sourceRect.top >= textRect.bottom - 1,
          statementWidth: statementRect.width,
          textTooNarrow: textRect.width < expectedReadableWidth,
          textWidth: textRect.width,
        };
      })()`);
    }

    async function readEscalationLayoutState() {
      return evaluate(`(() => {
        const sticky = document.querySelector('#risk-escalation [data-escalation-sticky]');
        const disclaimer = document.querySelector(
          '#risk-escalation [data-escalation-disclaimer]',
        );
        if (!sticky || !disclaimer) return { found: false, overlaps: true };
        const stickyRect = sticky.getBoundingClientRect();
        const disclaimerRect = disclaimer.getBoundingClientRect();
        const overlaps =
          stickyRect.left < disclaimerRect.right &&
          stickyRect.right > disclaimerRect.left &&
          stickyRect.top < disclaimerRect.bottom &&
          stickyRect.bottom > disclaimerRect.top;
        return {
          found: true,
          clearance: disclaimerRect.top - stickyRect.bottom,
          disclaimerTop: disclaimerRect.top,
          overlaps,
          stickyBottom: stickyRect.bottom,
        };
      })()`);
    }

    async function loadAndReadImageSlots() {
      await evaluate(`(() => {
        document.querySelectorAll('#blind-spots article button[aria-expanded="false"]').forEach(
          (button) => button.click(),
        );
      })()`);
      await delay(200);
      const slotIds = await evaluate(
        `[...document.querySelectorAll('[data-image-slot]')].map((slot) => slot.dataset.imageSlot)`,
      );
      for (const slotId of slotIds) {
        await scrollToSelector(`[data-image-slot="${slotId}"]`);
        await delay(180);
      }
      await delay(300);
      return evaluate(`(() => {
        const slots = [...document.querySelectorAll('[data-image-slot]')];
        const states = slots.map((slot) => {
          const image = slot.querySelector('img');
          return {
            alt: image?.getAttribute('alt') ?? null,
            ariaHidden: image?.getAttribute('aria-hidden') ?? null,
            currentSrc: image?.currentSrc ?? null,
            id: slot.dataset.imageSlot ?? null,
            loading: image?.loading ?? null,
            naturalHeight: image?.naturalHeight ?? 0,
            naturalWidth: image?.naturalWidth ?? 0,
            sizes: image?.sizes ?? null,
            status: slot.dataset.imageStatus ?? null,
            srcset: image?.srcset ?? null,
          };
        });
        const ids = states.map((state) => state.id).sort();
        return {
          count: states.length,
          failed: states.filter(
            (state) =>
              state.status !== 'loaded' ||
              state.naturalWidth <= 0 ||
              state.naturalHeight <= 0 ||
              !state.currentSrc?.endsWith('.webp') ||
              !state.alt?.trim() ||
              (state.ariaHidden !== null && state.ariaHidden !== 'false') ||
              state.loading !== 'lazy' ||
              !state.srcset?.includes('800w') ||
              !state.srcset?.includes('1600w') ||
              !state.sizes?.trim(),
          ),
          ids,
          responsiveCandidateCount: states.filter((state) =>
            state.currentSrc?.includes('-800.webp'),
          ).length,
          states,
        };
      })()`);
    }

    async function readImageCaptionCopy(expectedShownLabel, expectedTakeawayLabel) {
      return evaluate(`(() => {
        const captions = [...document.querySelectorAll('[data-image-caption]')];
        const states = captions.map((caption) => {
          const paragraphs = [...caption.querySelectorAll('p')];
          const shownLabel = paragraphs[0]?.querySelector('span');
          const takeawayLabel = paragraphs[1]?.querySelector('span');
          return {
            paragraphCount: paragraphs.length,
            shownLabel: shownLabel?.textContent?.replace(/:$/u, '').trim() ?? '',
            shownText: paragraphs[0]?.textContent?.replace(shownLabel?.textContent ?? '', '').trim() ?? '',
            takeawayLabel: takeawayLabel?.textContent?.replace(/:$/u, '').trim() ?? '',
            takeawayText:
              paragraphs[1]?.textContent?.replace(takeawayLabel?.textContent ?? '', '').trim() ?? '',
          };
        });
        return {
          count: states.length,
          failed: states.filter(
            (state) =>
              state.paragraphCount !== 2 ||
              state.shownLabel !== ${JSON.stringify(expectedShownLabel)} ||
              state.takeawayLabel !== ${JSON.stringify(expectedTakeawayLabel)} ||
              !state.shownText ||
              !state.takeawayText,
          ),
          states,
        };
      })()`);
    }

    async function readImageFileAssets() {
      return evaluate(`(async () => {
        const images = [...document.querySelectorAll('[data-image-slot] img')];
        const urls = [
          ...new Set(
            images.flatMap((image) =>
              image.srcset
                .split(',')
                .map((candidate) => candidate.trim().split(/\\s+/)[0])
                .filter(Boolean)
                .map((candidate) => new URL(candidate, window.location.href).href),
            ),
          ),
        ].sort();
        const files = await Promise.all(
          urls.map(async (url) => {
            try {
              const response = await fetch(url);
              if (!response.ok) return { ok: false, status: response.status, url };
              const blob = await response.blob();
              const bitmap = await createImageBitmap(blob);
              const result = {
                expectedSize: url.includes('-800.webp') ? 800 : 1600,
                height: bitmap.height,
                mimeType: blob.type,
                ok: true,
                url,
                width: bitmap.width,
              };
              bitmap.close();
              return result;
            } catch (error) {
              return { error: String(error), ok: false, url };
            }
          }),
        );
        return {
          count: files.length,
          failed: files.filter(
            (file) =>
              !file.ok ||
              file.mimeType !== 'image/webp' ||
              file.width !== file.expectedSize ||
              file.height !== file.expectedSize,
          ),
          files,
        };
      })()`);
    }

    async function testImageFallback() {
      return evaluate(`new Promise((resolve) => {
        const figure = document.querySelector('[data-image-slot]');
        const image = figure?.querySelector('img');
        const fallback = figure?.querySelector('[data-image-fallback]');
        if (!figure || !image || !fallback) {
          resolve({ found: false });
          return;
        }
        const readState = () => {
          const caption = figure.querySelector('figcaption');
          resolve({
            alt: image.getAttribute('alt'),
            ariaHidden: image.getAttribute('aria-hidden'),
            caption: caption?.textContent?.trim() ?? '',
            fallbackVisibility: getComputedStyle(fallback).visibility,
            found: true,
            status: figure.dataset.imageStatus ?? null,
          });
        };
        image.addEventListener('error', () => setTimeout(readState, 50), { once: true });
        image.removeAttribute('srcset');
        image.removeAttribute('sizes');
        image.src = 'data:image/webp;base64,AAAA';
        setTimeout(readState, 1000);
      })`);
    }

    async function readGameLayerCopy() {
      return evaluate(`(() => {
        const quest = document.querySelector('[data-release-quest]');
        const simulator = document.querySelector('[data-release-simulator]');
        return {
          questFound: Boolean(quest),
          questStepCount: quest?.querySelectorAll('[data-quest-step]').length ?? 0,
          questActiveCount: quest?.querySelectorAll('[data-quest-state="active"]').length ?? 0,
          questText: quest?.textContent?.trim() ?? '',
          simulatorFound: Boolean(simulator),
          simulatorCardCount: simulator?.querySelectorAll('[data-decision-card]').length ?? 0,
          simulatorText: simulator?.textContent?.trim() ?? '',
        };
      })()`);
    }

    async function testReleaseSimulator() {
      const readState = () =>
        evaluate(`(() => {
          const simulator = document.querySelector('[data-release-simulator]');
          const result = simulator?.querySelector('[role="status"]');
          return {
            collectedCount: Number(simulator?.getAttribute('data-collected-count') ?? -1),
            complete: Boolean(simulator?.querySelector('[data-deck-complete]')),
            collectedCards: simulator?.querySelectorAll('[data-card-collected="true"]').length ?? 0,
            resultText: result?.textContent?.trim() ?? '',
            stored: localStorage.getItem('before-you-publish-field-deck-v1'),
          };
        })()`);

      const initial = await readState();
      await evaluate(`document.querySelector('[data-decision-option="publish"]')?.click()`);
      await delay(100);
      const riskyAnswer = await readState();

      for (const [decisionId, optionId] of [
        ['toolbox-model', 'full-inspection'],
        ['ai-poster', 'rebuild'],
        ['ip-lookalike', 'redesign'],
      ]) {
        await evaluate(`document.querySelector('[data-decision-card="${decisionId}"]')?.click()`);
        await evaluate(`document.querySelector('[data-decision-option="${optionId}"]')?.click()`);
        await delay(100);
      }

      const complete = await readState();
      await scrollToSelector('[data-release-simulator]');
      await delay(250);
      const completeScreenshot = await screenshot('desktop-release-simulator-complete.png');
      await client.send('Page.reload', { ignoreCache: true });
      await delay(700);
      const persisted = await readState();
      await evaluate(`document.querySelector('[data-deck-reset]')?.click()`);
      await delay(100);
      const reset = await readState();

      return { initial, riskyAnswer, complete, persisted, reset, completeScreenshot };
    }

    await setViewport(1440, 900, false);
    await navigate();
    const lightThemeDefault = await readThemeState();
    const darkThemeClicked = await selectTheme('dark');
    const darkTheme = await readThemeState();
    const darkThemeScreenshot = await screenshot('desktop-theme-dark.png');
    await client.send('Page.reload', { ignoreCache: true });
    await delay(700);
    const darkThemePersisted = await readThemeState();
    const gameThemeClicked = await selectTheme('game');
    const gameTheme = await readThemeState();
    const gameThemeScreenshot = await screenshot('desktop-theme-game.png');
    await setViewport(390, 844, true);
    await navigate(`${BASE_URL}?qa-theme=game`);
    const gameThemeMobile = await readThemeState();
    const gameThemeMobileViewport = await readViewportState(390);
    await evaluate("document.querySelector('[data-theme-trigger]')?.click()");
    await delay(150);
    const gameThemeMobileMenuViewport = await readViewportState(390);
    const gameThemeMobileMenu = await screenshot('mobile-theme-game-menu.png');
    await client.send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'Escape',
      code: 'Escape',
    });
    await client.send('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'Escape',
      code: 'Escape',
    });
    await delay(100);
    await setViewport(1440, 900, false);
    const lightThemeClicked = await selectTheme('light');
    const lightThemeRestored = await readThemeState();
    const englishDefault = await readLanguageState();
    const russianSwitchClicked = await selectLanguage('ru');
    const russianAfterSwitch = await readLanguageState();

    await navigate(`${BASE_URL}?qa-locale=ru#sources`);
    const russianAfterNavigate = await readLanguageState();
    await client.send('Page.reload', { ignoreCache: true });
    await delay(700);
    const russianAfterReload = await readLanguageState();

    const russianViewportResults = [];
    let russianMobileHero;
    let russianMobileMenu;
    let russianMobileInspection;
    let russianInspectionState;
    let russianDesktopHero;
    let russianBlindSpots;
    let russianPolicyStatement;
    let russianPolicyStatementLayout;
    let russianHighRisk;
    let russianHighRiskLayout;
    let russianCaptionAudit;
    let russianGameLayer;
    for (const width of [320, 360, 390, 768, 1440]) {
      await setViewport(width, width < 768 ? 844 : 900, width < 768);
      await navigate(`${BASE_URL}?qa-locale=ru&viewport=${String(width)}`);
      russianViewportResults.push({
        ...(await readViewportState(width)),
        language: await readLanguageState(),
      });
      if (width === 390) {
        russianMobileHero = await screenshot('mobile-ru-hero.png');
        await evaluate("document.querySelector('header button[aria-haspopup=dialog]')?.click()");
        await delay(150);
        russianMobileMenu = await screenshot('mobile-ru-menu.png');
        await client.send('Input.dispatchKeyEvent', {
          type: 'keyDown',
          key: 'Escape',
          code: 'Escape',
        });
        await client.send('Input.dispatchKeyEvent', {
          type: 'keyUp',
          key: 'Escape',
          code: 'Escape',
        });
        await delay(150);
        await evaluate(`(() => {
          const target = document.querySelector('[data-hero-inspection]');
          const root = document.documentElement;
          const previousBehavior = root.style.scrollBehavior;
          root.style.scrollBehavior = 'auto';
          target?.scrollIntoView({ block: 'center' });
          root.style.scrollBehavior = previousBehavior;
        })()`);
        await delay(250);
        russianInspectionState = await readInspectionState();
        russianMobileInspection = await screenshot('mobile-ru-inspection.png');
      }
      if (width === 1440) {
        russianCaptionAudit = await readImageCaptionCopy('ЧТО ПОКАЗАНО', 'СУТЬ');
        russianGameLayer = await readGameLayerCopy();
        russianDesktopHero = await screenshot('desktop-ru-hero.png');
        await scrollToSection('blind-spots');
        await delay(700);
        russianBlindSpots = await screenshot('desktop-ru-blind-spots.png');
        await scrollToSelector('#policy-layers [data-section-statement]');
        await delay(350);
        russianPolicyStatementLayout = await readStatementLayoutState('policy-layers');
        russianPolicyStatement = await screenshot('desktop-ru-policy-statement.png');
        await scrollToSection('high-risk');
        await delay(700);
        russianHighRiskLayout = await readRiskMeterClearance('high-risk');
        russianHighRisk = await screenshot('desktop-ru-high-risk.png');
      }
    }

    const englishSwitchClicked = await selectLanguage('en');
    const englishRestored = await readLanguageState();

    const viewportResults = [];
    for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
      await setViewport(width, width < 768 ? 844 : 900, width < 768);
      await navigate();
      viewportResults.push(await readViewportState(width));
    }

    await setViewport(1440, 900, false);
    await navigate();
    const englishCaptionAudit = await readImageCaptionCopy('WHAT IT SHOWS', 'THE POINT');
    const englishGameLayer = await readGameLayerCopy();
    const auditChunkDeferred = await evaluate(
      "!performance.getEntriesByType('resource').some((entry) => entry.name.includes('/assets/AuditPanel-'))",
    );
    const exampleImagesDeferred = await evaluate(
      "!performance.getEntriesByType('resource').some((entry) => entry.name.includes('/examples/generated/'))",
    );
    const desktopHero = await screenshot('desktop-hero.png');
    await scrollToSelector('[data-release-quest]');
    await delay(250);
    const releaseQuest = await screenshot('desktop-release-quest.png');
    await scrollToSection('blind-spots');
    await delay(700);
    const blindSpots = await screenshot('desktop-blind-spots.png');
    await evaluate("document.querySelector('#blind-spots article button')?.click()");
    await delay(250);
    const scenarioExpanded = await evaluate(
      "document.querySelector('#blind-spots article button')?.getAttribute('aria-expanded')",
    );
    const scenarioDossier = await screenshot('desktop-scenario-dossier.png');
    const imageSlotAudit = await loadAndReadImageSlots();
    const imageFileAudit = await readImageFileAssets();
    const imageFallbackAudit = await testImageFallback();
    await setViewport(1440, 900, false, 2);
    await navigate(`${BASE_URL}?qa-density=2`);
    const imageSlotHighDensityAudit = await loadAndReadImageSlots();
    await setViewport(1440, 900, false, 1);
    await navigate(`${BASE_URL}?qa-density=1`);
    await loadAndReadImageSlots();
    await scrollToSelector('[data-image-slot="image-slot-03"]');
    await delay(300);
    const aiPosterComparison = await screenshot('desktop-ai-poster-comparison.png');
    await scrollToSelector('[data-image-slot="image-slot-05"]');
    await delay(300);
    const characterComparison = await screenshot('desktop-character-comparison.png');
    await scrollToSelector('[data-image-slot="image-slot-06"]');
    await delay(300);
    const ipLookalikeComparison = await screenshot('desktop-ip-lookalike-comparison.png');
    const releaseSimulatorAudit = await testReleaseSimulator();
    await scrollToSelector('#blind-spots [data-section-statement]');
    await delay(300);
    const blindSpotsStatementLayout = await readStatementLayoutState('blind-spots');
    const blindSpotsStatement = await screenshot('desktop-blind-spots-statement.png');
    await scrollToSelector('#risk-escalation [data-escalation-disclaimer]');
    await delay(300);
    const escalationLayout = await readEscalationLayoutState();
    const escalationBottom = await screenshot('desktop-escalation-bottom.png');
    await scrollToSection('high-risk');
    await delay(700);
    const highRiskBand = await evaluate(
      "document.querySelector('[data-active-risk-band]')?.getAttribute('data-active-risk-band')",
    );
    const highRiskLayout = await readRiskMeterClearance('high-risk');
    const highRisk = await screenshot('desktop-high-risk.png');

    await setViewport(390, 844, true);
    await navigate();
    const mobileHero = await screenshot('mobile-hero.png');
    await scrollToSelector('[data-release-quest]');
    await delay(250);
    const mobileReleaseQuest = await screenshot('mobile-release-quest.png');
    await evaluate("document.querySelector('header button[aria-haspopup=dialog]')?.click()");
    await delay(150);
    const mobileMenu = await screenshot('mobile-menu.png');
    const menuOpened = await evaluate("Boolean(document.querySelector('[role=dialog]'))");
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
    await delay(150);
    const menuClosed = await evaluate("!document.querySelector('[role=dialog]')");
    await evaluate(`(() => {
      const target = document.querySelector('[data-hero-inspection]');
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      target?.scrollIntoView({ block: 'center' });
      root.style.scrollBehavior = previousBehavior;
    })()`);
    await delay(250);
    const englishInspectionState = await readInspectionState();
    const mobileInspection = await screenshot('mobile-inspection.png');
    await scrollToSection('blind-spots');
    await evaluate(
      `document.querySelector('[data-scenario-id="stylized-characters"] button')?.click()`,
    );
    await delay(200);
    await scrollToSelector('[data-image-slot="image-slot-05"]');
    await delay(300);
    const mobileCharacterComparison = await screenshot('mobile-character-comparison.png');
    await scrollToSelector('[data-release-simulator]');
    await delay(300);
    const mobileReleaseSimulator = await screenshot('mobile-release-simulator.png');
    await scrollToSelector('#policy-layers [data-section-statement]');
    await delay(300);
    const mobilePolicyStatementLayout = await readStatementLayoutState('policy-layers');
    const mobilePolicyStatement = await screenshot('mobile-policy-statement.png');

    await scrollToSection('audit');
    await delay(900);
    const auditChunkLoaded = await evaluate(
      "performance.getEntriesByType('resource').some((entry) => entry.name.includes('/assets/AuditPanel-'))",
    );
    for (let index = 0; index < 12; index += 1) {
      await evaluate("document.querySelector('#audit input[value=reviewed]')?.click()");
      if (index < 11) {
        await evaluate(`(() => {
          const buttons = [...document.querySelectorAll('#audit button')];
          buttons.find((button) => button.textContent?.includes('Next question'))?.click();
        })()`);
      }
      await delay(60);
    }
    await evaluate(`(() => {
      const buttons = [...document.querySelectorAll('#audit button')];
      buttons.find((button) => button.textContent?.includes('See audit result'))?.click();
    })()`);
    await delay(250);
    const auditOutcome = await evaluate(
      "document.querySelector('#audit-result-title')?.textContent",
    );
    const mobileAudit = await screenshot('mobile-audit-result.png');

    await client.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    });
    await navigate();
    const reducedMotion = await evaluate(
      "getComputedStyle(document.documentElement).scrollBehavior === 'auto'",
    );

    const linkAudit = await evaluate(`(() => {
      const local = [...document.querySelectorAll('a[href^="#"]')];
      const missingLocalTargets = local
        .map((link) => link.getAttribute('href')?.slice(1))
        .filter((id) => id && !document.getElementById(id));
      const unsafeExternalLinks = [...document.querySelectorAll('a[target="_blank"]')]
        .filter((link) => !link.relList.contains('noopener') || !link.relList.contains('noreferrer'))
        .map((link) => link.href);
      const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
      const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
      return { missingLocalTargets, unsafeExternalLinks, duplicateIds };
    })()`);

    const statementLayoutPasses = (state) =>
      state?.found === true &&
      state.linkCount > 0 &&
      state.linkCollisions === false &&
      state.linksClipped === false &&
      state.sourceOverlapsText === false &&
      state.sourcesBelowText === true &&
      state.textTooNarrow === false;

    const passCriteria = {
      themeSwitcher:
        lightThemeDefault.theme === 'light' &&
        lightThemeDefault.storedTheme === null &&
        lightThemeDefault.colorScheme === 'light' &&
        lightThemeDefault.metaColorScheme === 'light' &&
        lightThemeDefault.metaThemeColor === '#f7f0e3' &&
        lightThemeDefault.triggerVisible &&
        darkThemeClicked &&
        darkTheme.theme === 'dark' &&
        darkTheme.storedTheme === 'dark' &&
        darkTheme.colorScheme === 'dark' &&
        darkTheme.metaColorScheme === 'dark' &&
        darkTheme.metaThemeColor === '#101713' &&
        darkThemePersisted.theme === 'dark' &&
        darkThemePersisted.storedTheme === 'dark' &&
        gameThemeClicked &&
        gameTheme.theme === 'game' &&
        gameTheme.storedTheme === 'game' &&
        gameTheme.colorScheme === 'dark' &&
        gameTheme.metaThemeColor === '#070914' &&
        gameTheme.gameAnimation === 'game-grid-drift' &&
        gameThemeMobile.theme === 'game' &&
        gameThemeMobile.triggerVisible &&
        !gameThemeMobileViewport.overflow &&
        gameThemeMobileMenuViewport.scrollX === 0 &&
        gameThemeMobileMenuViewport.visualOffsetLeft === 0 &&
        lightThemeClicked &&
        lightThemeRestored.theme === 'light' &&
        lightThemeRestored.storedTheme === 'light',
      languageSwitcherVisible:
        englishDefault.switcherVisible &&
        russianAfterSwitch.switcherVisible &&
        russianViewportResults.every((result) => result.language.switcherVisible) &&
        englishRestored.switcherVisible,
      englishDefault:
        englishDefault.lang === 'en' &&
        englishDefault.activeLocale === 'en' &&
        englishDefault.pressedCount === 1 &&
        englishDefault.buttonCount === 2 &&
        englishDefault.storedLocale === null &&
        englishDefault.ogLocale === 'en_US' &&
        englishDefault.ogTitle === englishDefault.title &&
        englishDefault.twitterTitle === englishDefault.title &&
        englishDefault.structuredLanguage === 'en' &&
        Boolean(englishDefault.title.trim()),
      russianSwitch:
        russianSwitchClicked &&
        russianAfterSwitch.lang === 'ru' &&
        russianAfterSwitch.activeLocale === 'ru' &&
        russianAfterSwitch.pressedCount === 1 &&
        russianAfterSwitch.storedLocale === 'ru' &&
        russianAfterSwitch.ogLocale === 'ru_RU' &&
        russianAfterSwitch.ogTitle === russianAfterSwitch.title &&
        russianAfterSwitch.twitterTitle === russianAfterSwitch.title &&
        russianAfterSwitch.structuredLanguage === 'ru' &&
        Boolean(russianAfterSwitch.title.trim()) &&
        russianAfterSwitch.title !== englishDefault.title,
      russianPersistence: [russianAfterNavigate, russianAfterReload].every(
        (state) =>
          state.lang === 'ru' &&
          state.activeLocale === 'ru' &&
          state.pressedCount === 1 &&
          state.storedLocale === 'ru' &&
          state.ogLocale === 'ru_RU' &&
          state.structuredLanguage === 'ru' &&
          state.title === russianAfterSwitch.title,
      ),
      russianViewports: russianViewportResults.every(
        (result) =>
          !result.overflow &&
          result.scrollX === 0 &&
          result.visualOffsetLeft === 0 &&
          result.lang === 'ru' &&
          result.h1Count === 1 &&
          result.language.activeLocale === 'ru' &&
          result.language.pressedCount === 1,
      ),
      russianHighRiskLayout: Boolean(russianHighRiskLayout && !russianHighRiskLayout.overlaps),
      russianPolicyStatement: statementLayoutPasses(russianPolicyStatementLayout),
      russianInspection: Boolean(russianInspectionState && !russianInspectionState.clipped),
      russianImageCaptions:
        russianCaptionAudit?.count === 12 && russianCaptionAudit.failed.length === 0,
      russianGameLayer:
        russianGameLayer?.questFound === true &&
        russianGameLayer.questStepCount === 4 &&
        russianGameLayer.questActiveCount === 1 &&
        russianGameLayer.questText.includes('ПУТЬ К РЕЛИЗУ') &&
        russianGameLayer.simulatorFound === true &&
        russianGameLayer.simulatorCardCount === 3 &&
        russianGameLayer.simulatorText.includes('СИМУЛЯТОР РЕЛИЗА'),
      englishRestored:
        englishSwitchClicked &&
        englishRestored.lang === 'en' &&
        englishRestored.activeLocale === 'en' &&
        englishRestored.pressedCount === 1 &&
        englishRestored.storedLocale === 'en' &&
        englishRestored.ogLocale === 'en_US' &&
        englishRestored.structuredLanguage === 'en' &&
        englishRestored.title === englishDefault.title,
      englishViewports: viewportResults.every(
        (result) =>
          !result.overflow &&
          result.scrollX === 0 &&
          result.visualOffsetLeft === 0 &&
          result.h1Count === 1 &&
          result.lang === 'en',
      ),
      scenarioExpanded: scenarioExpanded === 'true',
      imageSlots:
        imageSlotAudit.count === 12 &&
        imageSlotAudit.failed.length === 0 &&
        imageSlotAudit.responsiveCandidateCount === 12 &&
        JSON.stringify(imageSlotAudit.ids) === JSON.stringify(EXPECTED_IMAGE_SLOT_IDS),
      imageSlotHighDensity:
        imageSlotHighDensityAudit.count === 12 &&
        imageSlotHighDensityAudit.failed.length === 0 &&
        imageSlotHighDensityAudit.responsiveCandidateCount === 0 &&
        JSON.stringify(imageSlotHighDensityAudit.ids) === JSON.stringify(EXPECTED_IMAGE_SLOT_IDS),
      imageFiles: imageFileAudit.count === 24 && imageFileAudit.failed.length === 0,
      englishImageCaptions:
        englishCaptionAudit.count === 12 && englishCaptionAudit.failed.length === 0,
      englishGameLayer:
        englishGameLayer.questFound === true &&
        englishGameLayer.questStepCount === 4 &&
        englishGameLayer.questActiveCount === 1 &&
        englishGameLayer.questText.includes('RELEASE QUEST') &&
        englishGameLayer.simulatorFound === true &&
        englishGameLayer.simulatorCardCount === 3 &&
        englishGameLayer.simulatorText.includes('RELEASE SIMULATOR'),
      releaseSimulator:
        releaseSimulatorAudit.initial.collectedCount === 0 &&
        releaseSimulatorAudit.riskyAnswer.collectedCount === 0 &&
        releaseSimulatorAudit.riskyAnswer.resultText.length > 0 &&
        releaseSimulatorAudit.complete.collectedCount === 3 &&
        releaseSimulatorAudit.complete.collectedCards === 3 &&
        releaseSimulatorAudit.complete.complete === true &&
        releaseSimulatorAudit.persisted.collectedCount === 3 &&
        releaseSimulatorAudit.persisted.complete === true &&
        releaseSimulatorAudit.reset.collectedCount === 0 &&
        releaseSimulatorAudit.reset.collectedCards === 0 &&
        releaseSimulatorAudit.reset.complete === false &&
        releaseSimulatorAudit.reset.stored === '[]',
      imageFallback:
        imageFallbackAudit.found === true &&
        imageFallbackAudit.status === 'missing' &&
        imageFallbackAudit.alt === '' &&
        imageFallbackAudit.ariaHidden === 'true' &&
        imageFallbackAudit.caption.length > 0 &&
        imageFallbackAudit.fallbackVisibility === 'visible',
      exampleImagesDeferred,
      blindSpotsStatement: statementLayoutPasses(blindSpotsStatementLayout),
      mobilePolicyStatement: statementLayoutPasses(mobilePolicyStatementLayout),
      escalationLayout:
        escalationLayout.found === true &&
        escalationLayout.overlaps === false &&
        escalationLayout.clearance >= 0,
      highRiskBand: highRiskBand === 'high-risk',
      highRiskLayout: !highRiskLayout.overlaps,
      englishInspection: !englishInspectionState.clipped,
      menuOpened,
      menuClosed,
      auditChunkDeferred,
      auditChunkLoaded,
      englishAuditOutcome: auditOutcome?.trim() === 'LOWER RISK PROFILE',
      reducedMotion,
      consoleErrors: consoleErrors.length === 0,
      failedRequests: failedRequests.length === 0,
      localLinks: linkAudit.missingLocalTargets.length === 0,
      externalLinks: linkAudit.unsafeExternalLinks.length === 0,
      duplicateIds: linkAudit.duplicateIds.length === 0,
    };
    const report = {
      passed: Object.values(passCriteria).every(Boolean),
      passCriteria,
      localization: {
        englishDefault,
        russianSwitchClicked,
        russianAfterSwitch,
        russianAfterNavigate,
        russianAfterReload,
        russianViewportResults,
        russianHighRiskLayout,
        russianPolicyStatementLayout,
        russianInspectionState,
        russianCaptionAudit,
        russianGameLayer,
        englishSwitchClicked,
        englishRestored,
      },
      themes: {
        lightThemeDefault,
        darkThemeClicked,
        darkTheme,
        darkThemePersisted,
        gameThemeClicked,
        gameTheme,
        gameThemeMobile,
        gameThemeMobileViewport,
        gameThemeMobileMenuViewport,
        lightThemeClicked,
        lightThemeRestored,
      },
      viewportResults,
      interactions: {
        scenarioExpanded,
        imageSlotAudit,
        imageSlotHighDensityAudit,
        imageFileAudit,
        imageFallbackAudit,
        englishCaptionAudit,
        englishGameLayer,
        releaseSimulatorAudit,
        exampleImagesDeferred,
        blindSpotsStatementLayout,
        mobilePolicyStatementLayout,
        escalationLayout,
        highRiskBand,
        highRiskLayout,
        englishInspectionState,
        menuOpened,
        menuClosed,
        auditChunkDeferred,
        auditChunkLoaded,
        auditOutcome,
        reducedMotion,
      },
      consoleErrors,
      failedRequests,
      linkAudit,
      screenshots: {
        darkTheme: darkThemeScreenshot,
        gameTheme: gameThemeScreenshot,
        gameThemeMobileMenu,
        russianDesktopHero,
        russianBlindSpots,
        russianPolicyStatement,
        russianHighRisk,
        russianMobileHero,
        russianMobileInspection,
        russianMobileMenu,
        desktopHero,
        releaseQuest,
        blindSpots,
        scenarioDossier,
        aiPosterComparison,
        characterComparison,
        ipLookalikeComparison,
        releaseSimulatorComplete: releaseSimulatorAudit.completeScreenshot,
        blindSpotsStatement,
        escalationBottom,
        highRisk,
        mobileHero,
        mobileReleaseQuest,
        mobileInspection,
        mobileCharacterComparison,
        mobileReleaseSimulator,
        mobilePolicyStatement,
        mobileMenu,
        mobileAudit,
      },
    };

    console.log(JSON.stringify(report, null, 2));
    if (!report.passed) process.exitCode = 1;
  } finally {
    client?.close();
    chrome?.kill();
    preview.kill();
    await delay(100);
    await rm(chromeProfile, { force: true, recursive: true });
  }
}

await run();
