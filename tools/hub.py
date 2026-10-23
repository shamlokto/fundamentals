#!/usr/bin/env python3
"""Rebuild index.html and the README table from tools/hub.json.

hub.json is a list of groups: {"name", "desc", "decks": [{"slug","psub","title","sub","blurb"}]}.
Plate counts, interactive counts and part names are read from each built deck in a headless browser.
"""
import json, subprocess, html, pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
groups = json.loads((ROOT / 'tools' / 'hub.json').read_text())
slugs = [d['slug'] for g in groups for d in g['decks']]

probe = r"""
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});const out={};
for(const d of process.argv.slice(2)){const p=await b.newPage();await p.route(/fonts/,r=>r.abort());
 await p.goto('file://ROOT/decks/'+d+'/index.html');
 out[d]=await p.evaluate(()=>({n:S.length,i:S.filter(s=>s.chips||s.explore).length,parts:[...document.querySelectorAll('nav.parts button')].map(b=>b.textContent.replace(/^[IVXL]+ · /,''))}));
 await p.close();}
console.log(JSON.stringify(out));await b.close();})();
""".replace('ROOT', str(ROOT))
tmp = ROOT / 'tools' / '.probe.js'; tmp.write_text(probe)
info = json.loads(subprocess.run(['node', str(tmp)] + slugs, capture_output=True, text=True, check=True).stdout)
tmp.unlink()

def roman(n):
    r = ''
    for s, v in [('L', 50), ('XL', 40), ('X', 10), ('IX', 9), ('V', 5), ('IV', 4), ('I', 1)]:
        while n >= v: r += s; n -= v
    return r

e = html.escape
num = 0; total_plates = 0; total_int = 0; int_decks = 0; secs = []; rows = []
for g in groups:
    cards = []
    for d in g['decks']:
        num += 1; I = info[d['slug']]; total_plates += I['n']; total_int += I['i']; int_decks += bool(I['i'])
        meta = f"{I['n']} plates · {len(I['parts'])} parts" + (f" · {I['i']} interactive" if I['i'] else '')
        parts = ''.join(f'<li>{e(p)}</li>' for p in I['parts'])
        cards.append(f'<a class="card" href="decks/{d["slug"]}/"><div class="plate" aria-hidden="true"><span class="pno">{roman(num)}</span><span class="psub">{e(d["psub"])}</span></div><div class="cbody"><h3>{e(d["title"])}</h3><p class="sub">{e(d["sub"])}</p><p class="blurb">{e(d["blurb"])}</p><p class="meta">{meta}</p><ol class="parts">{parts}</ol></div></a>')
        rows.append(f"| {roman(num)} | {d['title']} | {g['name']} | {I['n']} | {I['i']} | [`decks/{d['slug']}/`](decks/{d['slug']}/) |")
    secs.append(f'<section class="group"><div class="ghead"><h2>{e(g["name"])}</h2><p>{e(g["desc"])}</p></div><div class="grid">{"".join(cards)}</div></section>')

idx = (ROOT / 'index.html').read_text()
start = idx.index('<section class="group">'); end = idx.index('<footer>')
idx = idx[:start] + ''.join(secs) + '\n' + idx[end:]
idx = re.sub(r'<div class="stats">.*?</div></div>', f'<div class="stats"><div class="stat"><b>{num}</b><span>primers</span></div><div class="stat"><b>{len(groups)}</b><span>sections</span></div><div class="stat"><b>{total_plates}</b><span>plates</span></div><div class="stat"><b>{total_int}</b><span>interactive plates</span></div><div class="stat"><b>{int_decks}</b><span>primers with interactive plates</span></div></div>', idx, flags=re.S)
(ROOT / 'index.html').write_text(idx)

rd = (ROOT / 'README.md').read_text()
a = rd.index('| # | Primer'); b = rd.index('\n\n', a)
rd = rd[:a] + '| # | Primer | Section | Plates | Interactive | Folder |\n|---|---|---|---|---|---|\n' + '\n'.join(rows) + rd[b:]
summary = f'{num} primers in {len(groups)} sections: {total_plates} plates, {total_int} of them interactive, across {int_decks} primers.'
rd = re.sub(r'(?m)^\d+ primers in \d+ sections:.*\n\n', '', rd)
rd = rd.replace('| # | Primer |', summary + '\n\n| # | Primer |', 1)
(ROOT / 'README.md').write_text(rd)
print(num, 'primers,', len(groups), 'sections,', total_plates, 'plates,', total_int, 'interactive plates in', int_decks, 'primers')
