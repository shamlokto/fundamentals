# Visual style guide for the plates

This guide describes how the plates look and how new or revised plates should be drawn. It is based on
what the best current plates already do. The constants named here are defined in `tools/base_helpers.js`
(hand-built and generated decks) and `tools/lib.js` (generated decks). Use the constants, not new hex
values, so a change in one place changes the whole site.

Owner: Artwork. Changes to shared helpers go through Software; changes to individual decks go to the
deck's scientist.

## 1. The page

* Every plate is drawn on warm paper, `--paper` `#EFE8D8`, with a faint radial shading. Plates never set
  their own background. Pictures sit on the paper (see `tools/IMAGES.md`); they are never boxed in white.
* Ink is `INK` `#3A2E22`. Muted ink for axes, ticks and secondary arrows is `#6A5B47`.
* The plate is a drawing with a few words on it. Long explanation belongs in the narrator's caption, not
  on the plate. A plate with more than about 60 words of on-plate text is a candidate for splitting.

## 2. Colour carries meaning

Colour always means the same thing across the site. Do not use these colours decoratively for other things
on a plate where they appear with their meaning.

| Meaning | Constant | Hex | Notes |
|---|---|---|---|
| Ink, outlines, text | `INK` | `#3A2E22` | |
| Parental / template DNA | `DNA`, `OLD`, `DNAC` | `#5A4632` | dark brown |
| Newly made DNA (line) | `NEW` | `#3E7FA8` | blue; light fill `NEWL` `#8FB1CF` |
| RNA (mRNA, primers, transcripts) | `RNAC` | `#C17A2C` | orange-brown, drawn as a wavy line (`wave`) |
| Inhibition, damage, loss, "no" | `RED` | `#A4473A` | drug ⊣ target, deleted genes, failed outcomes |
| Activation, "yes", the key result | `GREEN` | `#4F7A3F` | ticks, growth, induction |
| Emphasis, accent text, selected chip | `BLUE` / `--accent` | `#3E5F82` / `#2F5276` | headings on plates, the curve that matters |
| Ribosome | `LSU`, `SSU` | `#BBA27A`, `#D9C89B` | large subunit darker |
| tRNA | `TRNA_C` | `#8FB1CF` | |
| Polymerases | `POLC`, `POLD` | `#9DB4AE`, `#6F9A8E` | |
| Sigma factor, signals | `SIG` | `#E0B84A` | |
| Bases A C G T | `NB` | `#4F7A3F` `#2F5276` `#8C6D46` `#A4473A` | only where bases are named |
| Protein chains, several at once | `CHAIN[...]` | eight colours | in order, so chain 1 is always green |
| Amino-acid classes | `GRP` | nonpolar `#D6C79F`, polar `#A9C4DC`, acidic `#E7A99B`, basic `#B9A0C8` | |

Washes (fills for cells, boxes, bars and cards) come from `PAL`:
sand `#E7DEC9`, blue `#A9C4DC`, green `#A9C49A`, rose `#E7A99B`, gold `#E0C88A`, lilac `#C9A9D6`,
teal `#9DB4AE`, grey `#D8D2C2`, cream `#F3EEE2`, ochre `#D9B85A`.
Bacterial cells are `#E4E8D4` with an `INK` outline (`rodCell2`, `coccus`). Glass is `GLASSE` `#7E8F92` on
`GLASSF` `#DCE6E8`; broth `BROTH` `#EAD9A0`; agar `AGAR` `#E9DAA8`; colonies `COLC` `#C99A2E`.

Rules:
* Never more than five wash colours on one plate. Use the same wash for the same kind of thing throughout a
  deck (all transporters teal, all regulators lilac, and so on).
* Red is reserved. If something is red, the reader should be able to say what it inhibits or what was lost.
* A comparison (wild type vs mutant, before vs after) uses one neutral and one meaning colour, not two
  unrelated washes.

## 3. Standard drawings

Use the helpers. If a helper does not do what a plate needs, ask Software to extend it rather than drawing a
one-off variant.

**Double-stranded DNA** (`dsDNA`, `rungs`). Two parallel strands with faint rungs. Wherever direction
matters (replication, transcription, cloning, repair, CRISPR), label both ends of both strands with 5′ and 3′
in `mono`, outside the strands, the top strand 5′→3′ left to right. Parental strands `DNA`, new strands `NEW`.
A helix (twisted) is for title plates and pictures only and must be right-handed.

**RNA** (`wave`). A wavy line in `RNAC`, 5′ end labelled where direction matters. Hairpins with `hairpin`.

**Membranes** (`membraneBand`, `poreMemb`). A bilayer band with heads drawn as dots on both faces. Always
label the two sides in `note` italics: *outside* / *cytoplasm*, or *periplasm* / *cytoplasm* for the inner
membrane of a Gram-negative cell. Proteins in the membrane span the band; their wash follows the deck's
convention for that class.

**Ribosome** (`ribosome`). Large subunit above, small below, mRNA through the small subunit labelled 5′ and
3′. Whenever tRNAs are shown, show the E, P and A sites (`sites:true`), with E on the left (5′ side).

**Cells.** Rods with `rodCell2` (length about 2.5–3 times the width), cocci with `coccus`, pneumococci with
`pneumo`. Flagella are thin wavy `INK` lines from the poles or sides, never thicker than the cell outline.

**Arrows.** `arw` for one arrow, `flow` for networks. Normal arrows are `#6A5B47`, 1.6 wide, filled
triangular head. Blue arrows (`blue:1`) for the pathway that matters, red (`red:1`) for inhibition or loss.
An arrow starts and ends at the edge of what it connects (`flow` does this), never inside a box or a label.
Arrow labels sit beside the shaft, on `side`, never on it.

**Inhibition.** Draw drug ⊣ target: a red line ending in a short perpendicular bar at the target, with the
drug named at the tail. A red cross over a step is acceptable for "this step is blocked". Do not use a plain
arrow for inhibition.

**Plots** (`axes`, `curve`, `hbars`). L-shaped axes in `#6A5B47`, 1.3 wide, outward ticks. Tick labels
`note f10`; axis titles `note f12` in italics with units in parentheses, for example *time (h)*,
*cells per mL (log)*. Every plotted axis has a title. Log axes say so in the title or with labelled
decades. The curve that carries the message is `BLUE` 2.2 wide; comparison curves are dashed or muted;
red only for the inhibited or failed case. Shaded regions use a `PAL` wash at low opacity. Bar charts
label each bar at the left and give its value at the right.

## 4. Lines

| Use | Width |
|---|---|
| Cell outlines | 1.4–1.6 |
| Box and card outlines | 0.8–1.2 |
| DNA strands | 2.2 |
| RNA | 2.6 |
| Arrows | 1.6 (major), 1.2 (minor) |
| Axes | 1.3 |
| Rungs, hatching, guides | 0.7–0.9, opacity about 0.4 |

## 5. Text

* Fonts: `--plate` (IM Fell English) for labels and notes; `mono` (IBM Plex Mono) for sequences, gene and
  site names, numbers in tables, 5′/3′ and chip labels.
* Classes, in plate units: `lab` 17, `cname` 18, `note` 15 italic muted; sizes `f10` 12 to `f16` 17.5.
  `Tc` clamps to at least 12. **Nothing is ever below 12 px.** If a label does not fit at 12, the drawing
  is too crowded: enlarge it, split the plate or move the words to the caption.
* Hierarchy on a plate: one heading (`acc`) at most per region, labels in `lab`, explanations in `note`.
* Labels sit next to what they name, outside it where possible, with a leader line (`#6A5B47`, 0.8) only
  when they cannot be adjacent. Use `halo` for any label that has to cross a line or a wash.
* Labels never overlap other labels, lines, arrowheads or the plate edge, at either width.
  `tools/audit.js` checks this; check the contact sheets by eye too.
* British spelling, sentence case, no full stops on labels.

## 6. Layout

* Wide plates are 640 units across (`wide(h)`), phone plates 360 (`slim(h)`); both must work.
* One idea per plate, arranged left to right or top to bottom in reading order. Steps are numbered with
  `badge`/`bullets`.
* Keep at least 16 units of clear paper at the plate edges and between unrelated groups. Avoid both a
  crowded corner and a large empty half: if a drawing leaves half the plate empty, enlarge it.
* Interactive chips change one thing on the plate and leave the layout still, so the reader sees what
  changed.

## 7. Pictures

Generated pictures follow `tools/IMAGES.md`: engraved, hand-tinted, no text, no real people, checked for
accuracy, and placed on the plate paper rather than in a white box.
