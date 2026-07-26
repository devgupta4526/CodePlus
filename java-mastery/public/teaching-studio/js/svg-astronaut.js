// ═══════════════════════════════════════════════════════════════════════
// svg-astronaut.js  —  The CSS-animated Astronaut character + space backgrounds
// Directly based on the user's reference astronaut HTML/CSS
// ═══════════════════════════════════════════════════════════════════════

/* ─────────────────────────────────────────────────────────────────────
   THE ASTRONAUT SVG — exact class structure from reference code
   .arm-left .arm-right .leg-right .face .eye-left .eye-right .stars .reflect
   All animations live in main.css as proper @keyframes
─────────────────────────────────────────────────────────────────────── */
function svgAstronaut(accent) {
  const a = accent || '#7c8cf8';
  return `<svg class="astronaut-char" viewBox="0 0 609.7 744.9" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;overflow:visible">
<title>Astronaut</title>
<defs>
  <linearGradient x1="99.997%" y1="50%" x2=".002%" y2="50%" id="astro_a">
    <stop stop-color="#DC818F" stop-opacity="0" offset="22.69%"/>
    <stop stop-color="#DC818F" offset="86.98%"/>
  </linearGradient>
  <linearGradient x1="49.987%" y1=".002%" x2="49.987%" y2="99.977%" id="astro_b">
    <stop stop-color="#FFF" offset=".129%"/>
    <stop stop-color="#FFF" stop-opacity=".4" offset="50.46%"/>
    <stop stop-color="#FFF" stop-opacity=".1" offset="97.9%"/>
  </linearGradient>
</defs>

<!-- ── STARS (rotating slowly) ── -->
<g class="astro-stars" fill-rule="evenodd" fill="#fff">
  <circle cx="75" cy="212" r="2"/><circle cx="117.5" cy="300.5" r="1.5"/>
  <circle cx="148" cy="251" r="2"/><circle cx="197" cy="140" r="1"/>
  <circle cx="205" cy="192" r="2"/><circle cx="247.5" cy="280.5" r="1.5"/>
  <circle cx="278" cy="231" r="2"/><circle cx="208" cy="161" r="2"/>
  <circle cx="238" cy="59" r="2"/><circle cx="168" cy="359" r="2"/>
  <circle cx="147" cy="319" r="2"/><circle cx="67.5" cy="120.5" r="1.5"/>
  <circle cx="98" cy="71" r="2"/><circle cx="327" cy="120" r="1"/>
  <circle cx="448" cy="212" r="2"/><circle cx="490.5" cy="300.5" r="1.5"/>
  <circle cx="521" cy="251" r="2"/><circle cx="570" cy="140" r="1"/>
  <circle cx="578" cy="192" r="2"/><circle cx="620.5" cy="280.5" r="1.5"/>
  <circle cx="651" cy="231" r="2"/><circle cx="581" cy="161" r="2"/>
  <circle cx="611" cy="59" r="2"/><circle cx="541" cy="359" r="2"/>
  <circle cx="520" cy="319" r="2"/><circle cx="440.5" cy="120.5" r="1.5"/>
  <circle cx="471" cy="71" r="2"/><circle cx="700" cy="120" r="1"/>
  <circle cx="125" cy="572" r="2"/><circle cx="167.5" cy="660.5" r="1.5"/>
  <circle cx="198" cy="611" r="2"/><circle cx="247" cy="500" r="1"/>
  <circle cx="255" cy="552" r="2"/><circle cx="297.5" cy="640.5" r="1.5"/>
  <circle cx="328" cy="591" r="2"/><circle cx="258" cy="521" r="2"/>
  <circle cx="288" cy="419" r="2"/><circle cx="117.5" cy="480.5" r="1.5"/>
  <circle cx="148" cy="431" r="2"/><circle cx="377" cy="480" r="1"/>
  <circle cx="498" cy="572" r="2"/><circle cx="540.5" cy="660.5" r="1.5"/>
  <circle cx="571" cy="611" r="2"/><circle cx="620" cy="500" r="1"/>
  <circle cx="628" cy="552" r="2"/><circle cx="670.5" cy="640.5" r="1.5"/>
  <circle cx="701" cy="591" r="2"/><circle cx="631" cy="521" r="2"/>
  <circle cx="661" cy="419" r="2"/><circle cx="490.5" cy="480.5" r="1.5"/>
  <circle cx="521" cy="431" r="2"/><circle cx="750" cy="480" r="1"/>
  <circle cx="481" cy="709" r="2"/><circle cx="460" cy="669" r="2"/>
  <circle cx="118" cy="709" r="2"/><circle cx="97" cy="669" r="2"/>
</g>

<g fill="none" fill-rule="evenodd">

<!-- ── LEG RIGHT (swings) ── -->
<g class="astro-leg-right">
  <path d="M858.4 321.1L767 371.5l-86.5 47.7c-8.4 4.6-17.5 6.8-26.4 6.8-19.3 0-38.1-10.2-48.1-28.4-14.6-26.5-5-59.9 21.5-74.5L657 307l52.3-28.8 61.2-33.8L748 128.2c-5.8-29.7 13.6-58.5 43.4-64.3 13.3-2.6 26.5-.1 37.5 6.1 13.5 7.6 23.6 20.9 26.8 37.3l30.2 155.4c4.4 23.3-6.6 46.9-27.5 58.4z" fill="#DADAE5"/>
  <path d="M858.4 321.1L767 371.5c-23.2-7.8-55.3-19.1-75-26.6-14.7-5.6-28.9-22.1-35.1-37.9l29.1-16c60.8 5.1 89.7 40.9 89.7 40.9s48.3-27.8 68.3-38.3c20-10.5 15-18 12.5-28.9-1.2-5.3-8.8-46.3-16.5-87.6 17.8-7.6 24.4-18.7 25.2-20.1l20.5 105.7c4.6 23.3-6.4 46.9-27.3 58.4z" fill="#AAAAC1"/>
  <path d="M873.8 78.6L852.6 86l12.8 70.8s0 .1-.1.2l-9.6-49.7c-3.2-16.4-13.4-29.6-26.8-37.3-9.3 4-6.7 8.8-5.3 16.5.8 4.6 8.7 47.8 16.6 90.5-6.8 2.9-15.2 5.3-25.5 6.5-39.4 4.6-56.9-5.4-56.9-5.4l-22-119.4L878 19.5l30.7-8.5s16.4 47.9-34.9 67.6z" fill="#AAAAC1"/>
  <path d="M873.8 78.6L852.6 86l12.8 70.8s-6.2 12.1-25.2 20.3c-7.9-42.8-15.8-86-16.6-90.5-1.6-9-4.9-14 11.1-18.5 41-10.5 37.5-31 36-37l7.5-11.5 30.7-8.5c-.2-.1 16.2 47.8-35.1 67.5z" fill="#7E7E99"/>
  <ellipse fill="#5F5F77" transform="translate(791,0)" cx="78.5" cy="45.8" rx="65" ry="28"/>
</g>

<!-- ── BODY ── -->
<g>
  <path d="M756.5 387.6c-.9-68.7-67.9-118.7-133.1-97.2-1.6.5 133.1 97.2 133.1 97.2z" fill="#DADAE5"/>
  <path d="M755 498l-227 96.3s-34.2-15.1-49-50.1c-22.2-52.4-24.8-133.4 6.9-147.9 11-5.1 22.6-10.3 34.6-15.5 48.7-21.2 103.7-42.7 147.8-53.9 45.7-11.6 91 6.2 115.2 40.8 0 0 6.8 10.3 8.1 23.8 1.3 13.5 10.6 92.3 10.6 92.3L755 498z" fill="#FFF"/>
  <path d="M793.6 429s-14.5-31.1-52.3-20c-42 12.3-32.4 35.8-91.2 58.9-21 8.3-49.6 19.9-76.9 31.3v-.1c-22.5 9.6-29.3 3.7-35.3-4.6-7.6-10.6-12.9-20.1-12.9-20.1l-38.7 15.9s-11.6 18.7-4.1 37.2c7.5 18.5 20.5 32.8 20.5 32.8l15 19.9c.8 1.2 1.7 2.5 2.7 3.7l8.1 10.4L755 498l47-14.1-8.4-54.9z" fill="#DADAE5"/>
  <path d="M721.7 385.8c.1 4.7-2.7 8.9-7.1 10.7l-194.5 79.9-7.1 2.9-23.2 9.5-4.2 1.7-11.1 4.5c-4.5 1.9-9.5-1.4-9.6-6.3l-.2-34c0-2.2-1.1-4.3-2.9-5.5l-104.7-73.5c-4.5-3.2-3.7-10 1.4-12l50.3-20.7 12.5-5.1 29.7-12.2 7.8-3.2 138.9-57c3.6-1.5 7.7-1 10.9 1.2l108 75.8c3 2.1 4.7 5.5 4.8 9.1l.3 34.2z" fill="#FFF"/>
  <path d="M721.7 385.8c.1 4.7-2.7 8.9-7.1 10.7l-204.5 84-26.6 10.9-9.1 3.7c-4.5 1.9-9.5-1.4-9.6-6.3l-.2-34c0-2.2-1.1-4.3-2.9-5.5l3.3 2.3c-4.4-3.2-3.7-10 1.4-12l15.8-6.5 31.8-13 191.7-78.7c3.6-1.5 8-.8 10.9 1.2 2.9 2.1 4.7 5.5 4.8 9.1l.3 34.1z" fill="#DADAE5"/>
  <path d="M525 474.4l-41.4 17c1.2-8.2 1.8-16.6 1.8-25.1 0-11.4-1.1-22.4-3.2-33.2l42.8-17.6v58.9z" fill="#AAAAC1"/>
  <path d="M481.8 433.3c-9.1-38.2-30.8-71.6-60.5-95.4l23.6-9.7c28.3 10.8 70 51.3 80.2 87.3l-43.3 17.8z" fill="#DADAE5"/>
</g>

<!-- ── LEG LEFT (static base) ── -->
<g transform="translate(783 64)">
  <path d="M.4 303.7l17.2-5.2 94.1-28.6L171 116.8S191.8 79 240.2 93c5.3 1.5 9.8 3.3 13.8 5.3 32.5 16.4 24.4 46.1 24.4 46.1s-66 184.4-71.5 197.3c-5.5 12.9-14.3 24.6-46.5 35.1-20.8 6.8-142.2 43.3-142.2 43.3L.4 303.7z" fill="#FFF"/>
  <path d="M382.7 67.2s-11.3 51-66 41.2l-22.2-4.7-25.9 67.9s-15 9.2-41.1 2.6c-5.2-1.3-10.7-3.2-16.7-6-36.4-16.6-46.4-34.4-46.4-34.4l43.4-114.7 132.4 36.4 42.5 11.7z" fill="#DADAE5"/>
  <path d="M10.6 365s141.6-34.1 146.7-35.7c7.3-2.3 14.7-3.7 21-26 5.5-19.5 53.1-149.2 68-192.3 32.5 16.4 32.1 33.5 32.1 33.5s-66 184.4-71.5 197.3c-5.5 12.9-14.3 24.6-46.5 35.1L19.1 420c-15.9-11.7-20.6-33.3-11-50.5l2.5-4.5" fill="#DADAE5"/>
  <path d="M382.7 67.2s-11.3 51-66 41.2l-22.2-4.7-25.9 67.9s-14.4 10.9-44.5 1.7c15.4-44 31.9-81.5 33.8-86.6 3.9-10.1 8.7-15 25.7-9.3 17 5.7 25.7 7.7 30.7-12 1.7-6.8 12.5-9.4 25.8-9.8l42.6 11.6z" fill="#AAAAC1"/>
  <ellipse fill="#7E7E99" transform="rotate(-74.93 295.346 42.94)" cx="295.346" cy="42.942" rx="19.7" ry="90.8"/>
</g>

<!-- ── ARM LEFT (swings) ── -->
<g class="astro-arm-left">
  <path d="M584.9 697.3c-4.4 13.3-15.1 23.6-28.6 27.5L422.4 763l-33.3 9.5c-3.9 1.1-7.8 1.6-11.7 1.6-12.2 0-23.8-5.4-31.8-14.4-.3-.3-.5-.6-.8-.9-3-3.6-5.4-7.7-7.1-12.2-.4-1.1-.8-2.1-1.1-3.2-2.7-9.6-1.9-19.4 1.6-27.9 4.8-11.5 14.6-20.8 27.5-24.5l16-4.6 85.5-24.4h.2l5.6-1.6-.1-.1-60.8-79.3-.1-.1c-14.1-18.5 3.6-26.6 22.2-40.8l36.7-19.8 101 129.7 6.4 8.2c8.5 11.1 11 25.8 6.6 39.1z" fill="#FFF"/>
  <path d="M363.7 735c-11.3 3.2-19 8.1-19 19.4 0 11.3.1 32.6.1 32.6s-.7 17.8 8 20c2.9 0 5.8-.3 9-1.3 9.6-3 9.3-6.7 9.3-13.9 0-6.8 1.6-14.4 22.3-20.2l28.8-8.3.2-.2c1.7-2.1 13.1-17.5 5.2-44.8-.1-.2-.1-.4-.2-.7L363.7 735z" fill="#AAAAC1"/>
  <path d="M486.3 490.3l-74.1 90.6c0 .1 60.8 79.4 60.8 79.4l13-4c9.8-3 13.5-15 6.9-22.9l-11.1-15.8c-11-15.7-27-40.1-13.2-56.5 3.2-3.8 7.5-6.4 12.1-7.8 9.1-2.8 16.6-.1 22 7.1 0 0 6.7-19.1 6.7-40 0-21.1-23.1-30.1-23.1-30.1z" fill="#DADAE5"/>
</g>

<!-- ── ARM RIGHT (swings) ── -->
<g class="astro-arm-right">
  <path d="M32.3 563.9c7.4 5.3 16 7.8 24.4 7.8 4.4 0 8.8-.7 13-2 8.5-2.7 16.1-8.1 21.7-15.9l57.9-81.9 71.9 23.3 63.8 20.6c22.3 7.2 46.2-5 53.4-27.3 7.2-22.3-5-46.2-27.3-53.4l-165.3-53.5c-17.7-5.7-37 .7-47.7 15.9l-76 107.3c-13.5 19.1-8.9 45.5 10.2 59.1z" fill="#DADAE5"/>
  <path d="M154.2 436.3L255 467.1s-14 11.8-33.9 28l-71.9-23.3-27.2 38.7c0-2.2-.6-17.8-15.6-32.4 9.5-12.6 19.4-25.7 26.1-34.7 5-6.7 13.7-9.5 21.7-7.1z" fill="#AAAAC1"/>
  <path d="M.8 547.2v12.7c0 15.5 6.5 25.1 17.9 25.1h56c3.7 0 6.8-.7 8.2-1.1 8.1-2.1 14.7-10.3 14.7-21.4 0-2.5-.4-4-.3-7.9.1-6.6-.5-7.5 5.5-16.9.1-.2.3-.4.4-.7 0 0 1.6-2.2 3.8-5.2l15.1-21.3c0-2.2-.6-17.8-15.6-32.4-2.5-2.4-5.4-4.9-8.9-7.2-25.4-17.3-55.1 4-55.1 4-21.6 27.3-20.3 25.5-28.9 37.3C2.1 528 .8 535.1.8 547.2z" fill="#AAAAC1"/>
</g>

<!-- ── HELMET ── -->
<g>
  <path d="M443.3 475.3c0 58-32.6 108.5-80.4 134.2-10.5 2.1-21.3 3.3-32.4 3.3-90.4 0-163.7-73.3-163.7-163.7 0-34 10.4-65.6 28.2-91.8 26.2-21.4 59.6-34.2 96-34.2 84-.1 152.3 68.2 152.3 152.2z" fill="#1A0029"/>
  <path d="M291 301.9c-14.4 0-28.5 1.8-41.9 5.1 24-13.8 51.7-21.7 81.3-21.7 90.4 0 163.7 73.3 163.7 163.7 0 53.1-25.3 100.3-64.5 130.2 21.8-29 34.7-65 34.7-104 .1-95.5-77.7-173.3-173.3-173.3z" fill="#BABACC"/>
  <path d="M291 323c-36.4 0-69.8 12.8-96 34.2 6.1-9 13.1-17.4 20.9-25.1 9.9-9.7 21.1-18.2 33.2-25.1 13.4-3.3 27.4-5.1 41.9-5.1 95.6 0 173.4 77.8 173.4 173.4 0 39-12.9 75-34.7 104-9.4 7.2-19.5 13.3-30.3 18.4-11.5 5.3-23.7 9.3-36.5 11.9 47.8-25.7 80.4-76.2 80.4-134.2C443.3 391.3 375 323 291 323z" fill="#DADAE5"/>
  <!-- Visor aurora glow using accent color -->
  <path d="M16.6 167c0 77.7 72.6 144.7 142.8 144.7 28.1 0 54.8-4.4 77.2-18 38.3-44.9 43.7-84.4 39.7-122.4-3.8-25.5-15.7-71.2-66.3-107.3-46.3-31.5-97.5-29.9-134.9-17.6C37 73.2 16.6 117 16.6 167z" fill="url(#astro_a)" opacity=".22" transform="translate(166 285)"/>
</g>

<!-- ── FACE (inside visor) ── -->
<g class="astro-face" transform="translate(181 344)">
  <path d="M248.7 125.6c0 4.9-.3 9.6-.9 14.3-1.6 12.4-5.2 24.2-10.5 34.9-17.2 34.8-52.1 58.6-92.2 58.6-6.9 0-13.7-.7-20.3-2.1-47.6-9.8-83.4-53.3-83.4-105.7 0-29.4 11.4-56.1 29.8-75.6 18.8-19.9 45-32.2 73.9-32.2 57.2 0 103.6 48.3 103.6 107.8z" fill="#422C4F"/>
  <path d="M41.4 125.6c0 52.3 35.8 95.9 83.4 105.6 48.2-3.9 86.1-45.7 86.1-96.8 0-53.7-41.9-97.2-93.5-97.2-16.8 0-32.6 4.6-46.3 12.7-18.4 19.6-29.7 46.2-29.7 75.7z" fill="#A56D8A"/>
  <path d="M76.7 81.9c28.1 2.1 79.2-4.2 106-7.9 3.1-.4 5.8-.4 8.3 0 26.6 4.3 25.2 51.2 43.7 51.2 34 0 16.7-36.1 16.4-38.2-9.2-61-49.7-70.2-100.7-69.8-1.2 0-31.2-19.5-55.3-15.9-1.5.2-3.1.5-4.5 1C74.3 7 58.6 31.1 54 47.5c-4.2 15.1 2 32.8 22.7 34.4z" fill="#1A0029"/>
  <path d="M76.7 81.9c28.1 2.1 79.2-4.2 106-7.9 3.1-.4 5.8-.4 8.3 0-3-12.9-13.1-22-22.7-25.5s-26.4-11.1-28.8-23.3C136.2 8.3 121.8.8 95.2 1.3c-1.5.2-3.1.5-4.5 1-16.3 4.7-32 28.8-36.6 45.2-4.3 15.1 1.9 32.8 22.6 34.4z" fill="#3F3249"/>

  <!-- Eye LEFT (blinks) -->
  <g class="astro-eye-left">
    <path d="M140.1 156.8c0 3.2-2.4 5.9-5.5 6.4-.3.1-.7.1-1.1.1-3.6 0-6.5-2.9-6.5-6.5 0-2.4 1.3-4.4 3.1-5.6 1-.6 2.1-.9 3.4-.9 3.7-.1 6.6 2.9 6.6 6.5z" fill="#1A0029"/>
    <path d="M137.8 157.6c0 2.4-1.3 4.4-3.2 5.6-.3.1-.7.1-1.1.1-3.6 0-6.5-2.9-6.5-6.5 0-2.4 1.3-4.4 3.1-5.6.3-.1.7-.1 1.1-.1 3.7 0 6.6 2.9 6.6 6.5z" fill="#422C4F"/>
  </g>

  <!-- Eye RIGHT (blinks) -->
  <g class="astro-eye-right">
    <path d="M67.6 136.1c0 3.6-2.9 6.5-6.5 6.5h-.5c-3.4-.2-6-3.1-6-6.5 0-2.7 1.6-5 3.9-6 .8-.4 1.7-.5 2.6-.5 3.6 0 6.5 2.9 6.5 6.5z" fill="#1A0029"/>
    <path d="M64.5 136.6c0 2.7-1.6 5-3.9 6-3.4-.2-6-3.1-6-6.5 0-2.7 1.6-5 3.9-6 3.4.3 6 3.1 6 6.5z" fill="#422C4F"/>
  </g>

  <!-- Nose + mouth -->
  <path d="M86.1 134.2l-15.8 32.6c-.6 1.2.1 2.5 1.3 2.9l31.8 8.5c1.6.4 3-1.2 2.4-2.7l-16-41c-.6-1.8-2.9-1.9-3.7-.3z" fill="#824D72"/>
  <path d="M70.1 168.2c2 4.2 6 7 10.7 7.5l22.6 2.4-33.3-9.9z" fill="#663466"/>

  <!-- Eyebrow hints / face details -->
  <path d="M139.9 114.2c.8-.5 2-1 3.6-1.4 1.5-.4 3.4-.6 5.4-.4.5 0 1 .1 1.5.2s1 .2 1.6.3c1 .3 2.1.7 3.1 1.2l1.5.8c.5.3.9.7 1.3 1 .9.6 1.6 1.5 2.3 2.2.7.7 1.2 1.7 1.6 2.5.5.8.8 1.6 1 2.4.2.8.5 1.5.5 2.1.1.7.1 1.1.1 1.5 0 .9-.7 1.1-1.4.5l-.9-.9c-.4-.4-1-.8-1.5-1.3-.5-.4-1-.9-1.6-1.4-.6-.4-1.1-1-1.8-1.3-.6-.4-1.2-.9-1.9-1.3-.3-.2-.7-.4-1-.6l-1.1-.5c-.7-.4-1.5-.7-2.2-1-.8-.3-1.5-.6-2.2-.9-.8-.3-1.5-.6-2.2-.8-.7-.3-1.4-.5-2.1-.7-1.4-.5-2.5-.8-3.3-1.1-.9 0-1.1-.6-.3-1.1z" fill="#1A0029"/>

  <!-- Visor reflection (shimmers) -->
  <path class="astro-reflect" d="M6.8 64.7C23 21.8 51.8 9.2 77.5 7.9c26-1.3 49.8 18.8 52.5 47.3C133.1 87 110.3 114 82.5 114c-23.8 0-55 14.5-49.1 74.1.4 4.3-4.8 6.2-6.8 2.5C-10.2 122.9.7 80.8 6.8 64.7z" fill="url(#astro_b)" opacity=".7"/>
</g>

</g>
</svg>`;
}

/* ─────────────────────────────────────────────────────────────────────
   FLOATING PLANET SVG
─────────────────────────────────────────────────────────────────────── */
function svgPlanet(color, hasRing, id) {
  const rId = `pr_${id}`;
  return `<svg viewBox="0 0 100 100" style="width:100%;height:100%;overflow:visible" xmlns="http://www.w3.org/2000/svg">
<defs>
  <radialGradient id="${rId}" cx="35%" cy="30%" r="60%">
    <stop offset="0%" stop-color="${color}FF"/>
    <stop offset="60%" stop-color="${color}CC"/>
    <stop offset="100%" stop-color="${color}44"/>
  </radialGradient>
</defs>
${hasRing ? `<ellipse cx="50" cy="55" rx="48" ry="9" fill="none" stroke="${color}80" stroke-width="4" transform="rotate(-20 50 55)"/>` : ''}
<circle cx="50" cy="50" r="38" fill="url(#${rId})"/>
<ellipse cx="37" cy="36" rx="10" ry="14" fill="white" opacity="0.25" transform="rotate(-30 37 36)"/>
${hasRing ? `<ellipse cx="50" cy="55" rx="26" ry="5" fill="${color}30" transform="rotate(-20 50 55)"/>` : ''}
</svg>`;
}

/* ─────────────────────────────────────────────────────────────────────
   ANIMATED BACKGROUND LAYERS
─────────────────────────────────────────────────────────────────────── */

// 1. Deep space starfield SVG layer
function svgSpaceBackground(accent) {
  const a = accent || '#7c8cf8';
  const stars = [];
  // deterministic pseudo-random stars
  for (let i = 0; i < 80; i++) {
    const x = ((i * 137.508 + 31) % 1280).toFixed(1);
    const y = ((i * 97.3 + 17) % 720).toFixed(1);
    const r = (0.8 + (i % 3) * 0.6).toFixed(1);
    const op = (0.3 + (i % 5) * 0.1).toFixed(2);
    const dur = (2 + (i % 4) * 0.8).toFixed(1);
    const delay = ((i % 7) * 0.4).toFixed(1);
    stars.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="white" opacity="${op}">
      <animate attributeName="opacity" values="${op};${Math.min(1,+op+0.5)};${op}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
    </circle>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
    ${stars.join('')}
    <!-- Nebula blobs -->
    <ellipse cx="200" cy="360" rx="280" ry="180" fill="${a}" opacity="0.04">
      <animate attributeName="rx" values="280;320;280" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.04;0.07;0.04" dur="8s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="1100" cy="200" rx="240" ry="160" fill="#c792ea" opacity="0.05">
      <animate attributeName="ry" values="160;200;160" dur="11s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.05;0.09;0.05" dur="11s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="640" cy="600" rx="320" ry="100" fill="${a}" opacity="0.03">
      <animate attributeName="rx" values="320;380;320" dur="14s" repeatCount="indefinite"/>
    </ellipse>
  </svg>`;
}

// 2. Floating geometric shapes background
function svgGeometricBackground(accent) {
  const a = accent || '#7c8cf8';
  const shapes = [
    `<polygon points="640,80 680,150 600,150" fill="none" stroke="${a}" stroke-width="1.5" opacity="0.2">
      <animateTransform attributeName="transform" type="rotate" from="0 640 115" to="360 640 115" dur="20s" repeatCount="indefinite"/>
    </polygon>`,
    `<polygon points="100,600 140,540 180,600 140,660" fill="none" stroke="#c792ea" stroke-width="1.5" opacity="0.15">
      <animateTransform attributeName="transform" type="rotate" from="0 140 600" to="-360 140 600" dur="15s" repeatCount="indefinite"/>
    </polygon>`,
    `<polygon points="1180,400 1220,340 1260,400 1220,460" fill="none" stroke="#7cd4f8" stroke-width="1.5" opacity="0.15">
      <animateTransform attributeName="transform" type="rotate" from="0 1220 400" to="360 1220 400" dur="18s" repeatCount="indefinite"/>
    </polygon>`,
    `<circle cx="200" cy="200" r="60" fill="none" stroke="${a}" stroke-width="1" stroke-dasharray="8 4" opacity="0.12">
      <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="25s" repeatCount="indefinite"/>
    </circle>`,
    `<circle cx="1100" cy="550" r="80" fill="none" stroke="#c792ea" stroke-width="1" stroke-dasharray="6 6" opacity="0.10">
      <animateTransform attributeName="transform" type="rotate" from="0 1100 550" to="-360 1100 550" dur="30s" repeatCount="indefinite"/>
    </circle>`,
    `<rect x="580" y="650" width="120" height="120" fill="none" stroke="${a}" stroke-width="1" opacity="0.08" transform="rotate(45 640 710)">
      <animateTransform attributeName="transform" type="rotate" from="45 640 710" to="405 640 710" dur="22s" repeatCount="indefinite"/>
    </rect>`,
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
    ${shapes.join('')}
  </svg>`;
}

// 3. Flowing data streams (like neural network connections)
function svgDataStreamBackground(accent) {
  const a = accent || '#7c8cf8';
  const nodes = [
    [100,200],[300,100],[500,280],[700,150],[900,300],[1100,200],[1200,400],
    [200,500],[400,420],[600,550],[800,450],[1000,500],
    [150,650],[350,700],[650,680],[900,700],[1150,650]
  ];
  const lines = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const [x1,y1] = nodes[i], [x2,y2] = nodes[i+1];
    const dur = (3 + i * 0.3).toFixed(1);
    const delay = (i * 0.2).toFixed(1);
    lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${a}" stroke-width="1" opacity="0">
      <animate attributeName="opacity" values="0;0.15;0" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
    </line>`);
    // Moving dot along line
    lines.push(`<circle r="3" fill="${a}" opacity="0.6">
      <animateMotion dur="${dur}s" begin="${delay}s" repeatCount="indefinite" path="M${x1},${y1} L${x2},${y2}"/>
      <animate attributeName="opacity" values="0;0.6;0" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
    </circle>`);
  }
  const nodeDots = nodes.map(([x,y],i) => 
    `<circle cx="${x}" cy="${y}" r="${2+i%2}" fill="${a}" opacity="0.2">
      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="${2+i%3}s" begin="${i*0.15}s" repeatCount="indefinite"/>
    </circle>`
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
    ${lines.join('')}
    ${nodeDots.join('')}
  </svg>`;
}

// 4. Floating code particles
function svgCodeParticleBackground(accent) {
  const a = accent || '#7c8cf8';
  const snippets = ['{}','[]','//','=>',';','</>','&&','||','++','fn()','0x','[]','()','::','null','true','{}'];
  const particles = snippets.map((s,i) => {
    const x = ((i * 97 + 50) % 1180 + 50).toFixed(0);
    const y = ((i * 137 + 80) % 600 + 60).toFixed(0);
    const dur = (8 + i * 1.2).toFixed(1);
    const delay = (i * 0.6).toFixed(1);
    const op = (0.06 + (i % 4) * 0.04).toFixed(2);
    return `<text x="${x}" y="${y}" font-family="'JetBrains Mono',monospace" font-size="14" fill="${a}" opacity="${op}">
      <animate attributeName="y" values="${y};${+y-40};${y}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>
      <animate attributeName="opacity" values="${op};${(+op*1.8).toFixed(2)};${op}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
      ${s}
    </text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
    ${particles.join('')}
  </svg>`;
}

// 5. Morphing blobs (organic)
function svgBlobBackground(accent) {
  const a = accent || '#7c8cf8';
  return `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
  <defs>
    <filter id="blob_blur"><feGaussianBlur stdDeviation="50"/></filter>
  </defs>
  <!-- Large primary blob -->
  <path fill="${a}" opacity="0.07" filter="url(#blob_blur)">
    <animate attributeName="d" dur="12s" repeatCount="indefinite"
      values="M600,200 C750,150 900,250 880,400 C860,550 700,650 550,600 C400,550 300,420 320,280 C340,140 450,250 600,200Z;
              M620,180 C800,100 950,280 920,430 C890,580 720,660 540,610 C360,560 280,410 310,260 C340,110 440,260 620,180Z;
              M580,220 C740,160 880,270 870,420 C860,570 690,640 530,590 C370,540 290,400 320,270 C350,140 420,280 580,220Z;
              M600,200 C750,150 900,250 880,400 C860,550 700,650 550,600 C400,550 300,420 320,280 C340,140 450,250 600,200Z"/>
  </path>
  <!-- Secondary blob -->
  <path fill="#c792ea" opacity="0.05" filter="url(#blob_blur)">
    <animate attributeName="d" dur="17s" repeatCount="indefinite"
      values="M200,360 C300,280 450,300 480,400 C510,500 380,580 260,560 C140,540 100,460 120,380 C140,300 100,440 200,360Z;
              M220,340 C330,250 480,270 510,380 C540,490 400,570 270,540 C140,510 90,430 110,360 C130,290 110,430 220,340Z;
              M200,360 C300,280 450,300 480,400 C510,500 380,580 260,560 C140,540 100,460 120,380 C140,300 100,440 200,360Z"/>
  </path>
  <!-- Third blob -->
  <path fill="#7cd4f8" opacity="0.04" filter="url(#blob_blur)">
    <animate attributeName="d" dur="21s" repeatCount="indefinite"
      values="M1050,450 C1150,380 1250,430 1240,530 C1230,630 1120,700 1020,660 C920,620 900,540 930,470 C960,400 950,520 1050,450Z;
              M1070,430 C1180,350 1270,410 1260,520 C1250,630 1130,690 1020,640 C910,590 890,510 920,450 C950,390 960,510 1070,430Z;
              M1050,450 C1150,380 1250,430 1240,530 C1230,630 1120,700 1020,660 C920,620 900,540 930,470 C960,400 950,520 1050,450Z"/>
  </path>
  </svg>`;
}

// Export all background generators
window.svgAstronaut = svgAstronaut;
window.svgPlanet = svgPlanet;
window.svgSpaceBackground = svgSpaceBackground;
window.svgGeometricBackground = svgGeometricBackground;
window.svgDataStreamBackground = svgDataStreamBackground;
window.svgCodeParticleBackground = svgCodeParticleBackground;
window.svgBlobBackground = svgBlobBackground;
