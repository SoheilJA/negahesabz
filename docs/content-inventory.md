# Content Inventory — Negah Sabz Redesign

Research phase output. Every important item extracted from the live website
(negahesabz.com) with its source, destination in the new frontend, and flags.
Generated during Phase 1 (research) before implementation.

---

## 1. Company identity

| Item | Extracted value | Source page | New location | Flags |
|---|---|---|---|---|
| Legal name (FA) | هلدینگ بازرگانی نگاه سبز | home | global brand/footer | — |
| Legal name (EN) | PayamTejarat Negahe Sabz International Trading Group | /en | Organization JSON-LD, footer | — |
| Registration No. | 62435 | /en | About → credentials | — |
| Experience claim | «بیش از ۲۰ سال تجربه در صادرات محصولات ایرانی» | home, /en | hero/about counters | Verified claim, wording preserved |
| Domain | negahesabz.com | — | SEO canonical base | — |
| Copyright notice | © 2017 negahesabz.com | footer | footer © line | Historical; kept as-is with year range note |
| Email | info@negahesabz.com | contact | contact page, footer | Verified |
| Fixed phone | 05137237544 (+98 51 3723 7544) | contact | office card | Verified |

## 2. Management & people

| Name | Role | Source | New location |
|---|---|---|---|
| حمید‌رضا غیوری (Hamidreza Ghayouri) | رئیس هیئت مدیره / Chairman | home «پرسنل» | About leadership + home section 12 |
| مهندس حسین حدادی (Eng. Hossein Hadadi) | مدیرعامل / CEO | home «پرسنل» | About leadership + home section 12 |
| مهندس ناصربیک (Eng. Naserbeik) | مدیریت دفتر تهران / Tehran office | contact | Contact offices |
| Authentic portraits | 2 photos (500×600) | /store/files/personnel | public/images/leaders/ |

⚠ No other employees invented.

## 3. Offices & contact

| Office | Address | Phone | Source | Flag |
|---|---|---|---|---|
| Mashhad HQ | مشهد، چهارراه مجد، برج فروردین، واحد ۶۰۴ | +98 51 3723 7544 | fa/contact | Verified, primary |
| Tehran | جردن، برج مشکی (ساختمان مرکز تجارت ایران)، طبقه ۴، واحد ۱ | +98 21 2201 6149, +98 912 349 4062 | fa/contact | Verified |
| Russia (FA version) | روسیه، مسکو، بازار فود سیتی، بلوک E1، شماره ۱۰۳ | — | fa/contact | **CONFLICT** with EN |
| Russia (EN version) | No. 103, Block E1, Alley 7, Tykhorskaya St., Kazan | +7 965 600 0887 | en/contact | **CONFLICT** with FA (Moscow vs Kazan) → both preserved, flagged for client confirmation; card shows «آدرس رسمی: مسکو — بازار فود سیتی» with note |
| Oman | — (phone only) | +968 9128 6704 | fa/contact | Phone verified; address not published |
| Tajikistan, Uzbekistan | Mentioned as sales-office countries on homepage | home | Global presence (marked as office countries) | No street addresses published |

## 4. Verified business facts (used for counters & divisions)

- Sales offices: Russia, Tajikistan, Uzbekistan, Oman (homepage FA).
- Export destinations (FA homepage): Central Asia, Russia, Africa, Afghanistan, Malaysia, Australia, Persian Gulf region.
- Export destinations (EN homepage): Afghanistan, Tajikistan, Kazakhstan, Turkmenistan, Kyrgyzstan, Uzbekistan, Iraq, UAE, Russia, China, EU, Canada.
- Saffron (Shadiar brand) exported to: UAE, Iraq, China, Hong Kong, Australia, EU, Canada, US (EN home).
- Dates (Mazafati, Piarom, Kaluteh) exported to 20+ countries (EN home).
- «۸۰ محصول صادراتی» (EN home) → used as «تعداد محصولات صادراتی: +۸۰».
- Coffee roasting factory in Mashhad — «یکی از مجموعه‌های بزرگ رست و فرآوری قهوه در شرق کشور» (blog).
- Date sorting & packaging factory «تمام اتومات» (home FA).
- Certificates shown in company gallery: ISO 22000:2005, DNV ISO 9001, TUV Iran management system (gallery images g-10650/51/52) — presented as «اسناد مستندشده در گالری شرکت» without additional claims.

## 5. Product catalog (57 real products with authentic photos)

Categories preserved from source: قهوه (coffee & instant beverages), خرما (dates),
پسته (pistachio), زعفران (saffron), کشمش/خشکبار (raisins & dried fruits), چای (tea),
رب گوجه‌فرنگی (tomato paste), آبمیوه (juice), شیر خشک (milk powder), محصولات غذایی (food),
لوازم بهداشتی (hygiene), مصالح ساختمانی (construction), پتروشیمی (petrochemical).

Full extracted list (60 titles → 57 unique images):

**Coffee & instant beverages — brand Suncreez**: mocha 500g packet; instant espresso 500g;
coffee-mix 3-in-1 500g; coffee-mix 2-in-1 sugar-free 500g; coffee-mix 3-in-1; coffee-mix 2-in-1;
latte powder 500g; instant milk powder; coffee creamer 500g; hot chocolate 500g; cappuccino 500g;
instant coffee; roasted beans 30/70; 100% arabica; 100% robusta; 50/50; coffee bean types.
**Dates — brands Suncreez/Shadiar**: Mazafati IML 400/600/800g; Mazafati luxury; Piarom luxury;
Mazafati Shadiar 650g / 2kg / zip-lock 650g / talqi 400+800g / carton×12 / stand pack;
Mazafati Suncreez 600g; Kaluteh 5kg (Suncreez & Shadiar); Kabkab 5kg Shadiar; boxed ×12.
**Other foods**: black tea (Shadiar) & green tea & kark tea; pasta; tomato paste (can + sachet);
milk powder (Mark One); honey milk; yeast (Shadiar 500g); fruit roll (lavashak); filled chocolate;
juices: pineapple, mango, pomegranate, peach.
**Nuts & saffron**: Iranian pistachios; saffron export line.
**Trade lines (services + catalog entries)**: green/black tea export; building stone; rebar;
profiles; sulfur powder/granules; float glass; PET closures; oil; carpet.

⚠ Catalog pages 4–5 contain generic «تهیه و صادرات …» trade-line entries — kept as
catalog items under «خطوط تجاری» categories, not as manufactured food products.

## 6. Services (source «خدمات» menu)

1. واردات و ترخیص کالا (import & customs clearance)
2. صادرات و ترخیص کالا (export & customs clearance)
3. حمل و نقل و ترانزیت (international transport & transit — rail/land/sea)
4. تحقیق و بازاریابی (market research)
5. صادرات میوه و سبزیجات (fruit & vegetable exports)
6. خدمات حمل و نقل ریلی (rail logistics — sub-brand «Negah Sabz Sanabad» packaging plant)

## 7. Brands

| Brand | Products | Source | New presentation |
|---|---|---|---|
| Suncreez (سانکریز) | coffee, coffee-mix, latte, creamer, cappuccino, hot chocolate, instant drinks, dates, juices | catalog | Dark editorial brand block + product collection |
| Shadiar (شادیار) | dates, tea, saffron, yeast, black tea | catalog + EN home (saffron) | Ivory editorial brand block + product collection |

## 8. Blog / insights (real articles, dates preserved)

1. کارخانه رست قهوه در مشهد؛ آشنایی با کارخانه رست تخصصی قهوه نگاه سبز — ۱۳ آبان ۱۴۰۵
2. بزرگ‌ترین تأمین‌کننده قهوه در شرق کشور | سانکریز — ۲۰ مهر ۱۴۰۵
3. رستری قهوه — ۱۶ شهریور ۱۴۰۵
4. واردات قهوه به ایران؛ راهنمای جامع — ۵ شهریور ۱۴۰۵
Guide articles (no dates): معرفی انواع چای ایرانی / خرما / پسته / انجیر / زعفران.

## 9. Multimedia assets

- 74 authentic gallery photos (900×700): date packaging range, saffron sorting,
  factory & sorting workers, warehouse/trucks, ISO certificates, trade events → 34 selected.
- 57 authentic product photos (800×835) → all used.
- 2 leadership portraits → used.
- Curated royalty-free atmospheric photography (roastery, cargo ships, containers,
  warehouses, produce close-ups) for storytelling sections where no authentic photo exists.

## 10. Conflicts & decisions

1. **Russia office city**: FA says Moscow (Food City), EN says Kazan (Tykhorskaya) →
   both preserved in data; the FA/EN cards keep their own language's source text; flagged here.
2. **Management names**: FA lists two managers (Hadadi & Gheyouri) on contact page,
   EN lists only Haddadi → leadership section uses the two verified people + photos.
3. **Oman office**: phone only, no address → card without address, no invented address.
4. **«بزرگ‌ترین تأمین‌کننده قهوه در شرق کشور»** marketing claim from blog title →
   softened to the sourced wording «از مجموعه‌های بزرگ رست و فرآوری قهوه در شرق کشور».
5. Old footer «© 2017» → replaced with dynamic year, noted here.
