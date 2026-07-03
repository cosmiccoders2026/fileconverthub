import { NextResponse } from "next/server";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url>
        <loc>https://fileconverthub.vercel.app/</loc>
        <lastmod>2026-07-03</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>

    <url>
        <loc>https://fileconverthub.vercel.app/pdf-to-word</loc>
        <lastmod>2026-07-03</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

    <url>
        <loc>https://fileconverthub.vercel.app/word-to-pdf</loc>
        <lastmod>2026-07-03</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

    <url>
        <loc>https://fileconverthub.vercel.app/image-to-pdf</loc>
        <lastmod>2026-07-03</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

    <url>
        <loc>https://fileconverthub.vercel.app/pdf-to-image</loc>
        <lastmod>2026-07-03</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
