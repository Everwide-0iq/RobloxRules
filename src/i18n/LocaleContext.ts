import { createContext, useContext } from 'react';

import type { GuideContent, Locale } from './locales/en';

export interface LocaleContextValue {
  content: GuideContent;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider.');
  return context;
}
