/*META
{"title":"Energy and Redox","eyebrow":"Chemistry of life · an animated primer","h1":"Where a cell's energy comes from","parts":["Free energy","Redox","Living on small margins"],"foot":"Potentials are standard biochemical values (pH 7, 25 °C) rounded as usually tabulated; real ΔG depends on concentrations, as the last part shows.","description":"Free energy, coupling, redox potentials and the electron tower, with an interactive tower."}
META*/
const RT=2.48, F=96.485, sg=v=>(v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(2);
const COUPLES=[
 {k:'CO2/glucose',ox:'CO₂',red:'glucose',E:-0.43},
 {k:'2H+/H2',ox:'2H⁺',red:'H₂',E:-0.42},
 {k:'NAD/NADH',ox:'NAD⁺',red:'NADH',E:-0.32},
 {k:'CO2/acetate',ox:'CO₂',red:'acetate',E:-0.29},
 {k:'S0/H2S',ox:'S⁰',red:'H₂S',E:-0.27},
 {k:'CO2/CH4',ox:'CO₂',red:'CH₄',E:-0.24},
 {k:'SO4/H2S',ox:'SO₄²⁻',red:'H₂S',E:-0.22},
 {k:'fum/succ',ox:'fumarate',red:'succinate',E:0.03},
 {k:'NO3/NO2',ox:'NO₃⁻',red:'NO₂⁻',E:0.42},
 {k:'NO2/NH4',ox:'NO₂⁻',red:'NH₄⁺',E:0.44},
 {k:'NO3/N2',ox:'NO₃⁻',red:'N₂',E:0.74},
 {k:'Fe3/Fe2',ox:'Fe³⁺',red:'Fe²⁺ (pH 2)',E:0.77},
 {k:'O2/H2O',ox:'½O₂',red:'H₂O',E:0.82}];
const CP=Object.fromEntries(COUPLES.map(c=>[c.k,c]));
function tower(n,x,y,h,hiD,hiA){
  const ey=E=>y+(E+0.5)/1.4*h; let s='';
  s+=`<rect x="${x}" y="${y}" width="${n?18:22}" height="${h}" fill="url(#csg)" stroke="${INK}"/>`;
  [-0.4,-0.2,0,0.2,0.4,0.6,0.8].forEach(v=>{s+=ln(x-4,FX(ey(v)),x,FX(ey(v)),'#6A5B47')+T(x-7,FX(ey(v)+3.5),(v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(1),'note end f10');});
  s+=`<text transform="translate(${x-(n?34:38)} ${y+h/2}) rotate(-90)" class="note mid f11">E°′ (volts)</text>`;
  const used=[];
  COUPLES.forEach(c=>{let yy=ey(c.E);while(used.some(u=>Math.abs(u-yy)<13))yy+=13;used.push(yy);
    const hi=c.k===hiD||c.k===hiA, col=c.k===hiD?'#A4473A':c.k===hiA?'#2F5276':'#3A2E22';
    s+=ln(x+(n?18:22),FX(ey(c.E)),x+(n?30:38),FX(yy),hi?col:'#9A8E78',hi?1.6:.8)
      +T(x+(n?34:42),FX(yy+4),`${c.ox}/${c.red}`,(hi?'lab':'note')+' start '+(n?'f10':'f11')+' halo').replace('class="','style="fill:'+col+'" class="');});
  return {s,ey};
}
/* ---- plates ---- */
function scE1(n){return introPlate(n,{q:'Why can some reactions power a cell while others cannot run at all?',
  belief:'Every organism, from a soil chemolithotroph to a human cell, makes its living by moving electrons from a donor to an acceptor and capturing part of the energy released. Two quantities decide what is possible: free energy and redox potential.',
  items:['Free energy and equilibrium','Coupling and ATP','Redox potentials and ΔG','The electron tower','Small margins and syntrophy'],
  art:(cx,cy)=>{const top=cy-80,bot=cy+80;return `<rect x="${cx-12}" y="${top}" width="24" height="${bot-top}" fill="url(#csg)" stroke="${INK}"/>`
    +T(cx+22,top+8,'NADH','lab start f13')+T(cx+22,top+24,'−0.32 V','note start f11')+T(cx+22,bot-14,'O₂','lab start f13')+T(cx+22,bot+2,'+0.82 V','note start f11')
    +`<path d="M${cx-30} ${top+10} V${bot-14}" stroke="#A4473A" stroke-width="2.6" marker-end="url(#ahr)"/>`+T(cx-38,cy+4,'e⁻','mono end f13')+T(cx,bot+26,'−220 kJ/mol per 2 e⁻','note mid f11');},artH:200});}

function scE2(n){
  let s='',y=30;
  const eq=[['ΔG = ΔH − TΔS','Whether a reaction can go depends on the change in free energy. It must be negative.'],
    ['ΔG = ΔG°′ + RT ln Q','The actual ΔG depends on concentrations. Q is the ratio of products to reactants as they are now.'],
    ['ΔG°′ = −RT ln K′','At equilibrium ΔG is zero, so the standard value fixes the equilibrium constant.']];
  const c=cards(n,eq.map(e=>[e[0],e[1]]),{y:20,cols:3,cw:6.6});s+=c.s;y=c.y+16;
  const rows=[['10³','−17.1','products strongly favoured'],['10','−5.7','products favoured'],['1','0','balanced'],['0.1','+5.7','reactants favoured'],['10⁻³','+17.1','reactants strongly favoured']];
  const t=wtable(n,['K′','ΔG°′ (kJ/mol)','At equilibrium'],rows,n?[[16,8],[90,10],[200,22]]:[[40,10],[160,14],[330,40]],{y0:y,d0:.6});
  s+=t.s;
  const p=para(n?16:24,t.y+14,'Each tenfold change in K′ is worth 5.7 kJ/mol at 25 °C. ΔG°′ says where equilibrium lies; it does not say how fast a reaction goes. That is the job of enzymes, which lower the barrier but cannot change ΔG.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+p.s};
}
function scE3(n){
  const W=n?0:1, x0=n?20:40;
  const nodes={g:{x:n?70:110,y:60,w:n?100:120,t:'glucose + Pi'},g6:{x:n?290:520,y:60,w:n?100:140,t:'glucose-6-P'},
    atp:{x:n?70:110,y:170,w:n?100:120,t:'ATP',f:PAL.gold},adp:{x:n?290:520,y:170,w:n?100:140,t:'ADP + Pi',f:PAL.gold}};
  let s=G('a-fade',0,flow(nodes,[['g','g6','+13.8 kJ/mol|alone: does not go'],['atp','adp','−30.5 kJ/mol',{side:-1}]]));
  s+=G('a-fade',.8,`<rect x="${n?8:24}" y="215" width="${n?344:592}" height="40" rx="4" fill="#E7DEC9" stroke="${INK}"/>`+T(n?180:320,240,n?'coupled by hexokinase: −16.7 kJ/mol':'Coupled on one enzyme (hexokinase): +13.8 − 30.5 = −16.7 kJ/mol, so it goes','lab mid '+(n?'f12':'f14')));
  const b=bullets(n?24:30,290,[['Coupling, not transfer of “energy”','The two reactions share an intermediate on one enzyme, so their ΔG values add. ATP is a convenient currency because its hydrolysis is far from equilibrium in the cell.'],
    ['In a living cell','ATP, ADP and Pi are held far from equilibrium, so ATP hydrolysis yields about −50 to −60 kJ/mol rather than the standard −30.5.']],n?44:88,{d0:1.2,gap:24});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scE4(n){
  let s='';const L=n?16:24;
  s+=G('a-fade',0,T(L,34,'Each redox couple has a standard potential, E°′','cname start'));
  const hx=n?[90,270]:[170,470];
  s+=G('a-fade',.3,box(hx[0]-(n?78:120),54,n?156:240,52,'#EFE6D2',4)+Tc(hx[0],76,'NAD⁺ + 2H⁺ + 2e⁻ → NADH + H⁺','#3A2E22',n?9.5:12,'mono mid','600')+T(hx[0],96,'E°′ = −0.32 V: a good donor','note mid f11')
    +box(hx[1]-(n?78:120),54,n?156:240,52,'#EFE6D2',4)+Tc(hx[1],76,'½O₂ + 2H⁺ + 2e⁻ → H₂O','#3A2E22',n?9.5:12,'mono mid','600')+T(hx[1],96,'E°′ = +0.82 V: a good acceptor','note mid f11'));
  s+=G('a-fade',.8,`<rect x="${n?8:60}" y="128" width="${n?344:520}" height="${n?72:60}" rx="4" fill="#E7DEC9" stroke="${INK}"/>`
    +Tc(n?180:320,152,'ΔG°′ = −nF ΔE°′','#2F5276',n?14:16,'mono mid','600')
    +T(n?180:320,174,n?'= −2 × 96.5 × (0.82 − (−0.32))':'= −2 × 96.5 kJ/(mol·V) × (+0.82 − (−0.32) V) = −220 kJ/mol','note mid f13')+(n?T(180,192,'= −220 kJ/mol','note mid f13'):''));
  const b=bullets(n?24:30,n?232:222,[['Electrons flow downhill','Electrons move spontaneously from the couple with the more negative potential to the one with the more positive potential. The bigger the gap, the more energy per electron pair.'],
    ['n and F','n is the number of electrons transferred; Faraday’s constant converts volts into kJ per mole. A 0.1 V step with two electrons is worth about 19 kJ/mol.'],
    ['Standard is not actual','E′ shifts with the ratio of oxidised to reduced forms (the Nernst equation), and with pH when protons are involved.']],n?44:88,{d0:1.2,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
const PAIRS=[['H₂ + O₂','2H+/H2','O2/H2O','Knallgas bacteria such as Cupriavidus'],['NADH + O₂','NAD/NADH','O2/H2O','aerobic respiration'],['NADH + NO₃⁻','NAD/NADH','NO3/NO2','nitrate respiration in E. coli'],['NADH + fumarate','NAD/NADH','fum/succ','fumarate respiration: a small step'],['H₂ + SO₄²⁻','2H+/H2','SO4/H2S','sulfate reducers such as Desulfovibrio'],['H₂ + CO₂ → CH₄','2H+/H2','CO2/CH4','methanogens: one of the smallest margins'],['H₂S + O₂','SO4/H2S','O2/H2O','sulfur oxidisers such as Beggiatoa'],['NH₄⁺ + O₂','NO2/NH4','O2/H2O','ammonia oxidisers such as Nitrosomonas'],['Fe²⁺ + O₂','Fe3/Fe2','O2/H2O','acidophilic iron oxidisers: a tiny gap']];
let pairSel=1;
function scE5(n){
  const p=PAIRS[pairSel], D=CP[p[1]], A=CP[p[2]], dE=A.E-D.E, dG=-2*F*dE;
  const tx=n?60:80, ty=24, th=n?300:330;
  const t=tower(n,tx,ty,th,p[1],p[2]);
  let s=G('a-fade',0,t.s);
  const ax=n?tx-14:tx-14;
  s+=G('a-fade',.4,`<path d="M${tx+(n?9:11)} ${FX(t.ey(D.E)+4)} V${FX(t.ey(A.E)-6)}" stroke="#A4473A" stroke-width="3" marker-end="url(#ahr)" opacity=".85"/>`);
  const bx=n?16:390, by=n?ty+th+34:60;
  s+=G('a-fade',.6,T(bx,by,p[0],'cname start f16')+T(bx,by+22,p[3],'note start f12')
    +T(bx,by+52,'donor','mono acc start f11')+T(bx+70,by+52,`${D.ox}/${D.red}`,'lab start f13')+T(bx,by+70,'acceptor','mono acc start f11')+T(bx+70,by+70,`${A.ox}/${A.red}`,'lab start f13')
    +T(bx,by+100,`ΔE°′ = ${sg(A.E)} − (${sg(D.E)}) = ${dE.toFixed(2)} V`,'mono start f12')
    +T(bx,by+122,`ΔG°′ ≈ −${Math.abs(dG).toFixed(0)} kJ per 2 e⁻`,'mono start f13').replace('class="mono','style="fill:#2F5276;font-weight:600" class="mono'));
  const nATP=Math.max(0,-dG/50);
  s+=G('a-fade',.8,T(bx,by+150,dG<0?`room for about ${nATP<1?nATP.toFixed(1):nATP.toFixed(1)} ATP at ~50 kJ each, at best`:'no energy available','note start f12'));
  const H=n?by+170:Math.max(by+170,ty+th+36);
  const q=para(n?16:24,H+6,'Reading the tower: any donor can feed any acceptor below it. The further it falls, the more energy is released. Real yields are lower, because no machine is perfectly efficient and because actual concentrations shift the potentials.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(q.y+6):wide(q.y+8),s:s+q.s};
}
function scE6(n){
  const rows=[['NAD(P)H','−0.32','soluble; carries 2 e⁻ + H⁺ from catabolism'],['Ferredoxin','about −0.40','iron–sulfur protein; very low potential, for N₂ fixation and CO₂ fixation'],['FAD/FMN','about −0.2 (varies)','bound in flavoproteins; can take 1 or 2 e⁻'],['Menaquinone','−0.07','membrane carrier in anaerobic chains and Gram-positives'],['Ubiquinone','+0.11','membrane carrier in aerobic Gram-negatives and mitochondria'],['Cytochrome c','+0.25','haem protein; 1 e⁻ at a time'],['O₂ / H₂O','+0.82','terminal acceptor of aerobic respiration']];
  const t=wtable(n,['Carrier','E°′ (V)','Role'],rows,n?[[16,11],[100,10],[176,24]]:[[30,14],[170,16],[300,44]],{y0:30});
  const p=para(n?16:24,t.y+14,'Carriers are arranged in roughly increasing potential along an electron transport chain, so each hand-off is downhill. Quinones carry 2 H⁺ with their 2 e⁻, which is how some steps move protons across the membrane.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scE7(n){
  const A=n?axes(54,40,276,170,{xr:[-6,0],yr:[-50,20],xt:[[-6,'10⁻⁶'],[-4,'10⁻⁴'],[-2,'10⁻²'],[0,'1']],yt:[-40,-20,0,20],xlab:'H₂ partial pressure (atm)',ylab:'ΔG (kJ/mol)'})
    :axes(70,40,300,200,{xr:[-6,0],yr:[-50,20],xt:[[-6,'10⁻⁶'],[-4,'10⁻⁴'],[-2,'10⁻²'],[0,'1']],yt:[-40,-20,0,20],xlab:'H₂ partial pressure (atm)',ylab:'ΔG (kJ/mol)'});
  const f=v=>9.6+2*RT*Math.log(10)*v;
  let s=A.s+ln(A.px(-6),FX(A.py(0)),A.px(0),FX(A.py(0)),'#9A8E78',1,'4 3')+`<rect x="${A.px(-6)}" y="${FX(A.py(-20))}" width="${FX(A.px(0)-A.px(-6))}" height="${FX(A.py(-50)-A.py(-20))}" fill="#A9C49A" opacity=".35"/>`;
  s+=G('a-fade',.4,curve(A,f,{col:'#A4473A',from:-5.2})+T(FX(A.px(-1.6)),FX(A.py(8)),'ethanol → acetate + 2H₂','note end f11 halo'));
  s+=T(FX(A.px(-0.1)),FX(A.py(-46)),n?'ΔG below about −20: livable':'ΔG below about −20: enough to live on','note end f11');
  s+=G('a-fade',.8,`<circle cx="${FX(A.px(-4))}" cy="${FX(A.py(f(-4)))}" r="4" fill="#2F5276"/>`+T(FX(A.px(-4)+8),FX(A.py(f(-4))+4),n?'10⁻⁴ atm: −36':'10⁻⁴ atm H₂: ΔG ≈ −36','note start f11 halo'));
  const b=n?bullets(24,A.y+A.h+60,[['Unfavourable alone','At 1 atm H₂, ethanol oxidation has ΔG°′ ≈ +9.6 kJ/mol.'],['Partners pull it','A methanogen keeps H₂ near 10⁻⁴ atm, making ΔG about −36 kJ/mol.'],['A small slice','Organisms can live on about −20 kJ/mol, roughly one proton’s worth.']],44,{d0:1,gap:22})
    :bullets(400,52,[['Unfavourable alone','At 1 atm H₂, ethanol → acetate + 2H₂ has ΔG°′ ≈ +9.6 kJ/mol.'],['A partner pulls it','A methanogen consumes H₂ and holds it near 10⁻⁴ atm, so ΔG falls to about −36 kJ/mol. This is syntrophy.'],['A small slice','The minimum on which cells can live is around −10 to −20 kJ/mol per reaction, a fraction of one ATP.']],30,{d0:1,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y,A.y+A.h+50)),s:s+b.s};
}
function scE8(n){
  const items=[['Respiration','Electrons from a donor pass down a membrane chain to an external acceptor such as O₂, nitrate or sulfate. The chain pumps protons; ATP synthase spends them.'],
   ['Fermentation','No external acceptor. An organic intermediate is reduced to regenerate NAD⁺, and ATP comes only from substrate-level phosphorylation. Yields are small.'],
   ['Chemolithotrophy','The donor is inorganic: H₂, H₂S, NH₄⁺, Fe²⁺. Some donors are more positive than NAD⁺, so cells must spend energy to push electrons uphill (reverse electron flow) to make NADH.'],
   ['Phototrophy','Light raises an electron in a reaction centre to a strongly negative potential, from which it flows downhill like any other.']];
  const c=cards(n,items,{y:20,num:1});
  const p=para(n?16:24,c.y+10,'Every strategy in the metabolism decks that follow is one of these four ways of finding a donor, an acceptor and a gap between them.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:c.s+p.s};
}
const S=[
 {p:1,title:'Energy for a living',draw:scE1,text:"A cell cannot create energy, only capture some of what is released as matter moves towards equilibrium. For life, that almost always means electrons moving from a donor to an acceptor. Two numbers tell you what is possible: the change in free energy, and the redox potentials of the partners."},
 {p:1,title:'Free energy and equilibrium',draw:scE2,text:"A reaction can proceed only if its free-energy change, ΔG, is negative. ΔG depends on how far the mixture is from equilibrium, and the standard value, ΔG°′, fixes where that equilibrium lies. Thermodynamics says whether; enzymes decide how fast."},
 {p:1,title:'Coupling and ATP',draw:scE3,text:"Cells drive uphill reactions by coupling them to downhill ones on the same enzyme, so that the free-energy changes add. ATP is the common partner. Because the cell keeps ATP far from equilibrium with ADP and phosphate, its hydrolysis releases more in a living cell than the textbook standard value."},
 {p:2,title:'Redox potentials',draw:scE4,text:"Every couple of oxidised and reduced forms, such as NAD⁺ and NADH, has a standard reduction potential. Electrons flow spontaneously towards the more positive potential, and the difference converts directly into free energy: ΔG°′ equals minus n times Faraday's constant times ΔE°′."},
 {p:2,title:'The electron tower',chips:'pair',draw:scE5,text:"Stack the couples by potential and you have the electron tower. A donor near the top can feed an acceptor lower down, and the drop measures the energy available. Pick a pairing to see how far the electrons fall and roughly how much ATP the drop could pay for."},
 {p:2,title:'Electron carriers',draw:scE6,text:"Inside cells, electrons travel on carriers of graded potential: NADH and ferredoxin at the top, then flavins, quinones, cytochromes and finally the terminal acceptor. Each step is downhill, and some steps carry protons as well, which is how a membrane chain stores energy as a proton gradient."},
 {p:3,title:'Four ways to make a living',draw:scE8,text:"All energy metabolism falls into a few strategies. Respiration uses an external acceptor; fermentation balances electrons internally; chemolithotrophs take electrons from inorganic donors; phototrophs use light to lift an electron to a strongly negative potential."},
 {p:3,title:'Concentrations matter: syntrophy',draw:scE7,text:"Because ΔG depends on concentrations, a reaction that is unfavourable under standard conditions can become favourable if a partner removes a product. Bacteria that oxidise ethanol or fatty acids to acetate and hydrogen can live only when methanogens keep hydrogen scarce. Each partner lives on a slice of energy too thin for either alone."}];
const CHIPS={pair:{list:PAIRS.map(p=>p[0]),get:()=>pairSel,set:k=>pairSel=k}};
