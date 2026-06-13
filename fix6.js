const fs = require('fs');
const files = [
  './src/app/course/[courseId]/page.tsx',
  './src/app/learn/[courseId]/[moduleId]/[lessonId]/page.tsx',
  './src/app/admin/page.tsx',
  './src/app/page.tsx',
  './src/app/profile/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(f, content);
});
