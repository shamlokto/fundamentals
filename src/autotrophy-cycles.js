/*META
{"title":"Autotrophy and the Element Cycles","eyebrow":"Metabolism and bioenergetics · an animated primer","h1":"Fixing carbon and nitrogen, cycling sulfur and methane","parts":["Fixing carbon","Light","Nitrogen","Sulfur and methane"],"foot":"ATP costs of CO₂ fixation are per pyruvate or triose made and are approximate. The Winogradsky and Beijerinck primers tell the history of chemolithotrophy and nitrogen fixation.","description":"The Calvin cycle, reductive TCA, Wood–Ljungdahl and 3-hydroxypropionate pathways; oxygenic and anoxygenic phototrophy; nitrogen fixation, nitrification, denitrification and anammox; sulfur and methane cycling, and who runs each step."}
META*/
const CFIX=[
 {k:'Calvin–Benson',rows:[['Key enzyme','RuBisCO, carboxylating ribulose-1,5-bisphosphate'],['Cost','~7 ATP per pyruvate equivalent (9 ATP and 6 NADPH per triose phosphate)'],['O₂ tolerant','yes, but RuBisCO also reacts with O₂ (photorespiration); carboxysomes concentrate CO₂ in cyanobacteria'],['Who','plants, algae, cyanobacteria, many proteobacteria (Thiobacillus, Nitrosomonas)']]},
 {k:'Reductive TCA',rows:[['Key enzymes','ATP-citrate lyase and ferredoxin-dependent 2-oxoacid synthases'],['Cost','~2–3 ATP per pyruvate: much cheaper'],['O₂ tolerant','no: the ferredoxin enzymes are oxygen-sensitive'],['Who','green sulfur bacteria (Chlorobium), Aquificae, some ε-proteobacteria at vents']]},
 {k:'Wood–Ljungdahl',rows:[['Key enzyme','CO dehydrogenase / acetyl-CoA synthase, joining a methyl and a carbonyl'],['Cost','~1 ATP per pyruvate: the cheapest; can even yield energy (acetogenesis)'],['O₂ tolerant','no: strictly anaerobic, needs Ni, Co, Fe–S'],['Who','acetogens (Clostridium ljungdahlii, Acetobacterium), methanogens; a candidate for the first CO₂ fixation']]},
 {k:'3-HP cycles',rows:[['Key enzymes','acetyl-CoA and propionyl-CoA carboxylases (bicarbonate)'],['Cost','~6–9 ATP per pyruvate: 7 for the bicycle, 9 for the crenarchaeal 3-HP/4-HB cycle, about 6 for the thaumarchaeal variant'],['O₂ tolerant','yes'],['Who','Chloroflexus (3-hydroxypropionate bicycle); Crenarchaeota such as Sulfolobus and marine Thaumarchaeota (3-HP/4-hydroxybutyrate)']]}];
let cfSel=0;
function scA1(n){return introPlate(n,{q:'Where do the carbon and nitrogen in living things come from, and who keeps the elements moving?',
  belief:'All organic carbon was once CO₂, fixed by autotrophs; all biological nitrogen was once N₂, fixed by a few bacteria and archaea. The oxidation and reduction of nitrogen, sulfur, iron and carbon by microbes for energy drive the global element cycles.',
  items:['Four pathways of CO₂ fixation','Oxygenic and anoxygenic photosynthesis','Nitrogen fixation','Nitrification, denitrification, anammox','Sulfur cycling','Methanogenesis and methane oxidation','Who runs which step'],
  art:(cx,cy)=>cycle(cx,cy,64,[{t:'CO₂',w:56},{t:'organic C',w:84,f:PAL.green},{t:'CH₄',w:56,f:PAL.gold}],{labs:['fixation','methanogenesis','oxidation'],lr:14}),artH:190});}
function scA2(n){const c=CFIX[cfSel];return explorer(n,{h:c.k,rows:c.rows,note:'Six pathways of CO₂ fixation are known in nature; cost and oxygen sensitivity explain where each is found. The reductive glycine pathway is a recently recognised seventh.'});}
function scA3(n){
  const rows=[['Oxygenic','cyanobacteria, algae, plants','water','two photosystems (PSII + PSI)','O₂'],['Anoxygenic, purple','purple sulfur and non-sulfur bacteria','H₂S, H₂, Fe²⁺, organics','one, quinone-type (type II)','S⁰, no O₂'],['Anoxygenic, green','green sulfur bacteria (Chlorobium)','H₂S, H₂','one, Fe–S type (type I); chlorosomes','S⁰'],['Heliobacteria','Gram-positive heliobacteria','organics','one, type I','—'],['Rhodopsin','many marine bacteria and haloarchaea','—','retinal proton pump, not a reaction centre','—']];
  const t=wtable(n,['Type','Who','Electron donor','Reaction centres','Product'],rows,n?[[6,13],[70,12],[150,10],[220,12],[310,6]]:[[20,14],[120,20],[270,16],[400,24],[560,8]],{y0:30,R:n?356:624});
  const p=para(n?16:24,t.y+12,'Oxygenic photosynthesis, invented once in the ancestors of cyanobacteria, oxidised the Earth’s surface about 2.4 billion years ago (the Great Oxidation Event). Proteorhodopsin, found in 2000, may let a large share of ocean bacteria harvest light without chlorophyll.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scA4(n){
  const d=n?-18:0, P=(x,y)=>[x+d,y];
  const N={N2:{x:170+d,y:50,w:70,t:'N₂ (0)'},NH4:{x:322+d,y:170,w:92,t:'NH₄⁺ (−3)',f:PAL.green},NO2:{x:290+d,y:320,w:88,t:'NO₂⁻ (+3)',f:PAL.gold},NO3:{x:90+d,y:320,w:88,t:'NO₃⁻ (+5)',f:PAL.gold},NO:{x:154+d,y:232,w:76,t:'NO (+2)',f:PAL.rose},N2O:{x:90+d,y:132,w:86,t:'N₂O (+1)',f:PAL.rose}};
  const E=[['N2','NH4',''],['NH4','NO2',''],['NO2','NO3','',{bend:16}],['NO3','NO2','',{bend:16,red:1}],['NO2','NO','',{red:1}],['NO','N2O','',{red:1}],['N2O','N2','',{red:1}]];
  let s=G('a-fade',0,flow(N,E));
  const [jx,jy]=P(246,196);
  s+=G('a-fade',.5,ln(276+d,174,jx,jy,'#2F5276',1.6,'5 3')+ln(282+d,305,jx,jy,'#2F5276',1.6,'5 3')+arw(jx,jy,186+d,66,{blue:1,dash:'5 3',w:1.6})+T(jx-12,jy+10,'anammox','note end f12 halo'));
  s+=G('a-fade',.8,T(262+d,100,'fixation','note start f12 halo')+(n?T(312+d,240,'nitri-','note start f12 halo')+T(312+d,254,'tation','note start f12 halo'):T(316+d,250,'nitritation','note start f12 halo'))
    +T(190+d,296,'nitratation','note mid f12 halo')+Tc(190+d,354,'NO₃⁻ → NO₂⁻','#A4473A',12,'note mid')
    +Tc(58+d,214,'denitri-','#A4473A',12,'note end')+Tc(58+d,228,'fication','#A4473A',12,'note end')+Tc(n?12:20,388,'red: denitrification, NO₃⁻ → NO₂⁻ → NO → N₂O → N₂','#A4473A',12,'note start'));
  const cy=200, R=170;
  const b=n?bullets(24,416,[['Fixation','Nitrogenase, N₂ + 8H⁺ + 8e⁻ + 16 ATP → 2NH₃ + H₂. Oxygen-sensitive.'],['Nitrification','Ammonia oxidisers (Nitrosomonas, Thaumarchaeota), nitrite oxidisers (Nitrobacter, Nitrospira); comammox Nitrospira do both.'],['Denitrification','Nitrate respiration to N₂ via nitrite, NO and N₂O, a potent greenhouse gas.'],['Anammox','NH₄⁺ + NO₂⁻ → N₂ (Planctomycetes), a major sink of fixed nitrogen in oceans.']],44,{d0:1,gap:18})
    :bullets(400,48,[['Fixation','Nitrogenase: N₂ + 8H⁺ + 8e⁻ + 16 ATP → 2NH₃ + H₂. Extremely oxygen-sensitive, protected by heterocysts, respiration or root nodules.'],['Nitrification','Ammonia oxidisers (Nitrosomonas, Thaumarchaeota) then nitrite oxidisers (Nitrobacter, Nitrospira); comammox Nitrospira do both (2015).'],['Denitrification','Nitrate respiration, step by step: NO₃⁻ → NO₂⁻ → NO → N₂O → N₂. N₂O is a potent greenhouse gas.'],['Anammox','Anaerobic ammonium oxidation, NH₄⁺ + NO₂⁻ → N₂, by Planctomycetes: a major ocean sink of fixed nitrogen.']],32,{d0:1,gap:18});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,400)),s:s+b.s};
}
function scA5(n){
  const items=[['Who fixes nitrogen','Only bacteria and archaea: free-living (Azotobacter, Clostridium, cyanobacteria) and symbiotic (Rhizobium in legume nodules, Frankia in alder). Industrial Haber–Bosch now fixes about half as much as all of biology.'],['Nitrogenase','The MoFe protein holds the FeMo-cofactor; the Fe protein delivers electrons from ferredoxin, hydrolysing 2 ATP per electron. Alternative V and Fe-only nitrogenases exist.'],['Protecting it from oxygen','Heterocysts in Anabaena lack photosystem II; Azotobacter respires furiously to keep O₂ low; legume nodules use leghaemoglobin.'],['Assimilation','Ammonia is assimilated by glutamine synthetase and glutamate synthase (GS–GOGAT), tightly controlled by the Ntr system and PII proteins.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scA6(n){
  const cx=n?180:180, cy=n?170:180, R=n?110:120;
  const items=[{t:'SO₄²⁻',w:66},{t:'H₂S',w:56,f:PAL.gold},{t:'S⁰',w:50,f:PAL.gold},{t:'SO₃²⁻',w:66}];
  let s=G('a-fade',0,cycle(cx,cy,R,items,{labs:['dissimilatory|reduction','oxidation','oxidation','oxidation'],lr:n?18:22}));
  const b=n?bullets(24,cy+R+46,[['Reducers','Desulfovibrio and relatives respire sulfate, making H₂S in anoxic sediments and guts.'],['Oxidisers','Beggiatoa, Thiobacillus, phototrophic sulfur bacteria; cable bacteria conduct electrons over centimetres.'],['Acid mine drainage','Acidithiobacillus oxidises pyrite, releasing sulfuric acid and metals.']],44,{d0:1,gap:18})
    :bullets(360,48,[['Reducers','Desulfovibrio and relatives respire sulfate, producing H₂S in anoxic sediments, guts and oil wells (souring, corrosion).'],['Oxidisers','Beggiatoa and Thiobacillus oxidise sulfide aerobically; purple and green sulfur bacteria use it in light; cable bacteria conduct electrons over centimetres.'],['Intermediates','Sulfite is the last step before sulfate; thiosulfate, another intermediate, is oxidised by the Sox system or split (disproportionated) into sulfate and sulfide for energy.'],['Acid mine drainage','Acidithiobacillus oxidises pyrite, releasing sulfuric acid and dissolved metals; the same chemistry leaches copper.']],34,{d0:1,gap:18});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,cy+R+40)),s:s+b.s};
}
function scA7(n){
  const items=[['Methanogenesis','Only archaea make methane: from H₂ + CO₂, acetate, or methyl compounds, using methyl-coenzyme M reductase. They live in sediments, rice paddies, wetlands and rumens; a cow’s rumen releases hundreds of litres a day.'],['Aerobic methane oxidation','Methanotrophs (Methylococcus, Methylocystis) oxidise CH₄ with methane monooxygenase. They are a filter that keeps much methane from reaching the air.'],['Anaerobic methane oxidation','ANME archaea, often in consortia with sulfate-reducing bacteria, oxidise most of the methane rising through marine sediments; some couple it to nitrate or metals.'],['Why it matters','Methane is a greenhouse gas about 80 times more potent than CO₂ over 20 years; microbial sources and sinks dominate its budget.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scA8(n){
  const rows=[['C fixation','cyanobacteria, algae, chemolithoautotrophs'],['N₂ fixation','diazotrophs: Rhizobium, cyanobacteria (Trichodesmium), Azotobacter, methanogens'],['NH₄⁺ → NO₂⁻','Nitrosomonas, ammonia-oxidising archaea (Nitrosopumilus)'],['NO₂⁻ → NO₃⁻','Nitrobacter, Nitrospira'],['NO₃⁻ → N₂','denitrifiers: Pseudomonas, Paracoccus, many others'],['NH₄⁺ + NO₂⁻ → N₂','anammox Planctomycetes (Brocadia, Kuenenia)'],['SO₄²⁻ → H₂S','Desulfovibrio, Desulfobacterota, some archaea'],['H₂S → SO₄²⁻','Beggiatoa, Thiobacillus, sulfur phototrophs'],['CO₂ → CH₄','methanogenic archaea'],['CH₄ → CO₂','methanotrophs; ANME archaea'],['Fe²⁺ ↔ Fe³⁺','Gallionella, Acidithiobacillus oxidise; Geobacter, Shewanella reduce']];
  const t=wtable(n,['Step','Main players'],rows,n?[[10,16],[130,30]]:[[24,24],[220,56]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+12,'Each element cycle depends on a few physiological groups, many discovered by Winogradsky’s and Beijerinck’s enrichment logic and many still being found by sequencing.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
const S=[
 {p:1,title:'Fixing and cycling',draw:scA1,text:"Autotrophs build their cells from CO₂, and a few prokaryotes can turn N₂ into ammonia. Everything else depends on them. Meanwhile microbes oxidise and reduce carbon, nitrogen, sulfur and iron compounds for energy, and in doing so drive the planet's element cycles."},
 {p:1,title:'Pathways of CO₂ fixation',chips:'cf',draw:scA2,text:"Plants use only the Calvin cycle, but microbes fix CO₂ in at least six ways. The pathways differ in their key enzymes, in how much ATP they cost and in whether they tolerate oxygen, which predicts who uses them. Pick one to compare."},
 {p:2,title:'Photosynthesis, with and without oxygen',draw:scA3,text:"Cyanobacteria split water with two photosystems in series and release oxygen. Anoxygenic phototrophs use a single reaction centre and an electron donor such as sulfide, so they make no oxygen. Simpler still, many marine bacteria pump protons with light-driven rhodopsins."},
 {p:3,title:'The nitrogen cycle',draw:scA4,text:"Nitrogen moves between oxidation states almost entirely through microbial metabolism. Fixation makes ammonia, nitrification oxidises it to nitrate, denitrification and anammox return it to N₂. Each step is carried out by particular groups of bacteria and archaea."},
 {p:3,title:'Nitrogen fixation',draw:scA5,text:"Breaking the triple bond of N₂ takes nitrogenase, an oxygen-sensitive enzyme that spends sixteen ATP per molecule. Only some bacteria and archaea have it, and they protect it in specialised cells, by respiration or inside plant nodules. The ammonia is then assimilated by GS–GOGAT."},
 {p:4,title:'The sulfur cycle',draw:scA6,text:"Sulfate reducers in anoxic places make hydrogen sulfide; sulfur oxidisers, using oxygen, nitrate or light, turn it back into sulfur and sulfate. Sulfate reduction sours oil wells; sulfide and pyrite oxidation generate acid mine drainage, and the same oxidation is used to leach metals from ore."},
 {p:4,title:'Methane',draw:scA7,text:"Methane is made only by archaea, in places without oxygen, and consumed by methanotrophic bacteria and anaerobic archaea. The balance between them sets how much of this potent greenhouse gas escapes from wetlands, rice paddies, sediments and livestock."},
 {p:4,title:'Who runs which step',draw:scA8,text:"Each step of each cycle is run by a characteristic set of microbes. The table is a starting map; many players, such as ammonia-oxidising archaea and comammox bacteria, were discovered only in this century."}];
const CHIPS={cf:{list:CFIX.map(c=>c.k),get:()=>cfSel,set:k=>cfSel=k}};
