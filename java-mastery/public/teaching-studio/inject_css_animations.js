const fs = require('fs');
const path = require('path');

// All SVGs rebuilt with CSS class-based animations (no SMIL)
// Each <g class="..."> is animated by main.css keyframes
// transform-box: fill-box + transform-origin in CSS = proper pivot points

const CSS_ANIMATED_SVGS = {

// ══════════════════════════════════════════════════════════════
// 👨‍💻 PROGRAMMER — CSS arm swing, head nod, eye blink, levitation
// ══════════════════════════════════════════════════════════════
"👨‍💻": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" class="interactive-float-icon" style="width:2.4em;height:2.4em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <linearGradient id="pg_sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FAD2B0"/><stop offset="100%" stop-color="#E8A87C"/></linearGradient>
  <linearGradient id="pg_sh" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#3A7BD5"/><stop offset="100%" stop-color="#2155A3"/></linearGradient>
  <linearGradient id="pg_lb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#C8CDD2"/><stop offset="100%" stop-color="#A0A8B0"/></linearGradient>
  <linearGradient id="pg_sc" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1E2A3A"/><stop offset="100%" stop-color="#111820"/></linearGradient>
  <clipPath id="pg_cc"><rect x="58" y="96" width="84" height="68" rx="3"/></clipPath>
</defs>
<!-- Whole character levitates -->
<g class="prog-whole">
  <!-- Table -->
  <ellipse cx="100" cy="206" rx="82" ry="10" fill="#C8A97A" opacity="0.3"/>
  <!-- Laptop base -->
  <rect x="46" y="168" width="108" height="9" rx="4.5" fill="url(#pg_lb)"/>
  <rect x="80" y="170" width="40" height="5" rx="2.5" fill="#A0A8B0" opacity="0.5"/>
  <!-- Laptop lid -->
  <rect x="52" y="90" width="96" height="80" rx="6" fill="url(#pg_lb)"/>
  <rect x="56" y="94" width="88" height="72" rx="4" fill="#1A1F28"/>
  <!-- Screen glows -->
  <g class="prog-screen">
    <rect x="58" y="96" width="84" height="68" rx="3" fill="url(#pg_sc)"/>
    <!-- Sidebar -->
    <rect x="58" y="96" width="20" height="68" fill="#252D3A"/>
    <!-- Code lines (static — animation handled by CSS class) -->
    <rect x="82" y="104" width="38" height="5" rx="2" fill="#61AFEF"/>
    <rect x="86" y="113" width="50" height="5" rx="2" fill="#98C379"/>
    <rect x="86" y="122" width="44" height="5" rx="2" fill="#C678DD"/>
    <rect x="82" y="131" width="32" height="5" rx="2" fill="#E06C75"/>
    <rect x="86" y="140" width="42" height="5" rx="2" fill="#FFCC00"/>
    <rect x="86" y="149" width="28" height="5" rx="2" fill="#61AFEF"/>
    <!-- Cursor (blinking via CSS) -->
    <rect class="monitor-cursor" x="116" y="149" width="2" height="7" rx="1" fill="#ADB7C8"/>
  </g>
  <!-- Body / shirt -->
  <path d="M56 215 C56 175, 70 164, 100 162 C130 164, 144 175, 144 215 Z" fill="url(#pg_sh)"/>
  <path d="M120 162 C135 168,144 180,144 215 L126 215 C126 188,120 175,116 166 Z" fill="#1A4A8A" opacity="0.4"/>
  <!-- Collar -->
  <path d="M92 162 L100 176 L108 162" fill="none" stroke="#EEF2F7" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M92 162 L88 170 L100 176 Z" fill="#EEF2F7" opacity="0.9"/>
  <path d="M108 162 L112 170 L100 176 Z" fill="#EEF2F7" opacity="0.9"/>

  <!-- LEFT ARM — animated by CSS .prog-arm-l -->
  <g class="prog-arm-l">
    <path d="M56 180 Q36 185 38 162" stroke="#FAD2B0" stroke-width="18" stroke-linecap="round" fill="none"/>
    <ellipse cx="44" cy="166" rx="10" ry="7" fill="#FAD2B0"/>
    <path d="M38 162 Q44 158 54 162" stroke="#E8A87C" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- RIGHT ARM — animated by CSS .prog-arm-r -->
  <g class="prog-arm-r">
    <path d="M144 180 Q164 185 162 162" stroke="#FAD2B0" stroke-width="18" stroke-linecap="round" fill="none"/>
    <ellipse cx="156" cy="166" rx="10" ry="7" fill="#FAD2B0"/>
    <path d="M146 162 Q152 158 162 162" stroke="#E8A87C" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- HEAD GROUP — nodding -->
  <g class="prog-head">
    <rect x="93" y="142" width="14" height="22" rx="7" fill="#FAD2B0"/>
    <rect x="95" y="148" width="10" height="10" fill="#E8A87C" opacity="0.4"/>
    <!-- Ear left -->
    <path d="M74 118 Q70 122 72 128 Q74 134 78 130 Q76 125 77 120 Z" fill="#FAD2B0"/>
    <path d="M76 122 Q74 126 76 128" stroke="#E8A87C" stroke-width="1" fill="none"/>
    <!-- Ear right -->
    <path d="M126 118 Q130 122 128 128 Q126 134 122 130 Q124 125 123 120 Z" fill="#FAD2B0"/>
    <!-- Head -->
    <ellipse cx="100" cy="122" rx="26" ry="28" fill="url(#pg_sk)"/>
    <!-- Hair -->
    <path d="M76 114 Q76 90 100 88 Q124 90 124 114 Q118 96 100 95 Q82 96 76 114Z" fill="#4A2C10"/>
    <path d="M76 114 Q73 118 74 124" stroke="#4A2C10" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M124 114 Q127 118 126 124" stroke="#4A2C10" stroke-width="6" stroke-linecap="round" fill="none"/>
    <!-- Eyebrows -->
    <path d="M88 112 Q92 110 96 112" stroke="#3A2010" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M104 112 Q108 110 112 112" stroke="#3A2010" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Glasses frames -->
    <rect x="85" y="114" width="14" height="10" rx="4" fill="none" stroke="#2C3E50" stroke-width="2"/>
    <rect x="101" y="114" width="14" height="10" rx="4" fill="none" stroke="#2C3E50" stroke-width="2"/>
    <line x1="99" y1="118" x2="101" y2="118" stroke="#2C3E50" stroke-width="2"/>
    <line x1="85" y1="118" x2="78" y2="118" stroke="#2C3E50" stroke-width="2"/>
    <line x1="115" y1="118" x2="122" y2="118" stroke="#2C3E50" stroke-width="2"/>
    <rect x="86" y="115" width="12" height="8" rx="3" fill="#74B9FF" opacity="0.12"/>
    <rect x="102" y="115" width="12" height="8" rx="3" fill="#74B9FF" opacity="0.12"/>
    <!-- Eye whites -->
    <ellipse cx="92" cy="119" rx="4" ry="4" fill="white"/>
    <ellipse cx="108" cy="119" rx="4" ry="4" fill="white"/>
    <!-- Eye LEFT (blinking) -->
    <g class="prog-eye-l">
      <circle cx="92" cy="119" r="3" fill="#2C3E50"/>
      <circle cx="93" cy="118" r="1" fill="white"/>
    </g>
    <!-- Eye RIGHT (blinking) -->
    <g class="prog-eye-r">
      <circle cx="108" cy="119" r="3" fill="#2C3E50"/>
      <circle cx="109" cy="118" r="1" fill="white"/>
    </g>
    <!-- Nose -->
    <path d="M100 124 Q97 128 99 130 Q101 131 103 130 Q105 128 100 124" fill="none" stroke="#D4956A" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Smile -->
    <path d="M94 134 Q100 140 106 134" stroke="#C0392B" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Stars — CSS animated independently -->
  <g class="prog-star-1"><polygon points="158,70 161,62 164,70 172,73 164,76 161,84 158,76 150,73" fill="#FFD700" opacity="0.9"/></g>
  <g class="prog-star-2"><polygon points="30,92 33,85 36,92 44,95 36,98 33,106 30,98 22,95" fill="#A29BFE" opacity="0.85"/></g>
  <g class="prog-star-3"><circle cx="168" cy="118" r="5" fill="#FD79A8" opacity="0.9"/></g>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 👷 WORKER — CSS arm swing, head turn, eye blink, wrench rocking
// ══════════════════════════════════════════════════════════════
"👷": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" class="interactive-float-icon" style="width:2.4em;height:2.4em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <linearGradient id="wk_sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FAD2B0"/><stop offset="100%" stop-color="#E8A87C"/></linearGradient>
  <linearGradient id="wk_su" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#1A2A3A"/><stop offset="100%" stop-color="#0D1A26"/></linearGradient>
  <linearGradient id="wk_vs" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F39C12"/><stop offset="100%" stop-color="#D68910"/></linearGradient>
  <linearGradient id="wk_ht" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F5D060"/><stop offset="100%" stop-color="#E0B030"/></linearGradient>
</defs>
<g class="work-whole">
  <!-- Floor shadow -->
  <ellipse cx="100" cy="212" rx="72" ry="9" fill="#BDC3C7" opacity="0.25"/>
  <!-- Body suit -->
  <path d="M54 215 C54 180, 68 166, 100 164 C132 166, 146 180, 146 215 Z" fill="url(#wk_su)"/>
  <!-- Safety vest -->
  <path d="M68 215 C68 185, 78 170, 100 168 C122 170, 132 185, 132 215 Z" fill="url(#wk_vs)"/>
  <path d="M116 168 C128 174,132 188,132 215 L118 215 C118 196,114 180,108 172 Z" fill="#C07910" opacity="0.5"/>
  <!-- Reflective stripes -->
  <path d="M66 196 Q100 192 134 196" stroke="#FFFDE7" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>
  <path d="M66 207 Q100 203 134 207" stroke="#FFFDE7" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>
  <!-- Lapels -->
  <path d="M68 167 L80 178 L100 168 Z" fill="#253545" opacity="0.9"/>
  <path d="M132 167 L120 178 L100 168 Z" fill="#253545" opacity="0.9"/>
  <path d="M93 166 L100 175 L107 166" fill="none" stroke="#EEF2F7" stroke-width="2" stroke-linejoin="round"/>

  <!-- LEFT ARM — holds clipboard, swings -->
  <g class="work-arm-l">
    <path d="M60 185 Q38 192 42 168" stroke="#FAD2B0" stroke-width="16" stroke-linecap="round" fill="none"/>
    <!-- Clipboard -->
    <g transform="translate(22,155) rotate(-8)">
      <rect x="0" y="0" width="28" height="34" rx="3" fill="#E8DCC8"/>
      <rect x="0" y="0" width="28" height="5" rx="2" fill="#A0845C"/>
      <rect x="10" y="-3" width="8" height="6" rx="2" fill="#B09070"/>
      <rect x="4" y="9" width="20" height="2.5" rx="1" fill="#B0A090"/>
      <rect x="4" y="14" width="16" height="2.5" rx="1" fill="#B0A090"/>
      <rect x="4" y="19" width="18" height="2.5" rx="1" fill="#B0A090"/>
      <path d="M4 27 L7 30 L14 23" stroke="#2ECC71" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- RIGHT ARM — holds wrench, swings -->
  <g class="work-arm-r">
    <path d="M140 178 Q162 168 156 148" stroke="#FAD2B0" stroke-width="16" stroke-linecap="round" fill="none"/>
    <ellipse cx="156" cy="148" rx="9" ry="7" fill="#FAD2B0" transform="rotate(-20 156 148)"/>
    <!-- Wrench (rocks via CSS .work-wrench) -->
    <g class="work-wrench" transform="translate(152,128)">
      <rect x="-3" y="-18" width="6" height="28" rx="3" fill="#7F8C8D"/>
      <circle cx="0" cy="-18" r="7" fill="#95A5A6" stroke="#7F8C8D" stroke-width="2"/>
      <circle cx="0" cy="-18" r="4" fill="#7F8C8D"/>
    </g>
  </g>

  <!-- HEAD GROUP -->
  <g class="work-head">
    <rect x="93" y="147" width="14" height="19" rx="7" fill="#FAD2B0"/>
    <!-- Ears -->
    <path d="M75 120 Q71 124 73 130 Q75 136 79 132 Q77 127 78 122Z" fill="#FAD2B0"/>
    <path d="M125 120 Q129 124 127 130 Q125 136 121 132 Q123 127 122 122Z" fill="#FAD2B0"/>
    <!-- Head -->
    <ellipse cx="100" cy="124" rx="25" ry="27" fill="url(#wk_sk)"/>
    <!-- Hard hat brim -->
    <ellipse cx="100" cy="108" rx="34" ry="9" fill="#E0B030"/>
    <!-- Hat dome -->
    <path d="M68 108 Q68 82 100 78 Q132 82 132 108 Z" fill="url(#wk_ht)"/>
    <path d="M82 88 Q88 82 96 84 Q90 90 84 92 Z" fill="white" opacity="0.35"/>
    <rect x="72" y="104" width="56" height="6" rx="3" fill="#C8A020" opacity="0.7"/>
    <!-- Eyebrows -->
    <path d="M86 116 Q91 113 96 115" stroke="#3A2010" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M104 115 Q109 113 114 116" stroke="#3A2010" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Eye whites -->
    <ellipse cx="91" cy="120" rx="4" ry="4.5" fill="white"/>
    <ellipse cx="109" cy="120" rx="4" ry="4.5" fill="white"/>
    <!-- Eye L (blinking) -->
    <g class="work-eye-l">
      <circle cx="92" cy="121" r="3" fill="#2C3E50"/>
      <circle cx="93" cy="120" r="1" fill="white"/>
    </g>
    <!-- Eye R (blinking) -->
    <g class="work-eye-r">
      <circle cx="110" cy="121" r="3" fill="#2C3E50"/>
      <circle cx="111" cy="120" r="1" fill="white"/>
    </g>
    <!-- Nose -->
    <path d="M100 126 Q97 130 99 132 Q101 133 103 132 Q105 130 100 126" fill="none" stroke="#C9855C" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Smile -->
    <path d="M91 136 Q100 144 109 136" stroke="#A04000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Blush -->
    <ellipse cx="84" cy="130" rx="6" ry="4" fill="#F1948A" opacity="0.3"/>
    <ellipse cx="116" cy="130" rx="6" ry="4" fill="#F1948A" opacity="0.3"/>
  </g>

  <!-- Stars -->
  <g class="work-star-1"><polygon points="162,84 165,76 168,84 176,87 168,90 165,98 162,90 154,87" fill="#FFD700" opacity="0.9"/></g>
  <g class="work-star-2"><polygon points="32,86 35,79 38,86 46,89 38,92 35,99 32,92 24,89" fill="#FF7675" opacity="0.85"/></g>
  <circle cx="170" cy="115" r="5" fill="#74B9FF" class="prog-star-3" opacity="0.9"/>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 👥 TEAM — 3 people, swaying, arm gesture, bubble floating
// ══════════════════════════════════════════════════════════════
"👥": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 210" class="interactive-float-icon" style="width:2.8em;height:2.6em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <linearGradient id="tm_s1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDDBB4"/><stop offset="100%" stop-color="#F0B27A"/></linearGradient>
  <linearGradient id="tm_s2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#C68642"/><stop offset="100%" stop-color="#A0522D"/></linearGradient>
  <linearGradient id="tm_s3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E8BEAC"/><stop offset="100%" stop-color="#D4A090"/></linearGradient>
  <linearGradient id="tm_su1" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#1F3A5F"/><stop offset="100%" stop-color="#122544"/></linearGradient>
  <linearGradient id="tm_su2" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#5C3D6E"/><stop offset="100%" stop-color="#3D2650"/></linearGradient>
  <linearGradient id="tm_su3" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#2E6B5E"/><stop offset="100%" stop-color="#1A4A3E"/></linearGradient>
</defs>

<!-- Table -->
<ellipse cx="120" cy="202" rx="106" ry="11" fill="#D5C4A1" opacity="0.35"/>

<!-- LEFT PERSON — swaying -->
<g class="team-person-l">
  <path d="M18 205 C18 178, 28 168, 46 166 C64 168, 74 178, 74 205 Z" fill="url(#tm_su2)"/>
  <path d="M28 166 L38 176 L46 166 Z" fill="#7D56A0" opacity="0.8"/>
  <path d="M64 166 L54 176 L46 166 Z" fill="#7D56A0" opacity="0.8"/>
  <path d="M40 167 L46 175 L52 167" fill="none" stroke="#EEF" stroke-width="2" stroke-linejoin="round"/>
  <path d="M20 185 Q8 192 12 174" stroke="#C68642" stroke-width="14" stroke-linecap="round" fill="none"/>
  <path d="M72 185 Q82 188 80 172" stroke="#C68642" stroke-width="14" stroke-linecap="round" fill="none"/>
  <rect x="40" y="150" width="12" height="18" rx="6" fill="#C68642"/>
  <ellipse cx="46" cy="134" rx="22" ry="24" fill="url(#tm_s2)"/>
  <!-- Afro hair -->
  <path d="M24 128 Q24 104 46 100 Q68 104 68 128 Q64 108 46 107 Q28 108 24 128Z" fill="#1A0A00"/>
  <path d="M24 128 Q20 120 22 114" stroke="#1A0A00" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M68 128 Q72 120 70 114" stroke="#1A0A00" stroke-width="8" stroke-linecap="round" fill="none"/>
  <!-- Face -->
  <path d="M36 126 Q40 124 44 126" stroke="#6B3410" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M48 126 Q52 124 56 126" stroke="#6B3410" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="40" cy="130" rx="3.5" ry="4" fill="white"/>
  <ellipse cx="52" cy="130" rx="3.5" ry="4" fill="white"/>
  <g class="team-eye"><circle cx="41" cy="131" r="2.5" fill="#1A0A00"/><circle cx="42" cy="130" r="0.8" fill="white"/></g>
  <g class="team-eye"><circle cx="53" cy="131" r="2.5" fill="#1A0A00"/><circle cx="54" cy="130" r="0.8" fill="white"/></g>
  <path d="M40 140 Q46 145 52 140" stroke="#7B3210" stroke-width="2" fill="none" stroke-linecap="round"/>
</g>

<!-- RIGHT PERSON — swaying other way -->
<g class="team-person-r">
  <path d="M166 205 C166 178, 176 168, 194 166 C212 168, 222 178, 222 205 Z" fill="#4A5568"/>
  <path d="M176 166 L186 176 L194 166 Z" fill="#5A6578" opacity="0.8"/>
  <path d="M212 166 L202 176 L194 166 Z" fill="#5A6578" opacity="0.8"/>
  <path d="M188 167 L194 175 L200 167" fill="none" stroke="#EEF" stroke-width="2" stroke-linejoin="round"/>
  <path d="M192 167 L194 182 L196 167" fill="#E74C3C" opacity="0.85"/>
  <path d="M168 185 Q156 192 160 174" stroke="#FDDBB4" stroke-width="14" stroke-linecap="round" fill="none"/>
  <path d="M220 185 Q232 190 228 172" stroke="#FDDBB4" stroke-width="14" stroke-linecap="round" fill="none"/>
  <rect x="188" y="150" width="12" height="18" rx="6" fill="#FDDBB4"/>
  <ellipse cx="194" cy="134" rx="22" ry="24" fill="url(#tm_s1)"/>
  <path d="M174 126 Q174 104 194 102 Q214 104 214 126 Q210 108 194 107 Q178 108 174 126Z" fill="#4A3020"/>
  <!-- Glasses -->
  <rect x="183" y="126" width="10" height="7" rx="3" fill="none" stroke="#333" stroke-width="1.8"/>
  <rect x="196" y="126" width="10" height="7" rx="3" fill="none" stroke="#333" stroke-width="1.8"/>
  <line x1="193" y1="129" x2="196" y2="129" stroke="#333" stroke-width="1.8"/>
  <line x1="183" y1="129" x2="178" y2="129" stroke="#333" stroke-width="1.8"/>
  <line x1="206" y1="129" x2="210" y2="129" stroke="#333" stroke-width="1.8"/>
  <path d="M184 124 Q188 122 192 124" stroke="#4A3020" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M196 124 Q200 122 204 124" stroke="#4A3020" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="188" cy="130" rx="3.5" ry="4" fill="white"/>
  <ellipse cx="201" cy="130" rx="3.5" ry="4" fill="white"/>
  <g class="team-eye"><circle cx="189" cy="131" r="2.5" fill="#2C3E50"/><circle cx="190" cy="130" r="0.8" fill="white"/></g>
  <g class="team-eye"><circle cx="202" cy="131" r="2.5" fill="#2C3E50"/><circle cx="203" cy="130" r="0.8" fill="white"/></g>
  <path d="M187 138 Q194 144 201 138" stroke="#8B4513" stroke-width="2" fill="none" stroke-linecap="round"/>
</g>

<!-- CENTER PRESENTER — bouncing, arms spread -->
<g class="team-presenter">
  <!-- Body -->
  <path d="M80 210 C80 174, 95 162, 120 160 C145 162, 160 174, 160 210 Z" fill="url(#tm_su3)"/>
  <path d="M90 162 L106 176 L120 162 Z" fill="#3A8070" opacity="0.8"/>
  <path d="M150 162 L134 176 L120 162 Z" fill="#3A8070" opacity="0.8"/>
  <path d="M112 163 L120 174 L128 163" fill="none" stroke="#EEF2F7" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M138 163 C150 170,160 184,160 210 L145 210 C145 190,140 178,132 168 Z" fill="#1A4A3E" opacity="0.5"/>

  <!-- LEFT ARM — spread wide (animated) -->
  <g class="team-arm-l">
    <path d="M84 178 Q62 172 58 152" stroke="#E8BEAC" stroke-width="16" stroke-linecap="round" fill="none"/>
    <ellipse cx="58" cy="150" rx="12" ry="9" fill="#E8BEAC" transform="rotate(-20 58 150)"/>
    <path d="M50 146 Q55 142 66 146" stroke="#D4A090" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>
  <!-- RIGHT ARM — spread wide (animated) -->
  <g class="team-arm-r">
    <path d="M156 178 Q178 172 182 152" stroke="#E8BEAC" stroke-width="16" stroke-linecap="round" fill="none"/>
    <ellipse cx="182" cy="150" rx="12" ry="9" fill="#E8BEAC" transform="rotate(20 182 150)"/>
    <path d="M174 146 Q179 142 190 146" stroke="#D4A090" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Neck + head -->
  <rect x="113" y="144" width="14" height="18" rx="7" fill="#E8BEAC"/>
  <path d="M92 118 Q88 122 90 130 Q93 137 97 133 Q95 127 96 121Z" fill="#E8BEAC"/>
  <path d="M148 118 Q152 122 150 130 Q147 137 143 133 Q145 127 144 121Z" fill="#E8BEAC"/>
  <ellipse cx="120" cy="122" rx="28" ry="30" fill="url(#tm_s3)"/>
  <path d="M94 114 Q94 90 120 88 Q146 90 146 114 Q140 96 120 95 Q100 96 94 114Z" fill="#3A2A1A"/>
  <path d="M94 114 Q90 106 92 100" stroke="#3A2A1A" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M146 114 Q150 106 148 100" stroke="#3A2A1A" stroke-width="8" stroke-linecap="round" fill="none"/>
  <!-- Eyebrows -->
  <path d="M106 108 Q113 105 118 108" stroke="#2A1A0A" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M122 108 Q127 105 134 108" stroke="#2A1A0A" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Glasses presenter -->
  <rect x="105" y="110" width="14" height="10" rx="4" fill="none" stroke="#555" stroke-width="2"/>
  <rect x="121" y="110" width="14" height="10" rx="4" fill="none" stroke="#555" stroke-width="2"/>
  <line x1="119" y1="114" x2="121" y2="114" stroke="#555" stroke-width="2"/>
  <line x1="105" y1="114" x2="100" y2="114" stroke="#555" stroke-width="2"/>
  <line x1="135" y1="114" x2="140" y2="114" stroke="#555" stroke-width="2"/>
  <!-- Eye whites -->
  <ellipse cx="112" cy="115" rx="5" ry="5.5" fill="white"/>
  <ellipse cx="128" cy="115" rx="5" ry="5.5" fill="white"/>
  <g class="team-eye"><circle cx="113" cy="116" r="3.5" fill="#2C3E50"/><circle cx="114" cy="115" r="1.2" fill="white"/></g>
  <g class="team-eye"><circle cx="129" cy="116" r="3.5" fill="#2C3E50"/><circle cx="130" cy="115" r="1.2" fill="white"/></g>
  <!-- Nose -->
  <path d="M120 122 Q117 127 119 130 Q121 132 123 130 Q125 127 120 122" fill="none" stroke="#B8906A" stroke-width="2" stroke-linecap="round"/>
  <!-- Smile -->
  <path d="M109 136 Q120 145 131 136" stroke="#7B4A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Beard -->
  <path d="M105 130 Q108 148 120 152 Q132 148 135 130" fill="#5A3A1A" opacity="0.18"/>
</g>

<!-- SPEECH BUBBLE — floats up/down -->
<g class="team-bubble">
  <rect x="110" y="58" width="64" height="36" rx="10" fill="#6C5CE7"/>
  <path d="M118 94 L110 106 L132 94Z" fill="#6C5CE7"/>
  <rect x="120" y="70" width="34" height="4" rx="2" fill="white" opacity="0.7"/>
  <rect x="120" y="78" width="22" height="4" rx="2" fill="white" opacity="0.5"/>
  <circle cx="160" cy="76" r="3" fill="white" opacity="0.5"/>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 🗣️ SPEAKER — raised arm, nodding head, mouth opens, wave bubble
// ══════════════════════════════════════════════════════════════
"🗣️": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 210" class="interactive-float-icon" style="width:2.2em;height:2.4em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <linearGradient id="sp_sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FAD7C0"/><stop offset="100%" stop-color="#E8A880"/></linearGradient>
  <linearGradient id="sp_su" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#8E44AD"/><stop offset="100%" stop-color="#6C3483"/></linearGradient>
</defs>
<g class="speak-whole">
  <ellipse cx="100" cy="206" rx="70" ry="9" fill="#BDC3C7" opacity="0.25"/>
  <!-- Body -->
  <path d="M52 210 C52 174, 66 163, 100 161 C134 163, 148 174, 148 210 Z" fill="url(#sp_su)"/>
  <path d="M64 163 L78 174 L100 163 Z" fill="#A569BD" opacity="0.8"/>
  <path d="M136 163 L122 174 L100 163 Z" fill="#A569BD" opacity="0.8"/>
  <path d="M93 164 L100 173 L107 164" fill="none" stroke="#EEF" stroke-width="2.5" stroke-linejoin="round"/>

  <!-- LEFT ARM raised (animated) -->
  <g class="speak-arm-l">
    <path d="M56 178 Q36 170 34 148" stroke="#FAD7C0" stroke-width="18" stroke-linecap="round" fill="none"/>
    <ellipse cx="34" cy="146" rx="12" ry="9" fill="#FAD7C0" transform="rotate(-30 34 146)"/>
    <path d="M26 144 Q31 138 42 143" stroke="#E8A880" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>
  <!-- RIGHT ARM relaxed -->
  <g class="speak-arm-r">
    <path d="M144 178 Q160 184 158 166" stroke="#FAD7C0" stroke-width="18" stroke-linecap="round" fill="none"/>
  </g>

  <!-- HEAD (nods) -->
  <g class="speak-head">
    <rect x="93" y="144" width="14" height="19" rx="7" fill="#FAD7C0"/>
    <!-- Ears -->
    <path d="M72 116 Q68 121 70 129 Q73 135 77 131 Q75 125 76 119Z" fill="#FAD7C0"/>
    <path d="M128 116 Q132 121 130 129 Q127 135 123 131 Q125 125 124 119Z" fill="#FAD7C0"/>
    <!-- Head -->
    <ellipse cx="100" cy="120" rx="28" ry="30" fill="url(#sp_sk)"/>
    <!-- Hair — auburn, medium -->
    <path d="M74 110 Q74 86 100 84 Q126 86 126 110 Q120 92 100 91 Q80 92 74 110Z" fill="#8B2500"/>
    <path d="M74 110 Q70 125 72 138" stroke="#8B2500" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M126 110 Q130 125 128 138" stroke="#8B2500" stroke-width="10" stroke-linecap="round" fill="none"/>
    <!-- Eyebrows -->
    <path d="M86 108 Q92 105 97 108" stroke="#5C1A00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M103 108 Q108 105 114 108" stroke="#5C1A00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Eye whites -->
    <ellipse cx="91" cy="115" rx="5" ry="5.5" fill="white"/>
    <ellipse cx="109" cy="115" rx="5" ry="5.5" fill="white"/>
    <!-- Eyes (blinking) -->
    <g class="prog-eye-l"><circle cx="92" cy="116" r="3.5" fill="#2C3E50"/><circle cx="93" cy="115" r="1.2" fill="white"/></g>
    <g class="prog-eye-r"><circle cx="110" cy="116" r="3.5" fill="#2C3E50"/><circle cx="111" cy="115" r="1.2" fill="white"/></g>
    <!-- Nose -->
    <path d="M100 122 Q97 127 99 130 Q101 131 103 130 Q105 127 100 122" fill="none" stroke="#C9855C" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Mouth (opens/closes via CSS .speak-mouth) -->
    <g class="speak-mouth">
      <path d="M90 133 Q100 142 110 133" stroke="#8B4513" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M92 133 Q100 140 108 133" fill="#C0392B" opacity="0.7"/>
      <path d="M93 133 Q100 138 107 133" fill="#E88060"/>
      <rect x="94" y="133" width="12" height="4" rx="2" fill="white" opacity="0.85"/>
    </g>
  </g>

  <!-- SPEECH BUBBLE (floats) -->
  <g class="speak-bubble">
    <rect x="114" y="52" width="68" height="44" rx="12" fill="#6C5CE7"/>
    <path d="M120 96 L110 112 L136 96Z" fill="#6C5CE7"/>
    <!-- Sound wave arcs — each wave pulses via CSS -->
    <g class="speak-wave-1"><path d="M126 70 Q132 76 126 82" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/></g>
    <g class="speak-wave-2"><path d="M134 66 Q143 76 134 86" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/></g>
    <g class="speak-wave-3"><path d="M142 62 Q154 76 142 90" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/></g>
  </g>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// ⚙️ CPU/GEAR — outer ring spins via CSS .gear-spin
// ══════════════════════════════════════════════════════════════
"⚙️": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <radialGradient id="cp_in" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#74B9FF"/><stop offset="60%" stop-color="#0984E3"/><stop offset="100%" stop-color="#023E8A"/></radialGradient>
</defs>
<!-- Outer gear ring — SPINS via CSS .gear-spin -->
<g class="gear-spin">
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(30 100 100)"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(60 100 100)"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(90 100 100)"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(120 100 100)"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(150 100 100)"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(180 100 100)"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(210 100 100)"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(240 100 100)"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(270 100 100)"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(300 100 100)"/>
  <rect x="91" y="20" width="18" height="20" rx="3" fill="#636E72" transform="rotate(330 100 100)"/>
  <circle cx="100" cy="100" r="64" fill="#4A5568"/>
  <circle cx="100" cy="100" r="60" fill="#2D3436"/>
</g>
<!-- CPU static body -->
<rect x="62" y="62" width="76" height="76" rx="8" fill="#4A5568"/>
<rect x="66" y="66" width="68" height="68" rx="6" fill="#1a1a2e"/>
<!-- Inner glow — pulses via .cpu-glow -->
<rect class="cpu-glow" x="72" y="72" width="56" height="56" rx="4" fill="url(#cp_in)" opacity="0.9"/>
<!-- Circuit grid -->
<g stroke="#74B9FF" stroke-width="1.5" fill="none" opacity="0.6">
  <line x1="82" y1="82" x2="118" y2="82"/><line x1="82" y1="90" x2="118" y2="90"/>
  <line x1="82" y1="98" x2="118" y2="98"/><line x1="82" y1="106" x2="118" y2="106"/>
  <line x1="82" y1="114" x2="118" y2="114"/>
  <line x1="82" y1="82" x2="82" y2="118"/><line x1="100" y1="82" x2="100" y2="118"/>
  <line x1="118" y1="82" x2="118" y2="118"/>
</g>
<text x="100" y="104" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#74B9FF" letter-spacing="1">CPU</text>
<!-- Pins — pulsing via .pin-pulse -->
<g class="pin-pulse" stroke="#B2BEC3" stroke-width="3" stroke-linecap="round">
  <line x1="42" y1="76" x2="62" y2="76"/><line x1="42" y1="88" x2="62" y2="88"/>
  <line x1="42" y1="100" x2="62" y2="100"/><line x1="42" y1="112" x2="62" y2="112"/>
  <line x1="42" y1="124" x2="62" y2="124"/>
  <line x1="138" y1="76" x2="158" y2="76"/><line x1="138" y1="88" x2="158" y2="88"/>
  <line x1="138" y1="100" x2="158" y2="100"/><line x1="138" y1="112" x2="158" y2="112"/>
  <line x1="138" y1="124" x2="158" y2="124"/>
  <line x1="76" y1="42" x2="76" y2="62"/><line x1="88" y1="42" x2="88" y2="62"/>
  <line x1="100" y1="42" x2="100" y2="62"/><line x1="112" y1="42" x2="112" y2="62"/>
  <line x1="124" y1="42" x2="124" y2="62"/>
  <line x1="76" y1="138" x2="76" y2="158"/><line x1="88" y1="138" x2="88" y2="158"/>
  <line x1="100" y1="138" x2="100" y2="158"/><line x1="112" y1="138" x2="112" y2="158"/>
  <line x1="124" y1="138" x2="124" y2="158"/>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 🧠 BRAIN — pulses, neuron sparks, orbiting stars
// ══════════════════════════════════════════════════════════════
"🧠": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <radialGradient id="br_g" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#FFB3C6"/><stop offset="60%" stop-color="#FF6B8A"/><stop offset="100%" stop-color="#D63056"/></radialGradient>
  <radialGradient id="br_sh" cx="35%" cy="30%" r="40%"><stop offset="0%" stop-color="#fff" stop-opacity="0.6"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>
<!-- Whole brain levitates -->
<g class="brain-whole">
  <ellipse cx="100" cy="165" rx="50" ry="8" fill="#D6306050" opacity="0.35"/>
  <!-- Brain mass pulses -->
  <g class="brain-pulse">
    <ellipse cx="90" cy="108" rx="42" ry="52" fill="url(#br_g)" transform="rotate(-8 90 108)"/>
    <ellipse cx="115" cy="108" rx="40" ry="50" fill="#FF7B9C" transform="rotate(8 115 108)"/>
    <line x1="100" y1="62" x2="100" y2="158" stroke="#D63056" stroke-width="2" opacity="0.5"/>
    <!-- Folds left -->
    <path d="M68 88 Q78 82 88 90 Q80 96 70 92" fill="none" stroke="#D63056" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M64 106 Q76 98 88 108 Q78 116 64 110" fill="none" stroke="#D63056" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M68 124 Q80 116 90 126 Q80 134 68 128" fill="none" stroke="#D63056" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Folds right -->
    <path d="M118 88 Q126 82 136 88 Q132 96 120 94" fill="none" stroke="#C0305040" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M115 106 Q126 99 137 106 Q130 115 117 112" fill="none" stroke="#C0305040" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Shine -->
    <ellipse cx="86" cy="88" rx="30" ry="22" fill="url(#br_sh)"/>
    <!-- Cerebellum -->
    <ellipse cx="100" cy="155" rx="24" ry="12" fill="#FF8CAA"/>
    <path d="M80 155 Q100 148 120 155" fill="none" stroke="#D63056" stroke-width="2" opacity="0.5"/>
    <rect x="96" y="160" width="8" height="16" rx="4" fill="#FF8CAA"/>
  </g>
  <!-- Neuron sparks — fire via CSS -->
  <circle class="neuron-spark" cx="80" cy="96" r="4" fill="#FFD700"/>
  <circle class="neuron-spark-2" cx="120" cy="115" r="4" fill="#74B9FF"/>
  <!-- Stars -->
  <g class="brain-star-1"><polygon points="155,70 157,63 159,70 166,73 159,76 157,83 155,76 148,73" fill="#FFD700" opacity="0.9"/></g>
  <g class="brain-star-2"><polygon points="38,85 40,79 42,85 49,87 42,89 40,95 38,89 31,87" fill="#A29BFE" opacity="0.85"/></g>
  <circle class="brain-star-3" cx="162" cy="110" r="5" fill="#FD79A8" opacity="0.9"/>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 💡 LIGHTBULB — glow pulses, rays flash, filament flickers
// ══════════════════════════════════════════════════════════════
"💡": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <radialGradient id="bl_o" cx="50%" cy="35%" r="55%"><stop offset="0%" stop-color="#FFFDE7"/><stop offset="100%" stop-color="#FFF176"/></radialGradient>
</defs>
<!-- Ambient pulse -->
<circle class="bulb-ambient" cx="100" cy="90" r="72" fill="#FFD700" opacity="0.15"/>
<!-- Rays — each flashes independently -->
<g class="bulb-ray-1"><line x1="100" y1="28" x2="100" y2="14" stroke="#FFD700" stroke-width="4" stroke-linecap="round" opacity="0.8"/></g>
<g class="bulb-ray-2"><line x1="130" y1="36" x2="140" y2="26" stroke="#FFD700" stroke-width="4" stroke-linecap="round" opacity="0.8"/></g>
<g class="bulb-ray-3"><line x1="150" y1="60" x2="162" y2="52" stroke="#FFD700" stroke-width="4" stroke-linecap="round" opacity="0.8"/></g>
<g class="bulb-ray-4"><line x1="70" y1="36" x2="60" y2="26" stroke="#FFD700" stroke-width="4" stroke-linecap="round" opacity="0.8"/></g>
<g class="bulb-ray-5"><line x1="50" y1="60" x2="38" y2="52" stroke="#FFD700" stroke-width="4" stroke-linecap="round" opacity="0.8"/></g>
<!-- Bulb glows via CSS -->
<g class="bulb-whole">
  <path d="M100 34 C70 34 50 56 50 80 C50 102 62 116 74 126 L74 142 L126 142 L126 126 C138 116 150 102 150 80 C150 56 130 34 100 34 Z" fill="url(#bl_o)"/>
  <ellipse cx="84" cy="66" rx="12" ry="18" fill="white" opacity="0.55" transform="rotate(-20 84 66)"/>
  <!-- Filament flickers -->
  <g class="bulb-filament">
    <path d="M88 116 Q88 108 100 104 Q112 108 112 116" stroke="#FF8F00" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M92 108 L92 95 Q92 88 100 88 Q108 88 108 95 L108 108" stroke="#FF8F00" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <rect x="74" y="142" width="52" height="10" rx="5" fill="#B0BEC5"/>
  <rect x="74" y="152" width="52" height="6" rx="3" fill="#90A4AE"/>
  <rect x="74" y="158" width="52" height="6" rx="3" fill="#78909C"/>
  <rect x="78" y="164" width="44" height="6" rx="3" fill="#607D8B"/>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 🚀 ROCKET — whole rocket flies, flame flickers
// ══════════════════════════════════════════════════════════════
"🚀": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <linearGradient id="rk_b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#DFE6E9"/><stop offset="100%" stop-color="#B2BEC3"/></linearGradient>
  <linearGradient id="rk_n" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E17055"/><stop offset="100%" stop-color="#D63031"/></linearGradient>
</defs>
<!-- Stars — twinkling -->
<g class="rocket-star"><circle cx="40" cy="70" r="2" fill="#FFD700"/></g>
<g class="rocket-star" style="animation-delay:0.5s"><circle cx="160" cy="88" r="3" fill="white"/></g>
<g class="rocket-star" style="animation-delay:1s"><circle cx="50" cy="130" r="2" fill="white"/></g>
<g class="rocket-star" style="animation-delay:0.2s"><circle cx="155" cy="60" r="2" fill="#74B9FF"/></g>
<!-- Rocket flies -->
<g class="rocket-whole">
  <!-- Flame (flickers) -->
  <g class="rocket-flame">
    <path d="M86 148 Q100 185 114 148" fill="#FF6B6B" opacity="0.6"/>
    <path d="M90 148 Q100 172 110 148" fill="#FF9F43"/>
    <path d="M93 148 Q100 160 107 148" fill="white"/>
  </g>
  <!-- Fins -->
  <path d="M76 135 L68 160 L88 148 Z" fill="url(#rk_n)"/>
  <path d="M124 135 L132 160 L112 148 Z" fill="url(#rk_n)"/>
  <!-- Body -->
  <rect x="80" y="80" width="40" height="70" rx="6" fill="url(#rk_b)"/>
  <!-- Window stripe -->
  <rect x="80" y="108" width="40" height="18" rx="0" fill="#74B9FF" opacity="0.35"/>
  <!-- Nose -->
  <path d="M80 80 Q80 44 100 34 Q120 44 120 80 Z" fill="url(#rk_n)"/>
  <!-- Window -->
  <circle cx="100" cy="116" r="12" fill="#74B9FF"/>
  <circle cx="100" cy="116" r="10" fill="#0984E3"/>
  <circle cx="96" cy="112" r="3" fill="white" opacity="0.5"/>
  <!-- Shine -->
  <path d="M88 80 L88 148 Q83 144 83 80 Z" fill="white" opacity="0.2"/>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// ⚡ LIGHTNING — flashes, sparks fly off
// ══════════════════════════════════════════════════════════════
"⚡": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <linearGradient id="lt_g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDCB6E"/><stop offset="100%" stop-color="#F39C12"/></linearGradient>
</defs>
<!-- Sparks fly away -->
<g class="bolt-spark"><circle cx="60" cy="90" r="4" fill="#FFD700"/></g>
<g class="bolt-spark" style="animation-delay:0.3s"><circle cx="150" cy="115" r="3" fill="#FDCB6E"/></g>
<g class="bolt-spark" style="animation-delay:0.5s"><line x1="52" y1="70" x2="65" y2="85" stroke="#FFD700" stroke-width="2"/></g>
<g class="bolt-spark" style="animation-delay:0.2s"><line x1="148" y1="130" x2="162" y2="140" stroke="#F39C12" stroke-width="2"/></g>
<!-- Bolt flashes -->
<g class="bolt-flash">
  <polygon points="115,28 72,108 98,108 85,172 140,88 110,88" fill="url(#lt_g)"/>
  <polygon points="112,42 80,102 100,102 90,152 130,96 108,96" fill="#FFEAA7" opacity="0.6"/>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 🔍 MAGNIFYING GLASS — sweep light across lens
// ══════════════════════════════════════════════════════════════
"🔍": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <radialGradient id="gl_l" cx="40%" cy="35%" r="60%"><stop offset="0%" stop-color="#AEE6FF"/><stop offset="100%" stop-color="#74B9FF" stop-opacity="0.6"/></radialGradient>
  <clipPath id="gl_c"><circle cx="88" cy="88" r="56"/></clipPath>
  <linearGradient id="gl_h" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#636E72"/><stop offset="100%" stop-color="#2D3436"/></linearGradient>
</defs>
<g class="glass-whole">
  <!-- Handle -->
  <line x1="130" y1="130" x2="172" y2="172" stroke="url(#gl_h)" stroke-width="22" stroke-linecap="round"/>
  <line x1="130" y1="130" x2="172" y2="172" stroke="#B2BEC3" stroke-width="16" stroke-linecap="round"/>
  <!-- Lens frame -->
  <circle cx="88" cy="88" r="60" fill="none" stroke="#636E72" stroke-width="12"/>
  <circle cx="88" cy="88" r="60" fill="none" stroke="#B2BEC3" stroke-width="8"/>
  <!-- Lens glass -->
  <circle cx="88" cy="88" r="54" fill="url(#gl_l)" opacity="0.7"/>
  <!-- Search lines -->
  <g clip-path="url(#gl_c)" opacity="0.4">
    <line x1="50" y1="78" x2="126" y2="78" stroke="#2D3436" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="90" x2="126" y2="90" stroke="#2D3436" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="102" x2="126" y2="102" stroke="#2D3436" stroke-width="3" stroke-linecap="round"/>
  </g>
  <!-- Sweep reflection — CSS .glass-sweep -->
  <g clip-path="url(#gl_c)">
    <ellipse class="glass-sweep" cx="72" cy="70" rx="18" ry="32" fill="white" opacity="0.45" transform="rotate(-30 72 70)"/>
  </g>
  <circle cx="68" cy="66" r="8" fill="white" opacity="0.5"/>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 📊 BAR CHART — each bar grows independently
// ══════════════════════════════════════════════════════════════
"📊": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <linearGradient id="ch1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6C5CE7"/><stop offset="100%" stop-color="#A29BFE"/></linearGradient>
  <linearGradient id="ch2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00CEC9"/><stop offset="100%" stop-color="#81ECEC"/></linearGradient>
  <linearGradient id="ch3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDCB6E"/><stop offset="100%" stop-color="#FFEAA7"/></linearGradient>
  <linearGradient id="ch4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E17055"/><stop offset="100%" stop-color="#FAB1A0"/></linearGradient>
</defs>
<!-- Card -->
<rect x="20" y="20" width="160" height="160" rx="16" fill="white" opacity="0.9"/>
<!-- Title -->
<rect x="36" y="34" width="60" height="8" rx="4" fill="#DFE6E9"/>
<!-- Grid -->
<g stroke="#EEF2F7" stroke-width="1">
  <line x1="50" y1="148" x2="178" y2="148"/>
  <line x1="50" y1="128" x2="178" y2="128"/>
  <line x1="50" y1="108" x2="178" y2="108"/>
  <line x1="50" y1="88" x2="178" y2="88"/>
</g>
<line x1="50" y1="60" x2="50" y2="150" stroke="#B2BEC3" stroke-width="2"/>
<line x1="50" y1="150" x2="178" y2="150" stroke="#B2BEC3" stroke-width="2"/>
<!-- Bars — each with CSS class for growing -->
<g class="bar-1"><rect x="58" y="108" width="22" height="42" rx="4" fill="url(#ch1)"/></g>
<g class="bar-2"><rect x="88" y="88" width="22" height="62" rx="4" fill="url(#ch2)"/></g>
<g class="bar-3"><rect x="118" y="98" width="22" height="52" rx="4" fill="url(#ch3)"/></g>
<g class="bar-4"><rect x="148" y="118" width="22" height="32" rx="4" fill="url(#ch4)"/></g>
<!-- Legend dots -->
<circle cx="62" cy="170" r="5" fill="url(#ch1)"/>
<circle cx="92" cy="170" r="5" fill="url(#ch2)"/>
<circle cx="122" cy="170" r="5" fill="url(#ch3)"/>
<circle cx="152" cy="170" r="5" fill="url(#ch4)"/>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 📝 DOCUMENT — pencil writes via CSS .pencil-write
// ══════════════════════════════════════════════════════════════
"📝": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <linearGradient id="nt_p" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFFDF5"/><stop offset="100%" stop-color="#FFF8E1"/></linearGradient>
</defs>
<!-- Page shadow -->
<rect x="40" y="32" width="128" height="162" rx="10" fill="#DDD" opacity="0.35"/>
<!-- Page -->
<rect x="32" y="22" width="128" height="162" rx="10" fill="url(#nt_p)"/>
<path d="M128 22 L160 22 L160 54 Z" fill="#FFF8E1" opacity="0.5"/>
<path d="M128 22 L160 54 L128 54 Z" fill="#EEE8D5"/>
<!-- Lines -->
<rect x="48" y="52" width="100" height="5" rx="2.5" fill="#90A4AE"/>
<rect x="48" y="66" width="80" height="5" rx="2.5" fill="#B0BEC5"/>
<rect x="48" y="80" width="92" height="5" rx="2.5" fill="#90A4AE"/>
<rect x="48" y="94" width="60" height="5" rx="2.5" fill="#B0BEC5"/>
<rect x="48" y="108" width="88" height="5" rx="2.5" fill="#90A4AE"/>
<rect x="48" y="122" width="70" height="5" rx="2.5" fill="#B0BEC5"/>
<!-- Pencil — rocks via CSS .pencil-write -->
<g class="pencil-write" transform="translate(120,130) rotate(-40)">
  <rect x="-5" y="-50" width="10" height="50" rx="2" fill="#FDCB6E"/>
  <polygon points="-5,-50 5,-50 0,-64" fill="#F5CBA7"/>
  <circle cx="0" cy="-64" r="2" fill="#2D3436"/>
  <rect x="-5" y="0" width="10" height="6" fill="#E17055"/>
  <rect x="-5" y="6" width="10" height="4" fill="#FAB1A0"/>
</g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 📦 PACKAGE — box floats, sparkle pulses
// ══════════════════════════════════════════════════════════════
"📦": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.2em;vertical-align:-0.5em;display:inline-block;overflow:visible;">
<defs>
  <linearGradient id="bx_t" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#DEB887"/><stop offset="100%" stop-color="#C8A97A"/></linearGradient>
  <linearGradient id="bx_f" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#C8A97A"/><stop offset="100%" stop-color="#A0845C"/></linearGradient>
  <linearGradient id="bx_s" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#A0845C"/><stop offset="100%" stop-color="#7A6040"/></linearGradient>
</defs>
<!-- Shadow -->
<ellipse cx="100" cy="168" rx="52" ry="10" fill="#00000018"/>
<!-- Box floats via CSS .box-float -->
<g class="box-float">
  <polygon points="100,48 154,72 100,96 46,72" fill="url(#bx_t)"/>
  <polygon points="46,72 100,96 100,152 46,128" fill="url(#bx_f)"/>
  <polygon points="154,72 100,96 100,152 154,128" fill="url(#bx_s)"/>
  <!-- Tape lines on top -->
  <line x1="78" y1="60" x2="122" y2="84" stroke="#D4AC6A" stroke-width="3" opacity="0.7"/>
  <line x1="78" y1="84" x2="122" y2="60" stroke="#D4AC6A" stroke-width="3" opacity="0.7"/>
  <!-- Binary label -->
  <text x="56" y="112" font-family="monospace" font-size="8" fill="#7A6040" opacity="0.6" transform="skewY(18) translate(0,-12)">01001010</text>
  <text x="56" y="122" font-family="monospace" font-size="8" fill="#7A6040" opacity="0.6" transform="skewY(18) translate(0,-12)">11001010</text>
</g>
<!-- Sparkle (pulses) -->
<g class="box-sparkle"><polygon points="152,55 154,48 156,55 163,57 156,59 154,66 152,59 145,57" fill="#FF9F43" opacity="0.9"/></g>
<circle class="box-sparkle" cx="42" cy="82" r="5" fill="#A29BFE" opacity="0.85" style="animation-delay:0.8s"/>
</svg>`,

};

// Inject into utils.js
function inject() {
  const utilsPath = path.join(__dirname, 'js', 'utils.js');
  let utilsContent = fs.readFileSync(utilsPath, 'utf8');

  const startIdx = utilsContent.indexOf('const CUSTOM_SVGS = {');
  if (startIdx === -1) { console.error("CUSTOM_SVGS not found"); return; }
  let endIdx = utilsContent.indexOf('};', startIdx) + 2;

  const customSvgsStr = utilsContent.substring(startIdx, endIdx);
  let customSvgs = new Function('return ' + customSvgsStr.substring(customSvgsStr.indexOf('{')))();

  for (const [emoji, svg] of Object.entries(CSS_ANIMATED_SVGS)) {
    const minified = svg.replace(/\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
    customSvgs[emoji] = minified;
    console.log(`Replaced ${emoji}`);
  }

  const newStr = 'const CUSTOM_SVGS = ' + JSON.stringify(customSvgs, null, 2) + ';';
  utilsContent = utilsContent.substring(0, startIdx) + newStr + utilsContent.substring(endIdx);
  fs.writeFileSync(utilsPath, utilsContent);
  console.log('\nAll CSS-animated illustrations injected!');
}

inject();
