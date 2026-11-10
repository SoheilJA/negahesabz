/**
 * API service layer — placeholder contracts for the future backend.
 *
 * Today every function resolves from the local structured data modules, so the
 * frontend runs fully standalone. When the new backend is ready, swap each
 * implementation for a fetch() against the endpoint below — the UI layer never
 * changes. Contract notes in README → “Backend integration”.
 */

export const API_ENDPOINTS = {
  products: '/api/products',
  product: '/api/products/:slug',
  categories: '/api/categories',
  brands: '/api/brands',
  company: '/api/company',
  services: '/api/services',
  articles: '/api/articles',
  contact: '/api/contact',
};

const USE_REMOTE = false; // flip to true once the backend is live

async function call(endpoint) {
  const res = await fetch(endpoint, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`API ${endpoint} failed: ${res.status}`);
  return res.json();
}

/* ---------------- data facade (local now, remote later) ---------------- */

import { products, getProduct, findBySlug, getFeatured, getByCategory, getByBrand, getRelated } from './products/index.js';
import { categories, getCategory } from './categories.js';
import { brands, getBrand } from './brands.js';
import { company } from './company.js';
import { services } from './services.js';
import { articles } from './articles.js';

export const api = {
  async listProducts(lang) {
    if (USE_REMOTE) return call(API_ENDPOINTS.products);
    return products.map((p) => ({ ...p }));
  },
  async getProductBySlug(slug, lang) {
    if (USE_REMOTE) return call(`${API_ENDPOINTS.product.replace(':slug', slug)}?lang=${lang}`);
    return findBySlug(slug, lang) || null;
  },
  async getProductById(id) {
    return getProduct(id) || null;
  },
  async listCategories() {
    if (USE_REMOTE) return call(API_ENDPOINTS.categories);
    return categories;
  },
  async getCategory(id) {
    return getCategory(id) || null;
  },
  async listBrands() {
    if (USE_REMOTE) return call(API_ENDPOINTS.brands);
    return brands;
  },
  async getCompany() {
    if (USE_REMOTE) return call(API_ENDPOINTS.company);
    return company;
  },
  async listServices() {
    if (USE_REMOTE) return call(API_ENDPOINTS.services);
    return services;
  },
  async listArticles() {
    if (USE_REMOTE) return call(API_ENDPOINTS.articles);
    return articles;
  },
  /**
   * Contact form submit — expected backend contract (POST /api/contact):
   * body: { name, company, email, phone, country, inquiryType,
   *         productInterest, message, lang }
   * response: { ok: true, reference: "NS-XXXX" } | { ok: false, errors: {...} }
   */
  async sendInquiry(payload) {
    if (USE_REMOTE) {
      const res = await fetch(API_ENDPOINTS.contact, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
    // No backend yet — never fake a delivery. Caller surfaces an honest notice.
    return { ok: false, offline: true };
  },
};

export const productHelpers = { getFeatured, getByCategory, getByBrand, getRelated, getProductUrl: null };
export default api;
