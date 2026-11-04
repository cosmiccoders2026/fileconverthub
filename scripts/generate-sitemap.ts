import fs from "fs";
import { tools } from "../src/config/tools";
import { blogPosts } from "../src/content/blog";
import { siteConfig } from "../src/config/site";

const staticPaths = [
  "",
  "/tools",
  "/pdf-tools",
  "/image-tools",
  "/text-tools",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
];

const toolPaths = tools.map((tool) => `/tools/${tool.slug}`);
const articlePaths = blogPosts.map((post) => `/blog/${post.slug}`);
const allPaths = [...staticPaths, ...toolPaths, ...articlePaths];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map((path) => {
    const post = path.startsWith("/blog/")
      ? blogPosts.find((item) => `/blog/${item.slug}` === path)
      : undefined;
    const lastmod = post?.publishedAt ?? "2026-11-04";
    const priority = path === "" ? "1.0" : path.startsWith("/tools/") ? "0.8" : path.startsWith("/blog/") ? "0.7" : "0.5";
    return `  <url>
    <loc>${siteConfig.url}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

fs.writeFileSync("public/sitemap.xml", sitemapXml.trim(), "utf-8");
console.log(`Generated public/sitemap.xml with ${allPaths.length} URLs`);

const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteConfig.url}/sitemap.xml
`;

fs.writeFileSync("public/robots.txt", robotsTxt.trim() + "\n", "utf-8");
console.log("Generated public/robots.txt");
