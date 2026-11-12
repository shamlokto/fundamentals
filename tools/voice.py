#!/usr/bin/env python3
"""Make the "Read to me" narration for a deck with xAI text to speech.

    XAI_API_KEY=... python3 tools/voice.py <slug> [...]      then: python3 tools/build.py <slug>

Scripts live in voice/<slug>.json: {"voice": "eve", "plates": [{"title": ..., "say": ...}, ...]}, one entry per
plate in deck order (the title is checked against the deck so scripts cannot drift onto the wrong plate).
Audio goes to decks/<slug>/audio/NN.mp3 with a manifest.json of text hashes, so a re-run only pays for plates
whose script or voice changed. Prints the characters sent and their cost.
"""
import json, hashlib, os, re, sys, pathlib, urllib.request
ROOT = pathlib.Path(__file__).resolve().parent.parent
PRICE = 4.20  # US$ per million characters (xAI price list, November 2026)
API = 'https://api.x.ai/v1/tts'

def titles(slug):
    src = (ROOT / 'src' / f'{slug}.js').read_text()
    return re.findall(r"\{p:\d+,title:'((?:[^'\\]|\\.)*)'", src)

def speak(text, voice):
    body = json.dumps({'text': text, 'voice_id': voice, 'language': 'en',
                       'output_format': {'codec': 'mp3', 'sample_rate': 24000, 'bit_rate': 64000}}).encode()
    req = urllib.request.Request(API, body, {'Authorization': 'Bearer ' + os.environ['XAI_API_KEY'],
                                              'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=180) as r:
        return r.read()

def run(slug):
    spec = json.loads((ROOT / 'voice' / f'{slug}.json').read_text())
    plates, voice = spec['plates'], spec.get('voice', 'eve')
    want = titles(slug)
    if [p['title'] for p in plates] != want:
        sys.exit(f'{slug}: script titles do not match the deck plates:\n  script {[p["title"] for p in plates]}\n  deck   {want}')
    out = ROOT / 'decks' / slug / 'audio'; out.mkdir(parents=True, exist_ok=True)
    mf = out / 'manifest.json'
    old = json.loads(mf.read_text()) if mf.exists() else {}
    new, sent = {}, 0
    for i, p in enumerate(plates, 1):
        name = f'{i:02d}.mp3'
        h = hashlib.sha256((voice + '\n' + p['say']).encode()).hexdigest()[:16]
        if old.get(name) != h or not (out / name).exists():
            (out / name).write_bytes(speak(p['say'], voice)); sent += len(p['say'])
            print(f'  {name} {len(p["say"])} chars')
        new[name] = h
    for f in out.glob('*.mp3'):
        if f.name not in new: f.unlink()
    mf.write_text(json.dumps(new, indent=1) + '\n')
    print(f'{slug}: {len(plates)} plates, {sent} characters sent, about ${sent * PRICE / 1e6:.3f}')

if __name__ == '__main__':
    if not os.environ.get('XAI_API_KEY'): sys.exit('Set XAI_API_KEY.')
    for s in sys.argv[1:]: run(s)
