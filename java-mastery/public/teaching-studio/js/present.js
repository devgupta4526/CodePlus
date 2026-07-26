// ═══ PRESENTATION MODE ════════════════════════════════════════════════════
const pOverlay = document.getElementById('present-overlay');
const pWrap = document.getElementById('present-canvas-wrap');
const pSc = document.getElementById('present-slide-canvas');
const pDc = document.getElementById('present-draw-canvas');
const pDom = document.getElementById('present-dom');
const pSCtx = pSc.getContext('2d');
const pDCtx = pDc.getContext('2d', { willReadFrequently: true });
let pZoom = 1, pTool = 'pen', pColor = '#7c8cf8', pStroke = 3;
let pDrawHistory = [], pRedoStack = [], pHudTimer = null;

function enterPresent() {
  pActive = true;
  pOverlay.classList.add('active');
  pFitCanvas();
  pRenderSlide(true);
  // sync step visibility
  if (['bullets', 'code', 'split', 'compare', 'timeline', 'callout', 'two-col', 'image-text', 'concept-map', 'problem', 'prediction', 'wrong-assumption', 'story', 'journey', 'mystery', 'myth-vs-reality', 'common-mistake', 'quiz', 'memory-trick', 'character', 'summary', 'bar-chart', 'venn', 'stack-visual', 'process-loop', 'icon-grid', 'bento-grid', 'glass-fan', '3d-carousel', 'pipeline', 'hero-split', 'terminal', 'orbit-diagram', 'glitch-title'].includes(slides[cur].layout)) {
    setTimeout(() => { hideAllSteps(sd); pSyncVisible(); }, 20);
  }
  pOverlay.requestFullscreen().catch(() => { });
  showHud();
}
function exitPresent() {
  pActive = false;
  pOverlay.classList.remove('active');
  if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
  // Stop present-mode animated bg + particles
  if (window._pAnimBg) { window._pAnimBg.stop(); }
  if (window._pParticles) { window._pParticles.stop(); }
}
function pFitCanvas() {
  const sw = window.screen.width || window.innerWidth, sh = window.screen.height || window.innerHeight;
  pZoom = Math.min(sw / CW, sh / CH);
  const dw = Math.round(CW * pZoom), dh = Math.round(CH * pZoom);
  pWrap.style.width = dw + 'px'; pWrap.style.height = dh + 'px';
  pSc.width = CW; pSc.height = CH;
  pDc.width = CW; pDc.height = CH;
  pSc.style.width = dw + 'px'; pSc.style.height = dh + 'px';
  pDc.style.width = dw + 'px'; pDc.style.height = dh + 'px';
  pDom.style.width = dw + 'px'; pDom.style.height = dh + 'px';
}
function pRenderSlide(animate) {
  if (!slides.length) return;
  const s = slides[cur];
  pSCtx.clearRect(0, 0, CW, CH);
  // Use the animated background engine for present mode too
  if (window.MotionEngine) {
    if (!window._pAnimBg) {
      window._pAnimBg = new MotionEngine.AnimatedBg(pSCtx);
    }
    window._pAnimBg.stop();
    window._pAnimBg.start(s);
    // Particles on cinematic slides
    const CINEMATIC = ['title', 'hook', 'hero-split', 'transition', 'mystery', 'did-you-know', 'prediction'];
    if (CINEMATIC.includes(s.layout)) {
      let ppc = document.getElementById('present-particle-canvas');
      if (!ppc) {
        ppc = document.createElement('canvas');
        ppc.id = 'present-particle-canvas';
        ppc.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;z-index:2;opacity:.75';
        pWrap.appendChild(ppc);
      }
      ppc.width = CW; ppc.height = CH;
      ppc.style.width = pDom.style.width; ppc.style.height = pDom.style.height;
      if (!window._pParticles) window._pParticles = new MotionEngine.ParticleSystem(ppc);
      window._pParticles.stop();
      window._pParticles.start(s.accent || '#7c8cf8', 38);
    } else {
      if (window._pParticles) window._pParticles.stop();
    }
  } else {
    drawBg(pSCtx, s);
  }
  pDCtx.clearRect(0, 0, CW, CH);
  pDrawHistory = []; pRedoStack = [];
  renderDom(s, pDom, pZoom, animate);
  if (window.MotionEngine) MotionEngine.initSlideMotion(s, pDom, s.accent || '#7c8cf8');
  pUpdateNav();
}
function pGoSlide(animate) {
  pRenderSlide(animate);
  if (['bullets', 'code', 'split', 'compare', 'timeline', 'callout', 'two-col', 'image-text', 'concept-map', 'problem', 'prediction', 'wrong-assumption', 'story', 'journey', 'mystery', 'myth-vs-reality', 'common-mistake', 'quiz', 'memory-trick', 'character', 'summary', 'bar-chart', 'venn', 'stack-visual', 'process-loop', 'icon-grid'].includes(slides[cur].layout)) {
    setTimeout(() => { hideAllSteps(pDom); pUpdateNav(); }, 20);
  }
}
function pSyncVisible() {
  // mirror visibility from main sd to pDom
  const mi = [...sd.querySelectorAll('.bullet-item,.code-line')];
  const pi = [...pDom.querySelectorAll('.bullet-item,.code-line')];
  pi.forEach((e, i) => { if (mi[i] && mi[i].classList.contains('visible')) e.classList.add('visible'); else e.classList.remove('visible'); });
  pUpdateNav();
}
function pUpdateNav() {
  document.getElementById('present-slide-ctr').textContent = `${cur + 1} / ${slides.length}`;
  document.getElementById('present-prev').disabled = cur === 0;
  document.getElementById('present-next').disabled = cur === slides.length - 1;
  const items = getRevealItems();
  document.getElementById('present-step-ctr').textContent = items.length ? `step ${curStep}/${items.length}` : '';
}

// HUD auto-hide
function showHud() {
  const h = document.getElementById('present-hud');
  h.classList.remove('hidden'); clearTimeout(pHudTimer);
  pHudTimer = setTimeout(() => h.classList.add('hidden'), 2800);
}
pOverlay.addEventListener('mousemove', showHud);
pOverlay.addEventListener('touchstart', showHud, { passive: true });

// present drawing — reuse shared draw functions
let pLaserTimer2 = null;
pDc.addEventListener('mousedown', e => { showHud(); startDraw(e, pDCtx, pDc, pZoom, pTool, pColor, pStroke); });
pDc.addEventListener('mousemove', e => {
  showHud();
  if (pTool === 'laser') { const p = canvasPos(e, pDc, pZoom); drawLaserDot(p.x, p.y, pDCtx, null); return; }
  moveDraw(e, pDCtx, pDc, pZoom, pTool, pColor, pStroke);
});
pDc.addEventListener('mouseup', () => endDraw(pDCtx, pTool));
pDc.addEventListener('mouseleave', () => { endDraw(pDCtx, pTool); if (pTool === 'laser') pDCtx.clearRect(0, 0, CW, CH); });
pDc.addEventListener('touchstart', e => { e.preventDefault(); showHud(); startDraw(e, pDCtx, pDc, pZoom, pTool, pColor, pStroke); }, { passive: false });
pDc.addEventListener('touchmove', e => { e.preventDefault(); showHud(); moveDraw(e, pDCtx, pDc, pZoom, pTool, pColor, pStroke); }, { passive: false });
pDc.addEventListener('touchend', e => { e.preventDefault(); endDraw(pDCtx, pTool); }, { passive: false });

let pPrevTool = 'pen';
function pSetTool(t) {
  pPrevTool = pTool;
  // Commit any in-progress stroke before switching tools (mirrors main setTool fix)
  const cs = getCS(pDCtx);
  if (cs.drawing) {
    cs.drawing = false;
    ctx_resetState(pDCtx);
    const img = pDCtx.getImageData(0, 0, CW, CH);
    pDrawHistory.push(img); pRedoStack = [];
  }
  pTool = t;
  document.querySelectorAll('.pt-btn[data-ptool]').forEach(b => b.classList.toggle('active', b.dataset.ptool === t));
  pDc.style.cursor = t === 'eraser' ? 'cell' : t === 'text' ? 'text' : 'crosshair';
  // Only clear the laser dot when switching away from laser — never wipe real annotations
  clearTimeout(pLaserTimer2);
  if (pPrevTool === 'laser' && t !== 'laser') {
    pDCtx.clearRect(0, 0, CW, CH);
    if (pDrawHistory.length) pDCtx.putImageData(pDrawHistory[pDrawHistory.length - 1], 0, 0);
  }
}
function pUndo() {
  if (!pDrawHistory.length) return;
  pRedoStack.push(pDrawHistory.pop());
  pDCtx.clearRect(0, 0, CW, CH);
  if (pDrawHistory.length) pDCtx.putImageData(pDrawHistory[pDrawHistory.length - 1], 0, 0);
}
function pClear() { pDCtx.clearRect(0, 0, CW, CH); pDrawHistory = []; pRedoStack = []; }

document.getElementById('present-exit').onclick = exitPresent;
document.getElementById('present-next').onclick = () => { showHud(); advance(); };
document.getElementById('present-prev').onclick = () => { showHud(); retreat(); };
document.getElementById('pt-undo').onclick = pUndo;
document.getElementById('pt-clear').onclick = pClear;
document.getElementById('p-stroke-range').oninput = e => pStroke = +e.target.value;

document.querySelectorAll('.pt-btn[data-ptool]').forEach(b => b.onclick = () => pSetTool(b.dataset.ptool));
document.querySelectorAll('.pt-swatch').forEach(d => d.onclick = () => {
  pColor = d.dataset.pcolor;
  document.querySelectorAll('.pt-swatch').forEach(x => x.classList.remove('active')); d.classList.add('active');
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && pActive) exitPresent();
});
window.addEventListener('resize', () => {
  if (pActive) { pFitCanvas(); pRenderSlide(false); pSyncVisible(); }
});
