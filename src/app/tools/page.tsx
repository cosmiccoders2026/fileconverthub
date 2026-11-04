import React from "react";
import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { ToolCardGrid } from "@/components/shared/tool-card";
import { createMetadata } from "@/lib/metadata";
import { tools } from "@/config/tools";
import { categories } from "@/config/categories";

export const metadata: Metadata = createMetadata({
  title: "All Free Online Tools",
  description:
    "Complete directory of free browser-based PDF, image, and text utilities. Fast, private, and no signup required.",
  path: "/tools",
  keywords: ["online tools", "free tools", "file converter", "utility tools"],
});

export default function AllToolsPage() {
  return (
    <PageContainer size="wide" className="py-8 sm:py-12 space-y-12">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Tools Directory
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Browse the complete collection of client-side file and text utilities. All tools operate in memory on your device without account registration.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => {
          const categoryTools = tools.filter((t) => t.category === category.id);
          return (
            <section key={category.id} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    {category.displayName}
                  </h2>
                  <p className="text-xs text-slate-500">{category.intro}</p>
                </div>
                <span className="font-mono text-xs text-slate-400 tabular-nums">
                  {categoryTools.length} {categoryTools.length === 1 ? "tool" : "tools"}
                </span>
              </div>
              <ToolCardGrid tools={categoryTools} />
            </section>
          );
        })}
      </div>
    </PageContainer>
  );
}
