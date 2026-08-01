import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { LocaleContext } from './LocaleContext';
import { enContent, type Locale } from './locales/en';
import { ruContent } from './locales/ru';

const STORAGE_KEY = 'before-you-publish-locale';
const DEFAULT_LOCALE: Locale = 'en';

function setMetaContent(selector: string, value: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = value;
}

function readStoredLocale(): Locale {
  try {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    return storedLocale === 'ru' || storedLocale === 'en' ? storedLocale : DEFAULT_LOCALE;
  } catch {
    // Storage can be unavailable in privacy-restricted contexts; English remains the safe default.
    return DEFAULT_LOCALE;
  }
}

function storeLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // The in-memory selection still works when persistent storage is unavailable.
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);
  const content = locale === 'ru' ? ruContent : enContent;

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    storeLocale(nextLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = content.seo.title;
    setMetaContent('meta[name="description"]', content.seo.description);
    setMetaContent('meta[property="og:title"]', content.seo.title);
    setMetaContent('meta[property="og:description"]', content.seo.description);
    setMetaContent('meta[property="og:locale"]', locale === 'ru' ? 'ru_RU' : 'en_US');
    setMetaContent('meta[name="twitter:title"]', content.seo.title);
    setMetaContent('meta[name="twitter:description"]', content.seo.description);

    const structuredData = document.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"]',
    );
    if (structuredData) {
      const canonicalUrl =
        document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ??
        window.location.href;
      structuredData.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: content.navigation.content.brand,
        url: canonicalUrl,
        description: content.seo.description,
        inLanguage: locale,
      });
    }
  }, [content.navigation.content.brand, content.seo.description, content.seo.title, locale]);

  const value = useMemo(() => ({ content, locale, setLocale }), [content, locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
