// ═══════════════════════════════════════════════════════════════════════════
// renderers-core.js  —  Core and text-heavy layouts
// ═══════════════════════════════════════════════════════════════════════════

/* TITLE */
function renderTitleDom(s, acc, anim, t, z) {
  const w = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(24, z)};padding:${px(80, z)};overflow:hidden`);
  const styles = ['brackets', 'orbit', 'beams', 'mesh'];
  const style = s.titleStyle || styles[hashStr(s.title || s.subtitle || 'x') % styles.length];
  if (style === 'brackets') {
    w.appendChild(el('div', `position:absolute;left:${px(60, z)};top:50%;transform:translateY(-50%);font-size:${px(160, z)};color:${acc}18;font-family:'Space Grotesk',sans-serif;line-height:1`, '{'));
    w.appendChild(el('div', `position:absolute;right:${px(60, z)};top:50%;transform:translateY(-50%);font-size:${px(160, z)};color:${acc}18;font-family:'Space Grotesk',sans-serif;line-height:1`, '}'));
  } else if (style === 'orbit') {
    const orb = el('div', `position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:.5`);
    [420, 300, 190].forEach((d, i) => orb.appendChild(el('div', `position:absolute;width:${px(d, z)};height:${px(d, z)};border-radius:50%;border:1px dashed ${acc}${i === 0 ? '25' : i === 1 ? '35' : '45'}`)));
    orb.appendChild(el('div', `position:absolute;width:${px(46, z)};height:${px(46, z)};border-radius:50%;background:radial-gradient(circle at 35% 30%,${acc}ee,${acc}40);box-shadow:0 0 60px ${acc}60;top:50%;left:50%;transform:translate(${px(150, z)},${px(-110, z)})`));
    w.appendChild(orb);
  } else if (style === 'beams') {
    const bw = el('div', `position:absolute;inset:0;overflow:hidden;opacity:.4`);
    for (let i = 0; i < 5; i++) bw.appendChild(el('div', `position:absolute;bottom:${px(-200, z)};left:${px(-100 + i * 140, z)};width:${px(46, z)};height:${px(900, z)};background:linear-gradient(${acc}30,transparent);transform:rotate(28deg);transform-origin:bottom`));
    w.appendChild(bw);
  } else {
    const mesh = el('div', `position:absolute;inset:0;opacity:.5`);
    for (let i = 0; i < 5; i++) {
      const sx = 8 + hashStr(s.title + i) % 84, sy = 10 + hashStr(s.subtitle + i + 'y') % 80;
      mesh.appendChild(el('div', `position:absolute;left:${sx}%;top:${sy}%;width:${px(5, z)};height:${px(5, z)};border-radius:50%;background:${acc};box-shadow:0 0 ${px(8, z)} ${acc}`));
    }
    w.appendChild(mesh);
  }

  // Premium CodePulse Title Gradient
  w.appendChild(el('div', `font-size:${px(68, z)};font-weight:800;background:linear-gradient(135deg, #FFFFFF 40%, ${acc} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;font-family:'Space Grotesk',sans-serif;line-height:1.15;text-shadow:0 0 80px ${acc}30;${as(anim, 0, z)}`, escHtml(s.title || '')));
  w.appendChild(el('div', `font-size:${px(13, z)};color:${acc};background:${acc}0d;border:1px solid ${acc}35;border-radius:${px(20, z)};padding:${px(6, z)} ${px(16, z)};font-family:'Inter',sans-serif;letter-spacing:.05em;${as(anim, 200, z)}`, escHtml(s.subtitle || '')));
  w.appendChild(el('div', `font-size:${px(11, z)};color:#8C8C85;position:absolute;bottom:${px(26, z)};font-family:'Inter',sans-serif;${as(anim, 600, z)}`, '▸ Space or → to continue'));
  t.appendChild(w);
}

/* BULLETS */
function renderBulletsDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;padding:${px(46, z)} ${px(56, z)};display:flex;flex-direction:column`);
  const hdr = el('div', as(anim, 0, z));
  hdr.appendChild(el('div', `font-size:${px(38, z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(6, z)}`, escHtml(s.title || '')));
  hdr.appendChild(el('div', `font-size:${px(15, z)};color:${acc};font-family:'Inter',sans-serif;margin-bottom:${px(20, z)}`, escHtml(s.subtitle || '')));
  c.append(hdr, el('div', `height:1px;background:linear-gradient(90deg,${acc}60,transparent);margin-bottom:${px(22, z)};${as(anim, 100, z)}`));
  
  (s.bullets || []).forEach((b, i) => {
    // Redesigned bullet list into beautiful glass cards with left border accent
    const row = el('div', `display:flex;align-items:flex-start;gap:${px(14, z)};padding:${px(14, z)} ${px(18, z)};border-radius:${px(10, z)};border:1px solid rgba(255,255,255,0.06);border-left:4px solid ${acc};background:rgba(255,255,255,0.02);box-shadow:0 4px 15px rgba(0,0,0,0.15);margin-bottom:${px(10, z)};transition:transform .2s ease`, '', 'bullet-item');
    row.dataset.idx = i;
    row.appendChild(el('span', `color:${acc};font-size:${px(14, z)};flex-shrink:0;padding-top:${px(2, z)};font-family:'Inter',sans-serif`, '▸'));
    row.appendChild(el('span', `font-size:${px(17, z)};color:#CFCFC8;font-family:'Inter',sans-serif;line-height:1.5`, escHtml(b)));
    c.appendChild(row);
  });
  t.appendChild(c);
}

/* CODE */
function renderCodeDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;padding:${px(36, z)} ${px(46, z)};display:flex;flex-direction:column`);
  c.appendChild(el('div', `font-size:${px(30, z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(4, z)};${as(anim, 0, z)}`, escHtml(s.title || '')));
  c.appendChild(el('div', `font-size:${px(14, z)};color:${acc};font-family:'Inter',sans-serif;margin-bottom:${px(12, z)};${as(anim, 80, z)}`, escHtml(s.subtitle || '')));
  const wrap2 = el('div', `flex:1;min-height:0;${as(anim, 160, z)}`);
  wrap2.appendChild(codeCard(s.title || 'Demo', s.code, acc, z));
  c.appendChild(wrap2);
  t.appendChild(c);
}

/* SPLIT */
function renderSplitDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;padding:${px(32, z)} ${px(40, z)};display:flex;flex-direction:column`);
  const hdr = el('div', `${as(anim, 0, z)};margin-bottom:${px(14, z)}`);
  hdr.appendChild(el('div', `font-size:${px(28, z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(3, z)}`, escHtml(s.title || '')));
  hdr.appendChild(el('div', `font-size:${px(14, z)};color:${acc};font-family:'Inter',sans-serif`, escHtml(s.subtitle || '')));
  c.appendChild(hdr);
  
  const body = el('div', `display:flex;gap:${px(20, z)};flex:1;min-height:0`);
  const left = el('div', `flex:1;display:flex;flex-direction:column;gap:${px(9, z)};min-width:0`);
  
  (s.bullets || []).forEach((b, i) => {
    // Redesigned split layout card bullets
    const row = el('div', `padding:${px(12, z)} ${px(14, z)};border-radius:${px(8, z)};border:1px solid rgba(255,255,255,0.06);border-left:3px solid ${acc};background:rgba(255,255,255,0.02);box-shadow:0 3px 10px rgba(0,0,0,0.1)`, '', 'bullet-item');
    row.dataset.idx = i;
    row.appendChild(el('div', `font-size:${px(10, z)};color:${acc};font-family:'Space Grotesk',sans-serif;font-weight:700;margin-bottom:${px(3, z)}`, '▸ ' + (i + 1).toString().padStart(2, '0')));
    row.appendChild(el('div', `font-size:${px(14, z)};color:#CFCFC8;font-family:'Inter',sans-serif;line-height:1.45`, escHtml(b)));
    left.appendChild(row);
  });
  
  body.appendChild(left);
  const right = el('div', `flex:1.4;min-width:0;${as(anim, 200, z)}`);
  right.appendChild(codeCard(s.title || 'Demo', s.code, acc, z));
  body.appendChild(right);
  c.appendChild(body); t.appendChild(c);
}

/* COMPARE */
function renderCompareDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;padding:${px(32, z)} ${px(40, z)};display:flex;flex-direction:column`);
  const hdr = el('div', `${as(anim, 0, z)};margin-bottom:${px(14, z)}`);
  hdr.appendChild(el('div', `font-size:${px(28, z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(3, z)}`, escHtml(s.title || '')));
  hdr.appendChild(el('div', `font-size:${px(14, z)};color:${acc};font-family:'Inter',sans-serif`, escHtml(s.subtitle || '')));
  c.appendChild(hdr);
  
  const cols = el('div', `display:flex;gap:${px(16, z)};flex:1;min-height:0`);
  [
    [s.leftLabel || 'Before', s.leftCode, s.leftBullets, '#10b981'], 
    [s.rightLabel || 'After', s.rightCode, s.rightBullets, '#8b5cf6']
  ].forEach(([label, code, bullets, lcolor], ci) => {
    const col = el('div', `flex:1;display:flex;flex-direction:column;min-width:0;${as(anim, ci * 120, z)}`);
    col.appendChild(el('div', `font-size:${px(12, z)};font-weight:700;color:${lcolor};font-family:'Space Grotesk',sans-serif;margin-bottom:${px(7, z)};padding:${px(5, z)} ${px(10, z)};background:${lcolor}12;border-radius:${px(5, z)};border:1px solid ${lcolor}30`, escHtml(label)));
    const inner = el('div', `flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:${px(8, z)}`);
    if (bullets && bullets.length) {
      bullets.forEach((b, bi) => {
        const row = el('div', `padding:${px(10, z)} ${px(14, z)};border-radius:${px(8, z)};border:1px solid ${lcolor}30;border-left:4px solid ${lcolor};background:${lcolor}0a;display:flex;gap:${px(10, z)};align-items:flex-start`, '', 'bullet-item');
        row.dataset.idx = (ci * bullets.length) + bi;
        row.appendChild(el('span', `color:${lcolor};font-weight:bold`, '✓'));
        row.appendChild(el('span', `font-size:${px(14, z)};color:#CFCFC8;font-family:'Inter',sans-serif;line-height:1.4`, escHtml(b)));
        inner.appendChild(row);
      });
    } else {
      inner.appendChild(codeCard(label, code, lcolor, z));
    }
    col.appendChild(inner);
    cols.appendChild(col);
  });
  c.appendChild(cols); t.appendChild(c);
}

/* QUOTE */
function renderQuoteDom(s, acc, anim, t, z) {
  const w = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:${px(80, z)} ${px(100, z)}`);
  w.appendChild(el('div', `font-size:${px(120, z)};color:${acc}20;font-family:'Space Grotesk',sans-serif;line-height:.8;align-self:flex-start;${as(anim, 0, z)}`, '"'));
  const q = el('div', `font-size:${px(30, z)};font-weight:600;color:#F5F5F4;text-align:center;font-family:'Space Grotesk',sans-serif;line-height:1.5;margin-bottom:${px(28, z)};text-shadow:0 0 60px ${acc}30;${as(anim, 150, z)}`, escHtml(s.quote || ''));
  w.appendChild(q);
  if (s.author) {
    const aw2 = el('div', `display:flex;align-items:center;gap:${px(14, z)};${as(anim, 350, z)}`);
    aw2.appendChild(el('div', `height:1px;width:${px(48, z)};background:${acc}60`));
    aw2.appendChild(el('div', `font-size:${px(14, z)};color:${acc};font-family:'Space Grotesk',sans-serif;letter-spacing:.06em`, escHtml(s.author)));
    w.appendChild(aw2);
  }
  t.appendChild(w);
}

/* TIMELINE */
function renderTimelineDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;padding:${px(42, z)} ${px(56, z)};display:flex;flex-direction:column`);
  const hdr = el('div', as(anim, 0, z));
  hdr.appendChild(el('div', `font-size:${px(34, z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(5, z)}`, escHtml(s.title || '')));
  hdr.appendChild(el('div', `font-size:${px(15, z)};color:${acc};font-family:'Inter',sans-serif;margin-bottom:${px(18, z)}`, escHtml(s.subtitle || '')));
  c.appendChild(hdr);
  
  const list = el('div', `flex:1;display:flex;flex-direction:column;justify-content:space-around;position:relative`);
  list.appendChild(el('div', `position:absolute;left:${px(18, z)};top:0;bottom:0;width:2px;background:linear-gradient(${acc}60,${acc}10)`));
  
  (s.bullets || []).forEach((b, i) => {
    const row = el('div', `display:flex;align-items:flex-start;gap:${px(18, z)};position:relative`, '', 'bullet-item');
    row.dataset.idx = i;
    const dot = el('div', `width:${px(36, z)};height:${px(36, z)};border-radius:50%;border:2px solid ${acc};background:${acc}18;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:${px(13, z)};font-weight:700;color:${acc};font-family:'Space Grotesk',sans-serif;z-index:1`, String(i + 1));
    const txt = el('div', `flex:1;padding-top:${px(8, z)}`);
    txt.appendChild(el('div', `font-size:${px(16, z)};color:#CFCFC8;font-family:'Inter',sans-serif;line-height:1.5`, escHtml(b)));
    row.append(dot, txt); list.appendChild(row);
  });
  c.appendChild(list); t.appendChild(c);
}

/* STATS */
function renderStatsDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;padding:${px(42, z)} ${px(52, z)};display:flex;flex-direction:column`);
  const hdr = el('div', as(anim, 0, z));
  hdr.appendChild(el('div', `font-size:${px(36, z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(4, z)}`, escHtml(s.title || '')));
  hdr.appendChild(el('div', `font-size:${px(15, z)};color:${acc};font-family:'Inter',sans-serif;margin-bottom:${px(24, z)}`, escHtml(s.subtitle || '')));
  c.appendChild(hdr);
  
  const grid = el('div', `display:grid;grid-template-columns:repeat(3,1fr);gap:${px(16, z)};flex:1`);
  const statsArr = s.stats || [];
  statsArr.forEach((st, i) => {
    const clr = st.color || acc;
    // Glow-enhanced stats cards
    const card = el('div', `border-radius:${px(12, z)};border:1px solid rgba(255,255,255,0.06);border-top:4px solid ${clr};background:rgba(255,255,255,0.02);box-shadow:0 4px 15px rgba(0,0,0,0.15);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:${px(20, z)};animation:scaleIn .45s cubic-bezier(.22,1,.36,1) ${i * 80}ms both`);
    card.appendChild(el('div', `font-size:${px(42, z)};font-weight:800;color:${clr};font-family:'Space Grotesk',sans-serif;line-height:1;margin-bottom:${px(8, z)};text-shadow:0 0 32px ${clr}50`, escHtml(st.value || '')));
    card.appendChild(el('div', `font-size:${px(13, z)};color:#8C8C85;font-family:'Inter',sans-serif;text-align:center;line-height:1.4`, escHtml(st.label || '')));
    grid.appendChild(card);
  });
  c.appendChild(grid);
  t.appendChild(c);
}

/* CALLOUT */
function renderCalloutDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;padding:${px(40, z)} ${px(52, z)};display:flex;flex-direction:column`);
  const hdr = el('div', `${as(anim, 0, z)};margin-bottom:${px(18, z)}`);
  hdr.appendChild(el('div', `font-size:${px(32, z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(4, z)}`, escHtml(s.title || '')));
  if (s.subtitle) hdr.appendChild(el('div', `font-size:${px(14, z)};color:${acc};font-family:'Inter',sans-serif`, escHtml(s.subtitle)));
  c.appendChild(hdr);
  
  // Premium callout left border highlight card
  const box = el('div', `border-radius:${px(14, z)};border:1px solid rgba(255,255,255,0.06);border-left:5px solid ${acc};background:rgba(255,255,255,0.02);box-shadow:0 4px 15px rgba(0,0,0,0.15);padding:${px(22, z)} ${px(28, z)};display:flex;gap:${px(20, z)};align-items:flex-start;margin-bottom:${px(16, z)};${as(anim, 120, z)}`);
  box.appendChild(el('div', `font-size:${px(36, z)};flex-shrink:0;line-height:1`, escHtml(s.calloutIcon || '💡')));
  const boxText = el('div', `flex:1`);
  boxText.appendChild(el('div', `font-size:${px(18, z)};color:#F5F5F4;font-family:'Inter',sans-serif;line-height:1.55;font-weight:500`, escHtml(s.callout || '')));
  box.appendChild(boxText);
  c.appendChild(box);
  
  if (s.note) {
    const note = el('div', `border-radius:${px(8, z)};border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);padding:${px(12, z)} ${px(16, z)};margin-bottom:${px(14, z)};${as(anim, 240, z)}`);
    note.appendChild(el('div', `font-size:${px(12, z)};color:#666662;font-family:'Inter',sans-serif;margin-bottom:${px(4, z)}`, '// note'));
    note.appendChild(el('div', `font-size:${px(13, z)};color:#CFCFC8;font-family:'Inter',sans-serif;line-height:1.5`, escHtml(s.note)));
    c.appendChild(note);
  }
  
  if (s.bullets && s.bullets.length) {
    const bl = el('div', `display:flex;flex-direction:column;gap:${px(6, z)};${as(anim, 320, z)}`);
    s.bullets.forEach((b, i) => {
      const row = el('div', `display:flex;gap:${px(10, z)};align-items:flex-start;padding:${px(8, z)} ${px(12, z)};border-radius:${px(6, z)};border-left:2px solid ${acc};background:rgba(255,255,255,0.02)`, '', 'bullet-item');
      row.dataset.idx = i;
      row.appendChild(el('span', `color:${acc};font-size:${px(12, z)};flex-shrink:0;font-family:'Inter',sans-serif`, '▸'));
      row.appendChild(el('span', `font-size:${px(14, z)};color:#8C8C85;font-family:'Inter',sans-serif`, escHtml(b)));
      bl.appendChild(row);
    });
    c.appendChild(bl);
  }
  t.appendChild(c);
}

/* TWO-COL */
function renderTwoColDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;padding:${px(42, z)} ${px(52, z)};display:flex;flex-direction:column`);
  const hdr = el('div', `${as(anim, 0, z)};margin-bottom:${px(20, z)}`);
  hdr.appendChild(el('div', `font-size:${px(34, z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(4, z)}`, escHtml(s.title || '')));
  if (s.subtitle) hdr.appendChild(el('div', `font-size:${px(14, z)};color:${acc};font-family:'Inter',sans-serif`, escHtml(s.subtitle)));
  c.appendChild(hdr);
  
  const cols = el('div', `display:flex;gap:${px(28, z)};flex:1;min-height:0`);
  [[s.leftLabel || '', s.leftBullets || [], 'left'], [s.rightLabel || '', s.rightBullets || [], 'right']].forEach(([lbl, buls, side], ci) => {
    const col = el('div', `flex:1;display:flex;flex-direction:column;min-width:0;${as(anim, ci * 150, z)}`);
    if (lbl) {
      const h = el('div', `font-size:${px(14, z)};font-weight:700;color:${acc};font-family:'Space Grotesk',sans-serif;margin-bottom:${px(12, z)};padding-bottom:${px(8, z)};border-bottom:1px solid ${acc}30`, escHtml(lbl));
      col.appendChild(h);
    }
    const list = el('div', `display:flex;flex-direction:column;gap:${px(9, z)}`);
    buls.forEach((b, i) => {
      const row = el('div', `display:flex;gap:${px(12, z)};align-items:flex-start;padding:${px(11, z)} ${px(13, z)};border-radius:${px(8, z)};border:1px solid rgba(255,255,255,0.06);border-left:3px solid ${acc};background:rgba(255,255,255,0.02)`, '', 'bullet-item');
      row.dataset.idx = ci * 100 + i;
      row.appendChild(el('span', `color:${acc};font-size:${px(13, z)};flex-shrink:0;font-family:'Inter',sans-serif`, '▸'));
      row.appendChild(el('span', `font-size:${px(15, z)};color:#CFCFC8;font-family:'Inter',sans-serif;line-height:1.45`, escHtml(b)));
      list.appendChild(row);
    });
    col.appendChild(list);
    cols.appendChild(col);
  });
  c.appendChild(cols);
  t.appendChild(c);
}

function renderCustomHtmlDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;padding:${px(36, z)} ${px(46, z)};${as(anim, 0, z)}`);

  if (s.title) {
    c.appendChild(el('div', `font-size:${px(30, z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(4, z)}`, escHtml(s.title)));
    if (s.subtitle) {
      c.appendChild(el('div', `font-size:${px(14, z)};color:${acc};font-family:'Inter',sans-serif;margin-bottom:${px(14, z)}`, escHtml(s.subtitle)));
    }
  }

  const customContainer = el('div', `flex:1;position:relative;width:100%;min-height:0;overflow:auto;display:flex;flex-direction:column`);
  if (s.customHtml) {
    const htmlDiv = el('div', `width:100%;flex:1`);
    htmlDiv.innerHTML = s.customHtml;
    customContainer.appendChild(htmlDiv);
  }
  if (s.customSvg) {
    const svgWrap = el('div', `width:100%;flex:1;display:flex;align-items:center;justify-content:center;padding:${px(12, z)};overflow:hidden`);
    svgWrap.innerHTML = s.customSvg;
    customContainer.appendChild(svgWrap);
  }

  if (s.customCss) {
    const style = document.createElement('style');
    style.textContent = s.customCss;
    customContainer.appendChild(style);
  }

  c.appendChild(customContainer);
  t.appendChild(c);
}

/* CINEMATIC PARALLAX */
function renderCinematicParallaxDom(s, acc, anim, t, z) {
  const c = el('div', `position:absolute;inset:0;overflow:hidden;background:#0B0B0C;perspective:1000px`);

  const bg = el('div', `position:absolute;inset:-10%;background:radial-gradient(circle at center, #111214 0%, #0B0B0C 100%);transform:translateZ(-200px) scale(1.4);transform-style:preserve-3d;transition:transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)`);

  if (s.bgType && typeof window.svgSpaceBackground === 'function') {
    const bgSvgWrap = el('div', `position:absolute;inset:0;opacity:0.3`);
    bgSvgWrap.innerHTML = window.svgSpaceBackground(acc);
    bg.appendChild(bgSvgWrap);
  }

  const fg = el('div', `position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;transform-style:preserve-3d;transform:translateZ(0) scale(1);transition:transform 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)`);

  const title = el('div', `font-size:${px(52, z)};font-weight:800;color:#ffffff;font-family:'Space Grotesk',sans-serif;text-shadow:0 10px 30px rgba(0,0,0,0.8), 0 0 60px ${acc};margin-bottom:${px(10, z)};letter-spacing:4px;text-transform:uppercase;${as(anim, 0, z)}`, escHtml(s.title || ''));
  fg.appendChild(title);

  if (s.subtitle) {
    const sub = el('div', `font-size:${px(18, z)};color:${acc};font-family:'Inter',sans-serif;text-shadow:0 4px 10px rgba(0,0,0,0.5);margin-bottom:${px(60, z)};letter-spacing:2px;${as(anim, 200, z)}`, escHtml(s.subtitle));
    fg.appendChild(sub);
  }

  const popupWrap = el('div', `position:relative;width:100%;display:flex;justify-content:center;gap:${px(40, z)};${as(anim, 400, z)}`);

  (s.bullets || []).forEach((b, i) => {
    const isUp = i % 2 === 0;
    const yOffset = isUp ? px(-30, z) : px(30, z);
    const popup = el('div', `padding:${px(15, z)} ${px(25, z)};background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:${px(6, z)};backdrop-filter:blur(12px);box-shadow:0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);transform:translateY(${yOffset});position:relative`);
    popup.appendChild(el('div', `font-size:${px(15, z)};font-weight:600;color:#CFCFC8;font-family:'Inter',sans-serif;white-space:nowrap;letter-spacing:1px`, escHtml(b)));

    const line = el('div', `position:absolute;${isUp ? 'bottom:-30px' : 'top:-30px'};left:50%;width:1px;height:30px;background:linear-gradient(to ${isUp ? 'bottom' : 'top'}, rgba(255,255,255,0.2), transparent)`);
    popup.appendChild(line);

    const dot = el('div', `position:absolute;${isUp ? 'bottom:-32px' : 'top:-32px'};left:calc(50% - 2.5px);width:5px;height:5px;border-radius:50%;background:${acc};box-shadow:0 0 10px ${acc}`);
    popup.appendChild(dot);

    popupWrap.appendChild(popup);
  });

  fg.appendChild(popupWrap);

  c.appendChild(bg);
  c.appendChild(fg);
  t.appendChild(c);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bg.style.transform = `translateZ(-200px) scale(1.4) translate(-3%, -1%) rotate(1deg)`;
      fg.style.transform = `translateZ(50px) scale(1.05) translate(2%, 1%) rotate(-0.5deg)`;
    });
  });
}
