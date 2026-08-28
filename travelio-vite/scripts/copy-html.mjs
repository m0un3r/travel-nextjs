import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcRoot = path.resolve(root, "..", "cloned_site");
const dist = path.join(root, "dist");

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) {
      const rel = path.relative(srcRoot, full);
      out.push({ src: full, rel });
    }
  }
}

if (!fs.existsSync(dist)) {
  console.error(`dist not found at ${dist}, run vite build first`);
  process.exit(1);
}
const htmls = [];
walk(srcRoot, htmls);
let copied = 0;
for (const { src, rel } of htmls) {
  const dst = path.join(dist, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  copied++;
}
console.log(`Copied ${copied} html files from cloned_site to dist (threshold >=40)`);
