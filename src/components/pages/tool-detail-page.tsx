import React, { useEffect } from "react";
import Link from "next/link";
import { ToolPageLayout } from "@/components/layout/tool-page-layout";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolInfoSections } from "@/components/shared/tool-info-sections";
import { BlogCardGrid } from "@/components/shared/blog-card";
import { getToolBySlug, getRelatedTools } from "@/config/tools";
import { getToolComponent } from "@/features/tools/tool-registry";
import { siteConfig } from "@/config/site";
import { getCategoryLabel, getCategoryRoute } from "@/lib/utils";
import { blogPosts } from "@/content/blog";
import NotFoundPage from "@/app/not-found";

interface ToolDetailPageProps {
  slug: string;
}

export function ToolDetailPage({ slug }: ToolDetailPageProps) {
  const tool = getToolBySlug(slug);

  useEffect(() => {
    if (tool) {
      document.title = `${tool.seoTitle} | ${siteConfig.name}`;
    }
  }, [tool]);

  if (!tool) {
    return <NotFoundPage />;
  }

  const ToolComponent = getToolComponent(slug);
  if (!ToolComponent) {
    return <NotFoundPage />;
  }

  const relatedTools = getRelatedTools(tool.relatedToolSlugs);
  const categoryLabel = getCategoryLabel(tool.category);
  const categoryRoute = getCategoryRoute(tool.category);
  const relatedPosts = blogPosts
    .filter((post) => post.relatedToolSlugs.includes(tool.slug))
    .slice(0, 2);

  return (
    <ToolPageLayout relatedTools={relatedTools}>
      <Breadcrumbs
        items={[
          { label: categoryLabel, href: categoryRoute },
          { label: tool.name },
        ]}
      />

      <div className="space-y-2 border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {tool.name}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          {tool.longDescription}
        </p>
      </div>

      <div className="pt-2">
        <ToolComponent />
      </div>

      {tool.privacyNote && (
        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">Security note: </span>
          {tool.privacyNote}
        </div>
      )}

      <ToolInfoSections
        steps={tool.howToUseSteps}
        whyPoints={tool.whyUsePoints}
      />

      {relatedPosts.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Related Guides &amp; Documentation
            </h2>
            <Link
              href="/blog"
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              All Guides →
            </Link>
          </div>
          <BlogCardGrid posts={relatedPosts} />
        </section>
      )}

      <div className="pt-2">
        <Link
          href={categoryRoute}
          className="text-xs text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
        >
          <span>← Back to all {categoryLabel}</span>
        </Link>
      </div>
    </ToolPageLayout>
  );
}

export default ToolDetailPage;
