const fs = require('fs');
const path = require('path');

const blogDirs = fs.readdirSync('cloned_site/blog').filter(d => fs.statSync(path.join('cloned_site/blog', d)).isDirectory());
const blogs = [];

blogDirs.forEach(slug => {
    const p = path.join('cloned_site/blog', slug, 'index.html');
    if (!fs.existsSync(p)) return;
    const html = fs.readFileSync(p, 'utf8');

    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const descMatch = html.match(/name="description"\s+content="([^"]+)"/) || html.match(/content="([^"]+)"\s+name="description"/);
    const dateMatch = html.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+,\s+\d{4}/);
    const authorMatch = html.match(/By\s+([A-Za-z\s]+)/i);

    blogs.push({
        slug,
        title: titleMatch ? titleMatch[1].replace(/ — Travelio.*$/, '').replace(/ - Travelio.*$/, '').trim() : slug,
        description: descMatch ? descMatch[1] : '',
        date: dateMatch ? dateMatch[0] : 'Oct 14, 2025',
        author: authorMatch ? authorMatch[1] : 'Travelio Editorial'
    });
});

console.log(JSON.stringify(blogs, null, 2));
fs.writeFileSync('.agents/explorer_survey_1/blogs_catalog.json', JSON.stringify(blogs, null, 2));
