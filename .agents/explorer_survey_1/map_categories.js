const fs = require('fs');
const path = require('path');

const catDirs = ['adventure', 'cities', 'honeymoon', 'nature', 'wildlife'];
const categoryTours = {};

catDirs.forEach(cat => {
    const p = path.join('cloned_site/categories', cat, 'index.html');
    if (fs.existsSync(p)) {
        const html = fs.readFileSync(p, 'utf8');
        const tourLinks = (html.match(/\/tours\/([a-z0-9-]+)/g) || [])
            .map(m => m.replace('/tours/', ''));
        categoryTours[cat] = [...new Set(tourLinks)];
    }
});

console.log('Category to Tours mapping:');
console.log(JSON.stringify(categoryTours, null, 2));

// Also check locations to tours
const locDirs = ['brazil', 'canada', 'china', 'iceland', 'japan', 'maldives', 'morocco', 'tanzania', 'usa'];
const locationTours = {};

locDirs.forEach(loc => {
    const p = path.join('cloned_site/location', loc, 'index.html');
    if (fs.existsSync(p)) {
        const html = fs.readFileSync(p, 'utf8');
        const tourLinks = (html.match(/\/tours\/([a-z0-9-]+)/g) || [])
            .map(m => m.replace('/tours/', ''));
        locationTours[loc] = [...new Set(tourLinks)];
    }
});

console.log('Location to Tours mapping:');
console.log(JSON.stringify(locationTours, null, 2));
