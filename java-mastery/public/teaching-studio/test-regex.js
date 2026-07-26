const fs = require('fs');
const js = fs.readFileSync('test-extracted.js', 'utf8');
const sections = js.split(/(\/\/\s*═══[^\n]+)/g);
console.log("Sections count:", sections.length);
if (sections.length > 1) {
  console.log("First header:", sections[1]);
} else {
  // Let's see what the headers actually look like
  const matches = js.match(/\/\/.*/g);
  console.log("Sample comments:", matches ? matches.slice(0, 20) : "none");
}
