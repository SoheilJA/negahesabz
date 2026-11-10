# Negah Sabz — Premium Multilingual Frontend

The complete frontend redesign of **Negah Sabz International Trading Holding**
(هلدینگ بازرگانی نگاه سبز) — a cinematic, art-directed digital experience for an
international trading & food-industry holding.

Built with **vanilla JavaScript (ES modules)**, **Vite**, **Tailwind CSS v4**,
**GSAP + ScrollTrigger**, **Lenis**, **Three.js**, **Anime.js** and **Lucide icons**.
No React / Vue / Svelte / Angular — by design.

---

## 1. Project requirements

- Four complete languages: **fa** (default), **en**, **ru**, **ar** — with correct RTL/LTR.
- Pages: Homepage (15 sections), About, Contact (inquiry form), Product catalog, Product detail.
- Data-driven catalog with per-language URLs and stable product IDs.
- Cinematic preloader, 3D trade-route globe, pinned horizontal showcase, scroll storytelling.
- Backend-ready architecture: content lives in a structured data layer behind an API facade.
- Content extracted from the live negahesabz.com — see `docs/content-inventory.md`
  for the full research inventory, verified facts and flagged conflicts.

## 2. Installation

```bash
npm install
```

Requires Node.js ≥ 18.

## 3. Development

```bash
npm run dev        # start Vite dev server (http://localhost:5173)
```

## 4. Production build

```bash
npm run build      # outputs dist/
```

## 5. Previewing the production build

```bash
npm run preview    # serves dist/ with SPA history fallback
```

## 6. Project structure

```
negah-sabz/
├── public/
│   ├── favicon.svg              # the “green gaze” mark
│   ├── robots.txt
│   ├── sitemap.xml              # generated (268 URLs, hreflang alternates)
│   └── images/
│       ├── products/            # 59 authentic product photos (WebP)
│       ├── gallery/             # 34 authentic company photos (factory, sorting, ISO certs…)
│       ├── leaders/            # 2 authentic management portraits
│       └── atmos/              # curated royalty-free editorial photography
├── src/
│   ├── styles/
│   │   ├── main.css            # design tokens (@theme), base, typography
│   │   ├── components.css      # buttons, nav, cards, forms, chips, footer
│   │   ├── animations.css     # preloader, reveals, hero, keyframes
│   │   ├── home.css           # homepage section layouts
│   │   └── pages.css          # about/contact/catalog/product/404 layouts
│   ├── locales/               # fa.json, en.json, ru.json, ar.json (UI strings)
│   └── js/
│       ├── core/              # app bootstrap, router, i18n, seo, preloader
│       ├── components/        # header, footer, logo, shared UI builders
│       ├── animations/        # motion system (GSAP/Lenis), micro-interactions (Anime.js)
│       ├── three/            # TradeGlobe (Three.js dot-matrix continents + routes)
│       ├── data/             # company, categories, brands, services, articles,
│       │                     #   api facade (backend-ready) + products/{coffee,food,trade}
│       ├── pages/            # home/, about.js, contact.js, catalog.js, product.js, notfound.js
│       └── utils/            # icons (Lucide)
├── scripts/generate-sitemap.mjs
├── docs/content-inventory.md  # research output & flagged source conflicts
├── index.html                 # single SPA entry (all routes render client-side)
├── vite.config.js
└── package.json
```

## 7. Multilingual routing

Routes are language-prefixed and rendered client-side (Vite SPA fallback
serves `index.html` for every path):

```
/                     → redirects to /fa/  (Persian is the default language)
/fa/  /en/  /ru/  /ar/          → homepage
/{lang}/about/                  → about
/{lang}/contact/                → contact (+ query ?type=…&product=… prefill)
/{lang}/products/               → catalog (?cat=…&brand=… filters)
/{lang}/products/{slug}/        → product detail (slug is per-language)
```

- `<html lang dir>` are switched dynamically (fa/ar → RTL, en/ru → LTR).
- The **language switcher preserves the current page** — including the
  translated product slug (stable product IDs + per-language slugs).
- Every route updates `<title>`, meta description, canonical, hreflang set,
  Open Graph and JSON-LD (Organization / BreadcrumbList / Product).

## 8. Animation libraries

| Library | Used for |
|---|---|
| **GSAP + ScrollTrigger** | preloader orchestration, page transitions, section reveals, pinned horizontal showcase, journey line draw, counters, parallax |
| **Lenis** | smooth scrolling, GSAP ticker integration |
| **Three.js** | dot-matrix trade globe (hero + global presence), animated routes, markers, particles, drag interaction |
| **Anime.js v4** | micro-interactions: toast in/out, magnetic buttons |
| **Lucide** | all icons (tree-shaken, inline SVG) |

`prefers-reduced-motion` disables smooth scroll and scroll-triggered
animation; the globe renders a single static frame.

## 9. Asset locations

- `public/images/products/` — authentic product photography from the source catalog.
- `public/images/gallery/` — authentic company photography (factory lines, date
  sorting, saffron, ISO certificates, trade events, logistics).
- `public/images/leaders/` — authentic management portraits.
- `public/images/atmos/` — curated royalty-free editorial photography used only
  where no authentic asset exists.
- All images are **WebP** (`og-cover.jpg` is the only JPEG, for Open Graph).
- See `docs/content-inventory.md` for the source mapping of every asset.

## 10. Backend integration points

The UI never reads data directly; everything flows through `src/js/data/api.js`:

```js
export const API_ENDPOINTS = {
  products: '/api/products',
  product:  '/api/products/:slug',
  categories: '/api/categories',
  brands: '/api/brands',
  company: '/api/company',
  services: '/api/services',
  articles: '/api/articles',
  contact: '/api/contact',
};
```

- `USE_REMOTE = false` today → every method resolves from the local structured
  data modules, so the frontend runs standalone.
- When the backend is live, set `USE_REMOTE = true` and swap the bodies for
  `fetch()` calls. **The UI layer does not change.**

### Contact form API contract (POST `/api/contact`)

Request:

```json
{
  "name": "…", "company": "…", "email": "…", "phone": "…",
  "country": "…", "inquiryType": "export|import|sourcing|manufacturing|logistics|general",
  "interest": "…", "message": "…", "lang": "fa"
}
```

Response (success): `{ "ok": true, "reference": "NS-XXXX" }`
Response (failure): `{ "ok": false, "errors": { "email": "invalid" } }`

Until the backend exists the form **never pretends delivery succeeded** — it
surfaces an honest “offline” notice and points to the direct contact channels.

## 11. How to add products

1. Drop the image into `public/images/products/` (WebP, ~760px wide).
2. Add an entry to the relevant file in `src/js/data/products/`
   (`coffee.js`, `food.js`, `trade.js`):

```js
{
  id: 'my-product',                    // stable identifier (never reuse)
  img: '/images/products/p-XXXXX.webp',
  category: 'dates',                  // must match a category id in categories.js
  brand: 'shadiar',                    // 'suncreez' | 'shadiar' | null
  slug: { fa: '…', en: '…', ru: '…', ar: '…' },  // per-language URL slugs
  name: { fa: '…', en: '…', ru: '…', ar: '…' },
  desc: { fa: '…', en: '…', ru: '…', ar: '…' },
  gallery: ['optional/extra.webp'],   // optional
  specs: [ { k: 'weight', v: { fa: '۵۰۰ گرم', en: '500 g', ru: '500 г', ar: '500 غرام' } } ],
  featured: true,                      // optional → homepage showcase
}
```

3. `npm run sitemap && npm run build`.

Only verified information, please — no invented specs (see the content rules
in `docs/content-inventory.md`).

## 12. How to add translations

- **UI strings** (nav, hero, sections, forms, footer…): edit the four JSON
  files in `src/locales/` — keep the key structure identical across languages.
- **Content entities** (products, categories, brands, offices, services,
  articles): every text field is an object `{ fa, en, ru, ar }`.
- Missing keys log a warning in dev mode and fall back to the key path.

## 13. Configuring the contact form API

Open `src/js/data/api.js`:

1. Point `API_ENDPOINTS.contact` at your endpoint.
2. In `sendInquiry(payload)`, replace the offline branch with:

```js
const res = await fetch(API_ENDPOINTS.contact, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
return res.json();
```

3. Set `USE_REMOTE = true`.
4. Validation, loading, success and error states are already wired — no
   further UI changes are needed.

---

## Design notes

- **Palette** (Tailwind v4 tokens in `src/styles/main.css`): forest `#173D32`,
  deep forest `#102B24`, charcoal `#202522`, ivory `#E8E0D0`, off-white `#F7F6F1`,
  muted gold `#B78A48`, sage `#A5B5A4`, stone `#747B75`. Sections alternate
  deep green / ivory / off-white / charcoal; gold stays a restrained accent.
- **Typography**: Vazirmatn (fa/ar), Inter + Playfair Display (en/ru) — all
  self-hosted via Fontsource, bundled by Vite.
- **The globe**: real land geometry from `world-atlas` (topojson) rasterized to
  a dot matrix; trade arcs connect the verified office countries; it pauses
  when off-screen and disposes cleanly on route change.

## Verified quality checklist

- ✅ `npm install / dev / build / preview` all pass
- ✅ All routes × all languages render (fa/en/ru/ar, RTL & LTR)
- ✅ Language switch preserves page context incl. product slugs
- ✅ Catalog filters, search, load-more, empty states, trade-line empty category note
- ✅ Product gallery, specs (verified data only), related products, inquiry prefill
- ✅ Contact form validation + honest offline state
- ✅ 404 page per language
- ✅ No horizontal overflow at 390px; mobile menu, native showcase scroll
- ✅ Images all resolve (audited 126 references); lazy loading below the fold
- ✅ Accessibility: skip-link, focus states, aria labels, reduced-motion support
