#!/usr/bin/env python3
"""Contact sheets from the audit screenshots: python3 tools/sheet.py <slug> wide|narrow
Reads AUDIT_OUT/shots (default .audit/shots) and writes AUDIT_OUT/sheets/<slug>__<mode>__NN.png."""
import sys, os, glob, pathlib
from PIL import Image
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = pathlib.Path(os.environ.get('AUDIT_OUT', ROOT / '.audit')).resolve()
deck, mode = sys.argv[1], sys.argv[2]
files = sorted(glob.glob(str(OUT / 'shots' / f'{deck}__{mode}__*.png')))
if not files: sys.exit(f'no screenshots for {deck} {mode}: run node tools/audit.js {deck} first')
(OUT / 'sheets').mkdir(parents=True, exist_ok=True)
W = 900 if mode == 'wide' else 420; cols = 2 if mode == 'wide' else 4; per = 4 if mode == 'wide' else 8
for n in range(0, len(files), per):
    ims = [Image.open(f) for f in files[n:n + per]]
    ims = [im.resize((W, int(im.height * W / im.width))) for im in ims]
    rows = [ims[i:i + cols] for i in range(0, len(ims), cols)]
    H = sum(max(i.height for i in r) for r in rows)
    out = Image.new('RGB', (W * cols + 10 * (cols - 1), H + 10 * len(rows)), 'white'); y = 0
    for r in rows:
        x = 0
        for im in r: out.paste(im, (x, y)); x += W + 10
        y += max(i.height for i in r) + 10
    name = OUT / 'sheets' / f'{deck}__{mode}__{n // per:02d}.png'; out.save(name)
    print(name, [os.path.basename(f).split('__')[-1] for f in files[n:n + per]])
