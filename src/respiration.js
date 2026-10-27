/*META
{"title":"Respiration and Fermentation","eyebrow":"Metabolism and bioenergetics · an animated primer","h1":"Making ATP with and without an acceptor","parts":["Chemiosmosis","Respiratory chains","Fermentation"],"foot":"Stoichiometries (protons per electron pair, protons per ATP) are typical values and vary with the enzymes present. Redox potentials are in the energy-and-redox primer.","description":"Electron transport chains, chemiosmosis and the proton motive force, ATP synthase, alternative terminal acceptors, and fermentation types with their diagnostic end products."}
META*/
const FERM=[
 {k:'Homolactic',p:'2 lactate',org:'Lactococcus, Streptococcus, many Lactobacillus',atp:2,note:'Pyruvate reduced by lactate dehydrogenase. Basis of yoghurt and cheese; streptococcal lactate acidifies dental plaque.'},
 {k:'Heterolactic',up:'net 1 ATP',p:'lactate + ethanol + CO₂',org:'Leuconostoc, Lactobacillus brevis',atp:1,note:'Uses the phosphoketolase pathway. CO₂ gives the holes in some cheeses and helps sauerkraut ferment.'},
 {k:'Alcoholic',p:'2 ethanol + 2 CO₂',org:'yeast; Zymomonas (via the ED pathway, 1 ATP)',atp:'2 (yeast); 1 (Zymomonas)',note:'Pyruvate decarboxylase then alcohol dehydrogenase. Bread, beer and wine.'},
 {k:'Mixed acid',p:'acetate, lactate, succinate, ethanol, formate → H₂ + CO₂',org:'E. coli, Salmonella, Shigella',atp:2.5,note:'Strongly acidic end products: methyl red positive. Formate hydrogen lyase splits formate to H₂ and CO₂ (gas in Durham tubes).'},
 {k:'Butanediol',p:'2,3-butanediol, ethanol, CO₂, less acid',org:'Enterobacter, Klebsiella, Serratia',atp:2,note:'The intermediate acetoin gives a positive Voges–Proskauer test; less acid, so methyl red negative. Together these tests distinguish E. coli from Klebsiella.'},
 {k:'Butyric / solventogenic',p:'butyrate, acetate, H₂; later acetone and butanol',org:'Clostridium acetobutylicum',atp:3,note:'The acetone–butanol fermentation, developed by Chaim Weizmann during the First World War for acetone.'},
 {k:'Propionic',p:'propionate, acetate, CO₂',org:'Propionibacterium (Cutibacterium)',atp:'about 4',note:'Gives Swiss cheese its holes and flavour.'}];
let fermSel=0;
function scB1(n){return introPlate(n,{q:'How do cells turn the energy of electron flow into ATP?',
  belief:'Respiring cells pump protons across a membrane and let them flow back through ATP synthase; Peter Mitchell called this chemiosmosis. Fermenting cells have no external acceptor and make ATP only from substrate-level phosphorylation. Which a cell does depends on the acceptors available.',
  items:['The proton motive force','ATP synthase','Bacterial respiratory chains','Alternative acceptors','Fermentation and its end products','Yields compared'],
  art:(cx,cy)=>membraneBand(cx-100,cx+100,cy-10,20)+[-50,0,50].map((d,i)=>arw(cx+d,cy+30,cx+d,cy-30,{w:1.4,blue:1})).join('')+T(cx,cy-40,'H⁺ H⁺ H⁺','mono mid f12')+T(cx,cy+52,'electron transport','note mid f11'),artH:140});}
function scB2(n){
  let s='';const y=112, x1=n?8:24, x2=n?352:616, w=n?32:50;
  const X=n?{I:46,Q:94,III:140,c:184,IV:226,A:314}:{I:110,Q:188,III:262,c:332,IV:396,A:488};
  s+=G('a-fade',0,membraneBand(x1,x2,y-14,28)+T(x1+2,y-82,n?'periplasm: P side, + charge, acidic':'periplasm (P side): positive charge, more acidic','note start f12')+T(x1+2,y+102,n?'cytoplasm: N side, − charge, alkaline':'cytoplasm (N side): negative charge, more alkaline','note start f12'));
  const cx=k=>X[k], cplx=(k,lab,col,bot)=>`<rect x="${cx(k)-w/2}" y="${y-26}" width="${w}" height="${26+bot}" rx="7" fill="${col}" stroke="${INK}" class="tint"/>`+Tc(cx(k)+(n?5:8),y+5,lab,'#3A2E22',12,'mono mid','600');
  s+=G('a-fade',.3,cplx('I','I','#A9C4DC',44)+cplx('III','III','#C9A9D6',26)+cplx('IV','IV','#E7A99B',26)
    +`<ellipse cx="${cx('Q')}" cy="${y}" rx="${n?13:16}" ry="10" fill="${PAL.gold}" stroke="${INK}"/>`+Tc(cx('Q'),y+4,'Q','#3A2E22',12,'mono mid','600')
    +`<circle cx="${cx('c')}" cy="${y-42}" r="10" fill="#E8B4A0" stroke="${INK}"/>`+Tc(cx('c'),y-38,'c','#3A2E22',12,'mono mid','600')
    +T(n?6:cx('I'),y+66,'NADH → NAD⁺',(n?'mono start':'mono mid')+' f12')+T(cx('IV')+(n?-4:0),y+50,'½O₂ + 2H⁺ → H₂O','mono mid f12'));
  const e=(x1,y1,x2,y2)=>arw(x1,y1,x2,y2,{red:1,w:1.5,dash:'4 3'});
  s+=G('a-fade',.6,e(cx('I')+w/2,y,cx('Q')-(n?14:17),y)+e(cx('Q')+(n?14:17),y,cx('III')-w/2-2,y)+e(cx('III')+w/2,y-20,cx('c')-10,y-40)+e(cx('c')+10,y-40,cx('IV')-w/2-1,y-20));
  const h=(k,lab)=>arw(cx(k)-w/4,k==='I'?y+38:y+30,cx(k)-w/4,y-44,{blue:1,w:1.4})+T(cx(k)-w/4,y-52,lab,'mono mid f12');
  s+=G('a-fade',.9,h('I','4H⁺')+h('III','4H⁺')+h('IV','2H⁺'));
  const A=cx('A');
  s+=G('a-fade',1.2,`<rect x="${A-17}" y="${y-18}" width="34" height="36" rx="6" fill="${PAL.gold}" stroke="${INK}" class="tint"/>`+ln(A,y+18,A,y+28,INK,3)+`<circle cx="${A}" cy="${y+46}" r="18" fill="${PAL.gold}" stroke="${INK}"/>`
    +Tc(A-6,y+5,'F₀','#3A2E22',12,'mono mid','600')+Tc(A,y+50,'F₁','#3A2E22',12,'mono mid','600')+arw(A+9,y-46,A+9,y+14,{blue:1,w:1.6})+T(A+9,y-52,n?'H⁺ back':'H⁺ flow back','mono mid f12')
    +(n?T(A,y+80,'ADP + Pᵢ','mono mid f12')+T(A,y+94,'→ ATP','mono mid f12'):T(A+24,y+50,'ADP + Pᵢ → ATP','mono start f12')));
  s+=G('a-fade',1.4,T(x1+2,y+124,'red dashed: electrons (2 e⁻ per NADH);  blue: protons','note start f12'));
  const cap=para(x1+2,y+146,'A mitochondrion-like chain (as in Paracoccus) moves about 10 H⁺ out per NADH: 4 at complex I, 4 at III (bc₁, via the Q cycle) and 2 at IV, while O₂ is reduced on the cytoplasmic side. E. coli has no III or IV: its quinol oxidases bo₃ (which pumps) and bd (which does not) take electrons straight from QH₂.',n?52:96,'lab start f13',17,1.5);
  s+=cap.s;
  const b=bullets(n?24:30,cap.y+22,[['Δp = Δψ − (2.3RT/F)·ΔpH','The proton motive force has an electrical part (inside negative) and a chemical part (inside alkaline). In E. coli it is about −150 to −200 mV, mostly Δψ at neutral pH.'],['It powers more than ATP','Flagellar rotation, many transporters, SecDF and Tat protein export, and the uptake of aminoglycosides all run on it.'],['Uncouplers','Molecules that carry protons across the membrane collapse Δp and stop ATP synthesis without stopping electron flow.']],n?44:88,{d0:1.2,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scB3(n){
  const items=[['A rotary motor','Protons flowing through the membrane F₀ part turn a ring of c subunits and the central stalk; the stalk rotates inside the F₁ head, whose three β subunits cycle through binding, making and releasing ATP (Paul Boyer’s binding-change mechanism).'],['Proven by watching it spin','Noji, Yoshida and colleagues (1997) attached an actin filament to the γ stalk and saw it rotate as F₁ hydrolysed ATP; 120° steps were resolved in 1998.'],['Stoichiometry','ATP per turn is 3; protons per turn equal the number of c subunits (8 in animal mitochondria, 10 in E. coli, 13–15 in some bacteria and chloroplasts), so about 2.7–5 protons per ATP.'],['Runs both ways','Fermenting bacteria run it backwards, spending ATP to maintain Δp. The anti-tuberculosis drug bedaquiline binds the c ring of mycobacteria.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scB4(n){
  const N=n?{d:{x:80,y:60,w:140,t:'NADH, succinate,|formate, H₂'},q:{x:80,y:250,w:120,t:'quinone|pool',f:PAL.gold},o2:{x:268,y:130,w:150,t:'O₂ oxidases|bo₃, bd',f:PAL.blue},n3:{x:268,y:210,w:150,t:'nitrate|reductase',f:PAL.rose},f:{x:268,y:290,w:150,t:'fumarate|reductase',f:PAL.green},t:{x:268,y:370,w:150,t:'TMAO, DMSO|reductases',f:PAL.lilac}}
   :{d:{x:96,y:150,w:176,t:'NADH, succinate,|formate, H₂, lactate'},q:{x:326,y:150,w:130,t:'quinone pool|(UQ, MK)',f:PAL.gold},o2:{x:500,y:40,w:150,t:'O₂: bo₃ or bd|oxidase',f:PAL.blue},n3:{x:500,y:120,w:150,t:'nitrate|reductase',f:PAL.rose},f:{x:500,y:200,w:150,t:'fumarate|reductase',f:PAL.green},t:{x:500,y:280,w:150,t:'TMAO, DMSO|reductases',f:PAL.lilac}};
  const E=[['d','q',n?'':'dehydro-|genases',{side:-1}],['q','o2',''],['q','n3',''],['q','f',''],['q','t','']];
  let s=G('a-fade',0,flow(N,E));
  const by=n?420:340;
  const b=bullets(n?24:30,by,[['Modular, branched chains','Bacteria mix and match dozens of dehydrogenases and terminal reductases around a shared quinone pool, unlike the fixed mitochondrial chain.'],['A hierarchy','E. coli prefers O₂, then nitrate, then other acceptors, sensed by FNR (oxygen, through its iron–sulfur cluster), ArcBA (the redox state of the quinone pool) and NarXL (nitrate).'],['Two oxidases','Cytochrome bo₃ pumps protons; bd does not but binds O₂ more tightly, used at low oxygen and to tolerate stress.']],n?44:88,{d0:1,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scB5(n){
  const rows=[['O₂','H₂O','aerobes; highest yield'],['NO₃⁻','NO₂⁻, N₂ (denitrification), NH₄⁺','E. coli, Pseudomonas, Paracoccus'],['Fe³⁺, Mn⁴⁺','Fe²⁺, Mn²⁺','Geobacter, Shewanella: extracellular, via cytochromes or nanowires'],['fumarate','succinate','E. coli, Wolinella'],['SO₄²⁻','H₂S','Desulfovibrio, Desulfotomaculum'],['CO₂','CH₄ (methanogenesis), acetate (acetogenesis)','archaeal methanogens; Acetobacterium'],['As(V), U(VI), chlorinated solvents','reduced forms','bioremediation (Dehalococcoides)']];
  const t=wtable(n,['Acceptor','Product','Who'],rows,n?[[10,12],[100,16],[220,18]]:[[24,20],[180,32],[400,34]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+12,'Anaerobic respiration uses an external acceptor other than oxygen. Yields fall as the acceptor’s potential falls, which is why, in sediments, acceptors are used up in order: oxygen, nitrate, manganese, iron, sulfate, then CO₂.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scB6(n){
  const f=FERM[fermSel];
  const N=n?{g:{x:180,y:40,w:120,t:'glucose'},p:{x:180,y:120,w:120,t:'pyruvate',f:PAL.gold},e:{x:180,y:210,w:320,t:f.p.length>34?f.p.replace(/, (?=[^,]*$)/,',|').replace(', formate',',|formate'):f.p,f:PAL.rose}}
    :{g:{x:70,y:60,w:100,t:'glucose'},p:{x:220,y:60,w:100,t:'pyruvate',f:PAL.gold},e:{x:480,y:60,w:250,t:f.p.length>26?f.p.replace(/, /g,',|').split('|').reduce((a,w)=>{const L=a[a.length-1];if((L+' '+w).length>28)a.push(w);else a[a.length-1]=(L?L+' ':'')+w;return a;},['']).join('|'):f.p,f:PAL.rose,fs:11}};
  let s=G('a-fade',0,flow(N,[['g','p',f.up||'2 ATP, 2 NADH',{side:n?-1:1,off:n?12:28}],['p','e','NADH reoxidised',{side:n?-1:1,off:n?12:28}]]));
  const ex=explorer(n,{h:f.k+' fermentation',rows:[['Products',f.p],['Organisms',f.org],['ATP per glucose',String(f.atp)]],note:f.note},{y:n?260:130});
  return {vb:ex.vb,s:s+ex.s};
}
function scB7(n){
  const items=[['aerobic respiration (E. coli)',26,PAL.blue,'~26 ATP'],['nitrate respiration',16,PAL.blue,'~10–20'],['fumarate respiration',4,PAL.green,'~3–5'],['mixed-acid fermentation',2.5,PAL.rose,'~2–3'],['homolactic fermentation',2,PAL.rose,'2']];
  const top=para(n?16:24,30,'ATP per glucose, approximate. Fermentation sacrifices yield for simplicity; the difference is why fermenters must consume far more sugar for the same growth.',n?50:92,'lab start f13',17,0);
  const h=hbars(n,n?10:30,top.y+14,n?340:560,items,{max:30,lw:n?150:200});
  const p=para(n?16:24,h.y+12,'The textbook figure of 36–38 ATP per glucose assumed whole numbers of protons per ATP; current estimates for E. coli and mitochondria are closer to 26–32. In practice, yield depends on which dehydrogenases and oxidases are active.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:top.s+h.s+p.s};
}
const S=[
 {p:1,title:'Two ways to make ATP',draw:scB1,text:"Cells make ATP in two ways. Substrate-level phosphorylation transfers a phosphate directly from a high-energy intermediate. Oxidative phosphorylation uses the energy of electrons flowing to an acceptor to pump protons, then lets them flow back through ATP synthase."},
 {p:1,title:'The proton motive force',draw:scB2,text:"Peter Mitchell proposed in 1961 that respiratory chains pump protons across a membrane, storing energy as a gradient of charge and pH, and that ATP synthase uses that gradient. The idea was resisted for years and won him the 1978 Nobel Prize. The same force drives flagella and transporters."},
 {p:1,title:'ATP synthase',draw:scB3,text:"ATP synthase is a rotary machine. Protons flowing through its membrane ring turn a central stalk, which forces the three catalytic subunits of the head through a cycle of conformations that make ATP. Watching single molecules rotate confirmed Paul Boyer's binding-change model."},
 {p:2,title:'Bacterial respiratory chains',draw:scB4,text:"Bacterial respiratory chains are modular. Many dehydrogenases feed electrons into a shared pool of quinones, and several terminal enzymes pass them to whichever acceptor is available, from oxygen to nitrate, fumarate or DMSO. Regulators choose the best one present."},
 {p:2,title:'Alternative acceptors',draw:scB5,text:"Many bacteria and archaea respire without oxygen, using nitrate, metal oxides, sulfate, fumarate, even CO₂. The lower the acceptor's potential, the less energy is gained. In sediments, acceptors are consumed in order of their energy yield, which layers microbial communities."},
 {p:3,title:'Fermentation types',chips:'ferm',draw:scB6,text:"Without an external acceptor, cells reoxidise NADH by reducing pyruvate or its products, and excrete them. Each group of organisms makes a characteristic set of end products, which is how classical diagnostic tests such as methyl red and Voges–Proskauer distinguish enteric bacteria. Pick a type."},
 {p:3,title:'Yields compared',draw:scB7,text:"Aerobic respiration yields an order of magnitude more ATP per glucose than fermentation. Yet fermentation is faster per unit of enzyme, which is why fast-growing cells sometimes ferment even with oxygen, and why yield and growth rate are different things."}];
const CHIPS={ferm:{list:FERM.map(f=>f.k),get:()=>fermSel,set:k=>fermSel=k}};
