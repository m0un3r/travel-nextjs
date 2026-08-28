const fs = require('fs');
const path = require('path');

// Extract all categories
function extractCategories() {
    const catDirs = fs.readdirSync('cloned_site/categories').filter(d => fs.statSync(path.join('cloned_site/categories', d)).isDirectory());
    const categories = [];
    catDirs.forEach(cat => {
        const p = path.join('cloned_site/categories', cat, 'index.html');
        if (fs.existsSync(p)) {
            const content = fs.readFileSync(p, 'utf8');
            const titleMatch = content.match(/<title>([^<]+)<\/title>/);
            const descMatch = content.match(/name="description"\s+content="([^"]+)"/) || content.match(/content="([^"]+)"\s+name="description"/);
            categories.push({
                slug: cat,
                name: cat.charAt(0).toUpperCase() + cat.slice(1),
                title: titleMatch ? titleMatch[1] : cat,
                description: descMatch ? descMatch[1] : ''
            });
        }
    });
    return categories;
}

// Extract traveler stories
function extractTravelerStories() {
    const p = path.join('cloned_site/traveler-stories/index.html');
    if (!fs.existsSync(p)) return [];
    const content = fs.readFileSync(p, 'utf8');
    // Extract text paragraphs or reviews
    return {
        title: (content.match(/<title>([^<]+)<\/title>/) || [])[1],
        description: (content.match(/name="description"\s+content="([^"]+)"/) || [])[1]
    };
}

// Extract locations
function extractLocations() {
    const locDirs = fs.readdirSync('cloned_site/location').filter(d => fs.statSync(path.join('cloned_site/location', d)).isDirectory());
    return locDirs.map(loc => {
        const p = path.join('cloned_site/location', loc, 'index.html');
        let title = loc;
        let desc = '';
        if (fs.existsSync(p)) {
            const c = fs.readFileSync(p, 'utf8');
            title = (c.match(/<title>([^<]+)<\/title>/) || [])[1] || loc;
            desc = (c.match(/name="description"\s+content="([^"]+)"/) || [])[1] || '';
        }
        return { slug: loc, name: loc.charAt(0).toUpperCase() + loc.slice(1), title, desc };
    });
}

console.log('Categories:', JSON.stringify(extractCategories(), null, 2));
console.log('Locations:', JSON.stringify(extractLocations(), null, 2));
console.log('Traveler Stories Meta:', JSON.stringify(extractTravelerStories(), null, 2));
