#!/usr/bin/env bash
# Build every generated deck, then run the layout audit on every deck.
# Usage: tools/check_all.sh [--shots]     (screenshots are skipped unless --shots is given)
# Exit code is non-zero if a build fails or the audit has findings not listed in tools/audit_ignore.json.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tools/build.py
if [[ "${1:-}" != "--shots" ]]; then export NOSHOT=1; fi
node tools/audit.js
