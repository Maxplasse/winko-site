# Winko · site vitrine (version code Astro → Webflow)

## Contexte
- Client : Winko (groupe Manpower). Plateforme qui met en relation des professionnels du retail (B2C, via l'app) et des enseignes qui ont besoin de renfort (B2B, génération de leads HubSpot).
- Projet Digilityx : refonte du site vitrine FR + UK, aujourd'hui sur Storyblok, **cible finale Webflow** (un projet par pays, FR d'abord). Objectif : que Djouher (Winko, pilote site + acquisition + réseaux) soit autonome.
- **Principe directeur** : cette version code est le modèle de Webflow, pas un deuxième site à réécrire. On code comme Webflow fonctionne.
- Source de vérité design : Figma `kd2ZHnX0SYLFIBgQkXuCxM` (fichier « Winko »).
  - Pages : 🎨 Fondations (8:2), 🧩 Composants (8:3), 🧱 Sections (39:1161), 🖥 Aujourd'hui · Desktop (8:5), 📱 Aujourd'hui · Mobile (49:2135), 🔮 Demain (318:5, hors périmètre), 🗂 CMS & collections (80:5), 📝 Notes & décisions (8:6).
  - Chaque page desktop a un cadre « Annotations à valider » à côté : le lire avant d'intégrer.

## Périmètre (« Aujourd'hui », FR, desktop + mobile)
- Publiées au lancement : Accueil, Professionnels, Entreprises, Contact (3 écrans), Merci, Légal, 404.
- LP Black Friday et Noël : **non publiées** au lancement (noindex, hors navigation), mais les composants et la collection « Événements » sont prêts pour que Djouher les assemble après la formation Webflow.

## Stack et arborescence
Astro (HTML statique), sans framework front ni Tailwind. `npm run dev` (port 4321), `npm run build` → `dist/`.
- `public/css/winko.css` : **un seul fichier CSS**, lié tel quel (pas de styles scopés Astro, pas de `<style>` dans les composants).
- `public/js/winko.js` : JS vanilla minimal, piloté par attributs `data-*`.
- `src/layouts/` : `BaseLayout` (head, Header, Footer, popup app), `LegalLayout`.
- `src/components/global/` : Header (CTA contextuel), Footer (accroche et boutons selon la page), AppModal, StickyWidget, CtaButton, Logo.
- `src/components/sections/` : **une section Figma = un fichier = un futur Component Webflow**, nommé par son code Figma (`S01Hero`, `S26Logos`, `S28Advantages`…). En tête : commentaire `// Sxx · Nom · Figma id` + filtre CMS, repris en `<!-- … -->` dans le HTML.
- `src/content/*.json` + `src/content.config.ts` : **une collection CMS = un fichier JSON**, mêmes champs que la page « CMS & collections » du Figma (correspondance dans `docs/cms.md`). Tout contenu répété ou changeant (FAQ, profils, chiffres, témoignages, logos, missions, événements) vit là, jamais en dur dans une page.
- `src/lib/` : `url()` (préfixe de base pour la préversion), `site.ts` (navigation, lien app, liens stores), `content.ts` (filtres CMS : cible, secteur, consentement, limite).
- `src/pages/` : `/`, `/retail/professionnels`, `/retail/entreprises`, `/contact`, `/merci`, `/mentions-legales`, `/confidentialite`, `/cookies`, `/cgu`, `/404`, `/evenements/[slug]` (page modèle), `/styleguide` (tokens, noindex).

## Règles d'intégration (impératives)
1. **Client-First** (Finsweet) pour toutes les classes :
   - structure : `page-wrapper > main-wrapper > section_[nom] > padding-global > container-large > padding-section-[taille]` ;
   - composants : `[composant]_[élément]` (ex. `hero_image`) ; variantes : combo class `is-…` ;
   - utilitaires globaux seulement s'ils existent déjà dans `winko.css`. Pas de Tailwind, pas de classes utilitaires ad hoc.
2. **Tokens = variables CSS** dans `:root` de `winko.css`, nommées comme les variables Figma (`--accent-default`, `--bg-muted`…). Jamais de couleur en dur. Elles deviennent les Variables Webflow.
3. **Secteurs** : couleur d'accent via `--accent-*` ; changer de secteur = combo class `is-socialcare` / `is-healthcare` / `is-logistics` sur un parent. Jamais de dégradé sur ces couleurs (brandbook).
4. **Composants** : une section Figma = un composant Astro ; les props = les propriétés du Component Webflow (textes, images, liens, variante). Les boutons passent par le slot ou `CtaButton`.
5. **Contenus CMS** : les sections alimentées par le CMS lisent `astro:content` avec le même filtre que la Collection List Webflow (documenté en tête du composant). Ajouter un champ = le déclarer dans `content.config.ts` **et** dans `docs/cms.md`.
6. **Breakpoints Webflow** : `max-width: 991px` (tablette), `767px` (mobile paysage), `479px` (mobile portrait, « 478 px et moins » dans Webflow).
7. **Interactions** faisables en Webflow : défilements en CSS pur (liste rendue deux fois, copie `aria-hidden`), accordéon FAQ, header sticky, écrans de choix Contact (`data-contact-*`, ancres `#recruter` / `#mission`), popup QR code desktop + lien intelligent store mobile (`data-app-link`, URLs dans `src/lib/site.ts`), widget sticky, compte à rebours (`data-countdown`). Respecter `prefers-reduced-motion`.
8. Polices de substitution : Instrument Serif (titres), DM Sans (texte), à remplacer par les polices de marque si fournies (vérifier la licence web).
9. Accessibilité : HTML sémantique, focus visible, `alt` pertinents (vides si décoratif), contrastes.
10. Contenus : texte exact du Figma. « [à valider] », « [Réponse à …] » et « Prénom N. » sont des placeholders : ne rien inventer.

## Workflow Figma → code
- Charger la skill Figma `figma-design-to-code`, puis `get_design_context` sur le node (fileKey ci-dessus) ; adapter aux règles ci-dessus, ne jamais garder le React/Tailwind renvoyé.
- Chaque composant est validé en desktop et en mobile avant de passer au suivant.
- **Assets** : `figma.com` est bloqué par le réseau de l'environnement cloud. Images extraites de rendus Figma en 1x (voir `docs/assets.md`), à remplacer par des exports 2x.
- Vérifier visuellement : Playwright (préinstallé) sur `npm run build` servi en local, captures à 1440 px et 390 px, à comparer au screenshot Figma.
- Portage Webflow : `docs/webflow-build.md` (MCP Webflow).

## Arborescence et URL (Notes & décisions)
- `/` = accueil Retail ; `/retail/professionnels` (B2C → app), `/retail/entreprises` (B2B) ; `/retail` redirige vers `/`.
- **Inversion d'URL** : sur le site actuel `/professionnels` est la page B2B ; elle devient B2C. Prévoir une table de redirections 301 et contrôler les liens depuis l'app et les campagnes.
- Demain : `/` = accueil Winko multisecteur, `/retail` = accueil Retail (hors périmètre).

## Points d'attention
- La première recette porte sur la version code (préversion), pas sur Webflow : à dire à Djouher.
- Cookies : le bandeau de consentement impose une politique cookies (`/cookies`, contenu à fournir).
- En attente de Djouher : témoignages, extraits de l'app (S28), conseiller, étapes (S18), réponses FAQ, textes légaux, chiffres, liens App Store / Google Play, logos et accords de diffusion.

## Reste à faire
- [x] Comparer chaque page aux frames mobiles (49:2135) et affiner le responsive (bloc « 12. Mobile » de winko.css, reporté dans Webflow)
- [ ] Animations : apparition des cartes au scroll ; sections S16 (collage profils) et S17 (bloc sombre) à intégrer si confirmées
- [ ] Remplacer les placeholders (logo SVG officiel, polices, contenus listés ci-dessus, QR code définitif)
- [ ] Remplacer les images 1x par des exports 2x (`docs/assets.md`)
- [ ] Contrôle qualité : Lighthouse, contrastes, préversion partagée avec Djouher
