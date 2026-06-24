"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Image,
  Type,
  Zap,
  Shield,
  Globe,
  Sparkles,
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { AdSlot } from "@/components/ads/ad-slot";
import { ToolCardGrid } from "@/components/shared/tool-card";
import { BlogCardGrid } from "@/components/shared/blog-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { categories } from "@/config/categories";
import { tools, getFeaturedTools } from "@/config/tools";
import { getRecentBlogPosts } from "@/content/blog";

const categoryIcons = {
  pdf: FileText,
  image: Image,
  text: Type,
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const featuredTools = getFeaturedTools();
  const recentPosts = getRecentBlogPosts(3);

  const filteredTools = useMemo(() => {
    if (!search.trim()) return [];

    const q = search.toLowerCase();

    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((keyword) => keyword.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <PageContainer className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-balance">
              {siteConfig.name}
            </h1>

            <p className="text-lg text-muted-foreground text-balance">
              {siteConfig.tagline}
            </p>

            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-10"
              />
            </div>

            {filteredTools.length > 0 && (
              <div className="rounded-lg border bg-card p-4 text-left">
                <p className="mb-2 text-sm font-medium">Search Results</p>
                <ul className="space-y-1">
                  {filteredTools.slice(0, 5).map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button key={category.id} variant="outline" asChild>
                  <Link href={category.route}>{category.displayName}</Link>
                </Button>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <AdSlot variant="banner" className="container mx-auto px-4 py-4" />

      {/* Category Shortcuts */}
      <PageContainer>
        <h2 className="mb-6 text-2xl font-bold">Browse by Category</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = categoryIcons[category.id as keyof typeof categoryIcons];

            if (!Icon) return null;

            return (
              <Link
                key={category.id}
                href={category.route}
                className="group rounded-xl border p-6 transition-shadow hover:shadow-md"
              >
                <Icon className="mb-3 h-8 w-8 text-primary" />

                <h3 className="font-semibold group-hover:text-primary">
                  {category.displayName}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {category.description.slice(0, 80)}...
                </p>
              </Link>
            );
          })}
        </div>
      </PageContainer>

      {/* Popular Tools */}
      <PageContainer>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular Tools</h2>

          <Button variant="outline" asChild>
            <Link href="/tools">View All</Link>
          </Button>
        </div>

        <ToolCardGrid tools={featuredTools} />
      </PageContainer>

      {/* Why FileConvertHub */}
      <section className="bg-muted/30">
        <PageContainer>
          <h2 className="mb-8 text-2xl font-bold text-center">
            Why FileConvertHub?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "Fast & Instant",
                desc: "Most tools process in seconds with no waiting or queues.",
              },
              {
                icon: Shield,
                title: "Private & Secure",
                desc: "Files processed in your browser stay on your device.",
              },
              {
                icon: Globe,
                title: "No Signup Required",
                desc: "Use every tool instantly without creating an account.",
              },
              {
                icon: Sparkles,
                title: "No Watermarks",
                desc: "Clean outputs every time — no branding on your files.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center space-y-2">
                <item.icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* How It Works */}
      <PageContainer>
        <h2 className="mb-8 text-2xl font-bold text-center">How It Works</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Choose a Tool",
              desc: "Browse categories or search for the tool you need.",
            },
            {
              step: "2",
              title: "Upload or Paste",
              desc: "Add your file or text directly in the browser.",
            },
            {
              step: "3",
              title: "Download Result",
              desc: "Get your converted, compressed, or edited output instantly.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                {item.step}
              </div>

              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </PageContainer>

      {/* Blog Preview */}
      <PageContainer>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">From the Blog</h2>

          <Button variant="outline" asChild>
            <Link href="/blog">All Articles</Link>
          </Button>
        </div>

        <BlogCardGrid posts={recentPosts} />
      </PageContainer>
    </>
  );
}