/*META
{"title":"Antigen Presentation","eyebrow":"Immunology · an animated primer","h1":"How cells show T cells what is inside them","parts":["Two classes of MHC","Two pathways","Beyond peptides","Genes and history"],"foot":"Textbook level (Janeway, 9th edition, chapter 6). Pathways are simplified; peptide lengths and gene names are the commonly taught ones.","description":"MHC class I and II molecules, the cytosolic and vesicular processing pathways, cross-presentation, CD1 and MR1, MHC polymorphism, and MHC restriction."}
META*/
/* an MHC molecule seen from the side: two domains forming a groove, a peptide in it */
function mhcIcon(cx,cy,k,f,lab){
  return `<path d="M${FX(cx-26*k)} ${FX(cy)} q${FX(6*k)} ${FX(-22*k)} ${FX(20*k)} ${FX(-24*k)} l${FX(12*k)} 0 q${FX(14*k)} ${FX(2*k)} ${FX(20*k)} ${FX(24*k)} z" fill="${f}" stroke="${INK}" stroke-width="1.2"/>`
   +`<rect x="${FX(cx-10*k)}" y="${FX(cy-22*k)}" width="${FX(20*k)}" height="${FX(5*k)}" rx="2" fill="${CAT[2]}" stroke="${INK}" stroke-width=".9"/>`
   +`<rect x="${FX(cx-6*k)}" y="${FX(cy)}" width="${FX(12*k)}" height="${FX(22*k)}" fill="${f}" stroke="${INK}" stroke-width="1"/>`
   +(lab?T(cx,FX(cy+38*k),lab,'note mid f12'):'');
}
function scP1(n){return introPlate(n,{q:'How does a T cell find out what is happening inside another cell?',
  belief:'Every cell keeps cutting up samples of its proteins and displaying the fragments on MHC molecules at its surface. A T cell scans these displays. A peptide it has never been tolerised to, presented with the right signals, means infection or damage.',
  items:['MHC class I and class II','The cytosolic (class I) pathway','The vesicular (class II) pathway','Cross-presentation','CD1 and MR1','Polymorphism and MHC restriction'],
  art:(cx,cy)=>mhcIcon(cx-60,cy+10,1.4,CAT[0],'class I')+mhcIcon(cx+60,cy+10,1.4,CAT[1],'class II'),artH:140});}
function scP2(n){
  const rows=[['Found on','almost all nucleated cells','dendritic cells, macrophages, B cells (and thymic epithelium)'],
   ['Chains','α chain + β2-microglobulin','α chain + β chain'],
   ['Groove','closed at both ends','open at both ends'],
   ['Peptide length','8–10 amino acids','13 or more, often 13–25'],
   ['Peptides come from','proteins in the cytosol','proteins taken up into vesicles'],
   ['Read by','CD8 T cells','CD4 T cells'],
   ['Typical outcome','infected cell is killed','help for B cells and macrophages']];
  const t=wtable(n,['','MHC class I','MHC class II'],rows,n?[[10,11],[100,17],[236,18]]:[[24,18],[180,30],[410,32]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'CD8 binds a conserved part of class I and CD4 binds class II, which is why the two kinds of T cell look at different classes.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scP3(n){
  const N=n?{c:{x:180,y:40,w:220,t:'protein in the cytosol',f:CAT[6]},p:{x:180,y:115,w:220,t:'proteasome cuts|it into peptides',f:CAT[3]},t:{x:180,y:190,w:220,t:'TAP pumps peptides|into the ER',f:CAT[4]},l:{x:180,y:265,w:220,t:'loaded onto class I|(loading complex)',f:CAT[0]},s:{x:180,y:340,w:220,t:'to the surface:|seen by CD8 T cells',f:CAT[1]}}
    :{c:{x:90,y:60,w:150,t:'protein in|the cytosol',f:CAT[6]},p:{x:260,y:60,w:150,t:'proteasome cuts|into peptides',f:CAT[3]},t:{x:440,y:60,w:150,t:'TAP pumps|into the ER',f:CAT[4]},l:{x:440,y:170,w:170,t:'loaded onto class I|(loading complex)',f:CAT[0]},s:{x:220,y:170,w:190,t:'to the surface:|seen by CD8 T cells',f:CAT[1]}};
  const E=[['c','p','',{}],['p','t','',{}],['t','l','',{}],['l','s','',{}]];
  let s=G('a-fade',0,flow(N,E));
  const it=[['Proteasome','A protease complex that degrades cytosolic proteins. Interferon-γ swaps in subunits that make the immunoproteasome, whose cuts suit class I better.'],
   ['TAP','A transporter in the endoplasmic-reticulum membrane that pumps peptides from the cytosol into the ER.'],
   ['Peptide-loading complex','Tapasin, calreticulin and ERp57 hold the new class I molecule next to TAP until a good peptide binds; the enzyme ERAAP trims peptides to fit.']];
  const b=bullets(n?24:30,n?400:240,it,n?44:88,{d0:.6,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scP4(n){
  const N=n?{e:{x:180,y:40,w:220,t:'class II made in ER,|groove blocked by Ii',f:CAT[1]},m:{x:180,y:115,w:220,t:'to endosomes; Ii cut|down to CLIP',f:CAT[3]},d:{x:180,y:190,w:220,t:'HLA-DM swaps CLIP|for a peptide',f:CAT[4]},u:{x:180,y:265,w:220,t:'peptide from taken-|up protein loads',f:CAT[2]},s:{x:180,y:340,w:220,t:'to the surface:|seen by CD4 T cells',f:CAT[0]}}
    :{e:{x:100,y:60,w:170,t:'made in the ER;|groove blocked by Ii',f:CAT[1]},m:{x:300,y:60,w:170,t:'in endosomes, Ii|is cut to CLIP',f:CAT[3]},d:{x:500,y:60,w:170,t:'HLA-DM swaps|CLIP for peptide',f:CAT[4]},s:{x:300,y:170,w:200,t:'to the surface:|seen by CD4 T cells',f:CAT[0]}};
  const E=n?[['e','m','',{}],['m','d','',{}],['d','u','',{}],['u','s','',{}]]:[['e','m','',{}],['m','d','',{}],['d','s','',{}]];
  let s=G('a-fade',0,flow(N,E));
  const it=[['Invariant chain (Ii)','Binds new class II molecules in the ER, blocks the groove so ER peptides cannot load, and steers them to endosomes.'],
   ['CLIP','The small fragment of the invariant chain left sitting in the groove after the rest is cut away.'],
   ['HLA-DM','A class II-like molecule that removes CLIP and favours peptides that bind tightly. Its mouse equivalent is H-2M.']];
  const b=bullets(n?24:30,n?400:240,it,n?44:88,{d0:.6,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scP5(n){
  const items=[['Who does it','Mainly the cDC1 subset of dendritic cells (CD8α⁺ and CD103⁺ in mice, CD141⁺ in humans).'],
   ['Why it matters','A virus that infects only epithelial cells never puts its proteins into a dendritic cell\'s cytosol. Cross-presentation still lets the dendritic cell show viral peptides on class I and prime CD8 T cells.'],
   ['How it works','Engulfed protein reaches class I either by export from phagosomes into the cytosol and then through the usual proteasome and TAP route, or by loading inside the phagosome itself.'],
   ['Licensing','Dendritic cells are often "licensed" to cross-prime by CD4 T-cell help through CD40.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
const PRES=[
 {h:'MHC class I',rows:[['Holds','peptides of 8–10 amino acids'],['Source','proteins made in the cytosol'],['Read by','CD8 T cells; also checked by NK cells'],['Present on','almost all nucleated cells']]},
 {h:'MHC class II',rows:[['Holds','peptides of 13 or more amino acids'],['Source','proteins taken up into endosomes'],['Read by','CD4 T cells'],['Present on','dendritic cells, macrophages, B cells']]},
 {h:'CD1',rows:[['Holds','lipids and glycolipids in a deep, greasy groove'],['Source','self and microbial lipids, for example mycobacterial cell-wall lipids'],['Read by','invariant NKT cells (on CD1d) and other T cells (CD1a, b, c)'],['Note','non-polymorphic: nearly the same in everyone']]},
 {h:'MR1',rows:[['Holds','small metabolites from the bacterial riboflavin (vitamin B2) pathway'],['Source','many bacteria and yeasts; not made by human cells'],['Read by','mucosal-associated invariant T (MAIT) cells'],['Note','non-polymorphic; MAIT cells are common in human blood and liver']]}];
function scP6(n){const c=PRES[presSel];return explorer(n,{h:c.h,sub:'antigen-presenting molecule',rows:c.rows,note:'Classical MHC molecules are highly polymorphic and present peptides; CD1 and MR1 are conserved and present non-peptide molecules.'},{y:32});}
function scP7(n){
  const W=n?360:640, cy=n?70:80;
  let s='';
  const genes=n?[['A','B','C'],['DP','DQ','DR']]:[['HLA-A','HLA-B','HLA-C'],['HLA-DP','HLA-DQ','HLA-DR']];
  const x0=n?16:40, gw=n?40:70;
  ['from mother','from father'].forEach((who,r)=>{const y=cy+r*44;
    s+=G('a-fade',(.1+r*.2).toFixed(1),T(x0,y+5,who,'note start f12'));
    [...genes[1],...genes[0]].forEach((g,i)=>{const x=x0+(n?78:110)+i*(gw+(n?2:4));
      s+=G('a-pop',(.3+r*.2+i*.05).toFixed(2),box(x,y-11,gw,22,i<3?CAT[1]:CAT[0],3)+T(x+gw/2,y+5,g,'mono mid f11'));});});
  s+=G('a-fade',.9,T(x0+(n?78:110),cy-24,'class II','note start f12')+T(x0+(n?78:110)+3*(gw+(n?2:4)),cy-24,'class I','note start f12'));
  const it=[['Polygenic','Each person has three classical class I genes and three class II gene pairs on each copy of chromosome 6.'],
   ['Codominant','Both parents\' sets are expressed together, so a cell can show up to six different class I molecules.'],
   ['Polymorphic','Thousands of variants of each gene are known. The differences cluster in the peptide groove, so different variants bind different peptides through different anchor residues.']];
  const b=bullets(n?24:30,cy+90,it,n?44:88,{d0:1,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scP8(n){
  const W=n?360:640, cx=n?60:110, y0=n?60:70;
  let s=G('a-fade',0,blob(cx,y0+60,30,28,CAT[0])+T(cx,y0+64,'CD8','lab mid f12')+T(cx,y0+108,'killer T cell','note mid f12')+T(cx,y0+124,'from an H-2ᵏ mouse','note mid f12'));
  const tg=[['infected, H-2ᵏ',true],['infected, H-2ᵇ',false],['uninfected, H-2ᵏ',false]];
  tg.forEach(([lab,ok],i)=>{const x=n?196:420, y=y0+i*(n?56:56);
    s+=G('a-fade',(.4+i*.3).toFixed(1),arw(cx+40,y0+60,x-36,y+4,{w:1.2})+blob(x,y+4,28,20,CAT[2])+T(x+(n?36:40),y+8,lab,'note start f12')+mark(x,y+4,ok,10));});
  const p=para(n?16:24,y0+(n?190:190),'Zinkernagel and Doherty (1974) infected mice with lymphocytic choriomeningitis virus. Their killer T cells destroyed infected target cells only when the targets shared the mouse\'s own MHC type. The finding showed that T cells recognise antigen together with self MHC, and earned the 1996 Nobel Prize. The structure of HLA-A2, solved by Bjorkman and colleagues in 1987, showed why: the peptide sits in a groove formed by the MHC molecule itself.',n?50:92,'note start f13',17,1.4);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+p.s};
}
function scP9(n){
  const items=[['Gene names','Human MHC is HLA on chromosome 6 (class I: A, B, C; class II: DP, DQ, DR). Mouse MHC is H-2 on chromosome 17 (class I: K, D, L; class II: I-A, I-E).'],
   ['Strains and people','Inbred mice carry one fixed haplotype, named by a letter (H-2ᵇ in C57BL/6, H-2ᵈ in BALB/c). Each person carries two of thousands of HLA variants.'],
   ['CD1','Humans have CD1a, b, c, d and e; mice have only CD1d, so mouse studies of lipid antigens focus on iNKT cells.'],
   ['MAIT cells','Present in both, but far more abundant in humans (a few per cent of blood T cells) than in laboratory mice.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
const S=[
 {p:1,title:'T cells see fragments',draw:scP1,text:"A T-cell receptor cannot recognise a whole protein. It recognises a short peptide held in the groove of an MHC molecule on another cell's surface. This primer follows how those peptides are made and loaded."},
 {p:1,title:'Class I and class II',draw:scP2,text:"There are two main classes of MHC molecule. Class I is on almost every nucleated cell and shows peptides from inside the cell to CD8 T cells. Class II is on specialised antigen-presenting cells and shows peptides from material taken up to CD4 T cells."},
 {p:2,title:'The class I pathway',draw:scP3,text:"Proteins in the cytosol, including those of viruses growing in the cell, are cut by the proteasome. The peptides are pumped into the endoplasmic reticulum by TAP, loaded onto new class I molecules, and carried to the surface."},
 {p:2,title:'The class II pathway',draw:scP4,text:"New class II molecules leave the endoplasmic reticulum with their groove blocked by the invariant chain. In endosomes the invariant chain is cut down to a small fragment, CLIP, which HLA-DM swaps for a peptide from material the cell has taken up."},
 {p:2,title:'Cross-presentation',draw:scP5,text:"Some dendritic cells can put peptides from material they have taken up onto class I as well as class II. This cross-presentation lets them start CD8 T-cell responses to viruses that do not infect dendritic cells themselves."},
 {p:3,title:'Other presenting molecules',chips:'pres',draw:scP6,text:"Not every T cell looks at peptides on classical MHC. Pick a presenting molecule to see what it holds and which cells read it."},
 {p:4,title:'Polygenic and polymorphic',draw:scP7,text:"Each person inherits several class I and class II genes from each parent and expresses both sets. The genes are the most variable in the human genome, so most people present a different selection of peptides."},
 {p:4,title:'MHC restriction',draw:scP8,text:"In 1974 Zinkernagel and Doherty found that killer T cells from a virus-infected mouse destroyed infected cells only if those cells carried the same MHC type. T cells recognise antigen together with self MHC."},
 {p:4,title:'Mouse and human',draw:scP9,text:"The pathways are the same in mouse and human, but the gene names, the number of genes and some presenting molecules differ, so it matters which species a result comes from."}];
let presSel=0;
const CHIPS={pres:{list:['MHC class I','MHC class II','CD1','MR1'],get:()=>presSel,set:k=>presSel=k}};
