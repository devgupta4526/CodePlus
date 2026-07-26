// ═══ UI UPDATES ═══════════════════════════════════════════════════════════
function updateUI(){
  const tot=slides.length;
  document.getElementById('slide-ctr').textContent=`${cur+1} / ${tot}`;
  document.getElementById('sb-ctr').textContent=`${cur+1}/${tot}`;
  document.getElementById('prev-btn').disabled=cur===0;
  document.getElementById('next-btn').disabled=cur===slides.length-1;
}
function updateSidebar(){
  const list=document.getElementById('slide-list');
  list.innerHTML='';
  slides.forEach((s,i)=>{
    const d=document.createElement('div');
    d.className='slide-thumb'+(i===cur?' active':'');
    const c=document.createElement('canvas');c.width=320;c.height=180;
    d.appendChild(c);
    const n=document.createElement('span');n.className='thumb-num';n.textContent=i+1;
    d.appendChild(n);
    drawThumb(c.getContext('2d'),s,320,180);
    d.onclick=()=>goSlide(i);
    list.appendChild(d);
  });
  updateUI();
}
function drawThumb(ctx,s,w,h){
  ctx.fillStyle=s.bg||'#0b0d14';ctx.fillRect(0,0,w,h);
  const acc=s.accent||'#7c8cf8';
  ctx.fillStyle=acc;ctx.fillRect(0,0,3,h);
  ctx.fillStyle='#e8eaf6';ctx.font='bold 10px monospace';ctx.textAlign='left';
  ctx.fillText((s.title||'').slice(0,28),8,16);
  ctx.fillStyle=acc;ctx.font='8px monospace';
  ctx.fillText((s.subtitle||'').slice(0,36),8,28);
  const ly=s.layout;
  if(ly==='code'||ly==='split'||ly==='compare'){
    ctx.fillStyle='#0d1117';ctx.beginPath();if(ctx.roundRect)ctx.roundRect(6,35,w-12,h-42,3);else ctx.rect(6,35,w-12,h-42);ctx.fill();
    ctx.font='7px monospace';ctx.fillStyle='#c792ea';
    const code=ly==='compare'?s.leftCode:s.code;
    (code||'').split('\n').slice(0,7).forEach((l,li)=>ctx.fillText(l.slice(0,38),9,46+li*8.5));
  } else if(ly==='bullets'||ly==='timeline'){
    (s.bullets||[]).slice(0,4).forEach((b,bi)=>{
      ctx.fillStyle=acc+'30';if(ctx.roundRect)ctx.roundRect(6,38+bi*20,w-12,16,2);else ctx.rect(6,38+bi*20,w-12,16);ctx.fill();
      ctx.fillStyle='#a0a8d0';ctx.font='7px monospace';ctx.fillText('▸ '+b.slice(0,38),9,49+bi*20);
    });
  } else if(ly==='title'){
    ctx.fillStyle=acc;ctx.font='bold 16px monospace';ctx.textAlign='center';ctx.fillText((s.title||'').slice(0,18),w/2,h/2+4);ctx.textAlign='left';
  } else if(ly==='quote'){
    ctx.fillStyle=acc+'40';ctx.font='bold 40px monospace';ctx.textAlign='center';ctx.fillText('"',w/2,h/2+14);ctx.textAlign='left';
    ctx.fillStyle='#c0c4e0';ctx.font='7px monospace';ctx.textAlign='center';ctx.fillText((s.quote||'').slice(0,40),w/2,h-20);ctx.textAlign='left';
  } else if(ly==='stats'){
    const sts=s.stats||[];const cols=3,rows=2;
    sts.slice(0,6).forEach((st,si)=>{
      const cx=(si%cols)*(w/cols)+4, cy=Math.floor(si/cols)*(h/rows/2)+35;
      ctx.fillStyle=(st.color||acc)+'25';if(ctx.roundRect)ctx.roundRect(cx,cy,(w/cols)-8,(h/rows/2)-4,2);else ctx.rect(cx,cy,(w/cols)-8,(h/rows/2)-4);ctx.fill();
      ctx.fillStyle=st.color||acc;ctx.font='bold 8px monospace';ctx.textAlign='center';ctx.fillText((st.value||'').slice(0,8),cx+(w/cols-8)/2,cy+12);
      ctx.fillStyle='#6070a0';ctx.font='6px monospace';ctx.fillText((st.label||'').slice(0,12),cx+(w/cols-8)/2,cy+22);ctx.textAlign='left';
    });
  } else if(ly==='callout'){
    ctx.fillStyle=acc+'15';if(ctx.roundRect)ctx.roundRect(6,35,w-12,32,3);else ctx.rect(6,35,w-12,32);ctx.fill();
    ctx.fillStyle=acc;ctx.font='bold 14px monospace';ctx.fillText(s.calloutIcon||'💡',10,58);
    ctx.fillStyle='#c0c4e0';ctx.font='7px monospace';ctx.fillText((s.callout||'').slice(0,40),30,52);
  } else if(ly==='two-col'){
    const lb=s.leftBullets||[],rb=s.rightBullets||[];
    const hw=(w-18)/2;
    lb.slice(0,3).forEach((b,bi)=>{ctx.fillStyle=acc+'20';if(ctx.roundRect)ctx.roundRect(5,38+bi*18,hw,14,2);else ctx.rect(5,38+bi*18,hw,14);ctx.fill();ctx.fillStyle='#808098';ctx.font='6px monospace';ctx.fillText('▸ '+b.slice(0,16),8,48+bi*18);});
    rb.slice(0,3).forEach((b,bi)=>{ctx.fillStyle=acc+'20';if(ctx.roundRect)ctx.roundRect(w/2+4,38+bi*18,hw,14,2);else ctx.rect(w/2+4,38+bi*18,hw,14);ctx.fill();ctx.fillStyle='#808098';ctx.font='6px monospace';ctx.fillText('▸ '+b.slice(0,16),w/2+7,48+bi*18);});
  } else if(ly==='diagram'){
    ctx.fillStyle=acc+'20';if(ctx.roundRect)ctx.roundRect(6,35,w-12,h-42,3);else ctx.rect(6,35,w-12,h-42);ctx.fill();
    ctx.fillStyle=acc;ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillText('['+s.diagramType+']',w/2,(h+35)/2);ctx.textAlign='left';
  } else if(ly==='image-text'){
    ctx.fillStyle=acc+'15';if(ctx.roundRect)ctx.roundRect(w/2+4,35,w/2-10,h-45,3);else ctx.rect(w/2+4,35,w/2-10,h-45);ctx.fill();
    ctx.fillStyle='#3a3d52';ctx.font='14px monospace';ctx.textAlign='center';ctx.fillText('🖼️',w*3/4,h/2+8);ctx.textAlign='left';
    (s.bullets||[]).slice(0,3).forEach((b,bi)=>{ctx.fillStyle=acc+'20';if(ctx.roundRect)ctx.roundRect(5,38+bi*18,w/2-8,14,2);else ctx.rect(5,38+bi*18,w/2-8,14);ctx.fill();ctx.fillStyle='#808098';ctx.font='6px monospace';ctx.fillText('▸ '+b.slice(0,14),8,48+bi*18);});
  } else if(ly==='concept-map'){
    ctx.fillStyle=acc+'25';if(ctx.roundRect)ctx.roundRect(w/2-28,h/2-10,56,20,3);else ctx.rect(w/2-28,h/2-10,56,20);ctx.fill();
    ctx.fillStyle=acc;ctx.font='bold 7px monospace';ctx.textAlign='center';ctx.fillText((s.title||'').slice(0,10),w/2,h/2+4);ctx.textAlign='left';
    (s.bullets||[]).slice(0,6).forEach((b,bi)=>{
      const ang=(bi/Math.max(s.bullets.length,1))*Math.PI*2-Math.PI/2;
      const nx=w/2+w*.32*Math.cos(ang),ny=h/2+h*.32*Math.sin(ang);
      ctx.fillStyle=acc+'18';if(ctx.roundRect)ctx.roundRect(nx-22,ny-8,44,16,2);else ctx.rect(nx-22,ny-8,44,16);ctx.fill();
      ctx.fillStyle='#7080a0';ctx.font='5px monospace';ctx.textAlign='center';ctx.fillText(b.slice(0,10),nx,ny+4);ctx.textAlign='left';
    });
  } else {
    // generic fallback for narrative templates — badge with role icon + layout name
    const badges={hook:'🤔',problem:'⚠️',prediction:'🔮',story:'📖',analogy:'=',journey:'→',mystery:'❓','wrong-assumption':'❌','myth-vs-reality':'🆚','common-mistake':'✖',challenge:'⏸',quiz:'❓','memory-trick':'🧠','did-you-know':'💡',character:'👤',transition:'↓',summary:'✔','bar-chart':'📊',venn:'◐','stack-visual':'▭','process-loop':'🔁',spectrum:'↔','icon-grid':'▦','image-full':'🖼️',terminal:'⌨',pipeline:'⊙','orbit-diagram':'⊛','glitch-title':'⚡','hero-split':'🚀','bento-grid':'🍱','glass-fan':'🪭','3d-carousel':'🎠'};
    ctx.fillStyle=acc+'15';if(ctx.roundRect)ctx.roundRect(6,35,w-12,h-42,3);else ctx.rect(6,35,w-12,h-42);ctx.fill();
    ctx.fillStyle=acc;ctx.font='bold 18px monospace';ctx.textAlign='center';ctx.fillText(badges[ly]||'▣',w/2,h/2);
    ctx.font='bold 8px monospace';ctx.fillText(ly,w/2,h/2+16);ctx.textAlign='left';
  }
}
