import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'game';

export interface ThemeContextValue {
  setTheme: (theme: Theme) => void;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider.');
  return context;
}
