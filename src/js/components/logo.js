/**
 * Logo component — brand mark + wordmark.
 * Variants: 'light' (on dark bg) and 'dark' (on light bg).
 */
import { t } from '../core/i18n.js';

const MARK = `<img src="/images/772-logo.png" class="ns-logo-mark" alt="" aria-hidden="true" />`;

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
