const fs = require('fs');
const path = require('path');

function mapImageUsage() {
    const pages = [
        { name: 'Home', file: 'cloned_site/index.html' },
        { name: 'Tours Index', file: 'cloned_site/tours/index.html' },
        { name: 'About', file: 'cloned_site/about/index.html' },
        { name: 'Contact', file: 'cloned_site/contact/index.html' },
        { name: 'Traveler Stories', file: 'cloned_site/traveler-stories/index.html' },
        { name: 'Categories (Cities)', file: 'cloned_site/categories/cities/index.html' },
        { name: 'Categories (Nature)', file: 'cloned_site/categories/nature/index.html' },
        { name: 'Categories (Adventure)', file: 'cloned_site/categories/adventure/index.html' },
        { name: 'Categories (Honeymoon)', file: 'cloned_site/categories/honeymoon/index.html' },
        { name: 'Categories (Wildlife)', file: 'cloned_site/categories/wildlife/index.html' }
    ];

    const usage = {};

    pages.forEach(p => {
        if (!fs.existsSync(p.file)) return;
        const html = fs.readFileSync(p.file, 'utf8');
        const imgMatches = (html.match(/assets\/images\/[a-zA-Z0-9_-]+\.(?:jpg|png|webp|svg)/g) || []);
        const videoMatches = (html.match(/assets\/videos\/[a-zA-Z0-9_-]+\.(?:mp4|webm)/g) || []);
        
        [...imgMatches, ...videoMatches].forEach(asset => {
            const fileName = path.basename(asset);
            usage[fileName] = usage[fileName] || { pages: new Set(), type: path.extname(fileName) };
            usage[fileName].pages.add(p.name);
        });
    });

    return usage;
}

const usageMap = mapImageUsage();
console.log('Total referenced assets across key pages:', Object.keys(usageMap).length);

const entries = Object.entries(usageMap).map(([file, info]) => {
    const filePath = path.join('cloned_site/assets', info.type === '.mp4' ? 'videos' : 'images', file);
    let sizeKB = 0;
    if (fs.existsSync(filePath)) {
        sizeKB = (fs.statSync(filePath).size / 1024).toFixed(2);
    }
    return {
        file,
        type: info.type,
        sizeKB: parseFloat(sizeKB),
        pages: Array.from(info.pages)
    };
});

entries.sort((a, b) => b.sizeKB - a.sizeKB);
console.log('Top 25 largest referenced assets:');
console.log(entries.slice(0, 25));
