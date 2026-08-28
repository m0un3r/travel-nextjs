const fs = require('fs');
const path = require('path');

function getTourDetails() {
    const tourDirs = fs.readdirSync('cloned_site/tours').filter(d => fs.statSync(path.join('cloned_site/tours', d)).isDirectory());
    const tours = [];

    tourDirs.forEach(dir => {
        const p = path.join('cloned_site/tours', dir, 'index.html');
        if (!fs.existsSync(p)) return;
        const html = fs.readFileSync(p, 'utf8');

        // Extract title
        const titleMatch = html.match(/<title>([^<]+)<\/title>/);
        const title = titleMatch ? titleMatch[1].replace(/ — Travelio.*$/, '').replace(/ - Travelio.*$/, '').trim() : dir;

        // Meta description
        const descMatch = html.match(/name="description"\s+content="([^"]+)"/) || html.match(/content="([^"]+)"\s+name="description"/);
        const desc = descMatch ? descMatch[1] : '';

        // Extract all text nodes
        let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
        const textMatches = (clean.match(/>([^<]+)</g) || [])
            .map(m => m.replace(/^>|<$/g, '').trim())
            .filter(t => t.length > 0 && !t.startsWith('{') && !t.includes('__framer'));

        // Extract image src attributes
        const imgMatches = (html.match(/src="([^"]+\.(?:jpg|png|webp|svg))"/gi) || [])
            .map(m => m.replace(/^src="/i, '').replace(/"$/, ''));

        // Extract prices
        const prices = (html.match(/\$[\d,]+/g) || []);
        // Extract durations
        const durations = (html.match(/\b\d+\s*(?:Days|Day|Hours|Nights|D \/ \d+ N)\b/gi) || []);

        tours.push({
            slug: dir,
            title,
            description: desc,
            prices: [...new Set(prices)],
            durations: [...new Set(durations)],
            images: [...new Set(imgMatches)].slice(0, 5),
            textSample: textMatches.slice(0, 40)
        });
    });

    return tours;
}

const detailedTours = getTourDetails();
fs.writeFileSync('.agents/explorer_survey_1/tours_data.json', JSON.stringify(detailedTours, null, 2));
console.log(`Saved ${detailedTours.length} tours to tours_data.json`);
