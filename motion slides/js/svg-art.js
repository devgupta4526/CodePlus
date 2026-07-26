// ═══════════════════════════════════════════════════════════════════════════
// svg-art.js  —  Inline SVG Vector Art Library for Java Teaching Studio
// ═══════════════════════════════════════════════════════════════════════════
// Provides: SVGICONS, getNodeIcon(), svgAstronaut(), svgPlanet(), svgCodeWindow()

/* ── 15-icon SVG Library (Heroicons stroke style) ────────────────────────── */
const SVGICONS = {
  code:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  compile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="11" cy="14" r="3"/><path d="m13.5 16.5 1.5 1.5"/></svg>`,
  load:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  jit:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  execute: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  gear:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  shield:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  server:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  db:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  cpu:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  network: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5" y2="16"/><line x1="12" y1="8" x2="19" y2="16"/></svg>`,
  api:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  lock:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  cloud:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  star:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
};

/* ── Smart icon auto-detect from step label ──────────────────────────────── */
function getNodeIcon(label, idx) {
  const l = (label || '').toLowerCase();
  if (l.includes('source') || l.includes('.java') || l.includes('code') || l.includes('write'))  return SVGICONS.code;
  if (l.includes('compil') || l.includes('javac') || l.includes('.class') || l.includes('build'))return SVGICONS.compile;
  if (l.includes('load')   || l.includes('classload') || l.includes('download'))                  return SVGICONS.load;
  if (l.includes('jit')    || l.includes('lightning')  || l.includes('optim') || l.includes('fast'))return SVGICONS.jit;
  if (l.includes('cpu')    || l.includes('execut') || l.includes('run') || l.includes('output'))  return SVGICONS.execute;
  if (l.includes('secur')  || l.includes('auth')   || l.includes('jwt')  || l.includes('filter')) return SVGICONS.shield;
  if (l.includes('server') || l.includes('service')|| l.includes('controller'))                   return SVGICONS.server;
  if (l.includes('db')     || l.includes('database')|| l.includes('repo') || l.includes('sql'))   return SVGICONS.db;
  if (l.includes('cloud')  || l.includes('aws')    || l.includes('deploy'))                       return SVGICONS.cloud;
  if (l.includes('api')    || l.includes('rest')   || l.includes('http')  || l.includes('request'))return SVGICONS.api;
  if (l.includes('network')|| l.includes('microserv'))                                             return SVGICONS.network;
  if (l.includes('lock')   || l.includes('encap')  || l.includes('private'))                      return SVGICONS.lock;
  const cycle = [SVGICONS.gear, SVGICONS.star, SVGICONS.cpu, SVGICONS.server,
                 SVGICONS.api,  SVGICONS.network, SVGICONS.shield, SVGICONS.cloud];
  return cycle[(idx || 0) % cycle.length];
}

/* ── SVG Astronaut (fully inline, vector quality) ────────────────────────── */
function svgAstronaut(acc) {
  const h = acc.replace('#', '');
  return `<svg viewBox="0 0 160 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <defs>
      <radialGradient id="hG${h}" cx="35%" cy="30%"><stop offset="0%" stop-color="#fff" stop-opacity=".2"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      <radialGradient id="vG${h}" cx="40%" cy="35%"><stop offset="0%" stop-color="${acc}" stop-opacity=".18"/><stop offset="100%" stop-color="transparent"/></radialGradient>
    </defs>
    <ellipse cx="80" cy="122" rx="60" ry="72" fill="${acc}" opacity=".05"/>
    <rect x="56" y="128" width="48" height="60" rx="12" fill="#1a1d2e"/>
    <rect x="61" y="138" width="15" height="32" rx="7" fill="${acc}55"/>
    <rect x="84" y="138" width="15" height="32" rx="7" fill="${acc}55"/>
    <circle cx="68" cy="172" r="5" fill="${acc}80"/>
    <circle cx="92" cy="172" r="5" fill="${acc}80"/>
    <rect x="47" y="118" width="66" height="72" rx="18" fill="#c8cce0"/>
    <rect x="61" y="127" width="38" height="22" rx="6" fill="${acc}28" stroke="${acc}55" stroke-width="1.5"/>
    <circle cx="72" cy="136" r="4" fill="${acc}80"/>
    <circle cx="84" cy="136" r="3" fill="${acc}50"/>
    <rect x="67" y="103" width="26" height="20" rx="7" fill="#b0b4c8"/>
    <circle cx="80" cy="78" r="46" fill="#d8dce8"/>
    <circle cx="80" cy="78" r="46" fill="url(#hG${h})"/>
    <ellipse cx="80" cy="83" rx="30" ry="26" fill="#0d1117" opacity=".88"/>
    <ellipse cx="80" cy="83" rx="30" ry="26" fill="url(#vG${h})"/>
    <ellipse cx="70" cy="73" rx="7" ry="4" fill="#fff" opacity=".16" transform="rotate(-20 70 73)"/>
    <circle cx="80" cy="78" r="46" fill="none" stroke="${acc}" stroke-width="3" opacity=".6"/>
    <path d="M 38 74 Q 80 58 122 74" stroke="${acc}" stroke-width="4" fill="none" opacity=".4" stroke-linecap="round"/>
    <rect x="15" y="124" width="36" height="22" rx="11" fill="#c0c4d4" transform="rotate(-20 33 135)"/>
    <rect x="109" y="124" width="36" height="22" rx="11" fill="#c0c4d4" transform="rotate(20 127 135)"/>
    <circle cx="17" cy="148" r="12" fill="${acc}95"/>
    <circle cx="143" cy="148" r="12" fill="${acc}95"/>
    <rect x="55" y="184" width="24" height="44" rx="11" fill="#b8bcc8"/>
    <rect x="81" y="184" width="24" height="44" rx="11" fill="#b8bcc8"/>
    <rect x="49" y="220" width="32" height="16" rx="7" fill="#22263a"/>
    <rect x="79" y="220" width="32" height="16" rx="7" fill="#22263a"/>
    <rect x="51" y="222" width="28" height="4" rx="2" fill="${acc}60"/>
    <rect x="81" y="222" width="28" height="4" rx="2" fill="${acc}60"/>
    <line x1="80" y1="32" x2="80" y2="14" stroke="${acc}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="80" cy="11" r="5" fill="${acc}"/>
    <circle cx="80" cy="11" r="3" fill="#fff" opacity=".5"/>
  </svg>`;
}

/* ── SVG Planet (with optional ring) ─────────────────────────────────────── */
function svgPlanet(clr, hasRing, uid) {
  uid = uid || ('p' + Math.random().toString(36).slice(2, 6));
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <defs>
      <radialGradient id="${uid}" cx="35%" cy="30%">
        <stop offset="0%" stop-color="#fff" stop-opacity=".32"/>
        <stop offset="60%" stop-color="${clr}" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity=".5"/>
      </radialGradient>
    </defs>
    ${hasRing ? `<ellipse cx="50" cy="54" rx="46" ry="13" fill="none" stroke="${clr}" stroke-width="7" opacity=".28"/>` : ''}
    <circle cx="50" cy="50" r="36" fill="${clr}" opacity=".9"/>
    <circle cx="50" cy="50" r="36" fill="url(#${uid})"/>
    ${hasRing ? `<ellipse cx="50" cy="54" rx="46" ry="13" fill="none" stroke="${clr}" stroke-width="3.5" opacity=".18" stroke-dasharray="5 8"/>` : ''}
    <circle cx="50" cy="50" r="36" fill="none" stroke="${clr}" stroke-width="5" opacity=".15"/>
  </svg>`;
}

/* ── SVG Code Window mockup ───────────────────────────────────────────────── */
function svgCodeWindow(acc, w2, h2) {
  w2 = w2 || 260; h2 = h2 || 175;
  const h = acc.replace('#', '');
  return `<svg viewBox="0 0 ${w2} ${h2}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <rect x="1" y="1" width="${w2-2}" height="${h2-2}" rx="12" fill="#0d1117" stroke="${acc}45" stroke-width="1.5"/>
    <rect x="1" y="1" width="${w2-2}" height="32" rx="12" fill="#161b22"/>
    <rect x="1" y="20" width="${w2-2}" height="13" fill="#161b22"/>
    <circle cx="20" cy="17" r="5.5" fill="#f87c7c"/>
    <circle cx="36" cy="17" r="5.5" fill="#f8d07c"/>
    <circle cx="52" cy="17" r="5.5" fill="#7cf8a0"/>
    <rect x="66" y="9" width="90" height="16" rx="4" fill="${acc}22" stroke="${acc}45" stroke-width="1"/>
    <text x="78" y="21" font-family="monospace" font-size="9" fill="${acc}">Main.java</text>
    <rect x="14" y="44" width="42" height="6" rx="2" fill="#c792ea55"/>
    <rect x="60" y="44" width="70" height="6" rx="2" fill="#7c8cf828"/>
    <rect x="14" y="56" width="30" height="6" rx="2" fill="#c792ea55"/>
    <rect x="48" y="56" width="18" height="6" rx="2" fill="#7cf8a055"/>
    <rect x="70" y="56" width="55" height="6" rx="2" fill="#f8d07c40"/>
    <rect x="26" y="68" width="65" height="6" rx="2" fill="#7cd4f855"/>
    <rect x="95" y="68" width="35" height="6" rx="2" fill="#c3e88d40"/>
    <rect x="26" y="80" width="85" height="6" rx="2" fill="#c3e88d38"/>
    <rect x="14" y="92" width="22" height="6" rx="2" fill="#c792ea55"/>
    <rect x="14" y="110" width="3" height="11" rx="1" fill="${acc}" opacity=".8">
      <animate attributeName="opacity" values="0.8;0;0.8" dur="1.2s" repeatCount="indefinite"/>
    </rect>
    <defs>
      <linearGradient id="wg${h}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="transparent"/>
        <stop offset="100%" stop-color="${acc}16"/>
      </linearGradient>
    </defs>
    <rect x="0" y="140" width="${w2}" height="35" fill="url(#wg${h})" rx="0"/>
  </svg>`;
}
