import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { ToolCardGrid } from "@/components/shared/tool-card";
import { createMetadata } from "@/lib/metadata";
import { tools } from "@/config/tools";
import { categories } from "@/config/categories";

export const metadata: Metadata = createMetadata({
  title: "All Free Online Tools",
  description:
    "Browse all free online tools on FileConvertHub — PDF, image, text, and AI writing utilities. No signup required.",
  path: "/tools",
  keywords: ["online tools", "free tools", "file converter", "utility tools"],
});

export default function AllToolsPage() {
  return (
    <PageContainer size="wide">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">All Tools</h1>
        <p className="text-muted-foreground max-w-2xl">
          Browse our complete collection of free online tools. Convert files,
          edit images, process text, and improve writing — all without an account.
        </p>
      </div>

  

      {categories.map((category) => {
        const categoryTools = tools.filter((t) => t.category === category.id);
        return (
          <section key={category.id} className="mb-12">
            <h2 className="mb-4 text-xl font-semibold">{category.displayName}</h2>
            <ToolCardGrid tools={categoryTools} />
          </section>
        );
      })}
    </PageContainer>
  );
}
