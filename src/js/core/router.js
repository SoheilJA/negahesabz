/**
 * SPA router — language-aware routes with pushState navigation,
 * page lifecycle (render → init → cleanup), 404 and root redirect.
 *
 * Routes: /{lang}/, /{lang}/about/, /{lang}/contact/,
 *         /{lang}/products/, /{lang}/products/{slug}/
 */
import { LANGS, DEFAULT_LANG, setLang, getLang } from './i18n.js';
import { scrollToTop, scrollToEl } from '../animations/motion.js';

const ROUTE_TABLE = [
  { re: /^\/?$/, kind: 'redirect', to: () => `/${DEFAULT_LANG}/` },
  { re: /^\/(fa|en|ru|ar)\/?$/, kind: 'page', name: 'home' },
  { re: /^\/(fa|en|ru|ar)\/about\/?$/, kind: 'page', name: 'about' },
  { re: /^\/(fa|en|ru|ar)\/contact\/?$/, kind: 'page', name: 'contact' },
  { re: /^\/(fa|en|ru|ar)\/products\/?$/, kind: 'page', name: 'catalog' },
  { re: /^\/(fa|en|ru|ar)\/products\/([^\/]+?)\/?$/, kind: 'page', name: 'product' },
];

const pages = {}; // name → loader fn or module
const loaded = {}; // name → resolved module
let currentCtx = null;
let navigating = false;

export function registerPage(name, modOrLoader) {
  pages[name] = modOrLoader;
}

async function resolvePage(name) {
  if (loaded[name]) return loaded[name];
  const entry = pages[name];
  if (!entry) return null;
  const resolved = typeof entry === 'function' && entry.__loader ? await entry() : entry;
  const mod = resolved && resolved.default ? resolved.default : resolved;
  loaded[name] = mod;
  return mod;
}

export function matchRoute(pathname) {
  for (const r of ROUTE_TABLE) {
    const m = pathname.match(r.re);
    if (m) return { route: r, match: m };
  }
  return null;
}

export function parsePath(pathname) {
  const res = matchRoute(pathname);
  if (!res) return { lang: getLang(), page: 'notfound', params: {} };
  const { route, match } = res;
  if (route.kind === 'redirect') {
    return { redirect: route.to() };
  }
  const lang = match[1] || DEFAULT_LANG;
  const params = {};
  if (route.name === 'product') params.slug = decodeURIComponent(match[2]);
  return { lang, page: route.name, params };
}

/** Path of the current page rendered in another language. */
export function altPath(lang) {
  const path = window.location.pathname;
  const cur = parsePath(path);
  if (!cur || cur.redirect) return `/${lang}/`;
  if (cur.page === 'notfound') return `/${lang}/`;
  if (cur.page === 'product') {
    // translate slug via the product data (resolved by app-provided helper)
    const alt = resolveAltProductPath(cur.params.slug, cur.lang, lang);
    if (alt) return alt;
    return `/${lang}/products/`;
  }
  const map = { home: `/${lang}/`, about: `/${lang}/about/`, contact: `/${lang}/contact/`, catalog: `/${lang}/products/` };
  return map[cur.page] || `/${lang}/`;
}

let altProductResolver = null;
export function setAltProductResolver(fn) {
  altProductResolver = fn;
}
function resolveAltProductPath(slug, fromLang, toLang) {
  return altProductResolver ? altProductResolver(slug, fromLang, toLang) : null;
}

/* ------------------------- lifecycle ------------------------- */

let hooks = { before: null, after: null };
export function setHooks(h) {
  hooks = { ...hooks, ...h };
}

async function renderPage(ctx) {
  const main = document.getElementById('main');
  // 1. pre-render hook: transition out + cleanup previous page & motion
  if (hooks.before) await hooks.before(ctx);
  if (currentCtx && currentCtx.pageCleanup) {
    try { currentCtx.pageCleanup(); } catch (e) { /* keep navigating */ }
  }
  currentCtx = ctx;

  // 2. language + direction, then chrome (header/footer) in the new language
  setLang(ctx.lang);
  let pageMod = (await resolvePage(ctx.page)) || (await resolvePage('notfound'));
  let html = pageMod.render(ctx);
  if (html == null) {
    // page signalled "not found" (e.g. unknown product slug)
    ctx.page = 'notfound';
    pageMod = await resolvePage('notfound');
    html = pageMod.render(ctx);
  }
  main.setAttribute('data-page', ctx.page);
  document.getElementById('ns-header')?.setAttribute('data-page', ctx.page);
  main.innerHTML = html;

  // 3. page behaviour
  if (pageMod.init) await pageMod.init(ctx);
  // 4. post-render hook: icons, reveals, fade-in
  if (hooks.after) await hooks.after(ctx);
}

export async function navigate(path, { push = true } = {}) {
  if (navigating) return;
  const target = new URL(path, window.location.origin);
  if (target.pathname === window.location.pathname && target.search === window.location.search) return;
  navigating = true;
  try {
    if (push) window.history.pushState({}, '', target.href);
    await transitionTo(target.pathname, target.search);
  } finally {
    navigating = false;
  }
}

async function transitionTo(pathname, search = '') {
  const parsed = parsePath(pathname);
  if (parsed.redirect) {
    window.history.replaceState({}, '', parsed.redirect);
    await transitionTo(parsed.redirect);
    return;
  }
  if (!LANGS.includes(parsed.lang)) parsed.lang = DEFAULT_LANG;
  const query = Object.fromEntries(new URLSearchParams(search));
  const ctx = { lang: parsed.lang, page: parsed.page, params: parsed.params, query, cleanup: null };
  await renderPage(ctx);
  scrollToTop(true);
}

export async function renderCurrent() {
  await transitionTo(window.location.pathname, window.location.search);
}

/* ------------------------- events ------------------------- */

export function initRouterLinks() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#')) {
      // in-page anchor — let Lenis handle smoothness
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) scrollToEl(el, -100);
      return;
    }
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return; // external
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(url.pathname + url.search);
  });

  window.addEventListener('popstate', () => {
    transitionTo(window.location.pathname, window.location.search);
  });
}
