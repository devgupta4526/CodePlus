const fs = require('fs');
let lines = fs.readFileSync('e:/Development/motion slides/js/state.js', 'utf8').split('\n');

// Find the line that has 'mkSlide({layout:'venn''
let badStart = lines.findIndex(l => l.includes('mkSlide({layout:\'venn\''));
if (badStart !== -1) {
    let goodLines = lines.slice(0, badStart);
    goodLines.push('  ];');
    goodLines.push('}');
    goodLines.push('');
    fs.writeFileSync('e:/Development/motion slides/js/state.js', goodLines.join('\n'));
    console.log('Fixed state.js');
} else {
    console.log('Could not find badStart');
}
