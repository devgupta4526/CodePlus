const fs = require('fs');
const path = require('path');

// ══════════════════════════════════════════════════════════════
// PROFESSIONAL CHARACTER ILLUSTRATIONS
// Style: Storyset/unDraw corporate flat vector
// Key features:
//  - Layered anatomy (torso, arms, hands separately)
//  - Detailed faces (eyebrows, nose bridge, lips)
//  - Professional clothing with lapels, collars, shadows
//  - Diverse skin tones
//  - Rich shading using darker fill shapes
//  - 200x200 viewBox for maximum detail
// ══════════════════════════════════════════════════════════════

const PERSON_ILLUSTRATIONS = {

// ══════════════════════════════════════════════════════════════
// 👨‍💻 PROGRAMMER — developer at laptop (blue shirt, glasses)
// Reference style: detailed torso, face with glasses, laptop
// ══════════════════════════════════════════════════════════════
"👨‍💻": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" class="interactive-float-icon" style="width:2.4em;height:2.4em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="prog_skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FAD2B0"/><stop offset="100%" stop-color="#E8A87C"/></linearGradient>
    <linearGradient id="prog_shirt" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#3A7BD5"/><stop offset="100%" stop-color="#2155A3"/></linearGradient>
    <linearGradient id="prog_shirt_shadow" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1A4A8A" stop-opacity="0.5"/><stop offset="100%" stop-color="#1A4A8A" stop-opacity="0"/></linearGradient>
    <linearGradient id="prog_hair" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4A2C10"/><stop offset="100%" stop-color="#2A1608"/></linearGradient>
    <linearGradient id="prog_laptop_body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#C8CDD2"/><stop offset="100%" stop-color="#A0A8B0"/></linearGradient>
    <linearGradient id="prog_screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1E2A3A"/><stop offset="100%" stop-color="#111820"/></linearGradient>
    <filter id="prog_shadow"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#00000040"/></filter>
    <filter id="glow_prog"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <clipPath id="prog_screen_clip"><rect x="52" y="90" width="96" height="58" rx="2"/></clipPath>
  </defs>

  <!-- ── TABLE SURFACE ── -->
  <ellipse cx="100" cy="200" rx="88" ry="14" fill="#C8A97A" opacity="0.35"/>
  <rect x="20" y="194" width="160" height="20" rx="4" fill="#B8956A" opacity="0.3"/>

  <!-- ── LAPTOP BASE ── -->
  <rect x="46" y="168" width="108" height="10" rx="5" fill="url(#prog_laptop_body)" filter="url(#prog_shadow)"/>
  <!-- Trackpad -->
  <rect x="80" y="170" width="40" height="5" rx="2.5" fill="#A0A8B0" opacity="0.6"/>

  <!-- ── LAPTOP LID ── -->
  <rect x="52" y="90" width="96" height="80" rx="6" fill="url(#prog_laptop_body)" filter="url(#prog_shadow)"/>
  <!-- Screen bezel -->
  <rect x="56" y="94" width="88" height="72" rx="4" fill="#1A1F28"/>
  <!-- Screen -->
  <rect x="58" y="96" width="84" height="68" rx="3" fill="url(#prog_screen)"/>

  <!-- ── CODE ON SCREEN ── -->
  <g clip-path="url(#prog_screen_clip)">
    <!-- Sidebar -->
    <rect x="58" y="96" width="22" height="68" fill="#252D3A"/>
    <!-- Code lines animate typing -->
    <rect x="84" y="104" width="0" height="5" rx="2" fill="#61AFEF"><animate attributeName="width" values="0;38;38;38" dur="5s" repeatCount="indefinite" keyTimes="0;0.2;0.9;1"/></rect>
    <rect x="88" y="113" width="0" height="5" rx="2" fill="#98C379"><animate attributeName="width" values="0;50;50;50" dur="5s" repeatCount="indefinite" keyTimes="0;0.35;0.9;1" begin="0.3s"/></rect>
    <rect x="88" y="122" width="0" height="5" rx="2" fill="#C678DD"><animate attributeName="width" values="0;44;44;44" dur="5s" repeatCount="indefinite" keyTimes="0;0.45;0.9;1" begin="0.6s"/></rect>
    <rect x="84" y="131" width="0" height="5" rx="2" fill="#E06C75"><animate attributeName="width" values="0;32;32;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.55;0.9;1" begin="0.9s"/></rect>
    <rect x="88" y="140" width="0" height="5" rx="2" fill="#FFCC00"><animate attributeName="width" values="0;42;42;42" dur="5s" repeatCount="indefinite" keyTimes="0;0.65;0.9;1" begin="1.2s"/></rect>
    <rect x="88" y="149" width="0" height="5" rx="2" fill="#61AFEF"><animate attributeName="width" values="0;28;28;28" dur="5s" repeatCount="indefinite" keyTimes="0;0.75;0.9;1" begin="1.5s"/></rect>
    <!-- Blinking cursor -->
    <rect x="88" y="149" width="2" height="7" rx="1" fill="#ADB7C8">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="x" values="88;118;88" dur="5s" repeatCount="indefinite" begin="1.5s"/>
    </rect>
    <!-- Sweep reflection -->
    <rect x="58" y="96" width="20" height="68" fill="white" opacity="0.05">
      <animateTransform attributeName="transform" type="translate" values="-80,0;180,0;-80,0" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.6;1"/>
    </rect>
  </g>

  <!-- ── BODY ── -->
  <!-- Shirt main -->
  <path d="M56 210 C56 175, 70 164, 100 162 C130 164, 144 175, 144 210 Z" fill="url(#prog_shirt)"/>
  <!-- Shadow on body right side -->
  <path d="M120 162 C135 168, 144 180, 144 210 L126 210 C126 188, 120 175, 116 166 Z" fill="#1A4A8A" opacity="0.4"/>
  <!-- Collar / shirt opening -->
  <path d="M92 162 L100 176 L108 162" fill="none" stroke="#EEF2F7" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  <!-- Collar flaps -->
  <path d="M92 162 L88 170 L100 176 Z" fill="#EEF2F7" opacity="0.9"/>
  <path d="M108 162 L112 170 L100 176 Z" fill="#EEF2F7" opacity="0.9"/>

  <!-- ── LEFT ARM ── -->
  <path d="M56 180 Q36 185 38 162" stroke="#FAD2B0" stroke-width="18" stroke-linecap="round" fill="none"/>
  <!-- Left hand on laptop -->
  <ellipse cx="50" cy="172" rx="10" ry="7" fill="#FAD2B0"/>
  <!-- Fingers hint -->
  <path d="M44 168 Q48 165 56 168" stroke="#E8A87C" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- ── RIGHT ARM ── -->
  <path d="M144 180 Q164 185 162 162" stroke="#FAD2B0" stroke-width="18" stroke-linecap="round" fill="none"/>
  <!-- Right hand on laptop -->
  <ellipse cx="150" cy="172" rx="10" ry="7" fill="#FAD2B0"/>
  <path d="M144 168 Q148 165 156 168" stroke="#E8A87C" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- ── NECK ── -->
  <rect x="93" y="142" width="14" height="22" rx="7" fill="#FAD2B0"/>
  <rect x="95" y="148" width="10" height="10" fill="#E8A87C" opacity="0.5"/>

  <!-- ── HEAD ── -->
  <ellipse cx="100" cy="122" rx="26" ry="28" fill="url(#prog_skin)" filter="url(#prog_shadow)"/>
  <!-- Ear left -->
  <path d="M74 118 Q70 122 72 128 Q74 134 78 130 Q76 125 77 120 Z" fill="#FAD2B0"/>
  <path d="M76 122 Q74 126 76 128" stroke="#E8A87C" stroke-width="1" fill="none"/>
  <!-- Ear right -->
  <path d="M126 118 Q130 122 128 128 Q126 134 122 130 Q124 125 123 120 Z" fill="#FAD2B0"/>
  <path d="M124 122 Q126 126 124 128" stroke="#E8A87C" stroke-width="1" fill="none"/>

  <!-- ── HAIR ── -->
  <path d="M76 114 Q76 90 100 88 Q124 90 124 114 Q118 96 100 95 Q82 96 76 114Z" fill="url(#prog_hair)"/>
  <!-- Sideburns -->
  <path d="M76 114 Q73 118 74 124" stroke="#4A2C10" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M124 114 Q127 118 126 124" stroke="#4A2C10" stroke-width="6" stroke-linecap="round" fill="none"/>

  <!-- ── FACE ── -->
  <!-- Eyebrows -->
  <path d="M88 112 Q92 110 96 112" stroke="#3A2010" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M104 112 Q108 110 112 112" stroke="#3A2010" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Glasses frame left -->
  <rect x="85" y="114" width="14" height="10" rx="4" fill="none" stroke="#2C3E50" stroke-width="2"/>
  <!-- Glasses frame right -->
  <rect x="101" y="114" width="14" height="10" rx="4" fill="none" stroke="#2C3E50" stroke-width="2"/>
  <!-- Bridge -->
  <line x1="99" y1="118" x2="101" y2="118" stroke="#2C3E50" stroke-width="2"/>
  <!-- Temples -->
  <line x1="85" y1="118" x2="78" y2="118" stroke="#2C3E50" stroke-width="2"/>
  <line x1="115" y1="118" x2="122" y2="118" stroke="#2C3E50" stroke-width="2"/>
  <!-- Glass tint -->
  <rect x="86" y="115" width="12" height="8" rx="3" fill="#74B9FF" opacity="0.15"/>
  <rect x="102" y="115" width="12" height="8" rx="3" fill="#74B9FF" opacity="0.15"/>
  <!-- Eyes -->
  <circle cx="92" cy="119" r="2.5" fill="#2C3E50"/>
  <circle cx="108" cy="119" r="2.5" fill="#2C3E50"/>
  <!-- Eye shine -->
  <circle cx="93.2" cy="118" r="0.8" fill="white"/>
  <circle cx="109.2" cy="118" r="0.8" fill="white"/>
  <!-- Nose -->
  <path d="M100 124 Q97 128 99 130 Q101 131 103 130 Q105 128 100 124" fill="none" stroke="#D4956A" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Mouth / smile -->
  <path d="M94 134 Q100 140 106 134" stroke="#C0392B" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Lips hint -->
  <path d="M96 134 Q100 137 104 134" stroke="#E88080" stroke-width="1" fill="none"/>

  <!-- ── FLOATING SPARKLES ── -->
  <g>
    <path d="M162 88 L164 82 L166 88 L172 90 L166 92 L164 98 L162 92 L156 90Z" fill="#FFD700">
      <animateTransform attributeName="transform" type="rotate" from="0 164 90" to="360 164 90" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite"/>
    </path>
    <path d="M30 100 L32 95 L34 100 L40 102 L34 104 L32 110 L30 104 L24 102Z" fill="#A29BFE">
      <animateTransform attributeName="transform" type="rotate" from="0 32 102" to="-360 32 102" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" begin="1s"/>
    </path>
    <circle cx="170" cy="118" r="4" fill="#FD79A8">
      <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 👷 COMPILER/WORKER — construction worker, orange vest, hard hat
// ══════════════════════════════════════════════════════════════
"👷": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" class="interactive-float-icon" style="width:2.4em;height:2.4em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="w_skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FAD2B0"/><stop offset="100%" stop-color="#E8A87C"/></linearGradient>
    <linearGradient id="w_suit" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#1A2A3A"/><stop offset="100%" stop-color="#0D1A26"/></linearGradient>
    <linearGradient id="w_vest" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F39C12"/><stop offset="100%" stop-color="#D68910"/></linearGradient>
    <linearGradient id="w_hat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F5D060"/><stop offset="100%" stop-color="#E0B030"/></linearGradient>
    <filter id="w_shadow"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#00000040"/></filter>
  </defs>

  <!-- Floor -->
  <ellipse cx="100" cy="210" rx="75" ry="10" fill="#BDC3C7" opacity="0.3"/>

  <!-- ── BODY ── -->
  <!-- Dark jacket underneath -->
  <path d="M54 215 C54 180, 68 166, 100 164 C132 166, 146 180, 146 215 Z" fill="url(#w_suit)"/>
  <!-- Orange safety vest (over jacket) -->
  <path d="M68 215 C68 185, 78 170, 100 168 C122 170, 132 185, 132 215 Z" fill="url(#w_vest)"/>
  <!-- Vest shadow / depth -->
  <path d="M116 168 C128 174, 132 188, 132 215 L118 215 C118 196, 114 180, 108 172 Z" fill="#C07910" opacity="0.5"/>
  <!-- Reflective safety stripes -->
  <path d="M66 196 Q100 192 134 196" stroke="#FFFDE7" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>
  <path d="M66 207 Q100 203 134 207" stroke="#FFFDE7" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>
  <!-- Jacket lapels -->
  <path d="M68 167 L80 178 L100 168 Z" fill="#253545" opacity="0.9"/>
  <path d="M132 167 L120 178 L100 168 Z" fill="#253545" opacity="0.9"/>
  <!-- Shirt collar visible -->
  <path d="M93 166 L100 175 L107 166" fill="none" stroke="#EEF2F7" stroke-width="2" stroke-linejoin="round"/>

  <!-- ── LEFT ARM (holding clipboard) ── -->
  <path d="M60 185 Q38 192 42 168" stroke="#FAD2B0" stroke-width="16" stroke-linecap="round" fill="none"/>
  <!-- Clipboard -->
  <g transform="translate(26, 154) rotate(-8)">
    <rect x="0" y="0" width="28" height="34" rx="3" fill="#E8DCC8"/>
    <rect x="0" y="0" width="28" height="5" rx="2" fill="#A0845C"/>
    <rect x="10" y="-3" width="8" height="6" rx="2" fill="#B09070"/>
    <!-- Lines on clipboard -->
    <rect x="4" y="9" width="20" height="2.5" rx="1" fill="#B0A090"/>
    <rect x="4" y="14" width="16" height="2.5" rx="1" fill="#B0A090"/>
    <rect x="4" y="19" width="18" height="2.5" rx="1" fill="#B0A090"/>
    <rect x="4" y="24" width="12" height="2.5" rx="1" fill="#B0A090"/>
    <!-- Check mark -->
    <path d="M4 28 L7 31 L14 24" stroke="#2ECC71" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- ── RIGHT ARM (pointing/waving) ── -->
  <path d="M140 178 Q162 168 156 148" stroke="#FAD2B0" stroke-width="16" stroke-linecap="round" fill="none"/>
  <!-- Right hand -->
  <ellipse cx="156" cy="148" rx="9" ry="7" fill="#FAD2B0" transform="rotate(-20 156 148)"/>
  <path d="M150 145 Q154 140 162 144" stroke="#E8A87C" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- ── NECK ── -->
  <rect x="93" y="145" width="14" height="22" rx="7" fill="#FAD2B0"/>

  <!-- ── HEAD ── -->
  <ellipse cx="100" cy="124" rx="25" ry="27" fill="url(#w_skin)" filter="url(#w_shadow)"/>
  <!-- Ear left -->
  <path d="M75 120 Q71 124 73 130 Q75 136 79 132 Q77 127 78 122Z" fill="#FAD2B0"/>
  <!-- Ear right -->
  <path d="M125 120 Q129 124 127 130 Q125 136 121 132 Q123 127 122 122Z" fill="#FAD2B0"/>

  <!-- ── HARD HAT ── -->
  <!-- Brim -->
  <ellipse cx="100" cy="108" rx="34" ry="9" fill="#E0B030"/>
  <!-- Main dome -->
  <path d="M68 108 Q68 82 100 78 Q132 82 132 108 Z" fill="url(#w_hat)"/>
  <!-- Shine on hat -->
  <path d="M82 88 Q88 82 96 84 Q90 90 84 92 Z" fill="white" opacity="0.35"/>
  <!-- Hat band -->
  <rect x="72" y="104" width="56" height="6" rx="3" fill="#C8A020" opacity="0.7"/>

  <!-- ── FACE ── -->
  <!-- Eyebrows (thicker, expressive) -->
  <path d="M86 116 Q91 113 96 115" stroke="#3A2010" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M104 115 Q109 113 114 116" stroke="#3A2010" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Eyes -->
  <ellipse cx="91" cy="120" rx="4" ry="4.5" fill="white"/>
  <ellipse cx="109" cy="120" rx="4" ry="4.5" fill="white"/>
  <circle cx="92" cy="121" r="3" fill="#2C3E50"/>
  <circle cx="110" cy="121" r="3" fill="#2C3E50"/>
  <circle cx="93" cy="120" r="1" fill="white"/>
  <circle cx="111" cy="120" r="1" fill="white"/>
  <!-- Nose -->
  <path d="M100 126 Q97 130 99 132 Q101 133 103 132 Q105 130 100 126" fill="none" stroke="#C9855C" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Big confident smile -->
  <path d="M91 136 Q100 144 109 136" stroke="#A04000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M93 136 Q100 142 107 136" stroke="#FAB1A0" stroke-width="1.5" fill="#FFCCBC" opacity="0.4"/>
  <!-- Cheek blush -->
  <ellipse cx="84" cy="130" rx="6" ry="4" fill="#F1948A" opacity="0.3"/>
  <ellipse cx="116" cy="130" rx="6" ry="4" fill="#F1948A" opacity="0.3"/>

  <!-- ── STARS ── -->
  <path d="M160 86 L162 80 L164 86 L170 88 L164 90 L162 96 L160 90 L154 88Z" fill="#FFD700">
    <animateTransform attributeName="transform" type="rotate" from="0 162 88" to="360 162 88" dur="5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite"/>
  </path>
  <path d="M32 88 L34 82 L36 88 L42 90 L36 92 L34 98 L32 92 L26 90Z" fill="#FF7675">
    <animateTransform attributeName="transform" type="rotate" from="0 34 90" to="-360 34 90" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" begin="1s"/>
  </path>
  <circle cx="168" cy="112" r="4" fill="#74B9FF">
    <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.9;0.2;0.9" dur="3s" repeatCount="indefinite" begin="0.5s"/>
  </circle>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 👥 TEAM — 3 people in a meeting (closest to reference image)
// ══════════════════════════════════════════════════════════════
"👥": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 200" class="interactive-float-icon" style="width:2.8em;height:2.4em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="t_skin1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDDBB4"/><stop offset="100%" stop-color="#F0B27A"/></linearGradient>
    <linearGradient id="t_skin2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#C68642"/><stop offset="100%" stop-color="#A0522D"/></linearGradient>
    <linearGradient id="t_skin3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E8BEAC"/><stop offset="100%" stop-color="#D4A090"/></linearGradient>
    <linearGradient id="t_suit1" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#1F3A5F"/><stop offset="100%" stop-color="#122544"/></linearGradient>
    <linearGradient id="t_suit2" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#5C3D6E"/><stop offset="100%" stop-color="#3D2650"/></linearGradient>
    <linearGradient id="t_suit3" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#2E6B5E"/><stop offset="100%" stop-color="#1A4A3E"/></linearGradient>
    <filter id="t_shadow"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#00000035"/></filter>
    <filter id="t_shadow_sm"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#00000025"/></filter>
  </defs>

  <!-- Table surface -->
  <ellipse cx="120" cy="196" rx="108" ry="12" fill="#D5C4A1" opacity="0.45"/>
  <rect x="20" y="190" width="200" height="16" rx="6" fill="#C8B48A" opacity="0.35"/>

  <!-- ════ LEFT PERSON — woman, dark skin, purple jacket ════ -->
  <g opacity="0.92">
    <!-- Body -->
    <path d="M18 200 C18 178, 28 168, 46 166 C64 168, 74 178, 74 200 Z" fill="url(#t_suit2)"/>
    <!-- Lapels -->
    <path d="M28 166 L38 176 L46 166 Z" fill="#7D56A0" opacity="0.8"/>
    <path d="M64 166 L54 176 L46 166 Z" fill="#7D56A0" opacity="0.8"/>
    <!-- Shirt under -->
    <path d="M40 167 L46 175 L52 167" fill="none" stroke="#EEF" stroke-width="2" stroke-linejoin="round"/>
    <!-- Arms -->
    <path d="M20 185 Q8 192 12 174" stroke="#C68642" stroke-width="14" stroke-linecap="round" fill="none"/>
    <path d="M72 185 Q82 188 80 172" stroke="#C68642" stroke-width="14" stroke-linecap="round" fill="none"/>
    <!-- Neck -->
    <rect x="40" y="150" width="12" height="18" rx="6" fill="#C68642"/>
    <!-- Head -->
    <ellipse cx="46" cy="134" rx="22" ry="24" fill="url(#t_skin2)" filter="url(#t_shadow_sm)"/>
    <!-- Hair (curly/afro style) -->
    <path d="M24 128 Q24 104 46 100 Q68 104 68 128 Q64 108 46 107 Q28 108 24 128Z" fill="#1A0A00"/>
    <path d="M24 128 Q20 120 22 114" stroke="#1A0A00" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M68 128 Q72 120 70 114" stroke="#1A0A00" stroke-width="8" stroke-linecap="round" fill="none"/>
    <!-- Face -->
    <path d="M36 126 Q40 124 44 126" stroke="#6B3410" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M48 126 Q52 124 56 126" stroke="#6B3410" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="130" r="3" fill="#1A0A00"/>
    <circle cx="52" cy="130" r="3" fill="#1A0A00"/>
    <circle cx="41" cy="129" r="1" fill="white"/>
    <circle cx="53" cy="129" r="1" fill="white"/>
    <path d="M40 140 Q46 145 52 140" stroke="#7B3210" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- ════ RIGHT PERSON — man, light skin, grey suit, glasses ════ -->
  <g opacity="0.92">
    <!-- Body -->
    <path d="M166 200 C166 178, 176 168, 194 166 C212 168, 222 178, 222 200 Z" fill="#4A5568"/>
    <!-- Lapels -->
    <path d="M176 166 L186 176 L194 166 Z" fill="#5A6578" opacity="0.8"/>
    <path d="M212 166 L202 176 L194 166 Z" fill="#5A6578" opacity="0.8"/>
    <!-- Shirt/tie -->
    <path d="M188 167 L194 175 L200 167" fill="none" stroke="#EEF" stroke-width="2" stroke-linejoin="round"/>
    <path d="M192 167 L194 182 L196 167" fill="#E74C3C" stroke="none"/>
    <!-- Arms -->
    <path d="M168 185 Q156 192 160 174" stroke="#FDDBB4" stroke-width="14" stroke-linecap="round" fill="none"/>
    <path d="M220 185 Q232 190 228 172" stroke="#FDDBB4" stroke-width="14" stroke-linecap="round" fill="none"/>
    <!-- Neck -->
    <rect x="188" y="150" width="12" height="18" rx="6" fill="#FDDBB4"/>
    <!-- Head -->
    <ellipse cx="194" cy="134" rx="22" ry="24" fill="url(#t_skin1)" filter="url(#t_shadow_sm)"/>
    <!-- Hair short/side-parted -->
    <path d="M174 126 Q174 104 194 102 Q214 104 214 126 Q210 108 194 107 Q178 108 174 126Z" fill="#4A3020"/>
    <!-- Glasses -->
    <rect x="183" y="126" width="10" height="7" rx="3" fill="none" stroke="#333" stroke-width="1.8"/>
    <rect x="196" y="126" width="10" height="7" rx="3" fill="none" stroke="#333" stroke-width="1.8"/>
    <line x1="193" y1="129" x2="196" y2="129" stroke="#333" stroke-width="1.8"/>
    <line x1="183" y1="129" x2="178" y2="129" stroke="#333" stroke-width="1.8"/>
    <line x1="206" y1="129" x2="210" y2="129" stroke="#333" stroke-width="1.8"/>
    <rect x="184" y="127" width="8" height="5" rx="2" fill="#74B9FF" opacity="0.1"/>
    <rect x="197" y="127" width="8" height="5" rx="2" fill="#74B9FF" opacity="0.1"/>
    <!-- Eyes -->
    <circle cx="188" cy="130" r="2.5" fill="#2C3E50"/>
    <circle cx="201" cy="130" r="2.5" fill="#2C3E50"/>
    <!-- Eyebrows -->
    <path d="M184 124 Q188 122 192 124" stroke="#4A3020" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M196 124 Q200 122 204 124" stroke="#4A3020" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Smile -->
    <path d="M187 138 Q194 144 201 138" stroke="#8B4513" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Beard hint -->
    <path d="M182 138 Q186 148 194 150 Q202 148 206 138" fill="#C0A080" opacity="0.2"/>
  </g>

  <!-- ════ CENTER PERSON — standing, presenting, beige skin ════ -->
  <g filter="url(#t_shadow)">
    <!-- Body -->
    <path d="M80 205 C80 174, 95 162, 120 160 C145 162, 160 174, 160 205 Z" fill="url(#t_suit3)"/>
    <!-- Lapels (well-defined) -->
    <path d="M90 162 L106 176 L120 162 Z" fill="#3A8070" opacity="0.8"/>
    <path d="M150 162 L134 176 L120 162 Z" fill="#3A8070" opacity="0.8"/>
    <!-- White shirt visible -->
    <path d="M112 163 L120 174 L128 163" fill="none" stroke="#EEF2F7" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M118 163 L120 176 L122 163" fill="#2C3E50" opacity="0.5"/>
    <!-- Shadow depth on body right -->
    <path d="M138 163 C150 170, 160 184, 160 205 L145 205 C145 190, 140 178, 132 168 Z" fill="#1A4A3E" opacity="0.5"/>
    <!-- Arms wide (presenting gesture) -->
    <path d="M84 178 Q62 172 58 152" stroke="#E8BEAC" stroke-width="16" stroke-linecap="round" fill="none"/>
    <path d="M156 178 Q178 172 182 152" stroke="#E8BEAC" stroke-width="16" stroke-linecap="round" fill="none"/>
    <!-- Hands open (presenting) -->
    <ellipse cx="58" cy="150" rx="12" ry="9" fill="#E8BEAC" transform="rotate(-20 58 150)"/>
    <ellipse cx="182" cy="150" rx="12" ry="9" fill="#E8BEAC" transform="rotate(20 182 150)"/>
    <!-- Hand detail -->
    <path d="M50 146 Q55 142 66 146" stroke="#D4A090" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M174 146 Q179 142 190 146" stroke="#D4A090" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Neck -->
    <rect x="113" y="144" width="14" height="18" rx="7" fill="#E8BEAC"/>
    <!-- Head -->
    <ellipse cx="120" cy="122" rx="28" ry="30" fill="url(#t_skin3)" filter="url(#t_shadow)"/>
    <!-- Ears -->
    <path d="M92 118 Q88 122 90 130 Q93 137 97 133 Q95 127 96 121Z" fill="#E8BEAC"/>
    <path d="M148 118 Q152 122 150 130 Q147 137 143 133 Q145 127 144 121Z" fill="#E8BEAC"/>
    <!-- Hair (bald / buzzed top, darker) -->
    <path d="M94 114 Q94 90 120 88 Q146 90 146 114 Q140 96 120 95 Q100 96 94 114Z" fill="#3A2A1A"/>
    <path d="M94 114 Q90 106 92 100" stroke="#3A2A1A" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M146 114 Q150 106 148 100" stroke="#3A2A1A" stroke-width="8" stroke-linecap="round" fill="none"/>

    <!-- ── DETAILED FACE ── -->
    <!-- Eyebrows (strong) -->
    <path d="M106 108 Q113 105 118 108" stroke="#2A1A0A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M122 108 Q127 105 134 108" stroke="#2A1A0A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Eyes with whites -->
    <ellipse cx="112" cy="115" rx="5" ry="5.5" fill="white"/>
    <ellipse cx="128" cy="115" rx="5" ry="5.5" fill="white"/>
    <circle cx="113" cy="116" r="3.5" fill="#2C3E50"/>
    <circle cx="129" cy="116" r="3.5" fill="#2C3E50"/>
    <circle cx="114" cy="115" r="1.2" fill="white"/>
    <circle cx="130" cy="115" r="1.2" fill="white"/>
    <!-- Glasses (smart presenter) -->
    <rect x="105" y="110" width="14" height="10" rx="4" fill="none" stroke="#555" stroke-width="2"/>
    <rect x="121" y="110" width="14" height="10" rx="4" fill="none" stroke="#555" stroke-width="2"/>
    <line x1="119" y1="114" x2="121" y2="114" stroke="#555" stroke-width="2"/>
    <line x1="105" y1="114" x2="100" y2="114" stroke="#555" stroke-width="2"/>
    <line x1="135" y1="114" x2="140" y2="114" stroke="#555" stroke-width="2"/>
    <!-- Nose bridge + tip -->
    <path d="M120 122 Q117 127 119 130 Q121 132 123 130 Q125 127 120 122" fill="none" stroke="#B8906A" stroke-width="2" stroke-linecap="round"/>
    <!-- Mouth with beard surroundings -->
    <path d="M109 136 Q120 145 131 136" stroke="#7B4A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Beard/stubble -->
    <path d="M105 130 Q108 148 120 152 Q132 148 135 130" fill="#5A3A1A" opacity="0.18"/>
    <!-- Big confident smile -->
    <path d="M112 136 Q120 143 128 136" stroke="#E88060" stroke-width="1.5" fill="#FFCCBC" opacity="0.4"/>
  </g>

  <!-- Floating speech bubble -->
  <g>
    <rect x="108" y="60" width="64" height="36" rx="10" fill="#6C5CE7" filter="url(#t_shadow)"/>
    <path d="M118 96 L110 108 L130 96Z" fill="#6C5CE7"/>
    <rect x="118" y="72" width="34" height="4" rx="2" fill="white" opacity="0.7"/>
    <rect x="118" y="80" width="22" height="4" rx="2" fill="white" opacity="0.5"/>
    <circle cx="158" cy="78" r="3" fill="white" opacity="0.5"/>
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
  </g>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 👤 SINGLE PERSON — standing professional
// ══════════════════════════════════════════════════════════════
"👤": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" class="interactive-float-icon" style="width:2em;height:2.4em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="u_skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDDBB4"/><stop offset="100%" stop-color="#F0B27A"/></linearGradient>
    <linearGradient id="u_suit" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#2C3E50"/><stop offset="100%" stop-color="#1A252F"/></linearGradient>
    <filter id="u_shadow"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#00000035"/></filter>
  </defs>
  <ellipse cx="80" cy="196" rx="60" ry="10" fill="#BDC3C7" opacity="0.3"/>
  <!-- Body -->
  <path d="M30 200 C30 174, 44 163, 80 161 C116 163, 130 174, 130 200 Z" fill="url(#u_suit)"/>
  <!-- Lapels -->
  <path d="M42 163 L56 174 L80 163 Z" fill="#3D5266" opacity="0.8"/>
  <path d="M118 163 L104 174 L80 163 Z" fill="#3D5266" opacity="0.8"/>
  <path d="M73 164 L80 173 L87 164" fill="none" stroke="#EEF" stroke-width="2" stroke-linejoin="round"/>
  <!-- Tie -->
  <path d="M78 164 L80 184 L82 164" fill="#E74C3C" opacity="0.85"/>
  <!-- Arms -->
  <path d="M34 180 Q18 188 22 168" stroke="#FDDBB4" stroke-width="16" stroke-linecap="round" fill="none"/>
  <path d="M126 180 Q142 188 138 168" stroke="#FDDBB4" stroke-width="16" stroke-linecap="round" fill="none"/>
  <!-- Neck -->
  <rect x="73" y="144" width="14" height="19" rx="7" fill="#FDDBB4"/>
  <!-- Head -->
  <ellipse cx="80" cy="122" rx="28" ry="30" fill="url(#u_skin)" filter="url(#u_shadow)"/>
  <!-- Hair -->
  <path d="M54 116 Q54 92 80 90 Q106 92 106 116 Q100 98 80 97 Q60 98 54 116Z" fill="#4A3020"/>
  <!-- Eyebrows -->
  <path d="M68 110 Q73 108 78 110" stroke="#3A2010" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M82 110 Q87 108 92 110" stroke="#3A2010" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Eyes -->
  <ellipse cx="73" cy="116" rx="4.5" ry="5" fill="white"/>
  <ellipse cx="87" cy="116" rx="4.5" ry="5" fill="white"/>
  <circle cx="74" cy="117" r="3" fill="#2C3E50"/>
  <circle cx="88" cy="117" r="3" fill="#2C3E50"/>
  <circle cx="75" cy="116" r="1" fill="white"/>
  <circle cx="89" cy="116" r="1" fill="white"/>
  <!-- Nose -->
  <path d="M80 122 Q77 127 79 129 Q81 130 83 129 Q85 127 80 122" fill="none" stroke="#D4956A" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Smile -->
  <path d="M72 134 Q80 141 88 134" stroke="#A04000" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Ears -->
  <path d="M52 118 Q48 123 50 130 Q53 136 57 132 Q55 126 56 120Z" fill="#FDDBB4"/>
  <path d="M108 118 Q112 123 110 130 Q107 136 103 132 Q105 126 104 120Z" fill="#FDDBB4"/>
  <!-- Subtle animate -->
  <animateTransform attributeName="transform" type="translate" values="0,0; 0,-4; 0,0" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
</svg>`,

// ══════════════════════════════════════════════════════════════
// 🗣️ SPEAKING PERSON — person presenting with speech bubble
// ══════════════════════════════════════════════════════════════
"🗣️": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="interactive-float-icon" style="width:2.2em;height:2.4em;vertical-align:-0.5em;display:inline-block;">
  <defs>
    <linearGradient id="s_skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FAD7C0"/><stop offset="100%" stop-color="#E8A880"/></linearGradient>
    <linearGradient id="s_suit" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0%" stop-color="#8E44AD"/><stop offset="100%" stop-color="#6C3483"/></linearGradient>
    <filter id="s_shadow"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#00000035"/></filter>
  </defs>
  <!-- Floor -->
  <ellipse cx="100" cy="198" rx="72" ry="10" fill="#BDC3C7" opacity="0.3"/>
  <!-- Body -->
  <path d="M52 200 C52 174, 66 163, 100 161 C134 163, 148 174, 148 200 Z" fill="url(#s_suit)"/>
  <!-- Lapels -->
  <path d="M64 163 L78 174 L100 163 Z" fill="#A569BD" opacity="0.8"/>
  <path d="M136 163 L122 174 L100 163 Z" fill="#A569BD" opacity="0.8"/>
  <path d="M93 164 L100 173 L107 164" fill="none" stroke="#EEF" stroke-width="2.5" stroke-linejoin="round"/>
  <!-- Left arm (raised to present) -->
  <path d="M56 178 Q36 170 34 148" stroke="#FAD7C0" stroke-width="18" stroke-linecap="round" fill="none"/>
  <!-- Left hand (open, presenting) -->
  <ellipse cx="34" cy="146" rx="12" ry="9" fill="#FAD7C0" transform="rotate(-30 34 146)"/>
  <path d="M26 144 Q31 138 42 143" stroke="#E8A880" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Right arm relaxed -->
  <path d="M144 178 Q160 184 158 166" stroke="#FAD7C0" stroke-width="18" stroke-linecap="round" fill="none"/>
  <!-- Neck -->
  <rect x="93" y="144" width="14" height="19" rx="7" fill="#FAD7C0"/>
  <!-- Head -->
  <ellipse cx="100" cy="120" rx="28" ry="30" fill="url(#s_skin)" filter="url(#s_shadow)"/>
  <!-- Ears -->
  <path d="M72 116 Q68 121 70 129 Q73 135 77 131 Q75 125 76 119Z" fill="#FAD7C0"/>
  <path d="M128 116 Q132 121 130 129 Q127 135 123 131 Q125 125 124 119Z" fill="#FAD7C0"/>
  <!-- Hair (woman, red-brown, medium length) -->
  <path d="M74 110 Q74 86 100 84 Q126 86 126 110 Q120 92 100 91 Q80 92 74 110Z" fill="#8B2500"/>
  <path d="M74 110 Q70 125 72 138" stroke="#8B2500" stroke-width="10" stroke-linecap="round" fill="none"/>
  <path d="M126 110 Q130 125 128 138" stroke="#8B2500" stroke-width="10" stroke-linecap="round" fill="none"/>
  <!-- Eyebrows (arched) -->
  <path d="M86 108 Q92 105 97 108" stroke="#5C1A00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M103 108 Q108 105 114 108" stroke="#5C1A00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Eyes (looking forward) -->
  <ellipse cx="91" cy="115" rx="5" ry="5.5" fill="white"/>
  <ellipse cx="109" cy="115" rx="5" ry="5.5" fill="white"/>
  <circle cx="92" cy="116" r="3.5" fill="#2C3E50"/>
  <circle cx="110" cy="116" r="3.5" fill="#2C3E50"/>
  <circle cx="93" cy="115" r="1.2" fill="white"/>
  <circle cx="111" cy="115" r="1.2" fill="white"/>
  <!-- Nose -->
  <path d="M100 122 Q97 127 99 130 Q101 131 103 130 Q105 127 100 122" fill="none" stroke="#C9855C" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Open mouth (speaking) -->
  <path d="M90 133 Q100 142 110 133" stroke="#8B4513" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M92 133 Q100 140 108 133" fill="#C0392B" opacity="0.7"/>
  <path d="M93 133 Q100 138 107 133" fill="#E88060"/>
  <!-- Teeth -->
  <rect x="94" y="133" width="12" height="4" rx="2" fill="white" opacity="0.85"/>

  <!-- ── SPEECH BUBBLE ── -->
  <g>
    <rect x="114" y="54" width="68" height="44" rx="12" fill="#6C5CE7" filter="url(#s_shadow)"/>
    <path d="M120 98 L110 114 L136 98Z" fill="#6C5CE7"/>
    <!-- Sound waves in bubble -->
    <path d="M126 70 Q132 76 126 82" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
    <path d="M134 66 Q143 76 134 86" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
    <path d="M142 62 Q154 76 142 90" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
    <!-- Animate bubble -->
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-6; 0,0" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1" keyTimes="0;0.5;1"/>
  </g>
</svg>`,

};

// ══════════════════════════════════════════════════════════════
// Inject into utils.js
// ══════════════════════════════════════════════════════════════
function inject() {
  const utilsPath = path.join(__dirname, 'js', 'utils.js');
  let utilsContent = fs.readFileSync(utilsPath, 'utf8');

  const startIdx = utilsContent.indexOf('const CUSTOM_SVGS = {');
  if (startIdx === -1) { console.error("CUSTOM_SVGS not found"); return; }
  let endIdx = utilsContent.indexOf('};', startIdx) + 2;

  const customSvgsStr = utilsContent.substring(startIdx, endIdx);
  let customSvgs = new Function('return ' + customSvgsStr.substring(customSvgsStr.indexOf('{')))();

  for (const [emoji, svg] of Object.entries(PERSON_ILLUSTRATIONS)) {
    const minified = svg.replace(/\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
    customSvgs[emoji] = minified;
    console.log(`Replaced ${emoji}`);
  }

  const newStr = 'const CUSTOM_SVGS = ' + JSON.stringify(customSvgs, null, 2) + ';';
  utilsContent = utilsContent.substring(0, startIdx) + newStr + utilsContent.substring(endIdx);
  fs.writeFileSync(utilsPath, utilsContent);
  console.log('\nAll professional character illustrations injected!');
}

inject();
