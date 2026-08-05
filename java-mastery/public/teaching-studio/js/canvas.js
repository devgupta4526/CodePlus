// ═══ CANVAS SETUP ═════════════════════════════════════════════════════════
function fitCanvases() {
  const area = document.getElementById('canvas-area');
  const aw = area.clientWidth - 40, ah = area.clientHeight - 80;
  zoom = Math.min(aw / CW, ah / CH, 1.5);
  resizeMain(zoom);
  renderSlide(false);
}
function resizeMain(z) {
  const dw = Math.round(CW * z), dh = Math.round(CH * z);
  wrap.style.width = dw + 'px'; wrap.style.height = dh + 'px';
  sc.width = CW; sc.height = CH;
  dc.width = CW; dc.height = CH;
  sc.style.width = dw + 'px'; sc.style.height = dh + 'px';
  dc.style.width = dw + 'px'; dc.style.height = dh + 'px';
  sd.style.width = dw + 'px'; sd.style.height = dh + 'px';
}
function applyZoom(z) {
  zoom = Math.max(.3, Math.min(z, 2));
  resizeMain(zoom);
  renderSlide(false);
}

// ═══ BACKGROUND + ANIMATED BG ENGINE ═════════════════════════════════════
let _animBg = null;     // AnimatedBg instance (editor)
let _particles = null;  // ParticleSystem instance
let _particleCanvas = null;

function drawBg(ctx, s) {
  const acc = s.accent || '#7c8cf8';
  ctx.fillStyle = s.bg || '#0b0d14';
  ctx.fillRect(0, 0, CW, CH);
  // Dot-grid
  for (let x = 0; x <= CW; x += 80) {
    for (let y = 0; y <= CH; y += 80) {
      ctx.beginPath();
      ctx.arc(x, y, 1.1, 0, Math.PI * 2);
      ctx.fillStyle = acc + '18';
      ctx.fill();
    }
  }
  // Animated vertical left bar
  ctx.fillStyle = acc;
  ctx.fillRect(0, 0, 4, CH);
  // Corner radial glows
  const g1 = ctx.createRadialGradient(0, CH, 0, 0, CH, 440);
  g1.addColorStop(0, acc + '1c'); g1.addColorStop(1, 'transparent');
}

function _startAnimBg(s) {
  if (!_animBg && window.MotionEngine) {
    _animBg = new MotionEngine.AnimatedBg(sCtx);
  }
  if (_animBg) {
    _animBg.stop();
    _animBg.start(s);
  }
}

function _startParticles(s) {
  if (!MotionEngine) return;
  const PARTICLE_LAYOUTS = ['title', 'hook', 'hero-split', 'transition', 'mystery', 'did-you-know', 'prediction'];
  const MESH_LAYOUTS = ['concept-map', 'microservices', 'oop', 'architecture'];
  const GRID_LAYOUTS = ['pipeline', 'rest-api', 'transactions'];

  if (_particles) {
    _particles.stop();
    _particles = null;
  }

  if (!PARTICLE_LAYOUTS.includes(s.layout) && !MESH_LAYOUTS.includes(s.layout) && !GRID_LAYOUTS.includes(s.layout)) {
    return;
  }

  if (!_particleCanvas) {
    _particleCanvas = MotionEngine.createParticleCanvas(wrap);
  }
  _particleCanvas.width = CW;
  _particleCanvas.height = CH;
  _particleCanvas.style.width = wrap.style.width;
  _particleCanvas.style.height = wrap.style.height;

  if (PARTICLE_LAYOUTS.includes(s.layout)) {
    _particles = new MotionEngine.ParticleSystem(_particleCanvas);
    _particles.start(s.accent || '#7c8cf8', 38);
  } else if (MESH_LAYOUTS.includes(s.layout)) {
    _particles = new MotionEngine.MeshNetwork(_particleCanvas);
    _particles.start(s.accent || '#7c8cf8', 55);
  } else if (GRID_LAYOUTS.includes(s.layout)) {
    _particles = new MotionEngine.PerspectiveGrid(_particleCanvas);
    _particles.start(s.accent || '#7c8cf8');
  }
}

// ═══ RENDER ═══════════════════════════════════════════════════════════════
// Editor uses static drawBg. Present mode uses AnimatedBg (see pRenderSlide).
function renderSlide(animate) {
  try {
    if (!slides.length) return;
    const s = slides[cur];
    sCtx.clearRect(0, 0, CW, CH);
    drawBg(sCtx, s);
    if (s._ann) dCtx.putImageData(s._ann, 0, 0);
    else dCtx.clearRect(0, 0, CW, CH);
    renderDom(s, sd, zoom, animate !== false);
    revealAll(sd);
    if (window.MotionEngine) {
      MotionEngine.initSlideMotion(s, sd, s.accent || '#7c8cf8');
    }
    updateUI();
  } catch (err) {
    sCtx.fillStyle = 'red';
    sCtx.fillRect(0, 0, CW, 60);
    sCtx.fillStyle = 'white';
    sCtx.font = '20px monospace';
    sCtx.fillText("ERROR: " + err.message + " " + err.stack, 20, 30);
    console.error(err);
  }
}

// ═══ STEP REVEAL ══════════════════════════════════════════════════════════
function getRevealItems(target) {
  target = target || (typeof pActive !== 'undefined' && pActive ? pDom : sd);
  if (!target) return [];
  const items = [...target.querySelectorAll('.bullet-item'), ...target.querySelectorAll('.code-line'), ...target.querySelectorAll('.step-item'), ...target.querySelectorAll('[data-step]')];
  items.sort((a, b) => parseInt(a.dataset.idx || '0') - parseInt(b.dataset.idx || '0'));
  return items;
}
function revealAll(target) {
  target = target || (typeof pActive !== 'undefined' && pActive ? pDom : sd);
  getRevealItems(target).forEach(e => e.classList.add('visible'));
  curStep = getRevealItems(target).length; updateStepCounter();
}
function hideAllSteps(target) {
  target = target || (typeof pActive !== 'undefined' && pActive ? pDom : sd);
  getRevealItems(target).forEach(e => e.classList.remove('visible'));
  curStep = 0; updateStepCounter();
}
function updateStepCounter() {
  const items = getRevealItems();
  const total = items.length;
  document.getElementById('step-ctr').textContent = total > 0 ? `step ${curStep}/${total}` : '';
  if (pActive) pUpdateNav();
}

// ═══ NAVIGATION ═══════════════════════════════════════════════════════════
function goSlide(n) {
  if (n < 0 || n >= slides.length) return;
  slides[cur]._ann = dCtx.getImageData(0, 0, CW, CH);
  drawHistory = []; redoStack = [];
  cur = n;
  renderSlide(true);
  setTimeout(() => {
    if (getRevealItems(sd).length > 0) {
      hideAllSteps(sd);
    }
  }, 20);
  updateSidebar();
  if (pActive) pGoSlide(true);
}
function advance() {
  const target = (typeof pActive !== 'undefined' && pActive) ? pDom : sd;
  const hidden = getRevealItems(target).filter(e => !e.classList.contains('visible'));
  if (hidden.length) {
    hidden[0].classList.add('visible'); curStep++; updateStepCounter();
    return;
  }
  if (cur < slides.length - 1) goSlide(cur + 1);
}
function retreat() {
  const target = (typeof pActive !== 'undefined' && pActive) ? pDom : sd;
  const visible = getRevealItems(target).filter(e => e.classList.contains('visible'));
  if (visible.length) {
    visible[visible.length - 1].classList.remove('visible'); curStep--; updateStepCounter();
    return;
  }
  if (cur > 0) {
    goSlide(cur - 1);
    setTimeout(() => { revealAll(target); }, 80);
  }
}
