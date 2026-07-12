import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ToolPageLayout } from "@/components/layout/tool-page-layout";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolInfoSections } from "@/components/shared/tool-info-sections";
import { BlogCardGrid } from "@/components/shared/blog-card";
import { getToolBySlug, getAllToolSlugs, getRelatedTools } from "@/config/tools";
import { getToolComponent } from "@/features/tools/tool-registry";
import { createMetadata } from "@/lib/metadata";
import {
  JsonLd,
  breadcrumbSchema,
  webApplicationSchema,
} from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { getCategoryLabel, getCategoryRoute } from "@/lib/utils";
import { blogPosts } from "@/content/blog";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };

  return createMetata({
    title: tool.seoTitle,
    description: tool.seoDescription,
    path: `/tools/${tool.slug}`,
    keywords: tool.keywords,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const ToolComponent = getToolComponent(slug);
  if (!ToolComponent) notFound();

  const relatedTools = getRelatedTools(tool.relatedToolSlugs);
  const categoryLabel = getCategoryLabel(tool.category);
  const categoryRoute = getCategoryRoute(tool.category);
  const toolUrl = `${siteConfig.url}/tools/${tool.slug}`;

  const relatedPosts = blogPosts
    .filter((post) => post.relatedToolSlugs.includes(tool.slug))
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={brecrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: categoryLabel, url: `${siteConfig.url}${categoryRoute}` },
          { name: tool.name, url: toolUrl },
        ])}
      />

      <JsonLd
        data={webApplicationSchema({
          name: tool.name,
          description: tool.shortDescription,
          url: toolUrl,
        })}
      />

      <ToolPageLayout relatedTools={relatedTools}>
        <Brecrumbs
          items={[
            { label: categoryLabel, href: categoryRoute },
            { label: tool.name },
          ]}
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
          <p className="text-muted-foreground">{tool.longDescription}</p>
        </div>

        <ToolComponent />

        {tool.privacyNote && (
          <p className="text-sm text-muted-foreground rounded-lg border bg-muted/30 p-4">
            <strong>Privacy:</strong> {tool.privacyNote}
          </p>
        )}

    
        <ToolInfoSections
          steps={tool.howToUseSteps}
          whyPoints={tool.whyUsePoints}
        />

        {relatedPosts.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Related Articles</h2>
            <BlogCardGrid posts={relatedPosts} />
          </section>
        )}

        <div className="text-center">
          <Link
            href={categoryRoute}
            className="text-sm text-primary hover:underline"
          >
            Browse all {categoryLabel} →
          </Link>
        </div>
      </ToolPageLayout>
    </>
  );
}
