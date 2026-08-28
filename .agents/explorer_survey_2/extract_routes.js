const fs = require('fs');
const path = require('path');

const scriptMain = fs.readFileSync(path.join(__dirname, '../../cloned_site/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz/script_main.O6xM-HsT.mjs'), 'utf8');

// Find all routes
const routeDefs = [...scriptMain.matchAll(/path:\s*"([^"]+)"/g)].map(m => m[1]);
console.log('All routes in script_main:', routeDefs);

// Find all titles or page names
const titleDefs = [...scriptMain.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
console.log('All titles in script_main:', titleDefs);
