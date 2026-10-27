# Pictures for the hub and primers

The site is hand-drawn SVG throughout. Optional pictures (for example, generated with Gemini's image model
using the `GEMINI_API_KEY` environment secret) can be added in three places. Each slot is filled only when the
file exists, so nothing breaks while a picture is missing.

| Slot | File | Shown | Rebuild with |
|---|---|---|---|
| Hub header | `img/hero.jpg` | replaces the drawn "Plate I" vignette at the top of the hub | `python3 tools/hub.py` |
| Hub card | `img/cards/<slug>.jpg` | fills the tinted strip at the top of that primer's card, behind its numeral | `python3 tools/hub.py` |
| Opening plate | `decks/<slug>/cover.webp` (preferred) or `cover.jpg` | replaces the drawing on the opening plate of a generated primer (one with `src/<slug>.js`); fitted inside the frame without cropping | `python3 tools/build.py <slug>` |

History primers have their own portrait slots (see the README).

## Sizes

* Hub header: about 1080 × 780 px (landscape, 18:13).
* Hub card: about 900 × 260 px (a wide strip); keep the left third quiet so the numeral stays readable.
* Opening plate: about 660 × 750 px (portrait, roughly 0.88:1).

Save as JPEG, quality about 85, under 250 KB each.

## Style

Keep every picture in the look of the plates: a hand-tinted nineteenth-century scientific engraving on warm
cream paper (#EFE8D8), fine ink cross-hatching (#3A2E22), muted watercolour washes in dusty blue, rose,
sage green, ochre and lilac. No text or lettering, no photorealism, no modern lab plastic, no people unless the
subject is historical. Microbes drawn as a naturalist would draw them under the microscope, accurate in shape
and proportion.

A prompt that works as a starting point:

> A hand-tinted Victorian scientific engraving on cream paper of [subject], fine ink cross-hatching, muted
> watercolour washes in dusty blue, rose, sage and ochre, museum plate style, accurate scientific detail,
> no text, no labels.

Check every picture for scientific accuracy (cell shapes, flagella, phage structure, DNA handedness) before
committing it, and do not use pictures of real, identifiable people made by an image model.

## Current set (October 2026)

The hub header, all 54 card strips and the 26 opening-plate covers were made with xAI's Grok Imagine 2.0
(`XAI_API_KEY`), one square picture per primer, using the prompt above with the subjects in
`tools/art_subjects.json`. Each picture was then processed so it sits on the site's own paper:

* Card strips: the subject is cut out to its bounding box, the paper is whitened, and it is placed right of
  centre on a 900 × 260 white strip. The hub draws card art with `mix-blend-mode:multiply`, so white becomes
  the plate's paper and the numeral on the left stays clear.
* Covers: the subject is cut out, the paper is turned into transparency (colour-to-alpha against white, with
  paper grain dropped), and the result saved as a transparent WebP of at most 520 px, under 160 KB.

Corrections made by hand: the antibiotic plate's paper discs were painted into the clear zones.
