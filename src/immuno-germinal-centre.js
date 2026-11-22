/*META
{"title":"The Germinal Centre","eyebrow":"Immunology · an animated primer","h1":"Where B cells improve their antibodies and decide what to become","parts":["Starting a response","Inside the germinal centre","Outcomes","Species and history"],"foot":"Textbook level (Janeway, 9th edition, chapter 10). Zone names and timings are simplified; most mechanistic work comes from mouse immunisation models.","description":"T-cell help at the follicle border, extrafollicular and germinal-centre responses, dark and light zones, AID and somatic hypermutation, selection and affinity maturation, and the plasma-cell or memory fate."}
META*/
const FATE=[
 {k:'Plasma cell',rows:[['What it does','secretes large amounts of antibody; stops dividing'],['Factors','Blimp-1, IRF4 and XBP1 switch on; Pax5 and Bcl6 switch off'],['Lifespan','short-lived in lymphoid tissue, or long-lived in bone-marrow niches'],['Favoured by','high-affinity receptors and strong T-cell help']]},
 {k:'Memory B cell',rows:[['What it does','circulates quietly; responds fast to a second exposure'],['Receptor','mutated and class-switched, but often of lower affinity than plasma cells'],['Lifespan','years to decades'],['Favoured by','weaker help, earlier exit from the germinal centre']]},
 {k:'Another round',rows:[['What it does','returns to the dark zone to divide and mutate again'],['Why','repeated cycles let affinity climb step by step'],['Signal','T-cell help in the light zone, in proportion to the antigen the cell presented'],['Limit','cells that win no help die by apoptosis']]}];
let fateSel=0;
function scG1(n){return introPlate(n,{q:'Why are antibodies made late in a response, or after a booster, so much better than the first ones?',
  belief:'In germinal centres, activated B cells divide rapidly while mutating their antibody genes. Cells whose mutations improve binding capture more antigen, win more help from T cells and survive. The antibodies made weeks later bind far more tightly than those made in the first days.',
  items:['T-cell help at the follicle border','Extrafollicular and germinal-centre responses','Dark and light zones','AID and somatic hypermutation','Selection and affinity maturation','Plasma cell or memory cell'],
  art:(cx,cy)=>`<circle cx="${cx}" cy="${cy}" r="52" fill="${CAT[6]}" stroke="${INK}"/>`+`<path d="M${cx-52} ${cy} a52 52 0 0 1 104 0 z" fill="${CAT[0]}" stroke="${INK}"/>`+T(cx,cy-18,'dark zone','note mid f12')+T(cx,cy+24,'light zone','note mid f12'),artH:130});}
function scG2(n){
  const N=n?{b:{x:180,y:40,w:220,t:'B cell binds antigen|in the follicle',f:CAT[0]},t:{x:180,y:120,w:220,t:'meets its helper T cell|at the T–B border',f:CAT[1]},x:{x:90,y:210,w:150,t:'extrafollicular|plasmablasts',f:CAT[2]},g:{x:270,y:210,w:150,t:'germinal|centre',f:CAT[3]}}
    :{b:{x:110,y:60,w:180,t:'B cell binds antigen|in the follicle',f:CAT[0]},t:{x:330,y:60,w:200,t:'meets its helper T cell|at the T–B border',f:CAT[1]},x:{x:230,y:170,w:180,t:'extrafollicular|plasmablasts',f:CAT[2]},g:{x:460,y:170,w:160,t:'germinal|centre',f:CAT[3]}};
  const E=[['b','t','',{}],['t','x','',{}],['t','g','',{}]];
  let s=G('a-fade',0,flow(N,E));
  const it=[['Linked recognition','The B cell takes up antigen through its receptor, presents peptides from it on class II, and is helped by a T cell that recognises one of those peptides. The two cells need not recognise the same part of the antigen.'],
   ['Two paths','Some activated B cells become short-lived plasmablasts outside the follicle, giving a fast first wave of mostly low-affinity antibody. Others enter the follicle with their Tfh partners and form a germinal centre.'],
   ['Timing','Germinal centres appear about a week after immunisation and can last for weeks.']];
  const b=bullets(n?24:30,n?290:240,it,n?44:88,{d0:.6,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scG3(n){
  const cx=n?180:180, cy=n?120:130, R=n?90:100;
  let s=G('a-fade',0,`<circle cx="${cx}" cy="${cy}" r="${R}" fill="${CAT[6]}" stroke="${INK}" stroke-width="1.4"/>`+`<path d="M${cx-R} ${cy} a${R} ${R} 0 0 1 ${2*R} 0 z" fill="${CAT[0]}" stroke="${INK}" stroke-width="1.4"/>`);
  s+=G('a-fade',.3,T(cx,cy-R/2,'dark zone','lab mid f13')+T(cx,cy-R/2+18,'divide and mutate','note mid f12')+T(cx,cy+R/2-6,'light zone','lab mid f13')+T(cx,cy+R/2+12,'tested for binding','note mid f12'));
  s+=G('a-fade',.6,arw(cx+R*0.55,cy-12,cx+R*0.55,cy+22,{w:1.6})+arw(cx-R*0.55,cy+22,cx-R*0.55,cy-12,{w:1.6}));
  const it=[['Dark zone','Centroblasts divide every few hours and express AID, which mutates their antibody V-region genes.'],
   ['Light zone','Centrocytes stop dividing and test their new receptors against antigen held on follicular dendritic cells, then compete for help from Tfh cells.'],
   ['Cycling','Cells that win help return to the dark zone for more rounds; the rest die.']];
  const b=bullets(n?24:330,n?cy+R+24:40,it,n?44:40,{d0:.9,gap:20});
  const h=n?b.y:Math.max(b.y,cy+R+20);
  return {vb:n?slim(h-4):wide(h),s:s+b.s};
}
function scG4(n){
  const items=[['What AID does','Activation-induced cytidine deaminase turns cytosine into uracil in DNA, but only in actively transcribed antibody genes.'],
   ['Somatic hypermutation','Error-prone repair of those lesions in the V regions introduces point mutations at about a million times the normal rate, roughly one per V region per division.'],
   ['Class switching','The same enzyme acting on switch regions starts the DNA breaks that join a new constant region to the V region (primer 7).'],
   ['Without AID','Mice and people lacking AID make IgM but no switched antibody and no mutated receptors; in humans this is a form of hyper-IgM syndrome.']];
  const c=cards(n,items,{y:24});
  const p=para(n?16:24,c.y+12,'Muramatsu, Honjo and colleagues identified AID in 2000 and showed it was needed for both processes.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:c.s+p.s};
}
function scG5(n){
  const A=axes(n?62:70,n?40:40,n?274:500,n?150:170,{xr:[0,6],yr:[0,4],xt:[0,2,4,6],yt:[],xlab:'weeks after immunisation',ylab:'average affinity (illustrative)'});
  let s=G('a-fade',0,A.s);
  s+=G('a-draw',.4,curve(A,x=>0.5+2.1*(1-Math.exp(-x/1.5))+(x>4?1.1*(1-Math.exp(-(x-4)/0.7)):0),{col:BLUE}));
  s+=G('a-fade',.8,`<line x1="${A.px(4)}" y1="${A.py(0)}" x2="${A.px(4)}" y2="${A.py(3.9)}" stroke="${INK}" stroke-dasharray="4 3" stroke-width="1"/>`+T(A.px(4)+6,A.py(3.75),'booster','note start f12'));
  const it=[['Capture and present','A centrocyte with a better receptor pulls more antigen off follicular dendritic cells and shows more peptide–MHC to Tfh cells.'],
   ['Win help','More peptide–MHC wins more CD40L and IL-21 from the Tfh cell, and the cell is sent back to divide more.'],
   ['Affinity maturation','Over weeks, average affinity rises, often by 10- to 100-fold or more; boosters push it further. Eisen and Siskind measured the rise in 1964.']];
  const b=bullets(n?24:30,n?250:270,it,n?44:88,{d0:.9,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scG6(n){const c=FATE[fateSel];return explorer(n,{h:c.k,sub:'outcome for a light-zone B cell',rows:c.rows,note:'How a cell chooses among these fates is still being worked out; the strength of help and of receptor signalling both matter.'},{y:32});}
function scG7(n){
  const items=[['Bone-marrow niches','Long-lived plasma cells settle beside stromal cells that provide CXCL12, IL-6 and APRIL, and can survive there for years without dividing.'],
   ['Lasting antibody','They maintain serum antibody long after an infection or vaccine; antibody to some vaccines is still measurable after decades.'],
   ['Memory on recall','Memory B cells respond to a second exposure within days, making switched, high-affinity antibody, and can re-enter germinal centres.'],
   ['Why boosters work','A booster recalls memory cells, starts new germinal-centre rounds and replenishes the long-lived plasma-cell pool.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scG8(n){
  const items=[['Where they are studied','In mice, germinal centres are studied in spleen and lymph nodes after defined immunisations, with reporter mice to track cells; in humans, mainly in tonsils, lymph-node samples and blood.'],
   ['Chronic germinal centres','Human gut and tonsil tissue carry germinal centres almost continuously, driven by the microbiota; specific-pathogen-free mice have fewer.'],
   ['Antibody classes','The switched classes made differ: mice have IgG1, IgG2a or IgG2c, IgG2b and IgG3; humans IgG1–4 and two IgA subclasses.'],
   ['Lifespan','Human long-lived plasma cells can last a lifetime; mouse studies follow months.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scG9(n){
  const rows=[['1964','Eisen and Siskind','antibody affinity rises during an immune response'],
   ['1966–68','Claman; Mitchell and Miller','thymus-derived and marrow-derived cells cooperate to make antibody'],
   ['1991','Jacob, Kelsoe and colleagues','somatic hypermutation happens in germinal centres'],
   ['2000','Muramatsu, Honjo and colleagues','AID is needed for hypermutation and class switching'],
   ['2010','Victora, Nussenzweig and colleagues','live imaging shows T-cell help selects light-zone B cells']];
  const t=wtable(n,['Year','Who','Finding'],rows,n?[[10,7],[66,14],[176,22]]:[[24,8],[100,24],[310,38]],{y0:30,R:n?354:620});
  return {vb:n?slim(t.y+6):wide(t.y+8),s:t.s};
}
const S=[
 {p:1,title:'Better antibodies over time',draw:scG1,text:"The antibodies made early in a response bind their antigen weakly; those made weeks later, or after a booster, bind it far more tightly. Most of that improvement happens in germinal centres."},
 {p:1,title:'Help at the follicle border',draw:scG2,text:"An activated B cell meets a helper T cell at the edge of the follicle. Some of its progeny become plasmablasts at once; others enter the follicle with their Tfh partners and start a germinal centre."},
 {p:2,title:'Dark and light zones',draw:scG3,text:"A germinal centre has two zones. In the dark zone B cells divide and mutate their antibody genes; in the light zone they test the new receptors and compete for help."},
 {p:2,title:'AID',draw:scG4,text:"One enzyme, AID, drives both somatic hypermutation and class switching by damaging the DNA of antibody genes in a controlled way."},
 {p:2,title:'Selection and affinity maturation',draw:scG5,text:"Cells whose mutations improve binding capture more antigen, present more peptide, win more T-cell help and go round again. Average affinity climbs over weeks."},
 {p:3,title:'What a B cell becomes',chips:'fate',draw:scG6,text:"A light-zone B cell has three possible outcomes besides death. Pick one to see what it means."},
 {p:3,title:'Long-lived antibody and memory',draw:scG7,text:"Long-lived plasma cells in the bone marrow keep antibody in the blood for years, and memory B cells respond fast to a second exposure."},
 {p:4,title:'Mouse and human',draw:scG8,text:"Most of the mechanism comes from mouse experiments; human germinal centres are studied mainly in tonsils and blood, and the antibody classes made differ between the species."},
 {p:4,title:'How it was found',draw:scG9,text:"Affinity maturation was measured in 1964. Germinal centres were shown to be the site of hypermutation in 1991, AID was found in 2000, and live imaging showed selection at work in 2010."}];
const CHIPS={fate:{list:FATE.map(f=>f.k),get:()=>fateSel,set:k=>fateSel=k}};
