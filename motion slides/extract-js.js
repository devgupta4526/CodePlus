const fs = require('fs');
const html = fs.readFileSync('java-teaching-studio.html', 'utf8');
const jsBlocks = html.match(/<script>([\s\S]*?)<\/script>/gi);
if (jsBlocks) {
  let combined = jsBlocks.map(b => b.replace(/<\/?script>/ig, '')).join('\n');
  fs.writeFileSync('test-extracted.js', combined);
  console.log("Extracted JS");
}
