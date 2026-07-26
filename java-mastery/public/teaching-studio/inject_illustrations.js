const fs = require('fs');
const path = require('path');

// ══════════════════════════════════════════════════════════════
//  PROFESSIONAL FLAT-VECTOR ILLUSTRATION SVGs
//  Style: Layered, shaded, Storyset/unDraw corporate style
//  Each SVG is 200x200 viewBox for rich detail
// ══════════════════════════════════════════════════════════════

const ILLUSTRATIONS = {

// ──────────────────────────────────────────────────────────────
// 👨‍💻 PROGRAMMER — developer at laptop
// ──────────────────────────────────────────────────────────────
"👨‍💻": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="bg_prog" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#667eea"/><stop offset="100%" stop-color="#764ba2"/></linearGradient>
    <linearGradient id="skin_prog" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDDBB4"/><stop offset="100%" stop-color="#F0B27A"/></linearGradient>
    <linearGradient id="shirt_prog" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4A90D9"/><stop offset="100%" stop-color="#2C5F8A"/></linearGradient>
    <linearGradient id="laptop_prog" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#BDC3C7"/><stop offset="100%" stop-color="#95A5A6"/></linearGradient>
    <linearGradient id="screen_prog" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0D1B2A"/><stop offset="100%" stop-color="#1B2631"/></linearGradient>
    <filter id="shadow_prog"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0006"/></filter>
  </defs>
  <!-- Background circle -->
  <circle cx="100" cy="100" r="96" fill="url(#bg_prog)" opacity="0.15"/>
  <!-- Desk surface -->
  <ellipse cx="100" cy="158" rx="72" ry="12" fill="#C8A97A" opacity="0.5"/>
  <!-- Laptop base -->
  <rect x="52" y="140" width="96" height="8" rx="4" fill="url(#laptop_prog)" filter="url(#shadow_prog)"/>
  <rect x="58" y="106" width="84" height="40" rx="4" fill="url(#laptop_prog)"/>
  <!-- Screen -->
  <rect x="62" y="109" width="76" height="33" rx="2" fill="url(#screen_prog)"/>
  <!-- Code lines on screen with animation -->
  <g id="code_lines">
    <rect x="66" y="114" width="30" height="3" rx="1.5" fill="#61AFEF">
      <animate attributeName="width" values="20;30;20" dur="2.5s" repeatCount="indefinite"/>
    </rect>
    <rect x="66" y="120" width="45" height="3" rx="1.5" fill="#98C379">
      <animate attributeName="width" values="45;25;45" dur="3s" repeatCount="indefinite"/>
    </rect>
    <rect x="66" y="126" width="35" height="3" rx="1.5" fill="#E06C75">
      <animate attributeName="width" values="25;40;25" dur="2s" repeatCount="indefinite"/>
    </rect>
    <rect x="66" y="132" width="20" height="3" rx="1.5" fill="#C678DD">
      <animate attributeName="width" values="20;32;20" dur="2.8s" repeatCount="indefinite"/>
    </rect>
    <!-- Cursor blinking -->
    <rect x="68" y="132" width="2" height="3" rx="1" fill="#ABB2BF">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="x" values="68;88;68" dur="2.8s" repeatCount="indefinite"/>
    </rect>
  </g>
  <!-- Hinge -->
  <rect x="58" y="144" width="84" height="4" rx="2" fill="#7F8C8D"/>
  <!-- Body / shirt -->
  <path d="M72 180 C72 155, 82 148, 100 148 C118 148, 128 155, 128 180 Z" fill="url(#shirt_prog)"/>
  <!-- Collar -->
  <path d="M92 148 L100 160 L108 148" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
  <!-- Arms -->
  <path d="M72 155 Q58 162 62 142" stroke="#FDDBB4" stroke-width="12" stroke-linecap="round" fill="none"/>
  <path d="M128 155 Q142 162 138 142" stroke="#FDDBB4" stroke-width="12" stroke-linecap="round" fill="none"/>
  <!-- Hands on keyboard -->
  <ellipse cx="66" cy="145" rx="8" ry="5" fill="url(#skin_prog)"/>
  <ellipse cx="134" cy="145" rx="8" ry="5" fill="url(#skin_prog)"/>
  <!-- Neck -->
  <rect x="95" y="130" width="10" height="18" rx="5" fill="url(#skin_prog)"/>
  <!-- Head -->
  <ellipse cx="100" cy="116" rx="20" ry="22" fill="url(#skin_prog)" filter="url(#shadow_prog)"/>
  <!-- Hair -->
  <path d="M80 112 Q80 90 100 88 Q120 90 120 112 Q116 96 100 95 Q84 96 80 112Z" fill="#4A2C0A"/>
  <!-- Glasses -->
  <rect x="88" y="112" width="10" height="7" rx="3" fill="none" stroke="#2C3E50" stroke-width="1.5"/>
  <rect x="102" y="112" width="10" height="7" rx="3" fill="none" stroke="#2C3E50" stroke-width="1.5"/>
  <line x1="98" y1="115" x2="102" y2="115" stroke="#2C3E50" stroke-width="1.5"/>
  <!-- Eyes -->
  <circle cx="93" cy="115" r="2" fill="#2C3E50"/>
  <circle cx="107" cy="115" r="2" fill="#2C3E50"/>
  <!-- Smile -->
  <path d="M95 121 Q100 125 105 121" stroke="#C0392B" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- Floating stars -->
  <g>
    <path d="M148 72 L150 66 L152 72 L158 74 L152 76 L150 82 L148 76 L142 74 Z" fill="#FFD700" opacity="0.9">
      <animateTransform attributeName="transform" type="rotate" from="0 150 74" to="360 150 74" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.9;0.4;0.9" dur="3s" repeatCount="indefinite"/>
    </path>
    <path d="M40 80 L42 75 L44 80 L49 82 L44 84 L42 89 L40 84 L35 82 Z" fill="#FF6B6B" opacity="0.8">
      <animateTransform attributeName="transform" type="rotate" from="0 42 82" to="-360 42 82" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
    </path>
    <circle cx="162" cy="100" r="4" fill="#A29BFE">
      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>`,

// ──────────────────────────────────────────────────────────────
// 👷 COMPILER/WORKER — builder with hard hat
// ──────────────────────────────────────────────────────────────
"👷": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="bg_work" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f093fb"/><stop offset="100%" stop-color="#f5576c"/></linearGradient>
    <linearGradient id="skin_work" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDDBB4"/><stop offset="100%" stop-color="#F0B27A"/></linearGradient>
    <linearGradient id="vest_work" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F39C12"/><stop offset="100%" stop-color="#E67E22"/></linearGradient>
    <filter id="shadow_work"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#0005"/></filter>
  </defs>
  <circle cx="100" cy="100" r="96" fill="url(#bg_work)" opacity="0.12"/>
  <!-- Body / safety vest -->
  <path d="M70 185 C70 158, 82 150, 100 150 C118 150, 130 158, 130 185 Z" fill="#2C3E50"/>
  <path d="M78 185 C78 160, 86 153, 100 153 C114 153, 122 160, 122 185 Z" fill="url(#vest_work)"/>
  <!-- Reflective stripes -->
  <path d="M76 170 L124 170" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
  <path d="M76 178 L124 178" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
  <!-- Neck -->
  <rect x="95" y="135" width="10" height="16" rx="5" fill="url(#skin_work)"/>
  <!-- Head -->
  <ellipse cx="100" cy="120" rx="22" ry="20" fill="url(#skin_work)" filter="url(#shadow_work)"/>
  <!-- Hard hat -->
  <ellipse cx="100" cy="107" rx="28" ry="8" fill="#F1C40F"/>
  <path d="M72 107 Q72 94 100 92 Q128 94 128 107 Z" fill="#F39C12"/>
  <rect x="78" y="104" width="44" height="5" rx="2.5" fill="#F1C40F"/>
  <!-- Face -->
  <circle cx="93" cy="119" r="2.5" fill="#2C3E50"/>
  <circle cx="107" cy="119" r="2.5" fill="#2C3E50"/>
  <path d="M94 127 Q100 131 106 127" stroke="#A04000" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- Ear -->
  <ellipse cx="78" cy="120" rx="4" ry="6" fill="#F0B27A"/>
  <ellipse cx="122" cy="120" rx="4" ry="6" fill="#F0B27A"/>
  <!-- Arm holding wrench -->
  <path d="M128 158 Q148 155 148 140" stroke="url(#skin_work)" stroke-width="13" stroke-linecap="round" fill="none"/>
  <!-- Wrench -->
  <g transform="translate(143,128) rotate(35)">
    <rect x="-3" y="-18" width="6" height="28" rx="3" fill="#7F8C8D"/>
    <circle cx="0" cy="-18" r="7" fill="#95A5A6" stroke="#7F8C8D" stroke-width="2"/>
    <circle cx="0" cy="-18" r="4" fill="#7F8C8D"/>
    <animateTransform attributeName="transform" type="rotate" from="35 143 128" to="55 143 128" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;1"/>
    <animateTransform attributeName="transform" type="rotate" from="55 143 128" to="35 143 128" dur="1.5s" begin="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;1"/>
  </g>
  <!-- Left arm -->
  <path d="M72 158 Q55 163 58 147" stroke="url(#skin_work)" stroke-width="13" stroke-linecap="round" fill="none"/>
  <!-- Stars -->
  <path d="M42 90 L44 84 L46 90 L52 92 L46 94 L44 100 L42 94 L36 92 Z" fill="#FFD700">
    <animateTransform attributeName="transform" type="rotate" from="0 44 92" to="360 44 92" dur="5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite"/>
  </path>
  <circle cx="158" cy="80" r="5" fill="#74B9FF">
    <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>`,

// ──────────────────────────────────────────────────────────────
// 📦 BYTECODE / PACKAGE — 3D box
// ──────────────────────────────────────────────────────────────
"📦": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="box_top" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#DEB887"/><stop offset="100%" stop-color="#C8A97A"/></linearGradient>
    <linearGradient id="box_front" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#C8A97A"/><stop offset="100%" stop-color="#A0845C"/></linearGradient>
    <linearGradient id="box_side" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#A0845C"/><stop offset="100%" stop-color="#7A6040"/></linearGradient>
    <filter id="shadow_box"><feDropShadow dx="4" dy="8" stdDeviation="8" flood-color="#0004"/></filter>
  </defs>
  <circle cx="100" cy="100" r="96" fill="#FFF8E7" opacity="0.6"/>
  <!-- Shadow -->
  <ellipse cx="100" cy="168" rx="52" ry="10" fill="#00000020"/>
  <!-- Box group with hover animation -->
  <g filter="url(#shadow_box)">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
    <!-- Top face -->
    <polygon points="100,48 154,72 100,96 46,72" fill="url(#box_top)"/>
    <!-- Tape strip on top -->
    <polygon points="100,48 154,72 154,64 100,40" fill="#E8C97A" opacity="0.6"/>
    <polygon points="100,48 46,72 46,64 100,40" fill="#E8C97A" opacity="0.4"/>
    <!-- Front face -->
    <polygon points="46,72 100,96 100,152 46,128" fill="url(#box_front)"/>
    <!-- Front stripe -->
    <polygon points="46,88 100,112 100,124 46,100" fill="#B8936A" opacity="0.5"/>
    <!-- Side face -->
    <polygon points="154,72 100,96 100,152 154,128" fill="url(#box_side)"/>
    <!-- Binary label on front -->
    <text x="60" y="108" font-family="monospace" font-size="9" fill="#7A6040" opacity="0.7" transform="skewY(20) translate(0,-14)">01001010</text>
    <text x="60" y="118" font-family="monospace" font-size="9" fill="#7A6040" opacity="0.7" transform="skewY(20) translate(0,-14)">11001010</text>
    <!-- Tape cross on top -->
    <line x1="78" y1="60" x2="122" y2="84" stroke="#D4AC6A" stroke-width="3" opacity="0.7"/>
    <line x1="78" y1="84" x2="122" y2="60" stroke="#D4AC6A" stroke-width="3" opacity="0.7"/>
  </g>
  <!-- Sparkles -->
  <path d="M152 55 L154 48 L156 55 L163 57 L156 59 L154 66 L152 59 L145 57Z" fill="#FF9F43" opacity="0.85">
    <animate attributeName="opacity" values="0.85;0.2;0.85" dur="2s" repeatCount="indefinite"/>
    <animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="2s" repeatCount="indefinite" additive="sum"/>
  </path>
  <circle cx="42" cy="82" r="5" fill="#A29BFE">
    <animate attributeName="r" values="4;7;4" dur="2.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.5s" repeatCount="indefinite"/>
  </circle>
</svg>`,

// ──────────────────────────────────────────────────────────────
// 🧠 JVM BRAIN — illustrated anatomical brain with neurons
// ──────────────────────────────────────────────────────────────
"🧠": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <radialGradient id="brain_grad" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#FFB3C6"/><stop offset="60%" stop-color="#FF6B8A"/><stop offset="100%" stop-color="#D63056"/></radialGradient>
    <radialGradient id="brain_shine" cx="35%" cy="30%" r="40%"><stop offset="0%" stop-color="#fff" stop-opacity="0.6"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <filter id="brain_glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="neuron_glow"><feGaussianBlur stdDeviation="3"/></filter>
  </defs>
  <!-- Background -->
  <circle cx="100" cy="100" r="96" fill="#1a0a1e" opacity="0.08"/>
  <!-- Neural network background glow -->
  <g opacity="0.3" filter="url(#neuron_glow)">
    <line x1="50" y1="80" x2="100" y2="110" stroke="#FF6B8A" stroke-width="1"/>
    <line x1="100" y1="110" x2="150" y2="75" stroke="#FF6B8A" stroke-width="1"/>
    <line x1="70" y1="130" x2="100" y2="110" stroke="#A29BFE" stroke-width="1"/>
    <line x1="100" y1="110" x2="130" y2="140" stroke="#A29BFE" stroke-width="1"/>
  </g>
  <!-- Brain shadow -->
  <ellipse cx="100" cy="162" rx="50" ry="9" fill="#D6306050" opacity="0.4"/>
  <!-- Left hemisphere -->
  <ellipse cx="90" cy="108" rx="42" ry="52" fill="url(#brain_grad)" transform="rotate(-8 90 108)"/>
  <!-- Right hemisphere -->
  <ellipse cx="115" cy="108" rx="40" ry="50" fill="#FF7B9C" transform="rotate(8 115 108)"/>
  <!-- Center divider -->
  <line x1="100" y1="62" x2="100" y2="158" stroke="#D63056" stroke-width="2" opacity="0.5"/>
  <!-- Brain folds — left -->
  <path d="M68 88 Q78 82 88 90 Q80 96 70 92" fill="none" stroke="#D63056" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M64 106 Q76 98 88 108 Q78 116 64 110" fill="none" stroke="#D63056" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M68 124 Q80 116 90 126 Q80 134 68 128" fill="none" stroke="#D63056" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Brain folds — right -->
  <path d="M118 88 Q126 82 136 88 Q132 96 120 94" fill="none" stroke="#C0305040" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M115 106 Q126 99 137 106 Q130 115 117 112" fill="none" stroke="#C0305040" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M118 124 Q126 118 136 124 Q130 132 118 128" fill="none" stroke="#C0305040" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Shine -->
  <ellipse cx="86" cy="88" rx="30" ry="22" fill="url(#brain_shine)"/>
  <!-- Cerebellum -->
  <ellipse cx="100" cy="155" rx="24" ry="12" fill="#FF8CAA"/>
  <path d="M80 155 Q100 148 120 155" fill="none" stroke="#D63056" stroke-width="2" opacity="0.5"/>
  <!-- Stem -->
  <rect x="96" y="160" width="8" height="16" rx="4" fill="#FF8CAA"/>
  <!-- Neural sparks with animation -->
  <circle cx="80" cy="96" r="3" fill="#FFD700" filter="url(#brain_glow)">
    <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite"/>
  </circle>
  <circle cx="120" cy="115" r="3" fill="#74B9FF" filter="url(#brain_glow)">
    <animate attributeName="r" values="2;5;2" dur="2.2s" repeatCount="indefinite" begin="0.5s"/>
    <animate attributeName="opacity" values="1;0.2;1" dur="2.2s" repeatCount="indefinite" begin="0.5s"/>
  </circle>
  <!-- Orbiting stars -->
  <path d="M155 72 L157 65 L159 72 L166 74 L159 76 L157 83 L155 76 L148 74Z" fill="#FFD700" opacity="0.9">
    <animateTransform attributeName="transform" type="rotate" from="0 157 74" to="360 157 74" dur="5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.5s" repeatCount="indefinite"/>
  </path>
  <path d="M38 85 L40 79 L42 85 L49 87 L42 89 L40 95 L38 89 L31 87Z" fill="#A29BFE" opacity="0.8">
    <animateTransform attributeName="transform" type="rotate" from="0 40 87" to="-360 40 87" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" begin="1s"/>
  </path>
  <circle cx="162" cy="110" r="5" fill="#FD79A8">
    <animate attributeName="r" values="4;7;4" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" begin="0.7s"/>
  </circle>
</svg>`,

// ──────────────────────────────────────────────────────────────
// ⚙️ CPU / GEAR — mechanical CPU chip
// ──────────────────────────────────────────────────────────────
"⚙️": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <radialGradient id="cpu_grad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#636E72"/><stop offset="100%" stop-color="#2D3436"/></radialGradient>
    <radialGradient id="cpu_inner" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#74B9FF"/><stop offset="60%" stop-color="#0984E3"/><stop offset="100%" stop-color="#023E8A"/></radialGradient>
    <filter id="cpu_glow"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <linearGradient id="gear_tooth" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#636E72"/><stop offset="100%" stop-color="#2D3436"/></linearGradient>
  </defs>
  <circle cx="100" cy="100" r="96" fill="#DFE6E9" opacity="0.2"/>
  <!-- Outer gear teeth — will rotate -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="8s" repeatCount="indefinite"/>
    <!-- 12 teeth -->
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(30 100 100)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(60 100 100)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(90 100 100)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(120 100 100)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(150 100 100)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(180 100 100)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(210 100 100)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(240 100 100)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(270 100 100)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(300 100 100)"/>
    <rect x="91" y="22" width="18" height="20" rx="3" fill="url(#gear_tooth)" transform="rotate(330 100 100)"/>
    <!-- Main gear ring -->
    <circle cx="100" cy="100" r="64" fill="url(#cpu_grad)"/>
    <circle cx="100" cy="100" r="60" fill="#2D3436"/>
  </g>
  <!-- CPU chip body — static, counter-rotating optical illusion -->
  <rect x="62" y="62" width="76" height="76" rx="8" fill="url(#cpu_grad)"/>
  <rect x="66" y="66" width="68" height="68" rx="6" fill="#1a1a2e"/>
  <!-- Circuit glow -->
  <rect x="72" y="72" width="56" height="56" rx="4" fill="url(#cpu_inner)" opacity="0.9" filter="url(#cpu_glow)">
    <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite"/>
  </rect>
  <!-- Circuit traces -->
  <g stroke="#74B9FF" stroke-width="1.5" fill="none" opacity="0.7">
    <line x1="82" y1="82" x2="118" y2="82"/><line x1="82" y1="90" x2="118" y2="90"/>
    <line x1="82" y1="98" x2="118" y2="98"/><line x1="82" y1="106" x2="118" y2="106"/>
    <line x1="82" y1="114" x2="118" y2="114"/>
    <line x1="82" y1="82" x2="82" y2="118"/><line x1="100" y1="82" x2="100" y2="118"/>
    <line x1="118" y1="82" x2="118" y2="118"/>
  </g>
  <!-- CPU logo text -->
  <text x="100" y="104" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#74B9FF" letter-spacing="1">CPU</text>
  <!-- Pins left -->
  <line x1="42" y1="76" x2="62" y2="76" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="42" y1="88" x2="62" y2="88" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="42" y1="100" x2="62" y2="100" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="42" y1="112" x2="62" y2="112" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="42" y1="124" x2="62" y2="124" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <!-- Pins right -->
  <line x1="138" y1="76" x2="158" y2="76" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="138" y1="88" x2="158" y2="88" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="138" y1="100" x2="158" y2="100" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="138" y1="112" x2="158" y2="112" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="138" y1="124" x2="158" y2="124" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <!-- Pins top/bottom -->
  <line x1="76" y1="42" x2="76" y2="62" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="88" y1="42" x2="88" y2="62" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="42" x2="100" y2="62" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="112" y1="42" x2="112" y2="62" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="124" y1="42" x2="124" y2="62" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="76" y1="138" x2="76" y2="158" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="88" y1="138" x2="88" y2="158" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="138" x2="100" y2="158" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="112" y1="138" x2="112" y2="158" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <line x1="124" y1="138" x2="124" y2="158" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round"/>
  <!-- Pulsing light -->
  <circle cx="100" cy="100" r="28" fill="none" stroke="#74B9FF" stroke-width="2" opacity="0.5">
    <animate attributeName="r" values="26;34;26" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>`,

// ──────────────────────────────────────────────────────────────
// 💡 LIGHTBULB — glowing idea
// ──────────────────────────────────────────────────────────────
"💡": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <radialGradient id="bulb_glow" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#FFF9C4"/><stop offset="50%" stop-color="#FFD54F"/><stop offset="100%" stop-color="#FF8F00"/></radialGradient>
    <radialGradient id="bulb_outer" cx="50%" cy="35%" r="55%"><stop offset="0%" stop-color="#FFFDE7"/><stop offset="100%" stop-color="#FFF176"/></radialGradient>
    <filter id="glow_light"><feGaussianBlur stdDeviation="10" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="soft_glow"><feGaussianBlur stdDeviation="5"/></filter>
  </defs>
  <!-- Ambient glow -->
  <circle cx="100" cy="92" r="68" fill="#FFD700" opacity="0.15" filter="url(#soft_glow)">
    <animate attributeName="r" values="60;80;60" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/>
  </circle>
  <!-- Bulb glass -->
  <path d="M100 34 C70 34 50 56 50 80 C50 102 62 116 74 126 L74 142 L126 142 L126 126 C138 116 150 102 150 80 C150 56 130 34 100 34 Z" fill="url(#bulb_outer)" filter="url(#glow_light)"/>
  <!-- Shine highlight -->
  <ellipse cx="84" cy="66" rx="12" ry="18" fill="white" opacity="0.55" transform="rotate(-20 84 66)"/>
  <!-- Filament -->
  <path d="M88 116 Q88 108 100 104 Q112 108 112 116" stroke="#FF8F00" stroke-width="3" fill="none" stroke-linecap="round">
    <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
  </path>
  <path d="M92 108 L92 95 Q92 88 100 88 Q108 88 108 95 L108 108" stroke="#FF8F00" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Base/cap ring -->
  <rect x="74" y="142" width="52" height="10" rx="5" fill="#B0BEC5"/>
  <rect x="74" y="152" width="52" height="6" rx="3" fill="#90A4AE"/>
  <rect x="74" y="158" width="52" height="6" rx="3" fill="#78909C"/>
  <rect x="78" y="164" width="44" height="6" rx="3" fill="#607D8B"/>
  <!-- Rays -->
  <g stroke="#FFD700" stroke-width="3" stroke-linecap="round" opacity="0.8">
    <line x1="100" y1="24" x2="100" y2="14"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite"/></line>
    <line x1="130" y1="32" x2="138" y2="24"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" begin="0.3s"/></line>
    <line x1="148" y1="58" x2="158" y2="52"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" begin="0.6s"/></line>
    <line x1="70" y1="32" x2="62" y2="24"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" begin="0.2s"/></line>
    <line x1="52" y1="58" x2="42" y2="52"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" begin="0.5s"/></line>
  </g>
</svg>`,

// ──────────────────────────────────────────────────────────────
// 🚀 ROCKET
// ──────────────────────────────────────────────────────────────
"🚀": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="rocket_body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#DFE6E9"/><stop offset="100%" stop-color="#B2BEC3"/></linearGradient>
    <linearGradient id="rocket_nose" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E17055"/><stop offset="100%" stop-color="#D63031"/></linearGradient>
    <linearGradient id="rocket_fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#E17055"/><stop offset="100%" stop-color="#C0392B"/></linearGradient>
    <filter id="rocket_glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
    <!-- Exhaust flame -->
    <path d="M86 148 Q100 185 114 148" fill="#FF6B6B" opacity="0.6">
      <animate attributeName="d" values="M86 148 Q100 185 114 148;M88 148 Q100 175 112 148;M86 148 Q100 185 114 148" dur="0.4s" repeatCount="indefinite"/>
    </path>
    <path d="M90 148 Q100 172 110 148" fill="#FF9F43">
      <animate attributeName="d" values="M90 148 Q100 172 110 148;M91 148 Q100 162 109 148;M90 148 Q100 172 110 148" dur="0.3s" repeatCount="indefinite"/>
    </path>
    <path d="M93 148 Q100 160 107 148" fill="#FFF">
      <animate attributeName="d" values="M93 148 Q100 160 107 148;M94 148 Q100 154 106 148;M93 148 Q100 160 107 148" dur="0.25s" repeatCount="indefinite"/>
    </path>
    <!-- Fins -->
    <path d="M76 135 L68 160 L88 148 Z" fill="url(#rocket_fin)"/>
    <path d="M124 135 L132 160 L112 148 Z" fill="url(#rocket_fin)"/>
    <!-- Rocket body -->
    <rect x="80" y="80" width="40" height="70" rx="6" fill="url(#rocket_body)"/>
    <!-- Window stripe -->
    <rect x="80" y="108" width="40" height="18" rx="0" fill="#74B9FF" opacity="0.4"/>
    <!-- Nose cone -->
    <path d="M80 80 Q80 44 100 34 Q120 44 120 80 Z" fill="url(#rocket_nose)"/>
    <!-- Window -->
    <circle cx="100" cy="116" r="12" fill="#74B9FF"/>
    <circle cx="100" cy="116" r="10" fill="#0984E3"/>
    <circle cx="96" cy="112" r="3" fill="#fff" opacity="0.5"/>
    <!-- Shine on body -->
    <path d="M88 80 L88 148 Q83 144 83 80 Z" fill="white" opacity="0.2"/>
  </g>
  <!-- Stars -->
  <circle cx="40" cy="70" r="2" fill="#FFD700"><animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite"/></circle>
  <circle cx="160" cy="88" r="3" fill="#fff"><animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" begin="0.5s"/></circle>
  <circle cx="50" cy="130" r="2" fill="#fff"><animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite" begin="1s"/></circle>
  <circle cx="155" cy="60" r="2" fill="#74B9FF"><animate attributeName="opacity" values="1;0;1" dur="2.2s" repeatCount="indefinite" begin="0.2s"/></circle>
</svg>`,

// ──────────────────────────────────────────────────────────────
// ⚡ LIGHTNING / ENERGY
// ──────────────────────────────────────────────────────────────
"⚡": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="bolt_grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDCB6E"/><stop offset="100%" stop-color="#F39C12"/></linearGradient>
    <filter id="bolt_glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <!-- Outer glow -->
  <polygon points="115,28 72,108 98,108 85,172 140,88 110,88" fill="#FFD700" opacity="0.25" filter="url(#bolt_glow)">
    <animate attributeName="opacity" values="0.25;0.6;0.25" dur="1.5s" repeatCount="indefinite"/>
  </polygon>
  <!-- Main bolt -->
  <polygon points="115,28 72,108 98,108 85,172 140,88 110,88" fill="url(#bolt_grad)" filter="url(#bolt_glow)"/>
  <!-- Inner highlight -->
  <polygon points="112,42 80,102 100,102 90,152 130,96 108,96" fill="#FFEAA7" opacity="0.6"/>
  <!-- Sparks -->
  <circle cx="60" cy="90" r="4" fill="#FFD700">
    <animate attributeName="cx" values="60;50;60" dur="1s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
  </circle>
  <circle cx="150" cy="115" r="3" fill="#FDCB6E">
    <animate attributeName="cx" values="150;162;150" dur="0.8s" repeatCount="indefinite" begin="0.3s"/>
    <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" begin="0.3s"/>
  </circle>
  <line x1="52" y1="70" x2="65" y2="85" stroke="#FFD700" stroke-width="2" opacity="0.7">
    <animate attributeName="opacity" values="0.7;0;0.7" dur="0.6s" repeatCount="indefinite"/>
  </line>
  <line x1="148" y1="130" x2="162" y2="140" stroke="#F39C12" stroke-width="2" opacity="0.7">
    <animate attributeName="opacity" values="0.7;0;0.7" dur="0.7s" repeatCount="indefinite" begin="0.2s"/>
  </line>
</svg>`,

// ──────────────────────────────────────────────────────────────
// 🔍 MAGNIFYING GLASS — search with sweep
// ──────────────────────────────────────────────────────────────
"🔍": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <radialGradient id="glass_lens" cx="40%" cy="35%" r="60%"><stop offset="0%" stop-color="#AEE6FF"/><stop offset="100%" stop-color="#74B9FF" stop-opacity="0.6"/></radialGradient>
    <linearGradient id="handle_grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#636E72"/><stop offset="100%" stop-color="#2D3436"/></linearGradient>
    <clipPath id="lens_clip"><circle cx="88" cy="88" r="56"/></clipPath>
    <filter id="lens_shadow"><feDropShadow dx="3" dy="6" stdDeviation="6" flood-color="#0004"/></filter>
  </defs>
  <!-- Handle -->
  <line x1="130" y1="130" x2="172" y2="172" stroke="url(#handle_grad)" stroke-width="22" stroke-linecap="round" filter="url(#lens_shadow)"/>
  <line x1="130" y1="130" x2="172" y2="172" stroke="#B2BEC3" stroke-width="16" stroke-linecap="round"/>
  <!-- Lens frame -->
  <circle cx="88" cy="88" r="60" fill="none" stroke="#636E72" stroke-width="12" filter="url(#lens_shadow)"/>
  <circle cx="88" cy="88" r="60" fill="none" stroke="#B2BEC3" stroke-width="8"/>
  <!-- Lens glass -->
  <circle cx="88" cy="88" r="54" fill="url(#glass_lens)" opacity="0.7"/>
  <!-- Search lines inside -->
  <g clip-path="url(#lens_clip)" opacity="0.5">
    <line x1="50" y1="78" x2="126" y2="78" stroke="#2D3436" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="90" x2="126" y2="90" stroke="#2D3436" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="102" x2="126" y2="102" stroke="#2D3436" stroke-width="3" stroke-linecap="round"/>
  </g>
  <!-- Sweeping light reflection -->
  <g clip-path="url(#lens_clip)">
    <ellipse cx="72" cy="70" rx="18" ry="32" fill="white" opacity="0.45" transform="rotate(-30 72 70)">
      <animateTransform attributeName="transform" type="translate" values="-70,0; 90,0; -70,0" dur="3s" repeatCount="indefinite" additive="sum"/>
    </ellipse>
  </g>
  <!-- Shine dot -->
  <circle cx="68" cy="66" r="8" fill="white" opacity="0.5"/>
</svg>`,

// ──────────────────────────────────────────────────────────────
// 🖥️ MONITOR — desktop screen
// ──────────────────────────────────────────────────────────────
"🖥️": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="monitor_body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#DFE6E9"/><stop offset="100%" stop-color="#B2BEC3"/></linearGradient>
    <linearGradient id="monitor_screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0D1B2A"/><stop offset="100%" stop-color="#162032"/></linearGradient>
    <clipPath id="screen_clip"><rect x="32" y="28" width="136" height="96" rx="4"/></clipPath>
  </defs>
  <!-- Stand base -->
  <ellipse cx="100" cy="178" rx="44" ry="8" fill="#95A5A6"/>
  <rect x="88" y="156" width="24" height="22" rx="4" fill="#B2BEC3"/>
  <rect x="76" y="172" width="48" height="8" rx="4" fill="#95A5A6"/>
  <!-- Monitor body -->
  <rect x="28" y="24" width="144" height="108" rx="10" fill="url(#monitor_body)"/>
  <!-- Screen -->
  <rect x="32" y="28" width="136" height="96" rx="6" fill="url(#monitor_screen)"/>
  <!-- Screen content -->
  <g clip-path="url(#screen_clip)">
    <!-- Code editor look -->
    <rect x="32" y="28" width="36" height="96" fill="#1e2433"/>
    <!-- Line numbers -->
    <text x="36" y="50" font-family="monospace" font-size="8" fill="#4a5568">01</text>
    <text x="36" y="62" font-family="monospace" font-size="8" fill="#4a5568">02</text>
    <text x="36" y="74" font-family="monospace" font-size="8" fill="#4a5568">03</text>
    <text x="36" y="86" font-family="monospace" font-size="8" fill="#4a5568">04</text>
    <text x="36" y="98" font-family="monospace" font-size="8" fill="#4a5568">05</text>
    <text x="36" y="110" font-family="monospace" font-size="8" fill="#4a5568">06</text>
    <!-- Code lines -->
    <rect x="72" y="44" width="50" height="5" rx="2" fill="#61AFEF"><animate attributeName="width" values="40;60;40" dur="3s" repeatCount="indefinite"/></rect>
    <rect x="78" y="56" width="70" height="5" rx="2" fill="#98C379"><animate attributeName="width" values="70;45;70" dur="2.5s" repeatCount="indefinite"/></rect>
    <rect x="78" y="68" width="55" height="5" rx="2" fill="#C678DD"><animate attributeName="width" values="55;35;55" dur="2s" repeatCount="indefinite"/></rect>
    <rect x="72" y="80" width="40" height="5" rx="2" fill="#E06C75"><animate attributeName="width" values="35;55;35" dur="3.5s" repeatCount="indefinite"/></rect>
    <rect x="78" y="92" width="60" height="5" rx="2" fill="#FFCC00"><animate attributeName="width" values="50;70;50" dur="2.2s" repeatCount="indefinite"/></rect>
    <rect x="78" y="104" width="30" height="5" rx="2" fill="#61AFEF"><animate attributeName="width" values="28;42;28" dur="2.8s" repeatCount="indefinite"/></rect>
    <!-- Cursor -->
    <rect x="78" y="116" width="2" height="7" rx="1" fill="#ABB2BF">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
    </rect>
    <!-- Sweep reflection -->
    <rect x="32" y="28" width="25" height="96" fill="white" opacity="0.06">
      <animateTransform attributeName="transform" type="translate" values="-50,0; 200,0; -50,0" dur="4s" repeatCount="indefinite"/>
    </rect>
  </g>
  <!-- Bezel dots -->
  <circle cx="100" cy="132" r="4" fill="#95A5A6"/>
  <!-- Power light -->
  <circle cx="168" cy="130" r="3" fill="#00B894">
    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>`,

// ──────────────────────────────────────────────────────────────
// 📊 BAR CHART — data visualization
// ──────────────────────────────────────────────────────────────
"📊": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6C5CE7"/><stop offset="100%" stop-color="#A29BFE"/></linearGradient>
    <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00CEC9"/><stop offset="100%" stop-color="#81ECEC"/></linearGradient>
    <linearGradient id="bar3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDCB6E"/><stop offset="100%" stop-color="#FFEAA7"/></linearGradient>
    <linearGradient id="bar4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E17055"/><stop offset="100%" stop-color="#FAB1A0"/></linearGradient>
    <filter id="chart_shadow"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#0003"/></filter>
  </defs>
  <!-- Background card -->
  <rect x="20" y="20" width="160" height="160" rx="16" fill="white" opacity="0.9" filter="url(#chart_shadow)"/>
  <!-- Title line -->
  <rect x="36" y="34" width="60" height="8" rx="4" fill="#DFE6E9"/>
  <rect x="36" y="46" width="40" height="6" rx="3" fill="#EEF2F7"/>
  <!-- Grid lines -->
  <g stroke="#EEF2F7" stroke-width="1">
    <line x1="50" y1="148" x2="178" y2="148"/>
    <line x1="50" y1="128" x2="178" y2="128"/>
    <line x1="50" y1="108" x2="178" y2="108"/>
    <line x1="50" y1="88" x2="178" y2="88"/>
  </g>
  <!-- Axis -->
  <line x1="50" y1="60" x2="50" y2="150" stroke="#B2BEC3" stroke-width="2"/>
  <line x1="50" y1="150" x2="178" y2="150" stroke="#B2BEC3" stroke-width="2"/>
  <!-- Bar 1 -->
  <rect x="58" y="108" width="22" height="42" rx="4" fill="url(#bar1)">
    <animate attributeName="height" values="42;62;42" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
    <animate attributeName="y" values="108;88;108" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
  </rect>
  <!-- Bar 2 -->
  <rect x="88" y="88" width="22" height="62" rx="4" fill="url(#bar2)">
    <animate attributeName="height" values="62;38;62" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
    <animate attributeName="y" values="88;112;88" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
  </rect>
  <!-- Bar 3 -->
  <rect x="118" y="98" width="22" height="52" rx="4" fill="url(#bar3)">
    <animate attributeName="height" values="52;76;52" dur="3.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
    <animate attributeName="y" values="98;74;98" dur="3.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
  </rect>
  <!-- Bar 4 -->
  <rect x="148" y="118" width="22" height="32" rx="4" fill="url(#bar4)">
    <animate attributeName="height" values="32;50;32" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
    <animate attributeName="y" values="118;100;118" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
  </rect>
  <!-- Legend dots -->
  <circle cx="62" cy="170" r="5" fill="url(#bar1)"/>
  <circle cx="92" cy="170" r="5" fill="url(#bar2)"/>
  <circle cx="122" cy="170" r="5" fill="url(#bar3)"/>
  <circle cx="152" cy="170" r="5" fill="url(#bar4)"/>
</svg>`,

// ──────────────────────────────────────────────────────────────
// 📝 NOTE / DOCUMENT
// ──────────────────────────────────────────────────────────────
"📝": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="paper_grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFFDF5"/><stop offset="100%" stop-color="#FFF8E1"/></linearGradient>
    <filter id="paper_shadow"><feDropShadow dx="4" dy="6" stdDeviation="8" flood-color="#0003"/></filter>
  </defs>
  <!-- Paper shadow -->
  <rect x="38" y="28" width="128" height="160" rx="10" fill="#DDD" opacity="0.4" transform="translate(6,6)"/>
  <!-- Paper -->
  <rect x="32" y="22" width="128" height="160" rx="10" fill="url(#paper_grad)" filter="url(#paper_shadow)"/>
  <!-- Torn top fold -->
  <path d="M128 22 L160 22 L160 52 Z" fill="#FFF8E1" opacity="0.5"/>
  <path d="M128 22 L160 52 L128 52 Z" fill="#EEE8D5"/>
  <!-- Lines with typing animation -->
  <rect x="48" y="52" width="100" height="5" rx="2.5" fill="#90A4AE"><animate attributeName="width" values="20;100;100;100" dur="4s" repeatCount="indefinite" keyTimes="0;0.3;0.9;1"/></rect>
  <rect x="48" y="66" width="80" height="5" rx="2.5" fill="#B0BEC5"><animate attributeName="width" values="20;80;80;80" dur="4s" repeatCount="indefinite" begin="0.5s" keyTimes="0;0.3;0.9;1"/></rect>
  <rect x="48" y="80" width="92" height="5" rx="2.5" fill="#90A4AE"><animate attributeName="width" values="20;92;92;92" dur="4s" repeatCount="indefinite" begin="1s" keyTimes="0;0.3;0.9;1"/></rect>
  <rect x="48" y="94" width="60" height="5" rx="2.5" fill="#B0BEC5"><animate attributeName="width" values="20;60;60;60" dur="4s" repeatCount="indefinite" begin="1.5s" keyTimes="0;0.3;0.9;1"/></rect>
  <rect x="48" y="108" width="88" height="5" rx="2.5" fill="#90A4AE"><animate attributeName="width" values="20;88;88;88" dur="4s" repeatCount="indefinite" begin="2s" keyTimes="0;0.3;0.9;1"/></rect>
  <rect x="48" y="122" width="70" height="5" rx="2.5" fill="#B0BEC5"><animate attributeName="width" values="20;70;70;70" dur="4s" repeatCount="indefinite" begin="2.5s" keyTimes="0;0.3;0.9;1"/></rect>
  <!-- Pencil -->
  <g transform="translate(120,130) rotate(-40)">
    <rect x="-5" y="-50" width="10" height="50" rx="2" fill="#FDCB6E"/>
    <polygon points="-5,-50 5,-50 0,-62" fill="#F5CBA7"/>
    <circle cx="0" cy="-62" r="2" fill="#2D3436"/>
    <rect x="-5" y="0" width="10" height="6" rx="0" fill="#E17055"/>
    <rect x="-5" y="6" width="10" height="4" rx="0" fill="#FAB1A0"/>
    <animateTransform attributeName="transform" type="rotate" from="-40 120 130" to="-38 120 130" dur="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;1"/>
    <animateTransform attributeName="transform" type="rotate" from="-38 120 130" to="-40 120 130" dur="0.8s" begin="0.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;1"/>
  </g>
</svg>`,

// ──────────────────────────────────────────────────────────────
// 👥 TEAM / USERS
// ──────────────────────────────────────────────────────────────
"👥": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="skin1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDDBB4"/><stop offset="100%" stop-color="#F0B27A"/></linearGradient>
    <linearGradient id="skin2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDDBB4"/><stop offset="100%" stop-color="#E59866"/></linearGradient>
    <linearGradient id="shirt1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6C5CE7"/><stop offset="100%" stop-color="#4834D4"/></linearGradient>
    <linearGradient id="shirt2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00CEC9"/><stop offset="100%" stop-color="#00B4AE"/></linearGradient>
    <linearGradient id="shirt3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E17055"/><stop offset="100%" stop-color="#C0392B"/></linearGradient>
    <filter id="person_shadow"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0003"/></filter>
  </defs>
  <!-- Person 1 (left, back) -->
  <g opacity="0.75">
    <path d="M44 175 C44 158, 52 152, 64 152 C76 152, 84 158, 84 175 Z" fill="url(#shirt1)"/>
    <circle cx="64" cy="136" r="18" fill="url(#skin1)"/>
    <path d="M50 126 Q50 112 64 110 Q78 112 78 126 Z" fill="#2C1810"/>
  </g>
  <!-- Person 3 (right, back) -->
  <g opacity="0.75">
    <path d="M116 175 C116 158, 124 152, 136 152 C148 152, 156 158, 156 175 Z" fill="url(#shirt3)"/>
    <circle cx="136" cy="136" r="18" fill="url(#skin2)"/>
    <path d="M122 124 Q130 110 136 110 Q142 110 150 124 Q148 116 136 115 Q124 116 122 124Z" fill="#1A0800"/>
  </g>
  <!-- Person 2 (center, front) -->
  <g filter="url(#person_shadow)">
    <path d="M72 185 C72 162, 82 154, 100 154 C118 154, 128 162, 128 185 Z" fill="url(#shirt2)"/>
    <circle cx="100" cy="136" r="22" fill="url(#skin1)"/>
    <path d="M82 124 Q82 106 100 104 Q118 106 118 124 Q114 110 100 109 Q86 110 82 124Z" fill="#4A2C0A"/>
    <!-- Face -->
    <circle cx="93" cy="135" r="2.5" fill="#2C3E50"/>
    <circle cx="107" cy="135" r="2.5" fill="#2C3E50"/>
    <path d="M94 143 Q100 147 106 143" stroke="#A04000" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- Smile animation -->
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
  </g>
  <!-- Chat bubble above -->
  <g>
    <rect x="110" y="70" width="56" height="32" rx="8" fill="#6C5CE7"/>
    <path d="M116 102 L110 110 L124 102Z" fill="#6C5CE7"/>
    <rect x="118" y="80" width="30" height="4" rx="2" fill="white" opacity="0.7"/>
    <rect x="118" y="88" width="20" height="4" rx="2" fill="white" opacity="0.5"/>
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-4; 0,0" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
  </g>
</svg>`,

};

// ══════════════════════════════════════════════════════════════
// Inject the new illustrations into utils.js
// ══════════════════════════════════════════════════════════════
function inject() {
  const utilsPath = path.join(__dirname, 'js', 'utils.js');
  let utilsContent = fs.readFileSync(utilsPath, 'utf8');

  const startIdx = utilsContent.indexOf('const CUSTOM_SVGS = {');
  if (startIdx === -1) { console.error("CUSTOM_SVGS not found"); return; }
  let endIdx = utilsContent.indexOf('};', startIdx) + 2;

  // Parse the existing CUSTOM_SVGS
  const customSvgsStr = utilsContent.substring(startIdx, endIdx);
  let customSvgs = new Function('return ' + customSvgsStr.substring(customSvgsStr.indexOf('{')))();

  // Replace each emoji that has a new illustration
  for (const [emoji, svg] of Object.entries(ILLUSTRATIONS)) {
    // Minify the SVG (remove newlines and extra whitespace)
    const minified = svg.replace(/\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
    customSvgs[emoji] = minified;
    console.log(`Replaced ${emoji}`);
  }

  const newStr = 'const CUSTOM_SVGS = ' + JSON.stringify(customSvgs, null, 2) + ';';
  utilsContent = utilsContent.substring(0, startIdx) + newStr + utilsContent.substring(endIdx);
  fs.writeFileSync(utilsPath, utilsContent);
  console.log('\nAll professional illustrations injected into utils.js!');
}

inject();
