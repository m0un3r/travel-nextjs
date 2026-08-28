const fs = require('fs');
const path = require('path');

function inspectSection(html, sectionName) {
  const regex = new RegExp(`<section[^>]*data-framer-name="${sectionName}"[\\s\\S]*?<\\/section>`, 'i');
  const match = html.match(regex);
  return match ? match[0] : null;
}

const indexHtml = fs.readFileSync(path.join(__dirname, '../../cloned_site/index.html'), 'utf8');

const sections = [
  'Hero',
  'Categories',
  'Promise',
  'Tours',
  'Cities',
  'Step',
  'Stats',
  'Testimonials',
  'CTA',
  'Blog',
  'Footer'
];

console.log('=== EXTRACTING SECTIONS ===');
sections.forEach(secName => {
  const content = inspectSection(indexHtml, secName);
  console.log(`\n================== SECTION: ${secName} ==================`);
  if (content) {
    // Extract all text content
    const textOnly = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('Text preview (first 400 chars):', textOnly.substring(0, 400));
    
    // Extract images
    const imgs = [...content.matchAll(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/g)].map(m => ({ src: m[1], alt: m[2] }));
    console.log('Images count:', imgs.length, 'Samples:', imgs.slice(0, 4));
    
    // Extract buttons/links
    const links = [...content.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => ({
      href: m[1],
      text: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    }));
    console.log('Links count:', links.length, 'Samples:', links.slice(0, 5));
  } else {
    console.log('Section not found directly with regex');
  }
});
