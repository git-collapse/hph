const fs = require('fs');
const files = [
  './src/app/achievements/page.tsx',
  './src/app/roadmap/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(f, content);
});
