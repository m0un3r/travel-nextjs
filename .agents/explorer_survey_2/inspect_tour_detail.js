const fs = require('fs');
const path = require('path');

const tourHtml = fs.readFileSync(path.join(__dirname, '../../cloned_site/tours/cherry-blossoms-kyoto-nara/index.html'), 'utf8');

// Look for img tags and background-image styles
const imgTags = [...tourHtml.matchAll(/<img[^>]+>/gi)].map(m => m[0]);
console.log('Img tags in tour page count:', imgTags.length);
console.log('Sample img tags:', imgTags.slice(0, 10));

// Look for data-framer-name elements
const framerNames = [...tourHtml.matchAll(/data-framer-name="([^"]+)"/g)].map(m => m[1]);
console.log('Unique framer names:', [...new Set(framerNames)]);
