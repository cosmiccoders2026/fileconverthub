import React from "react";
import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { BlogBrowser } from "@/components/shared/blog-browser";
import { blogPosts } from "@/content/blog";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Guides & Technical Documentation",
  description:
    "Practical guides and technical documentation for PDF manipulation, image optimization, and text processing workflows.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );

  return (
    <PageContainer>
      <header className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Guides &amp; Technical Documentation
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Clear explanations of file formats, browser-based processing, compression trade-offs, and practical document workflows.
        </p>
      </header>
      <BlogBrowser posts={posts} />
    </PageContainer>
  );
}
