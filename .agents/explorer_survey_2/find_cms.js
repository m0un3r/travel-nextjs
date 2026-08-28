const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz');
const files = fs.readdirSync(ROOT);

console.log('Searching for structured CMS data in .mjs files...');

files.forEach(file => {
  if (file.endsWith('.mjs')) {
    const content = fs.readFileSync(path.join(ROOT, file), 'utf8');
    
    // Look for CMS data records or arrays
    if (content.includes('Arjun Mehta') || content.includes('Priya & Rohan Mehta') || content.includes('Cherry Blossoms of Kyoto')) {
      console.log(`\n================ MODULE: ${file} (length: ${content.length}) ================`);
      // Look for string literals or JSON-like objects
      const tours = [...content.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
      if (tours.length) console.log('Titles found:', tours);
    }
  }
});
