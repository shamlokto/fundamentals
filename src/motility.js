/*META
{"title":"Motility and Chemotaxis","eyebrow":"Cell structure · an animated primer","h1":"How bacteria move, and decide where to go","parts":["Machines","Chemotaxis","Other ways to move"],"foot":"Motor speeds, torques and receptor numbers are typical values for E. coli and Salmonella; other species differ. Drawings are schematic.","description":"The flagellar motor, pili and twitching, and chemotaxis as the model of bacterial signal transduction."}
META*/
function flagCell(cx,cy,k=1,o={}){let s=rodCell2(cx,cy,90*k,22*k);
  const fl=(x,y,dir)=>{let d=`M${x} ${y}`;for(let i=1;i<=8;i++)d+=` q ${dir*7*k} ${i%2?-9*k:9*k} ${dir*14*k} 0`;return `<path d="${d}" stroke="${INK}" stroke-width="${1.4*k}" fill="none"/>`;};
  if(o.bundle)s+=fl(cx-45*k,cy,-1)+fl(cx-45*k,cy+4*k,-1);
  else if(o.splay)s+=fl(cx-30*k,cy-20*k,-1).replace('<path','<path transform="rotate(30 '+(cx-30*k)+' '+(cy-20*k)+')"')+fl(cx+10*k,cy+20*k,1).replace('<path','<path transform="rotate(50 '+(cx+10*k)+' '+(cy+20*k)+')"');
  return s;}
function scF1(n){return introPlate(n,{q:'How does a cell a micrometre long swim towards food, and how does it decide which way that is?',
  belief:'Bacteria swim with rotary motors, crawl with retracting pili and glide on surfaces. E. coli steers by changing how often it tumbles, using a receptor array that measures change over time. That circuit is the best-understood signal transduction system in biology.',
  items:['The flagellar motor','Runs and tumbles','The chemotaxis circuit','Adaptation: a memory of seconds','Pili, twitching and gliding'],
  art:(cx,cy)=>{const wv=(x,y,ang,len)=>{let d=`M0 0`;for(let i=0;i<len;i++)d+=` q 6 ${i%2?-7:7} 12 0`;return `<path d="${d}" transform="translate(${x} ${y}) rotate(${ang})" stroke="${INK}" stroke-width="1.4" fill="none"/>`;};
    return rodCell2(cx+40,cy-40,80,20)+wv(cx,cy-42,180,7)+wv(cx,cy-36,182,7)+T(cx+40,cy-8,'run: flagella bundled behind','note mid f11')
      +rodCell2(cx+40,cy+46,80,20)+wv(cx+6,cy+40,215,5)+wv(cx+80,cy+50,25,5)+wv(cx+2,cy+52,160,5)+T(cx+40,cy+100,'tumble: the bundle flies apart','note mid f11');},artH:190});}
function scF2(n){
  // Gram-negative envelope with compartments labelled; L ring in the OM, P ring at the peptidoglycan, MS ring in the
  // inner membrane, C ring (switch) and export gate in the cytoplasm; stators span the IM and bind the peptidoglycan
  let s='';const cx=n?146:190, y=40, x0=cx-(n?90:110), x1=cx+(n?90:110), LX=x1+12;
  const OM=y+50, PG=y+92, IM=y+132, ring='#B9A27A', ROD='#D6C79F', STAT='#9DB4AE';
  s+=G('a-fade',0,membraneBand(x0,x1,OM,16,{fill:'#D9C89B'})+`<rect x="${x0}" y="${OM+16}" width="${x1-x0}" height="${IM-OM-16}" fill="#F3EEE2" opacity=".6"/>`
    +`<rect x="${x0}" y="${PG}" width="${x1-x0}" height="7" fill="#C6D3A8"/>`+membraneBand(x0,x1,IM,18)
    +[['outside',y+28],[n?'OM':'outer memb.',OM+12],['PG',PG+7],[n?'peri.':'periplasm',PG+28],[n?'IM':'inner memb.',IM+13],[n?'cyto.':'cytoplasm',IM+44]].map(l=>T(x0-6,l[1],l[0],'note end f12')).join(''));
  s+=G('a-fade',.3,`<rect x="${cx-8}" y="${OM-6}" width="16" height="${IM-OM+10}" fill="${ROD}" stroke="${INK}"/>`
    +`<rect x="${cx-22}" y="${OM+1}" width="44" height="13" rx="3" fill="${ring}" stroke="${INK}"/>`
    +`<rect x="${cx-22}" y="${PG-3}" width="44" height="13" rx="3" fill="${ring}" stroke="${INK}"/>`
    +`<rect x="${cx-28}" y="${IM-2}" width="56" height="22" rx="4" fill="#E0C88A" stroke="${INK}"/>`
    +`<path d="M${cx-48} ${IM+20} h96 v22 q0 10 -10 10 h-76 q-10 0 -10 -10z" fill="#C9A9D6" stroke="${INK}" class="tint"/>`
    +`<rect x="${cx-13}" y="${IM+20}" width="26" height="22" rx="3" fill="#E7A99B" stroke="${INK}"/>`);
  s+=G('a-fade',.6,`<path d="M${cx} ${OM-6} V${y+28} q0 -12 14 -14" stroke="${INK}" stroke-width="3.2" fill="none"/>`
    +`<path d="M${cx+14} ${y+14} q 16 -10 32 0 t 32 0 t 32 0${n?'':' t 32 0'}" stroke="${INK}" stroke-width="2.2" fill="none"/>`);
  s+=G('a-pop',.9,[-74,-60,60,74].map(d=>`<rect x="${cx+d-6}" y="${PG+2}" width="12" height="${IM+22-PG-2}" rx="3" fill="${STAT}" stroke="${INK}" class="tint"/>`).join('')
    +arw(cx-67,PG-10,cx-67,IM+32,{blue:1,w:2})+Tc(cx-67,PG-14,'H⁺','#2F5276',12,'mono mid','600'));
  s+=G('a-pop',1.2,blob(cx-30,IM+62,9,6,'#B5584A')+Tc(cx-42,IM+66,'CheY-P','#A4473A',12,'mono end','600'));
  const R=[['filament',cx+110,y+14,y+6],['hook',cx+10,y+22,y+26],['L ring',cx+22,OM+7,OM+8],['P ring',cx+22,PG+3,PG+4],['stator MotA/B',cx+80,PG+22,PG+26],['MS ring',cx+28,IM+8,IM+12],['C ring (switch)',cx+48,IM+32,IM+36],['export gate',cx+13,IM+38,IM+56]];
  if(n)R[0][1]=cx+106;
  s+=G('a-fade',1.4,R.map(l=>ln(l[1],l[2],LX-4,l[3],'#9A8E78',.8)+T(LX,l[3]+4,n&&l[0]==='stator MotA/B'?'stator':(n&&l[0]==='C ring (switch)'?'C ring':l[0]),'note start f12')).join(''));
  const yb=IM+(n?100:96);
  const b=n?bullets(24,yb,[['Proton-powered','Stators of MotA and MotB let protons flow and push on the C ring: about 1,200 protons a turn.'],['Fast','The motor spins at ~300 revolutions a second in E. coli; up to ~1,700 in Vibrio, with Na⁺.'],['Switchable','CheY-P binding the C ring flips it from counter-clockwise to clockwise.'],['Built from inside','Flagellin travels through the hollow filament, added at the tip.']],44,{d0:1.6,gap:20})
    :bullets(410,52,[['Proton-powered','Stators of MotA and MotB let protons flow across the membrane and push on the C ring, using about 1,200 protons per turn.'],['Fast','The motor turns at around 300 revolutions per second in E. coli, and up to ~1,700 in Na⁺-driven Vibrio motors.'],['Switchable','CheY-P binding the C-ring protein FliM flips rotation from counter-clockwise to clockwise.'],['Built from inside','A type III export apparatus at the base sends flagellin up the hollow filament, added at the distal tip.']],28,{d0:1.6,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,yb)),s:s+b.s};
}
function scF3(n){
  let s='';const P0=[[30,150],[120,120],[150,180],[250,160],[300,90],[360,140],[450,120],[480,200],[570,170],[610,110]];
  const pts=P0.map(p=>n?[p[0]*.54+10,p[1]]:p);
  s+=G('a-fade',0,`<path d="M${pts.map(p=>p.join(' ')).join(' L')}" stroke="#2F5276" stroke-width="1.8" fill="none"/>`+pts.slice(1,-1).map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#A4473A"/>`).join('')
    +arw(n?250:440,236,n?340:620,236,{w:1.2})+T(n?248:436,240,'attractant increases','note end f11'));
  s+=G('a-fade',.4,T(n?16:24,28,'runs (blue, about 1 s) and tumbles (red, about 0.1 s)','note start f12'));
  const b=bullets(n?24:30,n?280:280,[['Runs','All motors turn counter-clockwise; the flagella bundle and push the cell straight, at ~20–30 µm/s.'],['Tumbles','One or more motors reverse; the bundle flies apart and the cell reorients more or less at random.'],['Biased random walk','Moving up a gradient of attractant, the cell tumbles less often, so runs that go the right way last longer. It never steers directly.']],n?44:88,{d0:.8,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scF4(n){
  const N=n?{mcp:{x:120,y:40,w:170,t:'receptors|+ CheW',f:'#A9C4DC'},r:{x:300,y:40,w:80,t:'CheR',f:'#C6D3A8'},a:{x:130,y:140,w:110,t:'CheA',f:'#C9A9D6'},b:{x:300,y:140,w:90,t:'CheB-P',f:'#E7A99B'},y:{x:130,y:240,w:110,t:'CheY-P',f:'#E7A99B'},z:{x:300,y:240,w:80,t:'CheZ'},
     m:{x:130,y:340,w:130,t:'motor switch'}}
   :{mcp:{x:150,y:50,w:220,t:'receptors (MCPs) + CheW',f:'#A9C4DC'},a:{x:150,y:140,w:110,t:'CheA',f:'#C9A9D6'},y:{x:330,y:140,w:100,t:'CheY-P',f:'#E7A99B'},m:{x:550,y:140,w:120,t:'motor switch'},
     z:{x:330,y:230,w:90,t:'CheZ'},b:{x:150,y:230,w:100,t:'CheB-P',f:'#E7A99B'},r:{x:470,y:50,w:90,t:'CheR',f:'#C6D3A8'}};
  const E=n?[['mcp','a','activates;|less with|attractant',{side:1}],['a','y','P',{side:-1}],['a','b','P',{side:-1}],['y','m','CW: tumble',{side:-1}],['z','y','−P',{side:1}],['b','mcp','−CH₃',{side:1,dash:'4 3'}],['r','mcp','+CH₃',{side:1,dash:'4 3',lx:24}]]
    :[['mcp','a','activates; less when|attractant binds',{side:-1}],['a','y','P'],['y','m','CW rotation: tumble',{lx:4,ly:4}],['z','y','dephosphorylates',{side:1}],['a','b','P',{side:-1}],['b','mcp','removes|methyl groups',{bend:-90,dash:'4 3',off:16}],['r','mcp','adds methyl groups',{side:-1,dash:'4 3',lx:22}]];
  let s=G('a-fade',0,flow(N,E));
  const by=n?390:290;
  const b=bullets(n?24:30,by,[['Excitation','An attractant binding the receptor array lowers CheA activity, so less CheY-P, fewer clockwise switches, fewer tumbles: the run continues.'],['Adaptation','Slowly, CheR adds methyl groups to the receptors (and CheB-P removes them less), restoring CheA activity. After a few seconds the cell is back to baseline at the new concentration.'],['A derivative','Excitation is fast and adaptation slow, so the output reports the change in concentration over the last few seconds.']],n?44:88,{d0:1.2,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scF5(n){
  const A=n?axes(54,40,280,150,{xr:[0,40],yr:[0,1],xt:[0,10,20,30,40],yt:[[0,'low'],[1,'high']],xlab:'time (s)',ylab:'tumble rate'}):axes(70,40,320,170,{xr:[0,40],yr:[0,1],xt:[0,10,20,30,40],yt:[[0,'low'],[1,'high']],xlab:'time (s)',ylab:'tumble rate'});
  const f=t=>t<10?0.5:0.5-0.45*Math.exp(-(t-10)/4);
  let s=A.s+G('a-fade',.3,curve(A,f,{col:'#2F5276',n:300}));
  s+=G('a-fade',.2,ln(FX(A.px(10)),A.y,FX(A.px(10)),A.y+A.h,'#A4473A',1.2,'4 3')+T(FX(A.px(10)+5),A.y+12,'attractant added','note start f11 halo'));
  s+=G('a-fade',.6,T(FX(A.px(26)),FX(A.py(.5)-10),'back to baseline','note mid f11 halo'));
  const b=n?bullets(24,A.y+A.h+60,[['Precise adaptation','Tumbling returns to the same baseline whatever the new level, over a range of about five orders of magnitude.'],['Robust by design','Uri Alon, Stanislas Leibler and colleagues showed in 1999 that the precision holds even when protein levels change, a property of the circuit.']],44,{d0:1,gap:22})
    :bullets(420,52,[['Precise adaptation','Tumbling returns to the same baseline whatever the new attractant level, across about five orders of magnitude.'],['Robust by design','Uri Alon, Stanislas Leibler and colleagues showed in 1999 that the precision holds even when protein levels vary, a property of the circuit rather than of fine-tuning.'],['Gain','Receptors cluster in arrays at the poles and act cooperatively, so a change of a few molecules is amplified.']],26,{d0:1,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,A.y+A.h+50)),s:s+b.s};
}
function scF6(n){
  const items=[['Type IV pili','Thin fibres extended and retracted by the PilB and PilT ATPases. Retraction pulls the cell along a surface (twitching), and the same machinery takes up DNA in natural transformation.'],['Gliding','Myxococcus moves with motor complexes running along helical tracks in the envelope; Flavobacterium uses a rotary motor driving an adhesin along the surface.'],['Archaella','Archaeal swimming filaments are built like type IV pili, driven by ATP, not protons: a separate invention.'],['Spirochaetes','Periplasmic flagella wound between the membranes rotate the whole cell body like a corkscrew, through viscous gels where other swimmers stall.'],['Taxes beyond chemicals','Aerotaxis, phototaxis, magnetotaxis (magnetosome chains) and thermotaxis all feed into the same Che-type circuitry.'],['Swarming','On moist surfaces some species become hyperflagellated and move as rafts, often more tolerant of antibiotics.']];
  const c=cards(n,items,{y:20,cw:6.5});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
const S=[
 {p:1,title:'Moving with purpose',draw:scF1,text:"Many bacteria can move, and those that do rarely move at random for long. E. coli swims with a bundle of rotating flagella, alternating straight runs with brief tumbles. By changing how often it tumbles in response to what it senses, it drifts towards food and away from harm."},
 {p:1,title:'The flagellar motor',draw:scF2,text:"The bacterial flagellum is a true rotary motor. Proton flow through stator units in the membrane turns a rotor of rings, which spins a hook and a long helical filament. The direction of rotation is switched by a single signalling protein, CheY-P, binding the base of the motor."},
 {p:2,title:'Runs and tumbles',draw:scF3,text:"With all motors turning counter-clockwise, the flagella form a bundle and the cell swims straight. When some reverse, the bundle comes apart and the cell tumbles to a random new direction. Howard Berg's tracking microscope showed in 1972 that chemotaxis works by lengthening runs in good directions."},
 {p:2,title:'The chemotaxis circuit',draw:scF4,text:"Receptors in a polar array control the kinase CheA. CheA phosphorylates CheY, which binds the motor and causes tumbles, and CheB, which demethylates the receptors. CheR adds methyl groups. Attractants inhibit CheA quickly; methylation restores it slowly, giving the cell a short memory."},
 {p:2,title:'Adaptation',draw:scF5,text:"When attractant is added, tumbling drops at once, then recovers over seconds to exactly its old level. The cell therefore responds to changes, not to absolute concentrations, and can keep climbing a gradient over an enormous range. That precise adaptation is a robust property of the circuit."},
 {p:3,title:'Other ways to move',draw:scF6,text:"Flagellar swimming is only one strategy. Type IV pili pull cells across surfaces by retracting; gliders use envelope motors; archaea swim with an unrelated filament; spirochaetes spin their whole bodies. Many senses, from oxygen to magnetism, feed the same chemotaxis machinery."}];
const CHIPS={};
