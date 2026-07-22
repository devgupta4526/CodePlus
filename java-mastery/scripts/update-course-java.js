const fs = require('fs');
let content = fs.readFileSync('src/data/course.ts', 'utf8');
content = content.replace(/\{\s+title:/g, '{\n    course: \'java\',\n    title:');
fs.writeFileSync('src/data/course.ts', content);
