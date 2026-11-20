import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';

/**
 * Theme: always light, regardless of the OS / browser preference.
 * The dark tokens are kept; append `?theme=dark` to preview them.
 */
document.documentElement.dataset.theme =
  new URLSearchParams(window.location.search).get('theme') === 'dark' ? 'dark' : 'light';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
