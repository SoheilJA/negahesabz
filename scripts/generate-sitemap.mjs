/**
 * Sitemap generator — run via `npm run sitemap`.
 * Writes public/sitemap.xml with per-language URLs + hreflang alternates,
 * including every product's translated slug. Run before `npm run build`.
 */
import { writeFileSync } from 'node:fs';
import { products } from '../src/js/data/products/index.js';
import { categories } from '../src/js/data/categories.js';

const SITE = 'https://negahesabz.com';
const LANGS = ['fa', 'en', 'ru', 'ar'];

const urls = [];

function addEntry(pathsByLang, changefreq = 'monthly', priority = 0.8) {
  urls.push(
    LANGS.map((lang) => `${SITE}${pathsByLang[lang]}`).map((loc) => ({
      loc,
      alternates: LANGS.map((l) => ({ lang: l, href: `${SITE}${pathsByLang[l]}` })),
      changefreq,
      priority,
    }))
  );
}

// static pages
addEntry({ fa: '/fa/', en: '/en/', ru: '/ru/', ar: '/ar/' }, 'weekly', 1.0);
addEntry({ fa: '/fa/about/', en: '/en/about/', ru: '/ru/about/', ar: '/ar/about/' }, 'monthly', 0.8);
addEntry({ fa: '/fa/contact/', en: '/en/contact/', ru: '/ru/contact/', ar: '/ar/contact/' }, 'monthly', 0.8);
addEntry({ fa: '/fa/products/', en: '/en/products/', ru: '/ru/products/', ar: '/ar/products/' }, 'weekly', 0.9);

// category filter pages
for (const cat of categories) {
  addEntry(
    {
      fa: `/fa/products/?cat=${cat.id}`,
      en: `/en/products/?cat=${cat.id}`,
      ru: `/ru/products/?cat=${cat.id}`,
      ar: `/ar/products/?cat=${cat.id}`,
    },
    'monthly',
    0.6
  );
}

// product pages (translated slugs)
for (const p of products) {
  addEntry(
    {
      fa: `/fa/products/${encodeURIComponent(p.slug.fa)}/`,
      en: `/en/products/${encodeURIComponent(p.slug.en)}/`,
      ru: `/ru/products/${encodeURIComponent(p.slug.ru)}/`,
      ar: `/ar/products/${encodeURIComponent(p.slug.ar)}/`,
    },
    'monthly',
    0.7
  );
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .flat()
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.alternates
      .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`)
      .join('')}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml, 'utf8');
console.log(`sitemap.xml written: ${urls.flat().length} URLs (${products.length} products × ${LANGS.length} languages)`);
