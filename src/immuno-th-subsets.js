/*META
{"title":"T Helper Subsets","eyebrow":"Immunology · an animated primer","h1":"How one kind of naive T cell becomes several kinds of helper","parts":["Becoming a helper","The subsets","Control","Species and history"],"foot":"Textbook level (Janeway, 9th edition, chapter 9). Subsets are idealised; real cells are more mixed and more plastic than the table suggests.","description":"Naive CD4 T-cell activation, the Th1, Th2, Th17, Tfh and regulatory subsets, their transcription factors and STAT signals, cross-regulation, plasticity, and mouse versus human differences."}
META*/
const SUB=[
 {k:'Th1',rows:[['Made with','IL-12 (and IFN-γ)'],['Master factor','T-bet (STAT4, STAT1)'],['Cytokine','IFN-γ'],['Main job','activates macrophages to kill what they have engulfed; helps CD8 T cells'],['Against','intracellular bacteria such as mycobacteria; viruses'],['Too much','tissue damage, some autoimmunity']]},
 {k:'Th2',rows:[['Made with','IL-4'],['Master factor','GATA3 (STAT6)'],['Cytokines','IL-4, IL-5, IL-13'],['Main job','eosinophils, mast cells, mucus and gut motility; IgE switching'],['Against','helminth worms'],['Too much','allergy and asthma']]},
 {k:'Th17',rows:[['Made with','IL-6 + TGF-β in mice; IL-1β, IL-6 and IL-23 matter in humans'],['Master factor','RORγt (STAT3)'],['Cytokines','IL-17A, IL-17F, IL-22'],['Main job','recruits neutrophils; makes epithelia produce antimicrobial peptides'],['Against','extracellular bacteria and fungi, for example Candida'],['Too much','psoriasis and other inflammatory diseases']]},
 {k:'Tfh',rows:[['Made with','IL-6 and IL-21 in mice; IL-12 also in humans; then contact with B cells'],['Master factor','Bcl6 (STAT3)'],['Cytokine','IL-21 (with IL-4 or IFN-γ)'],['Main job','helps B cells in germinal centres through CD40L and IL-21'],['Where','B-cell follicles, guided by CXCR5'],['Too much','antibody-driven autoimmunity']]},
 {k:'Treg',rows:[['Made with','TGF-β + IL-2 (induced Treg); also made in the thymus'],['Master factor','Foxp3 (STAT5)'],['Cytokines','IL-10, TGF-β'],['Main job','suppresses other T cells; keeps tolerance'],['Marker','high CD25 (the IL-2 receptor α chain)'],['Too little','multi-organ autoimmunity (IPEX; scurfy mice)']]}];
let subSel=0;
function scH1(n){return introPlate(n,{q:'Why does a naive helper T cell not always make the same response?',
  belief:'A naive CD4 T cell is uncommitted. The cytokines present when it is first activated switch on one master transcription factor, which largely sets the cytokines it will go on to make and so the kind of immunity it calls up.',
  items:['Activation of a naive CD4 T cell','Th1, Th2, Th17, Tfh and Treg','Master factors and STAT signals','Cross-regulation and plasticity','Mouse and human differences'],
  art:(cx,cy)=>blob(cx,cy,24,22,CAT[6])+T(cx,cy+4,'CD4','lab mid f12')+[-110,-55,0,55,110].map((d,i)=>arw(cx+d*.25,cy+20,cx+d,cy+52,{w:1.1})+blob(cx+d,cy+66,16,14,CAT[i])).join(''),artH:140});}
function scH2(n){
  const N=n?{dc:{x:180,y:40,w:200,t:'dendritic cell|presents peptide',f:CAT[3]},t:{x:180,y:120,w:200,t:'naive CD4 T cell|signals 1 and 2',f:CAT[6]},c:{x:180,y:200,w:200,t:'signal 3: cytokines|in the lymph node',f:CAT[2]},m:{x:180,y:280,w:200,t:'master factor|switched on',f:CAT[1]},e:{x:180,y:360,w:200,t:'divides; effector|and memory cells',f:CAT[0]}}
    :{dc:{x:100,y:60,w:160,t:'dendritic cell|presents peptide',f:CAT[3]},t:{x:310,y:60,w:170,t:'naive CD4 T cell|signals 1 and 2',f:CAT[6]},c:{x:530,y:60,w:160,t:'signal 3:|cytokines',f:CAT[2]},m:{x:530,y:170,w:160,t:'master factor|switched on',f:CAT[1]},e:{x:300,y:170,w:200,t:'divides into effector|and memory cells',f:CAT[0]}};
  const E=[['dc','t','',{}],['t','c','',{}],['c','m','',{}],['m','e','',{}]];
  let s=G('a-fade',0,flow(N,E));
  const it=[['IL-2 and expansion','Once activated, the T cell makes IL-2 and the high-affinity IL-2 receptor and divides many times over a few days.'],
   ['Where the cytokines come from','Mostly from the dendritic cell, reflecting what it sensed: IL-12 after many bacteria and viruses, IL-6 and IL-23 after fungi and extracellular bacteria. The source of IL-4 for Th2 cells is less clear.'],
   ['Commitment','Over several rounds of division the master factor remodels the cell\'s chromatin, so the choice becomes stable.']];
  const b=bullets(n?24:30,n?420:240,it,n?44:88,{d0:.6,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scH3(n){const c=SUB[subSel];return explorer(n,{h:c.k,sub:'CD4 T-cell subset',rows:c.rows,note:'Idealised: many cells make cytokines of more than one subset, and the regulatory and Tfh subsets overlap with the others.'},{y:32});}
function scH4(n){
  const W=n?360:640;
  const P=n?{t1:[90,70],t2:[270,70],t17:[90,190],tr:[270,190]}:{t1:[150,70],t2:[490,70],t17:[150,200],tr:[490,200]};
  const node=(k,lab,f)=>{const [x,y]=P[k];return box(x-(n?60:80),y-20,n?120:160,40,f,4)+T(x,y+5,lab,'mono mid f12');};
  let s=G('a-pop',.1,node('t1','Th1: T-bet',CAT[0])+node('t2','Th2: GATA3',CAT[1])+node('t17','Th17: RORγt',CAT[2])+node('tr','Treg: Foxp3',CAT[3]));
  const off=n?62:82;
  s+=G('a-fade',.6,inh(P.t1[0]+off,P.t1[1]-8,P.t2[0]-off,P.t2[1]-8,{})+inh(P.t2[0]-off,P.t2[1]+8,P.t1[0]+off,P.t1[1]+8,{})
    +inh(P.t17[0]+off,P.t17[1]-8,P.tr[0]-off,P.tr[1]-8,{dash:'4 3'})+inh(P.tr[0]-off,P.tr[1]+8,P.t17[0]+off,P.t17[1]+8,{dash:'4 3'}));
  s+=G('a-fade',.9,T((P.t1[0]+P.t2[0])/2,P.t1[1]-24,'IFN-γ ⊣ Th2;  IL-4 ⊣ Th1','note mid f12')+T((P.t17[0]+P.tr[0])/2,P.t17[1]-24,'balanced by IL-6 vs IL-2','note mid f12'));
  const it=[['Self-reinforcing','Each subset\'s cytokine strengthens its own master factor: IFN-γ boosts T-bet, IL-4 boosts GATA3.'],
   ['Mutually inhibiting','T-bet and GATA3 suppress each other, so a response tends to tip one way and stay there.'],
   ['Th17 and Treg','Both need TGF-β. IL-6 tips cells towards Th17, while IL-2 and retinoic acid tip them towards Treg.']];
  const b=bullets(n?24:30,n?250:260,it,n?44:88,{d0:1,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scH5(n){
  const rows=[['Th1','STAT4 and STAT1','IL-12, IFN-γ'],['Th2','STAT6','IL-4'],['Th17','STAT3','IL-6, IL-21, IL-23'],['Tfh','STAT3','IL-6, IL-21'],['Treg','STAT5','IL-2']];
  const t=wtable(n,['Subset','STAT','Driven by'],rows,n?[[10,8],[90,14],[210,16]]:[[24,10],[160,22],[380,26]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'Cytokine receptors signal through JAK kinases, which phosphorylate STAT transcription factors. Each polarising cytokine activates a characteristic STAT, which helps switch on the matching master factor.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scH6(n){
  const items=[['Plasticity','Subsets are less fixed than once thought. Th17 cells can turn into IFN-γ-making “ex-Th17” cells, and some Treg cells lose Foxp3 under strong inflammation.'],
   ['Memory','After the infection is cleared most effector cells die, but memory cells remain. Central memory cells keep CCR7 and patrol lymph nodes; effector memory cells lack it and patrol tissues.'],
   ['Tissue residents','Some memory T cells settle permanently in barrier tissues such as skin and gut, ready to respond at the site of a repeat infection.'],
   ['Help for CD8 T cells','CD4 help, through CD40L on dendritic cells and IL-2, is needed for strong CD8 memory.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scH7(n){
  const items=[['Where the idea came from','The Th1/Th2 split was first seen in mouse T-cell clones (Mosmann and Coffman, 1986); human cells show it less cleanly.'],
   ['Antibody read-outs','In mice, Th1 help favours IgG2a (IgG2c in C57BL/6) and Th2 help favours IgG1 and IgE. Human subclasses do not map one-to-one onto these.'],
   ['Th17','Mouse Th17 cells can be made with IL-6 and TGF-β; human naive cells also need IL-1β, and IL-23 sustains them in both.'],
   ['Tfh','IL-6 and IL-21 drive mouse Tfh cells; in humans IL-12 is also a strong inducer.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scH8(n){
  const rows=[['1986','Mosmann and Coffman','mouse helper clones fall into two cytokine types, Th1 and Th2'],
   ['1995','Sakaguchi and colleagues','CD25⁺ CD4 cells prevent autoimmunity in mice'],
   ['2000–01','Breitfeld; Schaerli; Kim and colleagues','CXCR5⁺ follicular helper T cells described'],
   ['2003','three groups','Foxp3 is the master factor of regulatory T cells'],
   ['2005','Harrington; Park and colleagues','Th17 cells identified as a separate lineage'],
   ['2009','three groups','Bcl6 is the master factor of Tfh cells']];
  const t=wtable(n,['Year','Who','Finding'],rows,n?[[10,7],[66,14],[176,22]]:[[24,8],[100,24],[310,38]],{y0:30,R:n?354:620});
  return {vb:n?slim(t.y+6):wide(t.y+8),s:t.s};
}
const S=[
 {p:1,title:'One cell, several fates',draw:scH1,text:"Naive CD4 T cells are all alike, but the helpers they become are not. This primer follows how the cytokines present at activation decide which kind of helper a cell becomes."},
 {p:1,title:'From naive cell to helper',draw:scH2,text:"A naive CD4 T cell activated by a dendritic cell receives the third signal as cytokines. They switch on one master transcription factor, and the cell divides into effector and memory cells of that type."},
 {p:2,title:'The subsets',chips:'sub',draw:scH3,text:"Five helper types are taught as the main subsets. Pick one to see what makes it, the transcription factor that defines it, the cytokines it makes and what it is for."},
 {p:3,title:'Cross-regulation',draw:scH4,text:"The subsets reinforce themselves and hold each other back. Th1 and Th2 inhibit each other; Th17 and regulatory T cells share a requirement for TGF-β and are balanced by other cytokines."},
 {p:3,title:'STAT signals',draw:scH5,text:"Each polarising cytokine works through a particular STAT transcription factor, which helps switch on the matching master factor."},
 {p:3,title:'Plasticity and memory',draw:scH6,text:"Helper subsets are not completely fixed, and after an infection a population of memory cells remains, some in lymph nodes and some living in tissues."},
 {p:4,title:'Mouse and human',draw:scH7,text:"The subset scheme was built largely from mouse experiments. The same subsets exist in humans, but the cytokines that make them and the antibodies they favour differ in detail."},
 {p:4,title:'How the subsets were found',draw:scH8,text:"The idea began with two types of mouse T-cell clone in 1986 and grew as regulatory, follicular and Th17 cells were each identified, with a master transcription factor for each."}];
const CHIPS={sub:{list:SUB.map(s=>s.k),get:()=>subSel,set:k=>subSel=k}};
