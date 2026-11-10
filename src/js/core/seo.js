/**
 * SEO manager — per-route title, description, canonical, hreflang, OG, JSON-LD.
 */
import { LANGS, DEFAULT_LANG } from './i18n.js';

const SITE = 'https://negahesabz.com';

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  if (content === null) el.remove();
  else el.setAttribute('content', content);
}

function upsertLink(rel, href, hreflang) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function setSEO({ title, desc, path = '', ogTitle, ogDesc, ogImage = `${SITE}/images/og-cover.jpg`, alternates = null }) {
  document.title = title;
  upsertMeta('name', 'description', desc);
  const canonical = `${SITE}${path}`;
  upsertLink('canonical', canonical);
  // hreflang alternates for all languages + x-default
  for (const l of LANGS) {
    const p = alternates && alternates[l] ? alternates[l] : swapLangInPath(path, l);
    upsertLink('alternate', `${SITE}${p}`, l);
  }
  upsertLink('alternate', `${SITE}/${DEFAULT_LANG}/`, 'x-default');
  upsertMeta('property', 'og:title', ogTitle || title);
  upsertMeta('property', 'og:description', ogDesc || desc);
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:image', ogImage);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', ogTitle || title);
  upsertMeta('name', 'twitter:description', ogDesc || desc);
}

/** Replace the language prefix of a path for hreflang pairs. */
export function swapLangInPath(path, targetLang) {
  if (!path || path === '/') return `/${targetLang}/`;
  const m = path.match(/^\/(fa|en|ru|ar)(\/.*)?$/);
  if (m) return `/${targetLang}${m[2] || '/'}`;
  return `/${targetLang}${path}`;
}

export function setJSONLD(data) {
  // remove previous blocks
  document.querySelectorAll('script.ns-jsonld').forEach((el) => el.remove());
  const list = Array.isArray(data) ? data : [data];
  list.forEach((d, i) => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.className = 'ns-jsonld';
    el.id = `ns-jsonld-${i}`;
    el.textContent = JSON.stringify(d);
    document.head.appendChild(el);
  });
}

export function organizationLD(lang) {
  const names = {
    fa: 'هلدینگ بازرگانی نگاه سبز',
    en: 'Negah Sabz International Trading Holding',
    ru: 'Международный торговый холдинг «Негахе Сабз»',
    ar: 'هلدینج التجارة الدولية نظر سبز',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: names[lang] || names.fa,
    alternateName: ['Negah Sabz', 'نگاه سبز', 'PayamTejarat Negahe Sabz'],
    url: `${SITE}/${lang}/`,
    logo: `${SITE}/favicon.svg`,
    email: 'info@negahesabz.com',
    telephone: '+98-51-3723-7544',
    identifier: { '@type': 'PropertyValue', name: 'Registration No.', value: '62435' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mashhad',
      addressCountry: 'IR',
      streetAddress: 'Farvardin Tower, Majd Sq., Unit 604',
    },
    sameAs: [`${SITE}/en/`],
  };
}

export function breadcrumbLD(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}

export function productLD(product, lang, url) {
  /* Only verifiable fields — no offers/price (B2B, quoted on request). */
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[lang],
    description: product.desc[lang],
    image: [`${SITE}${product.img}`],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand === 'suncreez' ? 'Suncreez' : product.brand === 'shadiar' ? 'Shadiar' : 'Negah Sabz',
    },
    category: product.category,
    url: `${SITE}${url}`,
  };
  return data;
}
