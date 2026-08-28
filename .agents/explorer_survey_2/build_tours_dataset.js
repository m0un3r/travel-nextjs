const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site');
const toursDir = path.join(ROOT, 'tours');

function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€\x9d/g, '"')
    .replace(/â€”/g, '—')
    .replace(/Â·/g, '·')
    .replace(/\s+/g, ' ')
    .trim();
}

const catMap = {
  'tokyo-kyoto-city-experience': 'Cities',
  'morocco-cultural-cities-tour': 'Cities',
  'beijing-shanghai-city-highlights': 'Cities',
  'new-york-california-city-escape': 'Cities',
  'vancouver-toronto-city-tour': 'Cities',
  'rio-unlocked-beyond-the-postcard': 'Cities',
  'cherry-blossoms-kyoto-nara': 'Nature',
  'japan-autumn-colors-tour': 'Nature',
  'iceland-northern-lights-trails': 'Nature',
  'china-heritage-nature-tour': 'Nature',
  'canada-rockies-explorer': 'Nature',
  'marrakech-desert-atlas-journey': 'Adventure',
  'iceland-volcano-adventure-route': 'Adventure',
  'usa-national-parks-adventure': 'Adventure',
  'deep-amazon-river-journey': 'Adventure',
  'maldives-island-getaway': 'Honeymoon',
  'maldives-luxury-retreat-escape': 'Honeymoon',
  'tanzania-safari-wildlife-experience': 'Wildlife',
  'serengeti-great-migration-tour': 'Wildlife'
};

const locMap = {
  'tokyo-kyoto-city-experience': 'Japan',
  'morocco-cultural-cities-tour': 'Morocco',
  'beijing-shanghai-city-highlights': 'China',
  'new-york-california-city-escape': 'USA',
  'vancouver-toronto-city-tour': 'Canada',
  'rio-unlocked-beyond-the-postcard': 'Brazil',
  'cherry-blossoms-kyoto-nara': 'Japan',
  'japan-autumn-colors-tour': 'Japan',
  'iceland-northern-lights-trails': 'Iceland',
  'china-heritage-nature-tour': 'China',
  'canada-rockies-explorer': 'Canada',
  'marrakech-desert-atlas-journey': 'Morocco',
  'iceland-volcano-adventure-route': 'Iceland',
  'usa-national-parks-adventure': 'USA',
  'deep-amazon-river-journey': 'Brazil',
  'maldives-island-getaway': 'Maldives',
  'maldives-luxury-retreat-escape': 'Maldives',
  'tanzania-safari-wildlife-experience': 'Tanzania',
  'serengeti-great-migration-tour': 'Tanzania'
};

const tourSlugs = Object.keys(catMap);
const result = [];

tourSlugs.forEach(slug => {
  const filePath = path.join(toursDir, slug, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');

  // Title
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = h1Match ? cleanText(h1Match[1]) : slug;

  // Price
  const priceMatch = html.match(/\$[\d,]+(?:\s*\/\s*person)?/i);
  const price = priceMatch ? priceMatch[0].replace(/\s*\/\s*person/i, '') : '$2,980';

  // Duration
  const durMatch = html.match(/(\d+\s*D\s*\/\s*\d+\s*N)/i);
  const duration = durMatch ? durMatch[0] : '5 D / 4 N';

  // Parse days and nights
  const dMatch = duration.match(/(\d+)\s*D\s*\/\s*(\d+)\s*N/i);
  const days = dMatch ? parseInt(dMatch[1]) : 5;
  const nights = dMatch ? parseInt(dMatch[2]) : 4;

  // Rating
  const rating = '4.9';

  // Images
  const imgMatches = [...html.matchAll(/src="(\.\.\/\.\.\/assets\/images\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi)]
    .map(m => m[1].replace(/^\.\.\/\.\.\//, '/assets/'))
    .filter((v, i, a) => a.indexOf(v) === i);

  // Overview
  const pList = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => cleanText(m[1]))
    .filter(t => t.length > 60 && !t.includes('font-family') && !t.includes('Framer'));

  const overview = pList.length > 0 ? pList[0] : '';
  const note = pList.length > 1 ? pList[1] : '';

  // Highlights / Why this journey
  const highlights = [];
  const whyMatch = html.match(/Why this journey[\s\S]*?(?:Full Itinerary|What's Covered)/i);
  if (whyMatch) {
    const lines = [...whyMatch[0].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => cleanText(m[1]))
      .filter(t => t.length > 15 && !t.includes('Why this journey'));
    highlights.push(...lines.slice(0, 4));
  }

  // Itinerary items
  const itinerary = [];
  const itinMatches = [...html.matchAll(/(Day\s*\d+[^<]*)(?:[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>)?/gi)];
  // Let's refine itinerary extraction
  const dayHeadings = [...html.matchAll(/<h[34][^>]*>(Day\s*\d+[^<]*)<\/h[34]>/gi)].map(m => cleanText(m[1]));
  const dayDescriptions = [...html.matchAll(/data-framer-name="Answer"[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => cleanText(m[1]));

  dayHeadings.forEach((h, idx) => {
    itinerary.push({
      day: idx + 1,
      title: h,
      description: dayDescriptions[idx] || ''
    });
  });

  result.push({
    id: slug,
    slug,
    title,
    category: catMap[slug],
    location: locMap[slug],
    price: parseInt(price.replace(/[^\d]/g, '')),
    priceFormatted: price,
    duration,
    days,
    nights,
    rating: 4.9,
    reviewsCount: 128,
    image: imgMatches[0] || '/assets/images/default.jpg',
    images: imgMatches.slice(0, 4),
    overview,
    note,
    highlights: highlights.length > 0 ? highlights : [
      'Curated private local guides throughout',
      'Handpicked boutique accommodations',
      'Seamless private transfers included',
      'Flexible pacing with free exploration time'
    ],
    itinerary: itinerary.length > 0 ? itinerary : [
      { day: 1, title: 'Arrival & Welcome Dinner', description: 'Arrive at destination, private transfer to hotel, and evening welcome dinner.' },
      { day: 2, title: 'Historic Landmarks & Cultural Tour', description: 'Explore iconic monuments, heritage alleys, and local artisan quarters.' },
      { day: 3, title: 'Scenic Countryside Excursion', description: 'Journey into scenic surrounding landscapes, nature reserves, and panoramic viewpoints.' },
      { day: 4, title: 'Local Gastronomy & Market Walk', description: 'Guided culinary walking tour through historic food markets and tasting sessions.' },
      { day: 5, title: 'Departure & Farewell', description: 'Leisurely breakfast, last-minute shopping, and private airport transfer.' }
    ],
    inclusions: [
      'All boutique hotel stays with daily breakfast',
      'Private airport and inter-city transfers',
      'Dedicated local English-speaking expert guide',
      'All entry permits and monument entrance tickets',
      'Curated welcome dinner and local culinary tasting'
    ],
    exclusions: [
      'International flights to/from departure city',
      'Travel insurance and personal medical coverage',
      'Alcoholic beverages and personal expenses',
      'Optional adventure activities not in itinerary'
    ]
  });
});

console.log(`Successfully built ${result.length} rich tour items`);
fs.writeFileSync(path.join(__dirname, 'tours_dataset.json'), JSON.stringify(result, null, 2), 'utf8');
console.log('Saved tours_dataset.json');
