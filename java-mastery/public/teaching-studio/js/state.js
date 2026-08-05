// Ensure getSvgIcon is accessible in all scopes
if (typeof getSvgIcon === 'undefined') {
  var getSvgIcon = (typeof window !== 'undefined' && window.getSvgIcon) || (typeof globalThis !== 'undefined' && globalThis.getSvgIcon) || function(n, c, s) { return ''; };
}

// ═══ STATE ════════════════════════════════════════════════════════════════
let slides = [], cur = 0, curStep = 0;
let tool = 'pen', color = '#7c8cf8', strokeSize = 3;
let zoom = 1, drawing = false;
let drawHistory = [], redoStack = [], snap = null;
let lastX = 0, lastY = 0, startX = 0, startY = 0;
let activeTab = 'content', laserTimerId = null, pActive = false;

// ═══ DOM REFS ═════════════════════════════════════════════════════════════
const sc = document.getElementById('slide-canvas');
const dc = document.getElementById('draw-canvas');
const sd = document.getElementById('slide-dom');
const sCtx = sc.getContext('2d');
const dCtx = dc.getContext('2d', { willReadFrequently: true });
const wrap = document.getElementById('canvas-wrap');

// ═══ SLIDE FACTORY ════════════════════════════════════════════════════════
function mkSlide(o) {
  return Object.assign({
    layout: 'bullets', title: '', subtitle: '', bullets: [], code: '',
    bg: '#0b0d14', accent: '#7c8cf8', anim: 'fade-up',
    diagramType: 'jvm',
    diagramStyle: '',
    titleStyle: '',
    diagramNodes: [],
    leftLabel: 'Before', leftCode: '', rightLabel: 'After', rightCode: '',
    quote: '', author: '',
    stats: [],
    callout: '', calloutIcon: '💡', note: '',
    leftBullets: [], rightBullets: [],
    imageUrl: '', imagePosition: 'right', imageCaption: '',
    nodes: [],
    role: '',
    question: '', answer: '',
    options: [], correctIndex: 0,
    wrongSteps: [], correctSteps: [],
    leftIcon: '❌', rightIcon: '✅', leftDesc: '', rightDesc: '',
    myth: '',
    characters: [],
    fact: '',
    nextTopic: '',
    chartData: [], chartUnit: '',
    spectrumPos: 50, spectrumLabel: '',
    customHtml: '', customCss: '',
    _ann: null
  }, o);
}
window.mkSlide = mkSlide;

// ═══ DEFAULT DECK ═════════════════════════════════════════════════════════
function buildDefaultSlides() {
  return [
    {
        "layout": "custom-html",
        "title": "Scene 1.1 — Cold Open Typing Text",
        "subtitle": "[00:00–00:15] · Retro Terminal PNG & Monospace Typewriter Animation",
        "accent": "#00ff9d",
        "anim": "fade-up",
        "bgType": "space",
        "customCss": "\n      .ae-stage-11 {\n        position: relative;\n        width: 100%;\n        height: 100%;\n        min-height: 520px;\n        aspect-ratio: 16/9;\n        background: #05070a;\n        border-radius: 16px;\n        overflow: hidden;\n        border: 1px solid rgba(0, 255, 157, 0.3);\n        box-shadow: 0 30px 60px -30px rgba(0,0,0,0.9), 0 0 40px rgba(0,255,157,.12);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n      .ae-bg-plate-11 {\n        position: absolute;\n        inset: -15%;\n        background: radial-gradient(circle at 30% 30%, rgba(79,209,255,.15), transparent 55%),\n                    radial-gradient(circle at 70% 70%, rgba(0,255,157,.12), transparent 55%);\n        animation: kenBurns11 6s linear infinite alternate;\n      }\n      .ae-terminal-img-container {\n        position: relative;\n        z-index: 5;\n        width: 72%;\n        max-width: 680px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n      .ae-terminal-png {\n        width: 100%;\n        height: auto;\n        object-fit: contain;\n        filter: drop-shadow(0 20px 40px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(0,255,157,0.25));\n        animation: elasticIn11 .8s cubic-bezier(.68,-0.4,.27,1.4) .2s forwards;\n      }\n      .ae-typed-overlay-box {\n        position: absolute;\n        top: 52%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        width: 78%;\n        background: rgba(13, 17, 23, 0.94);\n        border: 1px solid #00ff9d;\n        border-radius: 10px;\n        padding: 22px 28px;\n        box-shadow: 0 10px 30px rgba(0,0,0,0.9), 0 0 20px rgba(0,255,157,0.3);\n        z-index: 8;\n      }\n      .ae-typed-text-11 {\n        font-family: 'JetBrains Mono', monospace;\n        font-size: 24px;\n        font-weight: 800;\n        color: #ffffff;\n        white-space: nowrap;\n        overflow: hidden;\n        border-right: 4px solid #00ff9d;\n        width: 0;\n        animation: typeCine11 3s steps(38) .6s forwards, blinkCursor11 .75s infinite;\n      }\n      .ae-scene-badge-11 {\n        position: absolute;\n        top: 20px;\n        left: 20px;\n        z-index: 15;\n        background: rgba(0, 255, 157, 0.15);\n        color: #00ff9d;\n        border: 1px solid #00ff9d;\n        padding: 6px 16px;\n        border-radius: 20px;\n        font-family: 'Space Grotesk', sans-serif;\n        font-size: 13px;\n        font-weight: bold;\n      }\n      @keyframes kenBurns11 { 0% { transform: scale(1.05); } 100% { transform: scale(1.2) translate(-2%,-1%); } }\n      @keyframes elasticIn11 {\n        0% { transform: scale(.3) rotate(-4deg); opacity: 0; }\n        60% { transform: scale(1.05) rotate(1deg); opacity: 1; }\n        100% { transform: scale(1) rotate(0); opacity: 1; }\n      }\n      @keyframes typeCine11 { from { width: 0; } to { width: 100%; } }\n      @keyframes blinkCursor11 { 0%,100% { border-color: #00ff9d; } 50% { border-color: transparent; } }\n    ",
        "customHtml": "\n      <div class=\"ae-stage-11\">\n        <div class=\"ae-bg-plate-11\"></div>\n        <div class=\"ae-scene-badge-11\">SCENE 1.1 · COLD OPEN TYPING TEXT</div>\n        \n        <div class=\"ae-terminal-img-container\">\n          <img class=\"ae-terminal-png\" src=\"/teaching-studio/assets/35_vintage_green-phosphor_CR.png\" alt=\"Terminal Plate\" />\n          <div class=\"ae-typed-overlay-box\">\n            <div style=\"font-family:'JetBrains Mono',monospace; font-size:11px; color:#7c8a9a; margin-bottom:8px;\">bash — cold_open_typing.sh [00:00–00:15]</div>\n            <div class=\"ae-typed-text-11\">Why Most Freshers Fail to Explain <span style=\"color:#4fd1ff;\">OOP</span></div>\n          </div>\n        </div>\n      </div>\n    "
    },
    {
        "layout": "custom-html",
        "title": "Scene 1.2 — Nervous Candidate Montage (3 Variations)",
        "subtitle": "[00:15–01:45] · PNG Puppet Expression Swap & Kinetic Word Reveal",
        "accent": "#ff4d5e",
        "anim": "fade-up",
        "bgType": "blob",
        "customCss": "\n      .ae-stage-12 {\n        position: relative;\n        width: 100%;\n        height: 100%;\n        min-height: 520px;\n        aspect-ratio: 16/9;\n        background: #05070a;\n        border-radius: 16px;\n        overflow: hidden;\n        border: 1px solid rgba(255, 77, 94, 0.4);\n        box-shadow: 0 30px 60px -30px rgba(0,0,0,0.9);\n      }\n      .ae-bg-plate-12 {\n        position: absolute;\n        inset: -15%;\n        background: radial-gradient(circle at 40% 30%, rgba(255,77,94,.18), transparent 60%),\n                    radial-gradient(circle at 80% 70%, rgba(178,141,255,.15), transparent 60%);\n        animation: kenBurns12 6s linear infinite alternate;\n      }\n      .ae-interviewer-png-12 {\n        position: absolute;\n        left: 5%;\n        bottom: 8%;\n        height: 360px;\n        width: auto;\n        object-fit: contain;\n        z-index: 5;\n        filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));\n      }\n      .ae-paper-png-12 {\n        position: absolute;\n        bottom: 20%;\n        left: 28%;\n        width: 135px;\n        height: auto;\n        z-index: 8;\n        filter: drop-shadow(0 8px 20px rgba(0,0,0,0.8));\n        animation: slidePaper12 3s cubic-bezier(.16,1,.3,1) .4s infinite;\n      }\n      .ae-cand-container-12 {\n        position: absolute;\n        right: 8%;\n        bottom: 8%;\n        width: 320px;\n        height: 380px;\n        z-index: 6;\n      }\n      .ae-cand-pose-png {\n        position: absolute;\n        inset: 0;\n        width: 100%;\n        height: 100%;\n        object-fit: contain;\n        opacity: 0;\n      }\n      .pose-p1 { animation: swapPose12 10s infinite 0s; }\n      .pose-p2 { animation: swapPose12 10s infinite 2s; }\n      .pose-p3 { animation: swapPose12 10s infinite 4s; }\n      .pose-p4 { animation: swapPose12 10s infinite 6s; }\n      .pose-p5 { animation: swapPose12 10s infinite 8s; }\n\n      .ae-thought-png-12 {\n        position: absolute;\n        top: 8%;\n        right: 14%;\n        width: 220px;\n        height: auto;\n        z-index: 10;\n        filter: drop-shadow(0 0 20px rgba(79,209,255,0.4));\n      }\n      .ae-glitch-bolts-12 {\n        position: absolute;\n        top: 10%;\n        right: 16%;\n        font-size: 48px;\n        z-index: 12;\n        animation: glitchBurst12 .4s infinite alternate;\n      }\n      .ae-caption-12 {\n        position: absolute;\n        bottom: 5%;\n        left: 0;\n        right: 0;\n        text-align: center;\n        font-family: 'Space Grotesk', sans-serif;\n        font-weight: 800;\n        font-size: 24px;\n        z-index: 20;\n      }\n      .ae-caption-12 span {\n        display: inline-block;\n        opacity: 0;\n        filter: blur(8px);\n        transform: translateY(20px) scale(1.3);\n        animation: kineticWord12 0.6s cubic-bezier(.22,1,.36,1) forwards;\n      }\n      .ae-caption-12 span:nth-child(1){ animation-delay:0.8s; }\n      .ae-caption-12 span:nth-child(2){ animation-delay:0.9s; }\n      .ae-caption-12 span:nth-child(3){ animation-delay:1.0s; color:#ff4d5e; }\n      .ae-caption-12 span:nth-child(4){ animation-delay:1.1s; color:#ffd23f; }\n\n      .ae-scene-badge-12 {\n        position: absolute;\n        top: 20px;\n        left: 20px;\n        z-index: 20;\n        background: rgba(255,77,94,.15);\n        color: #ff4d5e;\n        border: 1px solid #ff4d5e;\n        padding: 6px 16px;\n        border-radius: 20px;\n        font-family: 'Space Grotesk', sans-serif;\n        font-size: 13px;\n        font-weight: bold;\n      }\n\n      @keyframes kenBurns12{ 0%{transform:scale(1.05);} 100%{transform:scale(1.22) translate(2%,-2%);} }\n      @keyframes slidePaper12 {\n        0% { transform:translateX(-80px) rotate(-6deg); opacity:0; }\n        35% { transform:translateX(80px) rotate(0deg); opacity:1; }\n        75% { transform:translateX(80px) rotate(0deg); opacity:1; }\n        100% { transform:translateX(180px) rotate(6deg); opacity:0; }\n      }\n      @keyframes swapPose12 {\n        0%, 18% { opacity:1; transform:scale(1); }\n        20%, 100% { opacity:0; transform:scale(.96); }\n      }\n      @keyframes glitchBurst12 {\n        0%{ opacity:.4; transform:scale(.85) rotate(-6deg); filter:drop-shadow(0 0 10px #4fd1ff); }\n        100%{ opacity:1; transform:scale(1.2) rotate(6deg); filter:drop-shadow(0 0 25px #00ff9d) drop-shadow(0 0 35px #ff4d5e); }\n      }\n      @keyframes kineticWord12 { to{ opacity:1; filter:blur(0); transform:translateY(0) scale(1); } }\n    ",
        "customHtml": "\n      <div class=\"ae-stage-12\">\n        <div class=\"ae-bg-plate-12\"></div>\n        <div class=\"ae-scene-badge-12\">SCENE 1.2 · MONTAGE (PNG EXPRESSION SWAPS)</div>\n\n        <img class=\"ae-interviewer-png-12\" src=\"/teaching-studio/assets/06_interviewer_character_sit.png\" alt=\"Interviewer\" />\n        <img class=\"ae-paper-png-12\" src=\"/teaching-studio/assets/57_flat_UI_card_labeled_with.png\" alt=\"Paper Card\" />\n\n        <div class=\"ae-cand-container-12\">\n          <img class=\"ae-cand-pose-png pose-p1\" src=\"/teaching-studio/assets/01_young_job_candidate_sitti.png\" alt=\"Pose 1\" />\n          <img class=\"ae-cand-pose-png pose-p2\" src=\"/teaching-studio/assets/02_same_candidate_character_.png\" alt=\"Pose 2\" />\n          <img class=\"ae-cand-pose-png pose-p3\" src=\"/teaching-studio/assets/03_same_candidate_character_.png\" alt=\"Pose 3\" />\n          <img class=\"ae-cand-pose-png pose-p4\" src=\"/teaching-studio/assets/04_same_candidate_character_.png\" alt=\"Pose 4\" />\n          <img class=\"ae-cand-pose-png pose-p5\" src=\"/teaching-studio/assets/05_same_candidate_character_.png\" alt=\"Pose 5\" />\n        </div>\n\n        <img class=\"ae-thought-png-12\" src=\"/teaching-studio/assets/54_glowing_thought-bubble_cl.png\" alt=\"Thought Bubble\" />\n        <div class=\"ae-glitch-bolts-12\">⚡🧠⚡</div>\n\n        <div class=\"ae-caption-12\">\n          <span>THE</span> <span>INTERVIEW</span> <span>PANIC:</span> <span>OOP!</span>\n        </div>\n      </div>\n    "
    },
    {
        "layout": "custom-html",
        "title": "Scene 1.3 — Split Screen: Robotic vs Confident Candidate",
        "subtitle": "[00:15–01:45] · High-End After Effects PNG Puppet Composition",
        "accent": "#4fd1ff",
        "anim": "fade-up",
        "bgType": "geo",
        "customCss": "\n      .ae-stage-13 {\n        position: relative;\n        width: 100%;\n        height: 100%;\n        min-height: 520px;\n        aspect-ratio: 16/9;\n        background: #05070a;\n        border-radius: 16px;\n        overflow: hidden;\n        display: flex;\n        border: 1px solid rgba(79, 209, 255, 0.4);\n        box-shadow: 0 30px 60px -30px rgba(0,0,0,0.9);\n      }\n      .ae-panel-left, .ae-panel-right {\n        flex: 1;\n        position: relative;\n        padding: 24px;\n        display: flex;\n        flex-direction: column;\n        justify-content: space-between;\n      }\n      .ae-panel-left {\n        background: radial-gradient(circle at 30% 50%, rgba(255,77,94,.18), transparent 70%), #0c1017;\n        border-right: 2px solid #1d2733;\n      }\n      .ae-panel-right {\n        background: radial-gradient(circle at 70% 50%, rgba(0,255,157,.18), transparent 70%), #081c15;\n      }\n\n      /* Central Kinetic VS Badge */\n      .ae-vs-emblem-13 {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        width: 76px;\n        height: 76px;\n        background: #05070a;\n        border: 3px solid #4fd1ff;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: #00ff9d;\n        font-family: 'Space Grotesk', sans-serif;\n        font-weight: 900;\n        font-size: 28px;\n        box-shadow: 0 0 30px #4fd1ff, 0 0 50px #00ff9d;\n        z-index: 30;\n        animation: pulseVS13 1.6s infinite alternate ease-in-out;\n      }\n\n      /* Left Robotic Side Assets */\n      .ae-warning-png-13 {\n        width: 32px;\n        height: 32px;\n        object-fit: contain;\n        vertical-align: middle;\n        margin-right: 6px;\n      }\n      .ae-robot-png-13 {\n        position: absolute;\n        bottom: 8%;\n        left: 12%;\n        height: 280px;\n        width: auto;\n        object-fit: contain;\n        filter: drop-shadow(0 10px 25px rgba(0,0,0,0.9));\n        animation: robotJitter13 .12s infinite alternate;\n      }\n      .ae-bored-interviewer-png {\n        position: absolute;\n        bottom: 8%;\n        right: 8%;\n        height: 220px;\n        width: auto;\n        object-fit: contain;\n        filter: grayscale(0.6) opacity(0.85);\n      }\n      .ae-robot-thought-png {\n        position: absolute;\n        top: 14%;\n        left: 8%;\n        width: 220px;\n        height: auto;\n        z-index: 10;\n        filter: drop-shadow(0 0 20px rgba(255,77,94,0.5));\n      }\n\n      /* Right Confident Side Assets */\n      .ae-architect-png-13 {\n        position: absolute;\n        bottom: 8%;\n        left: 8%;\n        height: 300px;\n        width: auto;\n        object-fit: contain;\n        filter: drop-shadow(0 15px 30px rgba(0,0,0,0.9));\n        animation: archSway13 2s infinite alternate ease-in-out;\n      }\n      .ae-blueprint-board-card {\n        position: absolute;\n        top: 14%;\n        right: 8%;\n        width: 260px;\n        height: 190px;\n        border: 2px dashed #00ff9d;\n        border-radius: 12px;\n        background: rgba(0, 255, 157, 0.04);\n        padding: 10px;\n        box-shadow: 0 0 30px rgba(0, 255, 157, 0.3);\n        overflow: hidden;\n        animation: boardGlow13 2s infinite alternate;\n      }\n      .ae-blueprint-img-13 {\n        width: 100%;\n        height: 100%;\n        object-fit: contain;\n        border-radius: 6px;\n      }\n\n      .ae-badge-tag-13 {\n        display: inline-flex;\n        align-items: center;\n        padding: 6px 16px;\n        border-radius: 20px;\n        font-size: 12px;\n        font-weight: 800;\n        font-family: 'Space Grotesk', sans-serif;\n      }\n      .b-red-13 { background: rgba(255, 77, 94, 0.15); color: #ff4d5e; border: 1px solid #ff4d5e; }\n      .b-green-13 { background: rgba(0, 255, 157, 0.15); color: #00ff9d; border: 1px solid #00ff9d; }\n\n      .ae-bottom-caption-13 {\n        position: absolute;\n        bottom: 4%;\n        left: 0;\n        right: 0;\n        text-align: center;\n        font-family: 'Space Grotesk', sans-serif;\n        font-weight: 900;\n        font-size: 20px;\n        z-index: 25;\n      }\n      .ae-bottom-caption-13 span {\n        display: inline-block;\n        opacity: 0;\n        filter: blur(6px);\n        transform: translateY(15px);\n        animation: kineticCaption13 .5s cubic-bezier(.22,1,.36,1) forwards;\n      }\n      .ae-bottom-caption-13 span:nth-child(1){ animation-delay:0.5s; }\n      .ae-bottom-caption-13 span:nth-child(2){ animation-delay:0.6s; }\n      .ae-bottom-caption-13 span:nth-child(3){ animation-delay:0.7s; }\n      .ae-bottom-caption-13 span:nth-child(4){ animation-delay:0.8s; color:#ff4d5e; }\n      .ae-bottom-caption-13 span:nth-child(5){ animation-delay:0.9s; color:#00ff9d; }\n\n      @keyframes pulseVS13 {\n        0% { transform: translate(-50%, -50%) scale(.95); box-shadow: 0 0 15px #4fd1ff; }\n        100% { transform: translate(-50%, -50%) scale(1.18); box-shadow: 0 0 35px #00ff9d, 0 0 60px #4fd1ff; }\n      }\n      @keyframes robotJitter13 { 0% { transform: translate(0, 0); } 100% { transform: translate(-3px, 2px); } }\n      @keyframes archSway13 { 0% { transform: translateY(0); } 100% { transform: translateY(-6px); } }\n      @keyframes boardGlow13 {\n        0% { border-color: #00ff9d; box-shadow: 0 0 15px rgba(0, 255, 157, 0.2); }\n        100% { border-color: #4fd1ff; box-shadow: 0 0 35px rgba(79, 209, 255, 0.6); }\n      }\n      @keyframes kineticCaption13 { to { opacity: 1; filter: blur(0); transform: translateY(0); } }\n    ",
        "customHtml": "\n      <div class=\"ae-stage-13\">\n        <div class=\"ae-vs-emblem-13\">VS</div>\n\n        <!-- Left Robotic Panel -->\n        <div class=\"ae-panel-left\">\n          <div class=\"ae-badge-tag-13 b-red-13\">\n            <img class=\"ae-warning-png-13\" src=\"/teaching-studio/assets/53_bold_red_warning_triangle.png\" alt=\"Warning\" />\n            ROBOTIC DEFINITION RECITER\n          </div>\n\n          <img class=\"ae-robot-thought-png\" src=\"/teaching-studio/assets/54_glowing_thought-bubble_cl.png\" alt=\"Robotic Thought\" />\n          <img class=\"ae-robot-png-13\" src=\"/teaching-studio/assets/39_sleek_humanoid_robot_char.png\" alt=\"Robot Candidate\" />\n          <img class=\"ae-bored-interviewer-png\" src=\"/teaching-studio/assets/06_interviewer_character_sit.png\" alt=\"Bored Interviewer\" />\n        </div>\n\n        <!-- Right Confident Panel -->\n        <div class=\"ae-panel-right\">\n          <div class=\"ae-badge-tag-13 b-green-13\">\n            ✅ CONFIDENT VISUAL EXPLAINER\n          </div>\n\n          <img class=\"ae-architect-png-13\" src=\"/teaching-studio/assets/09_architect_character_seate.png\" alt=\"Confident Engineer\" />\n          \n          <div class=\"ae-blueprint-board-card\">\n            <img class=\"ae-blueprint-img-13\" src=\"/teaching-studio/assets/25_architectural_blueprint_p.png\" alt=\"Blueprint Whiteboard\" />\n          </div>\n        </div>\n\n        <!-- Bottom Kinetic Caption Banner -->\n        <div class=\"ae-bottom-caption-13\">\n          <span>DEFINITIONS</span> <span>DON'T</span> <span>GET</span> <span>YOU</span> <span>HIRED!</span>\n        </div>\n      </div>\n    "
    }
  ].concat([
    mkSlide({ layout: 'title', title: 'Java Deep Dive', subtitle: 'Week 1 · JVM Internals & Memory Model', accent: '#7c8cf8', anim: 'type-in' }),
    mkSlide({ layout: 'hook', role: 'hook', title: 'Why does Java run on Windows, Mac and Linux without changing a single line of code?', subtitle: 'Let\'s find out…', accent: '#7c8cf8', anim: 'fade-up' }),
    mkSlide({ layout: 'problem', role: 'problem', title: 'C Program — Same Source, Different Outcomes', subtitle: 'Compile once, run... only sometimes', accent: '#f87c7c', anim: 'fade-up', bullets: ['Windows ✔', 'Mac ✖', 'Linux ✖'], callout: 'Imagine rewriting your program for every operating system.' }),
    mkSlide({ layout: 'prediction', role: 'prediction', question: 'What do you think happens after you click Run?', answer: 'Your code is translated into something every machine understands — bytecode.', accent: '#c792ea', anim: 'scale-in' }),
    mkSlide({ layout: 'wrong-assumption', role: 'wrong-assumption', title: 'What Most Beginners Assume', subtitle: '...and what actually happens', accent: '#f8d07c', anim: 'fade-up', wrongSteps: ['.java', 'CPU'], correctSteps: ['.java', 'javac', '.class', 'JVM', 'CPU'] }),
    mkSlide({ layout: 'story', role: 'story', title: 'A Letter to the World', accent: '#7cf8a0', anim: 'fade-up', bullets: ['You write a letter.', 'The letter is in English.', 'Different countries use different translators.', 'Your letter never changes.', 'Only the translator changes.'], note: 'Java Bytecode = Letter · JVM = Translator' }),
    mkSlide({ layout: 'analogy', role: 'analogy', title: 'The JVM Is Just a Translator', subtitle: 'One bytecode, many machines', accent: '#7cd4f8', anim: 'scale-in', leftIcon: '🧠', leftLabel: 'JVM', leftDesc: 'Reads bytecode, runs anywhere', rightIcon: '🗣️', rightLabel: 'Translator', rightDesc: 'Reads one language, speaks many' }),
    mkSlide({ layout: 'journey', role: 'journey', title: 'From Keystroke to Output', subtitle: 'Follow the file as it transforms', accent: '#7c8cf8', anim: 'fade-up', bullets: ['Programmer', 'Hello.java', 'javac', 'Hello.class', 'JVM', 'JIT', 'Machine Code', 'CPU', 'Output'] }),
    mkSlide({ layout: 'mystery', role: 'visualization', title: 'One Tiny File...', question: 'How?', accent: '#c792ea', anim: 'scale-in', bullets: ['Windows', 'Mac', 'Linux', 'Cloud', 'Servers', 'Android'] }),
    mkSlide({ layout: 'myth-vs-reality', role: 'myth-vs-reality', title: 'Busting the Biggest Java Myth', accent: '#7cf8a0', anim: 'fade-up', myth: 'Java is slow.', bullets: ['Modern JVMs interpret bytecode AND compile hot paths', 'JIT (Just-In-Time) compiler optimizes code as it runs', 'HotSpot profiles your program and speeds up frequent paths', 'Real-world benchmarks rival natively compiled languages'] }),
    mkSlide({ layout: 'character', role: 'visualization', title: 'Meet the Cast', subtitle: 'Every component, a character', accent: '#f87cd4', anim: 'fade-up', characters: [{ icon: '👨‍💻', label: 'Programmer' }, { icon: '👷', label: 'Compiler' }, { icon: '📦', label: 'Bytecode' }, { icon: '🧠', label: 'JVM' }, { icon: '⚙️', label: 'CPU' }, { icon: '🖥️', label: 'Output' }] }),
    mkSlide({ layout: 'common-mistake', role: 'common-mistake', title: 'Common Beginner Mistakes', subtitle: 'Learn from these before you make them', accent: '#f87c7c', anim: 'fade-up', bullets: ['Forgot to compile before running', 'Wrong file name (must match public class name)', 'Wrong main() signature', 'Wrong class name when running java command'] }),
    mkSlide({ layout: 'memory-trick', role: 'memory-trick', title: 'JDK vs JRE vs JVM', accent: '#c792ea', anim: 'scale-in', bullets: ['Developer → JDK', 'Runtime → JRE', 'Execution → JVM'] }),
    mkSlide({ layout: 'did-you-know', role: 'did-you-know', calloutIcon: '💡', fact: 'CAFEBABE is the magic number found at the start of every compiled Java .class file.', accent: '#f8d07c', anim: 'scale-in' }),
    mkSlide({ layout: 'challenge', role: 'challenge', question: 'Can you explain the JVM in one sentence?', note: 'Pause the video. Try it out loud before continuing.', accent: '#7cd4f8', anim: 'fade-up' }),
    mkSlide({ layout: 'quiz', role: 'checkpoint', question: 'What does the JVM actually execute?', options: ['Your .java source file directly', 'Machine code compiled ahead of time', 'Platform-independent bytecode (.class files)', 'Python-style interpreted text'], correctIndex: 2, note: 'javac compiles .java into .class bytecode, which the JVM then interprets/JIT-compiles.', accent: '#7c8cf8', anim: 'fade-up' }),
    mkSlide({ layout: 'summary', role: 'summary', title: 'Today You Learned', accent: '#7cf8a0', anim: 'scale-in', bullets: ['Java', 'Compiler', 'Bytecode', 'JVM', 'JDK', 'JRE'] }),
    mkSlide({ layout: 'transition', role: 'transition', subtitle: 'Now that we know how Java runs...', nextTopic: 'Let\'s write our first Java program.', accent: '#7c8cf8', anim: 'fade-up', bullets: ['Hook', 'Problem', 'Prediction', 'Wrong Assumption', 'Story', 'Analogy'] }),
    mkSlide({ layout: 'pipeline', role: 'visualization', title: 'The Java Compilation Pipeline', subtitle: 'Five transforms from your keystroke to CPU output', accent: '#7cd4f8', anim: 'scale-in', bullets: ['Source Code', 'Compile (javac)', 'Load (.class)', 'JIT Compile', 'Execute (CPU)'], callout: 'Your .java file is human-readable · .class bytecode is JVM-readable · machine code is CPU-readable' }),

    mkSlide({ layout: 'hero-split', role: 'hook', title: 'Meet the Explorer', subtitle: 'CSS Animated SVG Character', accent: '#7c8cf8', anim: 'fade-up', bgType: 'space', bullets: ['Smooth CSS keyframe animations', 'Independent body part movements', 'Responsive to accent colors', 'Fully scalable vector graphics'], note: 'Watch the astronaut float, blink, and swing arms!' }),

    mkSlide({ layout: 'glitch-title', role: 'hook', title: 'JVM Internals', subtitle: 'DEEP DIVE · WEEK 2', note: 'Bytecode, Heap, Stack, ClassLoader — let\'s go under the hood', accent: '#7c8cf8', anim: 'scale-in', bgType: 'blob', bullets: ['ClassLoader', 'JIT Compiler', 'GC Engine', 'Thread Scheduler'] }),

    mkSlide({ layout: 'terminal', role: 'visualization', title: 'Compiling & Running Java', subtitle: 'Watch the pipeline in action', accent: '#7cf8a0', anim: 'fade-up', terminalTitle: 'bash — java-teaching', terminalLines: ['javac HelloWorld.java', '  → Parsing source file...', '  → Generating bytecode...', '  ✓ HelloWorld.class written (432 bytes)', '', 'java HelloWorld', '  [JVM] Loading HelloWorld.class', '  [JVM] Verifying bytecode... OK', '  [JIT] Profiling hot methods...', '  [JIT] Compiling run() → native code', '  ✓ Hello, World!'], note: 'javac compiles to bytecode · JVM loads & interprets · JIT compiles hot paths to native machine code' }),

    mkSlide({ layout: 'orbit-diagram', role: 'visualization', title: 'JVM', subtitle: 'Four core components orbiting the execution engine', accent: '#7cd4f8', anim: 'scale-in', bullets: ['ClassLoader', 'Heap Memory', 'Stack Memory', 'JIT Compiler', 'GC Engine', 'Bytecode Verifier'] }),

    mkSlide({ layout: 'bar-chart', role: 'visualization', title: 'Where Does the Time Go?', subtitle: 'Relative cost of common operations', accent: '#7cf8a0', anim: 'fade-up', chartUnit: 'ns', chartData: [{ label: 'L1 Cache', value: 1, color: '#7cf8a0' }, { label: 'RAM', value: 100, color: '#7cd4f8' }, { label: 'SSD', value: 25000, color: '#f8d07c' }, { label: 'Network', value: 10000000, color: '#f87c7c' }] }),

    mkSlide({ layout: 'venn', role: 'comparison', title: 'Checked vs Unchecked Exceptions', accent: '#7cd4f8', anim: 'scale-in', leftLabel: 'Checked', rightLabel: 'Unchecked', leftBullets: ['Must be declared with throws', 'Caught at compile time'], rightBullets: ['Extends RuntimeException', 'Not enforced by compiler'], bullets: ['Both represent something went wrong', 'Both can carry a message + cause'] }),

    mkSlide({ layout: 'stack-visual', role: 'visualization', title: 'The Call Stack', subtitle: 'Watch frames get pushed as methods call methods', accent: '#f87cd4', anim: 'fade-up', bullets: ['main()', 'run()', 'processIt()', 'validate()'] }),

    mkSlide({ layout: 'process-loop', role: 'visualization', title: 'The Event Loop', subtitle: 'A cycle that never stops', accent: '#c792ea', anim: 'scale-in', characters: [{ icon: '📥', label: 'Receive request' }, { icon: '⚙️', label: 'Process' }, { icon: '📤', label: 'Send response' }, { icon: '⏳', label: 'Wait for next' }] }),

    mkSlide({ layout: 'spectrum', role: 'comparison', title: 'Compiled vs Interpreted', subtitle: 'Where does Java actually sit?', accent: '#7c8cf8', anim: 'fade-up', leftLabel: 'Fully Interpreted (Python)', rightLabel: 'Fully Compiled (C)', spectrumPos: 65, spectrumLabel: 'Java (JIT-compiled)' }),

    mkSlide({ layout: 'icon-grid', role: 'visualization', title: 'Core JVM Memory Areas', accent: '#7cf8a0', anim: 'fade-up', characters: [{ icon: '📦', label: 'Heap', desc: 'Objects live here' }, { icon: '📋', label: 'Stack', desc: 'Method frames' }, { icon: '🗂️', label: 'Metaspace', desc: 'Class metadata' }, { icon: '📍', label: 'PC Register', desc: 'Current instruction' }] }),

    mkSlide({ layout: 'image-full', role: 'visualization', title: 'B-Tree Index Structure', imageCaption: 'Each node holds sorted keys + child pointers', accent: '#7cd4f8', anim: 'fade-up', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/B-tree.svg/600px-B-tree.svg.png' }),

    mkSlide({ layout: 'bullets', title: 'JVM Architecture', subtitle: 'What executes your .class file', accent: '#7cd4f8', anim: 'fade-up', bullets: ['ClassLoader — loads, links & initializes classes at runtime', 'Runtime Data Areas — heap, stack, metaspace, PC register', 'Execution Engine — interpreter + JIT compiler (C1/C2)', 'Garbage Collector — G1, ZGC, Shenandoah'] }),

    mkSlide({ layout: 'diagram', title: 'JVM Internals Map', subtitle: 'How the pieces connect', accent: '#7c8cf8', anim: 'slide-right', diagramType: 'jvm' }),

    mkSlide({ layout: 'split', title: 'Stack vs Heap', subtitle: 'Where does memory actually live?', accent: '#7cf8a0', anim: 'slide-right', bullets: ['Stack — fast LIFO, thread-local, stores frames + locals', 'Heap — shared, GC-managed, holds all objects', 'Metaspace — class metadata, replaced PermGen in Java 8', 'GC Roots — where the JVM starts its tracing'], code: `public class MemDemo {\n  static String name = "Java"; // Heap\n\n  public void run() {\n    int count = 0;      // Stack: primitive\n    var sb = new StringBuilder(); // Heap\n    processIt(sb);      // new frame pushed\n  }\n\n  private void processIt(StringBuilder s){\n    // frame: s ref + local vars\n  } // frame popped on return\n}` }),

    mkSlide({ layout: 'compare', title: 'N+1 Problem — Fix It', subtitle: 'Lazy loading vs eager join fetch', accent: '#f8d07c', anim: 'fade-up', leftLabel: '❌ N+1 (Bad)', leftCode: `// 1 query for orders +\n// 1 query PER order = 101 queries!\norders.forEach(order -> {\n  System.out.println(\n    order.getCustomer().getName()\n  );\n});`, rightLabel: '✅ JOIN FETCH (Fix)', rightCode: `// Single query with join\n@Query(\"\"\"\n  SELECT o FROM Order o\n  JOIN FETCH o.customer\n  WHERE o.status = :s\n\"\"\")\nList<Order> findByStatus(String s);` }),

    mkSlide({ layout: 'code', title: 'Thread Safety', subtitle: 'AtomicInteger vs synchronized — which to use?', accent: '#f87cd4', anim: 'fade-up', code: `// ❌ Race condition — not thread-safe!\nint counter = 0;\ncounter++; // read-modify-write: 3 ops\n\n// ✅ Option 1: AtomicInteger (lock-free)\nAtomicInteger counter = new AtomicInteger();\ncounter.incrementAndGet(); // single CAS op\n\n// ✅ Option 2: synchronized block\nsynchronized(this) {\n    counter++;\n}\n\n// ✅ Option 3: LongAdder (high contention)\nLongAdder counter = new LongAdder();\ncounter.increment();\nlong total = counter.sum();` }),

    mkSlide({ layout: 'bullets', title: 'Thread Safety Fundamentals', subtitle: 'Race conditions, happens-before, memory visibility', accent: '#f87cd4', anim: 'scale-in', bullets: ['Race condition — two threads read+write shared state concurrently', 'happens-before — JMM guarantee that write A is visible to read B', 'volatile — forces main-memory read/write, prevents caching', 'synchronized — acquires intrinsic lock, ensures mutual exclusion', 'AtomicInteger — CAS-based lock-free counter (best for counters)'] }),

    mkSlide({ layout: 'timeline', title: 'Request Lifecycle in Spring Boot', subtitle: 'From HTTP packet to JSON response', accent: '#c792ea', anim: 'slide-right', bullets: ['Tomcat receives TCP packet, parses HTTP request', 'DispatcherServlet matched by servlet mapping', 'HandlerMapping finds @RequestMapping method', 'Interceptors run — auth checks, logging, MDC', '@Controller method executes with injected deps', 'HttpMessageConverter serializes return to JSON', 'Response flushed, connection kept or closed'] }),

    mkSlide({ layout: 'diagram', title: 'Spring Security Filter Chain', subtitle: 'Every request passes through this pipeline', accent: '#c792ea', anim: 'slide-right', diagramType: 'security' }),

    mkSlide({ layout: 'terminal', title: 'Docker for Java Devs', subtitle: 'Containerizing a Spring Boot app', accent: '#7c8cf8', anim: 'slide-right', code: `FROM eclipse-temurin:21-jre-alpine\nWORKDIR /app\nCOPY target/myapp.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]` }),

    mkSlide({ layout: 'split', title: 'L1, L2 & Query Cache', subtitle: 'Hibernate caching explained', accent: '#7cf8a0', anim: 'fade-up', bullets: ['L1 Cache (Session level) — enabled by default, tied to the transaction', 'L2 Cache (SessionFactory level) — shared across sessions, requires Ehcache/Redis', 'Query Cache — caches query results (IDs), usually paired with L2 cache'], code: `@Entity\n@Cacheable\n@org.hibernate.annotations.Cache(\n  usage = CacheConcurrencyStrategy.READ_WRITE\n)\npublic class Product {\n  @Id\n  private Long id;\n  private String name;\n}` }),

    mkSlide({ layout: 'bento-grid', role: 'visualization', title: 'Why Use a Bento Grid?', subtitle: 'Apple-style dashboard layouts', accent: '#7cd4f8', anim: 'scale-in', bullets: ['Highlights core features in varying sizes', 'Responsive and highly modular design', 'Focuses the eye on the largest blocks', 'Breaks monotony of standard lists'] }),

    mkSlide({ layout: 'glass-fan', role: 'visualization', title: 'The Glass Fan Layout', subtitle: 'Step through to fan the cards out', accent: '#c792ea', anim: 'fade-up', bullets: ['Card 1: Stacks perfectly on load', 'Card 2: Fans out beautifully on step', 'Card 3: Completes the premium spread'] }),

    mkSlide({ layout: '3d-carousel', role: 'visualization', title: '3D Carousel Depth', subtitle: 'Step through to pull cards forward', accent: '#f87c7c', anim: 'scale-in', bullets: ['Option A: Pushed back in Z-space initially', 'Option B: Comes into focus next', 'Option C: Flies in to complete the carousel'] }),

    mkSlide({ layout: 'cinematic-parallax', role: 'visualization', title: 'Java Microservices', subtitle: 'Scaling up', accent: '#f87cd4', anim: 'fade-up', bgType: 'space', bullets: ['Isolate failure domains', 'Scale independent services', 'Use lightweight gRPC'] }),

    // ═══ REMOTION CINEMATIC MOTION SLIDES ═══
    mkSlide({
      layout: 'title',
      title: 'Java Object-Oriented Programming',
      subtitle: 'Mastering Classes, Objects, Inheritance & Polymorphism in Java',
      accent: '#6366f1',
      anim: 'scale-in',
      bgType: 'space',
      titleStyle: 'gradient',
      badge: 'JAVA MASTERY MOTION STUDIO',
      lessonNum: 'LESSON 01',
      author: 'Java Master Class'
    }),

    mkSlide({
      layout: 'custom-html',
      title: 'The Java Compilation & Execution Pipeline',
      subtitle: 'How Java source code is transformed into bytecode and executed by the JVM',
      accent: '#818cf8',
      anim: 'fade-up',
      bgType: 'data',
      customCss: `
        .pipe-container-remotion {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          margin-top: 50px;
          padding: 0 20px;
        }
        .pipe-line-bg {
          position: absolute;
          top: 50%;
          left: 60px;
          right: 60px;
          height: 4px;
          background: rgba(99, 102, 241, 0.2);
          border-top: 2px dashed #6366f1;
          transform: translateY(-50%);
          z-index: 1;
        }
        .pipe-step-node {
          position: relative;
          z-index: 5;
          width: 200px;
          background: rgba(15, 23, 42, 0.9);
          border: 2px solid rgba(99, 102, 241, 0.3);
          border-radius: 18px;
          padding: 24px 16px;
          text-align: center;
          backdrop-filter: blur(12px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.5);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
          transform: scale(0.7) translateY(30px);
        }
        .pipe-step-node.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          border-color: #6366f1;
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.25);
        }
        .pipe-step-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin: 0 auto 14px auto;
        }
      `,
      customHtml: `
        <div style="padding: 40px; text-align: center;">
          <span style="color:#818cf8; font-size:13px; font-weight:800; letter-spacing:3px; text-transform:uppercase;">COMPILER ARCHITECTURE</span>
          <h2 style="font-size:42px; font-weight:900; color:#ffffff; margin:8px 0;">The Java Compilation & Execution Pipeline</h2>
          <p style="font-size:18px; color:#94a3b8; margin:0 0 20px 0;">Step-by-step transformation from source code to hardware execution</p>
          
          <div class="pipe-container-remotion">
            <div class="pipe-line-bg"></div>
            <div class="pipe-step-node step-item" data-idx="0">
              <div class="pipe-step-icon">📄</div>
              <div style="font-size:18px; font-weight:800; color:#ffffff;">Java Source</div>
              <div style="font-size:13px; color:#94a3b8; margin-top:4px;">Main.java</div>
              <div style="margin-top:12px; font-size:11px; font-weight:700; color:#6366f1; background:rgba(99,102,241,0.15); padding:3px 8px; border-radius:10px; display:inline-block;">STEP 1</div>
            </div>

            <div class="pipe-step-node step-item" data-idx="1">
              <div class="pipe-step-icon" style="background:rgba(236,72,153,0.15); border-color:rgba(236,72,153,0.4);">⚙️</div>
              <div style="font-size:18px; font-weight:800; color:#ffffff;">javac Compiler</div>
              <div style="font-size:13px; color:#94a3b8; margin-top:4px;">Syntax & AST</div>
              <div style="margin-top:12px; font-size:11px; font-weight:700; color:#ec4899; background:rgba(236,72,153,0.15); padding:3px 8px; border-radius:10px; display:inline-block;">STEP 2</div>
            </div>

            <div class="pipe-step-node step-item" data-idx="2">
              <div class="pipe-step-icon" style="background:rgba(139,92,246,0.15); border-color:rgba(139,92,246,0.4);">📦</div>
              <div style="font-size:18px; font-weight:800; color:#ffffff;">Bytecode</div>
              <div style="font-size:13px; color:#94a3b8; margin-top:4px;">Main.class</div>
              <div style="margin-top:12px; font-size:11px; font-weight:700; color:#8b5cf6; background:rgba(139,92,246,0.15); padding:3px 8px; border-radius:10px; display:inline-block;">STEP 3</div>
            </div>

            <div class="pipe-step-node step-item" data-idx="3">
              <div class="pipe-step-icon" style="background:rgba(16,185,129,0.15); border-color:rgba(16,185,129,0.4);">🚀</div>
              <div style="font-size:18px; font-weight:800; color:#ffffff;">JVM Engine</div>
              <div style="font-size:13px; color:#94a3b8; margin-top:4px;">JIT & Interpreter</div>
              <div style="margin-top:12px; font-size:11px; font-weight:700; color:#10b981; background:rgba(16,185,129,0.15); padding:3px 8px; border-radius:10px; display:inline-block;">STEP 4</div>
            </div>

            <div class="pipe-step-node step-item" data-idx="4">
              <div class="pipe-step-icon" style="background:rgba(245,158,11,0.15); border-color:rgba(245,158,11,0.4);">💻</div>
              <div style="font-size:18px; font-weight:800; color:#ffffff;">Machine Code</div>
              <div style="font-size:13px; color:#94a3b8; margin-top:4px;">x86 / ARM Binary</div>
              <div style="margin-top:12px; font-size:11px; font-weight:700; color:#f59e0b; background:rgba(245,158,11,0.15); padding:3px 8px; border-radius:10px; display:inline-block;">STEP 5</div>
            </div>
          </div>
        </div>
      `
    }),

    mkSlide({
      layout: 'compare',
      title: 'Primitive Types vs Reference Types',
      subtitle: 'Understanding memory allocation, passing conventions, and default values in Java',
      accent: '#10b981',
      anim: 'fade-up',
      leftLabel: 'Primitive Types (Stack)',
      leftSubtitle: 'int, double, boolean, char',
      leftBullets: [
        'Stores actual value directly in Stack memory',
        'Fixed memory footprint (e.g., int = 32 bits)',
        'Passed by Value (copy of primitive content)',
        'Cannot be null; initialized with default zero values'
      ],
      rightLabel: 'Reference Types (Heap)',
      rightSubtitle: 'Objects, Arrays, Strings, Classes',
      rightBullets: [
        'Stores memory address pointer pointing to Heap',
        'Dynamic size allocated dynamically via "new"',
        'Passed by Value of Reference (copy of address)',
        'Can be null; throws NullPointerException if uninitialized'
      ]
    }),

    mkSlide({
      layout: 'custom-html',
      title: 'Live Object Instantiation & Memory Layout',
      subtitle: 'Tracing code execution line-by-line with real-time Call Stack and Heap allocations',
      accent: '#a855f7',
      anim: 'fade-up',
      bgType: 'space',
      customCss: `
        .mem-grid-container {
          display: flex;
          gap: 28px;
          height: 420px;
          padding: 0 20px;
        }
        .mem-code-box {
          flex: 1.2;
          background: #0d1117;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .mem-card-box {
          flex: 0.8;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .mem-stack-card, .mem-heap-card {
          background: rgba(15, 23, 42, 0.85);
          border-radius: 16px;
          padding: 18px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
          transform: scale(0.8);
        }
        .mem-stack-card.visible, .mem-heap-card.visible {
          opacity: 1;
          transform: scale(1);
        }
      `,
      customHtml: `
        <div style="padding: 20px 30px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <div>
              <span style="color:#a855f7; font-size:12px; font-weight:800; letter-spacing:2px; text-transform:uppercase;">LIVE MEMORY ENGINE</span>
              <h2 style="font-size:32px; font-weight:900; color:#ffffff; margin:4px 0 0 0;">Object Instantiation & Memory Layout</h2>
            </div>
          </div>

          <div class="mem-grid-container">
            <div class="mem-code-box">
              <div style="background:#161b22; padding:10px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(255,255,255,0.08);">
                <div style="width:10px; height:10px; border-radius:50%; background:#ff5f56;"></div>
                <div style="width:10px; height:10px; border-radius:50%; background:#ffbd2e;"></div>
                <div style="width:10px; height:10px; border-radius:50%; background:#27c93f;"></div>
                <span style="font-family:'JetBrains Mono',monospace; font-size:12px; color:#8b949e; margin-left:8px;">Student.java</span>
              </div>
              <div style="padding:16px; font-family:'JetBrains Mono',monospace; font-size:15px; line-height:1.7; overflow:auto;">
                <div class="code-line visible" data-idx="0"><span style="color:#484f58; width:24px; display:inline-block;">1</span> <span style="color:#ff7b72;">public class</span> <span style="color:#ffa657;">Student</span> {</div>
                <div class="code-line visible" data-idx="1"><span style="color:#484f58; width:24px; display:inline-block;">2</span>   <span style="color:#ff7b72;">private</span> String name; <span style="color:#ff7b72;">private int</span> id;</div>
                <div class="code-line visible" data-idx="2"><span style="color:#484f58; width:24px; display:inline-block;">3</span>   <span style="color:#ff7b72;">public</span> <span style="color:#d2a8ff;">Student</span>(String name, <span style="color:#ff7b72;">int</span> id) {</div>
                <div class="code-line visible" data-idx="3"><span style="color:#484f58; width:24px; display:inline-block;">4</span>     <span style="color:#79c0ff;">this</span>.name = name; <span style="color:#79c0ff;">this</span>.id = id;</div>
                <div class="code-line visible" data-idx="4"><span style="color:#484f58; width:24px; display:inline-block;">5</span>   }</div>
                <div class="code-line visible" data-idx="5"><span style="color:#484f58; width:24px; display:inline-block;">6</span>   <span style="color:#ff7b72;">public static void</span> <span style="color:#d2a8ff;">main</span>(String[] args) {</div>
                <div class="code-line step-item" data-idx="6" style="background:rgba(168,85,247,0.18); border-left:3px solid #a855f7; padding-left:4px;"><span style="color:#484f58; width:24px; display:inline-block;">7</span>     Student s1 = <span style="color:#ff7b72;">new</span> <span style="color:#d2a8ff;">Student</span>(<span style="color:#a5d6ff;">"Alice"</span>, <span style="color:#79c0ff;">101</span>);</div>
                <div class="code-line step-item" data-idx="7"><span style="color:#484f58; width:24px; display:inline-block;">8</span>     System.out.println(s1.name);</div>
                <div class="code-line visible" data-idx="8"><span style="color:#484f58; width:24px; display:inline-block;">9</span>   }</div>
                <div class="code-line visible" data-idx="9"><span style="color:#484f58; width:24px; display:inline-block;">10</span> }</div>
              </div>
            </div>

            <div class="mem-card-box">
              <div class="mem-stack-card step-item" data-idx="10" style="border:1px solid rgba(59,130,246,0.4); box-shadow:0 10px 25px rgba(59,130,246,0.15);">
                <div style="font-size:12px; font-weight:800; color:#60a5fa; letter-spacing:1px; margin-bottom:8px;">CALL STACK (LIFO FRAME)</div>
                <div style="background:rgba(59,130,246,0.12); border:1px dashed rgba(59,130,246,0.4); border-radius:8px; padding:10px;">
                  <div style="font-weight:700; color:#93c5fd; font-size:14px;">main() Frame</div>
                  <div style="font-family:'JetBrains Mono',monospace; font-size:12px; color:#e2e8f0; margin-top:4px;">• s1 ➔ <span style="color:#60a5fa; font-weight:700;">0x4A2B</span></div>
                </div>
              </div>

              <div class="mem-heap-card step-item" data-idx="11" style="border:1px solid rgba(168,85,247,0.4); box-shadow:0 10px 25px rgba(168,85,247,0.15);">
                <div style="font-size:12px; font-weight:800; color:#c084fc; letter-spacing:1px; margin-bottom:8px;">HEAP MEMORY ALLOCATION</div>
                <div style="background:rgba(168,85,247,0.12); border:1px solid rgba(168,85,247,0.4); border-radius:8px; padding:10px;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <span style="font-weight:800; color:#e9d5ff; font-size:14px;">Student Object</span>
                    <span style="font-family:'JetBrains Mono',monospace; font-size:12px; color:#c084fc;">0x4A2B</span>
                  </div>
                  <div style="font-family:'JetBrains Mono',monospace; font-size:12px; color:#cbd5e1;">└ name: "Alice"</div>
                  <div style="font-family:'JetBrains Mono',monospace; font-size:12px; color:#cbd5e1;">└ id: 101</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    }),


    // ═══════════════════════════════════════════════════════════════════════
    // PART 2 — WHAT IS OOP?
    // ═══════════════════════════════════════════════════════════════════════

    // Slide A: Scene 2.1 — Dog in Park (Properties & Behaviors)
    mkSlide({
    role: 'visualization',
    title: 'Scene 2.1 — What is an Object?',
    subtitle: 'Every real-world entity has Properties (data) and Behaviors (actions)',
    layout: 'object-breakdown',
    accent: '#7c8cf8',
    icon: 'dog',
    properties: [
      { key: 'name', val: '"Bruno"' },
      { key: 'breed', val: '"Labrador"' },
      { key: 'color', val: '"Black"' },
      { key: 'age', val: '3' }
    ],
    behaviors: [
      { method: 'bark()', result: '"Woof!"' },
      { method: 'eat(food)', result: 'nom nom' },
      { method: 'fetch(ball)', result: 'returns ball' }
    ]
  }),

    // Slide B: Scene 2.3 — Car / ATM / Dog real-world object grid
    mkSlide({
    role: 'visualization',
    title: 'Scene 2.3 — Objects Are Everywhere',
    subtitle: 'Any real-world entity with state and behavior can be modelled as an object',
    layout: 'object-grid',
    accent: '#7c8cf8',
    cards: [
      {
        title: 'Car Object',
        icon: 'car',
        color: '#7c8cf8',
        props: [
          { key: 'brand', val: '"Tesla"' },
          { key: 'speed', val: '120 km/h' },
          { key: 'drive()', val: 'accelerates' }
        ]
      },
      {
        title: 'ATM Machine',
        icon: 'atm',
        color: '#4fd1ff',
        props: [
          { key: 'balance', val: '$5,000' },
          { key: 'status', val: '"ONLINE"' },
          { key: 'withdraw()', val: 'dispenses cash' }
        ]
      },
      {
        title: 'Labrador Dog',
        icon: 'dog',
        color: '#00ff9d',
        props: [
          { key: 'name', val: '"Bruno"' },
          { key: 'energy', val: '95%' },
          { key: 'bark()', val: '"Woof!"' }
        ]
      }
    ]
  }),

    // Slide C: Scene 2.5 — Factory Assembly Line (Procedural Tight Coupling)
    mkSlide({
    role: 'visualization',
    title: 'Scene 2.5 — Procedural Code Assembly Line',
    subtitle: 'Data flows step-by-step through global functions like a conveyor belt',
    layout: 'assembly-line',
    accent: '#f59e0b',
    callout: '⚡ Procedural Pipeline Data Flow: Read -> Process -> Validate -> Save',
    stations: [
      { label: 'Step 1: Read Data', icon: 'document', action: 'readFromDB()', color: '#f59e0b' },
      { label: 'Step 2: Process', icon: 'gear', action: 'computeTax()', color: '#f59e0b' },
      { label: 'Step 3: Validate', icon: 'wrench', action: 'checkLimits()', color: '#f59e0b' },
      { label: 'Step 4: Save Result', icon: 'impact', action: 'saveToDisk()', color: '#ef4444' }
    ]
  }),

    // Slide D: Scene 2.6 — Domino Effect (Tight Coupling Chain Reaction)
    mkSlide({
    role: 'visualization',
    title: 'Scene 2.6 — The Procedural Domino Effect',
    subtitle: 'Functions operate directly on global variables with zero isolation boundaries',
    layout: 'domino-effect',
    accent: '#ef4444',
    dominoes: [
      { fnName: 'readData()', text: 'Reads global raw input', isBroken: false },
      { fnName: 'compute()', text: 'Modifies shared state', isBroken: false },
      { fnName: 'saveData()', text: 'Writes to database', isBroken: false },
      { fnName: '💥 CRASH', text: 'Modifying one fn breaks whole chain!', isBroken: true }
    ]
  }),

    // Slide E: Scene 2.8 — Procedural vs OOP Comparison
    mkSlide({
      layout: 'compare',
      title: 'Procedural vs Object-Oriented Programming',
      subtitle: 'Understanding why OOP was invented to solve real-world software problems',
      accent: '#7c8cf8',
      anim: 'fade-up',
      leftLabel: '❌ Procedural Programming',
      leftBullets: [
        'Data and functions are completely separate',
        'Global data can be modified by any function',
        'Tight coupling — change one, break many',
        'Hard to scale beyond ~1000 lines of code',
        'No reuse — copy-paste duplicated logic everywhere'
      ],
      rightLabel: '✅ Object-Oriented Programming',
      rightBullets: [
        'Data and methods bundled together in objects',
        'Data protected via encapsulation (private fields)',
        'Loosely coupled — objects communicate via interfaces',
        'Scales to millions of lines (Android, Spring, JVM itself)',
        'Reuse via inheritance and polymorphism'
      ]
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // PART 3 — CLASSES AND OBJECTS
    // ═══════════════════════════════════════════════════════════════════════

    // Slide F: Scene 3.3 — Blueprint → 3 Houses (Class to Objects)
    mkSlide({
    role: 'visualization',
    title: 'Scene 3.3 — The Blueprint & The Houses',
    subtitle: 'One Class blueprint in code creates infinite concrete House instances in RAM memory',
    layout: 'blueprint-houses',
    accent: '#00ff9d',
    blueprintTitle: 'class HouseBlueprint',
    instances: [
      { name: 'house1', address: '@0x101', color: '#7c8cf8' },
      { name: 'house2', address: '@0x102', color: '#4fd1ff' },
      { name: 'house3', address: '@0x103', color: '#f59e0b' }
    ]
  }),

    // Slide G: Scene 3.8 — Heap Memory Boxes
    mkSlide({
      layout: 'custom-html',
      title: 'Scene 3.8 — Heap Memory: Where Objects Live',
      subtitle: 'Every "new" keyword allocates a fresh memory block on the Heap with independent data',
      accent: '#7c8cf8',
      anim: 'fade-up',
      customCss: `
        .heap-stage { position:relative; width:100%; height:100%; background:#0b0d14; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; padding:30px; }
        .heap-label { font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#4fd1ff; border:1px solid rgba(79,209,255,0.3); padding:5px 16px; border-radius:20px; }
        .heap-boxes { display:flex; gap:20px; }
        .heap-box { background:rgba(124,140,248,0.08); border:1px solid rgba(124,140,248,0.3); border-radius:14px; padding:18px 20px; min-width:180px; transition:all .5s cubic-bezier(.34,1.56,.64,1); }
        .heap-box.visible { border-color:#7c8cf8; box-shadow:0 0 30px rgba(124,140,248,0.2); transform:translateY(-4px); }
        .heap-box-header { font-family:'Space Grotesk',sans-serif; font-size:13px; font-weight:800; color:#7c8cf8; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
        .heap-addr { font-family:'JetBrains Mono',monospace; font-size:11px; color:#4fd1ff; }
        .heap-row { font-family:'JetBrains Mono',monospace; font-size:12px; color:#94a3b8; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
        .heap-row b { color:#e2e8f0; }
        .heap-code { font-family:'JetBrains Mono',monospace; font-size:12px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px 16px; color:#94a3b8; line-height:1.8; max-width:500px; }
      `,
      customHtml: `
        <div class="heap-stage">
          <div class="heap-label">HEAP MEMORY</div>
          <div class="heap-boxes">
            <div class="heap-box step-item" data-idx="0">
              <div class="heap-box-header">${getSvgIcon("avatar","#7c8cf8",20)} engineeringStudent <span class="heap-addr">0x1A2B</span></div>
              <div class="heap-row">name = <b>"Alice"</b></div>
              <div class="heap-row">age = <b>21</b></div>
              <div class="heap-row">branch = <b>"CS"</b></div>
              <div class="heap-row">gpa = <b>9.1</b></div>
            </div>
            <div class="heap-box step-item" data-idx="1">
              <div class="heap-box-header">${getSvgIcon("avatar","#4fd1ff",20)} mbaStudent <span class="heap-addr">0x3C4D</span></div>
              <div class="heap-row">name = <b>"Bob"</b></div>
              <div class="heap-row">age = <b>24</b></div>
              <div class="heap-row">branch = <b>"MBA"</b></div>
              <div class="heap-row">gpa = <b>8.4</b></div>
            </div>
            <div class="heap-box step-item" data-idx="2">
              <div class="heap-box-header">${getSvgIcon("avatar","#00ff9d",20)} csStudent <span class="heap-addr">0x5E6F</span></div>
              <div class="heap-row">name = <b>"Carol"</b></div>
              <div class="heap-row">age = <b>22</b></div>
              <div class="heap-row">branch = <b>"CS"</b></div>
              <div class="heap-row">gpa = <b>9.7</b></div>
            </div>
          </div>
          <div class="heap-code step-item" data-idx="3">
            <span style="color:#7c8cf8;">Student</span> engineeringStudent = <span style="color:#00ff9d;">new</span> <span style="color:#7c8cf8;">Student</span>(<span style="color:#f59e0b;">"Alice"</span>, 21);<br>
            <span style="color:#7c8cf8;">Student</span> mbaStudent = <span style="color:#00ff9d;">new</span> <span style="color:#7c8cf8;">Student</span>(<span style="color:#f59e0b;">"Bob"</span>, 24);<br>
            <span style="color:#7c8cf8;">Student</span> csStudent = <span style="color:#00ff9d;">new</span> <span style="color:#7c8cf8;">Student</span>(<span style="color:#f59e0b;">"Carol"</span>, 22);
          </div>
        </div>
      `
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // PART 4 — THE FOUR PILLARS
    // ═══════════════════════════════════════════════════════════════════════

    // Slide H: Scene 4.1 — Four Pillars Rising
    mkSlide({
    role: 'visualization',
    title: 'Scene 4.1 — The Four Pillars of OOP',
    subtitle: 'Every Java technical interview tests your deep understanding of these four pillars',
    layout: 'pillars-rising',
    accent: '#7c8cf8',
    pillars: [
      { name: 'Abstraction', icon: 'mask', desc: 'Hiding internal complexity behind clean public contracts', color: '#7c8cf8' },
      { name: 'Encapsulation', icon: 'capsule', desc: 'Bundling state & behavior; protecting data with private access', color: '#00ff9d' },
      { name: 'Inheritance', icon: 'tree', desc: 'Reusing state & behavior via hierarchical class parentage', color: '#4fd1ff' },
      { name: 'Polymorphism', icon: 'chameleon', desc: 'One interface, many concrete dynamic implementations', color: '#f59e0b' }
    ]
  }),

    // Slide I: Scene 4.9 — Access Modifiers Concentric Circles
    mkSlide({
    role: 'visualization',
    title: 'Scene 4.9 — Access Modifiers & Privacy Scopes',
    subtitle: 'Encapsulation controls exactly who can view or mutate your class fields',
    layout: 'access-circles',
    accent: '#00ff9d',
    levels: [
      { level: 'public', desc: 'Accessible from ANY package or class anywhere in the application', color: '#00ff9d' },
      { level: 'protected', desc: 'Accessible inside same package AND all subclasses', color: '#4fd1ff' },
      { level: 'default (package-private)', desc: 'Accessible ONLY inside the exact same package', color: '#f59e0b' },
      { level: 'private', desc: 'Accessible ONLY within the defining class itself', color: '#ef4444' }
    ]
  }),

    // Slide J: Scene 4.12 — Vehicle → Car → ElectricCar Hierarchy
    mkSlide({
      layout: 'custom-html',
      title: 'Scene 4.12 — Inheritance: Vehicle → Car → ElectricCar',
      subtitle: 'Child classes inherit all non-private members of their parent class automatically',
      accent: '#4fd1ff',
      anim: 'fade-up',
      customCss: `
        .inherit-stage { position:relative; width:100%; height:100%; background:#0b0d14; display:flex; align-items:center; justify-content:center; padding:30px; }
        .inherit-tree { display:flex; flex-direction:column; align-items:center; gap:0; }
        .inherit-box { background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,255,255,0.12); border-radius:14px; padding:16px 28px; min-width:280px; text-align:center; transition:all .5s cubic-bezier(.34,1.56,.64,1); opacity:0; transform:scale(0.85); }
        .inherit-box.visible { opacity:1; transform:scale(1); }
        .inherit-box-name { font-family:'Space Grotesk',sans-serif; font-size:16px; font-weight:800; margin-bottom:8px; }
        .inherit-members { font-family:'JetBrains Mono',monospace; font-size:12px; color:#64748b; text-align:left; line-height:1.8; }
        .inherited { color:#4fd1ff !important; }
        .arrow-wrap { display:flex; flex-direction:column; align-items:center; gap:2px; padding:6px 0; }
        .inherit-arrow { width:2px; height:24px; background:rgba(79,209,255,0.5); }
        .extends-badge { font-family:'JetBrains Mono',monospace; font-size:11px; color:#4fd1ff; background:rgba(79,209,255,0.1); border:1px solid rgba(79,209,255,0.3); border-radius:6px; padding:2px 8px; }
      `,
      customHtml: `
        <div class="inherit-stage">
          <div class="inherit-tree">
            <div class="inherit-box step-item" data-idx="0" style="border-color:rgba(124,140,248,0.5); background:rgba(124,140,248,0.08);">
              <div class="inherit-box-name" style="color:#7c8cf8;display:flex;align-items:center;justify-content:center;gap:6px;">${getSvgIcon("car","#7c8cf8",22)} Vehicle</div>
              <div class="inherit-members">
                <div><span style="color:#7c8cf8;">String</span> brand;</div>
                <div><span style="color:#7c8cf8;">int</span> speed;</div>
                <div><span style="color:#00ff9d;">void</span> move() {}</div>
                <div><span style="color:#00ff9d;">void</span> stop() {}</div>
              </div>
            </div>
            <div class="arrow-wrap step-item" data-idx="1">
              <div class="inherit-arrow"></div>
              <div class="extends-badge">extends ↑</div>
              <div class="inherit-arrow"></div>
            </div>
            <div class="inherit-box step-item" data-idx="2" style="border-color:rgba(79,209,255,0.5); background:rgba(79,209,255,0.06);">
              <div class="inherit-box-name" style="color:#4fd1ff;display:flex;align-items:center;justify-content:center;gap:6px;">${getSvgIcon("car","#4fd1ff",22)} Car extends Vehicle</div>
              <div class="inherit-members">
                <div class="inherited">↳ brand, speed, move(), stop()</div>
                <div><span style="color:#4fd1ff;">int</span> doors;</div>
                <div><span style="color:#00ff9d;">void</span> openDoor() {}</div>
              </div>
            </div>
            <div class="arrow-wrap step-item" data-idx="3">
              <div class="inherit-arrow"></div>
              <div class="extends-badge">extends ↑</div>
              <div class="inherit-arrow"></div>
            </div>
            <div class="inherit-box step-item" data-idx="4" style="border-color:rgba(0,255,157,0.5); background:rgba(0,255,157,0.06);">
              <div class="inherit-box-name" style="color:#00ff9d;display:flex;align-items:center;justify-content:center;gap:6px;">${getSvgIcon("ev","#00ff9d",22)} ElectricCar extends Car</div>
              <div class="inherit-members">
                <div class="inherited">↳ brand, speed, doors, move(), openDoor()</div>
                <div><span style="color:#00ff9d;">int</span> batteryLevel;</div>
                <div><span style="color:#00ff9d;">void</span> charge() {}</div>
              </div>
            </div>
          </div>
        </div>
      `
    }),

    // Slide K: Scene 4.14 — Four Inheritance Types
    mkSlide({
      layout: 'custom-html',
      title: 'Scene 4.14 — The Four Types of Inheritance in Java',
      subtitle: 'Java supports 3 valid types. Multiple inheritance with classes is intentionally blocked.',
      accent: '#7c8cf8',
      anim: 'fade-up',
      customCss: `
        .itypes-stage { position:relative; width:100%; height:100%; background:#0b0d14; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:20px; padding:24px 32px; }
        .itype-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px 20px; display:flex; flex-direction:column; gap:10px; transition:all .5s cubic-bezier(.34,1.56,.64,1); opacity:0; transform:scale(0.9); }
        .itype-card.visible { opacity:1; transform:scale(1); }
        .itype-name { font-family:'Space Grotesk',sans-serif; font-size:13px; font-weight:800; text-transform:uppercase; letter-spacing:1px; }
        .itype-diagram { display:flex; align-items:center; gap:8px; flex-wrap:wrap; justify-content:center; }
        .inode { background:rgba(124,140,248,0.15); border:1.5px solid rgba(124,140,248,0.5); border-radius:8px; padding:5px 12px; font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700; color:#7c8cf8; }
        .inode.red { background:rgba(239,68,68,0.1); border-color:rgba(239,68,68,0.5); color:#ef4444; }
        .iarrow { color:rgba(124,140,248,0.7); font-size:18px; }
        .itype-desc { font-family:'Inter',sans-serif; font-size:12px; color:#64748b; }
      `,
      customHtml: `
        <div class="itypes-stage">
          <div class="itype-card step-item" data-idx="0" style="border-color:rgba(124,140,248,0.3);">
            <div class="itype-name" style="color:#7c8cf8;">① Single Inheritance</div>
            <div class="itype-diagram"><div class="inode">A</div><div class="iarrow">→</div><div class="inode">B</div></div>
            <div class="itype-desc">One class inherits one parent. Most common pattern. ✅ Allowed</div>
          </div>
          <div class="itype-card step-item" data-idx="1" style="border-color:rgba(0,255,157,0.3);">
            <div class="itype-name" style="color:#00ff9d;">② Multilevel Inheritance</div>
            <div class="itype-diagram"><div class="inode">A</div><div class="iarrow">→</div><div class="inode">B</div><div class="iarrow">→</div><div class="inode">C</div></div>
            <div class="itype-desc">Grandparent → Parent → Child chain. ✅ Allowed</div>
          </div>
          <div class="itype-card step-item" data-idx="2" style="border-color:rgba(79,209,255,0.3);">
            <div class="itype-name" style="color:#4fd1ff;">③ Hierarchical Inheritance</div>
            <div class="itype-diagram">
              <div style="display:flex;flex-direction:column;gap:6px;align-items:center;">
                <div class="inode">A</div>
                <div style="display:flex;gap:16px;"><div class="iarrow">↙</div><div class="iarrow">↘</div></div>
                <div style="display:flex;gap:12px;"><div class="inode">B</div><div class="inode">C</div></div>
              </div>
            </div>
            <div class="itype-desc">One parent, multiple children. ✅ Allowed</div>
          </div>
          <div class="itype-card step-item" data-idx="3" style="border-color:rgba(239,68,68,0.5); background:rgba(239,68,68,0.05);">
            <div class="itype-name" style="color:#ef4444;">④ Multiple Inheritance ⛔</div>
            <div class="itype-diagram">
              <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                <div style="display:flex;gap:12px;"><div class="inode red">A</div><div class="inode red">B</div></div>
                <div style="display:flex;gap:16px;"><div class="iarrow" style="color:#ef4444;">↘</div><div class="iarrow" style="color:#ef4444;">↙</div></div>
                <div class="inode red">C ❓</div>
              </div>
            </div>
            <div class="itype-desc">NOT allowed with classes — Diamond Problem! Use interfaces instead.</div>
          </div>
        </div>
      `
    }),

    // Slide L: Scene 4.18 — Polymorphism Branch Diagram
    mkSlide({
      layout: 'custom-html',
      title: 'Scene 4.18 — Polymorphism: Two Powerful Forms',
      subtitle: 'Polymorphism means "many forms" — the same method name behaves differently based on context',
      accent: '#f59e0b',
      anim: 'fade-up',
      customCss: `
        .poly-stage { position:relative; width:100%; height:100%; background:#0b0d14; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px; padding:30px; }
        .poly-center { background:rgba(245,158,11,0.1); border:2px solid rgba(245,158,11,0.6); border-radius:16px; padding:16px 32px; text-align:center; box-shadow:0 0 30px rgba(245,158,11,0.2); }
        .poly-center-name { font-family:'Space Grotesk',sans-serif; font-size:18px; font-weight:900; color:#f59e0b; }
        .poly-branches { display:flex; gap:40px; width:100%; max-width:860px; }
        .poly-branch { flex:1; display:flex; flex-direction:column; align-items:center; gap:12px; }
        .poly-line { width:2px; height:30px; }
        .poly-card { width:100%; background:rgba(255,255,255,0.04); border:1.5px solid; border-radius:14px; padding:18px 20px; text-align:center; transition:all .5s cubic-bezier(.34,1.56,.64,1); opacity:0; transform:translateY(20px); }
        .poly-card.visible { opacity:1; transform:translateY(0); }
        .poly-card-name { font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px; }
        .poly-card-timing { font-family:'JetBrains Mono',monospace; font-size:12px; padding:3px 10px; border-radius:8px; display:inline-block; margin-bottom:10px; }
        .poly-card-desc { font-family:'Inter',sans-serif; font-size:13px; color:#94a3b8; line-height:1.5; }
        .poly-example { font-family:'JetBrains Mono',monospace; font-size:12px; background:rgba(0,0,0,0.3); border-radius:6px; padding:8px 12px; margin-top:8px; text-align:left; }
      `,
      customHtml: `
        <div class="poly-stage">
          <div class="poly-center step-item" data-idx="0">
            <div class="poly-center-name" style="display:flex;align-items:center;justify-content:center;gap:8px;">${getSvgIcon("chameleon","#f59e0b",28)} POLYMORPHISM</div>
            <div style="font-family:'Inter',sans-serif; font-size:13px; color:#92400e; margin-top:4px;">Many Forms — Same Interface</div>
          </div>
          <div class="poly-branches">
            <div class="poly-branch">
              <div class="poly-line" style="background:rgba(124,140,248,0.5);"></div>
              <div class="poly-card step-item" data-idx="1" style="border-color:rgba(124,140,248,0.5);">
                <div class="poly-card-name" style="color:#7c8cf8;">Method Overloading</div>
                <div class="poly-card-timing" style="background:rgba(124,140,248,0.15); color:#7c8cf8;">⏰ Compile-Time (Static)</div>
                <div class="poly-card-desc">Same method name, different parameters. Resolved by compiler based on argument type/count.</div>
                <div class="poly-example">
                  <span style="color:#00ff9d;">add</span>(int a, int b)<br>
                  <span style="color:#00ff9d;">add</span>(double a, double b)<br>
                  <span style="color:#00ff9d;">add</span>(String a, String b)
                </div>
              </div>
            </div>
            <div class="poly-branch">
              <div class="poly-line" style="background:rgba(0,255,157,0.5);"></div>
              <div class="poly-card step-item" data-idx="2" style="border-color:rgba(0,255,157,0.5);">
                <div class="poly-card-name" style="color:#00ff9d;">Method Overriding</div>
                <div class="poly-card-timing" style="background:rgba(0,255,157,0.15); color:#00ff9d;">⚡ Runtime (Dynamic)</div>
                <div class="poly-card-desc">Child redefines parent's method. JVM decides which version to call at runtime via virtual dispatch.</div>
                <div class="poly-example">
                  <span style="color:#7c8cf8;">Animal</span>.sound() → ???<br>
                  <span style="color:#4fd1ff;">Dog</span>.sound() → "Woof"<br>
                  <span style="color:#f59e0b;">Cat</span>.sound() → "Meow"
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    }),

    // Slide M: Scene 4.23 — Dynamic Dispatch Reveal (THE MAGIC MOMENT)
    mkSlide({
      layout: 'custom-html',
      title: 'Scene 4.23 — Dynamic Dispatch: The JVM Magic',
      subtitle: 'At runtime, JVM resolves the ACTUAL object type and calls the correct overridden method',
      accent: '#00ff9d',
      anim: 'fade-up',
      customCss: `
        .dispatch-stage { position:relative; width:100%; height:100%; background:#0b0d14; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; padding:24px 40px; }
        .dispatch-refs { display:flex; gap:16px; }
        .dispatch-ref { background:rgba(124,140,248,0.08); border:1.5px solid rgba(124,140,248,0.35); border-radius:10px; padding:10px 18px; font-family:'JetBrains Mono',monospace; font-size:13px; color:#7c8cf8; text-align:center; transition:all .4s; }
        .dispatch-ref.visible { border-color:#7c8cf8; box-shadow:0 0 20px rgba(124,140,248,0.2); }
        .dispatch-jvm { background:rgba(245,158,11,0.12); border:2px solid rgba(245,158,11,0.6); border-radius:16px; padding:12px 28px; font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:800; color:#f59e0b; text-align:center; box-shadow:0 0 30px rgba(245,158,11,0.2); }
        .dispatch-objects { display:flex; gap:20px; }
        .dispatch-obj { background:rgba(0,255,157,0.06); border:1.5px solid rgba(0,255,157,0.3); border-radius:12px; padding:14px 20px; text-align:center; transition:all .5s cubic-bezier(.34,1.56,.64,1); opacity:0; transform:scale(0.8); }
        .dispatch-obj.visible { opacity:1; transform:scale(1); border-color:rgba(0,255,157,0.7); box-shadow:0 0 25px rgba(0,255,157,0.2); }
        .dispatch-icon { font-size:30px; margin-bottom:6px; }
        .dispatch-method { font-family:'JetBrains Mono',monospace; font-size:12px; color:#00ff9d; }
        .dispatch-code { font-family:'JetBrains Mono',monospace; font-size:12px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 16px; color:#94a3b8; line-height:1.8; max-width:600px; width:100%; }
      `,
      customHtml: `
        <div class="dispatch-stage">
          <div class="dispatch-code step-item" data-idx="0">
            <span style="color:#7c8cf8;">Animal</span> a1 = <span style="color:#00ff9d;">new</span> <span style="color:#4fd1ff;">Dog</span>();&nbsp;&nbsp;&nbsp;<span style="color:#484f58;">// Animal ref → Dog object</span><br>
            <span style="color:#7c8cf8;">Animal</span> a2 = <span style="color:#00ff9d;">new</span> <span style="color:#4fd1ff;">Cat</span>();&nbsp;&nbsp;&nbsp;<span style="color:#484f58;">// Animal ref → Cat object</span><br>
            <span style="color:#7c8cf8;">Animal</span> a3 = <span style="color:#00ff9d;">new</span> <span style="color:#4fd1ff;">Duck</span>();&nbsp;&nbsp;<span style="color:#484f58;">// Animal ref → Duck object</span>
          </div>
          <div class="dispatch-refs">
            <div class="dispatch-ref step-item" data-idx="1">Animal a1</div>
            <div class="dispatch-ref step-item" data-idx="1">Animal a2</div>
            <div class="dispatch-ref step-item" data-idx="1">Animal a3</div>
          </div>
          <div class="dispatch-jvm step-item" data-idx="2">⚡ JVM Virtual Dispatch Engine — resolves at RUNTIME</div>
          <div class="dispatch-objects">
            <div class="dispatch-obj step-item" data-idx="3">
              <div class="dispatch-icon">${getSvgIcon("dog","#00ff9d",32)}</div>
              <div class="dispatch-method">Dog.sound() → "Woof!"</div>
            </div>
            <div class="dispatch-obj step-item" data-idx="3">
              <div class="dispatch-icon">${getSvgIcon("avatar","#4fd1ff",32)}</div>
              <div class="dispatch-method">Cat.sound() → "Meow!"</div>
            </div>
            <div class="dispatch-obj step-item" data-idx="3">
              <div class="dispatch-icon">${getSvgIcon("avatar","#f59e0b",32)}</div>
              <div class="dispatch-method">Duck.sound() → "Quack!"</div>
            </div>
          </div>
        </div>
      `
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // PART 5 — OOP RELATIONSHIPS
    // ═══════════════════════════════════════════════════════════════════════

    // Slide N: Scene 5.2/5.3 — IS-A vs HAS-A Relationships
    mkSlide({
      layout: 'compare',
      title: 'IS-A vs HAS-A: The Two OOP Relationships',
      subtitle: 'Every object relationship in Java is either an IS-A (inheritance) or HAS-A (composition)',
      accent: '#4fd1ff',
      anim: 'fade-up',
      leftLabel: 'IS-A (Inheritance)',
      leftBullets: [
        'Car IS-A Vehicle → use extends keyword',
        'Dog IS-A Animal → Dog inherits Animal members',
        'ElectricCar IS-A Car → transitive chain works',
        'Use when child is a specialised version of parent',
        'Test: replace child with parent — still makes sense?'
      ],
      rightLabel: 'HAS-A (Composition / Aggregation)',
      rightBullets: [
        'Car HAS-A Engine → composition via field reference',
        'School HAS-A Students → aggregation (students exist independently)',
        'Library HAS-A Books → dependency, not inheritance',
        'Use when the relationship is "contains" not "is a type of"',
        'Prefer HAS-A over IS-A for flexibility (favor composition)'
      ]
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // PART 7 — OOP MINDMAP SUMMARY
    // ═══════════════════════════════════════════════════════════════════════

    // Slide O: Scene 7.1 — OOP Mindmap Summary
    mkSlide({
    role: 'comparison',
    title: 'Scene 8.1 — Abstract Class vs Interface Matrix',
    subtitle: 'Architectural comparison between Abstract Classes and Interfaces in Java',
    layout: 'matrix-compare',
    accent: '#7c8cf8',
    col1Header: 'Abstract Class (abstract class)',
    col2Header: 'Interface (interface)',
    rows: [
      { feature: 'Inheritance Type', val1: 'Single Inheritance (extends 1 class)', val2: 'Multiple Inheritance (implements N interfaces)' },
      { feature: 'State / Fields', val1: 'Can hold instance state fields (mutable)', val2: 'Only public static final constants' },
      { feature: 'Constructor', val1: 'Has constructors for super() call', val2: 'No constructors allowed' },
      { feature: 'Method Types', val1: 'Abstract & concrete methods with body', val2: 'Abstract, default, and static methods' },
      { feature: 'Lookup Speed', val1: 'Fast vtable index dispatch', val2: 'itable search dispatch' }
    ]
  }),

  

    // ═══════════════════════════════════════════════════════════════════════
    // PART 8 — ADVANCED TOPICS & DESIGN PATTERNS
    // ═══════════════════════════════════════════════════════════════════════

    // Slide 67: Scene 8.1 — Abstract Class vs Interface Matrix
    mkSlide({
      layout: 'custom-html',
      title: 'Scene 8.1 — Abstract Class vs Interface Matrix',
      subtitle: 'Understanding when to inherit state vs when to contract capabilities',
      accent: '#7c8cf8',
      anim: 'fade-up',
      customCss: `
        .matrix-stage { position:relative; width:100%; height:100%; background:#0b0d14; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; padding:30px; }
        .matrix-table { width:100%; max-width:880px; border-collapse:separate; border-spacing:0 8px; font-family:'Inter',sans-serif; }
        .matrix-th { font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:800; text-transform:uppercase; letter-spacing:1px; padding:12px 16px; text-align:left; color:#f5f5f4; }
        .matrix-row { background:rgba(255,255,255,0.03); border-radius:10px; transition:all .4s; opacity:0; transform:translateY(15px); }
        .matrix-row.visible { opacity:1; transform:translateY(0); }
        .matrix-td { padding:14px 16px; font-size:13px; color:#cbd5e1; border-top:1px solid rgba(255,255,255,0.06); border-bottom:1px solid rgba(255,255,255,0.06); }
        .matrix-td:first-child { border-left:1px solid rgba(255,255,255,0.06); border-radius:10px 0 0 10px; font-weight:700; color:#7c8cf8; font-family:'JetBrains Mono',monospace; }
        .matrix-td:last-child { border-right:1px solid rgba(255,255,255,0.06); border-radius:0 10px 10px 0; }
        .m-badge { display:inline-block; font-size:11px; font-weight:800; padding:2px 8px; border-radius:6px; font-family:'JetBrains Mono',monospace; }
      `,
      customHtml: `
        <div class="matrix-stage">
          <table class="matrix-table">
            <thead>
              <tr>
                <th class="matrix-th" style="width:22%;">Feature</th>
                <th class="matrix-th" style="width:39%; color:#7c8cf8;">Abstract Class</th>
                <th class="matrix-th" style="width:39%; color:#00ff9d;">Interface</th>
              </tr>
            </thead>
            <tbody>
              <tr class="matrix-row step-item" data-idx="0">
                <td class="matrix-td">State / Fields</td>
                <td class="matrix-td">Can have instance state (fields, constructors)</td>
                <td class="matrix-td">No instance fields (only <span class="m-badge" style="background:rgba(0,255,157,0.15);color:#00ff9d;">static final</span> constants)</td>
              </tr>
              <tr class="matrix-row step-item" data-idx="1">
                <td class="matrix-td">Inheritance</td>
                <td class="matrix-td">Single inheritance (<span class="m-badge" style="background:rgba(124,140,248,0.15);color:#7c8cf8;">extends 1 class</span>)</td>
                <td class="matrix-td">Multiple inheritance (<span class="m-badge" style="background:rgba(0,255,157,0.15);color:#00ff9d;">implements N</span>)</td>
              </tr>
              <tr class="matrix-row step-item" data-idx="2">
                <td class="matrix-td">Methods</td>
                <td class="matrix-td">Abstract + concrete methods with access modifiers</td>
                <td class="matrix-td">Abstract, <span class="m-badge" style="background:rgba(79,209,255,0.15);color:#4fd1ff;">default</span>, <span class="m-badge" style="background:rgba(79,209,255,0.15);color:#4fd1ff;">static</span> & private methods</td>
              </tr>
              <tr class="matrix-row step-item" data-idx="3">
                <td class="matrix-td">Speed / Overhead</td>
                <td class="matrix-td">Faster method invocation (direct vtable lookups)</td>
                <td class="matrix-td">Slight ITable lookup overhead in JVM</td>
              </tr>
              <tr class="matrix-row step-item" data-idx="4">
                <td class="matrix-td">Use Case</td>
                <td class="matrix-td">Share code & identity among closely related objects</td>
                <td class="matrix-td">Contract capabilities across unrelated classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }),

    // Slide 68: Scene 8.2 — Exception Handling Call Stack Unwrap
    mkSlide({
      layout: 'custom-html',
      title: 'Scene 8.2 — Exception Propagation & Call Stack Unwinding',
      subtitle: 'How JVM unwinds stack frames until a matching catch block is found',
      accent: '#ef4444',
      anim: 'fade-up',
      customCss: `
        .exc-stage { position:relative; width:100%; height:100%; background:#0b0d14; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; padding:30px; }
        .exc-stack { display:flex; flex-direction:column-reverse; gap:10px; width:100%; max-width:600px; }
        .exc-frame { background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,255,255,0.12); border-radius:12px; padding:14px 20px; display:flex; justify-content:space-between; align-items:center; transition:all .5s cubic-bezier(.34,1.56,.64,1); font-family:'JetBrains Mono',monospace; }
        .exc-frame.visible { border-color:#ef4444; background:rgba(239,68,68,0.12); box-shadow:0 0 25px rgba(239,68,68,0.25); }
        .exc-fn { font-size:14px; font-weight:700; color:#f87c7c; }
        .exc-tag { font-size:11px; padding:3px 10px; border-radius:6px; background:rgba(239,68,68,0.2); color:#ef4444; border:1px solid #ef4444; }
        .exc-banner { background:rgba(0,255,157,0.1); border:1px solid rgba(0,255,157,0.4); border-radius:12px; padding:14px 28px; font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:700; color:#00ff9d; text-align:center; }
      `,
      customHtml: `
        <div class="exc-stage">
          <div style="font-family:'Space Grotesk',sans-serif; font-size:13px; font-weight:800; color:#ef4444; letter-spacing:2px; text-transform:uppercase;">JVM CALL STACK UNWINDING</div>
          <div class="exc-stack">
            <div class="exc-frame step-item" data-idx="0">
              <span class="exc-fn">main()</span>
              <span class="exc-tag" style="background:rgba(0,255,157,0.15);color:#00ff9d;border-color:#00ff9d;">try { process() } catch(IOException e) ✅</span>
            </div>
            <div class="exc-frame step-item" data-idx="1">
              <span class="exc-fn">processData()</span>
              <span class="exc-tag">No Handler — Unwinds ⬆</span>
            </div>
            <div class="exc-frame step-item" data-idx="2">
              <span class="exc-fn">readFile()</span>
              <span class="exc-tag">No Handler — Unwinds ⬆</span>
            </div>
            <div class="exc-frame step-item" data-idx="3">
              <span class="exc-fn" style="color:#ef4444;">openStream()</span>
              <span class="exc-tag" style="background:#ef4444;color:#fff;">throw new FileNotFoundException()</span>
            </div>
          </div>
          <div class="exc-banner step-item" data-idx="4">Exception caught in main()! finally block executes next.</div>
        </div>
      `
    }),

    // Slide 69: Scene 8.3 — Garbage Collection Generations
    mkSlide({
      layout: 'custom-html',
      title: 'Scene 8.3 — JVM Garbage Collection & Memory Generations',
      subtitle: 'Weak Generational Hypothesis: Most objects die young in Eden Space',
      accent: '#00ff9d',
      anim: 'fade-up',
      customCss: `
        .gc-stage { position:relative; width:100%; height:100%; background:#0b0d14; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px; padding:30px; }
        .gc-heap { display:flex; gap:20px; width:100%; max-width:880px; }
        .gc-zone { flex:1; background:rgba(255,255,255,0.03); border:1.5px solid rgba(255,255,255,0.1); border-radius:16px; padding:18px; display:flex; flex-direction:column; gap:12px; transition:all .5s cubic-bezier(.34,1.56,.64,1); opacity:0; transform:scale(0.9); }
        .gc-zone.visible { opacity:1; transform:scale(1); }
        .gc-header { font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:800; text-transform:uppercase; letter-spacing:1px; text-align:center; }
        .gc-sub { font-family:'JetBrains Mono',monospace; font-size:11px; color:#64748b; text-align:center; }
        .gc-box-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:6px; }
        .gc-obj { height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; color:#fff; }
      `,
      customHtml: `
        <div class="gc-stage">
          <div class="gc-heap">
            <div class="gc-zone step-item" data-idx="0" style="border-color:rgba(0,255,157,0.4); background:rgba(0,255,157,0.05);">
              <div class="gc-header" style="color:#00ff9d;display:flex;align-items:center;justify-content:center;gap:6px;">${getSvgIcon("sprout","#00ff9d",18)} Young Generation (Eden)</div>
              <div class="gc-sub">New objects allocated here</div>
              <div class="gc-box-grid">
                <div class="gc-obj" style="background:#00ff9d;color:#000;">obj1</div>
                <div class="gc-obj" style="background:#00ff9d;color:#000;">obj2</div>
                <div class="gc-obj" style="background:rgba(255,255,255,0.1);color:#64748b;">dead</div>
              </div>
            </div>
            <div class="gc-zone step-item" data-idx="1" style="border-color:rgba(79,209,255,0.4); background:rgba(79,209,255,0.05);">
              <div class="gc-header" style="color:#4fd1ff;display:flex;align-items:center;justify-content:center;gap:6px;">${getSvgIcon("loop","#4fd1ff",18)} Survivor Spaces (S0 / S1)</div>
              <div class="gc-sub">Survived Minor GC cycles</div>
              <div class="gc-box-grid">
                <div class="gc-obj" style="background:#4fd1ff;color:#000;">age: 3</div>
                <div class="gc-obj" style="background:#4fd1ff;color:#000;">age: 5</div>
              </div>
            </div>
            <div class="gc-zone step-item" data-idx="2" style="border-color:rgba(124,140,248,0.4); background:rgba(124,140,248,0.05);">
              <div class="gc-header" style="color:#7c8cf8;display:flex;align-items:center;justify-content:center;gap:6px;">${getSvgIcon("vault","#7c8cf8",18)} Old Generation (Tenured)</div>
              <div class="gc-sub">Promoted long-lived objects</div>
              <div class="gc-box-grid">
                <div class="gc-obj" style="background:#7c8cf8;">Cache</div>
                <div class="gc-obj" style="background:#7c8cf8;">Session</div>
              </div>
            </div>
          </div>
          <div class="gc-zone step-item" data-idx="3" style="width:100%;max-width:880px;border-color:rgba(245,158,11,0.4);background:rgba(245,158,11,0.08);flex-direction:row;align-items:center;justify-content:space-between;padding:14px 24px;">
            <span style="font-family:'Space Grotesk',sans-serif;font-weight:800;color:#f59e0b;display:flex;align-items:center;gap:6px;">${getSvgIcon("sweep","#f59e0b",20)} Minor GC vs Major/Full GC</span>
            <span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#cbd5e1;">Minor GC = Stop-the-world (ms) · Full GC = Collects Old Gen (Longer pause)</span>
          </div>
        </div>
      `
    }),

    // Slide 70: Scene 8.4 — Thread Synchronization & Monitor Lock
    mkSlide({
      layout: 'custom-html',
      title: 'Scene 8.4 — Thread Concurrency & Intrinsic Locks',
      subtitle: 'Only one thread can hold an object\'s monitor lock inside a synchronized block',
      accent: '#f59e0b',
      anim: 'fade-up',
      customCss: `
        .sync-stage { position:relative; width:100%; height:100%; background:#0b0d14; display:flex; align-items:center; justify-content:center; gap:40px; padding:30px; }
        .sync-lock-box { background:rgba(245,158,11,0.12); border:2px solid #f59e0b; border-radius:18px; padding:24px 36px; text-align:center; box-shadow:0 0 30px rgba(245,158,11,0.25); min-width:240px; }
        .sync-threads { display:flex; flex-direction:column; gap:14px; }
        .sync-thread { background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,255,255,0.1); border-radius:12px; padding:14px 20px; display:flex; align-items:center; gap:12px; min-width:260px; transition:all .5s cubic-bezier(.34,1.56,.64,1); opacity:0; transform:translateX(-20px); }
        .sync-thread.visible { opacity:1; transform:translateX(0); }
        .st-name { font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700; }
        .st-status { font-family:'Space Grotesk',sans-serif; font-size:11px; font-weight:800; padding:3px 10px; border-radius:6px; margin-left:auto; }
      `,
      customHtml: `
        <div class="sync-stage">
          <div class="sync-lock-box step-item" data-idx="0">
            <div>${getSvgIcon("lock","#f59e0b",48)}</div>
            <div style="font-family:'Space Grotesk',sans-serif; font-size:16px; font-weight:900; color:#f59e0b; margin-top:8px;">MONITOR LOCK</div>
            <div style="font-family:'JetBrains Mono',monospace; font-size:11px; color:#94a3b8; margin-top:4px;">synchronized(this)</div>
          </div>
          <div class="sync-threads">
            <div class="sync-thread step-item" data-idx="1" style="border-color:#00ff9d; background:rgba(0,255,157,0.1);">
              <span>${getSvgIcon("thread","#00ff9d",22)}</span>
              <span class="st-name" style="color:#00ff9d;">Thread-1</span>
              <span class="st-status" style="background:rgba(0,255,157,0.2);color:#00ff9d;border:1px solid #00ff9d;">RUNNING (Lock Acquired)</span>
            </div>
            <div class="sync-thread step-item" data-idx="2" style="border-color:#ef4444; background:rgba(239,68,68,0.1);">
              <span>${getSvgIcon("thread","#00ff9d",22)}</span>
              <span class="st-name" style="color:#ef4444;">Thread-2</span>
              <span class="st-status" style="background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid #ef4444;">BLOCKED (Waiting)</span>
            </div>
            <div class="sync-thread step-item" data-idx="3" style="border-color:#ef4444; background:rgba(239,68,68,0.1);">
              <span>${getSvgIcon("thread","#00ff9d",22)}</span>
              <span class="st-name" style="color:#ef4444;">Thread-3</span>
              <span class="st-status" style="background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid #ef4444;">BLOCKED (Waiting)</span>
            </div>
          </div>
        </div>
      `
    }),

    // Slide 71: Scene 8.5 — SOLID Principles Overview
    mkSlide({
    role: 'summary',
    title: 'Scene 8.5 — S.O.L.I.D. Principles Master Summary',
    subtitle: 'The 5 foundational object-oriented design principles for clean, scalable code',
    layout: 'solid-summary',
    accent: '#00ff9d',
    principles: [
      { letter: 'S', name: 'Single Responsibility Principle', desc: 'A class should have one, and only one, reason to change.', color: '#7c8cf8' },
      { letter: 'O', name: 'Open/Closed Principle', desc: 'Software entities should be open for extension, but closed for modification.', color: '#4fd1ff' },
      { letter: 'L', name: 'Liskov Substitution Principle', desc: 'Subtypes must be substitutable for their base types without altering correctness.', color: '#00ff9d' },
      { letter: 'I', name: 'Interface Segregation Principle', desc: 'Clients should not be forced to depend on methods they do not use.', color: '#f59e0b' },
      { letter: 'D', name: 'Dependency Inversion Principle', desc: 'Depend upon abstractions, not concrete implementations.', color: '#c792ea' }
    ]
  }),

]);
}
