// Collections de contenus = collections CMS Webflow (Figma « 🗂 CMS & collections », 80:5).
// Un fichier JSON par collection dans src/content/, mêmes champs que dans Webflow :
// l'import dans Webflow (CSV) est mécanique. Voir docs/cms.md pour la correspondance des champs.
import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const cible = z.enum(['professionnels', 'entreprises', 'les-deux']);
const image = z.string().nullable(); // chemin dans public/ (Webflow : champ Image)

const verticales = defineCollection({
  loader: file('src/content/verticales.json'),
  schema: z.object({
    nom: z.string(),
    libelleOngletLogo: z.string(),
    couleurPrincipale: z.string(),
    teinteClaire: z.string(),
    statut: z.enum(['active', 'bientot']),
    panneau3d: image,
    accrocheProfessionnels: z.string().nullable(),
    accrocheEntreprises: z.string().nullable(),
    accroche: z.string().nullable(),
    description: z.string().nullable(),
    visuelCarte: image,
    ordre: z.number(),
    prefixeUrl: z.string(),
  }),
});

const metiers = defineCollection({
  loader: file('src/content/metiers.json'),
  schema: z.object({
    nomMasculin: z.string(),
    nomFeminin: z.string(),
    verticale: reference('verticales'),
    descriptionCourte: z.string().nullable(),
    picto: image,
    ordre: z.number(),
  }),
});

const profils = defineCollection({
  loader: file('src/content/profils.json'),
  schema: z.object({
    prenomInitiale: z.string(),
    metier: reference('metiers'),
    genre: z.enum(['f', 'm']),
    verticale: reference('verticales'),
    photo: z.string(),
    photoAlt: z.string(),
    photoDetouree: image,
    missions: z.number(),
    note: z.number(),
    specialites: z.number().nullable(),
    pastille: z.string().nullable(),
    consentementDiffusion: z.boolean(),
    ordre: z.number(),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq.json'),
  schema: z.object({
    question: z.string(),
    reponse: z.string(), // texte riche (HTML)
    cible,
    verticale: reference('verticales'),
    afficherAccueil: z.boolean(),
    ordre: z.number(),
  }),
});

const chiffresCles = defineCollection({
  loader: file('src/content/chiffres-cles.json'),
  schema: z.object({
    valeur: z.string(),
    libelle: z.string(),
    source: z.string().nullable(),
    cible,
    verticale: reference('verticales'),
    ordre: z.number(),
  }),
});

const exemplesMissions = defineCollection({
  loader: file('src/content/exemples-missions.json'),
  schema: z.object({
    pastille: z.string(),
    titre: z.string(),
    description: z.string(),
    lieuDates: z.string(),
    libelleBouton: z.string(),
    photo: image,
    verticale: reference('verticales'),
  }),
});

const enseignesClientes = defineCollection({
  loader: file('src/content/enseignes-clientes.json'),
  schema: z.object({
    nom: z.string(),
    logo: z.string(),
    largeur: z.number(),
    hauteur: z.number(),
    accordDiffusion: z.boolean(),
    verticale: reference('verticales'),
    ordre: z.number(),
  }),
});

const evenements = defineCollection({
  loader: file('src/content/evenements.json'),
  schema: z.object({
    titre: z.string(),
    surtitre: z.string(),
    chapo: z.string(),
    pointsCles: z.array(z.string()),
    dateEvenement: z.string(), // AAAA-MM-JJ
    libelleCompteARebours: z.string(),
    theme: z.enum(['clair', 'sombre']),
    cible,
    verticale: reference('verticales'),
    visuelHero: z.string(),
    missionMiseEnAvant: reference('exemplesMissions'),
    motsBandeau: z.array(z.string()),
    argumentsSurtitre: z.string(),
    argumentsTitre: z.string(),
    arguments: z.array(z.object({ picto: z.string(), titre: z.string(), texte: z.string() })).length(3),
    formulaireTitre: z.string(),
    formulaireVisuel: z.string(),
    hubspotFormId: z.string().nullable(),
    profils: z.array(reference('profils')),
    faq: z.array(reference('faq')),
    seoTitle: z.string(),
    seoDescription: z.string(),
    seoImage: image,
    datePublication: z.string().nullable(),
    dateDepublication: z.string().nullable(),
  }),
});

// Hors des 8 collections du lancement (Figma : « Demain · Collection Témoignages »),
// mais la section S27 en a besoin dès aujourd'hui.
const temoignages = defineCollection({
  loader: file('src/content/temoignages.json'),
  schema: z.object({
    type: z.enum(['enseigne', 'professionnel']),
    citation: z.string(),
    auteur: z.string(),
    role: z.string(),
    avatar: image,
    verticale: reference('verticales'),
    ordre: z.number(),
  }),
});

export const collections = {
  verticales,
  metiers,
  profils,
  faq,
  chiffresCles,
  exemplesMissions,
  enseignesClientes,
  evenements,
  temoignages,
};
