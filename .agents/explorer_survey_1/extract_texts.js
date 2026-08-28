const fs = require('fs');

function extractHtmlTexts(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    // Remove scripts, styles, svg tags
    let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
    
    // Extract text nodes
    const matches = clean.match(/>([^<]+)</g);
    if (!matches) return [];
    
    const lines = matches
        .map(m => m.replace(/^>|<$/g, '').trim())
        .filter(t => t.length > 0 && !t.startsWith('{') && !t.includes('__framer'));
    
    return [...new Set(lines)];
}

console.log('--- TRAVELER STORIES TEXTS ---');
console.log(extractHtmlTexts('cloned_site/traveler-stories/index.html'));

console.log('--- HOMEPAGE TEXTS (SAMPLE) ---');
const homeTexts = extractHtmlTexts('cloned_site/index.html');
console.log(homeTexts.slice(0, 100));
