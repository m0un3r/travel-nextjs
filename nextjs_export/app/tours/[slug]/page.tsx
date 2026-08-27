import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  // One-time fork: enumerate frozen FS fallback to hardcoded known slugs
  // Tours: 19 verified slugs from cloned_site/tours
  const slugs = [
    "beijing-shanghai-city-highlights",
    "canada-rockies-explorer",
    "cherry-blossoms-kyoto-nara",
    "china-heritage-nature-tour",
    "deep-amazon-river-journey",
    "iceland-northern-lights-trails",
    "iceland-volcano-adventure-route",
    "japan-autumn-colors-tour",
    "maldives-island-getaway",
    "maldives-luxury-retreat-escape",
    "marrakech-desert-atlas-journey",
    "morocco-cultural-cities-tour",
    "new-york-california-city-escape",
    "rio-unlocked-beyond-the-postcard",
    "serengeti-great-migration-tour",
    "tanzania-safari-wildlife-experience",
    "tokyo-kyoto-city-experience",
    "usa-national-parks-adventure",
    "vancouver-toronto-city-tour",
  ];
  return slugs.map((slug) => ({ slug }));
}

function getHtmlForSlug(slug: string): string {
  try {
    const filePath = path.join(process.cwd(), "..", "cloned_site", "tours", slug, "index.html");
    const altPath = path.join(process.cwd(), "cloned_site", "tours", slug, "index.html");
    const p = fs.existsSync(filePath) ? filePath : altPath;
    if (fs.existsSync(p)) {
      const html = fs.readFileSync(p, "utf-8");
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) return bodyMatch[1];
      const mainMatch = html.match(/<div[^>]*id="main"[^>]*>([\s\S]*)/i);
      if (mainMatch) return mainMatch[1];
      return html;
    }
  } catch {}
  return `<!-- injected placeholder for tours/${slug} -->`;
}

export default function Page({ params }: { params: { slug: string } }) {
  const html = getHtmlForSlug(params.slug);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
