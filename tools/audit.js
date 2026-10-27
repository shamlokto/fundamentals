// Layout audit for every plate (and every chip choice) at desktop (900 px) and phone (390 px) width.
// Flags overlapping text, arrows running through text, crossing arrows and text clipped at the plate edge,
// and records page errors and console errors.
// Usage: node tools/audit.js [slug ...]       (all decks if none given)
//   AUDIT_OUT=dir   where report.json and shots/ go (default: .audit/ in the repo, git-ignored)
//   NOSHOT=1        skip screenshots (much faster)
//   AUDIT_NOFONTS=1 block the web fonts and measure with fallback fonts (offline use; results differ from
//                   what readers see). Without it, a deck whose plate font fails to load is reported, and
//                   under CI the run fails.
// Known false positives are listed in tools/audit_ignore.json and reported separately.
// Exit code 1 if any finding is not in the ignore list.
const fs = require('fs'), path = require('path');
const { chromium, launchOptions, ROOT, deckURL } = require('./pw');
const OUT = path.resolve(process.env.AUDIT_OUT || path.join(ROOT, '.audit'));
const SHOTS = path.join(OUT, 'shots');
const decks = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync(path.join(ROOT, 'decks')).filter(d => fs.existsSync(path.join(ROOT, 'decks', d, 'index.html')));
const SHOOT = !process.env.NOSHOT;
const NOFONTS = !!process.env.AUDIT_NOFONTS, noFonts = new Set();
const IGNORE = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'audit_ignore.json'), 'utf8')); } catch (e) { return []; } })();
fs.mkdirSync(SHOTS, { recursive: true });

const probe = () => {
  const svg = document.getElementById('stage');
  document.getAnimations().forEach(a => { try { a.finish(); } catch (e) {} });
  const eff = el => { let o = 1; for (let e = el; e && e !== svg.parentElement; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return 0; o *= parseFloat(cs.opacity); } return o; };
  const sr = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal, k = vb.width / sr.width;
  const toVB = r => ({ x: (r.left - sr.left) * k + vb.x, y: (r.top - sr.top) * k + vb.y, w: r.width * k, h: r.height * k });
  // Text height comes from the font's line metrics, which Chromium reports differently between machines
  // (27 px on GitHub's runner vs 20 px locally for the same 12 px label), so cap it at 1.25 em around the centre.
  const inv = svg.getScreenCTM().inverse();
  const capH = (t, b) => { const m = inv.multiply(t.getScreenCTM()), em = parseFloat(getComputedStyle(t).fontSize) * Math.hypot(m.a, m.b) * 1.25;
    return b.h > em && Math.abs(m.b) < 1e-6 ? { ...b, y: b.y + (b.h - em) / 2, h: em } : b; };  // unrotated text only
  const texts = [...svg.querySelectorAll('text')].filter(t => eff(t) > 0.3 && t.textContent.trim()).map(t => ({ s: t.textContent.trim().slice(0, 50), b: capH(t, toVB(t.getBoundingClientRect())), el: t }));
  const arrows = [...svg.querySelectorAll('line,path,polyline')].filter(p => {
    const cs = getComputedStyle(p); return (cs.markerEnd && cs.markerEnd !== 'none' || cs.markerStart && cs.markerStart !== 'none') && eff(p) > 0.3; }).map(p => {
      const L = p.getTotalLength(), m = p.getScreenCTM(), pts = [];
      const N = Math.max(8, Math.ceil(L / 3));
      for (let i = 0; i <= N; i++) { const q = p.getPointAtLength(L * i / N); const sx = m.a * q.x + m.c * q.y + m.e, sy = m.b * q.x + m.d * q.y + m.f; pts.push([(sx - sr.left) * k + vb.x, (sy - sr.top) * k + vb.y]); }
      return { pts, L, el: p };
    });
  const issues = [];
  const inter = (a, b) => { const x = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)), y = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)); return x * y; };
  const shrink = (b, d) => ({ x: b.x + d, y: b.y + d * 1.4, w: b.w - 2 * d, h: b.h - 2.8 * d });
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
    const a = texts[i], b = texts[j]; const ov = inter(shrink(a.b, 1), shrink(b.b, 1));
    if (ov > 4 && ov > 0.08 * Math.min(a.b.w * a.b.h, b.b.w * b.b.h)) issues.push(['text-text', a.s, b.s, Math.round(ov)]);
  }
  arrows.forEach((ar, ai) => {
    texts.forEach(t => { const bb = shrink(t.b, 1.5); const hit = ar.pts.filter(([x, y]) => x > bb.x && x < bb.x + bb.w && y > bb.y && y < bb.y + bb.h).length; if (hit >= 2) issues.push(['arrow-text', t.s, Math.round(ar.L), hit]); });
    for (let bj = ai + 1; bj < arrows.length; bj++) {
      const br = arrows[bj]; let c = 0;
      for (let i = 1; i < ar.pts.length; i++) for (let j = 1; j < br.pts.length; j++) { if (segX(ar.pts[i - 1], ar.pts[i], br.pts[j - 1], br.pts[j])) c++; }
      if (c) issues.push(['arrow-arrow', Math.round(ar.L), Math.round(br.L), c]);
    }
  });
  function segX(p1, p2, p3, p4) { const d = (a, b, c) => (c[0] - a[0]) * (b[1] - a[1]) - (b[0] - a[0]) * (c[1] - a[1]); const d1 = d(p3, p4, p1), d2 = d(p3, p4, p2), d3 = d(p1, p2, p3), d4 = d(p1, p2, p4); return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0)) && d1 && d2 && d3 && d4; }
  texts.forEach(t => { const b = t.b; if (b.x < vb.x - 1 || b.y < vb.y - 1 || b.x + b.w > vb.x + vb.width + 1 || b.y + b.h > vb.y + vb.height + 1) issues.push(['clipped', t.s, `${Math.round(b.x)},${Math.round(b.y)},${Math.round(b.w)}x${Math.round(b.h)}`, `vb ${vb.width}x${vb.height}`]); });
  return issues;
};

const ignored = key => IGNORE.some(rx => new RegExp(rx).test(key));

(async () => {
  const browser = await chromium.launch(launchOptions());
  const report = {};
  for (const deck of decks) {
    for (const [mode, width] of [['wide', 900], ['narrow', 390]]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1.5 });
      const errs = [];
      page.on('pageerror', e => errs.push('pageerror: ' + String(e)));
      page.on('console', m => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)|ERR_FAILED/.test(m.text())) errs.push('console: ' + m.text()); });
      if (NOFONTS) await page.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
      await page.goto(deckURL(deck));
      if (!NOFONTS && !await page.evaluate(async () => { await document.fonts.ready;
        return [...document.fonts].some(f => f.family.replace(/"/g, '') === 'IM Fell English' && f.status === 'loaded'); })) noFonts.add(deck);
      const n = await page.evaluate(() => S.length);
      for (let i = 0; i < n; i++) {
        const chipList = await page.evaluate(i => { go(i); const c = document.getElementById('chips'); return c && !c.hidden ? c.querySelectorAll('button').length : 0; }, i);
        const variants = chipList ? [...Array(chipList).keys()] : [null];
        for (const v of variants) {
          if (v !== null) await page.evaluate(([v]) => { document.querySelectorAll('#chips button')[v].click(); }, [v]);
          await page.waitForTimeout(30);
          const issues = await page.evaluate(probe);
          const key = `${deck}/${mode}/${String(i + 1).padStart(2, '0')}${v !== null ? 'c' + v : ''}`;
          if (issues.length) report[key] = issues;
          if (SHOOT) await page.locator('.stage').screenshot({ path: path.join(SHOTS, key.replace(/\//g, '__') + '.png') });
        }
      }
      if (errs.length) report[`${deck}/${mode}/ERRORS`] = errs;
      await page.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
  const counts = {}, known = {};
  for (const k in report) { const d = k.split('/')[0], c = report[k].length, t = ignored(k) ? known : counts; t[d] = (t[d] || 0) + c; }
  console.log('findings:', counts);
  if (Object.keys(known).length) console.log('known false positives (tools/audit_ignore.json):', known);
  console.log('report:', path.join(OUT, 'report.json'));
  if (noFonts.size) console.log(`WARNING: web fonts did not load for ${[...noFonts].join(', ')}; those results use fallback fonts.`);
  process.exitCode = Object.keys(counts).length || (noFonts.size && process.env.CI) ? 1 : 0;
})();
