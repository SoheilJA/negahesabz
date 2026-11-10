/**
 * Footer — rich branded footer: identity, description, quick links,
 * categories, contact offices, language switcher, copyright.
 */
import { t, loc, LANGS, LANG_META, getLang } from '../core/i18n.js';
import { altPath } from '../core/router.js';
import { renderLogo } from './logo.js';
import { icon, refreshIcons } from '../utils/icons.js';
import { company } from '../data/company.js';
import { categories } from '../data/categories.js';

export function renderFooter() {
  const lang = getLang();
  const hq = company.offices.find((o) => o.primary);

  const links = [
    { key: 'home', href: `/${lang}/` },
    { key: 'about', href: `/${lang}/about/` },
    { key: 'catalog', href: `/${lang}/products/` },
    { key: 'contact', href: `/${lang}/contact/` },
  ];

  return `
  <footer class="ns-footer bg-forest-deep">
    <div class="container-wide">
      <div class="ns-footer-grid">
        <div class="nf-col nf-col-brand">
          ${renderLogo('light')}
          <p class="ns-small nf-desc">${t('footer.about.desc')}</p>
          <p class="ns-tiny" style="color:var(--color-gold)">${t('footer.about.regNo')}: <span class="ltr-nums" dir="ltr">${company.registrationNo}</span></p>
        </div>
        <nav class="nf-col" aria-label="${t('footer.nav.title')}">
          <h3 class="nf-title">${t('footer.nav.title')}</h3>
          ${links
            .map(
              (l) =>
                `<a href="${l.href}"><span class="nf-dot"></span>${t(`nav.${l.key}`)}</a>`
            )
            .join('')}
        </nav>
        <nav class="nf-col" aria-label="${t('footer.categories.title')}">
          <h3 class="nf-title">${t('footer.categories.title')}</h3>
          ${categories
            .slice(0, 8)
            .map((c) => `<a href="/${lang}/products/?cat=${c.id}"><span class="nf-dot"></span>${loc(c.name)}</a>`)
            .join('')}
          <a href="/${lang}/products/" style="color:var(--color-gold)">${t('catalog.allCategories')}</a>
        </nav>
        <div class="nf-col nf-col-contact">
          <h3 class="nf-title">${t('footer.contact.title')}</h3>
          <a href="tel:${hq.phone}" class="nf-contact"><i data-lucide="phone"></i><span dir="ltr">${hq.phoneDisplay}</span></a>
          <a href="mailto:${company.email}" class="nf-contact"><i data-lucide="mail"></i><span dir="ltr">${company.email}</span></a>
          <p class="nf-contact"><i data-lucide="map-pin"></i><span>${loc(hq.address)}</span></p>
          <p class="nf-contact"><i data-lucide="globe"></i><span dir="ltr">${company.website}</span></p>
        </div>
        <div class="nf-col nf-col-langs">
          <h3 class="nf-title">${t('footer.langs.title')}</h3>
          <div class="nf-langs">
            ${LANGS.map(
              (l) =>
                `<button type="button" data-lang="${l}" class="nf-lang ${l === lang ? 'is-active' : ''}">${LANG_META[l].label} <span style="opacity:.5">${LANG_META[l].short}</span></button>`
            ).join('')}
          </div>
        </div>
      </div>
      <div class="nf-bottom">
        <p class="ns-tiny">© <span dir="ltr">2017–${new Date().getFullYear()}</span> ${t('brand.wordmark')} — ${t('footer.rights')}</p>
        <button type="button" class="nf-top" aria-label="${t('common.toTop')}">${t('common.toTop')} ${icon('arrow-up')}</button>
      </div>
    </div>
  </footer>`;
}

export function initFooter() {
  const footer = document.querySelector('.ns-footer');
  refreshIcons();

  footer.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-lang');
      if (target === getLang()) return;
      import('../core/router.js').then(({ navigate }) => navigate(altPath(target)));
    });
  });

  const topBtn = footer.querySelector('.nf-top');
  topBtn.addEventListener('click', () => {
    import('../animations/motion.js').then(({ scrollToTop }) => scrollToTop(false));
  });
}
