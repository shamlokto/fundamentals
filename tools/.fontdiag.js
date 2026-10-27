const { chromium, launchOptions, deckURL } = require('./pw');
(async () => {
  const b = await chromium.launch(launchOptions()); console.log('browser', b.version(), JSON.stringify(launchOptions()));
  const p = await b.newPage({ viewport: { width: 900, height: 1000 } });
  p.on('response', r => { if (/fonts\./.test(r.url())) console.log('font resp', r.status(), r.url().slice(0, 90)); });
  await p.goto(deckURL('bioinformatics')); await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => go(1)); await p.waitForTimeout(500); await p.evaluate(() => document.fonts.ready);
  console.log(await p.evaluate(() => JSON.stringify({ ua: navigator.userAgent,
    faces: [...document.fonts].map(f => f.family + ' ' + f.style + ' ' + f.weight + ' ' + f.status).filter(s => !/unloaded/.test(s)),
    boxes: [...document.querySelectorAll('#stage text')].filter(t => /QC and|trimming/.test(t.textContent)).map(t => { const r = t.getBoundingClientRect(); return [t.textContent, t.getAttribute('y'), r.top.toFixed(1), r.height.toFixed(1), getComputedStyle(t).fontFamily]; }) })));
  await b.close();
})();
