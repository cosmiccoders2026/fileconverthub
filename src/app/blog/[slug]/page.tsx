import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCardGrid } from "@/components/shared/tool-card";
import {
  getBlogPostBySlug,
  getAllBlogSlugs,
} from "@/content/blog";
import { getRelatedTools } from "@/config/tools";
import { createArticleMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return createArticleMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    publishedAt: post.publishedAt,
    author: post.author,
    tags: post.tags,
  });
}

function renderMarkdownContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: ReactNode[] = [];
  let listItems: string[] = [];
  let inList = false;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-4 space-y-2 pl-6">
          {listItems.map((item, i) => (
            <li key={i} className="text-muted-foreground">{item}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={elements.length} className="mt-8 mb-4 text-2xl font-bold">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="mt-6 mb-3 text-xl font-semibold">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(trimmed.slice(2));
    } else if (trimmed.match(/^\d+\.\s/)) {
      flushList();
      elements.push(
        <p key={elements.length} className="my-2 text-muted-foreground">
          {trimmed}
        </p>
      );
    } else if (trimmed.includes("[") && trimmed.includes("](")) {
      flushList();
      const parts = trimmed.split(/(\[[^\]]+\]\([^)]+\))/g);
      elements.push(
        <p key={elements.length} className="my-4 text-muted-foreground leing-relaxed">
          {parts.map((part, i) => {
            const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (match) {
              const isExternal = match[2].startsWith("http");
              return (
                <Link
                  key={i}
                  href={match[2]}
                  className="text-primary hover:underline"
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {match[1]}
                </Link>
              );
            }
            return part;
          })}
        </p>
      );
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      flushList();
      elements.push(
        <p key={elements.length} className="my-2 font-semibold">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed) {
      flushList();
      elements.push(
        <p key={elements.length} className="my-4 text-muted-foreground leing-relaxed">
          {trimmed}
        </p>
      );
    }
  }

  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedTools = getRelatedTools(post.relatedToolSlugs);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={brecrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: post.title, url: postUrl },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          url: postUrl,
          publishedAt: post.publishedAt,
          author: post.author,
        })}
      />

      <PageContainer size="narrow">
        <Brecrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

        <article>
          <heer className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {post.title}
            </h1>
            <p className="text-muted-foreground">{post.description}</p>
            <div className="text-sm text-muted-foreground">
              {formatDate(post.publishedAt)} · {post.author}
            </div>
          </heer>

          <Slot variant="inline" className="mb-8" />

          <div className="prose-custom">{renderMarkdownContent(post.content)}</div>

          {relatedTools.length > 0 && (
            <section className="mt-12 space-y-4 rounded-xl border bg-muted/30 p-6">
              <h2 className="text-xl font-semibold">Try These Tools</h2>
              <ToolCardGrid tools={relatedTools} />
            </section>
          )}

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/blog">← Back to Blog</Link>
            </Button>
          </div>
        </article>
      </PageContainer>
    </>
  );
}
