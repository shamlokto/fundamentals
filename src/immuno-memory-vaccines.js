/*META
{"title":"Memory and Vaccines","eyebrow":"Immunology · an animated primer","h1":"Why the second response is better, and how vaccines use that","parts":["Memory","Vaccines","Measuring protection","Species and history"],"foot":"Textbook level (Janeway, 9th edition, chapters 11 and 16). Vaccine examples are illustrative; schedules and products change, so check current national guidance.","description":"Primary and secondary responses, memory B and T cells, the main kinds of vaccine, adjuvants, prime–boost, correlates of protection, and differences between mice and people."}
META*/
const VAC=[
 {k:'Live attenuated',rows:[['What it is','a weakened form of the microbe that still replicates a little'],['Examples','measles, mumps and rubella; oral polio; yellow fever'],['Strengths','strong antibody and T-cell responses, often lasting for life after one or two doses'],['Limits','not for people with weak immune systems; must be kept cold']]},
 {k:'Inactivated',rows:[['What it is','the whole microbe, killed'],['Examples','injected polio; hepatitis A; some influenza vaccines'],['Strengths','cannot cause infection'],['Limits','weaker T-cell responses; several doses and boosters needed']]},
 {k:'Subunit or protein',rows:[['What it is','one or a few purified or recombinant proteins'],['Examples','hepatitis B surface antigen; HPV virus-like particles; acellular pertussis'],['Strengths','well defined and very safe'],['Limits','usually needs an adjuvant and boosters']]},
 {k:'Toxoid',rows:[['What it is','a bacterial toxin made harmless'],['Examples','tetanus and diphtheria'],['Strengths','antibody to the toxin prevents disease'],['Limits','protects against the toxin, not colonisation; boosters needed']]},
 {k:'Conjugate',rows:[['What it is','a capsular polysaccharide linked to a carrier protein'],['Examples','Haemophilus influenzae type b; pneumococcal and meningococcal vaccines'],['Strengths','works in infants and gives memory, unlike polysaccharide alone'],['Limits','boosters needed; protects only against the serotypes included']]},
 {k:'mRNA and viral vector',rows:[['What it is','instructions for the antigen, delivered in lipid nanoparticles or a harmless virus'],['Examples','COVID-19 vaccines'],['Strengths','fast to design and make; antibody and T-cell responses'],['Limits','antibody levels wane; boosters are used']]}];
let vacSel=0;
function scM1(n){return introPlate(n,{q:'Why does a second meeting with the same microbe usually go so much better than the first?',
  belief:'A first response leaves behind memory B and T cells and long-lived plasma cells. They are more numerous, respond faster and, for B cells, make higher-affinity switched antibody. Vaccines create that memory without the disease.',
  items:['Primary and secondary responses','Memory B and T cells','Kinds of vaccine','Adjuvants','Prime–boost','Correlates of protection'],
  art:(cx,cy)=>{const A=axes(cx-80,cy-50,190,90,{xr:[0,10],yr:[0,4],xt:[],yt:[],xlab:'time',ylab:'antibody'});return A.s+curve(A,x=>1.2*Math.exp(-((x-2)**2)/1.2),{col:CAT[6]})+curve(A,x=>3.6*Math.exp(-((x-7)**2)/1.6),{col:BLUE});},artH:130});}
function scM2(n){
  const A=axes(n?60:70,n?40:40,n?276:500,n?150:170,{xr:[0,60],yr:[0,4],xt:[0,14,28,42,56],yt:[],xlab:'days',ylab:'antibody level'});
  let s=G('a-fade',0,A.s);
  s+=G('a-draw',.3,curve(A,x=>0.3*(1-Math.exp(-x/6))+0.9*Math.exp(-((x-12)**2)/40),{col:CAT[6],from:0,to:28}));
  s+=G('a-draw',.8,curve(A,x=>{const t=x-28;return 0.3+0.6*(1-Math.exp(-t/4))+2.8*Math.pow(t/6,2)*Math.exp(2-2*t/6);},{col:BLUE,from:28,to:60}));
  s+=G('a-fade',1.2,T(A.px(12),A.py(1.25),'first dose','note mid f12')+`<line x1="${A.px(28)}" y1="${A.py(0)}" x2="${A.px(28)}" y2="${A.py(3.9)}" stroke="${INK}" stroke-dasharray="4 3" stroke-width="1"/>`+T(A.px(28)-6,A.py(3.75),'second dose','note end f12'));
  const it=[['Primary','A lag of about a week, a modest peak, much of it IgM, of low affinity.'],
   ['Secondary','A shorter lag, a much higher peak, mostly IgG (or IgA or IgE), of higher affinity, lasting longer.'],
   ['Why','More antigen-specific cells to start with, already switched and mutated, and needing less help to respond.']];
  const b=bullets(n?24:30,n?250:270,it,n?44:88,{d0:1.3,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scM3(n){
  const rows=[['Memory B cells','switched, mutated receptor; recirculate','recall: fast high-affinity antibody'],
   ['Long-lived plasma cells','bone marrow','steady serum antibody for years'],
   ['Central memory T cells','lymph nodes (CCR7⁺)','divide and make new effectors'],
   ['Effector memory T cells','blood and tissues (CCR7⁻)','act fast at sites of infection'],
   ['Tissue-resident memory T cells','stay in skin, gut, lung','first line at the barrier']];
  const t=wtable(n,['Cell','Where','On re-exposure'],rows,n?[[10,15],[128,14],[244,15]]:[[24,22],[230,28],[440,28]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'Memory can last for decades. Memory T cells are kept up by low-level division driven by IL-7 and IL-15, without needing the antigen.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scM4(n){const c=VAC[vacSel];return explorer(n,{h:c.k,sub:'kind of vaccine',rows:c.rows,note:'Examples are illustrative; which products are used varies by country and changes over time.'},{y:32});}
function scM5(n){
  const items=[['Why adjuvants','Purified proteins alone give weak responses, because nothing triggers the innate signals that dendritic cells need to supply signals 2 and 3.'],
   ['Aluminium salts','Used since the 1920s; hold antigen at the site and trigger inflammation; favour antibody responses.'],
   ['Oil-in-water emulsions','For example MF59 and AS03, used in some influenza vaccines; recruit and activate innate cells.'],
   ['Receptor agonists','A detoxified lipid A (MPL) acting on TLR4, alone or with the saponin QS-21, and CpG DNA acting on TLR9, are in licensed vaccines.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scM6(n){
  const items=[['Prime','The first dose starts germinal centres and makes memory cells, but antibody is modest.'],
   ['Boost','A later dose recalls memory cells, raising antibody sharply and starting new rounds of affinity maturation.'],
   ['Interval','Spacing doses weeks or months apart usually gives better and longer-lasting responses than giving them close together.'],
   ['Heterologous boosting','Priming with one kind of vaccine and boosting with another can broaden or strengthen responses.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scM7(n){
  const items=[['Correlate of protection','A measurable response that predicts protection. For tetanus and diphtheria, a defined level of antitoxin antibody; for measles, neutralising antibody.'],
   ['Not always antibody','For some infections, such as tuberculosis, T cells matter more and no simple correlate is known.'],
   ['Mucosal protection','Serum IgG may not reflect protection at mucosal surfaces, where secretory IgA and tissue-resident T cells act.'],
   ['Herd immunity','When enough people are immune (about 1 − 1/R₀), each case infects fewer than one other person on average and outbreaks die out.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scM8(n){
  const items=[['Mouse models','Mice are used to test how a vaccine works and to compare adjuvants, but they differ from people in TLR repertoire, IgG subclasses and the cells they have.'],
   ['Infants','Newborns respond poorly to polysaccharides, and maternal antibody can blunt responses to some live vaccines, which shapes childhood schedules.'],
   ['Older people','Responses weaken with age (immunosenescence), so higher-dose or adjuvanted vaccines are used for some infections.'],
   ['Human trials','In the end, protection is shown in human trials or by agreed correlates of protection.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scM9(n){
  const rows=[['1796','Jenner','cowpox material protects against smallpox'],
   ['1879–85','Pasteur','attenuated vaccines against chicken cholera, anthrax and rabies'],
   ['1926','Glenny and colleagues','aluminium salts boost responses to diphtheria toxoid'],
   ['1980','World Health Assembly','smallpox declared eradicated'],
   ['1986','first recombinant vaccine','hepatitis B surface antigen made in yeast'],
   ['1987','first conjugate vaccine','Haemophilus influenzae type b'],
   ['2023','Karikó and Weissman','Nobel Prize for the nucleoside changes that made mRNA vaccines possible']];
  const t=wtable(n,['Year','Who','Finding'],rows,n?[[10,7],[66,14],[176,22]]:[[24,8],[100,24],[310,38]],{y0:30,R:n?354:620});
  return {vb:n?slim(t.y+6):wide(t.y+8),s:t.s};
}
const S=[
 {p:1,title:'The second time',draw:scM1,text:"A first infection or vaccine leaves memory behind. The next encounter brings a faster, larger and better response, which is the basis of vaccination."},
 {p:1,title:'Primary and secondary responses',draw:scM2,text:"After a first dose antibody rises slowly to a modest peak; after a second dose it rises faster, much higher, and is of a better class and affinity. The curves are schematic."},
 {p:1,title:'Memory cells',draw:scM3,text:"Memory is carried by several kinds of cell: memory B cells and long-lived plasma cells for antibody, and central, effector and tissue-resident memory T cells."},
 {p:2,title:'Kinds of vaccine',chips:'vac',draw:scM4,text:"Vaccines present antigen in different forms. Pick a kind to see what it contains, an example, and its strengths and limits."},
 {p:2,title:'Adjuvants',draw:scM5,text:"Purified antigens need help from adjuvants, which supply the innate signals that start an adaptive response."},
 {p:2,title:'Prime and boost',draw:scM6,text:"Most vaccines are given more than once. The first dose primes; later doses recall memory and raise both the level and the quality of the response."},
 {p:3,title:'Measuring protection',draw:scM7,text:"A correlate of protection is a measurable response that predicts who is protected. For some vaccines it is a level of antibody; for others no simple correlate is known."},
 {p:4,title:'Mice and people',draw:scM8,text:"Mouse studies explain how vaccines work, but infants, older people and adults respond differently, and protection is shown in human studies."},
 {p:4,title:'A short history',draw:scM9,text:"Vaccination began with Jenner in 1796 and Pasteur in the 1880s. Adjuvants, recombinant and conjugate vaccines followed in the twentieth century, and mRNA vaccines in the twenty-first."}];
const CHIPS={vac:{list:VAC.map(v=>v.k),get:()=>vacSel,set:k=>vacSel=k}};
