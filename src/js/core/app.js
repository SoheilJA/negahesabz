/**
 * App bootstrap — wires styles, fonts, router, pages, header/footer,
 * preloader, and the motion system together.
 */
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/500.css';
import '@fontsource/vazirmatn/700.css';
import '@fontsource/vazirmatn/800.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/400-italic.css';

import '../../styles/main.css';
import '../../styles/components.css';
import '../../styles/animations.css';
import '../../styles/home.css';
import '../../styles/pages.css';

import { gsap, ScrollTrigger } from '../animations/motion.js';
import { initReveals, initStaggerReveal, initParallax, initCounters, cleanupPage, initLenis, prefersReducedMotion } from '../animations/motion.js';
import { registerPage, setHooks, setAltProductResolver, initRouterLinks, renderCurrent } from './router.js';
import { renderHeader, initHeader } from '../components/header.js';
import { renderFooter, initFooter } from '../components/footer.js';
import { refreshIcons } from '../utils/icons.js';
import { findBySlug } from '../data/products/index.js';

/* ---------- register pages (lazy → code-split per page) ---------- */
const lazy = (fn) => { fn.__loader = true; return fn; };
registerPage('home', lazy(() => import('../pages/home/index.js')));
registerPage('about', lazy(() => import('../pages/about.js')));
registerPage('contact', lazy(() => import('../pages/contact.js')));
registerPage('catalog', lazy(() => import('../pages/catalog.js')));
registerPage('product', lazy(() => import('../pages/product.js')));
registerPage('notfound', lazy(() => import('../pages/notfound.js')));

/* ---------- language-switch keeps product context ---------- */
setAltProductResolver((slug, fromLang, toLang) => {
  const p = findBySlug(slug, fromLang);
  if (!p) return `/${toLang}/products/`;
  return `/${toLang}/products/${encodeURIComponent(p.slug[toLang])}/`;
});

/* ---------- route lifecycle hooks ---------- */
setHooks({
  before: async (ctx) => {
    const main = document.getElementById('main');
    if (main.childElementCount && !prefersReducedMotion()) {
      await gsap.to(main, { opacity: 0, y: 12, duration: 0.28, ease: 'power2.in' }).then();
    }
    cleanupPage(); // kills page ScrollTriggers / parallax / listeners
  },
  after: async (ctx) => {
    // chrome (header/footer) rendered in the fresh language
    renderHeader();
    document.getElementById('ns-footer').innerHTML = renderFooter();
    refreshIcons();
    initHeader();
    initFooter();

    const main = document.getElementById('main');
    gsap.fromTo(main, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'transform' });
    initReveals();
    initStaggerReveal();
    initParallax();
    initCounters();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  },
});

/* ---------- boot ---------- */
export async function initApp() {
  initLenis();
  initRouterLinks();

  const { initPreloader } = await import('./preloader.js');
  await initPreloader();
  await renderCurrent();
}
