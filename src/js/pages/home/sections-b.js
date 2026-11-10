/**
 * Homepage — Sections 05–08: product showcase, manufacturing, export journey, global presence.
 */
import { t, loc } from '../../core/i18n.js';
import { sectionHeader, btn, productCard } from '../../components/ui.js';
import { icon } from '../../utils/icons.js';
import { getFeatured } from '../../data/products/index.js';
import { company } from '../../data/company.js';

/* -------- 05 — EXPORT SHOWCASE (horizontal) -------- */
export function renderShowcase(ctx) {
  const lang = ctx.lang;
  const featured = getFeatured();
  return `
  <section class="showcase bg-forest-deep" id="showcase" aria-label="${t('home.showcase.title')}">
    <div class="showcase-head">
      <div class="container-wide">
        ${sectionHeader({ label: t('home.showcase.label'), title: t('home.showcase.title'), sub: t('home.showcase.sub') })}
      </div>
    </div>
    <div class="showcase-viewport" data-stagger>
      <div class="showcase-track" id="showcase-track">
        <div class="showcase-intro">
          <p class="ns-latin">EXPORT CATALOG</p>
          <p class="ns-small">${featured.length} ${t('home.showcase.item')}</p>
          ${btn(t('home.showcase.viewAll'), `/${lang}/products/`, 'primary')}
        </div>
        ${featured.map((p) => productCard(p, { reveal: false })).join('')}
        <div class="showcase-outro">
          <p class="ns-h3">${t('catalog.wholesaleNote')}</p>
        </div>
      </div>
    </div>
  </section>`;
}

export function initShowcase() {
  const section = document.getElementById('showcase');
  const track = document.getElementById('showcase-track');
  if (!section || !track) return;
  import('../../animations/motion.js').then(({ initHorizontalSection, prefersReducedMotion }) => {
    if (prefersReducedMotion() || window.innerWidth < 1024) {
      section.classList.add('is-native');
      return;
    }
    initHorizontalSection(section.querySelector('.showcase-viewport'), track);
  });
}

/* -------- 06 — MANUFACTURING -------- */
const STEP_MEDIA = [
  '/images/atmos/roastery-c.webp',
  '/images/products/p-40907.webp',
  '/images/gallery/sorting-workers.webp',
  '/images/gallery/dates-luxury.webp',
  '/images/atmos/packaging-line.webp',
];

export function renderManufacturing(ctx) {
  const steps = t('home.manufacturing.steps');
  return `
  <section class="section-pad bg-offwhite" id="manufacturing">
    <div class="container-x">
      ${sectionHeader({ label: t('home.manufacturing.label'), title: t('home.manufacturing.title'), sub: t('home.manufacturing.sub') })}
      <div class="mfg-rail-wrap">
        <div class="mfg-steps">
          ${steps
            .map(
              (s, i) => `
            <article class="mfg-step" data-reveal="fade-up">
              <div class="mfg-media img-frame">
                <img src="${STEP_MEDIA[i]}" alt="${s.t}" loading="lazy" class="img-cover img-duo"/>
                <span class="mfg-num ns-latin">0${i + 1}</span>
              </div>
              <div class="mfg-body">
                <h3 class="ns-h3">${s.t}</h3>
                <p class="ns-small">${s.d}</p>
              </div>
            </article>`
            )
            .join('')}
        </div>
        <p class="ns-tiny mfg-note" data-reveal="fade-up">${t('home.manufacturing.galleryNote')} ${icon('info')}</p>
      </div>
    </div>
  </section>`;
}

/* -------- 07 — THE EXPORT JOURNEY -------- */
export function renderJourney(ctx) {
  const steps = t('home.journey.steps');
  return `
  <section class="section-pad bg-forest" id="journey">
    <div class="container-x">
      ${sectionHeader({ label: t('home.journey.label'), title: t('home.journey.title'), sub: t('home.journey.sub') })}
      <div class="journey-wrap">
        <svg class="journey-line-svg" viewBox="0 0 1200 900" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path class="journey-line" d="M60 80 C 300 80, 320 660, 600 680 S 880 240, 1120 180" stroke="#B78A48" stroke-width="1.6" stroke-dasharray="7 9"/>
          <path class="journey-line j2" d="M60 80 C 300 80, 320 660, 600 680 S 880 240, 1120 180" stroke="#B78A48" stroke-width="2.4" stroke-linecap="round"/>
        </svg>
        <ol class="journey-steps" role="list">
          ${steps
            .map(
              (s, i) => `
            <li class="j-step" data-reveal="fade-up" style="--i:${i}">
              <span class="j-dot"></span>
              <span class="j-num ns-latin">${String(i + 1).padStart(2, '0')}</span>
              <h3 class="ns-h3 j-title">${s.t}</h3>
              <p class="ns-small j-desc">${s.d}</p>
            </li>`
            )
            .join('')}
        </ol>
      </div>
    </div>
  </section>`;
}

export function initJourney() {
  const lines = document.querySelectorAll('.journey-line');
  if (!lines.length) return;
  import('../../animations/motion.js').then(({ gsap, ScrollTrigger, prefersReducedMotion }) => {
    if (prefersReducedMotion()) return;
    lines.forEach((l) => {
      const len = l.getTotalLength();
      l.style.setProperty('--len', len);
      gsap.fromTo(
        l,
        { strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.journey-wrap', start: 'top 78%', end: 'bottom 55%', scrub: 0.9 },
        }
      );
    });
  });
}

/* -------- 08 — GLOBAL PRESENCE -------- */
export function renderPresence(ctx) {
  const lang = ctx.lang;
  const hq = company.offices.find((o) => o.primary);
  const intl = company.offices.filter((o) => !o.primary);
  return `
  <section class="section-pad bg-ivory" id="presence">
    <div class="container-x">
      ${sectionHeader({ label: t('home.presence.label'), title: t('home.presence.title'), sub: t('home.presence.sub') })}
      <div class="presence-grid">
        <div class="presence-map ns-globe-wrap" id="presence-globe" data-reveal="fade-up">
          <p class="presence-drag ns-tiny">${t('home.presence.drag')}</p>
        </div>
        <div class="presence-list">
          <article class="presence-card is-hq" data-reveal="fade-up">
            <div>
              <p class="ns-label">${t('home.presence.hq')}</p>
              <h3 class="ns-h3">${loc(hq.city)} — ${loc(hq.country)}</h3>
              <p class="ns-small">${loc(hq.address)}</p>
              <a class="nf-contact" href="tel:${hq.phone}">${icon('phone')}<span dir="ltr">${hq.phoneDisplay}</span></a>
            </div>
          </article>
          ${intl
            .map(
              (o) => `
          <article class="presence-card" data-reveal="fade-up">
            <div>
              <p class="ns-label">${t('home.presence.office')}</p>
              <h3 class="ns-h3">${loc(o.city)} — ${loc(o.country)}</h3>
              ${o.address ? `<p class="ns-small">${loc(o.address)}</p>` : ''}
              <a class="nf-contact" href="tel:${o.phone}">${icon('phone')}<span dir="ltr">${o.phoneDisplay}</span></a>
            </div>
          </article>`
            )
            .join('')}
          <a class="link-arrow" href="/${lang}/contact/">${t('contact.hero.title')} ${icon('arrow-right', 'icon-flip')}</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function initPresence(ctx) {
  const wrap = document.getElementById('presence-globe');
  if (!wrap) return;
  const setup = async () => {
    try {
      if (!window.WebGLRenderingContext) throw new Error('no webgl');
      const { TradeGlobe } = await import('../../three/globe.js');
      const globe = new TradeGlobe(wrap, {
        points: [
          { id: 'hq', lat: 36.29, lng: 59.6, hq: true, name: t('home.presence.hq') },
          { id: 'ru', lat: 55.75, lng: 37.61, name: loc(company.offices[2].city) },
          { id: 'tj', lat: 38.56, lng: 68.79, name: 'Dushanbe' },
          { id: 'uz', lat: 41.31, lng: 69.24, name: 'Tashkent' },
          { id: 'om', lat: 23.59, lng: 58.41, name: 'Muscat' },
        ],
        labels: true,
      });
      // globe creates label buttons; give them localized text + office-card interactions
      const labelText = {
        hq: t('home.presence.hq'),
        ru: loc(company.offices[2].city),
        tj: 'Dushanbe',
        uz: 'Tashkent',
        om: 'Muscat',
      };
      wrap.querySelectorAll('.globe-label').forEach((el) => {
        const id = el.dataset.point;
        el.textContent = labelText[id] || '';
        el.addEventListener('click', () => {
          const cards = document.querySelectorAll('.presence-card');
          const idx = { hq: 0, ru: 1, tj: 2, uz: 3, om: 4 }[id];
          cards[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          cards[idx]?.classList.add('is-flash');
          setTimeout(() => cards[idx]?.classList.remove('is-flash'), 1600);
        });
      });
      ctx.pageCleanup = () => globe.dispose();
    } catch (e) {
      wrap.innerHTML = `<img src="/images/atmos/cargo-aerial.webp" alt="" class="img-cover" style="border-radius:6px"/>`;
    }
  };
  setup();
}
