#!/usr/bin/env python3
"""Add a meta description and Open Graph tags to hand-built decks that lack them.
Text comes from tools/hub.json (title and blurb). Generated decks get these from tools/build.py.
Usage: python3 tools/meta.py            (dry run: lists what would change)
       python3 tools/meta.py --write    (edits decks/<slug>/index.html in place)"""
import json, pathlib, html, sys, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = 'https://shamlokto.github.io/fundamentals/'
write = '--write' in sys.argv
decks = {d['slug']: d for g in json.loads((ROOT / 'tools' / 'hub.json').read_text()) for d in g['decks']}
for slug, d in sorted(decks.items()):
    if (ROOT / 'src' / f'{slug}.js').exists(): continue
    p = ROOT / 'decks' / slug / 'index.html'; s = p.read_text()
    add = []
    desc = html.escape(d['blurb'])
    if '<meta name="description"' not in s: add.append(f'<meta name="description" content="{desc}">')
    if 'og:title' not in s:
        add += [f'<meta property="og:type" content="website">', '<meta property="og:site_name" content="Fundamentals">',
                f'<meta property="og:title" content="{html.escape(d["title"])}">', f'<meta property="og:description" content="{desc}">',
                f'<meta property="og:url" content="{SITE}decks/{slug}/">', '<meta name="twitter:card" content="summary">']
    if not add: continue
    print(f'{slug}: +{len(add)} tags')
    if write:
        m = re.search(r'<meta name="viewport"[^>]*>\n?', s)
        at = m.end() if m else s.index('</title>') + len('</title>\n')
        p.write_text(s[:at] + '\n'.join(add) + '\n' + s[at:])
