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
import { ToolCardGrid } from "@/components/shared/tool-card";
import { BlogCardGrid } from "@/components/shared/blog-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
      <section className="border-b bg-gradient-to-b from-primary/5 to-background">
        <PageContainer className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-balance">
              Free Online PDF, Image & Text Conversion Tools
            </h1>

            <p className="text-lg text-muted-foreground text-balance">
              Convert, compress, merge, resize, and clean files instantly with
              FileConvertHub. Use free online PDF tools, image tools, and text
              tools directly in your browser with no signup.
            </p>

            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search PDF, image, and text tools..."
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

      <PageContainer>
        <h2 className="mb-6 text-2xl font-bold">Browse Free Online Tools by Category</h2>

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
                  {category.description.slice(0, 100)}...
                </p>
              </Link>
            );
          })}
        </div>
      </PageContainer>

      <PageContainer>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular File Conversion Tools</h2>

          <Button variant="outline" asChild>
            <Link href="/tools">View All Tools</Link>
          </Button>
        </div>

        <ToolCardGrid tools={featuredTools} />
      </PageContainer>

      <section className="bg-muted/30">
        <PageContainer>
          <h2 className="mb-8 text-2xl font-bold text-center">
            Why Use FileConvertHub?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "Fast & Instant",
                desc: "Convert PDFs, images, and text in seconds without waiting in long queues.",
              },
              {
                icon: Shield,
                title: "Private & Secure",
                desc: "Many tools run directly in your browser, helping your files stay private.",
              },
              {
                icon: Globe,
                title: "No Signup Required",
                desc: "Start using online file tools immediately without creating an account.",
              },
              {
                icon: Sparkles,
                title: "Clean Output",
                desc: "Download clean converted, compressed, or edited files without unnecessary steps.",
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

      <PageContainer>
        <h2 className="mb-8 text-2xl font-bold text-center">
          How FileConvertHub Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Choose a Tool",
              desc: "Select a PDF converter, image converter, compressor, text cleaner, or counter tool.",
            },
            {
              step: "2",
              title: "Upload or Paste",
              desc: "Upload your file or paste your text directly into the tool page.",
            },
            {
              step: "3",
              title: "Download Result",
              desc: "Get your converted, compressed, resized, or cleaned result instantly.",
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

      <PageContainer>
        <h2 className="mb-4 text-2xl font-bold">
          Free PDF, Image, and Text Tools for Everyday Work
        </h2>

        <div className="space-y-4 text-muted-foreground">
          <p>
            FileConvertHub helps students, professionals, creators, and everyday
            users handle common file tasks without installing extra software.
            You can merge PDF files, compress PDF documents, convert JPG images
            to PDF, convert PDF pages to JPG, resize images, compress images,
            clean text, count words, and change text case from one simple online
            platform.
          </p>

          <p>
            The website is designed to be simple, fast, and easy to use on both
            mobile and desktop. Whether you want to reduce file size, prepare an
            image for upload, organize documents, or format text quickly,
            FileConvertHub gives you practical tools that work directly from
            your browser.
          </p>
        </div>
      </PageContainer>

      <PageContainer>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">File Conversion Guides and Tips</h2>

          <Button variant="outline" asChild>
            <Link href="/blog">All Articles</Link>
          </Button>
        </div>

        <BlogCardGrid posts={recentPosts} />
      </PageContainer>
    </>
  );
}
