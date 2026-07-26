// ═══ DRAWING ══════════════════════════════════════════════════════════════
function canvasPos(e,canvas,z){
  const r=canvas.getBoundingClientRect();
  const cx=e.touches?e.touches[0].clientX:e.clientX;
  const cy=e.touches?e.touches[0].clientY:e.clientY;
  return {x:(cx-r.left)/z, y:(cy-r.top)/z};
}

// ── main canvas events ──
dc.addEventListener('mousedown',e=>startDraw(e,dCtx,dc,zoom,tool,color,strokeSize));
dc.addEventListener('mousemove',e=>moveDraw(e,dCtx,dc,zoom,tool,color,strokeSize));
dc.addEventListener('mouseup',()=>endDraw(dCtx,tool));
dc.addEventListener('mouseleave',()=>{
  endDraw(dCtx,tool);
  if(tool==='laser'){clearTimeout(laserTimerId);const img=slides[cur]._ann;dCtx.clearRect(0,0,CW,CH);if(img)dCtx.putImageData(img,0,0);}
});
dc.addEventListener('touchstart',e=>{e.preventDefault();startDraw(e,dCtx,dc,zoom,tool,color,strokeSize)},{passive:false});
dc.addEventListener('touchmove',e=>{e.preventDefault();moveDraw(e,dCtx,dc,zoom,tool,color,strokeSize)},{passive:false});
dc.addEventListener('touchend',e=>{e.preventDefault();endDraw(dCtx,tool)},{passive:false});

// shared draw state per context
const ctxState=new WeakMap();
function getCS(ctx){if(!ctxState.has(ctx))ctxState.set(ctx,{drawing:false,snap:null,lx:0,ly:0,sx:0,sy:0});return ctxState.get(ctx);}

function startDraw(e,ctx,canvas,z,t,c,sz){
  if(t==='laser') return;
  if(t==='text'){handleText(e,ctx,canvas,z,c,sz);return;}
  // Always reset ctx state before starting — prevents dirty alpha/composite from previous tool
  ctx.globalAlpha=1;
  ctx.globalCompositeOperation='source-over';
  const cs=getCS(ctx); cs.drawing=true;
  const p=canvasPos(e,canvas,z); cs.lx=p.x;cs.ly=p.y;cs.sx=p.x;cs.sy=p.y;
  cs.snap=ctx.getImageData(0,0,CW,CH);
  ctx.strokeStyle=c; ctx.fillStyle=c;
  ctx.lineWidth=t==='marker'?sz*3.5:t==='eraser'?sz*6:sz;
  ctx.globalAlpha=t==='marker'?.35:1;
  ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.globalCompositeOperation=t==='eraser'?'destination-out':'source-over';
  if(['pen','marker','eraser'].includes(t)){ctx.beginPath();ctx.moveTo(cs.lx,cs.ly);}
}
function moveDraw(e,ctx,canvas,z,t,c,sz){
  const p=canvasPos(e,canvas,z);
  if(t==='laser'){drawLaserDot(p.x,p.y,ctx,slides[cur]._ann);return;}
  const cs=getCS(ctx); if(!cs.drawing) return;
  if(['pen','marker','eraser'].includes(t)){
    ctx.lineTo(p.x,p.y);ctx.stroke();cs.lx=p.x;cs.ly=p.y;
  } else {
    ctx.putImageData(cs.snap,0,0);
    ctx.globalAlpha=1;ctx.strokeStyle=c;ctx.lineWidth=sz;ctx.globalCompositeOperation='source-over';
    if(t==='rect'){ctx.beginPath();ctx.strokeRect(cs.sx,cs.sy,p.x-cs.sx,p.y-cs.sy);}
    else if(t==='circle'){const rx=Math.abs(p.x-cs.sx)/2,ry=Math.abs(p.y-cs.sy)/2;ctx.beginPath();ctx.ellipse(cs.sx+(p.x-cs.sx)/2,cs.sy+(p.y-cs.sy)/2,rx,ry,0,0,Math.PI*2);ctx.stroke();}
    else if(t==='arrow')drawArrowCtx(ctx,cs.sx,cs.sy,p.x,p.y,sz);
  }
}
function endDraw(ctx,t){
  const cs=getCS(ctx); if(!cs.drawing) return;
  cs.drawing=false; ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
  const img=ctx.getImageData(0,0,CW,CH);
  if(ctx===dCtx){drawHistory.push(img);redoStack=[];slides[cur]._ann=img;}
  else{pDrawHistory.push(img);pRedoStack=[];}
}
function ctx_resetState(ctx){ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';}
function drawArrowCtx(ctx,x1,y1,x2,y2,sz){
  const a=Math.atan2(y2-y1,x2-x1),hl=Math.max(18,sz*4);
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x2,y2);
  ctx.lineTo(x2-hl*Math.cos(a-.38),y2-hl*Math.sin(a-.38));
  ctx.lineTo(x2-hl*Math.cos(a+.38),y2-hl*Math.sin(a+.38));
  ctx.closePath();ctx.fill();
}
function drawLaserDot(x,y,ctx,ann){
  ctx.clearRect(0,0,CW,CH);
  if(ann) ctx.putImageData(ann,0,0);
  ctx.save();ctx.globalCompositeOperation='source-over';
  const g=ctx.createRadialGradient(x,y,0,x,y,28);
  g.addColorStop(0,'rgba(248,124,124,.9)');g.addColorStop(.4,'rgba(248,124,124,.4)');g.addColorStop(1,'rgba(248,124,124,0)');
  ctx.beginPath();ctx.arc(x,y,28,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
  ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.fillStyle='#f87c7c';ctx.fill();
  ctx.restore();
  clearTimeout(laserTimerId);
  laserTimerId=setTimeout(()=>{ctx.clearRect(0,0,CW,CH);if(ann)ctx.putImageData(ann,0,0);},1500);
}
function handleText(e,ctx,canvas,z,c,sz){
  const p=canvasPos(e,canvas,z);
  const inp=document.createElement('input');
  inp.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;background:rgba(11,13,20,.95);border:1px solid ${c};color:${c};font:${Math.round(sz*5+10)}px 'JetBrains Mono',monospace;outline:none;padding:4px 9px;border-radius:6px;z-index:9999;width:300px`;
  document.body.appendChild(inp); inp.focus();
  const done=()=>{
    const txt=inp.value.trim();
    if(txt){ctx.font=`${sz*5+10}px 'JetBrains Mono',monospace`;ctx.fillStyle=c;ctx.globalAlpha=1;ctx.textAlign='left';ctx.fillText(txt,p.x,p.y);
      const img=ctx.getImageData(0,0,CW,CH);if(ctx===dCtx){drawHistory.push(img);redoStack=[];slides[cur]._ann=img;}else{pDrawHistory.push(img);pRedoStack=[];}}
    if(document.body.contains(inp))document.body.removeChild(inp);
  };
  inp.addEventListener('keydown',ev=>{if(ev.key==='Enter')done();if(ev.key==='Escape'&&document.body.contains(inp))document.body.removeChild(inp);});
  inp.addEventListener('blur',done);
}
function undo(){if(!drawHistory.length)return;redoStack.push(drawHistory.pop());dCtx.clearRect(0,0,CW,CH);if(drawHistory.length){dCtx.putImageData(drawHistory[drawHistory.length-1],0,0);slides[cur]._ann=drawHistory[drawHistory.length-1];}else slides[cur]._ann=null;}
function redo(){if(!redoStack.length)return;const img=redoStack.pop();drawHistory.push(img);dCtx.putImageData(img,0,0);slides[cur]._ann=img;}
function clearAnns(){dCtx.clearRect(0,0,CW,CH);drawHistory=[];redoStack=[];slides[cur]._ann=null;}
