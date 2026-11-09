#!/usr/bin/env node
// Build a password-protected copy of the site for publishing.
//
//   SITE_PASSWORD=... SITE_CODES='{"students":"ABC1234"}' node tools/protect.mjs [outdir]   (default outdir: _site)
//
// Every published HTML page (index.html and decks/*/index.html) is encrypted with AES-256-GCM under its own
// random page key, and replaced by a small unlock page holding the ciphertext plus that page key wrapped once
// for every password allowed to open it. Passwords are stretched with PBKDF2-SHA256; the browser keeps the
// derived keys (never the passwords) in localStorage, so each one is entered only once.
//
// SITE_PASSWORD, the owner password, opens everything. tools/access.json lists student cohorts: each one's access
// code and the sections and primers it opens (a code may instead come from SITE_CODES, JSON by cohort name). Code holders see only
// their primers on the hub and a "not examinable" notice on every page. Codes are not case-sensitive.
// Images and narration audio are copied as they are. src/, tools/ and README.md are not published.
import { webcrypto as crypto } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, '_site'));
const PASSWORD = process.env.SITE_PASSWORD;
const ITER = 600000;
if (!PASSWORD) { console.error('Set SITE_PASSWORD to the site password.'); process.exit(1); }

const b64 = u8 => Buffer.from(u8).toString('base64');
const enc = s => new TextEncoder().encode(s);
// A fixed, site-specific salt keeps derived keys the same across deploys, so readers stay unlocked after each
// push. Changing a password signs out only its holders; changing SITE_SALT signs everyone out.
const salt = new Uint8Array(await crypto.subtle.digest('SHA-256',
  enc('fundamentals-site-v1:' + (process.env.SITE_SALT || '')))).slice(0, 16);
async function derive(pw) {
  const base = await crypto.subtle.importKey('raw', enc(pw), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, true, ['encrypt']);
  // The id (hash of the derived key) tells the unlock page which wrapped page key belongs to a stored key.
  const id = b64(new Uint8Array(await crypto.subtle.digest('SHA-256', await crypto.subtle.exportKey('raw', key))));
  return { key, id };
}
async function seal(key, bytes) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  return { iv: b64(iv), ct: b64(new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes))) };
}

// Who may open what.
const hub = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'hub.json'), 'utf8'));
const access = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'access.json'), 'utf8'));
const codes = process.env.SITE_CODES ? JSON.parse(process.env.SITE_CODES) : {};
const holders = [{ name: 'owner', ...(await derive(PASSWORD)), decks: null }];
for (const [name, c] of Object.entries(access.cohorts)) {
  const code = c.code || codes[name];
  if (!code) { console.warn(`no code for cohort "${name}" (set "code" in tools/access.json or SITE_CODES); skipped`); continue; }
  const decks = new Set(c.decks || []);
  for (const s of c.sections || []) {
    const g = hub.find(g => g.name === s);
    if (!g) { console.error(`tools/access.json: unknown section "${s}"`); process.exit(1); }
    g.decks.forEach(d => decks.add(d.slug));
  }
  holders.push({ name, ...(await derive(String(code).trim().toUpperCase())), decks: [...decks].sort() });
}
const opens = (h, p) => !h.decks || p === 'index.html' || h.decks.includes(p.split('/')[1]);
// The hub hides primers a reader cannot open and shows the notice to code holders.
const grants = Object.fromEntries(holders.map(h => [h.id, h.decks]));

const gate = (title, payload) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${title}</title>
<style>
:root{--paper:#f4ecd8;--ink:#2b2118;--muted:#6b5b48;--line:#b9a888;--accent:#8a3b22}
@media (prefers-color-scheme:dark){:root{--paper:#1d1914;--ink:#eadfc8;--muted:#b3a58c;--line:#5a4d3c;--accent:#e08a66}}
html,body{height:100%;margin:0}
body{background:var(--paper);color:var(--ink);font:16px/1.5 Georgia,serif;display:grid;place-items:center;padding:0 16px}
form{width:100%;max-width:340px;text-align:center}
h1{font-weight:normal;font-size:1.6rem;margin:0 0 .3rem}
p{color:var(--muted);margin:0 0 1.2rem;font-style:italic}
a{color:var(--accent)}
input,button{font:inherit;width:100%;box-sizing:border-box;padding:.6rem .8rem;border:1px solid var(--line);border-radius:4px;background:transparent;color:var(--ink)}
button{margin-top:.6rem;background:var(--accent);border-color:var(--accent);color:var(--paper);cursor:pointer}
button:disabled{opacity:.6;cursor:wait}
#msg{min-height:1.5em;margin-top:.8rem;color:var(--accent);font-style:normal}
</style></head>
<body><form id="gate" hidden>
<h1>Fundamentals</h1><p id="lead">Enter your access code to continue.</p>
<input id="pw" type="password" autocomplete="current-password" aria-label="Access code" autofocus>
<button id="go">Unlock</button><div id="msg" role="status"></div>
</form>
<noscript>This page needs JavaScript to unlock.</noscript>
<script>
(function(){
var P=${JSON.stringify({ ...payload, salt: b64(salt), iter: ITER })};
var SLOT='fundamentals-keys';
function u8(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0)})}
function b64(a){return btoa(String.fromCharCode.apply(null,new Uint8Array(a)))}
function load(){var k=[];try{k=JSON.parse(localStorage.getItem(SLOT)||'[]');var o=localStorage.getItem('fundamentals-key');if(o&&k.indexOf(o)<0)k.push(o)}catch(e){}return k}
function save(k){try{localStorage.setItem(SLOT,JSON.stringify(k));localStorage.removeItem('fundamentals-key')}catch(e){}}
async function idOf(raw){return b64(await crypto.subtle.digest('SHA-256',raw))}
async function derive(pw){
  var base=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
  var k=await crypto.subtle.deriveKey({name:'PBKDF2',salt:u8(P.salt),iterations:P.iter,hash:'SHA-256'},base,{name:'AES-GCM',length:256},true,['decrypt']);
  return crypto.subtle.exportKey('raw',k);
}
async function aes(raw,box){var k=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']);return crypto.subtle.decrypt({name:'AES-GCM',iv:u8(box.iv)},k,u8(box.ct))}
async function ids(keys){var r=[];for(var i=0;i<keys.length;i++)r.push(await idOf(u8(keys[i])));return r}
async function open(keys){
  var all=await ids(keys);
  for(var i=0;i<keys.length;i++){var lock=P.locks[all[i]];if(!lock)continue;
    var html=new TextDecoder().decode(await aes(await aes(u8(keys[i]),lock),P.page));
    var g=P.grants;
    if(g){var full=false,decks={};all.forEach(function(id){if(id in g){if(g[id]===null)full=true;else g[id].forEach(function(d){decks[d]=1})}});
      var notice=!full&&Object.keys(decks).length>0;
      var at=html.indexOf('<script',Math.max(0,html.indexOf('<footer')));if(at<0)at=html.indexOf('</body>');
      html=html.slice(0,at)+'<script>('+P.filter+')('+JSON.stringify({full:full,decks:Object.keys(decks),notice:notice?P.notice:''})+')<\\/script>'+html.slice(at);}
    else if(P.notice&&!all.some(function(id){return P.owner===id})){
      html=html.replace(/<body([^>]*)>/,'<body$1><div role="note" style="max-width:960px;margin:12px auto 0;padding:8px 14px;border:1px solid #B9A889;border-radius:8px;background:#F3EDE0;color:#2C2318;font:14px/1.45 system-ui,sans-serif">'+P.notice+'</div>');}
    // writing while the gate page is still loading is discarded by the browser, so wait for load
    if(document.readyState!=='complete')await new Promise(function(r){addEventListener('load',r,{once:true})});
    document.open();document.write(html);document.close();return true;}
  return false;
}
var f=document.getElementById('gate'),pw=document.getElementById('pw'),go=document.getElementById('go'),msg=document.getElementById('msg');
f.addEventListener('submit',async function(e){
  e.preventDefault();go.disabled=true;msg.textContent='Unlocking…';
  try{
    var tries=[pw.value];if(pw.value.trim().toUpperCase()!==pw.value)tries.push(pw.value.trim().toUpperCase());
    for(var t=0;t<tries.length;t++){var raw=b64(await derive(tries[t]));
      var id=await idOf(u8(raw));
      if(P.ids?P.ids.indexOf(id)>=0:P.locks[id]){var keys=load();if(keys.indexOf(raw)<0)keys.push(raw);save(keys);if(P.ids)location.replace('./');else await open(keys);return}}
    msg.textContent=P.grants||P.ids?'That code is not recognised.':'That code does not open this primer.';
  }catch(err){msg.textContent='Could not unlock: '+err.message}
  go.disabled=false;pw.select();
});
if(P.ids){if(location.search.indexOf('signout')>=0){save([]);location.replace('./');return}
  document.getElementById('lead').textContent='Enter another access code. It is added to the ones this browser already has.';f.hidden=false;pw.focus();return}
var saved=load();
open(saved).catch(function(){return false}).then(function(ok){
  if(ok)return;
  if(saved.length&&!P.grants)document.getElementById('lead').innerHTML='This primer is not open with your code yet. <a href="../../">Back to your primers</a>, or enter another code.';
  f.hidden=false;pw.focus();
});
})();
</script></body></html>
`;

// Runs inside the unlocked hub: hide what this reader cannot open, recount, and add the notice.
const filter = function (a) {
  var add = '<p style="margin:8px 0 0;font-size:13px"><a href="unlock.html">Enter another code</a> · <a href="unlock.html?signout">Sign out</a></p>';
  if (!a.full) {
    document.querySelectorAll('a.card').forEach(function (c) {
      var m = c.getAttribute('href').match(/decks\/([^/]+)\//); if (m && a.decks.indexOf(m[1]) < 0) c.remove();
    });
    document.querySelectorAll('section.group').forEach(function (s) {
      if (!s.querySelector('a.card')) { var t = document.querySelector('.toc a[href="#' + s.id + '"]'); if (t) t.closest('li').remove(); s.remove(); }
    });
    var cards = document.querySelectorAll('a.card'), plates = 0, inter = 0;
    cards.forEach(function (c) { var t = c.querySelector('.meta').textContent; plates += +(t.match(/(\d+) plates/) || [0, 0])[1]; inter += +(t.match(/(\d+) interactive/) || [0, 0])[1]; });
    var b = document.querySelectorAll('.stats .stat b');
    if (b.length === 4) { b[0].textContent = cards.length; b[1].textContent = document.querySelectorAll('section.group').length; b[2].textContent = plates; b[3].textContent = inter; }
    document.querySelectorAll('.toc li span').forEach(function (s) { var l = s.closest('li').querySelector('a'), g = l && document.getElementById(l.getAttribute('href').slice(1)); if (g) s.textContent = g.querySelectorAll('a.card').length; });
  }
  var h = document.querySelector('header');
  if (h) h.insertAdjacentHTML('beforeend', (a.notice ? '<p role="note" style="margin:14px 0 0;padding:10px 14px;border:1px solid var(--line);border-radius:8px;background:var(--surface);font-size:15px"><b>' + a.notice + '</b></p>' : '') + add);
};

const pages = ['index.html', ...fs.readdirSync(path.join(ROOT, 'decks')).sort()
  .map(d => `decks/${d}/index.html`).filter(p => fs.existsSync(path.join(ROOT, p)))];
fs.rmSync(OUT, { recursive: true, force: true });
for (const p of pages) {
  const html = fs.readFileSync(path.join(ROOT, p), 'utf8');
  const pageKey = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']);
  const raw = new Uint8Array(await crypto.subtle.exportKey('raw', pageKey));
  const locks = {};
  for (const h of holders) if (opens(h, p)) locks[h.id] = await seal(h.key, raw);
  const payload = { page: await seal(pageKey, enc(html)), locks, notice: access.notice, owner: holders[0].id };
  if (p === 'index.html') Object.assign(payload, { grants, filter: filter.toString() });
  const dst = path.join(OUT, p);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, gate('Fundamentals', payload));
}
// unlock.html adds another code to this browser (or signs out) and returns to the hub.
const ids = holders.map(h => h.id);
fs.writeFileSync(path.join(OUT, 'unlock.html'), gate('Fundamentals', { ids }));
let assets = 0;
for (const d of fs.readdirSync(path.join(ROOT, 'decks'))) {
  for (const f of fs.readdirSync(path.join(ROOT, 'decks', d))) {
    if (f === 'index.html') continue;
    fs.cpSync(path.join(ROOT, 'decks', d, f), path.join(OUT, 'decks', d, f), { recursive: true }); assets++;
  }
}
if (fs.existsSync(path.join(ROOT, 'img'))) fs.cpSync(path.join(ROOT, 'img'), path.join(OUT, 'img'), { recursive: true });
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log(`protected ${pages.length} pages for ${holders.map(h => h.name + (h.decks ? ` (${h.decks.length} primers)` : '')).join(', ')}; copied ${assets} images and audio folders -> ${path.relative(ROOT, OUT) || OUT}`);
