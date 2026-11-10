export const BASE = import.meta.env.BASE_URL || '/';

export function withBase(path = '/') {
  if (!path) return BASE;
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#') || path.startsWith('blob:')) {
    return path;
  }
  const p = path.startsWith('/') ? path.slice(1) : path;
  return BASE + p;
}

export function route(path = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  return BASE === '/' ? p : `${BASE.slice(0, -1)}${p}`;
}

export function stripBase(pathname = '/') {
  if (BASE !== '/' && pathname.startsWith(BASE)) {
    const rest = pathname.slice(BASE.length - 1);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  if (BASE !== '/' && pathname === BASE.slice(0, -1)) return '/';
  return pathname;
}
