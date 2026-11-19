# Journal de construction Webflow (MCP)

Site Webflow : **WINKO** (`6afe8d84d7b588aa38a8fff7`). Page Home : `6afe8d85d7b588aa38a8fffe`.

## Fait
- **Variables** : tous les tokens de `:root` créés dans la collection par défaut (« Base collection ») avec **les mêmes noms CSS que le prototype** (`--accent-default`, `--bg-muted`, `--radius-card`, `--font-display`…). Une collection « Winko » (vide) a été créée en test : la supprimer dans le panneau Variables (elle préfixait les noms en `--_winko---…`).
- **Assets** : les 30 images de `public/images/` sont téléversées ; correspondance fichier ↔ id dans `tools/webflow/assets.json`.
- **Styles globaux** : le plan du site ne permet pas le code personnalisé au niveau du site (l'API renvoie 404). Les polices Google et le CSS non exprimable en classes Webflow (base `body`/titres, `@keyframes`, sélecteurs descendants, `::before`, `[hidden]`, `prefers-reduced-motion`) sont dans un **Embed** `global-styles` placé dans `page-wrapper` (méthode Client-First).
- **Script** : `public/js/winko.js` dans un Embed en fin de `body` (à déplacer dans Site settings > Custom code quand le plan le permet).
- **Page Home** complète : Header, S01 Hero, S05b Valeurs, S26 Logos, S02 Aiguillage, S27 Témoignages, S09 Bandeau CTA, Footer, popup « Télécharger l'app ». Toutes les images sont reliées à leur asset.

## À faire (dans l'ordre)
1. Transformer Header, Footer, popup app et chaque section en **Components** (props : textes, images, liens), puis remplacer les éléments de Home par des instances.
2. Embed `global-styles` et Embed script → un Component « Global styles » / « Scripts » réutilisé sur chaque page.
3. Pages Professionnels, Entreprises, Contact, Merci, légales, 404 (mêmes outils).
4. Collections CMS (`docs/cms.md`) + import des JSON, page modèle Événements.
5. Polices de marque, responsive à vérifier dans le Designer, publication.

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
