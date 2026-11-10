/**
 * i18n engine — language state, direction, translation lookup.
 */
import fa from '../../locales/fa.json';
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';
import ar from '../../locales/ar.json';

export const LANGS = ['fa', 'en', 'ru', 'ar'];
export const DEFAULT_LANG = 'fa';
export const RTL_LANGS = ['fa', 'ar'];

export const LOCALES = { fa, en, ru, ar };

export const LANG_META = {
  fa: { label: 'فارسی', short: 'FA', dir: 'rtl', intl: 'Persian' },
  en: { label: 'English', short: 'EN', dir: 'ltr', intl: 'English' },
  ru: { label: 'Русский', short: 'RU', dir: 'ltr', intl: 'Russian' },
  ar: { label: 'العربية', short: 'AR', dir: 'rtl', intl: 'Arabic' },
};

let current = DEFAULT_LANG;

export function getLang() {
  return current;
}

export function isRTL(lang = current) {
  return RTL_LANGS.includes(lang);
}

export function setLang(lang) {
  if (!LANGS.includes(lang)) lang = DEFAULT_LANG;
  current = lang;
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', LANG_META[lang].dir);
  return current;
}

/** Translate a dotted key path; optional {placeholders}. */
export function t(key, vars) {
  const dict = LOCALES[current];
  const val = key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), dict);
  if (val === undefined) {
    if (import.meta.env.DEV) console.warn(`[i18n] missing key "${key}" in ${current}`);
    return key;
  }
  if (typeof val === 'string' && vars) {
    return val.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
  }
  return val;
}

/** Pick the localized field of a data object ({fa, en, ru, ar}). */
export function loc(field) {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  return field[current] ?? field.fa ?? field.en ?? '';
}

export default { t, loc, getLang, setLang, isRTL, LANGS, LANG_META, RTL_LANGS };
