# Winko · site vitrine (prototype HTML/CSS → Webflow)

## Contexte
- Client : Winko (groupe Manpower). Plateforme qui met en relation des professionnels du retail (B2C, via l'app) et des enseignes qui ont besoin de renfort (B2B, génération de leads HubSpot).
- Projet Digilityx : refonte du site vitrine FR + UK, aujourd'hui sur Storyblok, **cible finale Webflow** (un projet Webflow par pays, bibliothèque de composants partagée). Objectif : que l'équipe Winko (1 personne pilote site + acquisition + réseaux) soit autonome.
- Ce dépôt est un **intermédiaire Figma → Webflow** : du HTML/CSS propre, structuré pour être reconstruit (ou collé) dans Webflow à l'identique. Pas de framework, pas de build.
- Source de vérité design : Figma `kd2ZHnX0SYLFIBgQkXuCxM` (fichier « Winko »).
  - Pages : 🎨 Fondations (8:2), 🧩 Composants (8:3), 🧱 Sections (39:1161), 🖥 Aujourd'hui · Desktop (8:5), 📱 Aujourd'hui · Mobile (49:2135), 🔮 Demain (318:5), 🗂 CMS & collections (80:5), 📝 Notes & décisions (8:6).
  - Chaque page desktop a un cadre « Annotations à valider » à côté : le lire avant d'intégrer.

## Règles d'intégration (impératives)
1. **Client-First** (Finsweet) pour toutes les classes, car c'est ce qui sera recréé dans Webflow :
   - structure : `page-wrapper > main-wrapper > section_[nom] > padding-global > container-large > padding-section-[taille]` ;
   - composants : `[composant]_[élément]` (ex. `home-hero_image`) ;
   - variantes : combo class `is-…` (ex. `button is-white`) ;
   - utilitaires globaux seulement s'ils existent déjà dans `css/winko.css`.
2. **Tokens = variables CSS** dans `:root` de `css/winko.css`, nommées comme les variables Figma (`--accent-default`, `--bg-muted`…). Jamais de couleur en dur dans une section. Elles deviendront les Variables Webflow.
3. **Verticales** : la couleur d'accent vient des variables `--accent-*`. Changer de verticale = combo class `is-socialcare` / `is-healthcare` / `is-logistics` sur un parent. Jamais de dégradé sur ces couleurs (brandbook).
4. **Une section Figma = un bloc HTML commenté** avec son code et son node id (`<!-- S09 · Bandeau CTA · Figma 39:3324 -->`). Ces blocs deviendront des Components Webflow.
5. Breakpoints alignés sur Webflow : 991px (tablette), 767px (mobile paysage), 479px (mobile).
6. JS minimal, vanilla, dans `js/winko.js`, piloté par attributs `data-*`. Préférer ce qui est faisable en Webflow Interactions ; respecter `prefers-reduced-motion`.
7. Polices de substitution : Instrument Serif (titres) et DM Sans (texte) via Google Fonts, à remplacer par Feature Deck Condensed et At Hauss si les fichiers sont fournis.
8. Accessibilité : HTML sémantique, focus visible, `alt` pertinents (vides si décoratif).
9. Contenus : reprendre le texte exact du Figma. Les chiffres marqués « [à valider] » et les témoignages en « Prénom N. » sont des placeholders : ne rien inventer.

## Workflow Figma → code
- Charger la skill Figma `figma-design-to-code`, puis `get_design_context` sur le node de la page ou de la section (fileKey ci-dessus), et l'adapter aux règles ci-dessus. Ne jamais garder le React/Tailwind renvoyé.
- **Assets** : `figma.com` est bloqué par le réseau de l'environnement cloud. Les images actuelles ont été extraites de rendus Figma en 1x (voir `docs/assets.md`). Il faudra les remplacer par des exports 2x depuis Figma.
- Construction Webflow : suivre `docs/webflow-build.md` (MCP Webflow).
- Vérifier visuellement : Playwright (préinstallé), captures à 1440px et 390px, à comparer au screenshot Figma.

## Arborescence et URL (Notes & décisions)
- Au lancement : `/` = accueil Retail ; `/retail/professionnels` (B2C → app), `/retail/entreprises` (B2B) ; `/retail` redirige vers `/` ; redirection 301 `/professionnels` → `/entreprises` (à confirmer).
- Pages : Accueil, Professionnels, Entreprises, Contact (formulaire HubSpot en 2 étapes), LP Black Friday, LP Noël, Légal (gabarit FR/UK), Merci, 404, popup « Télécharger l'app » (QR code).
- Demain : `/` = accueil Winko multi-verticales, `/retail` = accueil Retail.

## Pages (périmètre « Aujourd'hui », la partie « Demain » est hors périmètre)
| Fichier | Figma |
|---|---|
| `index.html` (accueil Retail) | 11:2 |
| `retail/professionnels.html` (B2C → app) | 24:506 |
| `retail/entreprises.html` (B2B) | 297:2745 |
| `contact.html` · `contact-recruter.html` · `contact-mission.html` | 12:470 · 512:2338 · 512:2457 |
| `black-friday.html` · `noel.html` (LP événement) | 13:455 · 34:567 |
| `mentions-legales.html` · `confidentialite.html` · `cookies.html` · `cgu.html` (gabarit unique) | 13:599 |
| `merci.html` · `404.html` | 37:784 · 37:854 |
| Modale « Télécharger l'app » (dans chaque page qui a un CTA app) | 75:46 |

## Interactions en place (`js/winko.js`)
Bandeaux défilants (pause au survol, coupés si « réduire les animations »), menu mobile, FAQ en accordéon (une question ouverte à la fois), widget sticky (après 600 px, masqué au-dessus du footer, barre pleine largeur sur mobile), compte à rebours J-xx (`data-countdown="AAAA-MM-JJ"`, masqué le jour J), modale QR code (desktop uniquement, Échap pour fermer).

## Reste à faire
- [ ] Comparer chaque page aux frames mobiles (49:2135) et affiner le responsive
- [ ] Animations non encore codées : apparition des cartes au scroll, collage de profils S16 et bloc sombre S17 (sections présentes seulement en fond de la frame « Popup QR code », 75:1806)
- [ ] Remplacer les placeholders : logo SVG officiel, polices de marque, réponses FAQ, textes légaux, témoignages réels, chiffres « [à valider] », QR code définitif (actuellement winko.io/app, lien provisoire)
- [ ] Remplacer les images extraites en 1x par des exports 2x (voir `docs/assets.md`)
