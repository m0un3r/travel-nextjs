const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '../../cloned_site/index.html'), 'utf8');

// Search for drawer, menu overlay, navigation links
const navMatches = [...indexHtml.matchAll(/<nav[\s\S]*?<\/nav>/gi)].map(m => m[0]);
console.log('Nav tags count:', navMatches.length);

// Look for overlay / menu modal / drawer in indexHtml or any mjs
const menuMatches = [...indexHtml.matchAll(/data-framer-name="([^"]*Menu[^"]*|[^"]*Drawer[^"]*|[^"]*Overlay[^"]*|[^"]*Mobile[^"]*)"/gi)].map(m => m[1]);
console.log('Framer names matching Menu/Drawer/Overlay/Mobile:', [...new Set(menuMatches)]);

// Look for all navigation links across all pages
const allLinks = [...indexHtml.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({
  href: m[1],
  text: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}));

console.log('Navigation links in index.html count:', allLinks.length);
console.log('Unique nav link destinations:', [...new Set(allLinks.map(l => l.href))]);
