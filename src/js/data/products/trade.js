/** Trade-line products (construction, petrochemical) — source: negahesabz.com catalog page 5. */
import { V } from './helpers.js';

export const tradeProducts = [
  {
    id: 'building-stone',
    img: '/images/products/p-32457.webp',
    category: 'construction',
    brand: null,
    slug: { fa: 'سنگ-ساختمانی', en: 'building-stone', ru: 'stroitelnui-kamen', ar: 'حجر-البناء' },
    name: { fa: 'سنگ ساختمانی', en: 'Building Stone', ru: 'Строительный камень', ar: 'حجر البناء' },
    desc: {
      fa: 'تهیه و صادرات انواع سنگ ساختمانی ایران؛ تراورتن، مرمریت و گرانیت.',
      en: 'Sourcing and export of Iranian building stones — travertine, marble and granite.',
      ru: 'Поставка и экспорт иранского строительного камня — травертин, мрамор, гранит.',
      ar: 'توريد وتصدير حجر البناء الإيراني — الترافرتين والرخام والغرانيت.',
    },
    specs: [
      { k: 'type', v: { fa: 'سنگ ساختمانی', en: 'Building stone', ru: 'Строительный камень', ar: 'حجر بناء' } },
      { k: 'packaging', v: { fa: 'سنگ‌بری و بسته‌بندی مطابق سفارش', en: 'Cut & packed to order', ru: 'Нарезка и упаковка под заказ', ar: 'قص وتعبئة حسب الطلب' } },
      { k: 'origin', v: V.originIran },
    ],
  },
  {
    id: 'rebar',
    img: '/images/products/p-32453.webp',
    category: 'construction',
    brand: null,
    slug: { fa: 'میلگرد', en: 'rebar', ru: 'armatura', ar: 'حديد-التسليح' },
    name: { fa: 'تهیه و صادرات میلگرد', en: 'Rebar Supply & Export', ru: 'Арматура: поставка и экспорт', ar: 'حديد التسليح: توريد وتصدير' },
    desc: {
      fa: 'تهیه و صادرات میلگرد آجدار در سایزهای مختلف از کارخانه‌های معتبر فولاد ایران.',
      en: 'Sourcing and export of deformed rebar in various sizes from Iran’s trusted steel mills.',
      ru: 'Поставка и экспорт рифлёной арматуры различных размеров с надёжных иранских металлургических заводов.',
      ar: 'توريد وتصدير حديد تسليح مجدول بمقاسات مختلفة من مصانع الفولاذ الإيرانية الموثوقة.',
    },
    specs: [
      { k: 'type', v: { fa: 'میلگرد آجدار', en: 'Deformed rebar', ru: 'Рифлёная арматура', ar: 'حديد تسليح مجدول' } },
      { k: 'packaging', v: { fa: 'سفارشی مطابق استاندارد حمل', en: 'Custom bundled per transport standard', ru: 'Пакеты по стандарту перевозки', ar: 'حزم حسب معيار النقل' } },
      { k: 'origin', v: V.originIran },
    ],
  },
  {
    id: 'float-glass',
    img: '/images/products/p-9025.webp',
    category: 'construction',
    brand: null,
    slug: { fa: 'شیشه-فلوت', en: 'float-glass', ru: 'flosteklo', ar: 'زجاج-عائم' },
    name: { fa: 'تهیه و صادرات شیشه فلوت', en: 'Float Glass Supply & Export', ru: 'Флоат-стекло: поставка и экспорт', ar: 'الزجاج العائم: توريد وتصدير' },
    desc: {
      fa: 'شیشه فلوت در ضخامت‌های مختلف؛ برای ساختمان و صنایع شیشه‌ای.',
      en: 'Float glass in various thicknesses — for construction and glass industries.',
      ru: 'Флоат-стекло различной толщины — для строительства и стекольной промышленности.',
      ar: 'زجاج عائم بسماكات مختلفة — للبناء وصناعات الزجاج.',
    },
    specs: [
      { k: 'type', v: { fa: 'شیشه فلوت', en: 'Float glass', ru: 'Флоат-стекло', ar: 'زجاج عائم' } },
      { k: 'packaging', v: { fa: 'جعبه‌چوبی و ایمن‌سازی صادراتی', en: 'Wooden crates, export-safe', ru: 'Деревянные ящики, экспортная упаковка', ar: 'صناديق خشبية بتأمين تصديري' } },
      { k: 'origin', v: V.originIran },
    ],
  },
  {
    id: 'sulfur',
    img: '/images/products/p-9369.webp',
    category: 'petrochemical',
    brand: null,
    slug: { fa: 'گوگرد-پودری-و-گرانوله', en: 'sulfur-powder-granules', ru: 'sera-poroshok-granuly', ar: 'الكبريت-المسحوق-والحبيبي' },
    name: { fa: 'تهیه و صادرات گوگرد پودری و گرانوله', en: 'Sulfur Powder & Granules', ru: 'Сера порошковая и гранулированная', ar: 'الكبريت المسحوق والحبيبي' },
    desc: {
      fa: 'گوگرد پودری و گرانوله صادراتی؛ از خطوط تجاری پتروشیمی مجموعه.',
      en: 'Export-grade powder and granule sulfur — from the holding’s petrochemical trade lines.',
      ru: 'Экспортная сера в порошке и гранулах — из нефтехимических торговых направлений холдинга.',
      ar: 'كبريت تصديري مسحوق وحبيبي — من الخطوط التجارية البتروكيماوية.',
    },
    specs: [
      { k: 'type', v: { fa: 'گوگرد پودری / گرانوله', en: 'Sulfur powder / granules', ru: 'Сера порошковая / гранулированная', ar: 'كبريت مسحوق / حبيبي' } },
      { k: 'packaging', v: { fa: 'جامبو و کیسه عمده', en: 'Jumbo & bulk bags', ru: 'Биг-бэги и насыпью', ar: 'أكياس جامبو وبالجملة' } },
      { k: 'origin', v: V.originIran },
    ],
  },
  {
    id: 'pet-closures',
    img: '/images/products/p-8896.webp',
    category: 'petrochemical',
    brand: null,
    slug: { fa: 'درب-پت', en: 'pet-closures', ru: 'pet-kryshki', ar: 'أغطية-PET' },
    name: { fa: 'تهیه و صادرات درب پت', en: 'PET Closures', ru: 'ПЭТ-крышки', ar: 'أغطية PET' },
    desc: {
      fa: 'درب‌ها و پیش‌فرم‌های پت برای صنایع نوشیدنی؛ در چارچوب محصولات پتروشیمی.',
      en: 'PET closures and preforms for the beverage industry — within the petrochemical product range.',
      ru: 'ПЭТ-крышки и преформы для напиточной промышленности — в составе нефтехимической продукции.',
      ar: 'أغطية وحاويات PET ما قبل التشكيل لصناعة المشروبات — ضمن المنتجات البتروكيماوية.',
    },
    specs: [
      { k: 'type', v: { fa: 'درب پت', en: 'PET closures', ru: 'ПЭТ-крышки', ar: 'أغطية PET' } },
      { k: 'packaging', v: { fa: 'کارتن‌های صنعتی', en: 'Industrial cartons', ru: 'Промышленные коробки', ar: 'كراتون صناعية' } },
      { k: 'origin', v: V.originIran },
    ],
  },
  {
    id: 'carpet-moquette',
    img: '/images/products/p-8134.webp',
    category: 'construction',
    brand: null,
    slug: { fa: 'موکت', en: 'carpet-moquette', ru: 'kovroline', ar: 'موكيت' },
    name: { fa: 'تهیه و صادرات موکت', en: 'Carpet & Moquette', ru: 'Ковролин: поставка и экспорт', ar: 'موكيت: توريد وتصدير' },
    desc: {
      fa: 'موکت و کفپوش‌های ایرانی؛ تهیه و صادرات برای پروژه‌های ساختمانی.',
      en: 'Iranian carpets and floor coverings — sourced and exported for construction projects.',
      ru: 'Иранские ковры и напольные покрытия — поставка и экспорт для строительных проектов.',
      ar: 'سجاد إيراني وأرضيات — توريد وتصدير للمشاريع الإنشائية.',
    },
    specs: [
      { k: 'type', v: { fa: 'موکت', en: 'Moquette carpet', ru: 'Ковролин', ar: 'موكيت' } },
      { k: 'packaging', v: { fa: 'رول‌های صادراتی', en: 'Export rolls', ru: 'Экспортные рулоны', ar: 'لفات تصديرية' } },
      { k: 'origin', v: V.originIran },
    ],
  },
];
