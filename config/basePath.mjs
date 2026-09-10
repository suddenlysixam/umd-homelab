export const BASE_PATH = '/';

export function withBase(path = '/') {
  const base = BASE_PATH || '';

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}` || '/';
}