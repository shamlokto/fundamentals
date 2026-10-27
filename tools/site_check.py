#!/usr/bin/env python3
"""Static health check of the site: links, local assets, page weight, and basic accessibility/SEO markup.
Usage: python3 tools/site_check.py      (prints a report; exit 1 if a broken local link or missing asset is found)"""
import re, pathlib, sys, html
ROOT = pathlib.Path(__file__).resolve().parent.parent
pages = [ROOT / 'index.html'] + sorted((ROOT / 'decks').glob('*/index.html'))
bad = 0
def rel(p): return str(p.relative_to(ROOT))
print(f'{len(pages)} pages')
for p in pages:
    s = p.read_text(); notes = []
    kb = p.stat().st_size / 1024
    if not re.search(r'<html[^>]*\blang="', s): notes.append('no <html lang>')
    t = re.search(r'<title>(.*?)</title>', s, re.S)
    if not t or not t.group(1).strip(): notes.append('no <title>')
    if not re.search(r'<meta name="description"', s): notes.append('no meta description')
    if not re.search(r'<meta property="og:title"', s): notes.append('no Open Graph tags')
    if not re.search(r'<meta name="viewport"', s): notes.append('no viewport meta')
    for m in re.finditer(r'<img\b[^>]*>', s):
        if 'alt=' not in m.group(0): notes.append('img without alt')
    # local links and assets (static attributes only; template strings with ${} are skipped)
    for m in re.finditer(r'(?:href|src)="([^"#]+)"', s):
        u = html.unescape(m.group(1))
        if re.match(r'^(https?:|mailto:|data:|javascript:)', u) or '${' in u: continue
        target = (p.parent / u)
        if u.endswith('/'): target = target / 'index.html'
        if not target.exists():
            notes.append(f'BROKEN local link/asset: {u}'); bad += 1
    print(f'{rel(p):45s} {kb:6.0f} KB  ' + ('; '.join(sorted(set(notes))) or 'ok'))
# every deck must be linked from the hub, and every hub link must resolve
hub = (ROOT / 'index.html').read_text()
linked = set(re.findall(r'href="decks/([a-z0-9-]+)/"', hub))
present = {d.parent.name for d in (ROOT / 'decks').glob('*/index.html')}
for d in sorted(present - linked): print('deck not linked from hub:', d); bad += 1
for d in sorted(linked - present): print('hub links to missing deck:', d); bad += 1
sys.exit(1 if bad else 0)
