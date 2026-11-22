/*META
{"title":"Lymphocyte Development","eyebrow":"Immunology · an animated primer","h1":"How B and T cells are made, tested and kept from attacking the body","parts":["B cells","T cells","Tolerance","Species and history"],"foot":"Textbook level (Janeway, 9th edition, chapter 8). Stages and markers are simplified; the B-1 and marginal-zone subsets are described mainly from mouse work.","description":"B-cell development in the bone marrow, B-cell tolerance and subsets, T-cell development in the thymus, positive and negative selection, AIRE and thymic regulatory T cells, with mouse and human compared."}
META*/
function scD1(n){return introPlate(n,{q:'If every receptor is made at random, why does the immune system not attack the body?',
  belief:'Developing lymphocytes are tested twice: first that their receptor works at all, then that it does not react too strongly with self. Cells that fail are removed, re-edited or silenced. What leaves the bone marrow and thymus is a repertoire that is broad but largely self-tolerant.',
  items:['B-cell stages in the bone marrow','B-cell subsets','T-cell stages in the thymus','Positive and negative selection','B-cell tolerance','AIRE and regulatory T cells'],
  art:(cx,cy)=>blob(cx-60,cy,30,26,CAT[0])+T(cx-60,cy+4,'B','lab mid f14')+blob(cx+60,cy,30,26,CAT[1])+T(cx+60,cy+4,'T','lab mid f14')
    +T(cx-60,cy+44,'bone marrow','note mid f12')+T(cx+60,cy+44,'thymus','note mid f12'),artH:120});}
function scD2(n){
  const rows=[['Pro-B cell','heavy chain: D to J, then V to DJ','none yet'],
   ['Large pre-B cell','heavy chain made; tested with surrogate light chain (VpreB + λ5)','pre-B-cell receptor'],
   ['Small pre-B cell','light chain rearranges: κ first, then λ','none'],
   ['Immature B cell','first full receptor; tested for self-reactivity; leaves the marrow as a transitional B cell','IgM'],
   ['Mature naive B cell','completes maturation in the spleen; recirculates','IgM and IgD']];
  const t=wtable(n,['Stage','What happens','On the surface'],rows,n?[[10,10],[100,18],[250,11]]:[[24,18],[180,44],[470,22]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'The pre-B-cell receptor is the first checkpoint: a heavy chain that cannot pair with the surrogate light chain sends no signal, and the cell dies. A working one stops further heavy-chain rearrangement and drives a burst of division before light-chain rearrangement starts.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
const BSUB=[
 {h:'Follicular B cells',rows:[['Where','follicles of spleen and lymph nodes; recirculate in blood'],['Share','the large majority of mature B cells'],['Answer','protein antigens, with T-cell help'],['Outcome','germinal centres, class switching, memory and long-lived plasma cells']]},
 {h:'Marginal-zone B cells',rows:[['Where','the marginal zone of the spleen, where blood filters past'],['Answer','blood-borne particles and polysaccharides, often without T-cell help'],['Outcome','fast, mostly IgM antibody'],['Note','in mice they stay in the marginal zone; in humans similar cells also recirculate']]},
 {h:'B-1 cells',rows:[['Where','peritoneal and pleural cavities (mouse)'],['Origin','largely from fetal and neonatal precursors; self-renewing'],['Answer','common microbial carbohydrates and lipids'],['Outcome','“natural” IgM present before infection, and gut IgA'],['Note','well defined in mice; the human equivalent is still debated']]}];
function scD3(n){const c=BSUB[bsubSel];return explorer(n,{h:c.h,sub:'mature B-cell subset',rows:c.rows,note:'Marginal-zone and B-1 cells answer carbohydrate antigens quickly, often without T-cell help.'},{y:32});}
function scD4(n){
  const N=n?{dn:{x:180,y:40,w:230,t:'double negative|CD4⁻ CD8⁻ (TCRβ rearranges)',f:CAT[6]},b:{x:180,y:120,w:230,t:'β-selection: pre-TCR|(β + pre-Tα) signals',f:CAT[3]},dp:{x:180,y:200,w:230,t:'double positive|CD4⁺ CD8⁺ (TCRα rearranges)',f:CAT[4]},sel:{x:180,y:280,w:230,t:'positive and negative|selection on self MHC',f:CAT[2]},sp:{x:180,y:360,w:230,t:'single positive|CD4⁺ or CD8⁺, to the blood',f:CAT[1]}}
    :{dn:{x:100,y:60,w:170,t:'double negative|CD4⁻ CD8⁻',f:CAT[6]},b:{x:300,y:60,w:170,t:'β-selection|pre-TCR signals',f:CAT[3]},dp:{x:510,y:60,w:170,t:'double positive|CD4⁺ CD8⁺',f:CAT[4]},sel:{x:510,y:170,w:170,t:'positive and|negative selection',f:CAT[2]},sp:{x:280,y:170,w:200,t:'single positive|CD4⁺ or CD8⁺',f:CAT[1]}};
  const E=[['dn','b','',{}],['b','dp','',{}],['dp','sel','',{}],['sel','sp','',{}]];
  let s=G('a-fade',0,flow(N,E));
  const it=[['Cortex','Double-negative cells rearrange the β chain; a working β chain pairs with pre-Tα and signals, then the α chain rearranges. Cortical epithelial cells carry out positive selection.'],
   ['Medulla','Single-positive cells move to the medulla, where dendritic cells and medullary epithelial cells test them against a wide range of self antigens.'],
   ['Lineage choice','A cell selected on class I becomes CD8; one selected on class II becomes CD4.'],
   ['γδ cells','A minority of precursors rearrange γ and δ instead and leave as γδ T cells.']];
  const b=bullets(n?24:30,n?420:240,it,n?44:88,{d0:.6,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scD5(n){
  const x0=n?24:60, x1=n?336:580, y=n?90:90, w=x1-x0;
  const z=[[0,.3,n?'neglect':'death by neglect',CAT[6]],[.3,.7,n?'positive':'positive selection',CAT[1]],[.7,1,n?'deleted/Treg':'deleted, or Treg',CAT[3]]];
  let s='';
  z.forEach(([a,b,lab,f],i)=>{s+=G('a-pop',(.2+i*.25).toFixed(2),box(x0+a*w,y-20,(b-a)*w,40,f,0)+T(x0+(a+b)/2*w,y+5,lab,'mono mid '+(n?'f10':'f12')));});
  s+=G('a-fade',.9,arw(x0,y+40,x1,y+40,{w:1.4})+T((x0+x1)/2,y+64,'strength of binding to self peptide–MHC','note mid f12'));
  const it=[['Too weak','About nine in ten double-positive cells never receive a survival signal and die in the cortex.'],
   ['Moderate','A signal of moderate strength rescues the cell and sets its CD4 or CD8 fate. This is why mature T cells are restricted to self MHC.'],
   ['Too strong','Strong binding, in the cortex or the medulla, triggers apoptosis (clonal deletion). Some cells in this range instead become thymic regulatory T cells.']];
  const b=bullets(n?24:30,y+90,it,n?44:88,{d0:1.1,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scD6(n){
  const items=[['Receptor editing','A self-reactive immature B cell keeps rearranging its light chains, replacing the light chain until the receptor is no longer self-reactive. This rescues many cells.'],
   ['Clonal deletion','If editing fails against a multivalent self antigen, such as a cell-surface molecule, the cell dies by apoptosis.'],
   ['Anergy','A cell that meets a soluble self antigen can survive but stops responding, and lives only a short time in the periphery.'],
   ['Ignorance','Cells whose self antigen is hidden or very scarce are left alone; they are a risk if the antigen is later exposed.']];
  const c=cards(n,items,{y:24});
  const p=para(n?16:24,c.y+12,'Central tolerance in the bone marrow is backed up by peripheral tolerance: lack of T-cell help, inhibitory receptors and regulatory T cells.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:c.s+p.s};
}
function scD7(n){
  const items=[['AIRE','A transcriptional regulator in medullary thymic epithelial cells that switches on thousands of genes otherwise expressed only in particular tissues, such as insulin, so that T cells can be tested against them.'],
   ['When AIRE fails','People with mutations in both copies of AIRE develop autoimmune polyendocrine syndrome type 1 (APECED), with autoimmunity against several endocrine organs. Aire-deficient mice show a similar multi-organ autoimmunity.'],
   ['Thymic regulatory T cells','Some CD4 cells that bind self strongly switch on the transcription factor Foxp3 and become regulatory T cells, which suppress other T cells in the periphery.'],
   ['When Foxp3 fails','Loss of Foxp3 causes fatal autoimmunity in scurfy mice and the IPEX syndrome in boys.']];
  const c=cards(n,items,{y:24});
  const p=para(n?16:24,c.y+12,'Brunkow, Ramsdell and Sakaguchi shared the 2025 Nobel Prize for discoveries on peripheral tolerance and regulatory T cells.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:c.s+p.s};
}
function scD8(n){
  const items=[['B-1 cells','A clear population in mouse body cavities; whether humans have a true equivalent is still argued.'],
   ['Marginal-zone B cells','Mouse cells stay in the splenic marginal zone; human cells with similar function also circulate and carry mutated receptors.'],
   ['Thymus over life','The human thymus is most active before birth and in childhood and shrinks with age; laboratory mice are usually studied young.'],
   ['Markers','Developmental stages are often named by different marker sets in the two species (for example B220 in mouse, CD19 and CD10 in human B-cell precursors).']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scD9(n){
  const rows=[['1956','Glick, Chang and Jaap','removing the bursa of Fabricius stops antibody production in chickens'],
   ['1961','Miller','mice thymectomised at birth lack T-cell immunity'],
   ['1965','Cooper and Good','separate bursal (B) and thymic (T) lineages in chickens'],
   ['1987','Kappler and Marrack','T cells reactive to self MHC products are deleted in the thymus'],
   ['1988–89','Goodnow; Nemazee and Bürki','B-cell anergy and deletion in transgenic mice'],
   ['1993','Tiegs, Gay, Nemazee and colleagues','receptor editing of self-reactive B cells'],
   ['2002','Anderson and colleagues','AIRE drives expression of tissue antigens in the thymus']];
  const t=wtable(n,['Year','Who','Finding'],rows,n?[[10,7],[66,14],[176,22]]:[[24,8],[100,24],[310,38]],{y0:30,R:n?354:620});
  return {vb:n?slim(t.y+6):wide(t.y+8),s:t.s};
}
const S=[
 {p:1,title:'Random receptors, tested cells',draw:scD1,text:"Gene rearrangement gives every new lymphocyte a receptor made at random. Some of those receptors do not work and some recognise the body's own molecules. Development is a series of tests that keeps the useful cells and removes or silences the dangerous ones."},
 {p:1,title:'B cells in the bone marrow',draw:scD2,text:"B cells develop in the bone marrow. They rearrange the heavy chain first, test it with a stand-in light chain, then rearrange a light chain and appear as immature B cells carrying IgM."},
 {p:1,title:'B-cell subsets',chips:'bsub',draw:scD3,text:"Mature B cells are not all alike. Pick a subset to see where it lives and what kind of antigen it answers."},
 {p:2,title:'T cells in the thymus',draw:scD4,text:"T-cell precursors leave the bone marrow for the thymus. There they rearrange their receptor genes, pass through a stage carrying both CD4 and CD8, and leave as cells carrying one or the other."},
 {p:2,title:'Positive and negative selection',draw:scD5,text:"A developing T cell's fate depends on how strongly its receptor binds self peptides on self MHC. Too weak and it dies of neglect; moderate and it survives; too strong and it is deleted or diverted."},
 {p:3,title:'Tolerance in B cells',draw:scD6,text:"An immature B cell whose receptor binds a self antigen in the bone marrow can edit its receptor, be deleted, or be made unresponsive. Tolerance continues in the periphery."},
 {p:3,title:'AIRE and thymic regulatory T cells',draw:scD7,text:"Cells in the thymic medulla make proteins normally found only in other tissues, under the control of the AIRE gene, so that T cells can be tested against them. Some self-reactive cells become regulatory T cells instead of being deleted."},
 {p:4,title:'Mouse and human',draw:scD8,text:"The main stages are shared, but some subsets and timings differ between mouse and human, and much of the subset biology was worked out in mice."},
 {p:4,title:'How it was found',draw:scD9,text:"The roles of the thymus and the bursa were found in the 1950s and 1960s. Clonal deletion, anergy and receptor editing were each shown directly in mice between 1987 and 1993, much of it in transgenic mice, and AIRE was linked to thymic tolerance in 2002."}];
let bsubSel=0;
const CHIPS={bsub:{list:['Follicular','Marginal zone','B-1'],get:()=>bsubSel,set:k=>bsubSel=k}};
