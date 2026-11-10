/**
 * Brands — Suncreez & Shadiar, preserved from the source catalog.
 */

export const brands = [
  {
    id: 'suncreez',
    latin: 'SUNCREEZ',
    local: { fa: 'سانکریز', en: 'Suncreez', ru: 'Suncreez', ar: 'سانكريز' },
    theme: 'dark',
    images: ['/images/products/p-40907.webp', '/images/products/p-40816.webp', '/images/products/p-40458.webp', '/images/products/p-37350.webp'],
    tagline: {
      fa: 'نوشیدنی‌های فوری و قهوه',
      en: 'Instant Beverages & Coffee',
      ru: 'Растворимые напитки и кофе',
      ar: 'المشروبات الفورية والقهوة',
    },
    desc: {
      fa: 'سانکریز برند تخصصی نگاه سبز در حوزه قهوه و نوشیدنی‌های فوری است. محصولات این برند — از کافی‌میکس و موکا تا لاته، کاپوچینو، هات‌چاکلت و آبمیوه — در کارخانه مجموعه تولید و بسته‌بندی می‌شود و هم برای بازار داخلی و هم برای بازارهای صادراتی عرضه می‌گردد. تمرکز سانکریز بر دانه‌های باکیفیت، رست اصولی، بسته‌بندی حرفه‌ای و حفظ تازگی محصول است.',
      en: 'Suncreez is Negah Sabz’s specialist brand for coffee and instant beverages. Its range — from coffee-mix and mocha to latte, cappuccino, hot chocolate and juices — is produced and packaged in the holding’s own plant, serving both the domestic market and export markets. Suncreez focuses on quality beans, proper roasting, professional packaging and product freshness.',
      ru: 'Suncreez — специализированный бренд «Негахе Сабз» в категории кофе и растворимых напитков. Продукция — от кофе-микса и мокки до латте, капучино, горячего шоколада и соков — производится и упаковывается на собственном заводе холдинга для внутреннего рынка и на экспорт. Suncreez делает ставку на качественные зёрна, правильную обжарку, профессиональную упаковку и свежесть продукта.',
      ar: 'سانكريز هي العلامة المتخصصة لـ«نظر سبز» في القهوة والمشروبات الفورية. منتجاتها — من قهوة مكس والموكا إلى اللاتيه والكابتشينو والشوكولاتة الساخنة والعصائر — تُنتج وتُعبأ في مصنع المجموعة نفسه وتُقدَّم للسوق المحلية وأسواق التصدير. تركّز سانكريز على الحبوب عالية الجودة والتحميص الصحيح والتعبئة الاحترافية والحفاظ على الطزاجة.',
    },
  },
  {
    id: 'shadiar',
    latin: 'SHADIAR',
    local: { fa: 'شادیار', en: 'Shadiar', ru: 'Shadiar', ar: 'شاديار' },
    theme: 'light',
    images: ['/images/products/p-35560.webp', '/images/products/p-35881.webp', '/images/gallery/saffron-box.webp', '/images/products/p-35624.webp'],
    tagline: {
      fa: 'خرما، چای، زعفران و محصولات غذایی',
      en: 'Dates, Tea, Saffron & Food Products',
      ru: 'Финики, чай, шафран и продукты питания',
      ar: 'التمور والشاي والزعفران والمنتجات الغذائية',
    },
    desc: {
      fa: 'شادیار برند نگاه سبز برای خرمای صادراتی، چای، زعفران ارگانیک خراسان و محصولات غذایی است. زعفران شادیار به کشورهای امارات، عراق، چین، هنگ‌کنگ، استرالیا، اروپا، کانادا و آمریکا صادر می‌شود و خرمای مضافتی، کلوته و کبکاب شادیار در بسته‌بندی‌های متنوع به بیش از ۲۰ کشور عرضه می‌گردد.',
      en: 'Shadiar is Negah Sabz’s brand for export dates, tea, organic Khorasan saffron and food products. Shadiar saffron is exported to the UAE, Iraq, China, Hong Kong, Australia, Europe, Canada and the US, while Shadiar Mazafati, Kaluteh and Kabkab dates reach more than 20 countries in varied packaging.',
      ru: 'Shadiar — бренд «Негахе Сабз» для экспортных фиников, чая, органического хорасанского шафрана и продуктов питания. Шафран Shadiar экспортируется в ОАЭ, Ирак, Китай, Гонконг, Австралию, Европу, Канаду и США, а финики Мазафати, Калуте и Кабкаб поставляются более чем в 20 стран в разнообразной упаковке.',
      ar: 'شاديار هي علامة «نظر سبز» للتمور التصديرية والشاي والزعفران الخراساني العضوي والمنتجات الغذائية. يُصدَّر زعفران شاديار إلى الإمارات والعراق والصين وهونغ كونغ وأستراليا وأوروبا وكندا وأمريكا، بينما تصل تمور مضفطي وكلوته وكبكاب إلى أكثر من 20 دولة بتعبئات متنوعة.',
    },
  },
];

export const getBrand = (id) => brands.find((b) => b.id === id);

export default brands;
