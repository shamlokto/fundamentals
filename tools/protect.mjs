#!/usr/bin/env node
// Build a password-protected copy of the site for publishing.
//
//   SITE_PASSWORD=... node tools/protect.mjs [outdir]      (default outdir: _site)
//
// Every published HTML page (index.html and decks/*/index.html) is encrypted with
// AES-256-GCM under a key derived from the password (PBKDF2-SHA256), and replaced by a
// small unlock page holding only the ciphertext. Entering the password once unlocks
// every page in that browser (the derived key, never the password, is kept in
// localStorage). Images are copied as they are. src/, tools/ and README.md are not
// published.
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
const salt = crypto.getRandomValues(new Uint8Array(16));
const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(PASSWORD), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
  base, { name: 'AES-GCM', length: 256 }, true, ['encrypt']);
// The check value lets the unlock page tell a wrong password from a wrong stored key.
const check = b64(new Uint8Array(await crypto.subtle.digest('SHA-256', await crypto.subtle.exportKey('raw', key))));

async function encrypt(html) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(html));
  return { iv: b64(iv), ct: b64(new Uint8Array(ct)) };
}

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
input,button{font:inherit;width:100%;box-sizing:border-box;padding:.6rem .8rem;border:1px solid var(--line);border-radius:4px;background:transparent;color:var(--ink)}
button{margin-top:.6rem;background:var(--accent);border-color:var(--accent);color:var(--paper);cursor:pointer}
button:disabled{opacity:.6;cursor:wait}
#msg{min-height:1.5em;margin-top:.8rem;color:var(--accent);font-style:normal}
</style></head>
<body><form id="gate" hidden>
<h1>Fundamentals</h1><p>Internal draft. Enter the password to continue.</p>
<input id="pw" type="password" autocomplete="current-password" aria-label="Password" autofocus>
<button id="go">Unlock</button><div id="msg" role="status"></div>
</form>
<noscript>This page needs JavaScript to unlock.</noscript>
<script>
(function(){
var P=${JSON.stringify({ ...payload, salt: b64(salt), iter: ITER, check })};
var SLOT='fundamentals-key';
function u8(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0)})}
function b64(a){return btoa(String.fromCharCode.apply(null,new Uint8Array(a)))}
function store(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}}
function load(k){try{return localStorage.getItem(k)}catch(e){return null}}
async function open(raw){
  if(b64(await crypto.subtle.digest('SHA-256',raw))!==P.check) return false;
  var k=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']);
  var pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:u8(P.iv)},k,u8(P.ct));
  var html=new TextDecoder().decode(pt);
  document.open();document.write(html);document.close();
  return true;
}
var f=document.getElementById('gate'),pw=document.getElementById('pw'),go=document.getElementById('go'),msg=document.getElementById('msg');
f.addEventListener('submit',async function(e){
  e.preventDefault();go.disabled=true;msg.textContent='Unlocking…';
  try{
    var base=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw.value),'PBKDF2',false,['deriveKey']);
    var k=await crypto.subtle.deriveKey({name:'PBKDF2',salt:u8(P.salt),iterations:P.iter,hash:'SHA-256'},base,{name:'AES-GCM',length:256},true,['decrypt']);
    var raw=await crypto.subtle.exportKey('raw',k);
    if(await open(raw)){store(SLOT,b64(raw));return}
    msg.textContent='Wrong password.';
  }catch(err){msg.textContent='Could not unlock: '+err.message}
  go.disabled=false;pw.select();
});
var saved=load(SLOT);
(saved?open(u8(saved)).catch(function(){return false}):Promise.resolve(false)).then(function(ok){
  if(!ok){if(saved)store(SLOT,null);f.hidden=false;pw.focus()}
});
})();
</script></body></html>
`;

const pages = ['index.html', ...fs.readdirSync(path.join(ROOT, 'decks')).sort()
  .map(d => `decks/${d}/index.html`).filter(p => fs.existsSync(path.join(ROOT, p)))];
fs.rmSync(OUT, { recursive: true, force: true });
for (const p of pages) {
  const html = fs.readFileSync(path.join(ROOT, p), 'utf8');
  const dst = path.join(OUT, p);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, gate('Fundamentals', await encrypt(html)));
}
let assets = 0;
for (const d of fs.readdirSync(path.join(ROOT, 'decks'))) {
  for (const f of fs.readdirSync(path.join(ROOT, 'decks', d))) {
    if (f === 'index.html') continue;
    fs.copyFileSync(path.join(ROOT, 'decks', d, f), path.join(OUT, 'decks', d, f)); assets++;
  }
}
if (fs.existsSync(path.join(ROOT, 'img'))) fs.cpSync(path.join(ROOT, 'img'), path.join(OUT, 'img'), { recursive: true });
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log(`protected ${pages.length} pages, copied ${assets} images -> ${path.relative(ROOT, OUT) || OUT}`);
