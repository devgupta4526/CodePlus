
// Inject Remotion Motion Graphic Styles into document head
if (typeof document !== 'undefined' && !document.getElementById('remotion-motion-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'remotion-motion-styles';
  styleEl.textContent = `
    @keyframes remotionFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(2deg); }
    }
    @keyframes remotionPulseGlow {
      0%, 100% { box-shadow: 0 0 15px rgba(124,140,248,0.2); }
      50% { box-shadow: 0 0 40px rgba(124,140,248,0.6); }
    }
    @keyframes remotionDogWobble {
      0% { transform: translateY(0) rotate(-2deg); }
      100% { transform: translateY(-14px) rotate(3deg); }
    }
    @keyframes remotionLockPulse {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(245,158,11,0.4)); }
      50% { transform: scale(1.08); filter: drop-shadow(0 0 40px rgba(245,158,11,0.9)); }
    }
    .remotion-float { animation: remotionFloat 3.5s ease-in-out infinite; }
    .remotion-dog { animation: remotionDogWobble 1.2s cubic-bezier(.36,0,.66,-0.56) infinite alternate; filter: drop-shadow(0 0 30px rgba(124,140,248,0.4)); }
    .remotion-glow { animation: remotionPulseGlow 3s ease-in-out infinite; }
    .remotion-lock { animation: remotionLockPulse 2.5s ease-in-out infinite; }
  `;
  document.head.appendChild(styleEl);
}

// ═══ RENDERERS MOTION GRAPHICS ═════════════════════════════════════════════
// Dedicated DOM renderers for standard motion graphic templates with step animations
// ═══════════════════════════════════════════════════════════════════════════

function renderHeader(s, acc, anim, c, z) {
  if (s.title) {
    c.appendChild(el('div', `font-size:${px(28, z)};font-weight:800;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(4, z)};${as(anim, 0, z)}`, escHtml(s.title)));
    if (s.subtitle) {
      c.appendChild(el('div', `font-size:${px(13, z)};color:${acc};font-family:'Inter',sans-serif;margin-bottom:${px(16, z)};${as(anim, 100, z)}`, escHtml(s.subtitle)));
    }
  }
}

// Helper to build step-animated elements
function stepEl(tag, css, html, idx) {
  const e = el(tag, css, html, 'step-item');
  if (idx != null) e.dataset.idx = idx;
  return e;
}

// 1. object-breakdown
function renderObjectBreakdownDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;padding:${px(54, z)} ${px(46, z)};${as(anim, 0, z)}`);
  renderHeader(s, acc, anim, c, z);

  const stage = el('div', `flex:1;display:flex;align-items:center;justify-content:center;gap:${px(40, z)};position:relative`);
  const getIcon = typeof window.getSvgIcon === 'function' ? window.getSvgIcon : () => '';
  
  const iconBox = stepEl('div', `display:flex;animation:remotionDogWobble 1.2s cubic-bezier(.36,0,.66,-0.56) infinite alternate;filter:drop-shadow(0 0 30px rgba(124,140,248,0.4));align-items:center;justify-content:center`, '', 0);
  iconBox.innerHTML = getIcon(s.icon || 'dog', acc, 220 * z);
  stage.appendChild(iconBox);

  const cardsWrap = el('div', `display:flex;flex-direction:column;gap:${px(14, z)}`);
  
  // Properties Card
  const propCard = stepEl('div', `background:rgba(124,140,248,0.08);border:1px solid rgba(124,140,248,0.3);border-radius:${px(12, z)};padding:${px(14, z)} ${px(20, z)};min-width:${px(300, z)}`, '', 1);
  propCard.appendChild(el('div', `font-family:'Space Grotesk',sans-serif;font-size:${px(11, z)};font-weight:800;color:${acc};letter-spacing:1px;text-transform:uppercase;margin-bottom:${px(8, z)}`, '📦 Properties (State)'));
  (s.properties || []).forEach(p => {
    const row = el('div', `font-family:'JetBrains Mono',monospace;font-size:${px(13, z)};color:#cbd5e1;margin-bottom:${px(4, z)}`);
    row.innerHTML = `<span style="color:${acc};font-weight:700;">${escHtml(p.key)}</span> = ${escHtml(p.val)}`;
    propCard.appendChild(row);
  });
  cardsWrap.appendChild(propCard);

  // Behaviors Card
  const behCard = stepEl('div', `background:rgba(0,255,157,0.08);border:1px solid rgba(0,255,157,0.3);border-radius:${px(12, z)};padding:${px(14, z)} ${px(20, z)};min-width:${px(300, z)}`, '', 2);
  behCard.appendChild(el('div', `font-family:'Space Grotesk',sans-serif;font-size:${px(11, z)};font-weight:800;color:#00ff9d;letter-spacing:1px;text-transform:uppercase;margin-bottom:${px(8, z)}`, '⚙️ Behaviors (Methods)'));
  (s.behaviors || []).forEach(b => {
    const row = el('div', `font-family:'JetBrains Mono',monospace;font-size:${px(13, z)};color:#cbd5e1;margin-bottom:${px(4, z)}`);
    row.innerHTML = `<span style="color:#00ff9d;font-weight:700;">${escHtml(b.method)}</span> -> ${escHtml(b.result)}`;
    behCard.appendChild(row);
  });
  cardsWrap.appendChild(behCard);

  stage.appendChild(cardsWrap);
  c.appendChild(stage);
  t.appendChild(c);
}

// 2. object-grid
function renderObjectGridDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;padding:${px(54, z)} ${px(46, z)};${as(anim, 0, z)}`);
  renderHeader(s, acc, anim, c, z);

  const grid = el('div', `flex:1;display:grid;grid-template-columns:repeat(${Math.min((s.cards||[]).length, 3)}, 1fr);gap:${px(20, z)};align-items:center`);
  const getIcon = typeof window.getSvgIcon === 'function' ? window.getSvgIcon : () => '';

  (s.cards || []).forEach((card, idx) => {
    const cardEl = stepEl('div', `background:rgba(255,255,255,0.03);border:1.5px solid ${card.color || acc};border-radius:${px(14, z)};padding:${px(18, z)};display:flex;flex-direction:column;align-items:center;gap:${px(10, z)}`, '', idx);
    const iconWrap = el('div', `display:flex;animation:remotionFloat 3.5s ease-in-out infinite;align-items:center;justify-content:center`);
    iconWrap.innerHTML = getIcon(card.icon || 'car', card.color || acc, 52 * z);
    cardEl.appendChild(iconWrap);
    cardEl.appendChild(el('div', `font-family:'Space Grotesk',sans-serif;font-size:${px(16, z)};font-weight:800;color:${card.color || acc}`, escHtml(card.title)));
    
    const propsBox = el('div', `width:100%;background:rgba(0,0,0,0.3);border-radius:${px(8, z)};padding:${px(10, z)};font-family:'JetBrains Mono',monospace;font-size:${px(11, z)};color:#cbd5e1`);
    (card.props || []).forEach(p => {
      propsBox.appendChild(el('div', `margin-bottom:${px(3, z)}`, `${escHtml(p.key)}: ${escHtml(p.val)}`));
    });
    cardEl.appendChild(propsBox);
    grid.appendChild(cardEl);
  });

  c.appendChild(grid);
  t.appendChild(c);
}

// 3. assembly-line
function renderAssemblyLineDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;padding:${px(54, z)} ${px(46, z)};${as(anim, 0, z)}`);
  renderHeader(s, acc, anim, c, z);

  const line = el('div', `flex:1;display:flex;align-items:center;justify-content:space-between;position:relative;padding:0 ${px(20, z)}`);
  const getIcon = typeof window.getSvgIcon === 'function' ? window.getSvgIcon : () => '';

  (s.stations || []).forEach((st, idx) => {
    const box = stepEl('div', `background:rgba(255,255,255,0.03);border:1.5px solid ${st.color || acc};border-radius:${px(12, z)};padding:${px(14, z)};display:flex;flex-direction:column;align-items:center;gap:${px(8, z)};min-width:${px(130, z)}`, '', idx);
    const iconWrap = el('div', ``);
    iconWrap.innerHTML = getIcon(st.icon || 'gear', st.color || acc, 36 * z);
    box.appendChild(iconWrap);
    box.appendChild(el('div', `font-family:'Space Grotesk',sans-serif;font-size:${px(12, z)};font-weight:700;color:#fff;text-align:center`, escHtml(st.label)));
    box.appendChild(el('div', `font-family:'JetBrains Mono',monospace;font-size:${px(10, z)};color:#cbd5e1;text-align:center`, escHtml(st.action)));
    line.appendChild(box);
  });

  c.appendChild(line);
  if (s.callout) {
    c.appendChild(el('div', `margin-top:${px(12, z)};background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:${px(8, z)};padding:${px(10, z)} ${px(16, z)};font-family:'Space Grotesk',sans-serif;font-size:${px(12, z)};color:#f59e0b;text-align:center`, escHtml(s.callout)));
  }
  t.appendChild(c);
}

// 4. domino-effect
function renderDominoEffectDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;padding:${px(54, z)} ${px(46, z)};${as(anim, 0, z)}`);
  renderHeader(s, acc, anim, c, z);

  const row = el('div', `flex:1;display:flex;align-items:center;justify-content:center;gap:${px(16, z)}`);
  (s.dominoes || []).forEach((d, idx) => {
    const tile = stepEl('div', `background:${d.isBroken ? 'rgba(239,68,68,0.15)' : 'rgba(124,140,248,0.08)'};border:1.5px solid ${d.isBroken ? '#ef4444' : acc};border-radius:${px(10, z)};padding:${px(16, z)};width:${px(110, z)};height:${px(180, z)};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(8, z)};text-align:center`, '', idx);
    tile.appendChild(el('div', `font-family:'JetBrains Mono',monospace;font-size:${px(13, z)};font-weight:700;color:${d.isBroken ? '#ef4444' : acc}`, escHtml(d.fnName)));
    tile.appendChild(el('div', `font-family:'Inter',sans-serif;font-size:${px(11, z)};color:#cbd5e1`, escHtml(d.text)));
    row.appendChild(tile);
  });

  c.appendChild(row);
  t.appendChild(c);
}

// 5. blueprint-houses
function renderBlueprintHousesDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;padding:${px(54, z)} ${px(46, z)};${as(anim, 0, z)}`);
  renderHeader(s, acc, anim, c, z);

  const stage = el('div', `flex:1;display:flex;align-items:center;justify-content:center;gap:${px(30, z)}`);
  const getIcon = typeof window.getSvgIcon === 'function' ? window.getSvgIcon : () => '';

  // Blueprint
  const bp = stepEl('div', `background:rgba(0,255,157,0.06);border:2px stroke-dasharray #00ff9d;border:2px stroke #00ff9d;border-radius:${px(14, z)};padding:${px(16, z)};min-width:${px(220, z)};display:flex;flex-direction:column;align-items:center;gap:${px(8, z)}`, '', 0);
  bp.style.cssText += ';animation:remotionPulseGlow 3s ease-in-out infinite';
  bp.innerHTML = getIcon('blueprint', '#00ff9d', 48 * z);
  bp.appendChild(el('div', `font-family:'Space Grotesk',sans-serif;font-size:${px(14, z)};font-weight:800;color:#00ff9d`, escHtml(s.blueprintTitle || 'Class House')));
  stage.appendChild(bp);

  // Instances
  const instWrap = el('div', `display:flex;gap:${px(14, z)}`);
  (s.instances || []).forEach((inst, idx) => {
    const house = stepEl('div', `background:rgba(255,255,255,0.03);border:1.5px solid ${inst.color || acc};border-radius:${px(12, z)};padding:${px(14, z)};display:flex;flex-direction:column;align-items:center;gap:${px(6, z)};min-width:${px(110, z)}`, '', idx + 1);
    house.innerHTML = getIcon('house', inst.color || acc, 36 * z);
    house.appendChild(el('div', `font-family:'Space Grotesk',sans-serif;font-size:${px(12, z)};font-weight:700;color:${inst.color || acc}`, escHtml(inst.name)));
    house.appendChild(el('div', `font-family:'JetBrains Mono',monospace;font-size:${px(10, z)};color:#94a3b8`, escHtml(inst.address)));
    instWrap.appendChild(house);
  });
  stage.appendChild(instWrap);

  c.appendChild(stage);
  t.appendChild(c);
}

// 6. pillars-rising
function renderPillarsRisingDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;padding:${px(54, z)} ${px(46, z)};${as(anim, 0, z)}`);
  renderHeader(s, acc, anim, c, z);

  const row = el('div', `flex:1;display:flex;align-items:flex-end;justify-content:center;gap:${px(16, z)};padding-bottom:${px(10, z)}`);
  const getIcon = typeof window.getSvgIcon === 'function' ? window.getSvgIcon : () => '';

  (s.pillars || []).forEach((p, idx) => {
    const col = stepEl('div', `background:rgba(255,255,255,0.03);border:1.5px solid ${p.color || acc};border-radius:${px(14, z)} ${px(14, z)} 0 0;padding:${px(16, z)};width:${px(140, z)};height:${px(240, z)};display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:${px(10, z)};text-align:center`, '', idx);
    col.innerHTML = getIcon(p.icon || 'mask', p.color || acc, 40 * z);
    col.appendChild(el('div', `font-family:'Space Grotesk',sans-serif;font-size:${px(13, z)};font-weight:800;color:${p.color || acc}`, escHtml(p.name)));
    col.appendChild(el('div', `font-family:'Inter',sans-serif;font-size:${px(10.5, z)};color:#cbd5e1;line-height:1.3`, escHtml(p.desc)));
    row.appendChild(col);
  });

  c.appendChild(row);
  t.appendChild(c);
}

// 7. access-circles
function renderAccessCirclesDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;padding:${px(54, z)} ${px(46, z)};${as(anim, 0, z)}`);
  renderHeader(s, acc, anim, c, z);

  const stage = el('div', `flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(10, z)}`);
  (s.levels || []).forEach((lvl, idx) => {
    const card = stepEl('div', `width:100%;max-width:${px(600 - idx*40, z)};background:rgba(255,255,255,0.03);border:1.5px solid ${lvl.color || acc};border-radius:${px(10, z)};padding:${px(10, z)} ${px(18, z)};display:flex;align-items:center;justify-content:space-between`, '', idx);
    card.appendChild(el('span', `font-family:'JetBrains Mono',monospace;font-size:${px(13, z)};font-weight:800;color:${lvl.color || acc}`, escHtml(lvl.level)));
    card.appendChild(el('span', `font-family:'Inter',sans-serif;font-size:${px(11, z)};color:#cbd5e1`, escHtml(lvl.desc)));
    stage.appendChild(card);
  });

  c.appendChild(stage);
  t.appendChild(c);
}

// 8. solid-summary
function renderSolidSummaryDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;padding:${px(54, z)} ${px(46, z)};${as(anim, 0, z)}`);
  renderHeader(s, acc, anim, c, z);

  const list = el('div', `flex:1;display:flex;flex-direction:column;gap:${px(10, z)};justify-content:center`);
  (s.principles || []).forEach((p, idx) => {
    const item = stepEl('div', `background:rgba(255,255,255,0.03);border:1.5px solid ${p.color || acc};border-radius:${px(10, z)};padding:${px(10, z)} ${px(18, z)};display:flex;align-items:center;gap:${px(14, z)}`, '', idx);
    item.appendChild(el('div', `font-family:'Space Grotesk',sans-serif;font-size:${px(20, z)};font-weight:900;color:${p.color || acc};width:${px(32, z)};height:${px(32, z)};border-radius:${px(6, z)};background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center`, escHtml(p.letter)));
    const textWrap = el('div', `display:flex;flex-direction:column`);
    textWrap.appendChild(el('div', `font-family:'Space Grotesk',sans-serif;font-size:${px(13, z)};font-weight:800;color:#f5f5f4`, escHtml(p.name)));
    textWrap.appendChild(el('div', `font-family:'Inter',sans-serif;font-size:${px(11, z)};color:#94a3b8`, escHtml(p.desc)));
    item.appendChild(textWrap);
    list.appendChild(item);
  });

  c.appendChild(list);
  t.appendChild(c);
}

// 9. matrix-compare
function renderMatrixCompareDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;padding:${px(54, z)} ${px(46, z)};${as(anim, 0, z)}`);
  renderHeader(s, acc, anim, c, z);

  const table = el('table', `width:100%;border-collapse:separate;border-spacing:0 ${px(6, z)};font-family:'Inter',sans-serif`);
  const thead = el('thead', '');
  thead.innerHTML = `<tr><th style="font-family:'Space Grotesk',sans-serif;font-size:${px(13,z)};color:#f5f5f4;text-align:left;padding:${px(8,z)}">Feature</th><th style="font-family:'Space Grotesk',sans-serif;font-size:${px(13,z)};color:${acc};text-align:left;padding:${px(8,z)}">${escHtml(s.col1Header||'Option A')}</th><th style="font-family:'Space Grotesk',sans-serif;font-size:${px(13,z)};color:#00ff9d;text-align:left;padding:${px(8,z)}">${escHtml(s.col2Header||'Option B')}</th></tr>`;
  table.appendChild(thead);

  const tbody = el('tbody', '');
  (s.rows || []).forEach((r, idx) => {
    const tr = stepEl('tr', `background:rgba(255,255,255,0.03)`, '', idx);
    tr.innerHTML = `<td style="padding:${px(10,z)};font-weight:700;color:${acc};font-family:'JetBrains Mono',monospace;font-size:${px(12,z)}">${escHtml(r.feature)}</td><td style="padding:${px(10,z)};font-size:${px(11.5,z)};color:#cbd5e1">${escHtml(r.val1)}</td><td style="padding:${px(10,z)};font-size:${px(11.5,z)};color:#cbd5e1">${escHtml(r.val2)}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  c.appendChild(table);
  t.appendChild(c);
}

// Global scope registration
if (typeof window !== 'undefined') {
  window.renderObjectBreakdownDom = renderObjectBreakdownDom;
  window.renderObjectGridDom = renderObjectGridDom;
  window.renderAssemblyLineDom = renderAssemblyLineDom;
  window.renderDominoEffectDom = renderDominoEffectDom;
  window.renderBlueprintHousesDom = renderBlueprintHousesDom;
  window.renderPillarsRisingDom = renderPillarsRisingDom;
  window.renderAccessCirclesDom = renderAccessCirclesDom;
  window.renderSolidSummaryDom = renderSolidSummaryDom;
  window.renderMatrixCompareDom = renderMatrixCompareDom;
}
