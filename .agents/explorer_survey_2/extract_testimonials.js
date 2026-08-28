const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../cloned_site');

function extractDetails() {
  const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const contactHtml = fs.readFileSync(path.join(ROOT, 'contact/index.html'), 'utf8');
  const aboutHtml = fs.readFileSync(path.join(ROOT, 'about/index.html'), 'utf8');
  const storiesHtml = fs.readFileSync(path.join(ROOT, 'traveler-stories/index.html'), 'utf8');
  const toursHtml = fs.readFileSync(path.join(ROOT, 'tours/index.html'), 'utf8');

  // Let's find all testimonials
  console.log('=== TESTIMONIALS DISCOVERY ===');
  const testimonialMatches = [...indexHtml.matchAll(/Arjun Mehta[\s\S]*?(?:<\/div>|<\/section>)/gi)];
  console.log('Index testimonial snippet:', testimonialMatches.map(m => m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')));

  // Stories in traveler-stories page
  const storiesList = [...storiesHtml.matchAll(/(Honeymoon|Cities|Nature|Adventure|Wildlife)[\s\S]*?(Priya & Rohan Mehta|Arjun Mehta|Elena Vance|Marcus Thorne|Sophie Dubois|Liam & Emma|David Kim|Aria Montgomery)[\s\S]*?([A-Za-z\s]+(?:Escape|Tour|Journey|Experience|Explorer|Highlights))/gi)];
  console.log('Stories found in traveler-stories:', storiesList.length);

  // Let's dump all text in traveler-stories
  const cleanStories = storiesHtml.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  console.log('Clean stories text sample:\n', cleanStories.substring(0, 2000));
}

extractDetails();
