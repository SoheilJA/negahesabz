/**
 * Header — sticky premium navigation with products dropdown,
 * language switcher (route-preserving), mobile overlay menu.
 */
import { t, LANGS, LANG_META, getLang } from '../core/i18n.js';
import { altPath } from '../core/router.js';
import { renderLogo } from './logo.js';
import { icon, refreshIcons } from '../utils/icons.js';
import { categories } from '../data/categories.js';

function categoryLinks() {
  const lang = getLang();
  return categories
    .slice(0, 8)
    .map((c) => `<a href="/${lang}/products/?cat=${c.id}"><span class="dot"></span>${c.name[lang]}</a>`)
    .join('');
}

function langMenu() {
  const cur = getLang();
  return `
  <div class="lang-switch">
    <button class="lang-btn" aria-haspopup="true" aria-expanded="false" aria-label="${t('nav.langLabel')}">
      <i data-lucide="languages" aria-hidden="true" style="width:1em;height:1em"></i>
      <span>${LANG_META[cur].short}</span>
      <i data-lucide="chevron-down" aria-hidden="true" style="width:0.85em;height:0.85em"></i>
    </button>
    <div class="lang-panel" role="menu">
      ${LANGS.map(
        (l) => `
      <button type="button" role="menuitem" data-lang="${l}" class="${l === cur ? 'is-current' : ''}">
        <span>${LANG_META[l].label}</span>
        <span class="ns-tiny" style="opacity:.5">${LANG_META[l].short}</span>
      </button>`
      ).join('')}
    </div>
  </div>`;
}

export function renderHeader() {
  const lang = getLang();
  const el = document.getElementById('ns-header');
  el.classList.add('ns-header');
  el.innerHTML = `
  <div class="container-wide header-inner">
    ${renderLogo('light')}
    <nav class="nav-desktop" aria-label="${t('nav.menu')}">
      <a class="nav-link" data-nav="home" href="/${lang}/">${t('nav.home')}</a>
      <a class="nav-link" data-nav="about" href="/${lang}/about/">${t('nav.about')}</a>
      <div class="nav-drop">
        <a class="nav-link" data-nav="catalog" href="/${lang}/products/" aria-haspopup="true">
          ${t('nav.products')}
          <i data-lucide="chevron-down" aria-hidden="true" style="width:0.8em;height:0.8em"></i>
        </a>
        <div class="nav-drop-panel" aria-label="${t('nav.categories')}">
          ${categoryLinks()}
          <a href="/${lang}/products/" style="color:var(--color-gold);font-weight:700">${t('catalog.allCategories')} ${icon('arrow-right', 'icon-flip')}</a>
        </div>
      </div>
      <a class="nav-link" data-nav="contact" href="/${lang}/contact/">${t('nav.contact')}</a>
    </nav>
    <div class="header-actions">
      ${langMenu()}
      <a class="btn btn-primary ns-header-cta" href="/${lang}/contact/">${t('nav.cta')}</a>
      <button class="burger" aria-label="${t('nav.menu')}" aria-expanded="false" aria-controls="ns-mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="ns-mobile-menu" aria-label="${t('nav.menu')}">
    <nav aria-label="${t('nav.menu')}">
      <a class="mm-link" data-nav="home" href="/${lang}/"><span class="mm-num">01</span>${t('nav.home')}</a>
      <a class="mm-link" data-nav="about" href="/${lang}/about/"><span class="mm-num">02</span>${t('nav.about')}</a>
      <a class="mm-link" data-nav="catalog" href="/${lang}/products/"><span class="mm-num">03</span>${t('nav.products')}</a>
      <a class="mm-link" data-nav="contact" href="/${lang}/contact/"><span class="mm-num">04</span>${t('nav.contact')}</a>
    </nav>
    <div class="mm-cats">
      <p class="ns-label" style="margin-block-end:0.9rem">${t('nav.categories')}</p>
      <div class="mm-cats-grid">
        ${categories
          .slice(0, 8)
          .map((c) => `<a href="/${lang}/products/?cat=${c.id}" class="ns-small">${c.name[lang]}</a>`)
          .join('')}
      </div>
    </div>
    <a class="btn btn-primary" href="/${lang}/contact/" style="margin-block-start:auto">${t('nav.cta')}</a>
  </div>`;

  refreshIcons();
  return el;
}

/** Wire header interactions (after each render). */
export function initHeader() {
  const header = document.getElementById('ns-header');
  const burger = header.querySelector('.burger');
  const mobileMenu = document.getElementById('ns-mobile-menu');

  // scrolled state
  if (window.__nsHeaderScroll) {
    window.removeEventListener('scroll', window.__nsHeaderScroll);
  }
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.__nsHeaderScroll = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile menu
  const setMenu = (open) => {
    burger.classList.toggle('is-open', open);
    mobileMenu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      mobileMenu.querySelectorAll('.mm-link').forEach((l, i) => {
        l.style.transitionDelay = `${0.12 + i * 0.06}s`;
      });
    }
  };
  burger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('is-open')));
  mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  // language switching (desktop + mobile) — preserves current page
  header.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-lang');
      if (target === getLang()) return;
      import('../core/router.js').then(({ navigate }) => {
        navigate(altPath(target));
      });
    });
  });

  // active nav link
  const page = header.getAttribute('data-page');
  header.querySelectorAll(`[data-nav="${page}"]`).forEach((a) => a.classList.add('is-active'));
}
