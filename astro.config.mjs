import { defineConfig } from 'astro/config';

// HTML statique, URL sans extension (/retail/professionnels), comme dans Webflow.
// BASE_PATH permet de publier une préversion dans un sous-dossier (ex. /winko-site).
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.winko.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: false,
  devToolbar: { enabled: false },
});
