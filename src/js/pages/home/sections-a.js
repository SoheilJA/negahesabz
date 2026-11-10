/**
 * Homepage — Sections 02–04: company introduction, at-a-glance, business divisions.
 */
import { t, loc } from '../../core/i18n.js';
import { sectionHeader, btn, mediaFrame } from '../../components/ui.js';
import { company } from '../../data/company.js';

/* -------- 02 — INTRODUCTION -------- */
export function renderIntro(ctx) {
  const lang = ctx.lang;
  return `
  <section class="section-pad bg-ivory" id="intro">
    <div class="container-x">
      <div class="intro-grid">
        <div class="intro-copy">
          ${sectionHeader({ label: t('home.intro.label'), title: t('home.intro.title'), htmlTag: 'h2' })}
          <p class="ns-body intro-p1" data-reveal="fade-up">${t('home.intro.p1')}</p>
          <p class="ns-body" data-reveal="fade-up" data-delay="0.1">${t('home.intro.p2')}</p>
          <div class="intro-foot" data-reveal="fade-up" data-delay="0.18">
            ${btn(t('home.intro.cta'), `/${lang}/about/`, 'ghost-dark', { icon: false })}
            <p class="ns-tiny intro-since">${t('home.intro.since')}</p>
          </div>
        </div>
        <div class="intro-media" data-reveal="clip">
          ${mediaFrame('/images/gallery/saffron-sorting.webp', loc(company.shortName) + ' — ' + t('home.manufacturing.galleryNote'), { ratio: '3/3.6', parallax: 0.06, className: 'intro-img-a' })}
          <div class="intro-img-b">
            ${mediaFrame('/images/atmos/roastery-b.webp', t('about.coffee.title'), { ratio: '16/10' })}
          </div>
          <span class="intro-ornament ns-latin">EST. IRAN</span>
        </div>
      </div>
    </div>
  </section>`;
}

/* -------- 03 — AT A GLANCE -------- */
export function renderGlance(ctx) {
  const s = t('home.glance.stats');
  return `
  <section class="section-pad bg-forest">
    <div class="container-x">
      ${sectionHeader({ label: t('home.glance.label'), title: t('home.glance.title') })}
      <div class="stats-row glance-stats" data-stagger>
        ${stat(company.stats.years, s.years, '+')}
        ${stat(company.stats.exportProducts, s.products, '+')}
        ${stat(company.stats.dateCountries, s.countries, '+')}
        ${stat(company.stats.officeCountries, s.offices)}
        ${stat(company.stats.categories, s.categories)}
      </div>
    </div>
  </section>`;
}

const stat = (v, label, prefix = '') => `
  <div class="stat-block">
    <span class="stat-num" data-count="${v}" data-prefix="${prefix}">${prefix}${v}</span>
    <p class="ns-small stat-label">${label}</p>
  </div>`;

/* -------- 04 — BUSINESS DIVISIONS -------- */
const DIVISION_MEDIA = [
  '/images/gallery/event-booth.webp',
  '/images/gallery/packaging-workers.webp',
  '/images/atmos/roastery-hall.webp',
  '/images/gallery/dates-tray.webp',
  '/images/gallery/saffron-harvest.webp',
  '/images/gallery/logistics-trucks.webp',
];

export function renderDivisions(ctx) {
  const items = t('home.divisions.items');
  return `
  <section class="section-pad bg-offwhite">
    <div class="container-x">
      ${sectionHeader({ label: t('home.divisions.label'), title: t('home.divisions.title'), sub: t('home.divisions.sub') })}
      <ol class="divisions-list" role="list">
        ${items
          .map(
            (d, i) => `
        <li class="division-row" data-reveal="fade-up">
          <div class="dr-num ns-latin">${d.n}</div>
          <div class="dr-body">
            <h3 class="ns-h3 dr-title">${d.t}</h3>
            <p class="ns-small dr-desc">${d.d}</p>
          </div>
          <div class="dr-media img-frame">
            <img src="${DIVISION_MEDIA[i] || DIVISION_MEDIA[0]}" alt="${d.t}" loading="lazy" class="img-cover img-duo"/>
          </div>
        </li>`
          )
          .join('')}
      </ol>
    </div>
  </section>`;
}
