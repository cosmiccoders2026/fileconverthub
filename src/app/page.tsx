"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Image,
  Type,
  ArrowRight,
  ShieldCheck,
  Cpu,
  DownloadCloud,
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
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const featuredTools = getFeaturedTools();
  const recentPosts = getRecentBlogPosts(3);

  const filteredTools = useMemo(() => {
    let list = tools;
    if (activeCategory !== "all") {
      list = list.filter((tool) => tool.category === activeCategory);
    }
    if (!search.trim()) return list;

    const q = search.toLowerCase();
    return list.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((keyword) => keyword.toLowerCase().includes(q))
    );
  }, [search, activeCategory]);

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="border-b border-slate-200 pb-12 sm:pb-16">
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Browser-based file conversion and text utilities
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Convert, compress, resize, and edit everyday documents locally on your device.
              Files are processed in memory through client-side WebAssembly and HTML5 Canvas — zero remote uploads, no account required.
            </p>

            {/* Quick Search */}
            <div className="relative mx-auto max-w-lg">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search utilities (e.g. merge pdf, png to jpg, word counter)..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-11 pl-10 pr-4 text-sm bg-white"
              />
            </div>

            {/* Category Quick Jumps */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeCategory === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                }`}
              >
                All Tools ({tools.length})
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeCategory === category.id
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                  }`}
                >
                  {category.displayName}
                </button>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Main Tool Grid / Search Results */}
      <PageContainer>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              {search.trim() ? "Search Results" : activeCategory === "all" ? "Core Utilities" : `${categories.find((c) => c.id === activeCategory)?.displayName}`}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Showing {filteredTools.length} of {tools.length} available tools
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/tools">All Tools Catalog</Link>
            </Button>
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <ToolCardGrid tools={filteredTools} />
        ) : (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-12 text-center space-y-2">
            <p className="text-sm font-medium text-slate-800">
              No utilities match your search
            </p>
            <p className="text-xs text-slate-500">
              Try searching for "pdf", "jpg", "png", "resize", or "word counter".
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="mt-2"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </PageContainer>

      {/* Technical Architecture & Privacy Framework */}
      <section className="border-y border-slate-200 bg-slate-50/60 py-12">
        <PageContainer>
          <div className="max-w-2xl mb-8 space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Technical Architecture &amp; Privacy
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              How FileConvertHub executes document operations without remote server dependency.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-slate-900">
                Local Client Execution
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Document merges, raster conversions, and text transformations run within your local web browser process using HTML5 Canvas and WebAssembly. No source files are sent to backend storage servers.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-2.5">
              <Cpu className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-slate-900">
                Memory-Aware Batch Processing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tools accommodate up to 350 files per selection and individual file sizes up to 100 MB. Processing operates sequentially in local RAM to prevent browser memory exhaustion.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-2.5">
              <DownloadCloud className="h-5 w-5 text-slate-700" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-slate-900">
                Unmarked Output
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Downloaded outputs are generated directly as raw standard formats without added watermarks, injected headers, forced account paywalls, or third-party branding.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Recent Technical Guides */}
      <PageContainer>
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Technical Guides &amp; Documentation
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Articles explaining file format nuances, rasterization, and practical workflows
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/blog">Browse All Guides</Link>
          </Button>
        </div>

        <BlogCardGrid posts={recentPosts} />
      </PageContainer>
    </div>
  );
}
