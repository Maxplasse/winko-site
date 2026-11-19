# Collections CMS : JSON ↔ Webflow

Source : Figma « 🗂 CMS & collections » (80:5). Un fichier `src/content/*.json` par collection, schémas dans `src/content.config.ts`. Les champs Webflow portent le libellé du Figma ; le JSON utilise la clé entre parenthèses. `id` = slug Webflow.

Types : Texte, Texte riche, Image, Fichier, Option, Switch, Nombre, Date, Référence, Multi-référence, Couleur.

## Collections du lancement (8)

### Verticales · `verticales.json`
Nom (`nom`) · Slug (`id`) · Libellé de l'onglet logo (`libelleOngletLogo`) · Couleur principale / teinte claire (`couleurPrincipale`, `teinteClaire`, Couleur) · Statut active / bientôt (`statut`, Option) · Panneau 3D (`panneau3d`, Fichier) · Accroche professionnels / entreprises (`accrocheProfessionnels`, `accrocheEntreprises`) · Accroche et description accueil Winko (`accroche`, `description`) · Visuel de la carte (`visuelCarte`) · Ordre d'affichage (`ordre`) · Préfixe d'URL (`prefixeUrl`).
Sections : couleur et onglet du logo partout, S02 Aiguillage (accroches).

### Métiers · `metiers.json`
Nom masculin / féminin (`nomMasculin`, `nomFeminin`) · Verticale (Référence) · Description courte · Picto (Image) · Ordre.
Aucun affichage direct ; sert au libellé du métier sur les profils.

### Profils · `profils.json`
Prénom + initiale (`prenomInitiale`) · Métier (Référence) · Verticale (Référence) · Photo face caméra (`photo`) · Photo détourée (`photoDetouree`) · Missions / note / spécialités (`missions`, `note`, `specialites`, Nombre) · Pastille · Consentement de diffusion (Switch) · Ordre.
Sections : S04 (verticale, consentement = oui, 4 premiers), LP événement (multi-référence).

### FAQ · `faq.json`
Question · Réponse (Texte riche, HTML) · Cible (Professionnels, Entreprises, Les deux) · Verticale (Référence) · Afficher sur l'accueil (Switch) · Ordre.
Sections : S20 Professionnels / Entreprises (cible de la page, 6 premiers par ordre), S08 LP événement (multi-référence de l'item). Les questions propres aux LP ont un ordre ≥ 10 pour rester hors des pages permanentes.

### Chiffres clés · `chiffres-cles.json`
Valeur · Libellé · Source + date de la donnée (`source`) · Cible · Verticale.
Section : S03 (Entreprises). Tous les chiffres sont « [à valider] ».

### Exemples de missions · `exemples-missions.json`
Pastille · Titre + rémunération (`titre`) · Description · Lieu + dates (`lieuDates`) · Libellé du bouton · Photo associée · Verticale.
Section : carte vitrée du S14 (mission mise en avant), S17 plus tard.

### Événements · `evenements.json`
Champs du Figma : Titre, surtitre, chapô (`titre`, `surtitre`, `chapo`) · Date de l'événement (`dateEvenement`, compte à rebours) · Cible · Verticale · Visuel hero détouré (`visuelHero`) · Mission mise en avant (Référence → Exemples de missions) · Mots du bandeau défilant (`motsBandeau`) · 3 arguments (`arguments[]` : picto, titre, texte) · Profils / FAQ (Multi-références) · ID formulaire HubSpot · SEO (`seoTitle`, `seoDescription`, `seoImage`) · Dates de publication / dépublication.

**Champs ajoutés par rapport au Figma** (présents dans les maquettes des LP, à créer dans Webflow) :
`pointsCles` (3 lignes cochées du hero), `libelleCompteARebours`, `theme` (clair / sombre), `argumentsSurtitre`, `argumentsTitre`, `formulaireTitre`, `formulaireVisuel`.
Dans Webflow, les listes (`pointsCles`, `motsBandeau`, `arguments`) deviennent des champs numérotés (Point clé 1, 2, 3 ; Argument 1 titre / texte / picto…).
Page modèle : `/evenements/[slug]`, non publiée au lancement (noindex).

### Enseignes clientes · `enseignes-clientes.json`
Nom · Logo (Fichier SVG) · Accord de diffusion (Switch) · Verticale · Ordre. (`largeur`, `hauteur` : dimensions d'affichage, utiles seulement au prototype.)
Section : S26 Logos (accord = oui). Les accords sont à confirmer : les valeurs `true` sont provisoires.

## Hors lancement, mais utilisée

### Témoignages · `temoignages.json`
Prévue « Demain » dans le Figma ; la section S27 en a besoin dès aujourd'hui. Champs : Type (enseigne / professionnel), Citation, Auteur, Rôle, Avatar, Verticale, Ordre. Contenus provisoires (« Prénom N. ») : à remplacer par des témoignages réels. Si la collection n'est pas créée au lancement, S27 reste une section statique dans Webflow.
