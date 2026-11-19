"""Prépare l'insertion d'une section dans Webflow : HTML (images -> CDN Webflow) + CSS des classes encore jamais envoyées.
Usage : section.py <page dist html> <index de section (0=header)> [--dry]"""
import re, sys, json, os
sys.path.insert(0, os.path.dirname(__file__))
import cssx
D = os.path.dirname(os.path.abspath(__file__))
assets = json.load(open(f'{D}/assets.json'))
by_path = {'/images/' + k[2:]: v['url'] for k, v in assets.items()}
done_f = f'{D}/created.json'
done = set(json.load(open(done_f))) if os.path.exists(done_f) else set()

def blocks(html):
    body = html[html.index('<div class="page-wrapper">'):]
    out = []
    # header
    m = re.search(r'<header class="navbar_component".*?</header>', body, re.S); out.append(m.group(0))
    main = re.search(r'<main class="main-wrapper">(.*)</main>', body, re.S).group(1)
    # sections / divs de premier niveau dans main
    i = 0
    while True:
        m = re.search(r'<(section|div)\b', main[i:])
        if not m: break
        start = i + m.start(); tag = m.group(1)
        depth = 0; j = start
        for t in re.finditer(rf'<(/?){tag}\b[^>]*>', main[start:]):
            depth += -1 if t.group(1) else 1
            if depth == 0: j = start + t.end(); break
        out.append(main[start:j]); i = j
    after = body[body.index('</main>'):]
    for pat in [r'<aside class="sticky-widget".*?</aside>', r'<footer class="section_footer".*?</footer>']:
        m = re.search(pat, after, re.S)
        if m: out.append(m.group(0))
    m = re.search(r'<div class="app-modal".*?</div>\s*</div>\s*</div>', html, re.S)
    if m: out.append(m.group(0))
    return out

def clean(h):
    h = re.sub(r'<!--.*?-->', '', h, flags=re.S)
    h = re.sub(r'src="([^"]+)"', lambda m: f'src="{by_path.get(m.group(1), m.group(1))}"', h)
    h = re.sub(r'\n\s*\n', '\n', h)
    return h.strip()

def norm(d):
    # les ombres ne peuvent pas être des Variables Webflow : valeurs littérales
    d = d.replace('var(--shadow-ui)', '0 12px 32px rgba(13, 20, 51, 0.18)').replace('var(--shadow-card)', '0 8px 24px rgba(18, 18, 18, 0.08)')
    d = re.sub(r'(box-shadow:[^;]*?)var\(--accent-default\)', r'\1#3458db', d)
    d = re.sub(r'background:\s*none', 'background-color: transparent; background-image: none', d)
    d = re.sub(r'background:\s*(linear-gradient\([^;]*\))', r'background-image: \1', d)
    d = re.sub(r'border:\s*0(?![.\d])', 'border-style: none', d)
    d = re.sub(r'inset:\s*0(?![.\d])', 'top: 0; right: 0; bottom: 0; left: 0', d)
    # zéros sans unité (refusés par l'import Webflow : « Invalid length unit »)
    out = []
    for decl in d.split(';'):
        if ':' in decl:
            k, v = decl.split(':', 1)
            if k.strip() not in ('flex', 'opacity', 'z-index', 'line-height', 'order', 'flex-grow', 'flex-shrink', 'font-weight') and 'rgba' not in v and 'polygon' not in v:
                v = re.sub(r'(?<![\w.])0(?![\w.%])', '0px', v)
            decl = k + ':' + v
        out.append(decl)
    d = ';'.join(out)
    # clip-path n'est pas géré par le panneau de styles : à mettre dans l'Embed Global styles
    d = re.sub(r'clip-path:[^;]*;?', '', d)
    return d

BP = {None: None, 991: 'medium', 767: 'small', 479: 'tiny'}
def accent_fixes(rules):
    out = []
    for media, sel, d in rules:
        if '--accent-default' not in d: continue
        bp = None
        for k, v in cssx.ALLOWED.items():
            if media and k in media: bp = BP[v]
        pseudo = None
        m = re.search(r':([\w-]+)$', sel)
        if m: pseudo = m.group(1); sel = sel[:m.start()]
        cls = re.findall(r'\.([\w-]+)', sel)
        props = []
        for p in d.split(';'):
            if 'var(--accent-default)' not in p: continue
            name = p.split(':')[0].strip()
            if name == 'box-shadow': continue
            if name == 'border': props += ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color']
            elif name in ('background',): props.append('background-color')
            else: props.append(name)
        out.append({'style_name': cls[-1], 'parent_style_names': cls[:-1], 'breakpoint_id': bp, 'pseudo': pseudo, 'props': props})
    return out

if __name__ == '__main__':
    html = open(sys.argv[1]).read(); idx = int(sys.argv[2])
    b = blocks(html)
    if idx < 0:
        for k, x in enumerate(b): print(k, x[:90].replace('\n', ' '))
        sys.exit()
    h = clean(b[idx])
    cl = set()
    for m in re.findall(r'class="([^"]+)"', h): cl |= set(m.split())
    new = cl - done
    loc, _ = cssx.extract(cl)
    # garder les règles dont au moins une classe est nouvelle
    loc = [r for r in loc if cssx.classes_of(r[1]) & new]
    loc = [(m, sel, norm(d)) for m, sel, d in loc]
    css = cssx.fmt(loc)
    fixes = accent_fixes(loc)
    if '--dry' not in sys.argv:
        json.dump(sorted(done | cl), open(done_f, 'w'))
    json.dump({'html': h, 'css': css, 'fixes': fixes}, open(f'{D}/payload.json', 'w'), ensure_ascii=False)
    print(len(h), len(css), sorted(new))
