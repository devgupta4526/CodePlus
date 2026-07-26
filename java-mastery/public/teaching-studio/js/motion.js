// ═══════════════════════════════════════════════════════════════════════════
// motion.js  —  Motion Graphics Engine for Java Teaching Studio  v2.0
// ═══════════════════════════════════════════════════════════════════════════

/* ── PARTICLE SYSTEM ─────────────────────────────────────────────────────── */
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.running = false;
    this.raf = null;
    this.accent = '#7c8cf8';
  }

  _mkParticle(full) {
    const y = full ? Math.random() * this.canvas.height : this.canvas.height + 10;
    return {
      x: Math.random() * this.canvas.width,
      y,
      r: 0.5 + Math.random() * 2.0,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(0.22 + Math.random() * 0.5),
      alpha: 0.12 + Math.random() * 0.45,
      life: full ? Math.random() * 200 : 0,
      maxLife: 180 + Math.random() * 240,
      drift: (Math.random() - 0.5) * 0.003,
      // some particles get a second color
      color: Math.random() > 0.7 ? '#ffffff' : this.accent,
    };
  }

  start(accent, count = 45) {
    this.accent = accent || '#7c8cf8';
    this.particles = Array.from({ length: count }, () => this._mkParticle(true));
    if (!this.running) { this.running = true; this._tick(); }
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _tick() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const p of this.particles) {
      p.x += p.vx; p.y += p.vy; p.vx += p.drift; p.life++;
      const lt = p.life / p.maxLife;
      const fade = Math.max(0, lt < 0.18 ? lt / 0.18 : lt > 0.78 ? (1 - lt) / 0.22 : 1);
      const alpha = Math.max(0, Math.min(1, p.alpha * fade));
      // glow halo
      const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
      grad.addColorStop(0, p.color + Math.floor(alpha * 180).toString(16).padStart(2, '0'));
      grad.addColorStop(1, 'transparent');
      this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
      this.ctx.fillStyle = grad; this.ctx.fill();
      // solid core
      this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      this.ctx.fill();
      if (p.life > p.maxLife || p.y < -20) Object.assign(p, this._mkParticle(false));
    }
    this.raf = requestAnimationFrame(() => this._tick());
  }
}
/* ── MESH NETWORK ────────────────────────────────────────────────────────── */
class MeshNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = [];
    this.running = false;
    this.raf = null;
    this.accent = '#7c8cf8';
  }
  start(accent, count = 50) {
    this.accent = accent || '#7c8cf8';
    this.nodes = Array.from({ length: count }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: 1.5 + Math.random() * 2
    }));
    if (!this.running) { this.running = true; this._tick(); }
  }
  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  _tick() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const w = this.canvas.width, h = this.canvas.height;
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      this.ctx.fillStyle = this.accent + '90';
      this.ctx.fill();

      for (let j = i + 1; j < this.nodes.length; j++) {
        const n2 = this.nodes[j];
        const dx = n.x - n2.x, dy = n.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(n.x, n.y);
          this.ctx.lineTo(n2.x, n2.y);
          this.ctx.strokeStyle = this.accent + Math.floor((1 - dist / 120) * 100).toString(16).padStart(2, '0');
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
    this.raf = requestAnimationFrame(() => this._tick());
  }
}

/* ── PERSPECTIVE GRID ────────────────────────────────────────────────────── */
class PerspectiveGrid {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.raf = null;
    this.accent = '#7c8cf8';
    this.t = 0;
  }
  start(accent) {
    this.accent = accent || '#7c8cf8';
    this.t = 0;
    if (!this.running) { this.running = true; this._tick(); }
  }
  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  _tick() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const w = this.canvas.width, h = this.canvas.height;

    this.t += 0.005;
    const cy = h * 0.4;
    const perspective = 300;

    this.ctx.save();
    this.ctx.translate(w / 2, cy);

    // Draw horizon glow
    const g = this.ctx.createLinearGradient(0, 0, 0, 100);
    g.addColorStop(0, this.accent + '30');
    g.addColorStop(1, 'transparent');
    this.ctx.fillStyle = g;
    this.ctx.fillRect(-w, 0, w * 2, h);

    this.ctx.lineWidth = 1.5;
    // Draw vertical lines
    for (let x = -20; x <= 20; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * 40, 0);
      this.ctx.lineTo(x * 160, h - cy);
      this.ctx.strokeStyle = this.accent + '15';
      this.ctx.stroke();
    }
    // Draw horizontal lines moving forward
    for (let z = 0.1; z < 10; z += 0.4) {
      const p = (z + this.t % 0.4) / 10;
      const y = Math.pow(p, 2) * (h - cy);
      const alpha = Math.floor(Math.min(1, p * 3) * (1 - p) * 100).toString(16).padStart(2, '0');
      this.ctx.beginPath();
      this.ctx.moveTo(-w, y);
      this.ctx.lineTo(w, y);
      this.ctx.strokeStyle = this.accent + alpha;
      this.ctx.stroke();
    }

    this.ctx.restore();
    this.raf = requestAnimationFrame(() => this._tick());
  }
}

class AnimatedBg {
  constructor(ctx) {
    this.ctx = ctx;
    this.running = false;
    this.raf = null;
    this.startTime = 0;
    this.slide = null;
  }

  start(slide) {
    this.slide = slide;
    if (!this.startTime) this.startTime = performance.now();
    if (!this.running) { this.running = true; this._tick(); }
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  updateSlide(slide) { this.slide = slide; }

  _tick() {
    if (!this.running) return;
    const t = (performance.now() - this.startTime) / 1000;
    this._draw(t);
    this.raf = requestAnimationFrame(() => this._tick());
  }

  _draw(t) {
    const ctx = this.ctx;
    const s = this.slide;
    if (!s) return;
    const acc = s.accent || '#7c8cf8';
    const W = ctx.canvas.width, H = ctx.canvas.height;

    // Base fill
    ctx.fillStyle = s.bg || '#0b0d14';
    ctx.fillRect(0, 0, W, H);

    // Animated dot grid — breathing pulse
    for (let x = 0; x <= W; x += 80) {
      for (let y = 0; y <= H; y += 80) {
        const wave = 0.5 + 0.5 * Math.sin(t * 0.65 + x * 0.009 + y * 0.007);
        const r = 0.8 + wave * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = acc + Math.floor(wave * 36).toString(16).padStart(2, '0');
        ctx.fill();
      }
    }

    // Animated vertical left bar — pulsing height
    const barH = H * (0.5 + 0.12 * Math.sin(t * 0.38));
    const barY = (H - barH) / 2;
    const barGrad = ctx.createLinearGradient(0, barY, 0, barY + barH);
    barGrad.addColorStop(0, 'transparent');
    barGrad.addColorStop(0.5, acc + 'ee');
    barGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = barGrad;
    ctx.fillRect(0, barY, 4, barH);

    // Bottom-left ambient glow — breathes
    const r1 = 400 + 60 * Math.sin(t * 0.32);
    const g1 = ctx.createRadialGradient(0, H, 0, 0, H, r1);
    g1.addColorStop(0, acc + '1a'); g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

    // Top-right counter glow
    const r2 = 240 + 40 * Math.cos(t * 0.44);
    const g2 = ctx.createRadialGradient(W, 0, 0, W, 0, r2);
    g2.addColorStop(0, acc + '12'); g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

    // Center subtle aurora blob (low opacity) — cinematic layouts only
    const cinematic = ['title', 'hook', 'hero-split', 'transition', 'mystery', 'did-you-know', 'prediction', 'quote'];
    if (cinematic.includes(s.layout)) {
      const bx = W * 0.5 + Math.sin(t * 0.2) * 60;
      const by = H * 0.42 + Math.cos(t * 0.17) * 40;
      const rb = 320 + 40 * Math.sin(t * 0.28);
      const gb = ctx.createRadialGradient(bx, by, 0, bx, by, rb);
      gb.addColorStop(0, acc + '0e'); gb.addColorStop(1, 'transparent');
      ctx.fillStyle = gb; ctx.fillRect(0, 0, W, H);
    }
  }
}

/* ── SCAN LINE ───────────────────────────────────────────────────────────── */
function addScanLine(container, acc) {
  let old = container.querySelector('.scan-line-el');
  if (old) old.remove();
  const line = document.createElement('div');
  line.className = 'scan-line-el';
  line.style.cssText = [
    'position:absolute', 'left:0', 'right:0', 'height:2px', 'top:0',
    `background:linear-gradient(90deg,transparent 0%,${acc}70 40%,${acc}cc 50%,${acc}70 60%,transparent 100%)`,
    'animation:scanLine 5.5s linear infinite',
    'pointer-events:none', 'z-index:10',
  ].join(';');
  // Removed container.style.position = 'relative' because it breaks #slide-dom's absolute positioning
  container.appendChild(line);
}

/* ── COUNTER ANIMATION ───────────────────────────────────────────────────── */
function animateCounter(el, start, end, duration = 1100, suffix = '') {
  const t0 = performance.now();
  const isFloat = !Number.isInteger(end);
  function step(now) {
    const p = Math.min((now - t0) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3); // ease-out-cubic
    const v = start + (end - start) * e;
    el.textContent = (isFloat ? v.toFixed(1) : Math.round(v)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── STAGGERED ENTRANCE ──────────────────────────────────────────────────── */
function staggerEnter(elements, stepMs = 80, baseMs = 0) {
  elements.forEach((el, i) => {
    // Only stagger elements that are NOT step-reveal bullet-items
    // (those use the .visible CSS class mechanism instead)
    if (el.classList.contains('bullet-item') || el.classList.contains('code-line')) return;
    Object.assign(el.style, { opacity: '0', transform: 'translateY(14px)', transition: 'none' });
    setTimeout(() => {
      el.style.transition = 'opacity .38s ease, transform .42s cubic-bezier(.22,1,.36,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, baseMs + i * stepMs);
  });
}

/* ── RING PULSE (for pipeline / journey nodes) ───────────────────────────── */
function pulseRing(ringEl, color) {
  if (!ringEl || !ringEl.animate) return;
  ringEl.animate([
    { boxShadow: `0 0 18px ${color}45, inset 0 0 12px ${color}12` },
    { boxShadow: `0 0 52px ${color}90, 0 0 90px ${color}38, inset 0 0 28px ${color}28` },
    { boxShadow: `0 0 18px ${color}45, inset 0 0 12px ${color}12` },
  ], { duration: 1900, iterations: Infinity, easing: 'ease-in-out' });
}

/* ── BINARY RAIN EFFECT (for title/hook slides, DOM overlay) ─────────────── */
function addBinaryRain(container, acc, count = 16) {
  let old = container.querySelector('.binary-rain-layer');
  if (old) old.remove();
  const layer = document.createElement('div');
  layer.className = 'binary-rain-layer';
  layer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;opacity:.18';
  const chars = '01JAVAΛΩΒ∑∞π∂∇';
  for (let i = 0; i < count; i++) {
    const col = document.createElement('div');
    const x = 3 + Math.random() * 94;
    const delay = Math.random() * 3;
    const dur = 2.5 + Math.random() * 2.5;
    const top = -10 - Math.random() * 20;
    col.style.cssText = `position:absolute;left:${x}%;top:${top}%;color:${acc};font-size:${9 + Math.random() * 7}px;font-family:'JetBrains Mono',monospace;animation:binaryDrop ${dur}s linear ${delay}s infinite;opacity:0`;
    col.textContent = chars[Math.floor(Math.random() * chars.length)];
    layer.appendChild(col);
  }
  // Removed container.style.position = 'relative'
  container.appendChild(layer);
}

/* ── ORBIT RINGS (for concept / orbit diagrams) ──────────────────────────── */
function addOrbitRings(container, acc, radii = [90, 130, 170]) {
  let old = container.querySelector('.orbit-rings-layer');
  if (old) old.remove();
  const layer = document.createElement('div');
  layer.className = 'orbit-rings-layer';
  layer.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:0';
  radii.forEach((r, i) => {
    const ring = document.createElement('div');
    ring.style.cssText = `
      position:absolute;width:${r * 2}px;height:${r * 2}px;border-radius:50%;
      border:1px solid ${acc}${i === 0 ? '50' : i === 1 ? '30' : '20'};
      animation:${i % 2 === 0 ? 'spinSlow' : 'spinSlowR'} ${18 + i * 8}s linear infinite;
    `;
    // Add dot on orbit
    const dot = document.createElement('div');
    dot.style.cssText = `position:absolute;top:0;left:50%;transform:translateX(-50%) translateY(-50%);width:6px;height:6px;border-radius:50%;background:${acc};box-shadow:0 0 10px ${acc};`;
    ring.appendChild(dot);
    layer.appendChild(ring);
  });
  container.appendChild(layer);
}

/* ── HEXAGON CYBER-GRID ──────────────────────────────────────────────────── */
function addHexGrid(container, acc) {
  let old = container.querySelector('.hex-grid-layer');
  if (old) old.remove();
  const layer = document.createElement('div');
  layer.className = 'hex-grid-layer';
  layer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;opacity:0.15;display:flex;flex-wrap:wrap;gap:2px;justify-content:center;align-content:center';

  // Hexagon SVG
  const hexSvg = `<svg viewBox="0 0 100 100" style="width:40px;height:40px;fill:none;stroke:${acc};stroke-width:3"><polygon points="50 1 95 25 95 75 50 99 5 75 5 25"/></svg>`;

  for (let i = 0; i < 60; i++) {
    const hex = document.createElement('div');
    hex.innerHTML = hexSvg;
    hex.style.cssText = `animation:glowPulse ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite; opacity:${0.2 + Math.random() * 0.5}`;
    layer.appendChild(hex);
  }
  container.appendChild(layer);
}

/* ── AURORA ORBS ─────────────────────────────────────────────────────────── */
function addAuroraOrbs(container, acc) {
  let old = container.querySelector('.aurora-orbs-layer');
  if (old) old.remove();
  const layer = document.createElement('div');
  layer.className = 'aurora-orbs-layer';
  layer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0';

  const colors = [acc, '#c792ea', '#7cd4f8'];

  for (let i = 0; i < 3; i++) {
    const orb = document.createElement('div');
    orb.style.cssText = `
      position:absolute;
      width:40vw; height:40vw;
      border-radius:50%;
      background:radial-gradient(circle, ${colors[i]}40, transparent 70%);
      filter:blur(60px);
      top:${10 + Math.random() * 40}%; left:${10 + Math.random() * 50}%;
      transform:translate(-50%, -50%);
      animation:${i % 2 === 0 ? 'orbitCW' : 'orbitCCW'} ${20 + i * 10}s linear infinite;
      --r:${60 + i * 40}px;
    `;
    layer.appendChild(orb);
  }
  container.appendChild(layer);
}

/* ── SHIMMER CARDS ───────────────────────────────────────────────────────── */
function shimmerCards(container) {
  container.querySelectorAll('[data-shimmer]').forEach(card => {
    card.classList.add('anim-shimmer');
  });
}

/* ── TYPEWRITER TEXT EFFECT ──────────────────────────────────────────────── */
function typewriterEffect(el, text, speed = 35, onDone) {
  el.textContent = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.style.cssText = 'animation:glowPulse 1s ease-in-out infinite;opacity:.8';
  cursor.textContent = '▊';
  el.appendChild(cursor);
  const tick = () => {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i++]), cursor);
      setTimeout(tick, speed + Math.random() * 20);
    } else {
      cursor.style.animation = 'glowPulse 1.2s ease-in-out infinite';
      if (onDone) onDone();
    }
  };
  setTimeout(tick, 300);
}

/* ── SLIDE-SPECIFIC MOTION TRIGGER ──────────────────────────────────────── */
function initSlideMotion(s, domRoot, acc) {
  const layout = s.layout;

  // Scan line on cinematic layouts (DISABLED based on user request)
  // if (['hook', 'title', 'transition', 'hero-split', 'mystery', 'prediction'].includes(layout)) {
  //   addScanLine(domRoot, acc);
  // }

  // Binary rain for high-drama slides
  if (['title', 'hook', 'mystery'].includes(layout)) {
    addBinaryRain(domRoot, acc, 18);
  }

  // Hexagon grid for architectural / structural slides
  if (['security', 'solid', 'design-patterns'].includes(layout)) {
    addHexGrid(domRoot, acc);
  }

  // Aurora orbs for cinematic / visual slides
  if (['hero-split', 'transition', 'journey'].includes(layout)) {
    addAuroraOrbs(domRoot, acc);
  }

  // Pulse pipeline / journey node rings
  if (['pipeline', 'journey'].includes(layout)) {
    const colors = ['#7c8cf8', '#7cd4f8', '#7cf8a0', '#f8d07c', '#f87cd4', '#f87c7c', '#c792ea'];
    domRoot.querySelectorAll('.p-ring').forEach((ring, i) => {
      setTimeout(() => pulseRing(ring, colors[i % colors.length]), i * 140 + 280);
    });
  }

  // Add orbit rings to concept-map
  if (layout === 'concept-map') {
    const area = domRoot.querySelector('[data-orbit-area]');
    if (area) addOrbitRings(area, acc);
  }

  // Animate number counters on stats cards
  if (layout === 'stats') {
    domRoot.querySelectorAll('[data-count-to]').forEach(el => {
      const target = parseFloat(el.dataset.countTo);
      const suffix = el.dataset.suffix || '';
      if (!isNaN(target)) animateCounter(el, 0, target, 1200, suffix);
    });
  }

  // NOTE: Do NOT call staggerEnter on .bullet-item elements here.
  // Those use the step-reveal .visible CSS class system (advance/retreat).
  // Calling staggerEnter would set inline opacity:0 and override .visible styles.
}

/* ── PARTICLE CANVAS ─────────────────────────────────────────────────────── */
function createParticleCanvas(wrap) {
  let pc = document.getElementById('particle-canvas');
  if (!pc) {
    pc = document.createElement('canvas');
    pc.id = 'particle-canvas';
    pc.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;z-index:2;opacity:.75';
    wrap.style.position = 'relative';
    wrap.appendChild(pc);
  }
  return pc;
}

// ── Public API ────────────────────────────────────────────────────────────
window.MotionEngine = {
  MeshNetwork,
  PerspectiveGrid,
  AnimatedBg,
  ParticleSystem,
  createParticleCanvas,
  initSlideMotion,
  addScanLine,
  addBinaryRain,
  addOrbitRings,
  addHexGrid,
  addAuroraOrbs,
  animateCounter,
  staggerEnter,
  pulseRing,
  typewriterEffect,
  shimmerCards,
};
