const fs = require('fs');

const p = 'cloned_site/traveler-stories/index.html';
const html = fs.readFileSync(p, 'utf8');

// Let's parse all reviews
// In traveler-stories, we have cards with Category, Quote, Story, Author, Tour
let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
const textNodes = (clean.match(/>([^<]+)</g) || [])
    .map(m => m.replace(/^>|<$/g, '').trim())
    .filter(t => t.length > 0 && !t.startsWith('{') && !t.includes('__framer'));

console.log('Total text nodes:', textNodes.length);
console.log(textNodes);
