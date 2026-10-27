// Shared Playwright setup for the tools: finds the playwright module and a Chromium binary.
// Override with PLAYWRIGHT_MODULE=/path/to/playwright and CHROMIUM_PATH=/path/to/chrome.
const fs = require('fs'), path = require('path');
function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_MODULE, 'playwright', '/opt/node22/lib/node_modules/playwright', '/opt/node-tools/node_modules/playwright'].filter(Boolean);
  for (const t of tries) { try { return require(t); } catch (e) {} }
  throw new Error('playwright not found: npm i -D playwright, or set PLAYWRIGHT_MODULE');
}
function launchOptions() {
  const cands = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].filter(Boolean);
  const exe = cands.find(p => fs.existsSync(p));
  return exe ? { executablePath: exe } : {};
}
const ROOT = path.resolve(__dirname, '..');
const deckURL = slug => 'file://' + path.join(ROOT, 'decks', slug, 'index.html');
module.exports = { chromium: loadPlaywright().chromium, launchOptions, ROOT, deckURL };
