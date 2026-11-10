/**
 * Product catalog — category & brand filters, search, responsive grid,
 * load-more, honest empty states for trade-line categories.
 */
import { t, loc } from '../core/i18n.js';
import { setSEO, setJSONLD, organizationLD, breadcrumbLD } from '../core/seo.js';
import { breadcrumb, productCard } from '../components/ui.js';
import { refreshIcons, icon } from '../utils/icons.js';
import { products } from '../data/products/index.js';
import { categories } from '../data/categories.js';
import { brands } from '../data/brands.js';

const PAGE_SIZE = 12;

export default {
  render(ctx) {
    const lang = ctx.lang;
    return `
    <section class="page-hero page-hero-sm catalog-hero bg-forest-deep">
      <div class="img-frame ph-bg">
        <img src="/images/atmos/containers.webp" alt="" class="img-cover" data-parallax="0.1"/>
      </div>
      <div class="ph-veil"></div>
      <div class="container-x ph-content">
        ${breadcrumb([{ name: t('product.breadcrumbHome'), path: `/${lang}/` }, { name: t('nav.products') }])}
        <p class="ns-label" data-reveal="fade-up">${t('catalog.hero.kicker')}</p>
        <h1 class="ns-display" data-reveal="fade-up" data-delay="0.1">${t('catalog.hero.title')}</h1>
        <p class="ns-lead" data-reveal="fade-up" data-delay="0.2">${t('catalog.hero.sub')}</p>
      </div>
    </section>

    <section class="section-pad bg-offwhite">
      <div class="container-x">
        <div class="catalog-toolbar" data-reveal="fade-up">
          <div class="search-box">
            <i data-lucide="search" aria-hidden="true"></i>
            <input type="search" id="catalog-search" placeholder="${t('catalog.searchPh')}" aria-label="${t('catalog.searchPh')}" />
          </div>
          <div class="catalog-count ns-small" id="catalog-count" aria-live="polite"></div>
        </div>

        <div class="catalog-filters" data-reveal="fade-up" data-delay="0.08">
          <div class="chip-row" id="cat-chips" role="group" aria-label="${t('catalog.allCategories')}">
            <button type="button" class="chip is-active" data-cat="">
              ${t('catalog.all')}
              <span class="count">${products.length}</span>
            </button>
            ${categories
              .map(
                (c) => `
            <button type="button" class="chip" data-cat="${c.id}">
              ${loc(c.name)}
              <span class="count">${products.filter((p) => p.category === c.id).length}</span>
            </button>`
              )
              .join('')}
          </div>
          <div class="chip-row chip-row-brands" id="brand-chips" role="group" aria-label="${t('catalog.brands')}">
            <span class="ns-tiny" style="align-self:center;color:var(--color-stone)">${t('catalog.brands')}:</span>
            <button type="button" class="chip is-active" data-brand="">${t('catalog.anyBrand')}</button>
            ${brands
              .map(
                (b) => `
            <button type="button" class="chip" data-brand="${b.id}">${b.latin}</button>`
              )
              .join('')}
          </div>
        </div>

        <div class="catalog-grid" id="catalog-grid"></div>

        <div class="catalog-empty" id="catalog-empty" hidden>
          <h2 class="ns-h3">${t('catalog.noResults')}</h2>
          <p class="ns-small">${t('catalog.noResultsHint')}</p>
        </div>

        <div class="catalog-foot" id="catalog-foot">
          <p class="ns-tiny" id="catalog-showing"></p>
          <button type="button" class="btn btn-ghost-dark" id="catalog-more">${t('catalog.loadMore')}</button>
        </div>

        <p class="ns-tiny wholesale-note" data-reveal="fade-up">${icon('info')} ${t('catalog.wholesaleNote')}</p>
      </div>
    </section>`;
  },

  async init(ctx) {
    setSEO({
      title: t('meta.catalog.title'),
      desc: t('meta.catalog.desc'),
      path: `/${ctx.lang}/products/`,
    });
    setJSONLD([
      organizationLD(ctx.lang),
      breadcrumbLD([
        { name: t('nav.home'), path: `/${ctx.lang}/` },
        { name: t('nav.products'), path: `/${ctx.lang}/products/` },
      ]),
    ]);
    refreshIcons();
    initCatalog(ctx);
  },
};

function initCatalog(ctx) {
  const lang = ctx.lang;
  const grid = document.getElementById('catalog-grid');
  const emptyEl = document.getElementById('catalog-empty');
  const moreBtn = document.getElementById('catalog-more');
  const showingEl = document.getElementById('catalog-showing');
  const countEl = document.getElementById('catalog-count');
  const search = document.getElementById('catalog-search');

  const state = {
    cat: ctx.query.cat || '',
    brand: ctx.query.brand || '',
    q: '',
    shown: PAGE_SIZE,
  };

  // reflect query params in chips
  document.querySelectorAll('#cat-chips .chip').forEach((chip) => {
    chip.classList.toggle('is-active', (chip.dataset.cat || '') === state.cat);
  });
  document.querySelectorAll('#brand-chips .chip').forEach((chip) => {
    chip.classList.toggle('is-active', (chip.dataset.brand || '') === state.brand);
  });

  function filtered() {
    const q = state.q.trim().toLowerCase();
    return products.filter((p) => {
      if (state.cat && p.category !== state.cat) return false;
      if (state.brand && p.brand !== state.brand) return false;
      if (q) {
        const hay = [p.name[lang], p.desc[lang], p.id].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function render() {
    const list = filtered();
    const visible = list.slice(0, state.shown);

    if (!list.length) {
      grid.innerHTML = '';
      emptyEl.hidden = false;
      moreBtn.hidden = true;
      countEl.textContent = t('catalog.results', { n: 0 });
      showingEl.textContent = '';
      return;
    }

    const catObj = categories.find((c) => c.id === state.cat);
    emptyEl.hidden = true;
    countEl.textContent = t('catalog.results', { n: list.length });

    if (catObj && !list.length) {
      /* handled above */
    }

    if (catObj && products.filter((p) => p.category === catObj.id).length === 0) {
      // trade-line category with no published products → honest empty state
      emptyEl.hidden = false;
      emptyEl.querySelector('.ns-small').textContent = t('catalog.categoryEmpty');
      grid.innerHTML = '';
      moreBtn.hidden = true;
      return;
    }

    grid.innerHTML = visible.map((p) => productCard(p, { reveal: false })).join('');
    moreBtn.hidden = visible.length >= list.length;
    showingEl.textContent = t('catalog.showing', { a: visible.length, b: list.length });
  }

  document.querySelectorAll('#cat-chips .chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.cat = chip.dataset.cat || '';
      state.shown = PAGE_SIZE;
      document.querySelectorAll('#cat-chips .chip').forEach((c) => c.classList.toggle('is-active', c === chip));
      render();
    });
  });

  document.querySelectorAll('#brand-chips .chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.brand = chip.dataset.brand || '';
      state.shown = PAGE_SIZE;
      document.querySelectorAll('#brand-chips .chip').forEach((c) => c.classList.toggle('is-active', c === chip));
      render();
    });
  });

  let debounce;
  search.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      state.q = search.value;
      state.shown = PAGE_SIZE;
      render();
    }, 180);
  });

  moreBtn.addEventListener('click', () => {
    state.shown += PAGE_SIZE;
    render();
  });

  render();
}
