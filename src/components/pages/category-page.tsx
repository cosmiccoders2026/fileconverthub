import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCardGrid } from "@/components/shared/tool-card";
import { BlogCardGrid } from "@/components/shared/blog-card";
import { createMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { categories, getCategoryById } from "@/config/categories";
import { getToolsByCategory } from "@/config/tools";
import { blogPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      {category.faq.length > 0 && (
        <JsonLd data={faqSchema(category.faq)} />
      )}

      <PageContainer size="wide" className="py-8 sm:py-12 space-y-10">
        <Breadcrumbs items={[{ label: category.displayName }]} />

        <div className="border-b border-slate-200 pb-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {category.displayName}
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {category.intro}
          </p>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Available Utilities
            </h2>
            <span className="font-mono text-xs text-slate-400 tabular-nums">
              {categoryTools.length} {categoryTools.length === 1 ? "tool" : "tools"}
            </span>
          </div>
          <ToolCardGrid tools={categoryTools} />
        </section>

        {category.faq && category.faq.length > 0 && (
          <section className="pt-6 border-t border-slate-200 space-y-4">
            <h2 className="text-base font-semibold text-slate-900">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full border rounded-lg bg-white px-4">
              {category.faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-sm font-medium py-3.5 hover:no-underline hover:text-blue-600">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-slate-600 leading-relaxed pb-3.5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="pt-6 border-t border-slate-200 space-y-4">
            <h2 className="text-base font-semibold text-slate-900">
              Related Articles &amp; Documentation
            </h2>
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
