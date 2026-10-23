# Pictures for the hub and primers

The site is hand-drawn SVG throughout. Optional pictures (for example, generated with Gemini's image model
using the `GEMINI_API_KEY` environment secret) can be added in three places. Each slot is filled only when the
file exists, so nothing breaks while a picture is missing.

| Slot | File | Shown | Rebuild with |
|---|---|---|---|
| Hub header | `img/hero.jpg` | replaces the drawn "Plate I" vignette at the top of the hub | `python3 tools/hub.py` |
| Hub card | `img/cards/<slug>.jpg` | fills the tinted strip at the top of that primer's card, behind its numeral | `python3 tools/hub.py` |
| Opening plate | `decks/<slug>/cover.jpg` | replaces the drawing on the opening plate of a generated primer (one with `src/<slug>.js`) | `python3 tools/build.py <slug>` |

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
