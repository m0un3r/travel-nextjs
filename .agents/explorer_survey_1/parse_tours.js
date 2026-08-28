const fs = require('fs');
const path = require('path');

function parseAllTourFullContent() {
    const tourDirs = fs.readdirSync('cloned_site/tours').filter(d => fs.statSync(path.join('cloned_site/tours', d)).isDirectory());
    const catalog = {};

    tourDirs.forEach(slug => {
        const p = path.join('cloned_site/tours', slug, 'index.html');
        if (!fs.existsSync(p)) return;
        const html = fs.readFileSync(p, 'utf8');

        // Extract title
        const titleMatch = html.match(/<title>([^<]+)<\/title>/);
        const title = titleMatch ? titleMatch[1].replace(/ — Travelio.*$/, '').replace(/ - Travelio.*$/, '').trim() : slug;

        // Meta description
        const descMatch = html.match(/name="description"\s+content="([^"]+)"/) || html.match(/content="([^"]+)"\s+name="description"/);
        const desc = descMatch ? descMatch[1] : '';

        // Extract clean text lines
        let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
        const textNodes = (clean.match(/>([^<]+)</g) || [])
            .map(m => m.replace(/^>|<$/g, '').trim())
            .filter(t => t.length > 0 && !t.startsWith('{') && !t.includes('__framer'));

        // Identify category
        const categories = ['Cities', 'Nature', 'Adventure', 'Honeymoon', 'Wildlife'];
        let category = 'Adventure';
        for (const cat of categories) {
            if (textNodes.includes(cat)) {
                category = cat;
                break;
            }
        }

        // Subtitle / lead
        let subtitle = '';
        let whyJourney = [];
        let itinerary = [];
        let included = [];
        let excluded = [];

        // Find "Why this journey" index
        const whyIdx = textNodes.findIndex(t => t.toLowerCase().includes('why this journey'));
        if (whyIdx !== -1) {
            whyJourney = textNodes.slice(whyIdx + 1, whyIdx + 5).filter(t => !t.includes('Day') && !t.includes('Included') && t.length > 5);
        }

        catalog[slug] = {
            slug,
            title,
            category,
            description: desc,
            allTexts: textNodes
        };
    });

    return catalog;
}

const catalog = parseAllTourFullContent();
console.log('Processed tours count:', Object.keys(catalog).length);
fs.writeFileSync('.agents/explorer_survey_1/parsed_tour_texts.json', JSON.stringify(catalog, null, 2));
