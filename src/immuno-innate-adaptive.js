/*META
{"title":"Innate Instructs Adaptive","eyebrow":"Immunology · an animated primer","h1":"How innate recognition switches on adaptive immunity","parts":["The problem","Pattern recognition","Dendritic cells","Three signals"],"foot":"Textbook level (Janeway, Abbas); receptor lists and cell markers are the commonly taught ones, simplified.","description":"Why adaptive immunity needs innate signals, receptor families, dendritic cells, migration to the lymph node, and signals 1, 2 and 3."}
META*/
const PRRS=[
 {k:'TLRs, surface',h:'Toll-like receptors on the cell surface',rows:[['Examples','TLR2 (with TLR1 or TLR6), TLR4, TLR5'],['Ligands','bacterial lipoproteins, lipopolysaccharide, flagellin'],['Adaptor','MyD88; TLR4 also uses TRIF'],['Output','NF-κB and inflammatory cytokines']]},
 {k:'TLRs, endosomal',h:'Toll-like receptors in endosomes',rows:[['Examples','TLR3, TLR7, TLR8, TLR9'],['Ligands','viral and bacterial nucleic acids'],['Adaptor','TRIF (TLR3); MyD88 (TLR7, 8, 9)'],['Output','type I interferons and cytokines']]},
 {k:'CLRs',h:'C-type lectin receptors',rows:[['Examples','Dectin-1, Dectin-2, Mincle'],['Ligands','fungal β-glucans and mannans, mycobacterial glycolipids'],['Adaptor','Syk kinase, then CARD9'],['Output','cytokines that favour Th17 responses']]},
 {k:'NLRs',h:'NOD-like receptors in the cytosol',rows:[['Examples','NOD1, NOD2; NLRP3 and NLRC4'],['Ligands','peptidoglycan fragments; signs of cell stress'],['Adaptor','RIPK2 (NODs); ASC (inflammasomes)'],['Output','NF-κB; caspase-1, IL-1β and IL-18']]},
 {k:'RLRs',h:'RIG-I-like receptors in the cytosol',rows:[['Examples','RIG-I, MDA5'],['Ligands','viral RNA in the cytoplasm'],['Adaptor','MAVS on mitochondria'],['Output','type I interferons']]},
 {k:'cGAS–STING',h:'cytosolic DNA sensing',rows:[['Sensor','cGAS'],['Ligand','DNA in the cytoplasm'],['Adaptor','cGAMP activates STING'],['Output','type I interferons']]}];
let prrSel=0;
function stub(n,t){return {vb:n?slim(120):wide(120),s:T(n?180:320,60,t,'note mid f13')};}
function scA1(n){return introPlate(n,{q:'How does a T cell know that an antigen is worth responding to?',
  belief:'A naive T cell cannot tell a microbial peptide from a harmless one by its sequence alone. Innate cells, above all dendritic cells, sense microbes through pattern-recognition receptors and tell the T cell three things: what the antigen is, that it is dangerous, and what kind of response to make.',
  items:['Why adaptive immunity needs innate help','Pattern-recognition receptors','Dendritic cells in mouse and human','Maturation and migration','Signals 1, 2 and 3'],
  art:(cx,cy)=>blob(cx-60,cy,34,26,PAL.lilac)+T(cx-60,cy+4,'DC','lab mid f13')+blob(cx+60,cy,26,26,PAL.blue)+T(cx+60,cy+4,'T','lab mid f13')
    +arw(cx-24,cy-8,cx+32,cy-8,{w:1.4})+arw(cx-24,cy+4,cx+32,cy+4,{w:1.4})+arw(cx-24,cy+16,cx+32,cy+16,{w:1.4})
    +T(cx,cy-20,'signals 1, 2, 3','note mid f12'),artH:120});}
function scA2(n){
  const N=n?{dc:{x:90,y:150,w:120,t:'dendritic|cell',f:PAL.lilac},t:{x:270,y:150,w:110,t:'naive|T cell',f:PAL.blue}}
    :{dc:{x:150,y:110,w:140,t:'dendritic cell',f:PAL.lilac},t:{x:490,y:110,w:140,t:'naive T cell',f:PAL.blue}};
  const E=[['dc','t','1  peptide–MHC → TCR',{side:-1,off:n?26:22}],['dc','t','2  CD80/CD86 → CD28',{side:1,off:n?6:4}],['dc','t','3  cytokines (IL-12 …)',{side:1,off:n?34:30,blue:1}]];
  let s=G('a-fade',0,flow(N,E));
  const it=[['Signal 1: which antigen','A peptide bound to an MHC molecule is recognised by the T-cell receptor. It gives specificity, but on its own it switches the T cell off rather than on.'],
   ['Signal 2: is it dangerous','Costimulatory molecules, CD80 and CD86 (B7.1 and B7.2), bind CD28 on the T cell. Dendritic cells raise them only after sensing microbes. Signal 1 without signal 2 leads to anergy.'],
   ['Signal 3: what kind of response','Cytokines from the dendritic cell, such as IL-12, steer the T cell towards a particular effector type.']];
  const b=bullets(n?24:30,n?250:200,it,n?44:88,{d0:.6,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scA3(n){
  const rows=[['1973','Steinman and Cohn','describe dendritic cells in mouse spleen'],
   ['1989','Janeway','proposes that innate receptors recognise conserved microbial patterns'],
   ['1994','Matzinger','danger model: responses follow tissue damage, not foreignness alone'],
   ['1996','Lemaitre and colleagues','Toll protects fruit flies against fungal infection'],
   ['1997','Medzhitov and Janeway','a human Toll homologue activates NF-κB'],
   ['1998','Poltorak and colleagues','LPS-unresponsive mice carry Tlr4 mutations']];
  const t=wtable(n,['Year','Who','Finding'],rows,n?[[10,6],[60,14],[170,22]]:[[24,6],[90,22],[290,40]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'Steinman shared the 2011 Nobel Prize with Beutler and Hoffmann, whose work identified the Toll and Toll-like receptors.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scA4(n){
  const c=PRRS[prrSel];
  return explorer(n,{h:c.h,sub:c.k,rows:c.rows,note:'Each family sits where its microbes are found: outside the cell, in endosomes, or in the cytoplasm.'},{y:32});
}
function scA5(n){
  const W=n?360:640, x1=n?20:40, x2=W-(n?20:40), my=n?70:70;
  let s=G('a-fade',0,membraneBand(x1,x2,my,16,{sides:['outside','cytoplasm']}));
  const surf=n?['TLR2','TLR4','TLR5']:['TLR1–TLR2','TLR2–TLR6','TLR4','TLR5'];
  surf.forEach((t,i)=>{const x=x1+60+i*((x2-x1-120)/(surf.length-1));
    s+=G('a-pop',(.3+i*.15).toFixed(2),box(x-6,my-26,12,52,PAL.teal,3)+T(x,my-34,t,'mono mid f11 halo'));});
  const ex=n?180:320, ey=my+(n?120:118), er=n?52:62;
  s+=G('a-fade',.8,`<circle cx="${ex}" cy="${ey}" r="${er}" fill="#F3EEE2" stroke="${INK}" stroke-width="1.4"/>`+T(ex,ey+er+18,'endosome','note mid f12'));
  ['TLR3','TLR7','TLR8','TLR9'].forEach((t,i)=>{const a=Math.PI*(1.15+i*.23), x=ex+(er-10)*Math.cos(a), y=ey+(er-10)*Math.sin(a);
    s+=G('a-pop',(1+i*.12).toFixed(2),T(FX(x),FX(y+4),t,'mono mid f11 halo'));});
  s+=G('a-fade',1.4,T(ex,ey+6,'nucleic acids','note mid f12'));
  const b=bullets(n?24:30,ey+er+44,[['Surface receptors','detect molecules on the outside of microbes: lipoproteins, lipopolysaccharide, flagellin.'],['Endosomal receptors','detect nucleic acids released when microbes are broken down inside the cell. Keeping them in endosomes helps avoid responses to the body\u2019s own DNA and RNA.']],n?44:88,{d0:1.6,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scA6(n){
  const N=n?{a:{x:180,y:40,w:220,t:'step 1: a TLR signal',f:PAL.teal},b:{x:180,y:110,w:240,t:'more NLRP3 and pro-IL-1β made',f:CAT[5]},
      c:{x:180,y:180,w:240,t:'step 2: NLRP3 senses cell stress',f:PAL.teal},d:{x:180,y:250,w:240,t:'NLRP3 + ASC + caspase-1',f:PAL.lilac},
      e:{x:180,y:320,w:240,t:'IL-1β and IL-18 released',f:PAL.gold}}
    :{a:{x:120,y:60,w:170,t:'step 1:|a TLR signal',f:PAL.teal},b:{x:120,y:170,w:170,t:'NLRP3 and|pro-IL-1β made',f:CAT[5]},
      c:{x:330,y:60,w:170,t:'step 2: NLRP3|senses cell stress',f:PAL.teal},d:{x:330,y:170,w:170,t:'inflammasome:|NLRP3, ASC, caspase-1',f:PAL.lilac},
      e:{x:530,y:170,w:150,t:'IL-1β, IL-18|released',f:PAL.gold}};
  const E=[['a','b',''],['b','d',''],['c','d',''],['d','e','']];
  let s=G('a-fade',0,flow(N,E));
  const b=bullets(n?24:30,n?370:240,[['Two signals for safety','The first signal makes the parts; the second assembles them. Requiring both keeps IL-1β from being released by accident.'],['Caspase-1','cuts pro-IL-1β and pro-IL-18 into their active forms, and can also trigger an inflammatory form of cell death called pyroptosis.']],n?44:88,{d0:1,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scA7(n){
  const rows=[['cDC1','CD8α⁺ (lymphoid organs), CD103⁺ (tissues); XCR1, CLEC9A','CD141 (BDCA-3); XCR1, CLEC9A','cross-presents to CD8 T cells; IL-12, Th1'],
   ['cDC2','CD11b⁺, SIRPα⁺','CD1c (BDCA-1)','presents to CD4 T cells; Th2 and Th17'],
   ['pDC','B220, Siglec-H','CD123, CD303 (BDCA-2)','large amounts of type I interferon'],
   ['moDC','from Ly6C-high monocytes','from CD14⁺ monocytes','made during inflammation']];
  const t=n?wtable(n,['Subset','Mouse / human','Main job'],rows.map(r=>[r[0],r[1]+' / '+r[2],r[3]]),[[10,6],[70,22],[230,16]],{y0:30,R:354})
    :wtable(n,['Subset','Mouse','Human','Main job'],rows,[[24,6],[90,24],[300,18],[450,22]],{y0:30,R:620});
  const p=para(n?16:24,t.y+14,'Mouse and human subsets are matched by gene expression and function rather than by the same surface markers. cDC1 depend on the transcription factors IRF8 and BATF3 in both species; cDC2 depend on IRF4.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
const S=[
 {p:1,title:'Two systems, one response',draw:scA1,text:"Adaptive lymphocytes are specific but cannot by themselves tell a dangerous antigen from a harmless one. Innate cells can, because they recognise conserved microbial molecules. This primer follows how that recognition is handed on to T cells."},
 {p:1,title:'Three signals',draw:scA2,text:"A naive T cell needs three signals from a dendritic cell. The first says which antigen, the second says it is worth responding to, and the third says what kind of response to make."},
 {p:1,title:'How the idea arrived',draw:scA3,text:"Dendritic cells were found in 1973. In 1989 Charles Janeway predicted receptors for conserved microbial patterns, and within a decade Toll in flies and Toll-like receptors in mammals were identified."},
 {p:2,title:'Receptor families',chips:'prr',draw:scA4,text:"Innate cells use several families of pattern-recognition receptors. Pick one to see where it sits, what it detects and what it switches on."},
 {p:2,title:'Where Toll-like receptors sit',draw:scA5,text:"Toll-like receptors are placed to match their targets. Those for the outer molecules of microbes sit in the plasma membrane; those for nucleic acids sit in endosomes, where microbes are digested."},
 {p:2,title:'The inflammasome',draw:scA6,text:"Some NOD-like receptors assemble into a large complex called the inflammasome. It needs two steps, one to make its parts and one to assemble them, and its output is the potent inflammatory cytokines IL-1β and IL-18."},
 {p:3,title:'Dendritic-cell subsets',draw:scA7,text:"Dendritic cells come in several subsets with different jobs. Mouse and human subsets carry different surface markers, but they line up by function and by the transcription factors they depend on."}];
const CHIPS={prr:{list:PRRS.map(p=>p.k),get:()=>prrSel,set:k=>prrSel=k}};
