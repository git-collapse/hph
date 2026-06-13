const fs = require('fs');
const files = [
  './src/app/challenges/page.tsx',
  './src/app/visualizer/page.tsx',
  './src/app/dashboard/page.tsx',
  './src/app/playground/page.tsx',
  './src/app/projects/[id]/ProjectClient.tsx',
  './src/app/dashboard/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(f, content);
});
