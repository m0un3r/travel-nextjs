const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../../cloned_site/assets/images');
const files = fs.readdirSync(imgDir);
console.log(`Total images/svgs in assets/images: ${files.length}`);

const extensions = {};
files.forEach(f => {
  const ext = path.extname(f).toLowerCase();
  extensions[ext] = (extensions[ext] || 0) + 1;
});
console.log('Breakdown by file extension:', extensions);

// Check sizes
let totalSize = 0;
let largeFiles = [];
files.forEach(f => {
  const stat = fs.statSync(path.join(imgDir, f));
  totalSize += stat.size;
  if (stat.size > 500000) {
    largeFiles.push({ file: f, sizeMB: (stat.size / 1024 / 1024).toFixed(2) });
  }
});
console.log(`Total images size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Files > 500KB: ${largeFiles.length}`, largeFiles);
