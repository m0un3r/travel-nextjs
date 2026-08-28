const fs = require('fs');
const path = require('path');

const tourSlugs = [
    "marrakech-desert-atlas-journey",
    "iceland-volcano-adventure-route",
    "usa-national-parks-adventure",
    "deep-amazon-river-journey",
    "tokyo-kyoto-city-experience",
    "morocco-cultural-cities-tour",
    "beijing-shanghai-city-highlights",
    "new-york-california-city-escape",
    "vancouver-toronto-city-tour",
    "rio-unlocked-beyond-the-postcard",
    "maldives-island-getaway",
    "maldives-luxury-retreat-escape",
    "cherry-blossoms-kyoto-nara",
    "japan-autumn-colors-tour",
    "iceland-northern-lights-trails",
    "china-heritage-nature-tour",
    "canada-rockies-explorer",
    "tanzania-safari-wildlife-experience",
    "serengeti-great-migration-tour"
];

const categoryMap = {
    "marrakech-desert-atlas-journey": "Adventure",
    "iceland-volcano-adventure-route": "Adventure",
    "usa-national-parks-adventure": "Adventure",
    "deep-amazon-river-journey": "Adventure",
    "tokyo-kyoto-city-experience": "Cities",
    "morocco-cultural-cities-tour": "Cities",
    "beijing-shanghai-city-highlights": "Cities",
    "new-york-california-city-escape": "Cities",
    "vancouver-toronto-city-tour": "Cities",
    "rio-unlocked-beyond-the-postcard": "Cities",
    "maldives-island-getaway": "Honeymoon",
    "maldives-luxury-retreat-escape": "Honeymoon",
    "cherry-blossoms-kyoto-nara": "Nature",
    "japan-autumn-colors-tour": "Nature",
    "iceland-northern-lights-trails": "Nature",
    "china-heritage-nature-tour": "Nature",
    "canada-rockies-explorer": "Nature",
    "tanzania-safari-wildlife-experience": "Wildlife",
    "serengeti-great-migration-tour": "Wildlife"
};

const locationMap = {
    "marrakech-desert-atlas-journey": "Morocco",
    "iceland-volcano-adventure-route": "Iceland",
    "usa-national-parks-adventure": "USA",
    "deep-amazon-river-journey": "Brazil",
    "tokyo-kyoto-city-experience": "Japan",
    "morocco-cultural-cities-tour": "Morocco",
    "beijing-shanghai-city-highlights": "China",
    "new-york-california-city-escape": "USA",
    "vancouver-toronto-city-tour": "Canada",
    "rio-unlocked-beyond-the-postcard": "Brazil",
    "maldives-island-getaway": "Maldives",
    "maldives-luxury-retreat-escape": "Maldives",
    "cherry-blossoms-kyoto-nara": "Japan",
    "japan-autumn-colors-tour": "Japan",
    "iceland-northern-lights-trails": "Iceland",
    "china-heritage-nature-tour": "China",
    "canada-rockies-explorer": "Canada",
    "tanzania-safari-wildlife-experience": "Tanzania",
    "serengeti-great-migration-tour": "Tanzania"
};

const results = [];

tourSlugs.forEach(slug => {
    const p = path.join('cloned_site/tours', slug, 'index.html');
    if (!fs.existsSync(p)) return;
    const html = fs.readFileSync(p, 'utf8');

    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(/ — Travelio.*$/, '').replace(/ - Travelio.*$/, '').trim() : slug;

    const descMatch = html.match(/name="description"\s+content="([^"]+)"/) || html.match(/content="([^"]+)"\s+name="description"/);
    const desc = descMatch ? descMatch[1] : '';

    // Extract hero / card price
    // Find $ followed by numbers
    const allPrices = html.match(/\$[\d,]+/g) || [];
    const mainPrice = allPrices.length > 0 ? allPrices[0] : '$2,980';

    // Extract duration (e.g. 7 D / 6 N or 6 nights)
    const durationMatch = html.match(/(\d+\s*D\s*\/\s*\d+\s*N|\d+\s*nights|\d+\s*days)/i);
    const duration = durationMatch ? durationMatch[1] : '7 D / 6 N';

    // Extract departure / badge banner
    const badgeMatch = html.match(/(?:Next departure:[^<]+|Peak safari[^<]+|Migration confirmed[^<]+|Summer season[^<]+|Cherry blossom season[^<]+|Autumn foliage[^<]+|Northern lights season[^<]+)/i);

    // Extract image URLs
    const imgMatches = (html.match(/assets\/images\/[a-zA-Z0-9_-]+\.(?:jpg|png|webp|svg)/g) || []);

    // Extract why journey highlights
    let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
    const textNodes = (clean.match(/>([^<]+)</g) || [])
        .map(m => m.replace(/^>|<$/g, '').trim())
        .filter(t => t.length > 0 && !t.startsWith('{') && !t.includes('__framer'));

    const whyIdx = textNodes.findIndex(t => t.toLowerCase().includes('why this journey'));
    let highlights = [];
    if (whyIdx !== -1) {
        highlights = textNodes.slice(whyIdx + 1, whyIdx + 4);
    }

    results.push({
        id: slug,
        slug,
        title: title.replace('&amp;', '&'),
        category: categoryMap[slug],
        location: locationMap[slug],
        price: mainPrice,
        pricePer: '/person',
        duration,
        rating: 4.9,
        reviewsCount: 120 + Math.floor(Math.random() * 80),
        description: desc.replace('&amp;', '&').replace('â€™', "'").replace('â\x80\x99', "'"),
        badge: badgeMatch ? badgeMatch[0].trim() : null,
        highlights,
        images: [...new Set(imgMatches)]
    });
});

console.log(JSON.stringify(results, null, 2));
fs.writeFileSync('.agents/explorer_survey_1/tours_detailed_catalog.json', JSON.stringify(results, null, 2));
