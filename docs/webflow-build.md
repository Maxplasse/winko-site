# Construire le site dans Webflow via le MCP Webflow

Source : ce dépôt (`index.html`, `css/winko.css`, `js/winko.js`). Le HTML/CSS est la référence : Webflow doit reproduire les mêmes noms de classes et les mêmes valeurs.

## Prérequis
- Connecteur Webflow actif dans la session Claude (claude.ai → Connecteurs).
- Pour les outils Designer (éléments, styles, variables, composants) : le site ouvert dans le Webflow Designer avec l'app « Webflow MCP Bridge » lancée.
- Un projet Webflow par pays (FR d'abord, UK ensuite), cf. recommandation Digilityx.

## Ordre de construction
1. **Variables** : créer une collection « Winko » avec toutes les variables de `:root` de `css/winko.css` (couleurs, rayons, polices). Mêmes noms, sans le `--`.
   - Verticales : mode Retail par défaut. Social care, Healthcare et Logistics deviennent des modes de variables (ou les combo classes `is-socialcare`…).
2. **Polices** : ajouter Instrument Serif et DM Sans (Google Fonts) dans Site settings.
3. **Styles globaux** (Body all pages, liens, focus), puis **classes utilitaires** Client-First : `padding-global`, `container-large`, `padding-section-*`, `heading-style-*`, `text-size-*`, `text-style-overline`, `text-color-*`, `background-color-*`, `max-width-*`.
4. **Composants de base** : `button` (+ `is-secondary`, `is-white`, `is-outline-white`, `is-small`), `tag` (+ `is-on-color`), `logo` (+ `is-large`, à remplacer par le SVG officiel), `section-header`, `marquee`.
5. **Components Webflow** : Navbar (navbar natif Webflow, classes `navbar_*`), Footer (`footer_*`).
6. **Sections** de l'accueil, dans l'ordre du HTML. Chaque bloc `<!-- Sxx · … · Figma id -->` devient un Component Webflow avec des propriétés (textes, images, liens) :
   S01 Hero photo → S05b Valeurs → S26 Logos → S02 Aiguillage → S27 Témoignages → S09 Bandeau CTA.
7. **Assets** : téléverser `images/` (à remplacer par les exports 2x, cf. `docs/assets.md`).
8. **Responsive** : reporter les media queries de `winko.css` sur les breakpoints Webflow 991 / 767 / 479.
9. **Interactions** :
   - bandeaux défilants : Webflow Interaction en boucle (40 s, pause au survol) ou le script de `js/winko.js` collé dans le custom code ;
   - menu mobile : navbar natif.
10. **Localisation** : Webflow Localization (FR / UK) ou projet UK séparé selon la décision finale.

## Points de vigilance
- Ne pas créer de classes en dehors de la convention Client-First. Réutiliser les classes existantes avant d'en créer.
- Aucune couleur en dur : toujours lier aux variables.
- Les contenus « [à valider] » et les témoignages « Prénom N. » restent des placeholders.
