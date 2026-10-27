// Screenshot every plate (and every chip choice) of one deck at desktop width, after animations settle.
// Usage: node tools/plates.js <slug> [outdir]     (default outdir: .audit/plates)
const fs = require('fs'), path = require('path');
const { chromium, launchOptions, ROOT, deckURL } = require('./pw');
const slug = process.argv[2]; if (!slug) { console.error('usage: node tools/plates.js <slug> [outdir]'); process.exit(2); }
const out = path.resolve(process.argv[3] || path.join(ROOT, '.audit', 'plates')); fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch(launchOptions());
  const p = await b.newPage({ viewport: { width: 1000, height: 900 } }); await p.goto(deckURL(slug));
  const n = await p.evaluate(() => S.length);
  for (let i = 0; i < n; i++) {
    await p.evaluate(i => go(i), i); await p.waitForTimeout(2600);
    const nm = String(i + 1).padStart(2, '0'); await p.locator('section.stage').screenshot({ path: `${out}/${slug}_${nm}.png` });
    const nc = await p.$$eval('#chips:not([hidden]) button', b => b.length);
    for (let c = 1; c < nc; c++) { await p.locator('#chips button').nth(c).click(); await p.waitForTimeout(1800); await p.locator('section.stage').screenshot({ path: `${out}/${slug}_${nm}c${c}.png` }); }
  }
  console.log(slug, n, 'plates ->', out); await b.close();
})();
