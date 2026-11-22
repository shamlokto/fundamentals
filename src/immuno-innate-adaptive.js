/*META
{"title":"Innate Instructs Adaptive","eyebrow":"Immunology · an animated primer","h1":"How innate recognition switches on adaptive immunity","parts":["The problem","Pattern recognition","Dendritic cells","Three signals"],"foot":"Textbook level (Janeway, Abbas); receptor lists and cell markers are the commonly taught ones, simplified.","description":"Why adaptive immunity needs innate signals, receptor families, dendritic cells, migration to the lymph node, and signals 1, 2 and 3."}
META*/
const PRRS=[
 {k:'TLRs, surface',h:'Toll-like receptors on the cell surface',rows:[['Examples','TLR2 (with TLR1 or TLR6), TLR4, TLR5'],['Ligands','bacterial lipoproteins, lipopolysaccharide, flagellin'],['Adaptor','MyD88; TLR4 also uses TRIF'],['Output','NF-κB and inflammatory cytokines']]},
 {k:'TLRs, endosomal',h:'Toll-like receptors in endosomes',rows:[['Examples','TLR3, TLR7, TLR8, TLR9'],['Ligands','viral and bacterial nucleic acids'],['Adaptor','TRIF (TLR3); MyD88 (TLR7, 8, 9)'],['Output','type I interferons and cytokines']]},
 {k:'CLRs',h:'C-type lectin receptors',rows:[['Examples','Dectin-1, Dectin-2, Mincle'],['Ligands','fungal β-glucans and mannans, mycobacterial glycolipids'],['Adaptor','Syk kinase, then CARD9'],['Output','cytokines that favour Th17 responses']]},
 {k:'NLRs',h:'NOD-like receptors in the cytosol',rows:[['Examples','NOD1, NOD2; NLRP3 and NLRC4'],['Ligands','peptidoglycan fragments (NODs); flagellin and secretion-system proteins (NLRC4); signs of cell stress (NLRP3)'],['Adaptor','RIPK2 (NODs); ASC (inflammasomes)'],['Output','NF-κB; caspase-1, IL-1β and IL-18']]},
 {k:'RLRs',h:'RIG-I-like receptors in the cytosol',rows:[['Examples','RIG-I, MDA5'],['Ligands','viral RNA in the cytoplasm'],['Adaptor','MAVS on mitochondria'],['Output','type I interferons']]},
 {k:'cGAS–STING',h:'cytosolic DNA sensing',rows:[['Sensor','cGAS'],['Ligand','DNA in the cytoplasm'],['Adaptor','STING (on the ER), activated by the second messenger cGAMP'],['Output','type I interferons']]}];
let prrSel=0;
function scA1(n){return introPlate(n,{q:'How does a T cell know that an antigen is worth responding to?',
  belief:'A naive T cell cannot tell a microbial peptide from a harmless one by its sequence alone. Innate cells, above all dendritic cells, sense microbes through pattern-recognition receptors and tell the T cell three things: what the antigen is, that it is dangerous, and what kind of response to make.',
  items:['Why adaptive immunity needs innate help','Pattern-recognition receptors','Dendritic cells in mouse and human','Maturation and migration','Signals 1, 2 and 3'],
  art:(cx,cy)=>blob(cx-60,cy,34,26,PAL.lilac)+T(cx-60,cy+4,'DC','lab mid f13')+blob(cx+60,cy,26,26,PAL.blue)+T(cx+60,cy+4,'T','lab mid f13')
    +arw(cx-24,cy-8,cx+32,cy-8,{w:1.4})+arw(cx-24,cy+4,cx+32,cy+4,{w:1.4})+arw(cx-24,cy+16,cx+32,cy+16,{w:1.4})
    +T(cx,cy-38,'signals 1, 2, 3','note mid f12'),artH:120});}
function scA2(n){
  const W=n?360:640, cw=n?122:170, lx=n?12:40, rx=W-(n?12:40)-cw, top=28, h=196, ys=[96,146,196];
  let s=G('a-fade',0,box(lx,top,cw,h,PAL.lilac,14)+box(rx,top,cw,h,PAL.blue,14)
    +T(lx+cw/2,top+26,n?'DC':'dendritic cell','cname mid')+T(rx+cw/2,top+26,n?'naive T':'naive T cell','cname mid'));
  const L=['peptide–MHC','CD80 / CD86',n?'IL-12':'IL-12 and others'], R=['TCR','CD28',n?'IL-12R':'cytokine receptor'],
    Q=['which antigen','is it dangerous?','what response'];
  ys.forEach((y,i)=>{const d=(.4+i*.4).toFixed(1), x1=lx+cw, x2=rx;
    s+=G('a-fade',d,T(lx+cw/2,y+4,L[i],'mono mid f12')+T(rx+cw/2,y+4,R[i],'mono mid f12')
      +arw(x1+4,y,x2-4,y,{w:1.6,blue:i==2,dash:i==2?'5 4':0})+badge(n?(x1+x2)/2:x1+22,y-16,String(i+1))
      +(n?'':T(x1+36,y-12,Q[i],'note start f12')));});
  s+=G('a-fade',1.6,T(W/2,top+h+22,n?'dashed: a secreted signal':'1 and 2 need cell contact; 3 is secreted (dashed)','note mid f12'));
  const it=[['Signal 1: which antigen','A peptide bound to an MHC molecule is recognised by the T-cell receptor. It gives specificity, but on its own it switches the T cell off rather than on.'],
   ['Signal 2: is it dangerous','Costimulatory molecules, CD80 and CD86 (B7.1 and B7.2), bind CD28 on the T cell. Dendritic cells raise them only after sensing microbes. Signal 1 without signal 2 leads to anergy.'],
   ['Signal 3: what kind of response','Cytokines from the dendritic cell, such as IL-12, steer the T cell towards a particular effector type.']];
  const b=bullets(n?24:30,top+h+52,it,n?44:88,{d0:.6,gap:22});
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
  const p=para(n?16:24,t.y+14,'Steinman shared the 2011 Nobel Prize with Beutler and Hoffmann, for discoveries on the activation of innate immunity: Hoffmann\'s lab showed that Toll defends flies against fungi, and Beutler\'s that TLR4 senses LPS.',n?50:92,'note start f13',17,.8);
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
  const ex=n?180:320, ey=my+(n?122:124), er=n?58:66;
  s+=G('a-fade',.8,`<circle cx="${ex}" cy="${ey}" r="${er}" fill="#F3EEE2" stroke="${INK}" stroke-width="1.4"/>`+T(ex,ey+er+18,'endosome','note mid f12'));
  ['TLR3','TLR7','TLR8','TLR9'].forEach((t,i)=>{const a=Math.PI*(1.2+i*.2), bx=ex+er*Math.cos(a), by=ey+er*Math.sin(a),
      deg=FX(a*180/Math.PI+90), lx=ex+(i%2?24:-24), ly=ey-(i<2?8:-12);
    s+=G('a-pop',(1+i*.12).toFixed(2),`<rect x="${FX(bx-4)}" y="${FX(by-11)}" width="8" height="22" rx="2" fill="${PAL.teal}" stroke="${INK}" stroke-width=".8" transform="rotate(${deg} ${FX(bx)} ${FX(by)})"/>`
      +T(lx,ly,t,'mono mid f11'));});
  s+=G('a-fade',1.4,T(ex,ey+36,'nucleic acids','note mid f12'));
  const b=bullets(n?24:30,ey+er+44,[['Surface receptors','detect molecules on the outside of microbes: lipoproteins, lipopolysaccharide, flagellin.'],['Endosomal receptors','detect nucleic acids released when microbes are broken down inside the cell. Keeping them in endosomes helps avoid responses to the body\u2019s own DNA and RNA.']],n?44:88,{d0:1.6,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scA6(n){
  const N=n?{a:{x:95,y:40,w:160,t:'step 1:|a TLR signal',f:PAL.teal},b:{x:95,y:130,w:160,t:'NLRP3 and|pro-IL-1β made',f:CAT[5]},
      c:{x:265,y:40,w:160,t:'step 2: NLRP3|senses stress',f:PAL.teal},d:{x:265,y:220,w:170,t:'NLRP3 + ASC|+ caspase-1',f:PAL.lilac},
      e:{x:180,y:310,w:220,t:'IL-1β and IL-18 released',f:PAL.gold}}
    :{a:{x:120,y:60,w:170,t:'step 1:|a TLR signal',f:PAL.teal},b:{x:120,y:170,w:170,t:'NLRP3 and|pro-IL-1β made',f:CAT[5]},
      c:{x:330,y:60,w:170,t:'step 2: NLRP3|senses cell stress',f:PAL.teal},d:{x:335,y:170,w:200,t:'inflammasome:|NLRP3, ASC, caspase-1',f:PAL.lilac},
      e:{x:545,y:170,w:140,t:'IL-1β, IL-18|released',f:PAL.gold}};
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
  const p=para(n?16:24,t.y+14,'Mouse and human subsets are matched by gene expression and function rather than by the same surface markers. cDC1 depend on the transcription factor IRF8 (and, at least in mice, BATF3); cDC2 depend on IRF4.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scA8(n){
  const N=n?{a:{x:180,y:40,w:240,t:'immature DC in tissue',f:PAL.lilac},b:{x:180,y:120,w:240,t:'senses microbe',f:PAL.teal},
      c:{x:180,y:200,w:240,t:'mature DC',f:PAL.lilac},d:{x:180,y:280,w:240,t:'lymph node T-cell zone',f:PAL.blue}}
    :{a:{x:80,y:80,w:130,t:'immature DC|in tissue',f:PAL.lilac},b:{x:220,y:80,w:110,t:'senses|microbe',f:PAL.teal},
      c:{x:355,y:80,w:110,t:'mature DC',f:PAL.lilac},d:{x:555,y:80,w:130,t:'lymph node|T-cell zone',f:PAL.blue}};
  const E=n?[['a','b',''],['b','c',''],['c','d','CCR7, lymphatics',{side:1}]]:[['a','b',''],['b','c',''],['c','d','CCR7, along|lymphatics',{side:-1}]];
  let s=G('a-fade',0,flow(N,E));
  return P8B(n,s);
}
function P8B(n,s){
  const rows=[['Antigen uptake','high','low'],['Surface MHC class II','low','high'],['CD80, CD86, CD40','low','high'],['CCR7','absent','present']];
  const t=wtable(n,['','Immature','Mature'],rows,n?[[16,18],[170,10],[260,10]]:[[30,24],[300,12],[450,12]],{y0:n?330:150,d0:.8,R:n?354:620});
  const p=para(n?16:24,t.y+14,'CCR7 guides mature dendritic cells along lymphatics towards CCL19 and CCL21 in the lymph node T-cell zone.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+t.s+p.s};
}
const POL=[
 {k:'IL-12',h:'Th1',rows:[['Made by','cDC1 and macrophages after TLR signals'],['Master factor','T-bet'],['Cytokine','IFN-γ'],['Fights','intracellular bacteria and viruses']]},
 {k:'IL-4',h:'Th2',rows:[['Made by','mainly other cells, such as basophils and T cells'],['Master factor','GATA3'],['Cytokines','IL-4, IL-5, IL-13'],['Fights','helminths; drives allergy']]},
 {k:'IL-6 + TGF-β',h:'Th17',rows:[['Species','mouse recipe; human naive cells also need IL-1β, and the role of TGF-β is debated'],['Made by','cDC2 after fungal or bacterial signals; IL-23 sustains it'],['Master factor','RORγt'],['Cytokine','IL-17'],['Fights','extracellular bacteria and fungi']]},
 {k:'TGF-β + IL-2',h:'induced Treg',rows:[['Made by','tolerogenic DCs, for example in the gut'],['Master factor','Foxp3'],['Cytokines','IL-10, TGF-β'],['Role','restrains responses; tolerance']]},
 {k:'IL-6 + IL-21',h:'Tfh',rows:[['Species','mouse recipe; in humans IL-12 also drives Tfh'],['Made by','DCs, then B cells'],['Master factor','Bcl6'],['Cytokine','IL-21'],['Role','helps B cells make antibody']]}];
let polSel=0;
function scA9(n){const c=POL[polSel];return explorer(n,{h:c.h,sub:'signal 3: '+c.k,rows:c.rows,note:'Simplified; the subsets are covered in their own primer.'},{y:32});}
function scA10(n){
  const items=[['Different TLR sets','Humans have TLR10, which mice lack in working form; mice have TLR11, TLR12 and TLR13, which humans lack.'],['TLR8','In humans TLR8 is a main sensor of single-stranded RNA in monocytes and myeloid DCs; mouse TLR8 contributes much less.'],
   ['Dendritic-cell markers','The same subsets carry different surface markers in the two species (plate 7), so mouse results are mapped onto human cells by function and gene expression.'],['Names','Mouse MHC is H-2; human MHC is HLA. The pathways are shared, but the genes differ in number and detail.']];
  const c=cards(n,items,{y:24});
  const p=para(n?16:24,c.y+12,'Most innate pathways were worked out in mice and then confirmed in human cells; where they differ, check which species a result came from.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:c.s+p.s};
}
const S=[
 {p:1,title:'Two systems, one response',draw:scA1,text:"Adaptive lymphocytes are specific but cannot by themselves tell a dangerous antigen from a harmless one. Innate cells can, because they recognise conserved microbial molecules. This primer follows how that recognition is handed on to T cells."},
 {p:1,title:'Three signals',draw:scA2,text:"A naive T cell needs three signals from a dendritic cell. The first says which antigen, the second says it is worth responding to, and the third says what kind of response to make."},
 {p:1,title:'How the idea arrived',draw:scA3,text:"Dendritic cells were found in 1973. In 1989 Charles Janeway predicted receptors for conserved microbial patterns, and within a decade Toll was shown to defend flies against infection and its mammalian relatives, the Toll-like receptors, were found."},
 {p:2,title:'Receptor families',chips:'prr',draw:scA4,text:"Innate cells use several families of pattern-recognition receptors. Pick one to see where it sits, what it detects and what it switches on."},
 {p:2,title:'Where Toll-like receptors sit',draw:scA5,text:"Toll-like receptors are placed to match their targets. Those for the outer molecules of microbes sit in the plasma membrane; those for nucleic acids sit in endosomes, where microbes are digested."},
 {p:2,title:'The inflammasome',draw:scA6,text:"Some NOD-like receptors assemble into a large complex called the inflammasome. The best-studied, NLRP3, needs two steps, one to make its parts and one to assemble them, and its output is the potent inflammatory cytokines IL-1β and IL-18."},
 {p:3,title:'Dendritic-cell subsets',draw:scA7,text:"Dendritic cells come in several subsets with different jobs. Mouse and human subsets carry different surface markers, but they line up by function and by the transcription factors they depend on."},
 {p:3,title:'Maturation and migration',draw:scA8,text:"A dendritic cell that senses a microbe matures: it stops taking up antigen, raises MHC and costimulatory molecules, and gains CCR7, which carries it to the lymph node."},
 {p:4,title:'Signal 3 steers the response',chips:'pol',draw:scA9,text:"The cytokines present when a T cell is first activated decide what kind of helper it becomes. Pick a cytokine signal to see the subset it favours."},
 {p:4,title:'Mouse and human',draw:scA10,text:"Much of this was first worked out in mice. The logic holds in humans, but the receptor sets and cell markers differ, so it matters which species a result comes from."}];
const CHIPS={pol:{list:POL.map(p=>p.k),get:()=>polSel,set:k=>polSel=k},prr:{list:PRRS.map(p=>p.k),get:()=>prrSel,set:k=>prrSel=k}};
