import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { BlogBrowser } from "@/components/shared/blog-browser";
import { blogPosts } from "@/content/blog";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "File Conversion Guides and Productivity Tips",
  description: "Practical guides to PDF workflows, image formats, document handling, and everyday text utilities.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <PageContainer>
      <header className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">FileConvertHub Journal</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Guides for working with files</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">Straightforward explanations, practical workflows, and troubleshooting advice for PDFs, images, documents, and text.</p>
      </header>
      <BlogBrowser posts={posts} />
    </PageContainer>
  );
}
