const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz');
const files = fs.readdirSync(ROOT);

console.log('Total files:', files.length);
files.forEach(f => {
  if (f.endsWith('.mjs')) {
    const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
    // Search for component names or nav overlay
    const compMatches = [...code.matchAll(/displayName\s*=\s*"([^"]+)"/g)].map(m => m[1]);
    if (compMatches.length) {
      console.log(`Module: ${f} -> DisplayNames:`, compMatches);
    }
  }
});
