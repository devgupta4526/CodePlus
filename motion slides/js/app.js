// ═══ SHORTCUTS PANEL ══════════════════════════════════════════════════════
(()=>{
  const panel=document.getElementById('shortcuts-panel');
  panel.classList.add('hidden');
  document.getElementById('sc-toggle').onclick=()=>panel.classList.toggle('hidden');
  document.getElementById('sc-close').onclick=()=>panel.classList.add('hidden');
})();

// ═══ TOOL BUTTONS ═════════════════════════════════════════════════════════
document.querySelectorAll('[id^="tool-"]').forEach(b=>b.onclick=()=>setTool(b.id.replace('tool-','')));
let prevTool='pen';
function setTool(t){
  prevTool=tool;
  // Commit any in-progress stroke before switching tools
  const cs=getCS(dCtx);
  if(cs.drawing){
    cs.drawing=false;
    ctx_resetState(dCtx);
    const img=dCtx.getImageData(0,0,CW,CH);
    drawHistory.push(img);redoStack=[];slides[cur]._ann=img;
  }
  tool=t;
  document.querySelectorAll('[id^="tool-"]').forEach(b=>b.classList.remove('active'));
  const b=document.getElementById('tool-'+t);if(b)b.classList.add('active');
  dc.style.cursor=t==='eraser'?'cell':t==='text'?'text':'crosshair';
  const pulse=document.getElementById('mode-pulse'),lbl=document.getElementById('mode-label');
  if(t==='laser'){pulse.className='mode-pulse laser';lbl.textContent='Laser';}
  else if(t==='eraser'){pulse.className='mode-pulse';lbl.textContent='Erasing';}
  else{pulse.className='mode-pulse drawing';lbl.textContent=t.charAt(0).toUpperCase()+t.slice(1);}
  // Only clean up laser dot when switching away from laser
  clearTimeout(laserTimerId);
  if(prevTool==='laser'&&t!=='laser'){
    // Restore annotations over the laser dot — do NOT wipe if no laser was active
    dCtx.clearRect(0,0,CW,CH);
    const img=slides[cur]&&slides[cur]._ann;
    if(img) dCtx.putImageData(img,0,0);
  }
}
document.querySelectorAll('.swatch').forEach(d=>d.onclick=()=>{
  color=d.dataset.color;
  document.querySelectorAll('.swatch').forEach(x=>x.classList.remove('active'));d.classList.add('active');
});
document.getElementById('stroke-range').oninput=e=>{strokeSize=+e.target.value;document.getElementById('stroke-val').textContent=strokeSize;};
document.getElementById('undo-btn').onclick=undo;
document.getElementById('redo-btn').onclick=redo;
document.getElementById('clear-btn').onclick=clearAnns;
document.getElementById('prev-btn').onclick=retreat;
document.getElementById('next-btn').onclick=advance;
document.getElementById('add-slide-btn').onclick=()=>{
  slides.push(mkSlide({layout:'bullets',title:'New Slide',subtitle:'Subtitle',bullets:['First point','Second point'],accent:'#7c8cf8'}));
  goSlide(slides.length-1);updateSidebar();renderEditor();
};
document.querySelectorAll('.etab').forEach(t=>t.onclick=()=>{
  activeTab=t.dataset.tab;
  document.querySelectorAll('.etab').forEach(x=>x.classList.remove('active'));t.classList.add('active');
  renderEditor();
});
document.getElementById('zm-in').onclick=()=>applyZoom(zoom+.1);
document.getElementById('zm-out').onclick=()=>applyZoom(zoom-.1);
document.getElementById('zm-reset').onclick=()=>{zoom=1;applyZoom(1);fitCanvases();};
document.getElementById('fs-btn').onclick=enterPresent;

// ═══ KEYBOARD ═════════════════════════════════════════════════════════════
document.addEventListener('keydown',e=>{
  if(document.getElementById('json-modal').classList.contains('open')) return;
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return;
  if(e.key==='Escape'){if(pActive){exitPresent();return;}}
  if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();advance();}
  else if(e.key==='ArrowLeft'){e.preventDefault();retreat();}
  else if(!e.ctrlKey&&!e.metaKey){
    if(e.key==='p'||e.key==='P'){if(pActive)pSetTool('pen');else setTool('pen');}
    else if(e.key==='m'||e.key==='M'){if(pActive)pSetTool('marker');else setTool('marker');}
    else if(e.key==='a'||e.key==='A'){if(pActive)pSetTool('arrow');else setTool('arrow');}
    else if(e.key==='r'||e.key==='R'){if(pActive)pSetTool('rect');else setTool('rect');}
    else if(e.key==='c'||e.key==='C'){if(pActive)pSetTool('circle');else setTool('circle');}
    else if(e.key==='t'||e.key==='T'){if(pActive)pSetTool('text');else setTool('text');}
    else if(e.key==='e'||e.key==='E'){if(pActive)pSetTool('eraser');else setTool('eraser');}
    else if(e.key==='l'||e.key==='L'){if(pActive)pSetTool('laser');else setTool('laser');}
    else if(e.key==='f'||e.key==='F') enterPresent();
    else if(e.key==='Delete'){if(pActive)pClear();else clearAnns();}
  }
  else if(e.ctrlKey&&e.key==='z'){e.preventDefault();if(pActive)pUndo();else undo();}
  else if(e.ctrlKey&&e.key==='y'){e.preventDefault();redo();}
  else if((e.ctrlKey||e.metaKey)&&e.key==='i'){e.preventDefault();openJsonModal('import');}
  else if((e.ctrlKey||e.metaKey)&&e.key==='e'){e.preventDefault();openJsonModal('export');}
});

// ═══ INIT ═════════════════════════════════════════════════════════════════
slides=buildDefaultSlides();
fitCanvases();
updateSidebar();
renderEditor();
setTool('pen');
window.addEventListener('resize',fitCanvases);
