/**
 * Company data — extracted from negahesabz.com (see docs/content-inventory.md).
 * All facts verified against the source website. No invented statistics.
 */

export const company = {
  name: {
    fa: 'هلدینگ بازرگانی نگاه سبز',
    en: 'Negah Sabz International Trading Holding',
    ru: 'Международный торговый холдинг «Негахе Сабз»',
    ar: 'هلدینج التجارة الدولية نظر سبز',
  },
  shortName: {
    fa: 'نگاه سبز',
    en: 'Negah Sabz',
    ru: 'Негахе Сабз',
    ar: 'نظر سبز',
  },
  legalName: {
    fa: 'شرکت تجارت بین‌الملل نگاه سبز',
    en: 'PayamTejarat Negahe Sabz International Trading Group',
    ru: 'PayamTejarat Negahe Sabz International Trading Group',
    ar: 'شركة بايام تجارت نگاه سبز للتجارة الدولية',
  },
  registrationNo: '62435',
  email: 'info@negahesabz.com',
  website: 'negahesabz.com',
  phoneMain: '+985137237544',
  foundedClaim: {
    fa: 'بیش از ۲۰ سال تجربه در صادرات محصولات ایرانی',
    en: 'More than 20 years of experience exporting Iranian products',
    ru: 'Более 20 лет опыта экспорта иранской продукции',
    ar: 'أكثر من 20 عامًا من الخبرة في تصدير المنتجات الإيرانية',
  },

  /* Verifiable figures only (source: homepage FA + EN) */
  stats: {
    years: 20,          // "بیش از 20 سال تجربه" — homepage
    exportProducts: 80, // "exporting 80 products" — EN homepage
    dateCountries: 20,  // "to more than 20 countries" — EN homepage (dates)
    officeCountries: 4, // Russia, Tajikistan, Uzbekistan, Oman — homepage
    categories: 14,     // categories preserved from the source catalog
  },

  tagline: {
    fa: 'از ظرفیت تولید ایران تا بازارهای جهانی',
    en: 'From Iran’s production capacity to global markets',
    ru: 'От производственного потенциала Ирана к мировым рынкам',
    ar: 'من القدرة الإنتاجية الإيرانية إلى الأسواق العالمية',
  },

  intro: {
    fa: 'هلدینگ نگاه سبز با هدف توسعه تجارت بین‌المللی و معرفی محصولات باکیفیت ایرانی به بازارهای منطقه و جهان فعالیت می‌کند؛ با ایجاد زنجیره‌ای مطمئن از تأمین، فرآوری، تولید، بسته‌بندی، کنترل کیفیت و صادرات.',
    en: 'Negah Sabz Holding works to develop international trade and introduce high-quality Iranian products to regional and global markets — through a reliable chain of sourcing, processing, manufacturing, packaging, quality control and export.',
    ru: 'Холдинг «Негахе Сабз» развивает международную торговлю и выводит качественную иранскую продукцию на рынки региона и мира — через надёжную цепочку: закупка, переработка, производство, упаковка, контроль качества и экспорт.',
    ar: 'يعمل هولدينغ «نظر سبز» على تطوير التجارة الدولية وتقديم المنتجات الإيرانية عالية الجودة إلى أسواق المنطقة والعالم — عبر سلسلة موثوقة من التوريد والتصنيع والتعبئة وجودة التحكم والتصدير.',
  },

  about: {
    fa: 'شرکت نگاه سبز در زمینه تجارت بین‌الملل، صادرات و واردات انواع کالا، تولید و بسته‌بندی محصولات غذایی، رست و فرآوری قهوه، سورت و بسته‌بندی خرمای صادراتی و خدمات لجستیک بین‌المللی فعالیت می‌کند. فعالیت‌های این مجموعه در حوزه محصولاتی مانند خرما، شیر خشک و محصولات پودری، قهوه و نوشیدنی‌های فوری، رب گوجه‌فرنگی و سایر محصولات غذایی شکل گرفته و متناسب با نیاز هر بازار توسعه پیدا می‌کند.',
    en: 'Negah Sabz operates in international trade, import and export, food manufacturing and packaging, coffee roasting and processing, export date sorting and packaging, and international logistics. Its portfolio spans dates, milk powder and powdered products, coffee and instant beverages, tomato paste and other food lines — developed market by market.',
    ru: 'Компания «Негахе Сабз» работает в сферах международной торговли, импорта и экспорта, производства и упаковки пищевых продуктов, обжарки и переработки кофе, сортировки и упаковки экспортных фиников и международной логистики. Портфель охватывает финики, сухое молоко и порошковые продукты, кофе и растворимые напитки, томатную пасту и другие продуктовые направления.',
    ar: 'تعمل شركة «نظر سبز» في التجارة الدولية والاستيراد والتصدير وإنتاج وتعبئة المواد الغذائية وتحميص ومعالجة القهوة وفرز وتعبئة التمور التصديرية والخدمات اللوجستية الدولية. يشمل محفظتها التمور ومسحوق الحليب والمنتجات البودرة والقهوة والمشروبات الفورية ومعجون الطماطم وغيرها من الخطوط الغذائية.',
  },

  /* Source homepage: offices in Russia, Tajikistan, Uzbekistan, Oman */
  presence: {
    fa: 'نگاه سبز با داشتن دفاتر فروش در روسیه، تاجیکستان، ازبکستان و عمان، شریک مطمئن صادرات به بازارهای آسیای میانه، روسیه، حوزه خلیج فارس و سایر بازارهای منطقه‌ای است.',
    en: 'With sales offices in Russia, Tajikistan, Uzbekistan and Oman, Negah Sabz is a reliable export partner for Central Asian, Russian, Persian Gulf and other regional markets.',
    ru: 'Имея торговые офисы в России, Таджикистане, Узбекистане и Омане, «Негахе Сабз» — надёжный экспортный партнёр для рынков Центральной Азии, России, Персидского залива и других регионов.',
    ar: 'بفضل مكاتب بيع في روسيا وطاجيكستان وأوزبكستان وسلطنة عمان، تُعد «نظر سبز» شريكًا موثوقًا للتصدير إلى أسواق آسيا الوسطى وروسيا والخليج وباقي الأسواق الإقليمية.',
  },

  leadership: [
    {
      id: 'ghayouri',
      name: { fa: 'حمیدرضا غیوری', en: 'Hamidreza Ghayouri', ru: 'Хамидреза Гайори', ar: 'حميدرضا غيوري' },
      role: { fa: 'رئیس هیئت مدیره', en: 'Chairman of the Board', ru: 'Председатель совета директоров', ar: 'رئيس مجلس الإدارة' },
      img: '/images/leaders/ghayouri.webp',
    },
    {
      id: 'haddadi',
      name: { fa: 'مهندس حسین حدادی', en: 'Eng. Hossein Hadadi', ru: 'Хоссейн Хаддади', ar: 'المهندس حسين حدادي' },
      role: { fa: 'مدیرعامل', en: 'Chief Executive Officer', ru: 'Генеральный директор', ar: 'المدير التنفيذي' },
      img: '/images/leaders/haddadi.webp',
    },
  ],

  /* Offices — verified from fa/contact + en/contact (Russia conflict flagged in docs) */
  offices: [
    {
      id: 'mashhad',
      city: { fa: 'مشهد', en: 'Mashhad', ru: 'Мешхед', ar: 'مشهد' },
      country: { fa: 'ایران', en: 'Iran', ru: 'Иран', ar: 'إيران' },
      label: { fa: 'دفتر مرکزی', en: 'Headquarters', ru: 'Головной офис', ar: 'المكتب الرئيسي' },
      address: {
        fa: 'مشهد، چهارراه مجد، برج فروردین، واحد ۶۰۴',
        en: 'Farvardin Tower, Majd Sq., Unit 604, Mashhad, Iran',
        ru: 'Мешхед, пл. Мадж, башня Фарвардин, офис 604, Иран',
        ar: 'مشهد، ساحة مجد، برج فروردين، الوحدة 604',
      },
      phone: '+985137237544',
      phoneDisplay: '+98 51 3723 7544',
      primary: true,
    },
    {
      id: 'tehran',
      city: { fa: 'تهران', en: 'Tehran', ru: 'Тегеран', ar: 'طهران' },
      country: { fa: 'ایران', en: 'Iran', ru: 'Иран', ar: 'إيران' },
      label: { fa: 'دفتر تهران', en: 'Tehran Office', ru: 'Офис в Тегеране', ar: 'مكتب طهران' },
      address: {
        fa: 'جردن، برج مشکی (ساختمان مرکز تجارت ایران)، طبقه ۴، واحد ۱',
        en: 'Jordan, Moshki Tower (Iran Trade Center Bldg.), 4th Floor, Unit 1, Tehran',
        ru: 'Тегеран, Джордан, башня Мошки (Иран Трейд Сентр), 4 этаж, офис 1',
        ar: 'جردن، برج مشكي (مبنى مركز التجارة الإيراني)، الطابق 4، الوحدة 1',
      },
      phone: '+982122016149',
      phoneDisplay: '+98 21 2201 6149',
      mobile: '+989123494062',
      mobileDisplay: '+98 912 349 4062',
      manager: { fa: 'مدیریت: مهندس ناصربیک', en: 'Manager: Eng. Naserbeik', ru: 'Руководитель: инж. Насербайк', ar: 'المدير: المهندس ناصربيك' },
    },
    {
      id: 'russia',
      city: { fa: 'مسکو', en: 'Moscow', ru: 'Москва', ar: 'موسكو' },
      country: { fa: 'روسیه', en: 'Russia', ru: 'Россия', ar: 'روسيا' },
      label: { fa: 'دفتر روسیه', en: 'Russia Office', ru: 'Офис в России', ar: 'مكتب روسيا' },
      /* FA source: Moscow, Food City, Block E1, No.103. EN source lists Kazan — flagged in content inventory. */
      address: {
        fa: 'روسیه، مسکو، بازار فود سیتی، بلوک E1، شماره ۱۰۳',
        en: 'Food City Market, Block E1, No. 103, Moscow, Russia',
        ru: 'Москва, рынок Фуд Сити, блок E1, №103, Россия',
        ar: 'موسكو، سوق فود سيتي، بلوك E1، رقم 103، روسيا',
      },
      phone: '+79656000887',
      phoneDisplay: '+7 965 600 0887',
    },
    {
      id: 'oman',
      city: { fa: 'عمان', en: 'Oman', ru: 'Оман', ar: 'عُمان' },
      country: { fa: 'عمان', en: 'Oman', ru: 'Оман', ar: 'سلطنة عمان' },
      label: { fa: 'دفتر عمان', en: 'Oman Office', ru: 'Офис в Омане', ar: 'مكتب عمان' },
      address: null, // no published address — phone only (per source contact page)
      phone: '+96891286704',
      phoneDisplay: '+968 9128 6704',
    },
  ],

  /* Office countries for the global presence globe (verified) */
  globePoints: [
    { id: 'iran', lat: 36.29, lng: 59.6, hq: true },        // Mashhad HQ
    { id: 'russia', lat: 55.75, lng: 37.61 },                // Moscow
    { id: 'tajikistan', lat: 38.56, lng: 68.79 },   // Dushanbe
    { id: 'uzbekistan', lat: 41.31, lng: 69.24 },            // Tashkent
    { id: 'oman', lat: 23.59, lng: 58.41 },                  // Muscat
  ],

  markets: {
    fa: ['روسیه', 'تاجیکستان', 'ازبکستان', 'عمان', 'کازاخستان', 'ترکمنستان', 'قرقیزستان', 'عراق', 'امارات', 'افغانستان', 'چین', 'کشورهای حوزه خلیج فارس', 'اروپا', 'کانادا', 'استرالیا', 'آفریقا', 'مالزی'],
    en: ['Russia', 'Tajikistan', 'Uzbekistan', 'Oman', 'Kazakhstan', 'Turkmenistan', 'Kyrgyzstan', 'Iraq', 'UAE', 'Afghanistan', 'China', 'Persian Gulf States', 'Europe', 'Canada', 'Australia', 'Africa', 'Malaysia'],
    ru: ['Россия', 'Таджикистан', 'Узбекистан', 'Оман', 'Казахстан', 'Туркменистан', 'Кыргызстан', 'Ирак', 'ОАЭ', 'Афганистан', 'Китай', 'Страны Персидского залива', 'Европа', 'Канада', 'Австралия', 'Африка', 'Малайзия'],
    ar: ['روسيا', 'طاجيكستان', 'أوزبكستان', 'عمان', 'كازاخستان', 'تركمانستان', 'قيرغيزستان', 'العراق', 'الإمارات', 'أفغانستان', 'الصين', 'دول الخليج', 'أوروبا', 'كندا', 'أستراليا', 'أفريقيا', 'ماليزيا'],
  },

  certificates: [
    { img: '/images/gallery/cert-iso22000.webp', caption: { fa: 'گواهینامه ISO 22000', en: 'ISO 22000 certificate', ru: 'Сертификат ISO 22000', ar: 'شهادة ISO 22000' } },
    { img: '/images/gallery/cert-dnv.webp', caption: { fa: 'گواهینامه DNV ISO 9001', en: 'DNV ISO 9001 certificate', ru: 'Сертификат DNV ISO 9001', ar: 'شهادة DNV ISO 9001' } },
    { img: '/images/gallery/cert-tuv.webp', caption: { fa: 'گواهینامه TUV ایران', en: 'TUV Iran certificate', ru: 'Сертификат TUV Iran', ar: 'شهادة TUV إيران' } },
  ],
};

export default company;
