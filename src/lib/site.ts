// Réglages globaux du site (en Webflow : Site settings / custom code).

// Lien de téléchargement de l'app : cible du QR code et lien de repli.
// Provisoire (repris du Figma) : à confirmer par Winko.
export const APP_URL = 'https://winko.io/app';

// Liens des stores pour le lien intelligent sur mobile (repris de winko.io).
// Vides : le lien mène à APP_URL.
export const APP_STORE_URL = 'https://apps.apple.com/fr/app/id6785553304';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ariane.app';

export const NAV = [
  { label: 'Professionnels', href: '/retail/professionnels' },
  { label: 'Entreprises', href: '/retail/entreprises' },
  { label: 'Contact', href: '/contact' },
];

export const LEGAL_DOCS = [
  { href: '/mentions-legales', title: 'Mentions légales', short: 'Mentions légales' },
  { href: '/confidentialite', title: 'Politique de confidentialité', short: 'Confidentialité' },
  { href: '/cookies', title: 'Politique cookies', short: 'Cookies' },
  { href: '/cgu', title: 'Conditions générales d’utilisation', short: 'CGU' },
];
