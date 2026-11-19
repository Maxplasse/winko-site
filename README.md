# Winko · site vitrine

Version code du site Winko (FR), construite avec [Astro](https://astro.build) à partir du Figma et structurée en Client-First pour être reconstruite dans Webflow : une section Figma = un composant, les contenus répétés dans des fichiers JSON au format des collections CMS.

## Lancer

```bash
npm install
```

```bash
npm run dev
```

Puis ouvrir http://localhost:4321. `npm run build` génère le HTML statique dans `dist/`.

## Arborescence

| Dossier | Contenu | Webflow |
|---|---|---|
| `public/css/winko.css` | Variables (tokens Figma), classes Client-First, responsive 991 / 767 / 478 | Variables, classes, breakpoints |
| `public/js/winko.js` | Interactions (FAQ, popup QR, lien store, contact, widget, compte à rebours) | Custom code / Interactions |
| `src/components/global/` | Header, Footer, popup app, widget sticky, boutons d'action | Symbols / Components |
| `src/components/sections/` | Une section Figma par fichier (S01 Hero, S26 Logos…) | Components |
| `src/content/*.json` | Contenus des collections (`docs/cms.md`) | Collections CMS |
| `src/pages/` | Pages, dans l'ordre de l'arborescence ; `/evenements/[slug]` = page modèle | Pages, Collection page |
| `public/images/` | Images (1x à réexporter en 2x, `docs/assets.md`) | Assets |

Pages : `/`, `/retail/professionnels`, `/retail/entreprises`, `/contact` (3 écrans : `#recruter`, `#mission`), `/merci`, `/mentions-legales`, `/confidentialite`, `/cookies`, `/cgu`, `/404`. Non publiées : `/evenements/black-friday`, `/evenements/noel`, `/styleguide` (tokens).

Voir `CLAUDE.md` pour les règles, `docs/webflow-build.md` pour le portage.

## Préversion

Le workflow `.github/workflows/preview.yml` publie le site sur GitHub Pages à chaque push sur `main` (Settings → Pages → Source : « GitHub Actions »). Pour un autre hébergeur (Netlify, Vercel) : commande `npm run build`, dossier `dist`.
