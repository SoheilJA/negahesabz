/**
 * Product detail — breadcrumbs, gallery, name/category/brand, description,
 * specs (verified only), packaging, inquiry CTA (prefills contact form),
 * related products — all data-driven from the product registry.
 */
import { t, loc } from '../core/i18n.js';
import { setSEO, setJSONLD, productLD, organizationLD, breadcrumbLD } from '../core/seo.js';
import { breadcrumb, productCard, btn } from '../components/ui.js';
import { icon, refreshIcons } from '../utils/icons.js';
import { findBySlug, getRelated, getProductUrl } from '../data/products/index.js';
import { getCategory } from '../data/categories.js';
import { getBrand } from '../data/brands.js';
import { SPEC_KEYS } from '../data/products/helpers.js';
import { route, withBase } from '../utils/base.js';

export default {
  render(ctx) {
    const lang = ctx.lang;
    const product = findBySlug(ctx.params.slug, lang);
    if (!product) return null; // router falls back to 404

    const cat = getCategory(product.category);
    const brand = product.brand ? getBrand(product.brand) : null;
    const name = loc(product.name);
    const gallery = product.gallery && product.gallery.length ? [product.img, ...product.gallery.filter((g) => g !== product.img)] : [product.img];
    const related = getRelated(product, 4);

    return `
    <section class="section-pad-sm bg-forest-deep product-hero">
      <div class="container-x">
        ${breadcrumb([
          { name: t('product.breadcrumbHome'), path: route(`/${lang}/`) },
          { name: t('product.breadcrumbCatalog'), path: route(`/${lang}/products/`) },
          { name: cat ? loc(cat.name) : '' , path: route(`/${lang}/products/?cat=${product.category}`) },
          { name },
        ])}
      </div>
    </section>

    <section class="section-pad bg-offwhite product-body">
      <div class="container-x product-grid">
        <div class="product-gallery" data-reveal="fade-up" aria-label="${t('product.gallery')}">
          <div class="gal-main" id="gal-main">
            ${gallery
              .map(
                (g, i) => `
              <img src="${withBase(g)}" alt="${name}" ${i === 0 ? '' : 'class="is-hidden"'} data-idx="${i}" loading="${i === 0 ? 'eager' : 'lazy'}" />`
              )
              .join('')}
          </div>
          ${gallery.length > 1 ? `
          <div class="gal-thumbs" id="gal-thumbs" role="tablist" aria-label="${t('product.gallery')}">
            ${gallery
              .map(
                (g, i) => `
            <button type="button" class="gal-thumb ${i === 0 ? 'is-active' : ''}" data-idx="${i}" aria-label="${name} ${i + 1}">
              <img src="${withBase(g)}" alt="" loading="lazy"/>
            </button>`
              )
              .join('')}
          </div>` : ''}
        </div>

        <div class="product-info">
          ${brand ? `<p class="badge-brand" style="color:var(--color-gold)">${brand.latin}</p>` : ''}
          <h1 class="ns-h1" data-reveal="fade-up">${name}</h1>
          <p class="ns-label" data-reveal="fade-up" data-delay="0.06">${cat ? loc(cat.name) : ''}</p>
          <p class="ns-body product-desc" data-reveal="fade-up" data-delay="0.12">${loc(product.desc)}</p>

          <h2 class="ns-h3 product-subhead">${t('product.specs')}</h2>
          <table class="spec-table">
            <tbody>
              ${product.specs
                .map(
                  (s) => `
                <tr>
                  <th scope="row">${SPEC_KEYS[s.k] ? SPEC_KEYS[s.k][lang] || SPEC_KEYS[s.k].fa : s.k}</th>
                  <td>${typeof s.v === 'object' ? s.v[lang] || s.v.fa : s.v}</td>
                </tr>`
                )
                .join('')}
              ${brand ? `<tr><th scope="row">${t('product.brand')}</th><td>${brand.latin} — ${loc(brand.local)}</td></tr>` : ''}
              <tr><th scope="row">${t('product.category')}</th><td>${cat ? loc(cat.name) : ''}</td></tr>
              ${!product.specs.some((s) => s.k === 'packaging') ? `<tr><th scope="row">${t('product.packaging')}</th><td>${PACK_CUSTOM[lang]}</td></tr>` : ''}
            </tbody>
          </table>
          <p class="ns-tiny packaging-note">${t('product.packagingNote')}</p>

          <div class="product-cta" data-reveal="fade-up">
            ${btn(
              t('product.inquiry'),
              `${route(`/${lang}/contact/`)}?type=${product.category === 'construction' || product.category === 'petrochemical' ? 'sourcing' : 'export'}&product=${encodeURIComponent(name)}`,
              'primary'
            )}
            <p class="ns-tiny">${t('product.inquiryNote')}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad bg-ivory product-related">
      <div class="container-x">
        <h2 class="ns-h2">${t('product.related')}</h2>
        <div class="related-grid" data-stagger>
          ${related.map((p) => productCard(p, { reveal: false })).join('')}
        </div>
        <div class="related-back" data-reveal="fade-up">
          ${btn(t('product.back'), route(`/${lang}/products/`), 'ghost-dark', { icon: 'back' })}
        </div>
      </div>
    </section>`;
  },

  async init(ctx) {
    const lang = ctx.lang;
    const product = findBySlug(ctx.params.slug, lang);
    if (!product) return;
    const cat = getCategory(product.category);
    setSEO({
      title: t('meta.productTitle', { name: loc(product.name) }),
      desc: t('meta.productDesc', { name: loc(product.name) }),
      path: getProductUrl(product, lang),
      ogImage: `https://negahesabz.com${product.img}`,
      alternates: {
        fa: `/fa/products/${encodeURIComponent(product.slug.fa)}/`,
        en: `/en/products/${encodeURIComponent(product.slug.en)}/`,
        ru: `/ru/products/${encodeURIComponent(product.slug.ru)}/`,
        ar: `/ar/products/${encodeURIComponent(product.slug.ar)}/`,
      },
    });
    setJSONLD([
      organizationLD(lang),
      productLD(product, lang, getProductUrl(product, lang)),
      breadcrumbLD([
        { name: t('nav.home'), path: route(`/${lang}/`) },
        { name: t('nav.products'), path: route(`/${lang}/products/`) },
        { name: cat ? loc(cat.name) : '', path: route(`/${lang}/products/?cat=${product.category}`) },
        { name: loc(product.name), path: getProductUrl(product, lang) },
      ]),
    ]);
    refreshIcons();
    initGallery();
  },
};

const PACK_CUSTOM = {
  fa: 'وزن‌ها و بسته‌بندی‌های متنوع مطابق نیاز بازار مقصد',
  en: 'Various weights & packaging tailored to the destination market',
  ru: 'Различные веса и упаковка под требования рынка',
  ar: 'أوزان وتعبئات متنوعة حسب متطلبات السوق المستهدف',
};

function initGallery() {
  const main = document.getElementById('gal-main');
  const thumbs = document.querySelectorAll('.gal-thumb');
  if (!main || !thumbs.length) return;
  thumbs.forEach((th) => {
    th.addEventListener('click', () => {
      const idx = th.dataset.idx;
      main.querySelectorAll('img').forEach((img) => {
        img.classList.toggle('is-hidden', img.dataset.idx !== idx);
      });
      thumbs.forEach((x) => x.classList.toggle('is-active', x === th));
    });
  });
}
