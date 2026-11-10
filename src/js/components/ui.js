/**
 * Shared UI builders — section headers, buttons, breadcrumbs,
 * product cards, brand badges, stats, ornament.
 */
import { t, loc, getLang } from '../core/i18n.js';
import { icon } from '../utils/icons.js';
import { getCategory } from '../data/categories.js';
import { getBrand } from '../data/brands.js';
import { getProductUrl } from '../data/products/index.js';

/** Standard section header (label + title + optional sub). */
export function sectionHeader({ label, title, sub = '', htmlTag = 'h2' }) {
  return `
  <header class="sec-head">
    ${label ? `<p class="ns-label" data-reveal="fade-up">${label}</p>` : ''}
    <${htmlTag} class="ns-h2" data-reveal="fade-up" data-delay="0.08">${title}</${htmlTag}>
    ${sub ? `<p class="ns-lead sec-sub" data-reveal="fade-up" data-delay="0.16">${sub}</p>` : ''}
  </header>`;
}

/** Button link. */
export function btn(label, href, variant = 'primary', opts = {}) {
  const icons = { primary: 'arrow-right', ghost: 'arrow-right', solid: 'arrow-right', back: 'chevron-right' };
  const arrow = opts.icon === false ? '' : icon(icons[opts.icon] || 'arrow-right', 'icon-flip');
  return `<a class="btn btn-${variant}" href="${href}" ${opts.attr || ''}>${label} ${arrow}</a>`;
}

/** Breadcrumbs with JSON-LD data attributes. */
export function breadcrumb(items) {
  const sep = icon('chevron-right', 'sep icon-flip');
  const list = items
    .map((it, i) =>
      it.path
        ? `<a href="${it.path}">${it.name}</a>${i < items.length - 1 ? sep : ''}`
        : `<span aria-current="page">${it.name}</span>`
    )
    .join('');
  return `<nav class="ns-breadcrumb" aria-label="Breadcrumb">${list}</nav>`;
}

/** Product card. */
export function productCard(p, { reveal = true } = {}) {
  const lang = getLang();
  const cat = getCategory(p.category);
  const brand = p.brand ? getBrand(p.brand) : null;
  const name = loc(p.name);
  const desc = loc(p.desc);
  return `
  <article class="card-product" ${reveal ? 'data-reveal="fade-up"' : ''}>
    <a href="${getProductUrl(p, lang)}" aria-label="${name}">
      <div class="cp-media">
        <img src="${p.img}" alt="${name}" loading="lazy" width="760" height="760" />
      </div>
      <div class="cp-body">
        <p class="cp-cat">${cat ? loc(cat.name) : ''}</p>
        <h3 class="cp-name">${name}</h3>
        <p class="cp-desc">${desc}</p>
        <div class="cp-foot">
          <span class="cp-brand">${brand ? brand.latin : ''}</span>
          <span class="cp-go">${t('common.viewDetails')} ${icon('arrow-right', 'icon-flip')}</span>
        </div>
      </div>
    </a>
  </article>`;
}

/** Stat block with animated counter. */
export function statBlock(value, label, { prefix = '' } = {}) {
  return `
  <div class="stat-block">
    <span class="stat-num" data-count="${value}" data-prefix="${prefix}">${prefix}${value}</span>
    <p class="ns-small stat-label">${label}</p>
  </div>`;
}

/** Small inline media frame. */
export function mediaFrame(src, alt, { ratio = '4/3', parallax = 0, className = '' } = {}) {
  return `
  <figure class="img-frame media-ratio ${className}" style="--ratio:${ratio}">
    <img src="${src}" alt="${alt}" loading="lazy" class="img-cover img-duo" ${parallax ? `data-parallax="${parallax}"` : ''}/>
  </figure>`;
}

/** Simple toast. */
export function showToast(messageKey) {
  const host = document.getElementById('ns-toast');
  const card = document.createElement('div');
  card.className = 'ns-toast-card';
  card.innerHTML = `${icon('info')}<span>${typeof messageKey === 'function' ? messageKey() : messageKey}</span>`;
  host.innerHTML = '';
  host.appendChild(card);
  import('../animations/micro.js').then(({ toastIn, toastOut }) => {
    toastIn(card);
    setTimeout(() => toastOut(card).then(() => card.remove()), 4200);
  });
  refreshIconsSafe();
}

function refreshIconsSafe() {
  import('../utils/icons.js').then(({ refreshIcons }) => refreshIcons()).catch(() => {});
}

export default { sectionHeader, btn, breadcrumb, productCard, statBlock, mediaFrame, showToast };
