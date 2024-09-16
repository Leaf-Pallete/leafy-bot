export function sanitizeString(str: string): string {
  return str
    .replace(/[*_`~<>@#]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;')
    .trim()
    .slice(0, 1000);
}
