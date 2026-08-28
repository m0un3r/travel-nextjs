const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz');
const files = fs.readdirSync(ROOT);

files.forEach(f => {
  if (f.endsWith('.mjs')) {
    const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (code.includes('data-framer-name="Menu"') || code.includes('>Menu<') || code.includes('"Menu"')) {
      console.log(`Found Menu in module: ${f}`);
      // Find nearby text or navigation items in this module
      const links = [...code.matchAll(/href:\s*({[^}]+}|"[^"]+")/g)].map(m => m[1]);
      console.log('  hrefs:', links.slice(0, 10));
    }
  }
});
