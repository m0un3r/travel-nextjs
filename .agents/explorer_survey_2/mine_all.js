const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site');

function readHtml(relPath) {
  const p = path.join(ROOT, relPath);
  if (fs.existsSync(p)) {
    return fs.readFileSync(p, 'utf8');
  }
  return null;
}

// 1. Mine Contact / Plan a Trip form
console.log('==================== CONTACT / PLAN A TRIP ====================');
const contactHtml = readHtml('contact/index.html');
if (contactHtml) {
  // Extract inputs, forms, text
  const forms = [...contactHtml.matchAll(/<form[\s\S]*?<\/form>/gi)].map(m => m[0]);
  console.log('Form count in contact:', forms.length);
  if (forms.length > 0) {
    forms.forEach((f, idx) => console.log(`Form ${idx}:\n`, f));
  } else {
    // Look for input fields and labels in contact page
    const inputs = [...contactHtml.matchAll(/<input[^>]*>/gi)].map(m => m[0]);
    console.log('Inputs found:', inputs);
    const textareas = [...contactHtml.matchAll(/<textarea[\s\S]*?<\/textarea>/gi)].map(m => m[0]);
    console.log('Textareas found:', textareas);
    const selects = [...contactHtml.matchAll(/<select[\s\S]*?<\/select>/gi)].map(m => m[0]);
    console.log('Selects found:', selects);
    const buttons = [...contactHtml.matchAll(/<button[^>]*>[\s\S]*?<\/button>/gi)].map(m => m[0]);
    console.log('Buttons found:', buttons);
  }
  
  // Extract general text from contact page
  const contactText = contactHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('Contact text snippet:', contactText.substring(0, 1000));
}

// 2. Mine All Tours in cloned_site/tours
console.log('\n==================== ALL TOURS ====================');
const toursDir = path.join(ROOT, 'tours');
const tourEntries = fs.readdirSync(toursDir, { withFileTypes: true });
const tourSlugs = tourEntries.filter(e => e.isDirectory()).map(e => e.name);
console.log('Tour folders count:', tourSlugs.length);

const allTours = [];
tourSlugs.forEach(slug => {
  const tourHtml = readHtml(`tours/${slug}/index.html`);
  if (tourHtml) {
    // Extract title, price, duration, category, description, images
    const titleMatch = tourHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : slug;
    
    // Look for price like $X,XXX
    const priceMatch = tourHtml.match(/\$[\d,]+(?:\s*\/\s*person)?/i);
    const price = priceMatch ? priceMatch[0] : null;
    
    // Look for duration like X D / Y N or X Days
    const durationMatch = tourHtml.match(/\d+\s*D\s*\/\s*\d+\s*N|\d+\s*Days/i);
    const duration = durationMatch ? durationMatch[0] : null;
    
    // Look for category
    const catMatch = tourHtml.match(/(?:Cities|Nature|Adventure|Honeymoon|Wildlife)/i);
    const category = catMatch ? catMatch[0] : null;
    
    // Look for hero image / thumbnails
    const imgMatches = [...tourHtml.matchAll(/src="(\.?\/?assets\/images\/[^"]+)"/g)].map(m => m[1]);
    
    // Text summary
    const plain = tourHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    allTours.push({
      slug,
      title,
      price,
      duration,
      category,
      images: [...new Set(imgMatches)].slice(0, 4),
      snippet: plain.substring(0, 300)
    });
  }
});
console.log('Sample parsed tours (first 5):', JSON.stringify(allTours.slice(0, 5), null, 2));

// 3. Mine Traveler Stories
console.log('\n==================== TRAVELER STORIES ====================');
const storiesHtml = readHtml('traveler-stories/index.html');
if (storiesHtml) {
  const storiesText = storiesHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('Stories text preview:', storiesText.substring(0, 1500));
}

// 4. Mine Footer from index.html and others
console.log('\n==================== FOOTER ====================');
const indexHtml = readHtml('index.html');
const footerMatch = indexHtml.match(/<footer[\s\S]*?<\/footer>/i) || indexHtml.match(/data-framer-name="Footer"[\s\S]*?<\/div>/i);
if (footerMatch) {
  console.log('Footer snippet found');
} else {
  // Look for copyright or bottom links
  const copyMatch = indexHtml.match(/©[\s\S]*?(?:<\/div>|<\/footer>|<\/p>)/i) || indexHtml.match(/Copyright[\s\S]*?(?:<\/div>|<\/footer>|<\/p>)/i);
  console.log('Copyright match:', copyMatch ? copyMatch[0] : 'None');
}
