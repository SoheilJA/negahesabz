/**
 * Product categories — preserved from the source catalog
 * (negahesabz.com/محصولات-صادراتی). Slugs are per-language.
 */

export const categories = [
  {
    id: 'coffee',
    slug: { fa: 'قهوه', en: 'coffee', ru: 'kofe', ar: 'قهوة' },
    name: { fa: 'قهوه و دانه‌های رست‌شده', en: 'Coffee & Roasted Beans', ru: 'Кофе и обжаренные зёрна', ar: 'القهوة وحبوب التحميص' },
    icon: 'coffee',
    hero: '/images/atmos/coffee-beans.webp',
    desc: {
      fa: 'دانه‌های عربیکا و روبوستا، بلندهای رست‌شده و قهوه فوری — از رستری تخصصی در شرق کشور.',
      en: 'Arabica and robusta beans, roasted blends and instant coffee — from a specialized roastery in eastern Iran.',
      ru: 'Зёрна арабики и робусты, обжаренные бленды и растворимый кофе — из специализированной обжарочной на востоке Ирана.',
      ar: 'حبوب أرابيكا وروبوستا وخلطات محمّصة وقهوة فورية — من محمصة متخصصة في شرق إيران.',
    },
  },
  {
    id: 'instant-drinks',
    slug: { fa: 'نوشیدنی-فوری', en: 'instant-drinks', ru: 'rastvorimye-napitki', ar: 'مشروبات-فورية' },
    name: { fa: 'نوشیدنی‌های فوری و پودری', en: 'Instant & Powdered Beverages', ru: 'Растворимые и порошковые напитки', ar: 'المشروبات الفورية والبودرة' },
    icon: 'cup-soda',
    hero: '/images/atmos/espresso-cup.webp',
    desc: {
      fa: 'کافی‌میکس، موکا، لاته، کاپوچینو، هات‌چاکلت، کافی‌کریمر و پودر شیر — برند سانکریز.',
      en: 'Coffee-mix, mocha, latte, cappuccino, hot chocolate, coffee creamer and milk powder — under the Suncreez brand.',
      ru: 'Кофе-микс, мокка, латте, капучино, горячий шоколад, кремер и сухое молоко — бренд Suncreez.',
      ar: 'قهوة مكس وموكا ولاتيه وكابتشينو وشوكولاتة ساخنة وكريمر القهوة ومسحوق الحليب — العلامة Suncreez.',
    },
  },
  {
    id: 'dates',
    slug: { fa: 'خرما', en: 'dates', ru: 'finiki', ar: 'تمور' },
    name: { fa: 'خرمای صادراتی', en: 'Export Dates', ru: 'Экспортные финики', ar: 'تمور التصدير' },
    icon: 'leaf',
    hero: '/images/atmos/dates.webp',
    desc: {
      fa: 'مضافتی، پیارم، کلوته و کبکاب — سورت و بسته‌بندی تمام‌اتومات به روش بهداشتی، در وزن‌ها و بسته‌بندی‌های متنوع.',
      en: 'Mazafati, Piarom, Kaluteh and Kabkab — fully automated, hygienic sorting and packaging in varied weights and formats.',
      ru: 'Мазафати, Пиаром, Калуте и Кабкаб — полностью автоматическая гигиеническая сортировка и упаковка в различных форматах.',
      ar: 'مضفطي وبيارم وكلوته وكبكاب — فرز وتعبئة أوتوماتيكية بالكامل وبطرق صحية بأوزان وتعبئات متنوعة.',
    },
  },
  {
    id: 'tea',
    slug: { fa: 'چای', en: 'tea', ru: 'chay', ar: 'شاي' },
    name: { fa: 'چای', en: 'Tea', ru: 'Чай', ar: 'الشاي' },
    icon: 'coffee',
    hero: '/images/atmos/tea.webp',
    desc: {
      fa: 'چای سیاه، سبز و کرک — بسته‌بندی و صادرات با برندهای سانکریز و شادیار.',
      en: 'Black, green and Kark teas — packaged and exported under the Suncreez and Shadiar brands.',
      ru: 'Чёрный, зелёный чай и карк — упаковка и экспорт под брендами Suncreez и Shadiar.',
      ar: 'شاي أسود وأخضر وكرْك — تعبئة وتصدير تحت علامتي Suncreez وShadiar.',
    },
  },
  {
    id: 'pistachio',
    slug: { fa: 'پسته', en: 'pistachio', ru: 'fistashki', ar: 'فستق' },
    name: { fa: 'پسته', en: 'Pistachios', ru: 'Фисташки', ar: 'الفستق الحلبي' },
    icon: 'nut',
    hero: '/images/atmos/pistachio.webp',
    desc: {
      fa: 'پسته ایرانی درجه یک — بسته‌بندی و صادرات به بازارهای هدف.',
      en: 'Premium Iranian pistachios — packaged and exported to target markets.',
      ru: 'Премиальные иранские фисташки — упаковка и экспорт на целевые рынки.',
      ar: 'فستق إيراني فاخر — تعبئة وتصدير إلى الأسواق المستهدفة.',
    },
  },
  {
    id: 'saffron',
    slug: { fa: 'زعفران', en: 'saffron', ru: 'shafran', ar: 'زعفران' },
    name: { fa: 'زعفران', en: 'Saffron', ru: 'Шафран', ar: 'الزعفران' },
    icon: 'flower-2',
    hero: '/images/atmos/saffron.webp',
    desc: {
      fa: 'زعفران ارگانیک خراسان با برند شادیار — تولید، بسته‌بندی و صادرات.',
      en: 'Organic Khorasan saffron under the Shadiar brand — grown, packaged and exported.',
      ru: 'Органический хорасанский шафран под брендом Shadiar — производство, упаковка и экспорт.',
      ar: 'زعفران خراسان العضوي تحت علامة Shadiar — إنتاج وتعبئة وتصدير.',
    },
  },
  {
    id: 'dried-fruits',
    slug: { fa: 'خشکبار', en: 'dried-fruits', ru: 'sukhofrukty', ar: 'مجففات' },
    name: { fa: 'خشکبار و کشمش', en: 'Dried Fruits & Raisins', ru: 'Сухофрукты и изюм', ar: 'المجففات والزبيب' },
    icon: 'grape',
    hero: '/images/atmos/raisins.webp',
    desc: {
      fa: 'کشمش و انواع خشکبار ایرانی — تهیه، بسته‌بندی و صادرات.',
      en: 'Iranian raisins and dried fruits — sourcing, packaging and export.',
      ru: 'Иранский изюм и сухофрукты — закупка, упаковка и экспорт.',
      ar: 'الزبيب والمجففات الإيرانية — توريد وتعبئة وتصدير.',
    },
  },
  {
    id: 'tomato-paste',
    slug: { fa: 'رب-گوجه', en: 'tomato-paste', ru: 'tomatnaya-pasta', ar: 'معجون-الطماطم' },
    name: { fa: 'رب گوجه‌فرنگی', en: 'Tomato Paste', ru: 'Томатная паста', ar: 'معجون الطماطم' },
    icon: 'circle-dot',
    hero: '/images/atmos/tomato.webp',
    desc: {
      fa: 'رب گوجه‌فرنگی صادراتی در قوطی و ساشه — تهیه و صادرات.',
      en: 'Export-grade tomato paste in cans and sachets — sourcing and export.',
      ru: 'Экспортная томатная паста в банках и саше — поставка и экспорт.',
      ar: 'معجون طماطم بدرجة التصدير في علب وأكياس — توريد وتصدير.',
    },
  },
  {
    id: 'juice',
    slug: { fa: 'آبمیوه', en: 'juice', ru: 'soki', ar: 'عصائر' },
    name: { fa: 'آبمیوه', en: 'Fruit Juice', ru: 'Фруктовые соки', ar: 'العصائر' },
    icon: 'citrus',
    hero: '/images/products/p-37350.webp',
    desc: {
      fa: 'آبمیوه‌های طبیعی آناناس، انبه، انار و هلو — برند سانکریز برای بازارهای منطقه‌ای و جهانی.',
      en: 'Pineapple, mango, pomegranate and peach juices — the Suncreez brand for regional and international markets.',
      ru: 'Соки ананаса, манго, граната и персика — бренд Suncreez для региональных и мировых рынков.',
      ar: 'عصائر الأناناس والمانجو والرمان والخوخ — علامة Suncreez للأسواق الإقليمية والعالمية.',
    },
  },
  {
    id: 'milk-powder',
    slug: { fa: 'شیر-خشک', en: 'milk-powder', ru: 'sukhoe-moloko', ar: 'مسحوق-الحليب' },
    name: { fa: 'شیر خشک و پودری', en: 'Milk Powder', ru: 'Сухое молоко', ar: 'مسحوق الحليب' },
    icon: 'milk',
    hero: '/images/products/p-38581.webp',
    desc: {
      fa: 'شیر خشک صنعتی، پودر شیر فوری و شیر عسلی — تأمین و صادرات.',
      en: 'Industrial milk powder, instant milk powder and honey milk — sourcing and export.',
      ru: 'Промышленное сухое молоко, быстрорастворимое сухое молоко и молоко с мёдом — поставка и экспорт.',
      ar: 'مسحوق حليب صناعي وحليب فوري وحليب بالعسل — توريد وتصدير.',
    },
  },
  {
    id: 'food',
    slug: { fa: 'محصولات-غذایی', en: 'food-products', ru: 'produkty', ar: 'منتجات-غذائية' },
    name: { fa: 'محصولات غذایی', en: 'Food Products', ru: 'Продукты питания', ar: 'المنتجات الغذائية' },
    icon: 'utensils-crossed',
    hero: '/images/products/p-39464.webp',
    desc: {
      fa: 'ماکارونی، خمیرمایه، لواشک، شکلات مغزدار و سایر محصولات غذایی بسته‌بندی‌شده.',
      en: 'Pasta, yeast, fruit leather, filled chocolate and other packaged food products.',
      ru: 'Макароны, дрожжи, фруктовая пастила, шоколад с начинкой и другие упакованные продукты.',
      ar: 'معكرونة وخميرة ولواشك وشوكولاتة محشوة وغيرها من المنتجات الغذائية المعلبة.',
    },
  },
  {
    id: 'construction',
    slug: { fa: 'مصالح-ساختمانی', en: 'construction-materials', ru: 'stroitmaterialy', ar: 'مواد-البناء' },
    name: { fa: 'مصالح ساختمانی', en: 'Construction Materials', ru: 'Строительные материалы', ar: 'مواد البناء' },
    icon: 'building-2',
    hero: '/images/products/p-32457.webp',
    desc: {
      fa: 'سنگ ساختمانی، میلگرد، پروفیل، شیشه فلوت و ایزوگام — تهیه و صادرات.',
      en: 'Building stone, rebar, profiles, float glass and waterproofing membrane — sourcing and export.',
      ru: 'Строительный камень, арматура, профили, флоат-стекло и гидроизоляция — поставка и экспорт.',
      ar: 'حجر البناء وحديد التسليح والبروفيلات والزجاج العائم والعزل المائي — توريد وتصدير.',
    },
  },
  {
    id: 'petrochemical',
    slug: { fa: 'پتروشیمی', en: 'petrochemicals', ru: 'neftehimiya', ar: 'بتروكيماويات' },
    name: { fa: 'محصولات پتروشیمی', en: 'Petrochemical Products', ru: 'Нефтехимическая продукция', ar: 'المنتجات البتروكيماوية' },
    icon: 'flask-conical',
    hero: '/images/products/p-9369.webp',
    desc: {
      fa: 'گوگرد پودری و گرانوله، درب پت، روغن و گرانول‌های صنعتی — تهیه و صادرات.',
      en: 'Powder and granule sulfur, PET closures, oil and industrial granules — sourcing and export.',
      ru: 'Порошковая и гранулированная сера, ПЭТ-крышки, масло и промышленные гранулы — поставка и экспорт.',
      ar: 'الكبريت المسحوق والحبيبي وأغطية PET والزيوت والحبيبات الصناعية — توريد وتصدير.',
    },
  },
  {
    id: 'hygiene',
    slug: { fa: 'لوازم-بهداشتی', en: 'hygiene-products', ru: 'gigiyena', ar: 'مستلزمات-النظافة' },
    name: { fa: 'لوازم بهداشتی', en: 'Hygiene Products', ru: 'Гигиеническая продукция', ar: 'مستلزمات النظافة' },
    icon: 'spray-can',
    hero: null,
    desc: {
      fa: 'مواد شوینده، صابون، وازلین، شامپو و محصولات سلولزی — به‌عنوان خط تجاری در چارچوب صادرات.',
      en: 'Detergents, soap, vaseline, shampoo and cellulose products — supplied as a trade line within the export framework.',
      ru: 'Моющие средства, мыло, вазелин, шампуни и целлюлозная продукция — поставляется как торговое направление.',
      ar: 'المنظفات والصابون والفازلين والشامبو والمنتجات السيلولوزية — ضمن خط تجاري في إطار التصدير.',
    },
  },
];

export const getCategory = (id) => categories.find((c) => c.id === id);

export default categories;
