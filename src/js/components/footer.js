/**
 * Footer â€” company info, nav, categories, offices, language switcher, legal.
 */
import { t, LANGS, LANG_META, loc, getLang } from '../core/i18n.js';
import { company } from '../data/company.js';
import { renderLogo } from './logo.js';
import { icon, refreshIcons } from '../utils/icons.js';
import { categories } from '../data/categories.js';
import { route } from '../utils/base.js';

function officeLines() {
  const hq = company.offices.find((o) => o.primary);
  const intl = company.offices.filter((o) => !o.primary);
  return `
    <div class="nf-contact">
      <i data-lucide="map-pin" aria-hidden="true"></i>
      <span>${loc(hq.address)}</span>
    </div>
    <a class="nf-contact" href="tel:${hq.phone}" dir="ltr">
      <i data-lucide="phone" aria-hidden="true"></i>
      <span>${hq.phoneDisplay}</span>
    </a>
    <a class="nf-contact" href="tel:${hq.mobile}" dir="ltr">
      <i data-lucide="smartphone" aria-hidden="true"></i>
      <span>${hq.mobileDisplay}</span>
    </a>
    <a class="nf-contact" href="mailto:${company.email}" dir="ltr">
      <i data-lucide="mail" aria-hidden="true"></i>
      <span>${company.email}</span>
    </a>
    <div class="nf-intl">
      ${intl.map((o) => `<a href="tel:${o.phone}" dir="ltr" title="${loc(o.country)}">${loc(o.city)}: ${o.phoneDisplay}</a>`).join('')}
    </div>`;
}

export function renderFooter() {
  const lang = getLang();
  const year = new Date().getFullYear();
  return `
  <div class="ns-footer bg-forest-deep">
    <div class="container-wide">
      <div class="ns-footer-grid">
        <div class="nf-col nf-brand">
          ${renderLogo('light')}
          <p class="nf-desc ns-small">${t('footer.desc')}</p>
          <div class="nf-reg ns-tiny">${t('footer.regNo')}: ${company.registrationNo}</div>
        </div>
        <nav class="nf-col nf-nav" aria-label="${t('nav.menu')}">
          <h4 class="nf-title">${t('footer.company')}</h4>
          <a href="${route(`/${lang}/`)}"><span class="nf-dot"></span>${t('nav.home')}</a>
          <a href="${route(`/${lang}/about/`)}"><span class="nf-dot"></span>${t('nav.about')}</a>
          <a href="${route(`/${lang}/products/`)}"><span class="nf-dot"></span>${t('nav.products')}</a>
          <a href="${route(`/${lang}/contact/`)}"><span class="nf-dot"></span>${t('nav.contact')}</a>
        </nav>
        <nav class="nf-col nf-cats" aria-label="${t('nav.categories')}">
          <h4 class="nf-title">${t('footer.categories')}</h4>
          ${categories
            .slice(0, 7)
            .map((c) => `<a href="${route(`/${lang}/products/?cat=${c.id}`)}"><span class="nf-dot"></span>${loc(c.name)}</a>`)
            .join('')}
          <a href="${route(`/${lang}/products/`)}" style="color:var(--color-gold)">${t('catalog.allCategories')}</a>
        </nav>
        <div class="nf-col nf-contact-col">
          <h4 class="nf-title">${t('footer.contact')}</h4>
          ${officeLines()}
        </div>
        <div class="nf-col nf-lang-col">
          <h4 class="nf-title">${t('footer.languages')}</h4>
          <div class="nf-langs">
            ${LANGS.map(
              (l) => `
            <button type="button" class="nf-lang ${l === lang ? 'is-active' : ''}" data-lang="${l}">
              <span>${LANG_META[l].label}</span>
              <span class="ns-tiny" dir="ltr">${LANG_META[l].short}</span>
            </button>`
            ).join('')}
          </div>
        </div>
      </div>
      <div class="ns-footer-bottom">
        <p class="ns-tiny">${t('footer.copy', { year })}</p>
      </div>
    </div>
  </div>`;
}

export function initFooter() {
  const footer = document.getElementById('ns-footer');
  if (!footer) return;
  footer.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-lang');
      if (target === getLang()) return;
      import('../core/router.js').then(({ navigate, altPath }) => navigate(altPath(target)));
    });
  });
  refreshIcons();
}

export default renderFooter;
