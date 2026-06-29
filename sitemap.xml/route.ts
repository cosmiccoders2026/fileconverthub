import { NextResponse } from "next/server";
import { tools } from "@/config/tools";
import { categories } from "@/config/categories";
import { blogPosts } from "@/content/blog";

export async function GET() {
  const baseUrl = "https://fileconverthub.vercel.app";
  const lastModified = new Date("2026-06-28").toISOString();

  const urls = [
    {
      loc: `${baseUrl}/`,
      lastmod: lastModified,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${baseUrl}/tools`,
      lastmod: lastModified,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: lastModified,
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: lastModified,
      changefreq: "monthly",
      priority: "0.5",
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: lastModified,
      changefreq: "monthly",
      priority: "0.5",
    },
    {
      loc: `${baseUrl}/privacy`,
      lastmod: lastModified,
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      loc: `${baseUrl}/terms`,
      lastmod: lastModified,
      changefreq: "yearly",
      priority: "0.3",
    },

    ...categories.map((cat) => ({
      loc: `${baseUrl}${cat.route}`,
      lastmod: lastModified,
      changefreq: "weekly",
      priority: "0.9",
    })),

    ...tools.map((tool) => ({
      loc: `${baseUrl}/tools/${tool.slug}`,
      lastmod: lastModified,
      changefreq: "weekly",
      priority: "0.8",
    })),

    ...blogPosts.map((post) => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: new Date(post.publishedAt).toISOString(),
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate",
    },
  });
}
