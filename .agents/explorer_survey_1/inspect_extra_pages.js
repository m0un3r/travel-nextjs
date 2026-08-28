const fs = require('fs');

function inspectPage(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const html = fs.readFileSync(filePath, 'utf8');
    let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
    const textNodes = (clean.match(/>([^<]+)</g) || [])
        .map(m => m.replace(/^>|<$/g, '').trim())
        .filter(t => t.length > 0 && !t.startsWith('{') && !t.includes('__framer'));
    return [...new Set(textNodes)];
}

console.log('--- ABOUT PAGE ---');
console.log(inspectPage('cloned_site/about/index.html'));

console.log('--- CONTACT PAGE ---');
console.log(inspectPage('cloned_site/contact/index.html'));
