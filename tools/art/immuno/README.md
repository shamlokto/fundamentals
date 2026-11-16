# Staged pictures for the Immunology primers

Source pictures for the card strip and opening-plate cover of each planned Immunology primer
(plan: `tools/IMMUNOLOGY.md`), made in one batch on Runpod (Qwen image model, November 2026) and
checked by Artwork for gross errors. They are not published from here. When a primer is written,
Artwork crops its picture into `img/cards/<slug>.jpg` and `decks/<slug>/cover.webp` (see
`tools/IMAGES.md`) after Scientist 2 confirms it still matches the primer's content.

| Primer | File | Shows | Scientist 2 check (16 Nov 2026) |
|---|---|---|---|
| 2 Antigen receptors | 02-receptors.jpg | one Y-shaped antibody drawn as globular domains (heavy and light chains not distinguished) | **Decoration only, not for primer 2's structure plates**: domain counts are wrong (a 16 Nov retry drew six per arm and six in the stem; IgG has four and four). Primer 2 should teach structure with a drawn diagram |
| 3 Antigen presentation | 03-presentation.jpg | antigen-presenting cell with peptide-holding cups, a lymphocyte touching it | OK |
| 4 Development and tolerance | 04-development.jpg | thymus lobule: dark cortex, pale medulla with whorled (Hassall's) corpuscles | OK |
| 5 T helper subsets | 05-th-subsets.jpg | one lymphocyte surrounded by four differently tinted lymphocytes | OK |
| 6 Germinal centre | 06-germinal-centre.jpg | follicle in section: pale germinal centre with a darker crescent mantle | OK; shows mantle vs germinal centre, not the dark/light zones |
| 8 Memory and vaccines | 08-memory-vaccines.jpg | clonal expansion: one lymphocyte fans out into many, most fade, a few larger memory cells remain (redrawn 16 Nov, no equipment; back-pointing arrows removed) | **Awaiting Scientist 2**; memory cells are drawn larger than in life (they are small) |
| 9 How IgA is made | 09-iga-production.jpg | gut wall with a dome-shaped lymphoid follicle (Peyer's patch) | **Fix before use**: the dome needs follicle-associated epithelium (flatter, M cells, no goblet cells, little mucus). A 16 Nov retry (4 seeds) could not draw it; use a drawn plate |
| 10 What IgA does | 10-iga-function.jpg | epithelium under a mucus layer holding clumped bacteria | OK (single mucus layer; colon has two) |
| 12 Gut immunity | 12-gut-immunity.jpg | gut wall section with villi | **Fix before use**: layer order unclear; must read lumen → mucus → epithelium with villi into the lumen → lamina propria → muscle. A 16 Nov retry (4 seeds) still failed; use a drawn plate |
| 13 Oral vaccines | 13-oral-vaccines.jpg | bottle, spoon, sugar cube with a drop, a leafy sprig | OK |
| 14 Paradigms | 14-paradigms.jpg | branching tree ending in lymphocyte-like dots | OK |

Primers 7 (class switching) and 11 (carbohydrate antibodies) have no picture: the model could not draw an
IgM pentamer or antibodies binding a capsule correctly, so those are better as drawn plates.
