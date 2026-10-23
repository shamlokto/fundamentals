/* ===================== shared library for the generated decks ===================== */
const PAL={sand:'#E7DEC9',blue:'#A9C4DC',green:'#A9C49A',rose:'#E7A99B',gold:'#E0C88A',lilac:'#C9A9D6',teal:'#9DB4AE',grey:'#D8D2C2',cream:'#F3EEE2',ochre:'#D9B85A'};
const lines=t=>String(t).split('|');
/* opening plate without a portrait: art on the left (wide) or on top (narrow) */
function introPlate(n,o){
  let s='';const aw=n?328:220, ah=o.artH||200;
  const ax=n?16:20, ay=n?14:30;
  if(o.art)s+=G('a-fade',0,o.art(ax+aw/2,ay+ah/2,n));
  let x=n?16:270, y=n?ay+ah+34:44;
  s+=G('a-fade',.5,T(x,y,'The question','mono acc start f12'));
  const Q=wrap(o.q,n?40:42);s+=G('a-fade',.6,Q.map((l,i)=>T(x,y+24+i*22,l,'cname start')).join(''));y+=24+Q.length*22+18;
  if(o.belief){s+=G('a-fade',1,T(x,y,o.bh||'Why it matters','mono acc start f12'));
    const B=wrap(o.belief,n?50:56);s+=G('a-fade',1.1,B.map((l,i)=>T(x,y+20+i*17,l,'note start f13')).join(''));y+=20+B.length*17+16;}
  if(o.items){s+=G('a-fade',1.5,T(x,y,'In this deck','mono acc start f12'));y+=20;o.items.forEach((it,i)=>{s+=G('a-fade',(1.6+i*.15).toFixed(2),T(x,y+i*18,'• '+it,'note start f13'));});y+=o.items.length*18;}
  const H=n?y+12:Math.max(y+14,ay+ah+20);
  return {vb:n?slim(H):wide(H),s};
}
/* point where the segment from a box centre toward (tx,ty) leaves the box */
function rectEdge(cx,cy,w,h,tx,ty,pad=4){const dx=tx-cx,dy=ty-cy;const sx=dx?(w/2+pad)/Math.abs(dx):1e9,sy=dy?(h/2+pad)/Math.abs(dy):1e9,t=Math.min(sx,sy,1);return [cx+dx*t,cy+dy*t];}
/* node: {x,y,w,h,t,f,sub,fs,tc,r}  (x,y = centre); edge: [a,b,label,{bend,col,dash,lx,ly,la,w}] */
function nodeBox(N){const h=N.h||(28+(lines(N.t).length-1)*15+(N.sub?13:0)), L=lines(N.t);
  let s=box(N.x-N.w/2,N.y-h/2,N.w,h,N.f||'#EFE6D2',N.r==null?4:N.r);
  const y0=N.y-h/2+18+(N.sub?0:Math.max(0,(h-28-(L.length-1)*15)/2));
  s+=L.map((l,i)=>Tc(N.x,y0+i*15,l,N.tc||'#3A2E22',N.fs||12,'mono mid','600')).join('');
  if(N.sub)s+=T(N.x,y0+(L.length-1)*15+14,N.sub,'note mid f10');
  return {s,h};}
function flow(nodes,edges,o={}){
  const H={};Object.entries(nodes).forEach(([k,N])=>{H[k]=N.h||(28+(lines(N.t).length-1)*15+(N.sub?13:0));});
  let es='',ls='',ns='';
  edges.forEach(e=>{const [a,b,lab,op={}]=e, A=nodes[a], B=nodes[b];
    let cx1=A.x,cy1=A.y,cx2=B.x,cy2=B.y;
    const mx=(cx1+cx2)/2,my=(cy1+cy2)/2,dx=cx2-cx1,dy=cy2-cy1,len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len,bd=op.bend||0;
    const qx=mx+nx*bd,qy=my+ny*bd;
    const [x1,y1]=rectEdge(A.x,A.y,A.w,H[a],bd?qx:B.x,bd?qy:B.y,op.pad1==null?4:op.pad1);
    const [x2,y2]=rectEdge(B.x,B.y,B.w,H[b],bd?qx:A.x,bd?qy:A.y,op.pad2==null?6:op.pad2);
    const col=op.col||'#6A5B47', m=op.red?'ahr':op.blue?'ahb':'ahp';
    const d=bd?`M${FX(x1)} ${FX(y1)} Q${FX(qx)} ${FX(qy)} ${FX(x2)} ${FX(y2)}`:`M${FX(x1)} ${FX(y1)} L${FX(x2)} ${FX(y2)}`;
    es+=`<path d="${d}" stroke="${op.red?'#A4473A':op.blue?'#2F5276':col}" stroke-width="${op.w||1.5}" fill="none"${op.none?'':` marker-end="url(#${m})"`}${op.dash?` stroke-dasharray="${op.dash}"`:''}${op.both?` marker-start="url(#${m})"`:''}/>`;
    if(lab){const side=op.side||(bd?Math.sign(bd):1), off=op.off==null?12:op.off;
      const px=(bd?(mx+qx)/2:mx)+nx*off*side+(op.lx||0), py=(bd?(my+qy)/2:my)+ny*off*side+(op.ly||0)+4;
      const anc=op.la||(Math.abs(nx*side)<.3?'mid':(nx*side>0?'start':'end'));
      const LL=lines(lab), up=(ny*side<-.3)?(LL.length-1)*13:(ny*side>.3?-6:(LL.length-1)*6.5);
      ls+=LL.map((l,i)=>T(FX(px),FX(py-up+i*13),l,`${op.lc||'note'} ${anc} f11 halo`)).join('');}
  });
  Object.values(nodes).forEach(N=>{ns+=nodeBox(N).s;});
  return es+ns+ls;
}
/* boxes evenly on a circle joined by arcs; items [{t,f,w,sub}], arcs labelled outside by labs[i] (arc i -> i+1) */
function cycle(cx,cy,R,items,o={}){
  const k=items.length, a0=o.a0==null?-90:o.a0, P=i=>{const a=(a0+i*360/k)*Math.PI/180;return [cx+R*Math.cos(a),cy+R*Math.sin(a)];};
  let es='',ns='',ls='';
  items.forEach((it,i)=>{const j=(i+1)%k;if(o.open&&j===0)return;
    const [x1,y1]=P(i),[x2,y2]=P(j), w1=it.w||70, w2=items[j].w||70;
    const g1=Math.min(80,(w1/2+10)/R*180/Math.PI*(Math.abs(Math.cos((a0+i*360/k)*Math.PI/180))>.5?1:.55)+6);
    const g2=Math.min(80,(w2/2+10)/R*180/Math.PI*(Math.abs(Math.cos((a0+j*360/k)*Math.PI/180))>.5?1:.55)+8);
    const A1=(a0+i*360/k+g1)*Math.PI/180, A2=(a0+(i+1)*360/k-g2)*Math.PI/180;
    es+=`<path d="M${FX(cx+R*Math.cos(A1))} ${FX(cy+R*Math.sin(A1))} A${R} ${R} 0 0 1 ${FX(cx+R*Math.cos(A2))} ${FX(cy+R*Math.sin(A2))}" stroke="#6A5B47" stroke-width="1.5" fill="none" marker-end="url(#ahp)"/>`;
    if(o.labs&&o.labs[i]){const am=(a0+(i+.5)*360/k)*Math.PI/180, rr=R+(o.lr||18), lx=cx+rr*Math.cos(am), ly=cy+rr*Math.sin(am);
      const anc=Math.cos(am)>.25?'start':Math.cos(am)<-.25?'end':'mid';
      ls+=lines(o.labs[i]).map((l,q)=>T(FX(lx),FX(ly+4+q*13+(Math.sin(am)>.5?6:Math.sin(am)<-.5?-6-(lines(o.labs[i]).length-1)*13:0)),l,`note ${anc} f11 halo`)).join('');}
  });
  items.forEach((it,i)=>{const [x,y]=P(i);ns+=nodeBox({x,y,w:it.w||70,t:it.t,f:it.f,sub:it.sub,fs:it.fs}).s;});
  return es+ns+ls;
}
/* axes: returns {s,px,py,...}; o:{xr,yr,xlab,ylab,xt,yt,xfmt,yfmt,logx,logy} */
function axes(x,y,w,h,o){
  const lx=v=>o.logx?Math.log10(v):v, ly=v=>o.logy?Math.log10(v):v;
  const X0=lx(o.xr[0]),X1=lx(o.xr[1]),Y0=ly(o.yr[0]),Y1=ly(o.yr[1]);
  const px=v=>x+(lx(v)-X0)/(X1-X0)*w, py=v=>y+h-(ly(v)-Y0)/(Y1-Y0)*h;
  let s=`<path d="M${x} ${y} V${y+h} H${x+w}" stroke="#6A5B47" stroke-width="1.3" fill="none"/>`;
  (o.xt||[]).forEach(t=>{const v=Array.isArray(t)?t[0]:t,l=Array.isArray(t)?t[1]:t;s+=ln(FX(px(v)),y+h,FX(px(v)),y+h+4,'#6A5B47',1)+T(FX(px(v)),y+h+16,l,'note mid f10');});
  (o.yt||[]).forEach(t=>{const v=Array.isArray(t)?t[0]:t,l=Array.isArray(t)?t[1]:t;s+=ln(x-4,FX(py(v)),x,FX(py(v)),'#6A5B47',1)+T(x-7,FX(py(v)+3.5),l,'note end f10');});
  if(o.xlab)s+=T(x+w/2,y+h+(o.xt?32:18),o.xlab,'note mid f12');
  if(o.ylab)s+=`<text transform="translate(${x-(o.yt?(o.ydx||34):14)} ${y+h/2}) rotate(-90)" class="note mid f12">${o.ylab}</text>`;
  return {s,px,py,x,y,w,h,xr:o.xr,logx:o.logx};
}
function curve(A,f,o={}){const N=o.n||120,a=o.from==null?A.xr[0]:o.from,b=o.to==null?A.xr[1]:o.to;let d='';
  for(let i=0;i<=N;i++){const v=A.logx?a*Math.pow(b/a,i/N):a+(b-a)*i/N, yv=f(v); if(!isFinite(yv))continue; d+=(d?' L':'M')+FX(A.px(v))+' '+FX(A.py(yv));}
  return `<path d="${d}" stroke="${o.col||'#2F5276'}" stroke-width="${o.w||2.2}" fill="none"${o.dash?` stroke-dasharray="${o.dash}"`:''}/>`;}
/* horizontal bars: items [[label,value,colour,note]] */
function hbars(n,x,y,w,items,o={}){const max=o.max||Math.max(...items.map(i=>i[1])), lw=o.lw||(n?96:150), bh=o.bh||16, gap=o.gap||10;let s='',yy=y;
  items.forEach((it,i)=>{const bw=Math.max(2,(w-lw-(o.vw||46))*it[1]/max);
    s+=G('a-fade',(i*.12).toFixed(2),T(x+lw-8,yy+bh-4,it[0],'lab end '+(n?'f11':'f12'))+box(x+lw,yy,FX(bw),bh,it[2]||PAL.blue,2)+T(FX(x+lw+bw+6),yy+bh-4,it[3]!=null?it[3]:it[1],'mono start f10'));yy+=bh+gap;});
  return {s,y:yy};}
/* grid of text cards with equalised row heights; items [[head,body,art?]] art(cx,cy) drawn in a band of artH */
function cards(n,items,o={}){
  const cols=n?(o.ncols||1):(o.cols||2), x0=o.x||(n?10:12), W=((n?340:616)-(cols-1)*(o.gap||12))/cols, artH=o.artH||0;
  const cw=o.cw||6.4; let y=o.y||20, s='';
  for(let r=0;r<items.length;r+=cols){const row=items.slice(r,r+cols);
    const Ls=row.map(it=>wrap(it[1],Math.floor((W-24)/cw)));
    const Hh=row.map(it=>lines(it[0]).length);
    const h=Math.max(...row.map((it,i)=>30+(Hh[i]-1)*18+artH+Ls[i].length*16+10));
    row.forEach((it,i)=>{const x=x0+i*(W+(o.gap||12)), num=o.num?r+i+1:0;
      s+=G('a-fade',((r+i)*.25).toFixed(2),box(x,y,W,h,it[3]||o.fill||'#E7DEC9',4)+(num?badge(x+16,y+17,num):'')
        +lines(it[0]).map((l,q)=>T(x+(num?32:12),y+22+q*18,l,'lab start f14')).join('')
        +(it[2]&&artH?it[2](x+W/2,y+26+(Hh[i]-1)*18+artH/2,W):'')
        +Ls[i].map((l,j)=>T(x+12,y+40+(Hh[i]-1)*18+artH+j*16,l,'note start f12')).join(''));});
    y+=h+(o.vgap||10);}
  return {s,y};}
/* explorer card for a chips plate: it={h,sub,rows:[[k,v]],pros:[],cons:[],note,art:(cx,cy,n)=>svg,artH} */
function explorer(n,it,o={}){
  let s='',y=o.y||34;const x=n?16:24, R=n?344:616;
  if(it.art){s+=G('a-fade',0,it.art(n?180:320,y+(it.artH||120)/2-6,n));y+=(it.artH||120)+8;}
  s+=G('a-fade',.1,T(x,y,it.h,'cname start f16'));y+=18;
  if(it.sub){s+=G('a-fade',.15,T(x,y,it.sub,'mono acc start f12'));y+=8;}
  y+=14;
  const kx=x, vx=n?x+104:x+180, vw=n?30:66;
  (it.rows||[]).forEach((r,i)=>{const V=wrap(r[1],vw);s+=G('a-fade',(.2+i*.08).toFixed(2),T(kx,y,r[0],'lab start f13')+V.map((l,j)=>T(vx,y+j*16,l,'note start f13')).join(''));y+=V.length*16+10;});
  if(it.pros||it.cons){y+=6;const cx2=n?x:x+300, cw=n?44:40;let ya=y,yb=y;
    if(it.pros){s+=T(x,ya,it.ph||'Strengths','cname start f14');ya+=20;it.pros.forEach(p=>{const L=wrap(p,cw);s+=Tc(x+4,ya,'+','#4F7A3F',13,'mono start','600')+L.map((l,j)=>T(x+18,ya+j*16,l,'note start f12')).join('');ya+=L.length*16+6;});}
    if(n)yb=ya+8;
    if(it.cons){s+=T(cx2,yb,it.ch||'Limitations','cname start f14');yb+=20;it.cons.forEach(p=>{const L=wrap(p,cw);s+=Tc(cx2+4,yb,'−','#A4473A',13,'mono start','600')+L.map((l,j)=>T(cx2+18,yb+j*16,l,'note start f12')).join('');yb+=L.length*16+6;});}
    y=Math.max(ya,yb)+6;}
  if(it.note){const p=para(x,y+10,it.note,n?50:92,'lab start f13',17,.6);s+=p.s;y=p.y;}
  return {vb:n?slim(y+10):wide(y+12),s};
}
/* rod-shaped cell outline */
function rodCell2(cx,cy,L,R,o={}){return `<rect x="${cx-L/2}" y="${cy-R}" width="${L}" height="${2*R}" rx="${R}" fill="${o.fill||'#E4E8D4'}" stroke="${o.stroke||INK}" stroke-width="${o.sw||1.6}" ${o.tint===false?'':'class="tint"'}/>`;}
function coccus(cx,cy,r,o={}){return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill||'#E4E8D4'}" stroke="${o.stroke||INK}" stroke-width="${o.sw||1.4}" class="tint"/>`;}
function membraneBand(x1,x2,y,h=16,o={}){let s=`<rect x="${x1}" y="${y}" width="${x2-x1}" height="${h}" fill="${o.fill||'#EDE0B8'}"/>`;
  s+=`<path d="M${x1+3} ${y+3} H${x2} M${x1+3} ${y+h-3} H${x2}" stroke="${o.dot||'#B89A5E'}" stroke-width="4.5" stroke-dasharray="0.1 7" stroke-linecap="round"/>`;return s;}
function pill(x,y,t,fill,tc='#F3EDE0',fs=11){const w=t.length*fs*.62+18;return `<rect x="${FX(x)}" y="${y-fs-3}" width="${FX(w)}" height="${fs+9}" rx="${(fs+9)/2}" fill="${fill}"/>`+Tc(FX(x+w/2),y+1,t,tc,fs,'mono mid','600');}
/* simple two-column text plate for wide, stacked on narrow: art on left/top, bullets right/below */
function artBullets(n,art,artW,artH,items,o={}){
  let s='';s+=G('a-fade',0,art(n?180:(o.ax||20)+artW/2,(o.ay||24)+artH/2,n));
  const b=n?bullets(24,(o.ay||24)+artH+30,items,44,{d0:.8,gap:o.gap||24}):bullets(o.bx||(artW+56),o.by||44,items,o.wn||Math.floor((600-artW-40)/7),{d0:.8,gap:o.gap||24});
  s+=b.s;
  let H=n?b.y:Math.max(b.y,(o.ay||24)+artH+16);
  if(o.foot){const p=para(n?16:24,H+8,o.foot,n?50:92,'note start f13',17,2);s+=p.s;H=p.y;}
  return {vb:n?slim(H+4):wide(H+6),s};
}
