import { Check, ChevronDown, Gamepad2, Moon, Sun, type LucideIcon } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { useLocale } from '../../i18n/LocaleContext';
import { useTheme, type Theme } from '../../theme/ThemeContext';

const themeIcons: Readonly<Record<Theme, LucideIcon>> = {
  light: Sun,
  dark: Moon,
  game: Gamepad2,
};

const themes: readonly Theme[] = ['light', 'dark', 'game'];

export function ThemeSwitcher() {
  const { content } = useLocale();
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const copy = content.page.themeSwitcher;
  const labels: Readonly<Record<Theme, string>> = {
    light: copy.lightLabel,
    dark: copy.darkLabel,
    game: copy.gameLabel,
  };
  const CurrentIcon = themeIcons[theme];

  useEffect(() => {
    if (!isOpen) return undefined;

    const activeOption = containerRef.current?.querySelector<HTMLButtonElement>(
      `[data-theme-option="${theme}"]`,
    );
    const focusFrame = window.requestAnimationFrame(() =>
      activeOption?.focus({ preventScroll: true }),
    );

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setIsOpen(false);
      window.requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, theme]);

  const changedMessage =
    theme === 'light'
      ? copy.changedToLight
      : theme === 'dark'
        ? copy.changedToDark
        : copy.changedToGame;

  return (
    <div ref={containerRef} className="relative shrink-0" data-theme-switcher>
      <button
        ref={triggerRef}
        type="button"
        className="theme-trigger inline-flex min-h-11 items-center gap-2 rounded-2xl border border-ink/12 bg-white/90 px-3 text-sm font-extrabold text-ink shadow-[0_5px_18px_rgba(55,66,58,0.1)] transition-[background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-white"
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`${copy.label}: ${labels[theme]}`}
        title={`${copy.currentLabel}: ${labels[theme]}`}
        data-theme-trigger
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        <CurrentIcon aria-hidden="true" className="size-[1.1rem]" strokeWidth={2.25} />
        <span className="hidden sm:inline">{labels[theme]}</span>
        <ChevronDown
          aria-hidden="true"
          className={`hidden size-3.5 opacity-55 transition-transform sm:block ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen ? (
        <div
          id={menuId}
          className="theme-menu absolute top-[calc(100%+.6rem)] right-0 z-[90] min-w-52 overflow-hidden rounded-2xl border border-ink/12 bg-white/96 p-1.5 text-ink shadow-[0_18px_50px_rgba(18,28,23,.2)] backdrop-blur-xl"
          role="menu"
          aria-label={copy.menuLabel}
          onKeyDown={(event) => {
            if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
            const options = [
              ...event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'),
            ];
            if (!options.length) return;
            event.preventDefault();
            const currentIndex = options.indexOf(document.activeElement as HTMLButtonElement);
            const nextIndex =
              event.key === 'Home'
                ? 0
                : event.key === 'End'
                  ? options.length - 1
                  : event.key === 'ArrowDown'
                    ? (currentIndex + 1) % options.length
                    : (currentIndex - 1 + options.length) % options.length;
            options[nextIndex]?.focus({ preventScroll: true });
          }}
        >
          {themes.map((item) => {
            const selected = item === theme;
            const Icon = themeIcons[item];

            return (
              <button
                key={item}
                type="button"
                className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold transition-colors ${
                  selected ? 'bg-ink text-white' : 'text-ink/76 hover:bg-ink/6 hover:text-ink'
                }`}
                role="menuitemradio"
                aria-checked={selected}
                data-theme-option={item}
                onClick={() => {
                  setTheme(item);
                  setHasChanged(true);
                  setIsOpen(false);
                  window.requestAnimationFrame(() =>
                    triggerRef.current?.focus({ preventScroll: true }),
                  );
                }}
              >
                <Icon aria-hidden="true" className="size-[1.1rem] shrink-0" />
                <span className="flex-1">{labels[item]}</span>
                {selected ? <Check aria-hidden="true" className="size-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}

      <span className="sr-only" aria-live="polite">
        {hasChanged ? changedMessage : ''}
      </span>
    </div>
  );
}
