"""Extrait de winko.css les règles utiles à un fragment HTML, au format accepté par data_whtml_builder.
Sépare : règles « classables » (.a, .a.b, .a:hover, dans les media 991/767/479) et règles « globales »
(sélecteurs complexes, éléments, @keyframes, prefers-reduced-motion) à mettre dans le custom code du site."""
import re, sys, json
import os
CSS = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../public/css/winko.css')).read()
CSS = re.sub(r'/\*.*?\*/', '', CSS, flags=re.S)
ALLOWED = {'(max-width: 991px)': 991, '(max-width: 767px)': 767, '(max-width: 479px)': 479}

def parse(css, media=None, out=None):
    out = [] if out is None else out
    i = 0
    while i < len(css):
        j = css.find('{', i)
        if j < 0: break
        sel = css[i:j].strip()
        if sel.startswith('@'):
            depth, k = 1, j + 1
            while depth:
                if css[k] == '{': depth += 1
                elif css[k] == '}': depth -= 1
                k += 1
            inner = css[j+1:k-1]
            if sel.startswith('@media'):
                parse(inner, sel, out)
            else:
                out.append((sel, None, inner.strip()))
            i = k
        else:
            k = css.find('}', j)
            out.append((media, sel, css[j+1:k].strip()))
            i = k + 1
    return out

RULES = parse(CSS)
SIMPLE = re.compile(r'^(\.[\w-]+)+(:(hover|focus-visible|focus|first-child|last-child|placeholder))?$')

def media_ok(m):
    if m is None: return True
    for k in ALLOWED:
        if k in m and 'screen' in m: return True
    return False

def classes_of(sel):
    return set(re.findall(r'\.([\w-]+)', sel))

def extract(html_classes):
    local, glob = [], []
    for media, sel, decl in RULES:
        if sel is None:
            continue
        for s in [x.strip() for x in sel.split(',')]:
            cls = classes_of(s)
            simple = bool(SIMPLE.match(s)) and media_ok(media)
            if simple:
                if cls and cls <= html_classes:
                    local.append((media, s, decl))
            else:
                if cls & html_classes or not cls:
                    glob.append((media, s, decl))
    return local, glob

def fmt(rules):
    out = []
    for media, s, d in rules:
        body = f'{s} {{ {d} }}'
        out.append(f'{media} {{ {body} }}' if media else body)
    return '\n'.join(out)

if __name__ == '__main__':
    html = open(sys.argv[1]).read()
    cl = set()
    for m in re.findall(r'class="([^"]+)"', html):
        cl |= set(m.split())
    loc, glo = extract(cl)
    print(json.dumps({'css': fmt(loc), 'global': fmt(glo), 'classes': sorted(cl)}, ensure_ascii=False))
