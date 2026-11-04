import React, { useEffect, ReactNode } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCardGrid } from "@/components/shared/tool-card";
import { getBlogPostBySlug } from "@/content/blog";
import { getRelatedTools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NotFoundPage from "@/app/not-found";

function renderMarkdownContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: ReactNode[] = [];
  let listItems: string[] = [];
  let inList = false;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-4 space-y-2 pl-6 list-disc text-sm text-slate-600">
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
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
        <h2 key={elements.length} className="mt-8 mb-3 text-xl font-bold tracking-tight text-slate-900">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="mt-6 mb-2 text-base font-semibold text-slate-900">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(trimmed.slice(2));
    } else if (trimmed.match(/^\d+\.\s/)) {
      flushList();
      elements.push(
        <p key={elements.length} className="my-2 text-sm text-slate-600 leading-relaxed">
          {trimmed}
        </p>
      );
    } else if (trimmed.includes("[") && trimmed.includes("](")) {
      flushList();
      const parts = trimmed.split(/(\[[^\]]+\]\([^)]+\))/g);
      elements.push(
        <p key={elements.length} className="my-3 text-sm text-slate-600 leading-relaxed">
          {parts.map((part, i) => {
            const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (match) {
              const isExternal = match[2].startsWith("http");
              return (
                <Link
                  key={i}
                  href={match[2]}
                  className="text-blue-600 hover:underline font-medium"
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
        <p key={elements.length} className="my-2 text-sm font-semibold text-slate-900">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed) {
      flushList();
      elements.push(
        <p key={elements.length} className="my-3 text-sm text-slate-600 leading-relaxed">
          {trimmed}
        </p>
      );
    }
  }

  flushList();
  return elements;
}

export function BlogDetailPage({ slug }: { slug: string }) {
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ${siteConfig.name}`;
    }
  }, [post]);

  if (!post) {
    return <NotFoundPage />;
  }

  const relatedTools = getRelatedTools(post.relatedToolSlugs);

  return (
    <PageContainer size="narrow">
      <Breadcrumbs items={[{ label: "Guides", href: "/blog" }, { label: post.title }]} />

      <article className="space-y-6">
        <header className="border-b border-slate-200 pb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-900">{post.tags.join(" · ")}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{Math.max(1, Math.ceil(post.content.trim().split(/\s+/).length / 200))} min read</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
            {post.title}
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            {post.description}
          </p>

          <p className="text-xs text-slate-500">
            Author: <span className="font-medium text-slate-800">{post.author}</span>
          </p>
        </header>

        <div className="prose-custom pt-2">{renderMarkdownContent(post.content)}</div>

        {relatedTools.length > 0 && (
          <section className="mt-12 space-y-4 rounded-lg border border-slate-200 bg-slate-50/50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Interactive Tools Referenced in This Article
            </h2>
            <ToolCardGrid tools={relatedTools} />
          </section>
        )}

        <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs">
          <Button variant="outline" size="sm" asChild>
            <Link href="/blog">← All Guides</Link>
          </Button>
          <span className="text-slate-400">Published on {siteConfig.name}</span>
        </div>
      </article>
    </PageContainer>
  );
}

export default BlogDetailPage;
