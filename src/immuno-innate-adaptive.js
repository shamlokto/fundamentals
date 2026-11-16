/*META
{"title":"Innate Instructs Adaptive","eyebrow":"Immunology · an animated primer","h1":"How innate recognition switches on adaptive immunity","parts":["The problem","Pattern recognition","Dendritic cells","Three signals"],"foot":"Textbook level (Janeway, Abbas); receptor lists and cell markers are the commonly taught ones, simplified.","description":"Why adaptive immunity needs innate signals, receptor families, dendritic cells, migration to the lymph node, and signals 1, 2 and 3."}
META*/
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
const S=[
 {p:1,title:'Two systems, one response',draw:scA1,text:"Adaptive lymphocytes are specific but cannot by themselves tell a dangerous antigen from a harmless one. Innate cells can, because they recognise conserved microbial molecules. This primer follows how that recognition is handed on to T cells."},
 {p:1,title:'Three signals',draw:scA2,text:"A naive T cell needs three signals from a dendritic cell. The first says which antigen, the second says it is worth responding to, and the third says what kind of response to make."},
 {p:1,title:'How the idea arrived',draw:scA3,text:"Dendritic cells were found in 1973. In 1989 Charles Janeway predicted receptors for conserved microbial patterns, and within a decade Toll in flies and Toll-like receptors in mammals were identified."}];
const CHIPS={};
