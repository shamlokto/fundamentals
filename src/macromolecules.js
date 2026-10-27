/*META
{"title":"The Molecules of Life","eyebrow":"Chemistry and physics of life · an animated primer","h1":"How weak forces build proteins, DNA and membranes","parts":["Forces and proteins","Nucleic acids","Membranes and sugars"],"foot":"Energies and dimensions are typical textbook values; real values depend strongly on context. Structures are schematic.","description":"Weak interactions, protein folding and domains, base pairing and DNA topology, bilayer physics and polysaccharide linkages."}
META*/
function scM1(n){return introPlate(n,{q:'How do molecules held together by weak forces fold into precise, working shapes?',
  belief:'Covalent bonds make the chains; weak interactions, each worth little, decide their shapes. Proteins fold, DNA pairs and supercoils, lipids assemble into bilayers and sugars into fibres or gels, all because thousands of small attractions add up in water.',
  items:['Weak interactions and the hydrophobic effect','Folding and domains','Base pairing and stacking','Supercoiling and topoisomerases','Bilayer physics','Glycosidic linkages'],
  art:(cx,cy)=>{let s='';const pts=[[-70,-40],[-30,-60],[10,-30],[-20,0],[20,20],[60,-10],[40,40],[0,60],[-50,30]];
    s+=`<path d="M${pts.map(p=>(cx+p[0])+' '+(cy+p[1])).join(' L')}" stroke="${BLUE}" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    pts.forEach((p,i)=>s+=`<circle cx="${cx+p[0]}" cy="${cy+p[1]}" r="7" fill="${i%3?PAL.gold:PAL.rose}" stroke="${INK}"/>`);
    return s+T(cx,cy+92,'a chain folds on itself','note mid f11');},artH:190});}
function scM2(n){
  const items=[['covalent C–C bond',350,'#A4473A','~350'],['salt bridge, buried',20,PAL.gold,'10–30'],['hydrogen bond',15,PAL.blue,'5–30'],['salt bridge in water',5,PAL.gold,'~5'],['hydrophobic effect, per CH₂',3,PAL.green,'~3'],['van der Waals contact',2,PAL.green,'0.5–4'],['thermal energy, RT',2.5,'#C9BFAB','2.5']];
  const top=para(n?16:24,30,'Bond energies in kJ/mol (log scale). Only covalent bonds are much stronger than thermal jostling; everything that shapes a macromolecule is within a factor of ten of RT.',n?50:92,'lab start f13',17,0);
  const h=hbars(n,n?10:30,top.y+14,n?340:560,items.map(i=>[i[0],Math.log10(i[1]*10),i[2],i[3]]),{max:Math.log10(3500),lw:n?150:190});
  const bx=(n?10:30)+(n?150:190), bw=(n?340:560)-(n?150:190)-46, ay=h.y+2, tx=v=>FX(bx+bw*Math.log10(v*10)/Math.log10(3500));
  const ax=G('a-fade',.9,ln(bx,ay,bx+bw,ay,'#6A5B47',1)+[0.1,1,10,100].map(v=>ln(tx(v),ay,tx(v),ay+4,'#6A5B47',1)+T(tx(v),ay+17,String(v),'mono mid f12')).join('')+T(bx+bw/2,ay+33,'kJ/mol, log scale','note mid f12'));
  h.y+=50;
  const p=para(n?16:24,h.y+12,'The hydrophobic effect is not an attraction between oily groups but the cost of ordering water around them. Burying non-polar side chains releases that water, which is why folding is driven mostly by entropy, and why proteins cold-denature as well as heat-denature.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:top.s+h.s+ax+p.s};
}
function scM3(n){
  const cx=n?190:190, top=50, w=n?140:150, h=n?180:200;
  let s='';
  s+=G('a-fade',0,`<path d="M${cx-w} ${top} C ${cx-w*.7} ${top+h*.4}, ${cx-w*.35} ${top+h*.55}, ${cx-30} ${top+h*.8} Q ${cx-10} ${top+h*.86} ${cx} ${top+h} Q ${cx+10} ${top+h*.86} ${cx+30} ${top+h*.8} C ${cx+w*.35} ${top+h*.55}, ${cx+w*.7} ${top+h*.4}, ${cx+w} ${top}" stroke="${INK}" stroke-width="1.6" fill="#EFE6D2"/>`
    +`<path d="M${cx-w*.66} ${top+h*.3} q 8 -6 16 2 q 6 8 14 0" stroke="${INK}" fill="none"/><path d="M${cx+w*.42} ${top+h*.5} q 8 -6 16 2 q 6 8 14 0" stroke="${INK}" fill="none"/>`);
  s+=G('a-fade',.4,T(cx-w+4,top-10,'many unfolded states','note start f11')+T(cx+16,top+h,'native state','lab start f13')+T(cx+w*.42+36,top+h*.5,'trap','note start f11')+`<text transform="translate(${cx-w-12} ${top+h*.6}) rotate(-90)" class="note mid f11">free energy</text>`);
  s+=G('a-fade',.7,arw(cx-w*.8,top+18,cx-24,top+h*.78,{red:1,q:[cx-w*.3,top+h*.25]}));
  const b=n?bullets(24,top+h+40,[['A funnel, not a pathway','Each molecule takes its own route downhill; most routes converge on one native fold.'],['Traps and chaperones','Misfolded intermediates can stick together. DnaK and GroEL in bacteria give them another chance.'],['Sequence decides','Anfinsen showed that the native fold is encoded in the sequence (1961).']],44,{d0:1,gap:22})
    :bullets(360,54,[['A funnel, not a pathway','Each molecule takes its own route downhill; most routes converge on one native fold, usually in milliseconds to seconds.'],['Traps and chaperones','Partly folded chains can be trapped or stick together. DnaK and the GroEL–GroES cage give them another chance.'],['Sequence decides','Anfinsen showed in 1961 that the native fold is encoded in the sequence; chaperones raise the yield of folding but do not choose the shape.']],34,{d0:1,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,top+h+30)),s:s+b.s};
}
function scM4(n){
  const items=[['Rossmann fold','Alternating β-strands and α-helices that bind NAD(P) or FAD; found in dehydrogenases across all life.'],['TIM barrel','Eight βα units closed into a barrel; the commonest enzyme fold, used for very different chemistry.'],['β-barrel membrane protein','Antiparallel strands rolled into a pore; the shape of nearly every Gram-negative outer-membrane protein.'],['Helix-turn-helix','Two helices, one reading the major groove; the DNA-binding motif of LacI, λ repressor and many regulators.'],['P-loop NTPase','A loop that grips the phosphates of ATP or GTP; in ABC transporters, RecA, MinD, ParA and kinases.'],['Coiled coil','Two or more helices wound together, with hydrophobic residues alternately 3 and 4 positions apart (a heptad repeat).']];
  const c=cards(n,items,{y:20,cw:6.4});
  const p=para(n?16:24,c.y+10,'A domain is a part of a protein that folds on its own, typically 50–250 residues. Evolution reuses domains like parts, shuffling them into new combinations; a few thousand fold families account for most proteins known.',n?50:92,'note start f13',17,1.4);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:c.s+p.s};
}
function scM5(n){
  let s='';const x0=n?40:70, y=56, dx=n?50:64;
  const pairs=[['A','T',2],['G','C',3],['T','A',2],['C','G',3]];
  pairs.forEach((p,i)=>{const x=x0+i*dx;s+=G('a-fade',(i*.2).toFixed(1),Tc(x,y,p[0],NB[p[0]]||'#3A2E22',16,'mono mid','600')+Tc(x,y+70,p[1],NB[p[1]]||'#3A2E22',16,'mono mid','600')
    +[...Array(p[2])].map((_,k)=>ln(x-8+k*(16/(p[2]-1)),y+10,x-8+k*(16/(p[2]-1)),y+52,'#2F5276',1.4,'3 3')).join(''));});
  const xe=x0+(pairs.length-1)*dx;
  s+=G('a-fade',.7,ln(x0-12,y-20,xe+12,y-20,DNAC,2.4)+ln(x0-12,y+80,xe+12,y+80,DNAC,2.4)+T(xe+20,y+4,'3′','mono start f12')+T(xe+20,y+74,'5′','mono start f12'));
  s+=G('a-fade',.9,T(x0-20,y+4,'5′','mono end f12')+T(x0-20,y+74,'3′','mono end f12')+T(x0+(pairs.length-1)*dx/2,y+100,'2 or 3 hydrogen bonds per pair','note mid f11'));
  const b=n?bullets(24,y+140,[['Stacking holds the helix','Flat bases stack like coins; stacking contributes more to stability than the hydrogen bonds do.'],['GC content raises Tm','G–C pairs stack more strongly. Melting temperature rises with GC content and salt.'],['RNA adds G·U','RNA folds back on itself and accepts G·U wobble pairs, giving hairpins and complex structures.'],['B-DNA','About 10.5 bp per turn, 0.34 nm per pair, 2 nm wide, with major and minor grooves.']],44,{d0:1,gap:22})
    :bullets(330,52,[['Stacking holds the helix','Flat bases stack like coins; stacking contributes more to stability than the hydrogen bonds, which mainly give specificity.'],['GC content raises Tm','G–C pairs stack more strongly, so melting temperature rises with GC content and with salt, which screens the phosphates.'],['RNA adds G·U','RNA folds back on itself and accepts G·U wobble pairs, giving hairpins, pseudoknots and catalytic structures.'],['B-DNA','About 10.5 bp per turn, 0.34 nm per pair and 2 nm wide, with major and minor grooves that proteins read.']],38,{d0:1,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,y+120)),s:s+b.s};
}
function scM6(n){
  let s='';const y=86, xs=n?[70,180,290]:[110,320,530], r=n?36:44;
  const relaxed=(x)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${DNAC}" stroke-width="3"/>`;
  const sc=(x,tw)=>{let d='';for(let i=0;i<=60;i++){const t=i/60*2*Math.PI;const xx=x+r*1.15*Math.sin(t), yy=y+r*.55*Math.sin(2*t)*(tw);d+=(i?' L':'M')+FX(xx)+' '+FX(yy);}let o='';for(let i=0;i<=12;i++){const t=(i/12-.5)*.5;const xx=x+r*1.15*Math.sin(t), yy=y+r*.55*Math.sin(2*t)*(tw);o+=(i?' L':'M')+FX(xx)+' '+FX(yy);}
    // over/under at the node: the strand through t=0 passes over, giving a −1 (right-handed, negative) crossing
    return `<path d="${d}" stroke="${DNAC}" stroke-width="3" fill="none"/><path d="${o}" stroke="#EFE8D8" stroke-width="9" fill="none"/><path d="${o}" stroke="${DNAC}" stroke-width="3" fill="none" stroke-linecap="round"/>`;};
  const nt=(x,t)=>(n?t.split('|'):[t.replace('|',' ')]).map((l,j)=>T(x,y+r+38+j*14,l,'note mid f11')).join(''), dy=n?14:0;
  s+=G('a-fade',0,relaxed(xs[0])+T(xs[0],y+r+22,'relaxed','lab mid f13')+nt(xs[0],'nicked or|topo I'));
  s+=G('a-fade',.4,sc(xs[1],1)+T(xs[1],y+r+22,'negatively supercoiled','lab mid f13')+nt(xs[1],'made by gyrase,|with ATP')+T(xs[1]+(n?0:0),y-r*.55-10,'node: −1','mono mid f12'));
  s+=G('a-fade',.8,`<circle cx="${xs[2]-12}" cy="${y}" r="${r*.7}" fill="none" stroke="${DNAC}" stroke-width="3"/><circle cx="${xs[2]+12}" cy="${y}" r="${r*.7}" fill="none" stroke="#8C6D46" stroke-width="3"/>`+(()=>{const R=r*.7,hh=Math.sqrt(R*R-144),t0=Math.atan2(-hh,12),pt=t=>FX(xs[2]-12+R*Math.cos(t))+' '+FX(y+R*Math.sin(t)),arc=a=>`M${pt(t0-a)} A${R} ${R} 0 0 1 ${pt(t0+a)}`;return `<path d="${arc(.22)}" fill="none" stroke="#EFE8D8" stroke-width="8"/><path d="${arc(.34)}" fill="none" stroke="${DNAC}" stroke-width="3"/>`;})()+T(xs[2],y+r+22,'catenated','lab mid f13')+nt(xs[2],'unlinked by|topo IV'));
  s+=G('a-fade',1.1,box(n?20:150,y+r+56+dy,n?320:340,34,'#E7DEC9',4)+Tc(n?180:320,y+r+78+dy,'Lk = Tw + Wr','#2F5276',15,'mono mid','600'));
  const b=bullets(n?24:30,y+r+122+dy,[['Linking number','In a closed circle the number of times one strand winds round the other cannot change without cutting. It can only be traded between twist and writhe.'],
    ['Bacteria keep DNA underwound','Bacterial DNA has a superhelical density of about −0.06. Negative supercoiling makes strands easier to separate at origins and promoters.'],
    ['Drugs target the cutters','Quinolones trap gyrase and topo IV on cut DNA; novobiocin blocks gyrase’s ATPase.']],n?44:88,{d0:1.4,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scM7(n){
  let s='';const x1=n?20:30,x2=n?340:300, y=60;
  for(let i=0;i<(n?16:14);i++){const x=x1+10+i*20;s+=`<circle cx="${x}" cy="${y}" r="6" fill="${PAL.blue}" stroke="${INK}" stroke-width=".8"/><path d="M${x-2} ${y+6} q -3 14 0 26 M${x+2} ${y+6} q 3 14 ${i%3===1?6:0} 26" stroke="#8C6D46" stroke-width="1.6" fill="none"/>`
    +`<circle cx="${x}" cy="${y+82}" r="6" fill="${PAL.blue}" stroke="${INK}" stroke-width=".8"/><path d="M${x-2} ${y+76} q -3 -14 0 -26 M${x+2} ${y+76} q 3 -14 0 -26" stroke="#8C6D46" stroke-width="1.6" fill="none"/>`;}
  s=G('a-fade',0,s+T(x1,y-14,'head groups face water','note start f11')+T(x1,y+110,'~4 nm thick','note start f11'));
  const items=[['O₂, CO₂, N₂',9,PAL.green,'fast'],['water, ethanol',6,PAL.blue,n?'aquaporins help':'moderate; aquaporins help'],['urea, glycerol',4,PAL.green,'slow'],['glucose',2,PAL.gold,'needs a transporter'],['Na⁺, K⁺, Cl⁻',.5,PAL.rose,'essentially impermeable']];
  const hy=n?y+140:y+150;
  const h=hbars(n,n?10:20,hy,n?340:300,items,{max:9,lw:n?100:100,vw:n?110:170});
  const b=n?bullets(24,h.y+20,[['Fluidity','Cells tune lipid composition so the membrane stays fluid: homeoviscous adaptation.'],['How bacteria tune it','More unsaturated or branched chains when cold; cyclopropane rings in stationary phase.']],44,{d0:1.2,gap:20})
    :bullets(372,54,[['Self-assembly','Amphipathic lipids form bilayers spontaneously in water; the hydrophobic effect, not a covalent bond, holds them together.'],['Fluidity','A bilayer melts from a gel to a fluid phase. Cells tune their lipids to stay fluid at the growth temperature: homeoviscous adaptation.'],['How bacteria tune it','More unsaturated or branched-chain fatty acids in the cold, cyclopropane rings in stationary phase, hopanoids in some species.'],['Permeability','Gases cross freely, ions essentially never: the basis of every ion gradient.']],32,{d0:1.2,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,h.y+10)),s:s+h.s+b.s};
}
function scM8(n){
  const rows=[['glycogen, starch','α1→4 with α1→6 branches','compact granules; energy store'],['cellulose','β1→4 glucose','straight chains that pack into fibres'],['peptidoglycan','β1→4 GlcNAc–MurNAc, cross-linked by peptides','one bag-shaped molecule around the cell'],['chitin','β1→4 GlcNAc','fungal walls, insect cuticle'],['dextran','α1→6 glucose','slime from sucrose (Leuconostoc)'],['bacterial cellulose, curdlan','β1→4; β1→3 glucose','biofilm matrix; gels']];
  const top=para(n?16:24,30,'The same sugar gives opposite materials depending on the linkage. An α bond kinks the chain into a helix; a β bond lets chains lie straight and stack.',n?50:92,'lab start f13',17,0);
  const t=wtable(n,['Polymer','Linkage','Property'],rows,n?[[16,12],[110,16],[230,16]]:[[30,18],[190,30],[400,30]],{y0:top.y+20,d0:.3});
  const p=para(n?16:24,t.y+12,'The glycans primer follows how such linkages are made, and how the pneumococcal capsule is assembled.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:top.s+t.s+p.s};
}
const S=[
 {p:1,title:'Weak forces, precise shapes',draw:scM1,text:"Proteins, nucleic acids, membranes and polysaccharides are all long or numerous molecules shaped by interactions individually not much stronger than thermal motion. The art of a cell's chemistry is adding up thousands of these weak contacts so that one shape wins."},
 {p:1,title:'Weak interactions',draw:scM2,text:"A covalent bond is worth hundreds of kilojoules per mole; hydrogen bonds, salt bridges and van der Waals contacts are worth only a few. In water, the biggest contributor to folding is the hydrophobic effect: the gain in freedom for water molecules when non-polar groups are buried together."},
 {p:1,title:'Folding',draw:scM3,text:"An unfolded chain could take an astronomical number of shapes, yet most proteins find their native fold quickly. The energy landscape is shaped like a funnel: many routes lead downhill to one state. Chaperones rescue chains caught in traps, but the shape itself is written in the sequence."},
 {p:1,title:'Domains',draw:scM4,text:"Large proteins are built from domains, compact units that fold independently and recur across life. Recognising a fold, such as a Rossmann fold or a TIM barrel, often tells you what a protein binds or does before any experiment."},
 {p:2,title:'Base pairing and stacking',draw:scM5,text:"A pairs with T and G with C through hydrogen bonds, which give the double helix its specificity. But much of its stability comes from the bases stacking on one another. RNA, single-stranded, folds back on itself and adds G·U pairs to its repertoire."},
 {p:2,title:'Supercoiling and topology',draw:scM6,text:"A closed circle of DNA has a fixed linking number. Untwisting it in one place forces it to coil elsewhere. Bacteria keep their chromosome negatively supercoiled with gyrase, relax it with topoisomerase I, and unlink daughter chromosomes with topoisomerase IV; these enzymes are major antibiotic targets."},
 {p:3,title:'The lipid bilayer',draw:scM7,text:"Lipids with a polar head and oily tails assemble into a bilayer about four nanometres thick, fluid enough for proteins to move in it yet nearly impermeable to ions. Bacteria adjust their fatty acids to keep the membrane fluid as temperature changes."},
 {p:3,title:'Glycosidic linkages',draw:scM8,text:"Sugars can be linked through different carbons and in two configurations. Glucose joined α1→4 makes glycogen and starch, coiled and easily digested; joined β1→4 it makes cellulose, straight and tough. Peptidoglycan, the bacterial wall, is a β1→4 polymer cross-linked by peptides."}];
const CHIPS={};
