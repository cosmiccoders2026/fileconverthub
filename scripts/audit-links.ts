import fs from "fs";
import path from "path";

// List of all 12 tools
const tools = [
  "merge-pdf", "compress-pdf", "jpg-to-pdf", "pdf-to-jpg",
  "png-to-jpg", "webp-to-jpg", "resize-image", "compress-image",
  "word-counter", "case-converter", "remove-duplicate-lines", "text-cleaner"
];

const validRoutes = new Set([
  "/", "/tools", "/pdf-tools", "/image-tools", "/text-tools",
  "/blog", "/about", "/contact", "/privacy", "/terms", "/disclaimer"
]);

tools.forEach(slug => validRoutes.add(`/tools/${slug}`));

// Read all blog slugs
const blogFile = fs.readFileSync("src/content/blog.ts", "utf-8");
const slugMatches = [...blogFile.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
slugMatches.forEach(slug => validRoutes.add(`/blog/${slug}`));

console.log("Total valid static & dynamic routes:", validRoutes.size);

const brokenLinks: { file: string; href: string }[] = [];

function scanDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (f.endsWith(".tsx") || f.endsWith(".ts")) {
      const content = fs.readFileSync(full, "utf-8");
      const hrefs = [...content.matchAll(/href=["'`](\/[^"'`\s?#]*)/g)].map(m => m[1]);
      for (const h of hrefs) {
        if (h.startsWith("/api/")) continue;
        const normalized = h.replace(/\/+$/, "") || "/";
        if (!validRoutes.has(normalized)) {
          brokenLinks.push({ file: full, href: h });
        }
      }
    }
  }
}

scanDir("src");

console.log("Broken links found:", brokenLinks.length);
brokenLinks.forEach(b => console.log(` - ${b.file}: ${b.href}`));
