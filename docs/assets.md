# Assets : état et exports à faire

`figma.com` est bloqué dans l'environnement cloud : les images ont été extraites de rendus Figma **en 1x**. Elles sont à remplacer par des exports **2x** (WebP ou JPG pour les photos, SVG pour les logos s'ils existent).

| Fichier | Source Figma | État |
|---|---|---|
| images/home/hero-photo.jpg | S01 Hero · Photo plein cadre (299:498) | 1x, rognée depuis un rendu, à réexporter |
| images/shared/visuel-app.png | S09 · Visuel app (490:2487) | 1x |
| images/shared/logo-*.png (8) | S26 Logos enseignes (497:494 → 497:501) | 1x, rognés depuis un rendu, à remplacer par les logos fournis par le client |
| images/shared/avatar-1.png, avatar-2.png | S27 (503:538, 503:556) | 1x |
| avatar-3 | S27 (503:574) | **manquant** (placeholder rond) |
| images/shared/picto-*.svg | Phosphor Light (lightning, target, shield-check), couleur accent/strong | OK, SVG d'origine du paquet npm @phosphor-icons/core |
| Logo Winko | Placeholder HTML/CSS | Remplacer par `logo-winko-blue.svg` officiel |
