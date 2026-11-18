# Assets : état et exports à faire

`figma.com` est bloqué dans l'environnement cloud : les images ont été extraites de rendus Figma **en 1x** (nettes sur écran standard, un peu floues sur Retina). Pour la mise en ligne, réexporter en **2x** (WebP ou JPG pour les photos, PNG pour les détourés, SVG pour les logos s'ils existent).

| Fichier | Source Figma | État |
|---|---|---|
| images/home/hero-photo.jpg | S01 · Photo plein cadre (299:498) / Médiathèque 133:6735 | 1x, rognée depuis un rendu |
| images/shared/visuel-app.png | S09 · Visuel app (490:2487) | 1x |
| images/shared/detoure-anna.png | Hero Entreprises (39:3060), CTA Professionnels, hero LP Noël | 1x (460×620) |
| images/shared/objet-signature.png | Médiathèque « Image3 » (27:502) : étape 03, 404 | 1x (893×810) |
| images/professionnels/etape-compte.png | Médiathèque « Visuel13 détouré » (27:510) : étape 01, hero LP Black Friday, formulaire LP Noël | 1x (291×435), **trop petit pour le hero LP** |
| images/professionnels/vignette-article.png | Card « Des conseils pour progresser » (532:779) | 1x (72×72) |
| images/entreprises/profil-*.jpg (4) | S04 Profils (39:3144) | 1x, rognés depuis un rendu |
| images/entreprises/cta-maroquinerie.jpg | Médiathèque « Visuel3 default » (133:6737) | 1x (766×522) |
| images/lp/detoure-tablette.png | Médiathèque « Visuel11 détouré » (27:511) | 1x (521×291) |
| images/shared/logo-*.png (8) | S26 Logos enseignes (497:494 → 497:501) | 1x, rognés : **à remplacer par les logos fournis par le client** |
| images/shared/avatar-1.png, avatar-2.png | S27 (503:538, 503:556) | 1x ; avatar-3 (503:574) manquant |
| images/shared/picto-*.svg (7) | Phosphor Light : lightning, target, shield-check, calendar-check, storefront, handshake, clock | OK, SVG d'origine (@phosphor-icons/core) |
| images/shared/qr-app.svg | QR vers https://winko.io/app | Généré, lien provisoire à confirmer |
| Logo Winko | Placeholder HTML/CSS | Remplacer par `logo-winko-blue.svg` officiel |
