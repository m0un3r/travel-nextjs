import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const slugs = [
    "brazil",
    "canada",
    "china",
    "iceland",
    "japan",
    "maldives",
    "morocco",
    "tanzania",
    "usa",
  ];
  return slugs.map((slug) => ({ slug }));
}

function getHtmlForSlug(slug: string): string {
  try {
    const filePath = path.join(process.cwd(), "..", "cloned_site", "location", slug, "index.html");
    const altPath = path.join(process.cwd(), "cloned_site", "location", slug, "index.html");
    const p = fs.existsSync(filePath) ? filePath : altPath;
    if (fs.existsSync(p)) {
      const html = fs.readFileSync(p, "utf-8");
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) return bodyMatch[1];
      return html;
    }
  } catch {}
  return `<!-- injected placeholder for location/${slug} -->`;
}

export default function Page({ params }: { params: { slug: string } }) {
  const html = getHtmlForSlug(params.slug);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
