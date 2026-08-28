const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site');

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

// 1. Parse all 19 Tours in depth
const toursDir = path.join(ROOT, 'tours');
const tourSlugs = fs.readdirSync(toursDir, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name);

const detailedTours = [];

tourSlugs.forEach(slug => {
  const file = path.join(toursDir, slug, 'index.html');
  if (fs.existsSync(file)) {
    const raw = fs.readFileSync(file, 'utf8');
    
    // Find Title
    const h1Match = raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = h1Match ? cleanText(h1Match[1]) : slug;
    
    // Find Category badge
    const catMatch = raw.match(/data-framer-name="(?:Category|Badge|Tag)"[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i) ||
                     raw.match(/<p[^>]*class="[^"]*framer-styles-preset-[^"]*"[^>]*>(Cities|Nature|Adventure|Honeymoon|Wildlife)<\/p>/i);
    const category = catMatch ? cleanText(catMatch[1]) : 'Nature';
    
    // Find Price
    const priceMatch = raw.match(/\$[\d,]+(?:\s*\/\s*person)?/i);
    const price = priceMatch ? priceMatch[0] : '$2,500';
    
    // Find Duration
    const durMatch = raw.match(/(\d+\s*D\s*\/\s*\d+\s*N|\d+\s*Days\s*\/\s*\d+\s*Nights)/i);
    const duration = durMatch ? durMatch[0] : '5 D / 4 N';
    
    // Find Rating
    const ratingMatch = raw.match(/(\d\.\d)\s*\/\s*5\.0/i) || raw.match(/(\d\.\d)\s*\(\d+\s*reviews\)/i);
    const rating = ratingMatch ? ratingMatch[1] : '4.9';
    
    // Find Location / Country
    const locMatch = raw.match(/data-framer-name="Location"[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i) ||
                     raw.match(/(Japan|Morocco|Iceland|Maldives|China|Brazil|Canada|Tanzania|USA|Italy|Thailand)/i);
    const location = locMatch ? cleanText(locMatch[1] || locMatch[0]) : 'Global';
    
    // Find Overview / Summary text
    const pMatches = [...raw.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => cleanText(m[1])).filter(t => t.length > 50);
    const overview = pMatches.length > 0 ? pMatches[0] : '';
    
    // Find Images
    const imgs = [...raw.matchAll(/src="(\.?\/?assets\/images\/[^"]+\.(?:jpg|jpeg|png|webp|svg))"/gi)]
      .map(m => m[1].replace(/^\.\//, '/'))
      .filter((v, i, a) => a.indexOf(v) === i);
    
    detailedTours.push({
      slug,
      title,
      category,
      price,
      duration,
      rating,
      location,
      overview,
      images: imgs.slice(0, 5)
    });
  }
});

console.log(`Parsed ${detailedTours.length} detailed tours`);
console.log(JSON.stringify(detailedTours, null, 2));
