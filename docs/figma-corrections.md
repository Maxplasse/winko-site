# Brief · Corrections à reporter dans le Figma Winko

> **Pour : Claude avec accès au Figma.** Ce document liste toutes les corrections apportées au site (version code Astro + Webflow) depuis les maquettes, pour mettre le fichier Figma à jour. Chaque point donne l'emplacement Figma, l'état actuel de la maquette et ce qu'il faut représenter.
>
> - Fichier Figma : `kd2ZHnX0SYLFIBgQkXuCxM` (« Winko »).
> - Pages concernées : 🧩 Composants (8:3), 🧱 Sections (39:1161), 🖥 Aujourd'hui · Desktop (8:5), 📱 Aujourd'hui · Mobile (49:2135), 🗂 CMS & collections (80:5).
> - Référence visuelle à jour : la préversion `https://winko.webflow.io` (après publication) et le dépôt `Maxplasse/winko-site` (`src/components/`, `public/css/winko.css`).
> - Utiliser **les variables Figma existantes**, aucune couleur en dur : `accent-default` (#3458db), `accent-strong` (#1a3fa6), `accent-subtle` (#e3eafc), `accent-tint` (#eefcff), `bg-surface` (#ffffff), `bg-page`, `bg-inverse` (#212121), `text-primary`, `text-secondary`, `text-inverse`, `border-default`, `border-inverse` ; rayons `radius-lg` (24), `radius-card` (32), `radius-panel` (40), `radius-full`.
> - Pictos : famille **Phosphor, graisse Light**, comme les pictos existants.
> - Mettre à jour les cadres « Annotations à valider » à côté des pages modifiées (comportements au scroll, liens, contenus provisoires).
> - Ne rien inventer : les textes cités ci-dessous sont ceux du site. « [à valider] » reste un placeholder.

---

## 1. Global

### 1.1 Footer (Composant « Footer », Figma 10:54) · refonte complète

**Avant** : logo à part à gauche (grand carré), panneau bleu ciel à droite avec accroche, boutons, trois colonnes (pages, réseaux en texte, légal) et « © 2026 Winko. » / « All rights reserved. » dispersés.

**Après** : une seule bande qui contient tout.

- **Bande pleine largeur** (bord à bord, sans arrondi ni retrait) : fond `accent-tint`, texte `accent-default`. Le contenu reste aligné sur la grille du site (marges de page habituelles), padding 64 px en haut / 32 px en bas. (Un panneau arrondi en retrait a été essayé puis abandonné : la section précédente, bandeau CTA ou CTA photo, est déjà un bloc arrondi en retrait.)
- **Zone haute** (grille `1fr auto`, gouttière 48 px) :
  1. **Gauche** : logo Winko **intégré dans la bande**, taille moyenne (112 × 84 px, rayon 16, onglet « RETAIL » 9,6 px, wordmark 36 px) ; dessous l'accroche (Instrument Serif 36 px, interligne 1,05, largeur max 416 px) ; dessous les boutons (Télécharger l'app en primaire, Créer mon compte en secondaire contour, taille small). Espacement vertical 28 px. L'accroche et les boutons restent des propriétés (elles changent selon la page).
  2. **Droite, calées contre le bord droit** : trois colonnes, écart 72 px (réduit jusqu'à 32 px sur les écrans moyens), décalées de 56 px vers le bas (elles commencent un peu sous le haut du logo) :
     - *Accueil, Professionnels, Entreprises, Contact* ;
     - *Mentions légales, Politique de confidentialité, Politique cookies* ;
     - **« Nous suivre »** : petit titre (12 px, semibold, capitales, interlettrage 8 %, opacité 60 %), puis les pictos réseaux LinkedIn, Facebook, Instagram (Phosphor Light `linkedin-logo`, `facebook-logo`, `instagram-logo`, 22 px, `accent-default`) dans des pastilles rondes blanches de 40 px, écart 8 px ; survol : pastille `accent-default`, picto blanc.
     - Liens : DM Sans 16 px semibold, interligne 1, écart 16 px.
  - **Pas de QR code dans le footer** (essayé puis retiré).
- **Barre du bas** : filet 1 px `accent-subtle` au-dessus, padding haut 24 px. Gauche : « © 2026 Winko. All rights reserved. » (regular, opacité 60 %). Droite : « FR · UK » (semibold).
- Les réseaux ne sont plus des liens texte.
- **Tablette (< 992 px)** : tout empilé (accroche/boutons, puis liens sans décalage).
- **Mobile (< 768 px)** : padding 48 px en haut / 24 px en bas ; accroche 28 px ; les trois colonnes s'empilent (pages, mentions légales, Nous suivre) ; barre du bas en colonne (copyright, puis FR · UK).

### 1.2 Widget sticky (Figma 24:751 Professionnels / 21:753 Entreprises) · version compacte

**Avant** : grande carte noire (`bg-inverse`) de 400 px avec titre H3, texte et gros bouton pleine largeur ; barre pleine largeur collée en bas sur mobile.

**Après** : une **pastille** discrète, entièrement cliquable, en bas à droite (32 px des bords).
- Fond `bg-surface`, bordure 1 px `border-default`, rayon `radius-full`, ombre carte (0 8 24 rgba(18,18,18,.08)), padding 8 / 20 / 8 / 8, éléments alignés au centre, écart 14 px.
- De gauche à droite : picto 22 px dans un rond `accent-subtle` de 44 px ; bloc texte (titre DM Sans 16 semibold `text-primary` ; texte 13 px `text-secondary`) ; flèche « → » `accent-default` (décalée de 3 px au survol). Survol : bordure `accent-default`.
- **Variante Professionnels** : picto **mobile** (Phosphor Light `device-mobile`), titre « Entretien personnalisé. », texte « Formulaire de contact à remplir en 2 min. ». Au clic : ouvre la **popup formulaire** (§ 1.3), sur desktop et mobile.
- **Variante Entreprises** : picto **téléphone** (Phosphor Light `phone-call`), titre « Être appelé », même texte. Au clic : Contact, écran « Je cherche à recruter » (`/contact#recruter`).
- **Mobile** : même pastille flottante, marges 20 px gauche/droite, 16 px du bas ; la flèche est poussée à droite.
- Comportement à annoter : apparaît après 600 px de scroll, disparaît quand le footer arrive.

### 1.3 Nouveau composant · Popup formulaire « Entretien personnalisé » (Professionnels)

Ouverte par le widget sticky de Professionnels. Reprendre l'UI suivante (desktop, largeur 640 px max) :
- Fenêtre : fond `accent-default`, texte blanc, rayon `radius-panel`, padding 28, ombre 0 24 32 rgba(0,0,0,.25), voile sombre derrière (rgba(33,33,33,.6)).
- En-tête : à gauche le logo Winko en **variante claire** (fond `accent-tint`, wordmark `accent-default`, onglet « RETAIL » en `accent-default` texte blanc), 120 × 120, rayon 16 ; à droite le bouton fermer : carré blanc 84 × 84, rayon 20, bordure 2 px `accent-default` + anneau blanc 2 px autour, picto Phosphor Light `minus-square` 40 px `accent-default`.
- Panneau formulaire : fond blanc à 8 % sur le bleu, rayon `radius-card`, padding 40 / 40 / 10.
  - Titre centré « Entretien personnalisé. » (Instrument Serif, style H2).
  - Champs (placeholders blancs, bordure blanche 40 %, rayon 12, padding 22 × 30, 18 px) : « Nom* » et « Prénom* » côte à côte, puis « Email* », puis « Numéro de téléphone* ». Écart 24 px.
  - Case à cocher (carré 20 px, bordure blanche 2 px, rayon 5) + « En soumettant ce formulaire, j'accepte d'être recontacté par Winko. » (17 px).
  - Bouton pleine largeur qui déborde légèrement du panneau (marges négatives 30 px) : « Être rappelé », rayon `radius-lg`, padding 26. **État inactif** (formulaire incomplet) : fond blanc 20 %, texte blanc 50 %. **État actif** : fond blanc, texte `accent-default` ; survol `accent-subtle`.
- **Mobile** : fenêtre padding 16, rayon 32 ; logo 80 px ; fermer 56 px ; formulaire padding 28/20/8 ; Nom et Prénom l'un sous l'autre ; champs 16 px.
- À annoter : envoi → page Merci (`/merci`) ; formulaire HubSpot ou natif à confirmer.

### 1.4 Logo Mellow Yellow

Remplacer le logo actuel (empilé, mal recadré) par le **logo officiel horizontal** « my mellow yellow » (SVG : `https://www.mellowyellow.com/static/version1794836332/frontend/MellowYellow/base/fr_FR/images/MY_logo.svg`, copie dans le dépôt `public/images/shared/logo-mellow-yellow.svg`). Largeur d'affichage dans le bandeau : 150 px (≈ 20 px de haut). À reporter dans S26 (bandeau logos) et dans la collection « Enseignes clientes » (page CMS 80:5, champ Logo, Largeur 150).

### 1.5 S26 · Bandeau logos « Ils nous font confiance » · hauteur réduite

Marges verticales de la section ramenées de 64 px à **40 px** en desktop et **32 px** en mobile (nouvelle taille d'espacement « xsmall »). Concerne Accueil et Professionnels.

### 1.6 S09 · Bandeau CTA (variante B2C, fond bleu)

Quand il y a deux boutons, le second n'est plus blanc plein : **contour blanc** (fond transparent, bordure et texte blancs ; survol fond blanc, texte `text-primary`). Ex. Accueil : « Trouver du renfort ».

### 1.7 CMS & collections (page 80:5)

La collection **« Verticales » s'appelle désormais « Secteurs »** (champ de référence `secteur` partout : Métiers, Enseignes clientes, Événements…).

---

## 2. Accueil (Desktop 8:5 / Mobile 49:2135)

### 2.1 S01 · Hero → nouveau mode « panneau » (Figma 299:2625)

**Avant** : fond `accent-default`, textes blancs, photo de vendeuse en dessous.

**Après** :
- Fond de section `accent-tint` (bleu très clair).
- Surtitre « Winko Retail » : fond `accent-subtle`, texte `accent-strong`.
- Titre « La bonne mission. Le bon renfort. » et texte en `text-primary`.
- **En-tête compacte** pour que le panneau « Vente » soit visible sans scroller : titre **72 px** (au lieu de 120, réduit jusqu'à 44 px sur les écrans peu hauts), texte 18 px, marge haute 40 px, espacements de 16 px entre surtitre, titre, texte et boutons, 24 px entre les boutons et le panneau. Mobile : titre 40 px, texte 16 px, marge haute 28 px, espacements 12 px.
- Boutons : « Je cherche une mission » en **primaire bleu** (`accent-default`, texte blanc) ; « Je cherche du renfort » en **secondaire** (contour `border-inverse`, texte `text-primary`).
- Sous le texte, le **panneau de signalisation 3D** de winko.io (mât, panneaux bleus « Vente », panneau blanc « Trouver une mission. », cartes photos métiers autour) : largeur 608 px, ratio 1192 × 1080, centré, collé au bas de la section, **fondu sur les 12 % du bas** (le mât disparaît en douceur). Le hero n'a plus de marge basse sous le visuel. Image de référence : `public/images/home/panneau-poster.webp` (première image), animation : `public/videos/panneau-scroll.mp4`.
- **Mobile** : panneau en pleine largeur, mêmes couleurs ; boutons empilés pleine largeur alignés à gauche.
- À annoter : le panneau tourne autour de son mât en suivant le scroll (vidéo pilotée par le scroll, reprise de winko.io), avec inertie ; il reste fixé au centre de l'écran pendant une demi-hauteur d'écran de scroll supplémentaire (zone « ralentie ») ; image fixe si l'utilisateur limite les animations.
- La photo de vendeuse ne figure plus sur l'accueil (elle passe sur Professionnels, § 3.1).

---

## 3. Professionnels (B2C)

### 3.1 S01 · Hero → photo en panneau arrondi (Figma 506:2774)

**Avant** : fond bleu, visuel de l'app sous le texte.

**Après** :
- Fond de section `accent-default`.
- La photo (vendeuse présentant des smartphones, ex-photo de l'accueil) remplit un **panneau arrondi** : 40 px du haut et du bas de la section, et **sur les côtés, aligné sur la marge du header** (bord gauche du logo, bord droit du bouton : 64 px en desktop, 40 px tablette, 20 px mobile, contenu centré dans 1 312 px max) ; rayon `radius-panel` ; on voit le bleu autour.
- Voile sombre uniforme sur la photo : `bg-inverse` à 45 % (pas de dégradé).
- Textes et bouton **par-dessus la photo**, centrés : surtitre « Professionnels » (pastille blanche translucide), titre blanc « Votre prochaine mission en un clic. », texte blanc, bouton blanc « Télécharger l'app ». Hauteur minimale du contenu : 704 px.
- Le visuel de l'app n'est plus dans le hero.
- **Mobile** : 20 px en haut/bas, côtés à 20 px (marge du header), rayon `radius-card`, hauteur min 608 px, contenu avec 48 px / 20 px de marge intérieure.

### 3.2 S28 · Avantages « Ce qui change avec Winko. » (Figma 506:531)

Les mini-écrans de l'app (cartes blanches dans chaque carte) deviennent des **hauts d'écran de téléphone** :
- Chaque mini-écran est entouré d'un **cadre translucide** (blanc 24 %, filet intérieur blanc 35 %, 8 px d'épaisseur sur les côtés et en haut, rayon haut 36 px, pas de bord bas), en retrait de 8 px des côtés de la carte, qui **dépasse et est coupé par le bas de la carte** (la carte masque ce qui dépasse). Sur les cartes `is-subtle` (bleu clair), cadre blanc 55 %.
- L'écran blanc à l'intérieur : rayon haut 28 px, bas carré, hauteur min 152 px, petite barre grise centrée en haut (48 × 5 px, `border-default`, rayon plein) — sauf pour les écrans en ligne (« 1 défi »).
- Plus d'ombre sur les mini-écrans.
- Onglets « Mon activité / Mes badges / Mes expériences » : sur une seule ligne.
- **Mobile** : cadre sans retrait latéral, dépasse de 24 px.
- Contenus inchangés (en français). Note : les écrans du PPT démo sont en anglais, non utilisés.

### 3.3 Widget sticky + popup

Voir § 1.2 (variante Professionnels, picto mobile) et § 1.3 (popup formulaire).

---

## 4. Entreprises (B2B)

- Widget sticky : variante « Être appelé » avec picto téléphone (§ 1.2).

---

## 5. Contact · écran 2B « Je cherche une mission » (Figma 512:2457)

**Avant** : bandeau S09 pleine largeur (bleu, texte à gauche, téléphone coupé dans un ovale à droite, bouton « Télécharger l'app »).

**Après** : carte compacte centrée.
- Largeur max 896 px, fond `accent-default`, texte blanc, rayon `radius-panel`, padding 48 / 48 / 48 / 56, contenu aligné au centre, écart 48 px.
- Gauche : titre H2 « Votre conseiller vous attend dans l'app. », texte « Un accès direct à votre conseiller vous est réservé. Téléchargez l'app pour lui écrire. »
- **Desktop** : à droite, **tuile QR code** blanche (rayon `radius-lg`, padding 20, largeur 232 px), QR 160 × 160, légende 13 px `text-secondary` : « Scannez ce QR code avec l'appareil photo de votre téléphone pour télécharger Winko. » **Pas de bouton** sur desktop.
- **Mobile** : carte en colonne, padding 32/24, rayon `radius-card` ; **QR masqué**, à la place le bouton blanc « Télécharger l'app » (lien vers le store).

---

## 6. Points provisoires à signaler dans les annotations

- QR code : pointe vers le lien provisoire `winko.io/app` (popup app, Contact) — à remplacer par le lien définitif.
- Liens LinkedIn / Facebook / Instagram du footer : URL à fournir.
- Popup formulaire et formulaire Contact : messages de succès / erreur à rédiger, branchement HubSpot à confirmer.
- Panneau 3D de l'accueil : repris de winko.io (vidéo 1920 × 1080) ; une version d'origine haute définition de l'agence serait idéale.
