const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site');

function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<head[\s\S]*?<\/head>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

function getText(html) {
  return cleanHtml(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

// Check what Framer modules exist in framerusercontent
const framerDir = path.join(ROOT, 'framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz');
if (fs.existsSync(framerDir)) {
  const files = fs.readdirSync(framerDir);
  console.log(`Found ${files.length} Framer JS modules in framerusercontent`);
  
  // Search for JSON datasets or text constants inside JS modules
  files.forEach(f => {
    if (f.endsWith('.mjs') || f.endsWith('.js')) {
      const code = fs.readFileSync(path.join(framerDir, f), 'utf8');
      if (code.includes('Arjun Mehta') || code.includes('Cherry Blossoms') || code.includes('Plan a Trip')) {
        console.log(`Key module found: ${f}`);
      }
    }
  });
}

// Let's inspect pages
const pages = [
  'index.html',
  'about/index.html',
  'contact/index.html',
  'tours/index.html',
  'traveler-stories/index.html',
  'blog/index.html',
  'location/index.html',
  'legal-pages/privacy-policy/index.html',
  'legal-pages/terms-and-conditions/index.html'
];

pages.forEach(p => {
  const fullPath = path.join(ROOT, p);
  if (fs.existsSync(fullPath)) {
    const raw = fs.readFileSync(fullPath, 'utf8');
    const text = getText(raw);
    console.log(`\n================== PAGE: ${p} ==================`);
    console.log(text.substring(0, 800));
  }
});
