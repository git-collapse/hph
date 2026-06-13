const fs = require('fs');
const files = [
  './src/app/leaderboard/page.tsx',
  './src/app/community/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(f, content);
});
