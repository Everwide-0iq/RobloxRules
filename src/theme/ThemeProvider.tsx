import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { ThemeContext, type Theme } from './ThemeContext';

export const THEME_STORAGE_KEY = 'before-you-publish-theme';
const DEFAULT_THEME: Theme = 'light';

const themeMeta = {
  light: { colorScheme: 'light', themeColor: '#f7f0e3' },
  dark: { colorScheme: 'dark', themeColor: '#101713' },
  game: { colorScheme: 'dark', themeColor: '#070914' },
} as const;

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark' || value === 'game';
}

function readStoredTheme(): Theme {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : DEFAULT_THEME;
  } catch {
    // Storage can be disabled. The in-memory selection still works for this visit.
    return DEFAULT_THEME;
  }
}

function storeTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Keep the selected theme in React state when persistent storage is unavailable.
  }
}

function setMetaContent(selector: string, value: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = value;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    storeTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset['theme'] = theme;
    setMetaContent('meta[name="theme-color"]', themeMeta[theme].themeColor);
    setMetaContent('meta[name="color-scheme"]', themeMeta[theme].colorScheme);
  }, [theme]);

  const value = useMemo(() => ({ setTheme, theme }), [setTheme, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
