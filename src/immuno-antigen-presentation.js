/*META
{"title":"Antigen Presentation","eyebrow":"Immunology · an animated primer","h1":"How cells show peptides to T cells","parts":["Two classes","Two pathways","Beyond the rules"],"foot":"Textbook level (Janeway, Abbas); pathways are simplified to their main steps. Mouse and human differences are noted where they matter.","description":"MHC class I and II, the cytosolic and endocytic pathways, cross-presentation, MHC polymorphism and restriction, and CD1 and MR1."}
META*/
function scB1(n){return introPlate(n,{q:'How does a T cell, which cannot see whole proteins, find an infected cell?',
  belief:'T cells recognise short peptides held in the groove of MHC molecules on another cell. Class I molecules show peptides from inside the cell to CD8 T cells; class II molecules show peptides from engulfed material to CD4 T cells.',
  items:['MHC class I and class II','The class I pathway','The class II pathway','Cross-presentation','MHC restriction and polymorphism','CD1 and MR1'],
  art:(cx,cy)=>box(cx-70,cy-15,40,30,PAL.lilac,4)+T(cx-50,cy+34,'class I','note mid f12')+box(cx+30,cy-15,40,30,PAL.blue,4)+T(cx+50,cy+34,'class II','note mid f12'),artH:110});}
const MHCROWS=[['Found on','almost all nucleated cells','professional antigen-presenting cells'],['Chains','α chain + β2-microglobulin','α chain + β chain'],['Peptide length','8–10 amino acids','13–25 amino acids'],
 ['Peptides from','proteins in the cytosol','proteins in endosomes'],['Seen by','CD8 T cells','CD4 T cells'],['Human / mouse genes','HLA-A, -B, -C / H-2K, -D, -L','HLA-DR, -DQ, -DP / H-2A, -E']];
function scB2(n){
  const t=wtable(n,['','Class I','Class II'],MHCROWS,n?[[10,12],[120,14],[240,14]]:[[24,18],[220,26],[430,26]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'CD8 binds a non-polymorphic part of class I and CD4 binds class II, which is why each T-cell type sees one class.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
const S=[
 {p:1,title:'Showing peptides',draw:scB1,text:"T cells do not see whole proteins. They see short peptides held by MHC molecules on the surface of other cells, and which class of MHC carries the peptide decides which kind of T cell responds."},
 {p:1,title:'Two classes of MHC',draw:scB2,text:"Class I and class II molecules differ in where they are made, which peptides they carry and which T cells they talk to."}];
const CHIPS={};
