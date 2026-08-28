const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site');
const locDir = path.join(ROOT, 'location');
const locations = fs.readdirSync(locDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

locations.forEach(loc => {
  const file = path.join(locDir, loc, 'index.html');
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    const tourLinks = [...html.matchAll(/href="\.\.\/\.\.\/tours\/([^"]+)"/g)].map(m => m[1]);
    const uniqueTours = [...new Set(tourLinks)];
    console.log(`Location: ${loc.toUpperCase()} (${uniqueTours.length} tours) ->`, uniqueTours);
  }
});
