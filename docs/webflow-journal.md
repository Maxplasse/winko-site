# Journal de construction Webflow (MCP)

Site Webflow : **WINKO** (`6afe8d84d7b588aa38a8fff7`). Page Home : `6afe8d85d7b588aa38a8fffe`.

## Fait
- **Responsive mobile** (comparaison aux frames Figma 49:2135, captures 390 px) : bloc « 12. Mobile » de `winko.css` reporté dans Webflow au palier small (767) — header compact (CTA visible, menu cerné, langue masquée), titres réduits, logos `zoom: 0.7`, dégradés de bandeau 2,5rem, cartes sans hauteur imposée, chiffres sur une colonne, profils en carrousel, sélecteur segmenté sur Contact, footer en deux colonnes, carte vitrée LP élargie, boutons centrés alignés à gauche. Sélecteurs complexes dans Global styles.
  - Écarts laissés : ordre de l'accueil (le Figma mobile met les logos juste après le hero), barre de contexte « Entreprises » sous le header, contenu mobile de Contact (encarts Entreprises / Partenariats), libellés courts du footer.
- **Page modèle Événements** (`6afea8bfbaf838e4089b13ac`, /evenements/[slug]) : Global styles, Navbar (CTA Créer mon compte), Footer (bouton compte seul), Scripts ; sections de page liées aux champs de l'item :
  - S14 Hero : textes, points clés, visuel, carte vitrée = champs de « Mission mise en avant », compte à rebours (`data-countdown` = Date de l'événement, `data-countdown-box`), thème = attribut `data-theme` lié au champ Option Thème (règles `[data-theme="Sombre"]` / `[data-theme="Clair"]` dans Global styles) ;
  - S22 Bandeau (mots 1 à 4, deux fois), S05 Arguments (surtitre, titre, 3 cartes avec picto), S12 Formulaire + visuel (titre, visuel ; `data-hubspot-form-id` lié à « ID formulaire HubSpot ») ;
  - S04 Profils et S08 FAQ : Collection Lists dont la source est la multi-référence de l'item (source `{collectionId: <collection cible>, fieldSlug: "profils" | "faq"}`).
  - À régler dans le Designer : SEO de la page modèle (SEO title / description / Image de partage liés aux champs), exclusion de l'indexation (LP non publiées), visibilité conditionnelle du métier (Genre), redirection du formulaire vers /merci.
- **Pages Contact, Merci, légales, 404** (plan payant) : créées par duplication de Home (Navbar, Footer, Global styles, Scripts, Popup), SEO repris du prototype.
  - Contact `6b04070b232ee9a349e6b1c3` : hero simple, écran de choix (`data-contact-*`), panneau #recruter (formulaire Webflow natif, classe `form_component` sur le formulaire), panneau #mission (instance S09, textes B2C, bouton app).
  - Merci `6b04070b643dd0f0fbe286d3`. **404 = page utilitaire Webflow** `6b0419f67f6701c7f5d7ff75` (Navbar, section 404, Footer, Popup, Scripts) ; l'ancienne page statique (slug libéré → `/page-introuvable`, `6b04070d687627e7199bc235`) est à supprimer : une page statique au slug `404` empêchait la page utilitaire d'exister, Mentions légales `6b04070c643dd0f0fbe286fb`, Confidentialité `6b04070c643dd0f0fbe28723`, Cookies `6b04070d02318b24e4c3694f`, CGU `6b04070d7c64e41acc76414d`.
  - À régler dans le Designer : redirection du formulaire vers /merci (réglages du formulaire, en attendant HubSpot) ; Merci et 404 hors index (Page settings > SEO, et exclure du sitemap) ; supprimer la page `/page-introuvable`.
- **CMS** : 9 collections avec champs et contenus importés (`docs/cms.md`, section « Dans Webflow »). « Verticales » remplacée par une collection « Secteurs » neuve (6afeaf77d852e997766167da), références `secteur` migrées ; l'ancienne collection « Verticales » est à supprimer à la main.
- **FAQ Entreprises** : Collection List sur FAQ (classes `faq_list-wrapper` > `faq_list` + `data-faq`, item `faq_item` ; Question et Réponse liées), limite 6. **Filtre « Cible = Entreprises » et tri « Ordre croissant » à régler dans le Designer** (refusés via MCP, voir pièges).
- **Variables** : tous les tokens de `:root` créés dans la collection par défaut (« Base collection ») avec **les mêmes noms CSS que le prototype** (`--accent-default`, `--bg-muted`, `--radius-card`, `--font-display`…). Une collection « Winko » (vide) a été créée en test : la supprimer dans le panneau Variables (elle préfixait les noms en `--_winko---…`).
- **Assets** : les 30 images de `public/images/` sont téléversées ; correspondance fichier ↔ id dans `tools/webflow/assets.json`.
- **Styles globaux** : le plan du site ne permet pas le code personnalisé au niveau du site (l'API renvoie 404). Les polices Google et le CSS non exprimable en classes Webflow (base `body`/titres, `@keyframes`, sélecteurs descendants, `::before`, `[hidden]`, `prefers-reduced-motion`) sont dans un **Embed** `global-styles` placé dans `page-wrapper` (méthode Client-First).
- **Script** : `public/js/winko.js` dans un Embed en fin de `body` (à déplacer dans Site settings > Custom code quand le plan le permet).
- **Page Entreprises** (`/retail/entreprises`, id 6afea103ec8c8a6d9e831dfd) : instances + une section FAQ (questions entreprises) hors Component, à remplacer par la Collection List FAQ.
- **Page Professionnels** (`/retail/professionnels`, id 6afe9d7a63f8d55484889e48) : uniquement des instances de Components.
- **Page Home** complète : Header, S01 Hero, S05b Valeurs, S26 Logos, S02 Aiguillage, S27 Témoignages, S09 Bandeau CTA, Footer, popup « Télécharger l'app ». Toutes les images sont reliées à leur asset.

- **Sections CMS = sections de page, pas des Components** : l'API ne sait ni lier des champs CMS dans la définition d'un Component, ni déposer un élément dans un Slot (un premier essai avec Slots laissait les listes en fin de page, en double). Les sections alimentées par le CMS sont donc des sections ordinaires (mêmes classes Client-First, nommées « Sxx … (CMS …) » dans le Navigator) contenant leur Collection List :
  - Accueil : S26 Logos, S27 Témoignages ; Professionnels : S26, S27, S20 FAQ ; Entreprises : S03 Chiffres, S04 Profils, S20 FAQ.
  - Bandeaux (S26, S27) : deux listes dans `marquee_track` (la 2e `aria-hidden`, copie de boucle) ; classes `marquee_list` (wrapper et list) / `marquee_item` ; l'espacement est sur `logos_logo` / `testimonials_card`.
  - Les Components S03, S04, S20, S26, S27 ne sont plus utilisés (Slot vide) : à supprimer dans le panneau Components.
  - **Filtres et tris à régler dans le Designer** (refusés via MCP) : FAQ Cible = page, tri Ordre ; Profils Consentement = on, tri Ordre ; Chiffres Cible = Entreprises, tri Ordre ; Logos Accord de diffusion = on, tri Ordre ; Témoignages tri Ordre. Profils : métier en deux textes (Métier : Nom féminin / masculin) à afficher selon Genre.

## Components (groupes « Global » et « Sections »)
| Component | Id | Propriétés / variantes |
|---|---|---|
| Global styles | b143de4c-3c07-5fc9-113d-25c3288de6e6 | une instance en haut de `page-wrapper` sur chaque page |
| Scripts | 33f4b7d6-18d7-e813-3d42-dadecf5f5926 | une instance en fin de `body` |
| Navbar | 9c57591a-21e1-575c-f906-5c6a6229e2dd | CTA Télécharger l'app (pages Professionnels), CTA Créer mon compte (Entreprises, LP) |
| Footer | 4233933c-0d5b-deb1-8260-d82ab777d41c | Accroche, Bouton Télécharger l'app, Bouton Créer mon compte |
| Popup app | 7a5b61cf-31fa-b3fb-8c10-5d54cd17c06b | sur les pages avec CTA app |
| S01 Hero | 26749aa3-2b2e-31dd-ed8a-a1747dde483d | Surtitre, Titre (multiligne), Texte, Image + alt, Bouton 1 texte/lien, Bouton 2 visible/texte/lien · variantes Photo / Visuel app |
| S05b Valeurs | 6753e46c-a1d1-0c53-4ebf-f32751c2fed8 | contenu fixe (accueil) |
| S26 Logos | 3ab0e886-860b-8451-5b43-c7def4eb4d7b | contenu fixe (→ Collection List Enseignes clientes) |
| S02 Aiguillage | 47353986-3c4e-bcc4-790d-311644516df2 | contenu fixe (accueil) |
| S27 Témoignages | d5b96abf-faf6-92dc-a4dd-f6dfea32cc6e | contenu fixe (→ collection Témoignages) |
| S28 Avantages | 08748852-6f64-3f12-792c-5764e204fd71 | contenu fixe (Professionnels) |
| S18 Étapes | 47a1ecff-c9b5-93d8-acc0-e3020683b25c | contenu fixe |
| S20 FAQ grille | 934d1621-45ab-c6d4-c041-7166b4815045 | questions Professionnels en dur (→ collection FAQ filtrée par cible) |
| S21 CTA photo | 35f060df-7853-de7d-67f8-e94e1f31a1b4 | contenu fixe |
| Widget sticky | 10d0929e-9056-3b87-a29e-ab148d363993 | Titre, Texte, Bouton texte/lien |
| S01 Hero split | 71b77504-2f3b-e9f7-f00f-b38d9c6967c3 | contenu fixe (Entreprises) |
| S03 Chiffres | d62c914e-c4aa-1a0d-4be0-0a3f6683b12a | contenu fixe (→ collection Chiffres clés) |
| S04 Profils | cf925b6f-545c-4784-adfa-40d3c9de55c9 | Surtitre, Titre, Texte (+ visible) · cartes → collection Profils |
| S05 Arguments | 43e44e99-2c39-3111-609c-cff8fb853911 | Surtitre, Titre · cartes → arguments de l'item Événements sur les LP |
| S09 Bandeau CTA | 44f4e100-6c7b-dd0c-5070-8914da6c89f2 | Titre, Texte, Image + alt, Bouton 1 texte/lien, Bouton 2 visible/texte/lien · variantes B2C / B2B |

## À faire (dans l'ordre)
1. Components des sections des autres pages (S28, S18, S20, S21, S01 Hero split, S03, S04, S05, S00, S13, S12, S14, S22, S08, S23, S15…), créés en construisant chaque page.
2. Pages Professionnels, Entreprises, Contact, Merci, légales, 404 (mêmes outils).
3. Collections CMS (`docs/cms.md`) + import des JSON, page modèle Événements.
4. Polices de marque, responsive à vérifier dans le Designer, publication.

## Méthode et pièges du MCP (à respecter pour la suite)
- Insertion : `data_whtml_builder` avec le HTML de `dist/` et le CSS des classes **jamais encore envoyées** :
  `python3 tools/webflow/section.py dist/<page>/index.html <n>` puis `python3 tools/webflow/show.py` (n = -1 liste les blocs). `created.json` mémorise les classes déjà créées.
- **Une section par appel.** Un lot qui échoue (« MPS rejected update ») laisse des éléments et des styles fantômes visibles par l'API mais absents du Designer : supprimer éléments **et** styles concernés, puis réinsérer.
- Pas d'attribut `style=""` dans le HTML : il devient une classe `inline-div-0` et peut faire échouer le lot.
- Les classes sans aucune propriété (`section_*`, `main-wrapper`) ne sont pas créées par l'import : elles existent désormais (créées vides).
- Classes empilées (`section_hero background-color-accent`) : Webflow crée un combo vide + la classe globale ; pour l'appliquer à la main, créer d'abord le combo (`create_style` avec `parent_style_names`).
- `var(--accent-default)` s'est lié une fois à une variable supprimée : après chaque insertion, réappliquer la variable (`show.py` produit les actions `update_style` « FIXES »). Id de la bonne variable : `variable-565862fb-586c-0d1b-e673-ae6db8735002`.
- Les images insérées ne sont pas reliées aux assets : `set_image_asset` ensuite (ordre du document).
- Raccourcis CSS à éviter : `background:` (utiliser `background-color`/`background-image`), `border: 0`, `inset` — `section.py` les normalise.
- `blockquote` hérite d'un style Webflow par défaut (bordure gauche) : neutraliser dans la classe.
- Un `span` n'a pas de réglage « text » liable à une propriété : utiliser un TextBlock (div) avec la même classe.
- Liaison d'une propriété : `get_settings` (clé `text`, `link`, `assetId`, `altText`, `visibility`) puis `set_settings` avec `binding: {source_type: "prop"}` et `scope_component_id`.
- Zéros sans unité (`margin: 0`) et `clip-path` font échouer l'import : `section.py` ajoute `px` et retire `clip-path` (mis dans Global styles).
- Ombres : pas de variable possible, valeurs littérales. Une ombre `inset` s'est mal rendue : préférer une bordure.
- Tout lien vers l'App Store Winko (`https://apps.apple.com/fr/app/id6785553304`, lien de repli des boutons « Télécharger l'app ») ouvre la popup QR codes iPhone / Android (desktop) ou mène au bon store (mobile) : le script le détecte, pas besoin d'attribut. Les anciens liens `winko.io/app` (page inexistante) sont redirigés vers l'App Store par le script.
- Les variantes de Component se choisissent via la propriété « Variant » de l'instance (valeur = id de variante).
- Collection List : `source` = `static_json` `{"collectionId": …}` ; `limit` en `static_number`. Les `filters` / `sort` non vides (format `[{"fieldSlug","operator":"equals","value"}]`, `[{"fieldSlug","direction":"ascending"}]`) passent la validation mais le serveur répond « [Conflict] … component map » : les régler dans le Designer.
- Opérateurs de filtre : option → equals / doesNotEqual / isSet / isNotSet ; switch → isOn / isOff.
- Une image passée par URL à un item CMS est re-téléversée (nouvel asset) : prévoir le ménage des doublons dans Assets.

### Popups (24/11)
- La classe Webflow `app-modal` est en `display: none` : l'affichage à l'ouverture passe par `.app-modal.is-open { display: flex; }` dans l'embed « Global styles ». Sans cette règle, le script ajoute `is-open` mais rien ne s'affiche.
- « Popup formulaire B2B » (ex « Popup formulaire ») : page Entreprises, ouverte par le widget sticky (le script relie `[data-sticky-widget] a` à la popup formulaire quand la page en contient une). Champs du formulaire Contact « Je cherche à recruter ». Combo `is-compact` sur `form-modal_dialog`.
- Popup app : deux QR codes (iPhone → App Store, Android → Google Play).

### Logos enseignes (24/11)
- Fichiers exportés à 2× la taille d'affichage (PNG transparent, gris foncé). Taille plafonnée par la classe `logos_logo` : `width/height: auto`, `max-width: 9.5rem`, `max-height: 3.25rem` (`width` est un attribut réservé dans Webflow, impossible de le lier au champ « Largeur (px) »).
- Pour un nouveau logo : exporter à environ 2× (≈ 300 px de large pour un logo horizontal, ≈ 104 px de haut pour un logo carré).

### Pages légales (24/11)
- Mentions légales et Politique de confidentialité : textes fournis par Winko (Mentions légales V1, Privacy policy V1.1), transcrits à l'identique. Hébergeur remplacé : Webflow, Inc. (au lieu de Netlify).
- Structure : sommaire `legal_toc` (liens #section-N) + bloc `legal_rich-text` (h2 avec id section-N, paragraphes, listes, tableau). Styles des listes / tableau / liens dans l'embed « Global styles ».
- En attente : Politique cookies (document à venir), CGU / CGV (B2B / B2C, en cours avec la DPO).
