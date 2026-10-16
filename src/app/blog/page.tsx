import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { BlogCardGrid } from "@/components/shared/blog-card";
import { createMetadata } from "@/lib/metadata";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = createMetadata({
  title: "Blog & Tutorials | FileConvertHub Tool Guides",
  description:
    "Explore expert guides, tutorials, and practical tips on PDF compression, image formatting, text manipulation, and productivity hacks. Master your digital workflow.",
  path: "/blog",
  keywords: [
    "file conversion guides", 
    "pdf compression tips", 
    "image optimization tutorials", 
    "productivity blog", 
    "text formatting tools",
    "FileConvertHub tutorials"
  ],
});

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <PageContainer>
      <header className="mb-12 space-y-5">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Resources & Tutorials
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Welcome to the FileConvertHub resource center. Discover practical guides, 
          step-by-step tutorials, and insider tips designed to streamline your digital workflow. 
          Whether you need to learn how to securely merge sensitive PDFs, optimize high-resolution 
          images for web performance, or clean up messy text data, our latest articles have you covered.
        </p>
      </header>

      <main>
        <section aria-label="Latest Blog Posts">
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Latest Articles
            </h2>
            <span className="text-sm text-muted-foreground font-medium">
              {sortedPosts.length} {sortedPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          {sortedPosts.length > 0 ? (
            <BlogCardGrid posts={sortedPosts} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center bg-muted/30">
              <h3 className="mb-2 text-lg font-semibold text-foreground">No posts found</h3>
              <p className="text-muted-foreground max-w-sm">
                Check back soon! We are actively writing new tutorials and digital workflow guides.
              </p>
            </div>
          )}
        </section>
      </main>
    </PageContainer>
  );
}
