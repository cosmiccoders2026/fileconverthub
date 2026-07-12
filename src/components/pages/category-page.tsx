import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCardGrid } from "@/components/shared/tool-card";
import { BlogCardGrid } from "@/components/shared/blog-card";
import { createMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { categories, getCategoryById } from "@/config/categories";
import { getToolsByCategory } from "@/config/tools";
import { blogPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";

const categoryRouteMap: Record<string, string> = {
  "/pdf-tools": "pdf",
  "/image-tools": "image",
  "/text-tools": "text",
};

export function generateCategoryPage(route: string) {
  const categoryId = categoryRouteMap[route];
  const category = getCategoryById(categoryId!);

  if (!category) return null;

  const categoryTools = getToolsByCategory(category.id);
  const relatedPosts = blogPosts
    .filter((post) =>
      post.tags.some(
        (tag) =>
          category.displayName.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(category.id)
      )
    )
    .slice(0, 2);

  return {
    category,
    categoryTools,
    relatedPosts,
    metadata: createMetadata({
      title: category.seoTitle,
      description: category.seoDescription,
      path: category.route,
    }),
  };
}

export function CategoryPageContent({ route }: { route: string }) {
  const data = generateCategoryPage(route);
  if (!data) return notFound();

  const { category, categoryTools, relatedPosts } = data;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          {
            name: category.displayName,
            url: `${siteConfig.url}${category.route}`,
          },
        ])}
      />

      <PageContainer size="wide">
        <Breadcrumbs items={[{ label: category.displayName }]} />

        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {category.displayName}
          </h1>
          <p className="text-muted-foreground max-w-3xl">{category.intro}</p>
        </div>

     

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Available Tools</h2>
          <ToolCardGrid tools={categoryTools} />
        </section>

        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold">Related Articles</h2>
            <BlogCardGrid posts={relatedPosts} />
          </section>
        )}

      
      </PageContainer>
    </>
  );
}

export const categoryPages = categories
  .filter((category) => category.id !== "ai-writing")
  .map((category) => category.route);
