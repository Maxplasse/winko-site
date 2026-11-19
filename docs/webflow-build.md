# Construire le site dans Webflow via le MCP Webflow

Source : ce dépôt. La référence est le **HTML compilé** (`npm run build`, dossier `dist/`) et `public/css/winko.css` : Webflow doit reproduire les mêmes noms de classes et les mêmes valeurs. Les composants Astro (`src/components/`) donnent le découpage en Components Webflow, les fichiers JSON (`src/content/`) le contenu des collections CMS.

## Prérequis
- Connecteur Webflow actif dans la session Claude (claude.ai → Connecteurs).
- Pour les outils Designer (éléments, styles, variables, composants) : le site ouvert dans le Webflow Designer avec l'app « Webflow MCP Bridge » lancée.
- Un projet Webflow par pays (FR d'abord, UK une fois la FR validée).
- La première recette porte sur la version code (préversion) : ses retours sont intégrés avant le portage.

## Ordre de construction (phase 2)
1. **Variables** : collection « Winko » avec toutes les variables de `:root` de `public/css/winko.css` (couleurs, rayons, polices). Mêmes noms, sans le `--`. Secteurs : mode Retail par défaut ; Social care, Healthcare, Logistics en modes de variables (ou combo classes `is-socialcare`…). La page `/styleguide` liste tout.
2. **Polices** : Instrument Serif et DM Sans (Google Fonts), à remplacer par les polices de marque (vérifier la licence web).
3. **Styles globaux** puis **classes utilitaires** Client-First : `padding-global`, `container-large`, `padding-section-*`, `heading-style-*`, `text-size-*`, `text-style-overline`, `text-color-*`, `background-color-*`, `max-width-*`.
4. **Composants de base** : `button` (+ `is-secondary`, `is-white`, `is-outline-white`, `is-small`), `tag` (+ `is-on-color`), `logo` (+ `is-large`), `section-header`, `marquee`, `badge-arrow`.
5. **CMS** : créer les collections avec les champs de `docs/cms.md`, puis importer les JSON (conversion CSV). Collection « Événements » + page modèle `/evenements/[slug]`, items Black Friday et Noël en brouillon.
6. **Components Webflow** : Navbar et Footer (`src/components/global/`), puis une section = un Component (`src/components/sections/`, nom = code Figma : S01 Hero, S26 Logos…). Les props Astro deviennent les propriétés du Component ; les sections alimentées par le CMS contiennent une Collection List avec les filtres indiqués en tête de fichier.
   Insertion : copier le HTML de la section depuis `dist/` (insertion depuis HTML du MCP), puis transformer en Component.
7. **Pages** : assembler dans l'ordre de l'arborescence (`src/pages/`), lier les listes CMS, filtres par cible et secteur.
8. **Assets** : téléverser `public/images/` (à remplacer par les exports 2x, cf. `docs/assets.md`).
9. **Responsive** : reporter les media queries de `winko.css` sur les breakpoints 991 / 767 / 478.
10. **Interactions et code personnalisé** :
    - bandeaux défilants (logos, témoignages, mots) : CSS pur, liste dupliquée dans la piste (`.marquee_track`, animation `marquee`) ; ou Webflow Interaction en boucle ;
    - menu mobile : navbar natif ; header fixe : `position: sticky` ;
    - FAQ : accordéon (`data-faq`), ou Interaction ;
    - Contact : écrans de choix (`data-contact-choice`), ou composant Tabs natif ;
    - popup QR code (desktop) et lien intelligent vers le store (mobile), widget sticky, compte à rebours : `public/js/winko.js` dans le custom code du site.
11. **Formulaires** : embed HubSpot (B2B), redirection vers `/merci`.
12. **SEO** : métadonnées, Open Graph, sitemap, redirections 301 (inversion `/professionnels` B2B → B2C), hreflang FR/UK, `noindex` sur `/merci`, `/styleguide` et les LP non publiées.
13. **Tracking** : plan de taggage et bandeau de consentement (la politique cookies `/cookies` doit être rédigée).

## Points de vigilance
- Pas de classe hors convention Client-First ; réutiliser avant de créer.
- Aucune couleur en dur : toujours lier aux variables.
- Les contenus « [à valider] », « [Réponse à …] » et les témoignages « Prénom N. » restent des placeholders.
