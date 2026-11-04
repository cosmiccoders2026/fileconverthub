import { NextResponse } from "next/server";
import { tools } from "@/config/tools";
import { blogPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";

export async function GET() {
  const staticPaths = [
    "/", "/tools", "/pdf-tools", "/image-tools", "/text-tools",
    "/blog", "/about", "/contact", "/privacy", "/terms", "/disclaimer",
  ];
  const toolPaths = tools.map((tool) => `/tools/${tool.slug}`);
  const articlePaths = blogPosts.map((post) => `/blog/${post.slug}`);
  const urls = [...new Set([...staticPaths, ...toolPaths, ...articlePaths])];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => {
  const post = path.startsWith("/blog/") ? blogPosts.find((item) => `/blog/${item.slug}` === path) : undefined;
  const lastmod = post?.publishedAt ?? "2026-11-04";
  return `  <url><loc>${siteConfig.url}${path}</loc><lastmod>${lastmod}</lastmod></url>`;
}).join("\n")}
</urlset>`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
