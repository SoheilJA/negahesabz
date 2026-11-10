/**
 * Homepage — composes all 15 sections (hero → footer handled globally).
 */
import { t } from '../../core/i18n.js';
import { setSEO, setJSONLD, organizationLD } from '../../core/seo.js';
import { renderHero, initHero } from './hero.js';
import { renderIntro, renderGlance, renderDivisions } from './sections-a.js';
import {
  renderShowcase, initShowcase, renderManufacturing,
  renderJourney, initJourney, renderPresence, initPresence,
} from './sections-b.js';
import {
  renderBrands, renderServices, renderWhy, renderLeadership,
  renderInsights, renderCTA,
} from './sections-c.js';

export default {
  render(ctx) {
    return `
    ${renderHero(ctx)}
    ${renderIntro(ctx)}
    ${renderGlance(ctx)}
    ${renderDivisions(ctx)}
    ${renderShowcase(ctx)}
    ${renderManufacturing(ctx)}
    ${renderJourney(ctx)}
    ${renderPresence(ctx)}
    ${renderBrands(ctx)}
    ${renderServices(ctx)}
    ${renderWhy(ctx)}
    ${renderLeadership(ctx)}
    ${renderInsights(ctx)}
    ${renderCTA(ctx)}
    `;
  },

  async init(ctx) {
    setSEO({
      title: t('meta.home.title'),
      desc: t('meta.home.desc'),
      path: `/${ctx.lang}/`,
    });
    setJSONLD(organizationLD(ctx.lang));

    initHero(ctx);
    initShowcase();
    initJourney();
    initPresence(ctx);
  },
};
