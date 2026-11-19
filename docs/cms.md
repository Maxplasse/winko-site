# Collections CMS : JSON ↔ Webflow

Source : Figma « 🗂 CMS & collections » (80:5). Un fichier `src/content/*.json` par collection, schémas dans `src/content.config.ts`. Les champs Webflow portent le libellé du Figma ; le JSON utilise la clé entre parenthèses. `id` = slug Webflow.

Types : Texte, Texte riche, Image, Fichier, Option, Switch, Nombre, Date, Référence, Multi-référence, Couleur.

## Collections du lancement (8)

### Secteurs · `secteurs.json`
Nom (`nom`) · Slug (`id`) · Libellé de l'onglet logo (`libelleOngletLogo`) · Couleur principale / teinte claire (`couleurPrincipale`, `teinteClaire`, Couleur) · Statut active / bientôt (`statut`, Option) · Panneau 3D (`panneau3d`, Fichier) · Accroche professionnels / entreprises (`accrocheProfessionnels`, `accrocheEntreprises`) · Accroche et description accueil Winko (`accroche`, `description`) · Visuel de la carte (`visuelCarte`) · Ordre d'affichage (`ordre`) · Préfixe d'URL (`prefixeUrl`).
Sections : couleur et onglet du logo partout, S02 Aiguillage (accroches).

### Métiers · `metiers.json`
Nom masculin / féminin (`nomMasculin`, `nomFeminin`) · Secteur (Référence) · Description courte · Picto (Image) · Ordre.
Aucun affichage direct ; sert au libellé du métier sur les profils.

### Profils · `profils.json`
Prénom + initiale (`prenomInitiale`) · Métier (Référence) · Secteur (Référence) · Photo face caméra (`photo`) · Photo détourée (`photoDetouree`) · Missions / note / spécialités (`missions`, `note`, `specialites`, Nombre) · Pastille · Consentement de diffusion (Switch) · Ordre.
Sections : S04 (secteur, consentement = oui, 4 premiers), LP événement (multi-référence).

### FAQ · `faq.json`
Question · Réponse (Texte riche, HTML) · Cible (Professionnels, Entreprises, Les deux) · Secteur (Référence) · Afficher sur l'accueil (Switch) · Ordre.
Sections : S20 Professionnels / Entreprises (cible de la page, 6 premiers par ordre), S08 LP événement (multi-référence de l'item). Les questions propres aux LP ont un ordre ≥ 10 pour rester hors des pages permanentes.

### Chiffres clés · `chiffres-cles.json`
Valeur · Libellé · Source + date de la donnée (`source`) · Cible · Secteur.
Section : S03 (Entreprises). Tous les chiffres sont « [à valider] ».

### Exemples de missions · `exemples-missions.json`
Pastille · Titre + rémunération (`titre`) · Description · Lieu + dates (`lieuDates`) · Libellé du bouton · Photo associée · Secteur.
Section : carte vitrée du S14 (mission mise en avant), S17 plus tard.

### Événements · `evenements.json`
Champs du Figma : Titre, surtitre, chapô (`titre`, `surtitre`, `chapo`) · Date de l'événement (`dateEvenement`, compte à rebours) · Cible · Secteur · Visuel hero détouré (`visuelHero`) · Mission mise en avant (Référence → Exemples de missions) · Mots du bandeau défilant (`motsBandeau`) · 3 arguments (`arguments[]` : picto, titre, texte) · Profils / FAQ (Multi-références) · ID formulaire HubSpot · SEO (`seoTitle`, `seoDescription`, `seoImage`) · Dates de publication / dépublication.

**Champs ajoutés par rapport au Figma** (présents dans les maquettes des LP, à créer dans Webflow) :
`pointsCles` (3 lignes cochées du hero), `libelleCompteARebours`, `theme` (clair / sombre), `argumentsSurtitre`, `argumentsTitre`, `formulaireTitre`, `formulaireVisuel`.
Dans Webflow, les listes (`pointsCles`, `motsBandeau`, `arguments`) deviennent des champs numérotés (Point clé 1, 2, 3 ; Argument 1 titre / texte / picto…).
Page modèle : `/evenements/[slug]`, non publiée au lancement (noindex).

### Enseignes clientes · `enseignes-clientes.json`
Nom · Logo (Fichier SVG) · Accord de diffusion (Switch) · Secteur · Ordre. (`largeur`, `hauteur` : dimensions d'affichage, utiles seulement au prototype.)
Section : S26 Logos (accord = oui). Les accords sont à confirmer : les valeurs `true` sont provisoires.

## Hors lancement, mais utilisée

### Témoignages · `temoignages.json`
Prévue « Demain » dans le Figma ; la section S27 en a besoin dès aujourd'hui. Champs : Type (enseigne / professionnel), Citation, Auteur, Rôle, Avatar, Secteur, Ordre. Contenus provisoires (« Prénom N. ») : à remplacer par des témoignages réels. Si la collection n'est pas créée au lancement, S27 reste une section statique dans Webflow.

## Dans Webflow (créé via MCP)
Toutes les collections existent avec leurs champs et leurs contenus (Événements en brouillon). Import reproductible : `python3 tools/webflow/cms_items.py <collection> tools/webflow/cms_refs.json` (ids des items dans `cms_refs.json`).

| Collection | Id | Champ nom |
|---|---|---|
| Secteurs | 6afeaf77d852e997766167da | Nom |
| Métiers | 6afea8bb38c9291ca9d6ef55 | Nom (masculin) |
| Profils | 6afea8bc8a1019cc67060e1f | Prénom + initiale |
| FAQ | 6afea8bcf5cb1bb71b0bf9d7 | Question |
| Chiffres clés | 6afea8bd88c16a37d418d9c1 | Valeur |
| Exemples de missions | 6afea8bd7fe0f06860947b07 | Titre + rémunération |
| Enseignes clientes | 6afea8be9ecae00fd696d43f | Nom |
| Témoignages | 6afea8beb7b6bcea80e06487 | Auteur |
| Événements | 6afea8bfbaf838e4089b13a3 | Titre |

Écarts avec le JSON :
- Le renommage de « Verticales » échouant dans Webflow (« Failed to create database »), une collection « Secteurs » neuve a remplacé l'ancienne ; les références (slug `secteur`) pointent vers elle. L'ancienne collection « Verticales » (6afea87e38c9291ca9d6e1f3) n'est plus utilisée : la supprimer dans le CMS (l'API ne sait pas supprimer une collection).
- Profils : la note est un texte (« 4,8 ») ; l'alt de la photo est porté par l'image. Le libellé du métier s'affiche avec deux textes liés à Métier : Nom (masculin) / Nom (féminin), chacun en visibilité conditionnelle sur Genre.
- Enseignes : `largeur` → « Largeur (px) » ; `hauteur` non reprise.
- Événements : listes à plat (Point clé 1-3, Bandeau mot 1-4, Argument 1-3 titre / texte / picto en image).
