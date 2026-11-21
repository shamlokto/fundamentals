# HQ notes (state at pause, 21 November 2026)

Running notes for whoever picks up as HQ. Read with `tools/IMMUNOLOGY.md`, `tools/AUTHORING.md`,
`tools/STYLE.md`, `tools/IMAGES.md` and `tools/RUNPOD.md`.

## Team (Claude Code cloud sessions)

| Role | Session | Branch | Notes |
|---|---|---|---|
| HQ | session_014vzmVSCS42yLCQ96hw56u3 | claude/clever-rubin-c58tq9 | merges to main after vetting |
| Scientist A (builds, polishes) | session_01LUUiQrM5JLDAqu33AzggVF | claude/scientist-a | |
| Scientist B (vets; may build) | session_01LUUiQrKx5WLGphSSQXPb3B | its own | sends findings to the author |
| Artwork | session_01LUUiQnnSAtmy7H6gQGkFUy | claude/sleepy-mccarthy-ja28nj | Grok and Runpod; asks the owner in its own session before spending |
| Software | session_01LUUiQrd4UuY7qAbVtgXPFJ | claude/epic-turing-qv54qj | |
| Historian | session_01LUUiQnwXNN5aDC4tPztY7t | | cannot edit (blocked by its permission checks) |

Scientists 1 and 2 (the original pair) were archived after safety stops on 16 November.

## Rules the owner has set

* Publish each primer only after Scientist B passes it; immunology primers stay out of `tools/access.json`.
* Course codes live in `tools/access.json` (LSM3232, LSM3225, MDG5246); they are a convenience, not security.
* Runpod: one pod at a time, hard kill timer, terminate (delete, not stop) when done, report pod ID and cost.
* Usage: the owner watches the meters; pause when told.

## Immunology series

Pass 1 (textbook level, own words; the owner's Janeway PDF is used only to check facts and must never be
committed or published).

| # | Primer | Slug | State |
|---|---|---|---|
| 1 | Innate instructs adaptive | immuno-innate-adaptive | live, passed |
| 2 | Antigen receptors and genes | immuno-antigen-receptors | live, passed |
| 3 | Antigen presentation | immuno-antigen-presentation | live, passed |
| 4 | Lymphocyte development | immuno-lymphocyte-development | built; all of B's findings (L1, F1, W1–W3) applied, awaiting B's re-check; NOT in hub.json yet, add it back when B passes |
| 5 | T helper subsets | — | next to write |
| 6–14 | see `tools/IMMUNOLOGY.md` | — | not started |

Primer 4's deck file is built but deliberately left out of `tools/hub.json` until it passes.

Safety: the earlier scientist sessions and one HQ attempt (a paradigms primer and a fungi/protists brief)
were stopped by safeguards. Primers 2–4, written plainly at textbook level, went through. If a step is
stopped, simplify that passage; do not reword the same detail. Support was emailed from the owner's
Gmail (thread with support@anthropic.com, 16 November).

## Open small items

* Molecular-cloning cover: insert sits on the scissor blade (optional redo).
* Hand-built palette draws phage (PHG) in red, against STYLE.md §2.
* `tools/base_helpers.js` prediction-table wrap width could be narrowed for all decks.
* Software's new audit checks (text outside its box; labels touching) are merged; the two findings they raised
  (respiration plate 2, stress-biofilms plate 2) are fixed.
* Evolution plate 10 r/m values are banded; exact values need Vos & Didelot 2009, Table 1.
