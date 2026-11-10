/**
 * Homepage — Sections 09–14: brands, services, why, leadership, insights, closing CTA.
 */
import { t, loc } from '../../core/i18n.js';
import { sectionHeader, btn } from '../../components/ui.js';
import { icon } from '../../utils/icons.js';
import { brands } from '../../data/brands.js';
import { services } from '../../data/services.js';
import { articles } from '../../data/articles.js';
import { company } from '../../data/company.js';

/* -------- 09 — BRANDS -------- */
export function renderBrands(ctx) {
  const lang = ctx.lang;
  return `
  <section class="section-pad brands-strip" id="brands">
    <div class="container-x">
      ${sectionHeader({ label: t('home.brands.label'), title: t('home.brands.title') })}
    </div>
    ${brands
      .map(
        (b) => `
    <article class="brand-block ${b.theme === 'dark' ? 'bg-charcoal' : 'bg-ivory'}" data-reveal="fade-up">
      <div class="container-x">
        <div class="brand-grid">
          <div class="brand-copy">
            <p class="badge-brand">${b.latin}</p>
            <h3 class="ns-h2 brand-local">${loc(b.local)}</h3>
            <p class="ns-label">${loc(b.tagline)}</p>
            <p class="ns-small brand-desc">${loc(b.desc)}</p>
            <a class="link-arrow" href="/${lang}/products/?brand=${b.id}">${t('home.brands.viewProducts')} ${icon('arrow-right', 'icon-flip')}</a>
          </div>
          <div class="brand-media" data-stagger>
            ${b.images.map((im) => `<div class="img-frame brand-img"><img src="${im}" alt="${b.latin}" loading="lazy" class="img-cover img-duo"/></div>`).join('')}
          </div>
        </div>
      </div>
    </article>`
      )
      .join('')}
  </section>`;
}

/* -------- 10 — LOGISTICS & TRADE SERVICES -------- */
export function renderServices(ctx) {
  return `
  <section class="section-pad bg-offwhite" id="services">
    <div class="container-x">
      ${sectionHeader({ label: t('home.services.label'), title: t('home.services.title'), sub: t('home.services.sub') })}
      <div class="services-grid">
        ${services
          .map(
            (s, i) => `
        <article class="service-row ${i === 0 ? 'is-lead' : ''}" data-reveal="fade-up">
          <div class="service-ico">${icon(s.icon)}</div>
          <div class="service-body">
            <h3 class="ns-h3">${loc(s.title)}</h3>
            <p class="ns-small">${loc(s.desc)}</p>
          </div>
          <div class="service-media img-frame">
            <img src="${s.image}" alt="${loc(s.title)}" loading="lazy" class="img-cover img-duo"/>
          </div>
        </article>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

/* -------- 11 — WHY NEGAH SABZ -------- */
export function renderWhy(ctx) {
  const items = t('home.why.items');
  return `
  <section class="section-pad bg-forest" id="why">
    <div class="container-x">
      ${sectionHeader({ label: t('home.why.label'), title: t('home.why.title') })}
      <div class="why-grid">
        ${items
          .map(
            (it, i) => `
        <article class="why-item" data-reveal="fade-up" style="--i:${i}">
          <span class="why-num ns-latin">${String(i + 1).padStart(2, '0')}</span>
          <h3 class="ns-h3">${it.t}</h3>
          <p class="ns-small">${it.d}</p>
        </article>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

/* -------- 12 — LEADERSHIP -------- */
export function renderLeadership(ctx) {
  return `
  <section class="section-pad-sm bg-ivory" id="leadership">
    <div class="container-x">
      ${sectionHeader({ label: t('home.leadership.label'), title: t('home.leadership.title'), sub: t('home.leadership.sub') })}
      <div class="lead-grid" data-stagger>
        ${company.leadership
          .map(
            (l) => `
        <figure class="lead-card" data-reveal="fade-up">
          <div class="img-frame lead-photo">
            <img src="${l.img}" alt="${loc(l.name)}" loading="lazy" class="img-cover img-duo"/>
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

/* -------- 13 — LATEST INSIGHTS -------- */
export function renderInsights(ctx) {
  const lang = ctx.lang;
  const [a, b, c, ...rest] = articles;
  return `
  <section class="section-pad bg-offwhite" id="insights">
    <div class="container-x">
      ${sectionHeader({ label: t('home.insights.label'), title: t('home.insights.title') })}
      <div class="insights-grid">
        <article class="insight-card is-lead" data-reveal="fade-up">
          <div class="img-frame insight-media">
            <img src="${a.img}" alt="${loc(a.title)}" loading="lazy" class="img-cover img-duo"/>
          </div>
          <div class="insight-body">
            <p class="ns-tiny insight-date">${loc(a.date)}</p>
            <h3 class="ns-h3">${loc(a.title)}</h3>
            <p class="ns-small">${loc(a.excerpt)}</p>
            <span class="link-arrow">${t('home.insights.readMore')} ${icon('arrow-right', 'icon-flip')}</span>
          </div>
        </article>
        <div class="insight-side">
          ${[b, c]
            .map(
              (ar) => `
          <article class="insight-card is-row" data-reveal="fade-up">
            <div class="insight-body">
              <p class="ns-tiny insight-date">${ar.date ? loc(ar.date) : t('home.insights.guide')}</p>
              <h3 class="ns-h3">${loc(ar.title)}</h3>
              <p class="ns-small">${loc(ar.excerpt)}</p>
            </div>
            <div class="img-frame insight-media-sm">
              <img src="${ar.img}" alt="${loc(ar.title)}" loading="lazy" class="img-cover img-duo"/>
            </div>
          </article>`
            )
            .join('')}
          <ul class="insight-rest ns-small" data-reveal="fade-up">
            ${rest.map((r) => `<li>${icon('info')}<span>${loc(r.title)}</span></li>`).join('')}
          </ul>
          ${btn(t('home.insights.viewAll'), `/${lang}/`, 'ghost-dark', { icon: false })}
        </div>
      </div>
    </div>
  </section>`;
}

/* -------- 14 — BUSINESS INQUIRY CTA -------- */
export function renderCTA(ctx) {
  const lang = ctx.lang;
  return `
  <section class="cta-final" id="cta">
    <div class="img-frame cta-bg">
      <img src="/images/atmos/cargo-sunset.webp" alt="" class="img-cover" data-parallax="0.15"/>
    </div>
    <div class="cta-veil"></div>
    <div class="container-x cta-content">
      <h2 class="ns-display" data-reveal="fade-up">${t('home.cta.title')}</h2>
      <p class="ns-lead" data-reveal="fade-up" data-delay="0.12">${t('home.cta.sub')}</p>
      <div data-reveal="fade-up" data-delay="0.24">
        ${btn(t('home.cta.btn'), `/${lang}/contact/`, 'primary')}
      </div>
    </div>
  </section>`;
}
