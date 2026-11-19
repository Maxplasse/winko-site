"""Génère les payloads create_collection_items (MCP Webflow) depuis src/content/*.json.
Usage : python3 tools/webflow/cms_items.py <collection> [refs.json]
refs.json : {"metiers": {"vendeur": "<item id>"}, ...} pour les références."""
import json, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
ASSETS = json.loads((ROOT / 'tools/webflow/assets.json').read_text())
SECTEUR = {'retail': '6afeafc6a0f72ec540285e1d'}
CIBLE = {
  'faq': {'professionnels': '7c4129f4250f6ce06f6bcec4833010ac', 'entreprises': 'e583a49c508712ca10d01d9facea35c7', 'les-deux': '206c037c6b0d7eeb08d9c4c578b28a9a'},
  'chiffres-cles': {'professionnels': '714b3f72af189357b395af0cffa15f1e', 'entreprises': '02e45048d7855aa4de954377ad0cfa8c', 'les-deux': '6c3fc857435ec63383be3bd4f79df0a4'},
  'evenements': {'professionnels': '9be53064f3cdb85404bbacad93c8cd30', 'entreprises': '9fc809d61fda1dfea1f542434133adde', 'les-deux': '3ea55159b3104dfe3d692b8466fdff2c'},
}
GENRE = {'f': 'a79ef01b0235ce65f993afcaacefaef2', 'm': '0ae2d57e6519e4a8ba7f56550efb320a'}
TYPE_T = {'enseigne': 'ddea2bb7294f3295c2b424aa15a6f22d', 'professionnel': '8f1575d7bf80ce6ff50199fbbf6c5e28'}
THEME = {'clair': '23702d716c5e2a60c9b0fc67ac53eb5a', 'sombre': '4228f95c684061c55c17b047a9bdeb8e'}

def img(path, alt=None):
    if not path: return None
    a = ASSETS['.' + path.removeprefix('/images')]
    d = {'fileId': a['id'], 'url': a['url']}
    if alt: d['alt'] = alt
    return d

def date(d): return d + 'T00:00:00.000Z' if d else None

def clean(d): return {k: v for k, v in d.items() if v is not None}

def build(col, refs):
    data = json.loads((ROOT / f'src/content/{col}.json').read_text())
    out = []
    for x in data:
        v = SECTEUR[x['secteur']]
        if col == 'metiers':
            f = {'name': x['nomMasculin'], 'nom-feminin': x['nomFeminin'], 'secteur': v, 'description-courte': x['descriptionCourte'], 'picto': img(x['picto']), 'ordre': x['ordre']}
        elif col == 'faq':
            f = {'name': x['question'], 'reponse': x['reponse'], 'cible': CIBLE['faq'][x['cible']], 'secteur': v, 'afficher-sur-l-accueil': x['afficherAccueil'], 'ordre': x['ordre']}
        elif col == 'chiffres-cles':
            f = {'name': x['valeur'], 'libelle': x['libelle'], 'source-date': x['source'], 'cible': CIBLE[col][x['cible']], 'secteur': v, 'ordre': x['ordre']}
        elif col == 'exemples-missions':
            f = {'name': x['titre'], 'pastille': x['pastille'], 'description': x['description'], 'lieu-dates': x['lieuDates'], 'libelle-du-bouton': x['libelleBouton'], 'photo': img(x['photo']), 'secteur': v}
        elif col == 'enseignes-clientes':
            f = {'name': x['nom'], 'logo': img(x['logo'], x['nom']), 'largeur-px': x['largeur'], 'accord-de-diffusion': x['accordDiffusion'], 'secteur': v, 'ordre': x['ordre']}
        elif col == 'temoignages':
            f = {'name': x['auteur'], 'type': TYPE_T[x['type']], 'citation': x['citation'], 'role': x['role'], 'avatar': img(x['avatar']), 'secteur': v, 'ordre': x['ordre']}
        elif col == 'profils':
            f = {'name': x['prenomInitiale'], 'metier': refs['metiers'][x['metier']], 'genre': GENRE[x['genre']], 'secteur': v,
                 'photo-face-camera': img(x['photo'], x['photoAlt']), 'photo-detouree': img(x['photoDetouree']), 'missions': x['missions'],
                 'note': str(x['note']).replace('.', ','), 'specialites': x['specialites'], 'pastille': x['pastille'],
                 'consentement-de-diffusion': x['consentementDiffusion'], 'ordre': x['ordre']}
        elif col == 'evenements':
            f = {'name': x['titre'], 'surtitre': x['surtitre'], 'chapo': x['chapo'],
                 **{f'point-cle-{i+1}': p for i, p in enumerate(x['pointsCles'])},
                 'date-de-l-evenement': date(x['dateEvenement']), 'libelle-compte-a-rebours': x['libelleCompteARebours'],
                 'theme': THEME[x['theme']], 'cible': CIBLE[col][x['cible']], 'secteur': v, 'visuel-hero-detoure': img(x['visuelHero']),
                 'mission-mise-en-avant': refs['exemples-missions'][x['missionMiseEnAvant']],
                 **{f'bandeau-mot-{i+1}': m for i, m in enumerate(x['motsBandeau'])},
                 'arguments-surtitre': x['argumentsSurtitre'], 'arguments-titre': x['argumentsTitre'],
                 'formulaire-titre': x['formulaireTitre'], 'formulaire-visuel': img(x['formulaireVisuel']), 'id-formulaire-hubspot': x['hubspotFormId'],
                 'profils': [refs['profils'][p] for p in x['profils']], 'faq': [refs['faq'][q] for q in x['faq']],
                 'seo-title': x['seoTitle'], 'seo-description': x['seoDescription'], 'image-de-partage': img(x['seoImage']),
                 'date-de-publication': date(x['datePublication']), 'date-de-depublication': date(x['dateDepublication'])}
            for i, a in enumerate(x['arguments']):
                f[f'argument-{i+1}-titre'] = a['titre']; f[f'argument-{i+1}-texte'] = a['texte']; f[f'argument-{i+1}-picto'] = img(f"/images/shared/picto-{a['picto']}.svg")
        f['slug'] = x['id']
        out.append({'isDraft': col == 'evenements', 'fieldData': clean(f)})
    return out

if __name__ == '__main__':
    refs = json.loads(pathlib.Path(sys.argv[2]).read_text()) if len(sys.argv) > 2 else {}
    print(json.dumps(build(sys.argv[1], refs), ensure_ascii=False))
