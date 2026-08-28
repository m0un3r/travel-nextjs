const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site');
const categories = ['cities', 'nature', 'adventure', 'honeymoon', 'wildlife'];

categories.forEach(cat => {
  const file = path.join(ROOT, 'categories', cat, 'index.html');
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    // Find all tour links inside this category page
    const tourLinks = [...html.matchAll(/href="\.\.\/\.\.\/tours\/([^"]+)"/g)].map(m => m[1]);
    const uniqueTours = [...new Set(tourLinks)];
    console.log(`Category: ${cat.toUpperCase()} (${uniqueTours.length} tours) ->`, uniqueTours);
  }
});
