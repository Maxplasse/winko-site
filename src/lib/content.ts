// Requêtes CMS réutilisées par les sections (équivalent des filtres des Collection Lists Webflow).
import { getCollection, getEntries } from 'astro:content';
import type { ReferenceDataEntry } from 'astro:content';

type Cible = 'professionnels' | 'entreprises';
const byOrder = <T extends { data: { ordre: number } }>(a: T, b: T) => a.data.ordre - b.data.ordre;
const matchCible = (c: string, cible: Cible) => c === cible || c === 'les-deux';

/** FAQ d'une page : filtrée par cible (ou « Afficher sur l'accueil »), triée par ordre, 6 max
 *  (Webflow : filtre + tri + « Limit items »). Les questions propres aux événements ont un ordre ≥ 10
 *  et sont reliées aux items Événements par multi-référence. */
export async function faqFor(cible: Cible | 'accueil', secteur = 'retail', limit = 6) {
  const all = await getCollection('faq', ({ data }) =>
    data.secteur.id === secteur &&
    (cible === 'accueil' ? data.afficherAccueil : matchCible(data.cible, cible)));
  return all.sort(byOrder).slice(0, limit);
}

/** Chiffres clés d'une cible. */
export async function statsFor(cible: Cible, secteur = 'retail') {
  return (await getCollection('chiffresCles', ({ data }) =>
    data.secteur.id === secteur && matchCible(data.cible, cible))).sort(byOrder);
}

/** Profils diffusables (consentement = oui), 4 premiers par défaut. */
export async function profilesFor(secteur = 'retail', limit = 4) {
  return (await getCollection('profils', ({ data }) =>
    data.secteur.id === secteur && data.consentementDiffusion)).sort(byOrder).slice(0, limit);
}

/** Résout une liste de références (champ Multi-référence). */
export async function resolve<C extends 'profils' | 'faq'>(refs: ReferenceDataEntry<C>[]) {
  return getEntries(refs);
}
