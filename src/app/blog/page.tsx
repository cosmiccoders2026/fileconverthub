import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { AdSlot } from "@/components/ads/ad-slot";
import { BlogCardGrid } from "@/components/shared/blog-card";
import { createMetadata } from "@/lib/metadata";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = createMetadata({
  title: "Blog — Tips, Guides & Tool Tutorials",
  description:
    "Read guides and tutorials about PDF compression, image conversion, text tools, and AI writing on the FileConvertHub blog.",
  path: "/blog",
  keywords: ["blog", "guides", "tutorials", "pdf tips", "image conversion"],
});

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <PageContainer>
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground max-w-2xl">
          Practical guides, tips, and tutorials to help you get more from our
          free online tools.
        </p>
      </div>

      <AdSlot variant="inline" className="mb-8" />

      <BlogCardGrid posts={sortedPosts} />
    </PageContainer>
  );
}
