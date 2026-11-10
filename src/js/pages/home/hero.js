/**
 * Homepage — Section 01: cinematic hero with the Three.js trade globe.
 */
import { t, loc } from '../../core/i18n.js';
import { btn } from '../../components/ui.js';
import { company } from '../../data/company.js';

export function renderHero(ctx) {
  const lang = ctx.lang;
  return `
  <section class="hero ns-hero" id="hero" aria-label="${t('hero.network')}">
    <div class="ns-globe-wrap hero-globe" id="hero-globe" aria-hidden="true"></div>
    <div class="hero-veil" aria-hidden="true"></div>
    <div class="container-x hero-content">
      <p class="ns-label" data-reveal="fade-up">${t('hero.kicker')}</p>
      <h1 class="ns-display hero-title">
        <span class="ht-line" data-reveal="fade-up" data-delay="0.1">${t('hero.titleA')}</span>
        <span class="ht-line ht-gold" data-reveal="fade-up" data-delay="0.22">${t('hero.titleB')}</span>
      </h1>
      <p class="ns-lead hero-sub" data-reveal="fade-up" data-delay="0.34">${t('hero.sub')}</p>
      <div class="hero-ctas" data-reveal="fade-up" data-delay="0.46">
        ${btn(t('hero.ctaPrimary'), `/${lang}/about/`, 'primary')}
        ${btn(t('hero.ctaSecondary'), `/${lang}/products/`, 'ghost-light')}
      </div>
      <div class="hero-meta ns-tiny" data-reveal="fade-up" data-delay="0.6">
        <span>${loc(company.foundedClaim)}</span>
        <span class="hm-dot"></span>
        <span dir="ltr">${company.email}</span>
      </div>
    </div>
    <a class="hero-scroll-cue" href="#intro">${t('hero.scroll')}<span class="line"></span></a>
  </section>
  <div class="hero-marquee bg-forest-deep" aria-hidden="true">
    <div class="marquee-track">
      ${Array.from({ length: 2 })
        .map(() => company.markets[lang].map((m) => `<span class="mq-item">${m}</span>`).join(''))
        .join('')}
    </div>
  </div>`;
}

export function initHero(ctx) {
  const wrap = document.getElementById('hero-globe');
  if (!wrap) return;

  const setup = async () => {
    try {
      if (!window.WebGLRenderingContext) throw new Error('no webgl');
      const { TradeGlobe } = await import('../../three/globe.js');
      const globe = new TradeGlobe(wrap, {
        points: [
          { id: 'hq', lat: 36.29, lng: 59.6, hq: true },
          { id: 'ru', lat: 55.75, lng: 37.61 },
          { id: 'tj', lat: 38.56, lng: 68.79 },
          { id: 'uz', lat: 41.31, lng: 69.24 },
          { id: 'om', lat: 23.59, lng: 58.41 },
        ],
      });
      ctx.pageCleanup = () => globe.dispose();
    } catch (e) {
      wrap.innerHTML = `<img src="/images/atmos/cargo-sunset.webp" alt="" class="img-cover" style="opacity:.5"/>`;
    }
  };
  setup();
}

export default { renderHero, initHero };
