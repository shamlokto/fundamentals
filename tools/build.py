#!/usr/bin/env python3
"""Build decks/<slug>/index.html from src/<slug>.js.

Each source starts with a metadata block:
/*META
{"title": "...", "eyebrow": "...", "h1": "...", "parts": ["...", ...], "foot": "...", "description": "..."}
META*/
followed by plain JavaScript that defines the scene functions, `const S=[...]` and `const CHIPS={...}`.
The output is a single self-contained page that shares the look and runtime of the hand-built decks.
"""
import json, re, sys, html, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
T = ROOT / 'tools'
SITE = 'https://shamlokto.github.io/fundamentals/'

def build(slug):
    src = (ROOT / 'src' / f'{slug}.js').read_text()
    m = re.match(r'\s*/\*META\s*(\{.*?\})\s*META\*/', src, re.S)
    meta = json.loads(m.group(1)); body = src[m.end():]
    head = (T / 'base_head.html').read_text()
    head = re.sub(r'<title>.*?</title>', f'<title>{html.escape(meta["title"])}</title>', head)
    desc = meta.get('description') or meta['h1']
    tags = (f'<meta name="description" content="{html.escape(desc)}">\n'
            f'<meta property="og:type" content="website">\n'
            f'<meta property="og:site_name" content="Fundamentals">\n'
            f'<meta property="og:title" content="{html.escape(meta["title"])}">\n'
            f'<meta property="og:description" content="{html.escape(desc)}">\n'
            f'<meta property="og:url" content="{SITE}decks/{slug}/">\n'
            f'<meta name="twitter:card" content="summary">\n')
    head = head.replace('<link rel="preconnect"', tags + '<link rel="preconnect"', 1)
    parts = '\n'.join(f'    <button id="part{i+1}" type="button">{roman(i+1)} · {html.escape(p)}</button>' for i, p in enumerate(meta['parts']))
    wrap = f'''<div class="wrap">
  <a class="hubback" href="../../">← All primers</a>
  <header>
    <p class="eyebrow">{html.escape(meta["eyebrow"])}</p>
    <h1>{html.escape(meta["h1"])}</h1>
  </header>
  <nav class="parts" aria-label="Parts">
{parts}
  </nav>
  <section class="stage" aria-live="polite">
    <div class="scene-head"><span class="scene-no" id="sceneNo"></span><h2 id="sceneTitle"></h2></div>
    <div class="chips" id="chips" hidden></div>
    <svg id="stage" role="img" viewBox="0 0 640 400"></svg>
    <div class="narr"><div class="speaker" id="speaker"></div><p id="narr"></p></div>
  </section>
  <div class="controls">
    <button id="prev" type="button">Back</button>
    <div class="dots" id="dots" role="group" aria-label="Scenes"></div>
    <button id="replay" type="button">Replay</button>
    <button id="next" type="button" class="primary">Next</button>
  </div>
  <p class="foot">{html.escape(meta["foot"])}</p>
</div>
<script>
'''
    d = ROOT / 'decks' / slug
    cover = "'cover.jpg'" if (d / 'cover.jpg').exists() else 'null'
    out = head + wrap + f'/* optional picture for the opening plate: decks/{slug}/cover.jpg */\nconst COVER={cover};\n' + (T / 'base_helpers.js').read_text() + '\n' + (T / 'lib.js').read_text() + '\n/* ===================== deck ===================== */\n' + body.strip() + "\nconst NAR='Narrator';\n" + (T / 'base_runtime.html').read_text()
    d.mkdir(parents=True, exist_ok=True)
    (d / 'index.html').write_text(out)
    import subprocess, tempfile
    js = out[out.rindex('<script>') + 8:out.rindex('</script>')]
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as t:
        t.write(js)
    r = subprocess.run(['node', '--check', t.name], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[:600]); raise SystemExit(f'syntax error in {slug}')

def roman(n):
    r = ''
    for s, v in [('X', 10), ('IX', 9), ('V', 5), ('IV', 4), ('I', 1)]:
        while n >= v: r += s; n -= v
    return r

if __name__ == '__main__':
    for slug in (sys.argv[1:] or [p.stem for p in (ROOT / 'src').glob('*.js')]):
        build(slug); print('built', slug)
