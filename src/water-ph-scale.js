/*META
{"title":"Water, pH and Scale","eyebrow":"Chemistry and physics of life · an animated primer","h1":"Life in water, at the scale of a micrometre","parts":["Acids and buffers","Water and pressure","Physics of the small"],"foot":"Values are typical figures rounded for teaching; turgor and water-activity limits in particular vary between species and with the method of measurement.","description":"pH, pKa and buffers, water activity and osmotic pressure, diffusion, Reynolds number and surface-to-volume."}
META*/
const BUF=[['acetate',4.76,'acid media; not for physiology'],['MES',6.1,'Good’s buffer for slightly acid work'],['phosphate (pKa₂)',7.2,'cheap, but precipitates Ca²⁺ and Mg²⁺'],['MOPS',7.2,'standard for defined bacterial media'],['HEPES',7.5,'cell culture; light-sensitive with riboflavin'],['Tris',8.1,'molecular biology; pKa falls ~0.03 per °C']];
let bufSel=3;
function scW1(n){return introPlate(n,{q:'What do water, pH and sheer size do to how a microbe works?',
  belief:'A bacterium is a few femtolitres of crowded water. Its chemistry is set by pH and by how much water is free to move; its physics is that of an object so small that diffusion is fast, inertia is irrelevant, and surface is plentiful.',
  items:['pH, pKa and buffers','pH homeostasis','Water activity and osmotic pressure','Diffusion and time','Reynolds number','Surface and volume'],
  art:(cx,cy)=>rodCell2(cx,cy,150,40)+T(cx,cy+4,'~1 fL of water','note mid f12')+T(cx,cy-56,'pH ~7.6 inside','note mid f11')+T(cx,cy+66,'turgor: several atmospheres','note mid f11')
    +[[-1,0],[1,0]].map(([d])=>arw(cx+d*79,cy,cx+d*108,cy,{w:1.2})).join(''),artH:180});}
function scW2(n){
  const b=BUF[bufSel], pK=b[1];
  const A=n?axes(54,30,280,170,{xr:[2,11],yr:[0,1],xt:[2,4,6,8,10],yt:[[0,'0'],[.5,'½'],[1,'1']],xlab:'pH',ylab:'fraction deprotonated'})
    :axes(70,30,320,200,{xr:[2,11],yr:[0,1],xt:[2,4,6,8,10],yt:[[0,'0'],[.5,'½'],[1,'1']],xlab:'pH',ylab:'fraction deprotonated'});
  const f=p=>1/(1+Math.pow(10,pK-p));
  let s=A.s+`<rect x="${FX(A.px(pK-1))}" y="${A.y}" width="${FX(A.px(pK+1)-A.px(pK-1))}" height="${A.h}" fill="#A9C49A" opacity=".35"/>`;
  s+=G('a-fade',.3,curve(A,f,{col:'#2F5276'})+ln(FX(A.px(pK)),A.y,FX(A.px(pK)),A.y+A.h,'#A4473A',1.2,'4 3')+T(FX(A.px(pK)-5),A.y+12,`pKa ${pK}`,'mono end f11 halo')+T(FX(A.px(pK)),A.y+A.h-8,'buffers here','note mid f10 halo'));
  const bx=n?16:410, by=n?A.y+A.h+64:50;
  s+=G('a-fade',.5,T(bx,by,b[0],'cname start f16')+T(bx,by+20,b[2],'note start f12')
    +box(bx,by+36,n?328:210,46,'#E7DEC9',4)+Tc(bx+(n?164:105),by+56,'pH = pKa + log([A⁻]/[HA])','#2F5276',n?12:11,'mono mid','600')+T(bx+(n?164:105),by+74,'Henderson–Hasselbalch','note mid f11'));
  const q=bullets(bx+(n?8:8),by+112,[['Within one unit of pKa','A buffer resists pH change best where it is half protonated; outside pKa ± 1 it does little.'],['Pick by pKa, then by chemistry','Some buffers bind metals, absorb UV, or are metabolised by the organism.']],n?42:24,{d0:.8,gap:20});
  return {vb:n?slim(q.y):wide(Math.max(q.y,A.y+A.h+50)),s:s+q.s};
}
function scW3(n){
  const items=[['Neutrophiles','E. coli keeps its cytoplasm near pH 7.5–7.8 while the outside ranges from about 5 to 9, using K⁺/H⁺ and Na⁺/H⁺ antiporters, amino-acid decarboxylases and buffering.'],
   ['Acidophiles','Organisms such as Acidithiobacillus grow at pH 2 but keep the inside near 6.5. A reversed membrane potential (inside positive) slows proton entry.'],
   ['Alkaliphiles','Bacillus species growing at pH 10–11 keep the inside near 8.5, and rely more on a Na⁺ circuit than on protons.'],
   ['Why it matters to energy','The pH difference across the membrane, ΔpH, is part of the proton motive force. At neutral pH most of the force is electrical; in acidophiles most is ΔpH.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scW4(n){
  const items=[['pure water',1.0,PAL.blue,'1.00'],['sea water',0.98,PAL.blue,'0.98'],['fresh meat',0.97,PAL.rose,'0.97'],['most bacteria stop',0.91,'#C9BFAB','~0.91'],['Staphylococcus aureus',0.86,PAL.gold,'~0.86'],['jam, salted fish',0.78,PAL.rose,'~0.75–0.80'],['extreme halophiles',0.75,PAL.gold,'~0.75'],['xerophilic moulds',0.61,PAL.gold,'~0.61'],['dried milk',0.30,PAL.rose,'~0.3']];
  const top=para(n?16:24,30,'Water activity, aw, is the vapour pressure of a sample divided by that of pure water: the fraction of water free to take part in reactions and to move into cells.',n?50:92,'lab start f13',17,0);
  const h=hbars(n,n?10:30,top.y+14,n?340:580,items,{max:1,lw:n?140:180});
  const p=para(n?16:24,h.y+12,'Lowering aw by drying, salting or sugaring is one of the oldest ways to preserve food. Organisms that tolerate low aw accumulate compatible solutes such as glycine betaine, proline and trehalose, or, in some halophilic archaea, molar concentrations of K⁺.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:top.s+h.s+p.s};
}
function scW5(n){
  const cw=n?150:180, y=n?60:70;
  const panel=(x,lab,arrowIn,note)=>{let s=(arrowIn?rodCell2(x,y+40,cw-30,32,{fill:'#DDE7F0'}):rodCell2(x,y+40,cw-30,32,{fill:'none',tint:false,sw:1.2}).replace('/>',' stroke-dasharray="4 3"/>')+rodCell2(x,y+40,cw-62,20,{fill:'#EFE6D2'}))+T(x,y-2,lab,'cname mid f14');
    for(let i=0;i<4;i++){const ax=x-cw/2+30+i*(cw-60)/3;s+=arrowIn?arw(ax,y+98,ax,y+78,{w:1.3,blue:1}):arw(ax,y+76,ax,y+98,{w:1.3});}
    if(!arrowIn)s+=T(x+cw/2-6,y+12,'wall','note start f12')+T(x,y+44,'cytoplasm','note mid f12');
    return s+T(x,y+116,note,'note mid f12');};
  let s=G('a-fade',0,panel(n?92:150,'hypo-osmotic shock',true,'water rushes in'));
  s+=G('a-fade',.4,panel(n?268:470,'hyper-osmotic shock',false,n?'cytoplasm shrinks':'water leaves; cytoplasm shrinks'));
  const b=bullets(n?24:30,y+150,[['Turgor','The cytoplasm is more concentrated than most environments, so water pushes outwards. The wall holds the pressure: estimates run from about 1 atmosphere in Gram-negatives to 10–20 in Gram-positives, though measurements disagree.'],
   ['Safety valves','On sudden dilution, mechanosensitive channels MscS and MscL open and release solutes within milliseconds.'],
   ['Rebuilding','After a salt upshift, cells first take up K⁺, then replace it with compatible solutes that do not disturb proteins.'],
   ['π = cRT','Osmotic pressure rises with total solute concentration: 1 osmol/L is about 24 atmospheres at 25 °C.']],n?44:88,{d0:.8,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scW6(n){
  const rows=[['small molecule in water','1000','1 µm in 0.5 ms'],['GFP in E. coli cytoplasm','~10','1 µm in 0.05 s'],['protein across a 10 µm cell','~10','about 5 s'],['protein across 1 mm','~10','about 14 hours'],['membrane protein in a bilayer','~0.1','1 µm in 5 s']];
  const top=para(n?16:24,30,'Diffusion time grows with the square of distance: t ≈ x² / 2D. Over a micrometre it is fast; over a millimetre it is hopeless.',n?50:92,'lab start f13',17,0);
  const t=wtable(n,['What moves','D (µm²/s)','Time'],rows,n?[[16,18],[150,8],[230,14]]:[[30,30],[300,12],[420,24]],{y0:top.y+20,d0:.3});
  const p=para(n?16:24,t.y+12,'A bacterium does not need transport machinery inside its cytoplasm: a protein made at one pole samples the whole cell in well under a second. Large eukaryotic cells use motors and vesicles because diffusion alone would be too slow.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:top.s+t.s+p.s};
}
function scW7(n){
  let s='';const cx=n?180:170, y=n?60:70;
  s+=G('a-fade',0,box(cx-(n?150:140),y-30,n?300:280,58,'#E7DEC9',4)+Tc(cx,y-6,'Re = ρ v L / η','#2F5276',n?15:17,'mono mid','600')+T(cx,y+16,'inertial forces ÷ viscous forces','note mid f12'));
  const rows=[['a human swimmer','~10⁶'],['a goldfish','~10²'],['a bacterium','~10⁻⁵']];
  rows.forEach((r,i)=>{s+=G('a-fade',(.4+i*.2).toFixed(1),T(cx-(n?120:110),y+60+i*24,r[0],'lab start f13')+T(cx+(n?120:110),y+60+i*24,r[1],'mono end f13'));});
  const b=n?bullets(24,y+150,[['No coasting','Stop the flagella and a bacterium coasts less than the width of an atom, as Edward Purcell calculated in 1977.'],['The scallop theorem','A reciprocal stroke, like opening and closing a hinge, gets nowhere. Swimmers need a non-reciprocal motion, such as a rotating helix.'],['Flow carries little','Nearby fluid moves with the cell; to reach new food, a bacterium must swim farther than diffusion carries it, or it gains nothing by moving.']],44,{d0:1,gap:22})
    :bullets(350,52,[['No coasting','Stop the flagella and a bacterium coasts less than the width of an atom, as Edward Purcell calculated in 1977.'],['The scallop theorem','A reciprocal stroke, like opening and closing a hinge, gets nowhere. Swimmers need a non-reciprocal motion, such as a rotating helix.'],['Outswimming diffusion','To reach new food a bacterium must move farther than diffusion would bring it, which is why chemotaxis works by runs of a second or so.']],36,{d0:1,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,y+150)),s:s+b.s};
}
const CELLS=[['Mycoplasma',0.15,'one of the smallest free-living cells'],['Pelagibacter',0.1,'the most abundant ocean bacterium; tiny rods'],['E. coli',0.5,'a rod about 1 × 2 µm (radius ~0.5)'],['yeast',2.5,'a eukaryotic cell ~5 µm across'],['Epulopiscium',40,'giant gut bacterium, hundreds of µm long; many genome copies'],['Thiomargarita',300,'giant sulfur bacterium; a thin cytoplasm around a vacuole']];
function scW8(n){
  const items=CELLS.map(c=>[`${c[0]} (r ${c[1]} µm)`,3/c[1],c[1]<1?PAL.green:c[1]<5?PAL.blue:PAL.rose,(3/c[1]).toFixed(c[1]<1?0:2)+' µm⁻¹']);
  const top=para(n?16:24,30,'For a sphere, surface area divided by volume is 3/r. Halve the radius and each unit of cytoplasm has twice the membrane through which to feed.',n?50:92,'lab start f13',17,0);
  const max=10;const h=hbars(n,n?10:30,top.y+14,n?340:560,items.map(i=>[i[0],Math.min(i[1],max),i[2],i[3]]),{max,lw:n?150:180});
  const p=para(n?16:24,h.y+10,'Values are 3/r for a sphere of the radius shown; bars are capped at 10 µm⁻¹. Giant bacteria cheat the rule: Thiomargarita fills most of its volume with a vacuole, so its living cytoplasm is a thin shell, and Epulopiscium carries tens of thousands of genome copies near its surface.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:top.s+h.s+p.s};
}
const S=[
 {p:1,title:'Small, wet and crowded',draw:scW1,text:"Before metabolism or genetics, a microbe is a physical object: a tiny bag of crowded water under pressure. Acid–base chemistry sets the charge on every protein and metabolite, water availability sets whether anything can grow, and size sets which physical forces matter."},
 {p:1,title:'pH, pKa and buffers',chips:'buf',draw:scW2,text:"A weak acid is half dissociated when the pH equals its pKa, and it buffers best within about one pH unit of that point. Pick a buffer to see its useful range, and the practical reasons one is chosen over another for a growth medium or an enzyme assay."},
 {p:1,title:'Holding the inside steady',draw:scW3,text:"Bacteria keep their cytoplasmic pH within a narrow band whatever the outside does. Neutrophiles, acidophiles and alkaliphiles each set a different internal pH and use different ion transporters to defend it, and the pH difference across the membrane contributes to the proton motive force."},
 {p:2,title:'Water activity',draw:scW4,text:"What matters for growth is not how much water there is but how much is free. Water activity falls as salt or sugar binds water, and every organism has a limit below which it cannot grow. Food preservation exploits those limits; halophiles and xerophiles push them furthest."},
 {p:2,title:'Osmotic pressure and turgor',draw:scW5,text:"Water moves towards higher solute concentration. Because the cytoplasm is concentrated, bacteria are inflated against their walls by turgor pressure. Sudden changes in the outside concentration are dangerous, and cells answer with mechanosensitive channels, potassium uptake and compatible solutes."},
 {p:3,title:'Diffusion and time',draw:scW6,text:"Molecules wander by diffusion, and the time to cover a distance grows with its square. Inside a bacterium this is fast enough to mix the whole cell in a fraction of a second, which is one reason bacteria can stay small and simple, while large eukaryotic cells need active transport."},
 {p:3,title:'Life at low Reynolds number',draw:scW7,text:"The Reynolds number compares inertia with viscosity. For a swimming bacterium it is about one hundred-thousandth, so there is no gliding: motion stops the instant the motor does. Edward Purcell's 1977 paper showed why that forces bacteria to swim with rotating helices rather than strokes."},
 {p:3,title:'Surface and volume',draw:scW8,text:"Everything a cell eats and excretes crosses its surface, while what it needs scales with its volume. Small cells have the most surface per unit volume, which is why most bacteria are tiny. The rare giant bacteria survive by keeping their active cytoplasm in a thin layer near the surface."}];

const CHIPS={buf:{list:BUF.map(b=>b[0]),get:()=>bufSel,set:k=>bufSel=k}};

