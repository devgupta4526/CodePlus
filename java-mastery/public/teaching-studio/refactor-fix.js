const fs = require('fs');

const js = fs.readFileSync('test-extracted.js', 'utf8');

const sections = js.split(/(\/\/\s*═══[^\n]+)/g);

const blocks = {};
for (let i = 1; i < sections.length; i += 2) {
  const header = sections[i];
  const content = sections[i+1];
  blocks[header.trim()] = header + content;
}

const fileMapping = {
  'js/state.js': [
    '// ═══ STATE ════════════════════════════════════════════════════════════════',
    '// ═══ DOM REFS ═════════════════════════════════════════════════════════════',
    '// ═══ SLIDE FACTORY ════════════════════════════════════════════════════════',
    '// ═══ DEFAULT DECK ═════════════════════════════════════════════════════════'
  ],
  'js/canvas.js': [
    '// ═══ CANVAS SETUP ═════════════════════════════════════════════════════════',
    '// ═══ BACKGROUND + ANIMATED BG ENGINE ═════════════════════════════════════',
    '// ═══ RENDER ═══════════════════════════════════════════════════════════════',
    '// ═══ STEP REVEAL ══════════════════════════════════════════════════════════',
    '// ═══ NAVIGATION ═══════════════════════════════════════════════════════════'
  ],
  'js/draw-tools.js': [
    '// ═══ DRAWING ══════════════════════════════════════════════════════════════'
  ],
  'js/sidebar.js': [
    '// ═══ UI UPDATES ═══════════════════════════════════════════════════════════'
  ],
  'js/editor.js': [
    '// ═══ EDITOR ═══════════════════════════════════════════════════════════════',
    '// ═══ JSON IMPORT / EXPORT ═════════════════════════════════════════════════'
  ],
  'js/present.js': [
    '// ═══ PRESENTATION MODE ════════════════════════════════════════════════════'
  ],
  'js/app.js': [
    '// ═══ SHORTCUTS PANEL ══════════════════════════════════════════════════════',
    '// ═══ TOOL BUTTONS ═════════════════════════════════════════════════════════',
    '// ═══ KEYBOARD ═════════════════════════════════════════════════════════════',
    '// ═══ INIT ═════════════════════════════════════════════════════════════════'
  ]
};

for (const [file, headers] of Object.entries(fileMapping)) {
  let out = '';
  if (file === 'js/state.js') {
    out += sections[0]; // prepend globals
  }
  for (const h of headers) {
    if (blocks[h]) {
      out += blocks[h];
    } else {
      console.warn('Missing block for header:', h);
    }
  }
  fs.writeFileSync(file, out.trim() + '\n');
  console.log('Created ' + file);
}

const html = fs.readFileSync('java-teaching-studio.html', 'utf8');

// The original HTML had the script block starting from line 346: `<script>`
// And ending at `</script>\n</body>\n</html>`
// I'll trim everything from `<script>` at line 346 to the end.

const lines = html.split('\n');
const cleanLines = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '<script>') {
    break; // stop collecting lines
  }
  cleanLines.push(lines[i]);
}

const scriptTags = Object.keys(fileMapping).map(f => `<script src="${f}"></script>`).join('\n');

const finalHtml = cleanLines.join('\n') + '\n' +
  scriptTags + '\n' +
  '</body>\n</html>\n';

fs.writeFileSync('java-teaching-studio.html', finalHtml);
console.log('Fixed java-teaching-studio.html');
