const fs = require('fs');
const files = [
  './src/app/learn/[courseId]/[moduleId]/[lessonId]/LessonClient.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(f, content);
});
