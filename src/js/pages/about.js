/**
 * About page — cinematic hero + 14 editorial sections
 * (story, facilities, coffee, dates/product portfolio, markets, certificates,
 * values/future, brands, presence, CTA).
 */
import { t, loc } from '../core/i18n.js';
import { setSEO, setJSONLD, organizationLD, breadcrumbLD } from '../core/seo.js';
import { sectionHeader, btn, mediaFrame, breadcrumb } from '../components/ui.js';
import { icon, refreshIcons } from '../utils/icons.js';
import { company } from '../data/company.js';
import { brands } from '../data/brands.js';
import { route, withBase } from '../utils/base.js';

export default {
  render(ctx) {
    const lang = ctx.lang;
    return `
    ${renderPageHero(ctx)}
    ${renderStory(ctx)}
    ${renderFacilities(ctx)}
    ${renderCoffee(ctx)}
    ${renderPortfolio(ctx)}
    ${renderMarkets(ctx)}
    ${renderCertificates(ctx)}
    ${renderBrandsSection(ctx)}
    ${renderValues(ctx)}
    ${renderLeadership(ctx)}
    ${renderFinalCTA(ctx)}
    `;
  },

  async init(ctx) {
    setSEO({
      title: t('meta.about.title'),
      desc: t('meta.about.desc'),
      path: route(`/${ctx.lang}/about/`),
    });
    setJSONLD([
      organizationLD(ctx.lang),
      breadcrumbLD([
        { name: t('nav.home'), path: route(`/${ctx.lang}/`) },
        { name: t('nav.about'), path: route(`/${ctx.lang}/about/`) },
      ]),
    ]);
    refreshIcons();
  },
};

/* ---------- hero ---------- */
function renderPageHero(ctx) {
  return `
  <section class="page-hero bg-forest-deep">
    <div class="img-frame ph-bg">
      <img src="${withBase('/images/atmos/cargo-aerial.webp')}" alt="" class="img-cover" data-parallax="0.18"/>
    </div>
    <div class="ph-veil"></div>
    <div class="container-x ph-content">
      ${breadcrumb([
        { name: t('product.breadcrumbHome'), path: route(`/${ctx.lang}/`) },
        { name: t('nav.about') },
      ])}
      <p class="ns-label" data-reveal="fade-up">${t('about.hero.kicker')}</p>
      <h1 class="ns-display" data-reveal="fade-up" data-delay="0.1">${t('about.hero.title')}</h1>
      <p class="ns-lead" data-reveal="fade-up" data-delay="0.2">${t('about.hero.sub')}</p>
      <div class="ph-meta" data-reveal="fade-up" data-delay="0.3">
        <div><span class="ns-tiny">${t('about.certs.regNo')}</span><strong dir="ltr">62435</strong></div>
        <div><span class="ns-tiny">${t('home.glance.stats.offices')}</span><strong dir="ltr">4</strong></div>
        <div><span class="ns-tiny">${t('home.glance.stats.products')}</span><strong dir="ltr">+80</strong></div>
      </div>
    </div>
  </section>`;
}

/* ---------- story ---------- */
function renderStory(ctx) {
  const lang = ctx.lang;
  return `
  <section class="section-pad bg-ivory">
    <div class="container-x">
      <div class="about-split">
        <div>
          ${sectionHeader({ label: t('about.story.label'), title: t('about.story.title') })}
          <p class="ns-body" data-reveal="fade-up">${t('about.story.p1')}</p>
          <p class="ns-body" data-reveal="fade-up" data-delay="0.08">${t('about.story.p2')}</p>
          <p class="ns-body" data-reveal="fade-up" data-delay="0.16">${t('about.story.p3')}</p>
          <div class="about-cta" data-reveal="fade-up">
            ${btn(t('about.cta.btn'), route(`/${lang}/contact/`), 'ghost-dark', { icon: false })}
          </div>
        </div>
        <div class="story-media" data-reveal="clip">
          ${mediaFrame('/images/gallery/company-building.webp', t('about.facilities.title'), { ratio: '3/3.4', parallax: 0.05 })}
          ${mediaFrame('/images/gallery/event-group.webp', t('home.leadership.title'), { ratio: '16/10', className: 'story-img-b' })}
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- facilities ---------- */
function renderFacilities(ctx) {
  const list = ['list1', 'list2', 'list3', 'list4', 'list5'].map((k) => t(`about.facilities.${k}`));
  return `
  <section class="section-pad bg-forest">
    <div class="container-x">
      <div class="about-split reverse">
        <div class="facilities-media" data-reveal="clip">
          ${mediaFrame('/images/gallery/packaging-workers.webp', t('about.facilities.title'), { ratio: '4/4.4', parallax: 0.06 })}
        </div>
        <div>
          ${sectionHeader({ label: t('about.facilities.label'), title: t('about.facilities.title') })}
          <p class="ns-body" data-reveal="fade-up">${t('about.facilities.p1')}</p>
          <p class="ns-body" data-reveal="fade-up" data-delay="0.08">${t('about.facilities.p2')}</p>
          <ul class="facilities-list" data-stagger>
            ${list.map((l) => `<li>${icon('check')}<span>${l}</span></li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- coffee ---------- */
function renderCoffee(ctx) {
  return `
  <section class="section-pad bg-offwhite">
    <div class="container-x">
      <div class="coffee-feature" data-reveal="fade-up">
        <div class="coffee-copy">
          ${sectionHeader({ label: t('about.coffee.label'), title: t('about.coffee.title') })}
          <p class="ns-body">${t('about.coffee.p1')}</p>
          <p class="ns-body" data-delay="0.08">${t('about.coffee.p2')}</p>
        </div>
        <div class="coffee-media">
          ${mediaFrame('/images/atmos/roastery-b.webp', t('about.coffee.title'), { ratio: '1/1.1' })}
          ${mediaFrame('/images/atmos/roastery-c.webp', t('about.coffee.title'), { ratio: '1/1.1', className: 'coffee-img-b' })}
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- portfolio ---------- */
function renderPortfolio(ctx) {
  const lang = ctx.lang;
  return `
  <section class="section-pad bg-charcoal">
    <div class="container-x">
      ${sectionHeader({ label: t('catalog.hero.kicker'), title: t('home.showcase.title'), sub: t('home.showcase.sub') })}
      <div class="about-products" data-stagger>
        ${aboutTiles(lang)}
      </div>
      <div class="about-portfolio-cta" data-reveal="fade-up">
        ${btn(t('home.showcase.viewAll'), route(`/${lang}/products/`), 'primary')}
      </div>
    </div>
  </section>`;
}

function aboutTiles(lang) {
  const tiles = [
    { img: '/images/atmos/coffee-beans.webp', href: route(`/${lang}/products/?cat=coffee`) },
    { img: '/images/gallery/dates-luxury.webp', href: route(`/${lang}/products/?cat=dates`) },
    { img: '/images/atmos/pistachio.webp', href: route(`/${lang}/products/?cat=pistachio`) },
    { img: '/images/atmos/saffron.webp', href: route(`/${lang}/products/?cat=saffron`) },
    { img: '/images/atmos/tea.webp', href: route(`/${lang}/products/?cat=tea`) },
    { img: '/images/atmos/raisins.webp', href: route(`/${lang}/products/?cat=dried-fruits`) },
    { img: '/images/atmos/tomato.webp', href: route(`/${lang}/products/?cat=tomato-paste`) },
    { img: '/images/products/p-38581.webp', href: route(`/${lang}/products/?cat=milk-powder`) },
  ];
  return tiles
    .map(
      (tile) => `
      <a class="about-tile img-frame" href="${tile.href}">
        <img src="${withBase(tile.img)}" alt="" class="img-cover img-duo" loading="lazy"/>
      </a>`
    )
    .join('');
}

/* ---------- markets ---------- */
function renderMarkets(ctx) {
  const lang = ctx.lang;
  return `
  <section class="section-pad bg-ivory">
    <div class="container-x">
      ${sectionHeader({ label: t('about.markets.label'), title: t('about.markets.title'), sub: t('about.markets.sub') })}
      <ul class="markets-cloud" data-stagger>
        ${company.markets[lang]
          .map(
            (m) => `
        <li class="market-chip" data-reveal="fade-up">
          <span class="pulse-dot"></span>
          <span>${m}</span>
        </li>`
          )
          .join('')}
      </ul>
      <p class="ns-tiny markets-note" data-reveal="fade-up">${t('about.markets.listTitle')}</p>
    </div>
  </section>`;
}

/* ---------- certificates ---------- */
function renderCertificates(ctx) {
  return `
  <section class="section-pad bg-offwhite">
    <div class="container-x">
      ${sectionHeader({ label: t('about.certs.label'), title: t('about.certs.title'), sub: t('about.certs.sub') })}
      <div class="certs-row" data-stagger>
        ${company.certificates
          .map(
            (c) => `
        <figure class="cert-card" data-reveal="fade-up">
          <div class="img-frame cert-img">
            <img src="${withBase(c.img)}" alt="${loc(c.caption)}" loading="lazy" class="img-cover"/>
          </div>
          <figcaption class="ns-tiny">${loc(c.caption)}</figcaption>
        </figure>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

/* ---------- brands ---------- */
function renderBrandsSection(ctx) {
  const lang = ctx.lang;
  return `
  <section class="section-pad-sm bg-ivory">
    <div class="container-x">
      ${sectionHeader({ label: t('home.brands.label'), title: t('home.brands.title') })}
      <div class="about-brands" data-stagger>
        ${brands
          .map(
            (b) => `
        <article class="about-brand ${b.theme === 'dark' ? 'is-dark' : 'is-light'}">
          <p class="badge-brand">${b.latin}</p>
          <h3 class="ns-h3">${loc(b.local)} — ${loc(b.tagline)}</h3>
          <p class="ns-small">${loc(b.desc)}</p>
          <a class="link-arrow" href="${route(`/${lang}/products/?brand=${b.id}`)}">${t('home.brands.viewProducts')} ${icon('arrow-right', 'icon-flip')}</a>
        </article>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

/* ---------- values & future ---------- */
function renderValues(ctx) {
  return `
  <section class="section-pad bg-forest-deep">
    <div class="container-x">
      <div class="values-grid">
        <div>
          ${sectionHeader({ label: t('about.values.label'), title: t('about.values.title') })}
          <p class="ns-body" data-reveal="fade-up">${t('about.values.p')}</p>
        </div>
        <div class="future-block" data-reveal="fade-up">
          <h3 class="ns-h3">${t('about.values.futureTitle')}</h3>
          <p class="ns-body">${t('about.values.futureP')}</p>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- leadership ---------- */
function renderLeadership(ctx) {
  return `
  <section class="section-pad-sm bg-ivory">
    <div class="container-x">
      ${sectionHeader({ label: t('home.leadership.label'), title: t('home.leadership.title'), sub: t('home.leadership.sub') })}
      <div class="lead-grid">
        ${company.leadership
          .map(
            (l) => `
        <figure class="lead-card" data-reveal="fade-up">
          <div class="img-frame lead-photo">
            <img src="${withBase(l.img)}" alt="${loc(l.name)}" loading="lazy" class="img-cover img-duo"/>
          </div>
          <figcaption>
            <h3 class="ns-h3">${loc(l.name)}</h3>
            <p class="ns-label">${loc(l.role)}</p>
          </figcaption>
        </figure>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

/* ---------- final CTA ---------- */
function renderFinalCTA(ctx) {
  const lang = ctx.lang;
  return `
  <section class="cta-final">
    <div class="img-frame cta-bg">
      <img src="${withBase('/images/atmos/containers.webp')}" alt="" class="img-cover" data-parallax="0.15"/>
    </div>
    <div class="cta-veil"></div>
    <div class="container-x cta-content">
      <h2 class="ns-display" data-reveal="fade-up">${t('about.cta.title')}</h2>
      <p class="ns-lead" data-reveal="fade-up" data-delay="0.12">${t('about.cta.sub')}</p>
      <div data-reveal="fade-up" data-delay="0.24">
        ${btn(t('about.cta.btn'), route(`/${lang}/contact/`), 'primary')}
      </div>
    </div>
  </section>`;
}
