const fs = require('fs');

const html = fs.readFileSync('cloned_site/index.html', 'utf8');

// Find font family references
const fontMatches = html.match(/font-family:[^;"]+/gi) || [];
console.log('Font families found in index.html:', [...new Set(fontMatches)].slice(0, 20));

// Find hex color codes
const hexMatches = html.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || [];
const colorCounts = {};
hexMatches.forEach(c => {
    const norm = c.toLowerCase();
    colorCounts[norm] = (colorCounts[norm] || 0) + 1;
});

const topColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]).slice(0, 30);
console.log('Top colors in index.html:', topColors);
