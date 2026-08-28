const fs = require('fs');
const path = require('path');

const scriptMain = fs.readFileSync(path.join(__dirname, '../../cloned_site/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz/script_main.O6xM-HsT.mjs'), 'utf8');

// Look for routes or component mappings
console.log('Script main length:', scriptMain.length);
console.log('Snippet of script_main (first 1000):', scriptMain.substring(0, 1000));

// Find routes mapping
const routesMatch = scriptMain.match(/routes:\s*\{[\s\S]*?\}/);
if (routesMatch) {
  console.log('Routes match:', routesMatch[0]);
}
