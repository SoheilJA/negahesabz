/**
 * 404 page — elegant not-found state in the current language.
 */
import { t } from '../core/i18n.js';
import { setSEO } from '../core/seo.js';
import { btn } from '../components/ui.js';
import { logoMarkInline } from '../components/logo.js';

export default {
  render(ctx) {
    const lang = ctx.lang;
    return `
    <section class="notfound bg-forest-deep section-pad">
      <div class="container-x nf-content">
        <div class="nf-mark" aria-hidden="true">${logoMarkInline()}</div>
        <p class="ns-404-code">404</p>
        <h1 class="ns-h2">${t('common.notFoundTitle')}</h1>
        <p class="ns-lead">${t('common.notFoundSub')}</p>
        <div class="nf-cta">
          ${btn(t('common.notFoundCta'), `/${lang}/`, 'primary')}
          ${btn(t('nav.products'), `/${lang}/products/`, 'ghost-light')}
        </div>
      </div>
    </section>`;
  },

  async init(ctx) {
    setSEO({
      title: t('meta.notfound.title'),
      desc: t('meta.notfound.desc'),
      path: `/${ctx.lang}/`,
    });
  },
};
