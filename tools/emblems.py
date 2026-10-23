"""Hand-drawn emblems for the hub page, in the engraved style of the plates.

Each emblem is an SVG fragment for a 64 x 64 viewBox. HERO is the header vignette (360 x 260).
"""
INK = '#3A2E22'
S = f'stroke="{INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"'
s = f'stroke="{INK}" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"'


def helix(x0, y0, h, amp, turns, n=40):
    import math
    a, b, rungs = [], [], []
    for i in range(n + 1):
        t = i / n
        y = y0 + h * t
        ph = t * turns * 2 * math.pi
        a.append(f'{x0 + amp * math.sin(ph):.1f} {y:.1f}')
        b.append(f'{x0 - amp * math.sin(ph):.1f} {y:.1f}')
        if i % 3 == 1:
            rungs.append(f'M{x0 + amp * math.sin(ph):.1f} {y:.1f}H{x0 - amp * math.sin(ph):.1f}')
    return a, b, rungs


def _helix_svg(x0, y0, h, amp, turns, w=1.6):
    a, b, r = helix(x0, y0, h, amp, turns)
    return (f'<path d="{"".join(r)}" stroke="#8C7A52" stroke-width="{w * .7:.1f}"/>'
            f'<path d="M{" L".join(a)}" fill="none" stroke="#2F5276" stroke-width="{w * 1.4:.1f}" stroke-linecap="round"/>'
            f'<path d="M{" L".join(b)}" fill="none" stroke="#A4473A" stroke-width="{w * 1.4:.1f}" stroke-linecap="round"/>')


EMBLEMS = {
    'chemistry': f'<path d="M32 28 L17 42 M32 28 L47 42" {S}/><circle cx="32" cy="27" r="11" fill="#E7A99B" {S}/>'
                 f'<circle cx="16" cy="43" r="6.5" fill="#E8EEF3" {S}/><circle cx="48" cy="43" r="6.5" fill="#E8EEF3" {S}/>'
                 f'<path d="M26 22 q3 -4 7 -3" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>'
                 f'<text x="32" y="31" text-anchor="middle" font-family="IM Fell English,Georgia,serif" font-size="11" fill="{INK}">O</text>',
    'dogma': _helix_svg(32, 6, 52, 11, 1.5),
    'cell': f'<path d="M52 32 q3 -5 6 0 t6 0" fill="none" {s}/><rect x="8" y="21" width="44" height="22" rx="11" fill="#A9C4DC" {S}/>'
            f'<rect x="11.5" y="24.5" width="37" height="15" rx="7.5" fill="none" stroke="{INK}" stroke-width=".7" opacity=".6"/>'
            f'<path d="M19 33 q4 -6 8 0 t8 0 t8 0" fill="none" stroke="#2F5276" stroke-width="1.3" stroke-linecap="round"/>'
            '<circle cx="18" cy="28" r="1.4" fill="#3A2E22" opacity=".5"/><circle cx="41" cy="37" r="1.4" fill="#3A2E22" opacity=".5"/>',
    'regulation': f'<path d="M4 44 H60" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>'
                  f'<rect x="32" y="38" width="24" height="12" rx="2" fill="#A9C4DC" {s}/>'
                  f'<path d="M12 44 V30 H24" fill="none" {S}/><path d="M21 26.5 L25 30 L21 33.5" fill="none" {S}/>'
                  f'<ellipse cx="25" cy="44" rx="8" ry="6.5" fill="#C9A9D6" {S}/>'
                  f'<path d="M44 18 v8 M40 22 h8" stroke="#A4473A" stroke-width="1.8" stroke-linecap="round"/>',
    'evolution': f'<path d="M32 60 V40 M32 40 L18 26 M32 40 L46 24 M18 26 L10 14 M18 26 L24 12 M46 24 L40 10 M46 24 L56 14" fill="none" {S}/>'
                 + ''.join(f'<circle cx="{x}" cy="{y}" r="4" fill="{c}" {s}/>' for x, y, c in
                           [(10, 12, '#E7A99B'), (24, 10, '#C6D3A8'), (40, 8, '#A9C4DC'), (56, 12, '#E0C88A')]),
    'metabolism': ''.join(
        f'<path d="{d}" fill="none" {S}/>' for d in
        ['M32 10 A22 22 0 0 1 52.5 40', 'M47 47 A22 22 0 0 1 13 43', 'M11.5 36 A22 22 0 0 1 25 11'])
                  + f'<path d="M49 35 L52.5 40.5 L56.5 35.5" fill="none" {S}/><path d="M18 40 L12.5 43.5 L17 48" fill="none" {S}/>'
                  f'<path d="M21 7 L26 11 L21 15" fill="none" {S}/><circle cx="32" cy="32" r="7" fill="#E0C88A" {S}/>',
    'growth': f'<path d="M10 8 V54 H58" fill="none" {S}/>'
              f'<path d="M10 50 C24 50 26 48 32 32 S40 16 56 14" fill="none" stroke="#4F7A3F" stroke-width="2.4" stroke-linecap="round"/>'
              + ''.join(f'<circle cx="{x}" cy="{y}" r="2.2" fill="#C6D3A8" {s}/>' for x, y in [(16, 49.5), (26, 45), (32, 32), (39, 20), (48, 15.5)]),
    'viruses': f'<path d="M32 6 L44 13 L44 27 L32 34 L20 27 L20 13 Z" fill="#C9A9D6" {S}/><path d="M20 13 L32 20 L44 13 M32 20 V34" fill="none" {s}/>'
               f'<rect x="29" y="34" width="6" height="16" fill="#E8D9B5" {s}/><path d="M29 38 h6 M29 42 h6 M29 46 h6" {s}/>'
               f'<path d="M29 50 L18 58 M29 50 L24 60 M35 50 L40 60 M35 50 L46 58" fill="none" {S}/>',
    'methods': f'<path d="M14 58 H50 M22 58 V52 H44 V58" fill="none" {S}/><path d="M38 52 V40 Q38 30 30 26" fill="none" {S}/>'
               f'<rect x="20" y="8" width="10" height="24" rx="2" fill="#A9C4DC" transform="rotate(-25 25 20)" {S}/>'
               f'<path d="M18 40 H40" {S}/><circle cx="29" cy="40" r="2" fill="{INK}"/>',
    'antimicrobials': f'<circle cx="32" cy="32" r="25" fill="#E8D9B5" {S}/><circle cx="32" cy="32" r="22" fill="none" stroke="{INK}" stroke-width=".7"/>'
                      + ''.join(f'<circle cx="{x}" cy="{y}" r="1.6" fill="#B08A4A"/>' for x, y in
                                [(16, 24), (20, 44), (46, 20), (48, 42), (24, 16), (40, 50), (14, 34), (51, 31), (30, 51), (37, 13)])
                      + f'<circle cx="32" cy="32" r="12" fill="#F4EEDF" stroke="#8C7A52" stroke-width=".8" stroke-dasharray="2 2"/>'
                        f'<circle cx="32" cy="32" r="4.5" fill="#fff" {s}/>',
    'quantitative': f'<path d="M6 54 H58" {S}/>'
                    + ''.join(f'<rect x="{10 + i * 6}" y="{54 - h}" width="5" height="{h}" fill="#A9C4DC" stroke="{INK}" stroke-width=".6"/>'
                              for i, h in enumerate([4, 9, 18, 30, 38, 30, 18, 9]))
                    + f'<path d="M6 53 C20 52 24 14 34 14 S48 52 60 53" fill="none" stroke="#A4473A" stroke-width="2" stroke-linecap="round"/>',
    'history': f'<ellipse cx="32" cy="32" rx="21" ry="26" fill="#E8D9B5" {S}/><ellipse cx="32" cy="32" rx="17.5" ry="22.5" fill="none" stroke="{INK}" stroke-width=".7"/>'
               f'<path d="M18 50 Q19 38 32 37 Q45 38 46 50" fill="#8C7A52" {s}/><circle cx="32" cy="27" r="8" fill="#8C7A52" {s}/>',
}

KEYS = ['chemistry', 'dogma', 'cell', 'regulation', 'evolution', 'metabolism', 'growth', 'viruses', 'methods',
        'antimicrobials', 'quantitative', 'history']


def emblem(key, cls='emb', size=64):
    return (f'<svg class="{cls}" viewBox="0 0 64 64" width="{size}" height="{size}" aria-hidden="true" focusable="false">'
            f'{EMBLEMS[key]}</svg>')


def _hero():
    import random
    r = random.Random(7)
    o = []
    # plate border
    o.append(f'<rect x="6" y="6" width="348" height="248" rx="6" fill="#EFE8D8" stroke="#8C7A52" stroke-width="1.2"/>'
             f'<rect x="12" y="12" width="336" height="236" rx="4" fill="none" stroke="#8C7A52" stroke-width=".6"/>')
    # helix behind
    o.append(f'<g opacity=".9">{_helix_svg(300, 26, 196, 16, 2.6, 1.3)}</g>')
    # petri dish with colonies and a clear zone
    o.append(f'<ellipse cx="112" cy="176" rx="82" ry="40" fill="#D8CFB8" stroke="{INK}" stroke-width="1.4"/>'
             f'<ellipse cx="112" cy="170" rx="78" ry="36" fill="#E9DCB8" stroke="{INK}" stroke-width="1"/>'
             f'<ellipse cx="112" cy="170" rx="70" ry="31" fill="none" stroke="{INK}" stroke-width=".5" opacity=".6"/>')
    for _ in range(46):
        a = r.random() * 6.283
        rr = r.random() ** .5
        x, y = 112 + 66 * rr * __import__('math').cos(a), 170 + 28 * rr * __import__('math').sin(a)
        if (x - 140) ** 2 / 26 ** 2 + (y - 168) ** 2 / 12 ** 2 < 1:
            continue
        rad = 1.6 + r.random() * 3
        o.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{rad:.1f}" ry="{rad * .55:.1f}" fill="#C99A2E" stroke="{INK}" stroke-width=".5"/>')
    o.append(f'<ellipse cx="140" cy="168" rx="7" ry="3.6" fill="#fff" stroke="{INK}" stroke-width=".8"/>')
    # flask
    o.append(f'<path d="M206 70 V112 L180 196 Q178 206 190 206 H254 Q266 206 264 196 L238 112 V70" fill="#F4EEDF" fill-opacity=".7" stroke="{INK}" stroke-width="1.4"/>'
             f'<path d="M188 176 Q222 168 256 176 L262 197 Q263 203 254 203 H190 Q181 203 182 197 Z" fill="#C6D3A8" stroke="{INK}" stroke-width=".8"/>'
             f'<path d="M202 66 H242" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>'
             f'<path d="M212 80 V108" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>')
    for x, y in [(206, 188), (226, 182), (244, 192), (215, 196)]:
        o.append(f'<rect x="{x - 5}" y="{y - 2}" width="10" height="4" rx="2" fill="#4F7A3F" opacity=".7"/>')
    # rod cells, foreground
    for cx, cy, ang, col in [(54, 70, -18, '#A9C4DC'), (92, 52, 12, '#E7A99B'), (128, 84, -4, '#A9C4DC')]:
        o.append(f'<g transform="rotate({ang} {cx} {cy})"><path d="M{cx + 22} {cy} q5 -6 10 0 t10 0 t10 0" fill="none" stroke="{INK}" stroke-width=".9"/>'
                 f'<rect x="{cx - 24}" y="{cy - 10}" width="48" height="20" rx="10" fill="{col}" stroke="{INK}" stroke-width="1.3"/>'
                 f'<path d="M{cx - 14} {cy + 1} q4 -5 8 0 t8 0 t8 0" fill="none" stroke="#2F5276" stroke-width="1"/></g>')
    # caption
    o.append('<text x="180" y="240" text-anchor="middle" font-family="IM Fell English,Georgia,serif" font-style="italic" '
             f'font-size="13" fill="{INK}">Plate I. Cells, cultures and the molecule that makes them.</text>')
    return ('<svg class="hero" viewBox="0 0 360 260" role="img" aria-label="An engraved plate: rod-shaped bacteria, '
            'a Petri dish of colonies, a culture flask and a DNA double helix">' + ''.join(o) + '</svg>')


HERO = _hero()
