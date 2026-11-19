# Journal de construction Webflow (MCP)

Site Webflow : **WINKO** (`6afe8d84d7b588aa38a8fff7`). Page Home : `6afe8d85d7b588aa38a8fffe`.

## Fait
- **Variables** : tous les tokens de `:root` créés dans la collection par défaut (« Base collection ») avec **les mêmes noms CSS que le prototype** (`--accent-default`, `--bg-muted`, `--radius-card`, `--font-display`…). Une collection « Winko » (vide) a été créée en test : la supprimer dans le panneau Variables (elle préfixait les noms en `--_winko---…`).
- **Assets** : les 30 images de `public/images/` sont téléversées ; correspondance fichier ↔ id dans `tools/webflow/assets.json`.
- **Styles globaux** : le plan du site ne permet pas le code personnalisé au niveau du site (l'API renvoie 404). Les polices Google et le CSS non exprimable en classes Webflow (base `body`/titres, `@keyframes`, sélecteurs descendants, `::before`, `[hidden]`, `prefers-reduced-motion`) sont dans un **Embed** `global-styles` placé dans `page-wrapper` (méthode Client-First).
- **Script** : `public/js/winko.js` dans un Embed en fin de `body` (à déplacer dans Site settings > Custom code quand le plan le permet).
- **Page Home** complète : Header, S01 Hero, S05b Valeurs, S26 Logos, S02 Aiguillage, S27 Témoignages, S09 Bandeau CTA, Footer, popup « Télécharger l'app ». Toutes les images sont reliées à leur asset.

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
