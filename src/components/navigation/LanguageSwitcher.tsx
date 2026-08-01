import { Languages } from 'lucide-react';
import { useState } from 'react';

import { useLocale } from '../../i18n/LocaleContext';
import type { Locale } from '../../i18n/locales/en';

const locales: readonly Locale[] = ['en', 'ru'];

export function LanguageSwitcher() {
  const { content, locale, setLocale } = useLocale();
  const [hasChanged, setHasChanged] = useState(false);
  const labels = {
    en: content.language.englishLabel,
    ru: content.language.russianLabel,
  } as const;

  return (
    <div
      className="flex shrink-0 items-center gap-1 rounded-2xl border border-ink/12 bg-white/90 p-1 shadow-[0_5px_18px_rgba(55,66,58,0.1)]"
      role="group"
      aria-label={content.language.switcherLabel}
    >
      <Languages aria-hidden="true" className="ml-1 hidden size-4 text-ink/70 lg:block" />
      {locales.map((item) => {
        const selected = item === locale;

        return (
          <button
            key={item}
            type="button"
            className={`min-h-9 rounded-xl px-2.5 text-xs font-extrabold transition-colors sm:px-3 ${
              selected ? 'bg-ink text-white shadow-sm' : 'text-ink/70 hover:bg-ink/6 hover:text-ink'
            }`}
            aria-pressed={selected}
            aria-label={`${item.toUpperCase()}: ${
              selected
                ? content.language.currentLanguageLabel
                : content.language.switchToLanguageLabel
            }: ${labels[item]}`}
            title={labels[item]}
            onClick={() => {
              if (item === locale) return;
              setLocale(item);
              setHasChanged(true);
            }}
          >
            <span className="sm:hidden">{item.toUpperCase()}</span>
            <span className="hidden sm:inline">{labels[item]}</span>
          </button>
        );
      })}
      <span className="sr-only" aria-live="polite">
        {hasChanged
          ? locale === 'en'
            ? content.language.changedToEnglish
            : content.language.changedToRussian
          : ''}
      </span>
    </div>
  );
}
