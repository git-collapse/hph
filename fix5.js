const fs = require('fs');
const files = [
  './src/app/courses/page.tsx',
  './src/app/challenges/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(f, content);
});
