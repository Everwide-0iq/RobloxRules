import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App';
import { LocaleProvider } from './i18n/LocaleProvider';
import './styles/index.css';
import { ThemeProvider } from './theme/ThemeProvider';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Application root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
);
