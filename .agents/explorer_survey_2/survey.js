const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '../../cloned_site/index.html'), 'utf8');

// Find all sections
const sectionMatches = [...indexHtml.matchAll(/<section[^>]*data-framer-name="([^"]+)"[^>]*>/g)];
console.log('=== SECTIONS IN INDEX.HTML ===');
sectionMatches.forEach(m => console.log(m[0]));

// Find all links
const linkMatches = [...indexHtml.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
const uniqueLinks = [...new Set(linkMatches)];
console.log('\n=== UNIQUE LINKS ===');
console.log(uniqueLinks);

// Let's find text in navigation
console.log('\n=== NAV / HEADER HTML SNIPPET ===');
const navMatch = indexHtml.match(/<nav[\s\S]*?<\/nav>/g);
if (navMatch) {
  navMatch.forEach((n, i) => console.log(`--- Nav variant ${i} --- length: ${n.length}`));
}
