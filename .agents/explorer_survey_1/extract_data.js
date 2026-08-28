const fs = require('fs');
const path = require('path');

function extractTours() {
    const tourDirs = fs.readdirSync('cloned_site/tours').filter(d => {
        return fs.statSync(path.join('cloned_site/tours', d)).isDirectory();
    });

    console.log(`Found ${tourDirs.length} tour subdirectories:`);
    const tours = [];

    tourDirs.forEach(dir => {
        const p = path.join('cloned_site/tours', dir, 'index.html');
        if (!fs.existsSync(p)) return;
        const content = fs.readFileSync(p, 'utf8');

        // Extract title
        const titleMatch = content.match(/<title>([^<]+)<\/title>/);
        // Extract meta description
        const descMatch = content.match(/name="description"\s+content="([^"]+)"/) || content.match(/content="([^"]+)"\s+name="description"/);
        // Look for price patterns ($1,200 or $850 etc)
        const priceMatches = content.match(/\$[\d,]+/g) || [];
        // Look for duration (e.g. 5 Days, 7 Days, etc)
        const durationMatches = content.match(/\b\d+\s*(?:Days|Day|Hours|Nights)\b/gi) || [];
        // Look for ratings
        const ratingMatches = content.match(/4\.[5-9]|5\.0/g) || [];

        tours.push({
            slug: dir,
            title: titleMatch ? titleMatch[1].replace(/ — Travelio.*$/, '').replace(/ - Travelio.*$/, '').trim() : dir,
            fullTitle: titleMatch ? titleMatch[1] : dir,
            description: descMatch ? descMatch[1] : '',
            prices: [...new Set(priceMatches)],
            durations: [...new Set(durationMatches)],
            ratings: [...new Set(ratingMatches)]
        });
    });

    return tours;
}

const tours = extractTours();
console.log(JSON.stringify(tours, null, 2));
