const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz');

function inspectFile(filename) {
  const code = fs.readFileSync(path.join(ROOT, filename), 'utf8');
  console.log(`\n=== Inspecting ${filename} ===`);
  
  // Extract all string literals of length > 20
  const strings = [...code.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)]
    .map(m => m[1])
    .filter(s => s.length > 15 && !s.startsWith('data:') && !s.includes('http') && !s.includes('calc('));
    
  console.log('Sample extracted strings (first 30):', strings.slice(0, 30));
}

inspectFile('k_YzKY6ij.CrnrMfbU.mjs');
inspectFile('o_Gohu8dl7Y0CmirC2wCV0w21sbNisehHrItKJkFW1c.C--3-b0K.mjs');
inspectFile('rLhJm0Ad0ZdAZ0WP4Xgdvy2BsLXtNcvDmqHW1GD2zOo.BhoicXpc.mjs');
