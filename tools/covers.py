#!/usr/bin/env python3
"""Opening-plate pictures for the hand-built decks (generated decks get theirs from build.py).

If decks/<slug>/cover.webp (or cover.jpg) exists, the picture is shown, framed on the plate paper, as an extra plate
before plate 1 (titled with the deck's title); every existing plate is kept. Without a cover nothing changes.

Each hand-built deck carries a small block, just before its runtime, that holds the cover's file name and size.
This script writes that block from the files present, so a page never requests a cover that is not there.

Usage: python3 tools/covers.py            update every hand-built deck
       python3 tools/covers.py --check    exit 1 if any deck's block is missing or out of date (used by CI)
"""
import json, pathlib, re, sys
from PIL import Image
ROOT = pathlib.Path(__file__).resolve().parent.parent
ANCHOR = 'const $=id=>document.getElementById(id);'
BEGIN, END = '/* cover: written by tools/covers.py */', '/* /cover */'

def block(cover):
    return f'''{BEGIN}
const COVER={json.dumps(cover)};
if(COVER)S.unshift({{p:S[0].p, title:document.title||'Plate', text:(document.querySelector('meta[name="description"]')||{{}}).content||'',
  draw:n=>{{const W=n?360:640, m=n?12:20, w=W-2*m, h=Math.round(w*COVER.h/COVER.w), H=h+2*m;
    return {{vb:`0 0 ${{W}} ${{H}}`,s:`<g class="a-fade"><image href="${{COVER.src}}" x="${{m}}" y="${{m}}" width="${{w}}" height="${{h}}" preserveAspectRatio="xMidYMid meet"/>`
      +`<rect x="${{m}}" y="${{m}}" width="${{w}}" height="${{h}}" rx="4" fill="none" stroke="#3A2E22" stroke-width="1.4"/>`
      +`<rect x="${{m-5}}" y="${{m-5}}" width="${{w+10}}" height="${{h+10}}" rx="6" fill="none" stroke="#8C7A52" stroke-width=".7"/></g>`}};}}}});
if(COVER){{document.head.insertAdjacentHTML('beforeend','<style>.narr:has(#narr:empty){{display:none}}</style>');  // no empty caption on the cover
  // History decks redraw their portrait plate when the photo loads, but only if it is plate 1; it is now plate 2
  if(typeof PHOTO!=='undefined'&&PHOTO.src){{const im=new Image();im.onload=()=>{{if(typeof cur!=='undefined'&&cur===1)render();}};im.src=PHOTO.src;}}}}
{END}
'''

def cover_of(d):
    for name in ('cover.webp', 'cover.jpg'):
        f = d / name
        if f.exists():
            w, h = Image.open(f).size
            return {'src': name, 'w': w, 'h': h}
    return None

def hand_built():
    return [d for d in sorted((ROOT / 'decks').iterdir())
            if (d / 'index.html').exists() and not (ROOT / 'src' / f'{d.name}.js').exists()]

check = '--check' in sys.argv; stale = []
for d in hand_built():
    p = d / 'index.html'; s = p.read_text()
    s0 = re.sub(re.escape(BEGIN) + r'.*?' + re.escape(END) + r'\n', '', s, flags=re.S)
    assert s0.count(ANCHOR) == 1, f'{d.name}: runtime anchor not found once'
    new = s0.replace(ANCHOR, block(cover_of(d)) + ANCHOR)
    if new != s:
        stale.append(d.name)
        if not check: p.write_text(new)
if check:
    if stale: sys.exit('cover blocks out of date (run python3 tools/covers.py): ' + ', '.join(stale))
    print('cover blocks up to date')
else:
    print(f'updated {len(stale)} deck(s)' + (': ' + ', '.join(stale) if stale else ''))
