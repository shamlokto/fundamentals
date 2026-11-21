# Generating pictures on Runpod

How Artwork runs image generation on the owner's Runpod account. Every Claude session working on this
repository should read this before starting a pod. Costs real money: one pod at a time, a hard kill timer,
and terminate (delete, not stop) as soon as the work is done.

## API: use REST v2 at api.runpod.io

* Base URL `https://api.runpod.io/v2/` (live spec: `https://api.runpod.io/v2/openapi.json`).
* The old `https://rest.runpod.io/v1/` endpoint stopped working in November 2026: every call returned
  `502 upstream request failed`. Do not use it.
* Auth: the owner's API key is saved as a network secret on the cloud environment for `api.runpod.io` (and
  the old `rest.runpod.io`), so the proxy adds the `Authorization` header. Send any placeholder, e.g.
  `-H 'Authorization: Bearer dummy'`; never ask for or paste the key.
* The Runpod MCP connector is not authorised in these sessions; `runpodctl` is not installed. Plain `curl`
  against REST v2 is enough.

| Action | Call |
|---|---|
| List pods | `GET /v2/pods` → `{"pods":[...], "pagination":{...}}` |
| Create pod | `POST /v2/pods` (body below) → 201 with `id` |
| Get pod | `GET /v2/pods/{id}` (404 once deleted) |
| Terminate pod | `DELETE /v2/pods/{id}` → 204 |

Create body (v2 field names differ from v1):

```json
{"name": "fundamentals-art", "image": "runpod/pytorch:1.0.2-cu1281-torch280-ubuntu2404", "cloud": "SECURE",
 "gpu": {"id": "NVIDIA RTX PRO 4500 Blackwell", "count": 1}, "dataCenterIds": ["EU-RO-1"],
 "mounts": {"network": [{"volumeId": "9zhqq8f4mh", "path": "/workspace"}]}, "disk": 30,
 "ports": ["8188/http", "8888/http"], "cmd": ["bash", "-c", "<boot script>"]}
```

v1 → v2: `imageName` → `image`; `gpuTypeIds`/`gpuCount` → `gpu: {id, count}`; `cloudType` → `cloud`;
`networkVolumeId` + `volumeMountPath` → `mounts.network[{volumeId, path}]`; `containerDiskInGb` → `disk`;
`dockerStartCmd` → `cmd`.

## The owner's setup

* Network volume `comfyui-models` (id `9zhqq8f4mh`, 100 GB, data centre EU-RO-1; pods must be in EU-RO-1 to
  mount it). It holds ComfyUI at `/workspace/ComfyUI` with its venv at `/workspace/venv`, already installed
  (`/workspace/.setup-done`), plus Qwen-Image (`Qwen-Rapid-AIO-…` checkpoint, 4 steps, cfg 1,
  euler_ancestral/beta) and Wan 2.2 image-to-video.
* Boot script: start ComfyUI from the volume, then hand over to the image's own `/start.sh`:
  `source /workspace/venv/bin/activate; cd /workspace/ComfyUI; nohup python main.py --listen 0.0.0.0 --port 8188 --disable-metadata &`
  ComfyUI answers at `https://<podId>-8188.proxy.runpod.net` after about 2 minutes. Python clients must send
  a browser-like `User-Agent` (the proxy returns 403 to Python's default).
* GPUs: RTX PRO 4500 Blackwell (about 10 s per Qwen image; cheapest that works) or RTX PRO 6000
  Blackwell ($2.69/hr, about 2 s per image after the model loads). EU-RO-1 stock varies; retry or fall back.
* Do not load the volume's adult-content LoRAs; build clean workflows (Qwen checkpoint only; Wan with only the
  lightx2v speed-up LoRA).

## Safety routine

1. `GET /v2/pods` first: start nothing if a pod is already running.
2. Right after create, arm a background kill timer that sends `DELETE /v2/pods/{id}` at the budget limit.
3. Generate everything in one batch, then `DELETE` the pod, confirm `GET /v2/pods/{id}` returns 404, and
   stop the timer.
4. Report the pod id, GPU, start and end times, cost and the termination to HQ.

Wan video clips have so far failed the accuracy rule in `tools/IMAGES.md` (cells dissolving, pseudopods
detaching, no real motion); expect stills to be the useful output.
