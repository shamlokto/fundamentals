# Staged pictures for the Immunology primers

Source pictures for the card strip and opening-plate cover of each planned Immunology primer
(plan: `tools/IMMUNOLOGY.md`), made in one batch on Runpod (Qwen image model, November 2026) and
checked by Artwork for gross errors. They are not published from here. When a primer is written,
Artwork crops its picture into `img/cards/<slug>.jpg` and `decks/<slug>/cover.webp` (see
`tools/IMAGES.md`) after Scientist 2 confirms it still matches the primer's content.

| Primer | File | Shows | Scientist 2 check (16 Nov 2026) |
|---|---|---|---|
| 2 Antigen receptors | 02-receptors.jpg | one Y-shaped antibody drawn as globular domains (heavy and light chains not distinguished) | **Do not use for primer 2**: the arms carry unequal domain counts and the stem four domains; redraw symmetric (each Fab arm identical) or use only as decoration |
| 3 Antigen presentation | 03-presentation.jpg | antigen-presenting cell with peptide-holding cups, a lymphocyte touching it | OK |
| 4 Development and tolerance | 04-development.jpg | thymus lobule: dark cortex, pale medulla with whorled (Hassall's) corpuscles | OK |
| 5 T helper subsets | 05-th-subsets.jpg | one lymphocyte surrounded by four differently tinted lymphocytes | OK |
| 6 Germinal centre | 06-germinal-centre.jpg | follicle in section: pale germinal centre with a darker crescent mantle | OK; shows mantle vs germinal centre, not the dark/light zones |
| 8 Memory and vaccines | 08-memory-vaccines.jpg | vaccine vial and lancet with lymphocytes | **Unreviewed**: rebuild around memory and recall rather than equipment, then re-check |
| 9 How IgA is made | 09-iga-production.jpg | gut wall with a dome-shaped lymphoid follicle (Peyer's patch) | **Fix before use**: the dome needs follicle-associated epithelium (flatter, M cells, no goblet cells, little mucus) |
| 10 What IgA does | 10-iga-function.jpg | epithelium under a mucus layer holding clumped bacteria | OK (single mucus layer; colon has two) |
| 12 Gut immunity | 12-gut-immunity.jpg | gut wall section with villi | **Fix before use**: layer order unclear; must read lumen → mucus → epithelium with villi into the lumen → lamina propria → muscle |
| 13 Oral vaccines | 13-oral-vaccines.jpg | bottle, spoon, sugar cube with a drop, a leafy sprig | OK |
| 14 Paradigms | 14-paradigms.jpg | branching tree ending in lymphocyte-like dots | OK |

Primers 7 (class switching) and 11 (carbohydrate antibodies) have no picture: the model could not draw an
IgM pentamer or antibodies binding a capsule correctly, so those are better as drawn plates.
