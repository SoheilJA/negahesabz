/**
 * Logo component — the Negah Sabz mark (green gaze / leaf eye) + wordmark.
 * Variants: 'light' (on dark bg) and 'dark' (on light bg).
 */
import { t } from '../core/i18n.js';

const MARK = `
<svg class="ns-logo-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
  <path d="M6 32 C 16 14.5, 48 14.5, 58 32 C 48 49.5, 16 49.5, 6 32 Z"
    stroke="#B78A48" stroke-width="2.4"/>
  <path d="M32 18.5 C 40.5 24, 40.5 37.5, 32 45.5 C 23.5 37.5, 23.5 24, 32 18.5 Z"
    fill="var(--ns-logo-leaf, #7FB069)"/>
  <path d="M32 23.5 L 32 41.5" stroke="#B78A48" stroke-width="1.3" stroke-linecap="round"/>
</svg>`;

/** Logo link — navigates to the current language home. */
export function renderLogo(variant = 'light') {
  const lang = document.documentElement.lang || 'fa';
  return `
  <a href="/${lang}/" class="ns-logo ns-logo--${variant}" aria-label="${t('common.logo')}">
    ${MARK}
    <span class="ns-logo-text">
      <span class="ns-logo-word">${t('brand.wordmark')}</span>
      <span class="ns-logo-sub">${t('brand.holding')}</span>
    </span>
  </a>`;
}

/** Mark only (for preloader/footer ornaments). */
export function logoMarkInline() {
  return MARK;
}

export default renderLogo;
