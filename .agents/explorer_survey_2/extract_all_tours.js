const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site');
const toursDir = path.join(ROOT, 'tours');
const slugs = fs.readdirSync(toursDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

function clean(s) {
  if (!s) return '';
  return s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/â€™/g, "'").replace(/â€œ/g, '"').replace(/â€\x9d/g, '"').replace(/â€”/g, '—').replace(/\s+/g, ' ').trim();
}

const tours = [];

slugs.forEach(slug => {
  const file = path.join(toursDir, slug, 'index.html');
  const html = fs.readFileSync(file, 'utf8');

  // Title
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? clean(titleMatch[1]) : slug;

  // Category
  const catMatch = html.match(/href="\.\.\/\.\.\/categories\/([^"]+)"/i) || html.match(/(Cities|Nature|Adventure|Honeymoon|Wildlife)/i);
  const category = catMatch ? clean(catMatch[1]) : 'Nature';

  // Price
  const priceMatch = html.match(/\$[\d,]+(?:\s*\/\s*person)?/i);
  const price = priceMatch ? priceMatch[0] : '$2,500';

  // Duration
  const durMatch = html.match(/\d+\s*D\s*\/\s*\d+\s*N/i);
  const duration = durMatch ? durMatch[0] : '5 D / 4 N';

  // Rating
  const ratingMatch = html.match(/(\d\.\d)\s*\/\s*5\.0/i);
  const rating = ratingMatch ? ratingMatch[1] : '4.9';

  // Location
  const locMatch = html.match(/href="\.\.\/\.\.\/location\/([^"]+)"/i);
  const locationSlug = locMatch ? locMatch[1] : '';

  // Overview
  // Look for text in Overview section
  const overviewMatch = html.match(/data-framer-name="Overview"[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  const overview = overviewMatch ? clean(overviewMatch[1]) : '';

  // Why this journey highlights
  const whyMatches = [...html.matchAll(/data-framer-name="Why this journey"[\s\S]*?<\/div>/gi)].map(m => clean(m[0]));

  // Itinerary items
  const itineraryDays = [...html.matchAll(/Day\s*\d+[^<]*/gi)].map(m => clean(m[0]));

  // Featured image
  const imgMatches = [...html.matchAll(/src="(\.\.\/\.\.\/assets\/images\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi)].map(m => m[1].replace(/^\.\.\/\.\.\//, '/'));
  const heroImage = imgMatches.length > 0 ? imgMatches[0] : '';

  tours.push({
    slug,
    title,
    category: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
    price,
    duration,
    rating,
    location: locationSlug ? locationSlug.charAt(0).toUpperCase() + locationSlug.slice(1) : 'Global',
    overview,
    image: heroImage,
    itineraryDaysCount: itineraryDays.length
  });
});

console.log('Total Tours Parsed:', tours.length);
console.log(JSON.stringify(tours, null, 2));
