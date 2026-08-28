const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site');
const storiesHtml = fs.readFileSync(path.join(ROOT, 'traveler-stories/index.html'), 'utf8');

// Strip styles and scripts
const clean = storiesHtml
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '');

// Look for review cards in traveler stories
// Pattern: category, quote, traveler name, trip title, image
const pTags = [...clean.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Total p tags in traveler-stories:', pTags.length);

// Also look for h1, h2, h3, h4 tags
const headings = [...clean.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings in traveler-stories:', headings);

// Print clean text segments
console.log('\n--- All clean paragraphs > 20 chars ---');
const uniquePs = [...new Set(pTags)].filter(t => t.length > 15);
uniquePs.forEach((p, i) => console.log(`${i + 1}: ${p}`));
