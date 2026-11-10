/**
 * Contact page — hero, business inquiry form (8 fields + inquiry types),
 * office cards with verified contact data, contact info, CTA.
 * The form is frontend-ready: validation + states + documented API contract.
 */
import { t, loc } from '../core/i18n.js';
import { setSEO, setJSONLD, organizationLD } from '../core/seo.js';
import { breadcrumb } from '../components/ui.js';
import { icon, refreshIcons } from '../utils/icons.js';
import { company } from '../data/company.js';
import { api } from '../data/api.js';
import { showToast } from '../components/ui.js';

export default {
  render(ctx) {
    const lang = ctx.lang;
    return `
    ${renderHero(ctx)}
    <section class="section-pad bg-ivory" id="contact-body">
      <div class="container-x contact-grid">
        ${renderForm(ctx)}
        ${renderOffices(ctx)}
      </div>
    </section>
    ${renderInfoStrip(ctx)}
    ${renderCTA(ctx)}
    `;
  },

  async init(ctx) {
    setSEO({
      title: t('meta.contact.title'),
      desc: t('meta.contact.desc'),
      path: `/${ctx.lang}/contact/`,
    });
    setJSONLD(organizationLD(ctx.lang));
    refreshIcons();
    initForm(ctx);
    // prefill from ?product= / ?type= query params (product inquiry CTA)
    prefillFromQuery(ctx);
  },
};

/* ---------- hero ---------- */
function renderHero(ctx) {
  const lang = ctx.lang;
  return `
  <section class="page-hero page-hero-sm bg-forest-deep">
    <div class="img-frame ph-bg">
      <img src="/images/gallery/meeting-room.webp" alt="" class="img-cover" data-parallax="0.12"/>
    </div>
    <div class="ph-veil"></div>
    <div class="container-x ph-content">
      ${breadcrumb([{ name: t('product.breadcrumbHome'), path: `/${lang}/` }, { name: t('nav.contact') }])}
      <p class="ns-label" data-reveal="fade-up">${t('contact.hero.kicker')}</p>
      <h1 class="ns-display" data-reveal="fade-up" data-delay="0.1">${t('contact.hero.title')}</h1>
      <p class="ns-lead" data-reveal="fade-up" data-delay="0.2">${t('contact.hero.sub')}</p>
    </div>
  </section>`;
}

/* ---------- form ---------- */
function renderForm(ctx) {
  const f = t('contact.form');
  const types = t('contact.form.types');
  return `
  <div class="contact-form-wrap" data-reveal="fade-up">
    <h2 class="ns-h2">${f.title}</h2>
    <form class="ns-form" id="inquiry-form" novalidate>
      <div class="form-grid">
        <div class="field">
          <label for="cf-name">${f.name} <span class="req">*</span></label>
          <input id="cf-name" name="name" type="text" placeholder="${f.namePh}" autocomplete="name" required />
          <p class="f-error" data-for="name"></p>
        </div>
        <div class="field">
          <label for="cf-company">${f.company}</label>
          <input id="cf-company" name="company" type="text" placeholder="${f.companyPh}" autocomplete="organization" />
          <p class="f-error" data-for="company"></p>
        </div>
        <div class="field">
          <label for="cf-email">${f.email} <span class="req">*</span></label>
          <input id="cf-email" name="email" type="email" dir="ltr" placeholder="${f.emailPh}" autocomplete="email" required />
          <p class="f-error" data-for="email"></p>
        </div>
        <div class="field">
          <label for="cf-phone">${f.phone} <span class="req">*</span></label>
          <input id="cf-phone" name="phone" type="tel" dir="ltr" placeholder="${f.phonePh}" autocomplete="tel" required />
          <p class="f-error" data-for="phone"></p>
        </div>
        <div class="field">
          <label for="cf-country">${f.country} <span class="req">*</span></label>
          <input id="cf-country" name="country" type="text" placeholder="${f.countryPh}" required />
          <p class="f-error" data-for="country"></p>
        </div>
        <div class="field">
          <label for="cf-type">${f.inquiryType} <span class="req">*</span></label>
          <select id="cf-type" name="inquiryType" required>
            <option value="" selected disabled>${f.inquiryType}</option>
            <option value="export">${types.export}</option>
            <option value="import">${types.import}</option>
            <option value="sourcing">${types.sourcing}</option>
            <option value="manufacturing">${types.manufacturing}</option>
            <option value="logistics">${types.logistics}</option>
            <option value="general">${types.general}</option>
          </select>
          <p class="f-error" data-for="inquiryType"></p>
        </div>
        <div class="field span-2">
          <label for="cf-interest">${f.interest}</label>
          <input id="cf-interest" name="interest" type="text" placeholder="${f.interestPh}" />
          <p class="f-error" data-for="interest"></p>
        </div>
        <div class="field span-2">
          <label for="cf-message">${f.message} <span class="req">*</span></label>
          <textarea id="cf-message" name="message" rows="5" placeholder="${f.messagePh}" required></textarea>
          <p class="f-error" data-for="message"></p>
        </div>
      </div>
      <div class="form-foot">
        <button class="btn btn-primary" type="submit" id="cf-submit">
          <span class="cf-label">${f.submit}</span>
        </button>
        <p class="ns-tiny form-note">${t('product.inquiryNote')}</p>
      </div>
    </form>
  </div>`;
}

/* ---------- offices ---------- */
function renderOffices(ctx) {
  const hq = company.offices.find((o) => o.primary);
  return `
  <aside class="contact-offices" aria-label="${t('contact.offices.title')}">
    <h2 class="ns-h2" data-reveal="fade-up">${t('contact.offices.title')}</h2>
    <div class="offices-list" data-stagger>
      ${company.offices
        .map(
          (o) => `
      <article class="office-card ${o.primary ? 'is-hq' : ''}" data-reveal="fade-up">
        <header>
          <p class="ns-label">${o.primary ? t('contact.offices.primary') : t('home.presence.office')}</p>
          <h3 class="ns-h3">${loc(o.city)} · ${loc(o.country)}</h3>
        </header>
        ${o.address ? `<p class="ns-small office-address">${icon('map-pin')}<span>${loc(o.address)}</span></p>` : ''}
        <div class="office-actions">
          <a class="nf-contact" href="tel:${o.phone}">${icon('phone')}<span dir="ltr">${o.phoneDisplay}</span></a>
          ${o.mobile ? `<a class="nf-contact" href="tel:${o.mobile}">${icon('smartphone')}<span dir="ltr">${o.mobileDisplay}</span></a>` : ''}
          ${o.manager ? `<p class="ns-tiny office-manager">${o.manager[document.documentElement.lang] || ''}</p>` : ''}
        </div>
      </article>`
        )
        .join('')}
    </div>
    <div class="office-note ns-tiny" data-reveal="fade-up">
      ${icon('info')}
      <p>${t('contact.info.label')}: ${company.email}</p>
    </div>
  </aside>`;
}

/* ---------- info strip + final CTA ---------- */
function renderInfoStrip(ctx) {
  const hq = company.offices.find((o) => o.primary);
  return `
  <section class="section-pad-sm bg-forest">
    <div class="container-x info-strip" data-stagger>
      <div class="info-item">
        <span class="info-ico">${icon('phone')}</span>
        <div><p class="ns-tiny">${t('contact.info.phone')}</p><a href="tel:${hq.phone}" dir="ltr" class="ns-h3">${hq.phoneDisplay}</a></div>
      </div>
      <div class="info-item">
        <span class="info-ico">${icon('mail')}</span>
        <div><p class="ns-tiny">Email</p><a href="mailto:${company.email}" dir="ltr" class="ns-h3" style="font-size:1.15rem">${company.email}</a></div>
      </div>
      <div class="info-item">
        <span class="info-ico">${icon('globe')}</span>
        <div><p class="ns-tiny">${t('contact.info.web')}</p><span dir="ltr" class="ns-h3" style="font-size:1.15rem">${company.website}</span></div>
      </div>
    </div>
  </section>`;
}

function renderCTA(ctx) {
  const lang = ctx.lang;
  return `
  <section class="cta-final">
    <div class="img-frame cta-bg">
      <img src="/images/atmos/port-cranes.webp" alt="" class="img-cover" data-parallax="0.14"/>
    </div>
    <div class="cta-veil"></div>
    <div class="container-x cta-content">
      <h2 class="ns-display" data-reveal="fade-up">${t('home.cta.title')}</h2>
      <p class="ns-lead" data-reveal="fade-up" data-delay="0.12">${t('home.cta.sub')}</p>
      <div data-reveal="fade-up" data-delay="0.24">
        <a class="btn btn-primary" href="mailto:${company.email}">${company.email}</a>
      </div>
    </div>
  </section>`;
}

/* ---------- behaviour ---------- */
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RE_PHONE = /^[+]?[\d\s()-]{7,20}$/;

function setFieldError(form, name, msg) {
  const field = form.querySelector(`[name="${name}"]`)?.closest('.field');
  if (!field) return;
  field.classList.toggle('has-error', !!msg);
  const errEl = field.querySelector('.f-error');
  if (errEl) errEl.textContent = msg || '';
}

function validate(form) {
  const f = t('contact.form');
  const data = Object.fromEntries(new FormData(form).entries());
  const errors = {};
  if (!data.name?.trim()) errors.name = f.errors.name;
  if (!RE_EMAIL.test(data.email || '')) errors.email = f.errors.email;
  if (!RE_PHONE.test(data.phone || '')) errors.phone = f.errors.phone;
  if (!data.country?.trim()) errors.country = f.errors.country;
  if (!data.inquiryType) errors.inquiryType = f.errors.inquiryType;
  if (!data.message || data.message.trim().length < 10) errors.message = f.errors.message;
  Object.keys(errors).forEach((k) => setFieldError(form, k, errors[k]));
  const ok = !Object.keys(errors).length;
  if (!ok) {
    const first = form.querySelector('.field.has-error input, .field.has-error select, .field.has-error textarea');
    first?.focus();
  }
  return { ok, data };
}

function initForm(ctx) {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { ok, data } = validate(form);
    if (!ok) return;

    const submit = document.getElementById('cf-submit');
    const label = submit.querySelector('.cf-label');
    const origLabel = label.textContent;
    submit.disabled = true;
    label.innerHTML = `<span class="ns-spinner"></span> ${t('contact.form.sending')}`;

    const res = await api.sendInquiry({ ...data, lang: ctx.lang });

    submit.disabled = false;
    label.textContent = origLabel;

    if (res.ok) {
      showToast(t('contact.form.okNote'));
      form.reset();
    } else {
      // honest offline state — never pretend delivery happened
      showToast(t('contact.form.offlineNote'));
    }
  });

  // live re-validation on blur
  form.querySelectorAll('input, select, textarea').forEach((el) => {
    el.addEventListener('blur', () => {
      if (el.closest('.field')?.classList.contains('has-error')) validate(form);
    });
  });
}

function prefillFromQuery(ctx) {
  const q = ctx.query || {};
  if (q.product) {
    const el = document.getElementById('cf-interest');
    if (el) el.value = q.product;
  }
  if (q.type) {
    const sel = document.getElementById('cf-type');
    if (sel && sel.querySelector(`option[value="${q.type}"]`)) sel.value = q.type;
  }
}
