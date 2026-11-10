/**
 * Shared spec-key translations for products.
 * Usage: specs: [ { k: 'weight', v: { fa: '۵۰۰ گرم', en: '500 g', ... } } ]
 */

export const SPEC_KEYS = {
  type: { fa: 'نوع محصول', en: 'Product type', ru: 'Тип продукта', ar: 'نوع المنتج' },
  weight: { fa: 'وزن / حجم', en: 'Weight / Volume', ru: 'Вес / Объём', ar: 'الوزن / الحجم' },
  packaging: { fa: 'بسته‌بندی', en: 'Packaging', ru: 'Упаковка', ar: 'التعبئة' },
  origin: { fa: 'مبدأ', en: 'Origin', ru: 'Происхождение', ar: 'بلد المنشأ' },
  brand: { fa: 'برند', en: 'Brand', ru: 'Бренд', ar: 'العلامة التجارية' },
  export: { fa: 'قابلیت صادرات', en: 'Export availability', ru: 'Экспортная доступность', ar: 'جاهزية التصدير' },
  notes: { fa: 'نکات', en: 'Notes', ru: 'Примечания', ar: 'ملاحظات' },
};

/** Common spec values reused across products */
export const V = {
  exportYes: { fa: 'آماده تأمین و صادرات عمده', en: 'Ready for wholesale supply & export', ru: 'Готов к оптовым поставкам و экспорту', ar: 'جاهز للتوريد بالجملة والتصدير' },
  customPack: { fa: 'وزن‌ها و بسته‌بندی‌های متنوع مطابق نیاز بازار مقصد', en: 'Various weights & packaging tailored to the destination market', ru: 'Различные веса и упаковка под требования рынка', ar: 'أوزان وتعبئات متنوعة حسب متطلبات السوق المستهدف' },
  originIran: { fa: 'ایران', en: 'Iran', ru: 'Иран', ar: 'إيران' },
  originKhorasan: { fa: 'خراسان، ایران', en: 'Khorasan, Iran', ru: 'Хорасан, Иран', ar: 'خراسان، إيران' },
  originBam: { fa: 'بم، کرمان', en: 'Bam, Kerman', ru: 'Бам, Керман', ar: 'بام، كرمان' },
};
