// Préfixe les chemins internes avec la base du site (utile pour une préversion
// hébergée dans un sous-dossier, ex. GitHub Pages /winko-site/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return base + '/' + path.replace(/^\//, '');
}
