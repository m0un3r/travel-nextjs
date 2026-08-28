import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const slugs = [
    "a-cultural-walk-through-rome-s-ancient-streets",
    "a-sunset-journey-through-the-sahara-desert",
    "chasing-the-northern-lights-across-iceland",
    "exploring-kyoto-s-hidden-temples-and-quiet-streets",
    "island-life-in-the-maldives-what-it-really-feels-like",
    "lost-in-time-a-week-inside-the-medina-of-fez",
    "street-food-stories-from-bangkok-nights",
  ];
  return slugs.map((slug) => ({ slug }));
}

function getHtmlForSlug(slug: string): string {
  try {
    const filePath = path.join(process.cwd(), "..", "cloned_site", "blog", slug, "index.html");
    const altPath = path.join(process.cwd(), "cloned_site", "blog", slug, "index.html");
    const p = fs.existsSync(filePath) ? filePath : altPath;
    if (fs.existsSync(p)) {
      const html = fs.readFileSync(p, "utf-8");
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) return bodyMatch[1];
      return html;
    }
  } catch {}
  return `<!-- injected placeholder for blog/${slug} -->`;
}

export default function Page({ params }: { params: { slug: string } }) {
  const html = getHtmlForSlug(params.slug);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
