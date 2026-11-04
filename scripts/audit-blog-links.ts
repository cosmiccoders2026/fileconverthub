import fs from "fs";
import { blogPosts } from "../src/content/blog";
import { tools } from "../src/config/tools";

const validRoutes = new Set([
  "/", "/tools", "/pdf-tools", "/image-tools", "/text-tools",
  "/blog", "/about", "/contact", "/privacy", "/terms", "/disclaimer"
]);

tools.forEach(t => validRoutes.add(`/tools/${t.slug}`));
blogPosts.forEach(b => validRoutes.add(`/blog/${b.slug}`));

console.log("Checking markdown links in blog posts...");
const brokenMdLinks: { post: string; link: string }[] = [];

for (const post of blogPosts) {
  const matches = [...post.content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  for (const m of matches) {
    const url = m[2];
    if (url.startsWith("/")) {
      const normalized = url.replace(/\/+$/, "") || "/";
      if (!validRoutes.has(normalized)) {
        brokenMdLinks.push({ post: post.slug, link: url });
      }
    }
  }
}

console.log("Broken markdown links in blog posts:", brokenMdLinks.length);
brokenMdLinks.forEach(b => console.log(` - Post "${b.post}" has broken link: ${b.link}`));

// Also check relatedToolSlugs in blog posts and tools
console.log("Checking relatedToolSlugs in blog posts...");
const toolSlugs = new Set(tools.map(t => t.slug));
for (const post of blogPosts) {
  for (const s of post.relatedToolSlugs) {
    if (!toolSlugs.has(s)) {
      console.log(` - Post "${post.slug}" has invalid tool slug: ${s}`);
    }
  }
}

console.log("Checking relatedToolSlugs in tools...");
for (const tool of tools) {
  for (const s of tool.relatedToolSlugs) {
    if (!toolSlugs.has(s)) {
      console.log(` - Tool "${tool.slug}" has invalid related tool slug: ${s}`);
    }
  }
}
