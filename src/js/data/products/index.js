/**
 * Product data index — merges all product groups.
 * Access layer used by pages; later replaceable with API responses (see api.js).
 */
import { coffeeProducts } from './coffee.js';
import { foodProducts } from './food.js';
import { tradeProducts } from './trade.js';

export const products = [...coffeeProducts, ...foodProducts, ...tradeProducts];

export const getProduct = (id) => products.find((p) => p.id === id);

/** Resolve a product by a language-specific slug. */
export const findBySlug = (slug, lang) =>
  products.find((p) => p.slug[lang] === decodeURIComponent(slug));

/** Find product by stable id regardless of language slug. */
export const getProductUrl = (product, lang) =>
  `/${lang}/products/${encodeURIComponent(product.slug[lang])}/`;

export const getFeatured = () => products.filter((p) => p.featured);

export const getByCategory = (categoryId) =>
  products.filter((p) => p.category === categoryId);

export const getByBrand = (brandId) => products.filter((p) => p.brand === brandId);

export const getRelated = (product, limit = 4) => {
  const sameCat = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const sameBrand =
    product.brand &&
    products.filter((p) => p.id !== product.id && p.brand === product.brand);
  const pool = [...(sameBrand || []), ...sameCat.filter((p) => !sameBrand || !sameBrand.some((b) => b.id === p.id))];
  const seen = new Set();
  return pool.filter((p) => (seen.has(p.id) ? false : seen.add(p.id))).slice(0, limit);
};

export default products;
