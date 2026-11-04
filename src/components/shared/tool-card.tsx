import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ToolConfig } from "@/types";
import { getCategoryLabel } from "@/lib/utils";

export function ToolCard({ tool }: { tool: ToolConfig }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:bg-slate-50/50"
    >
      <div className="space-y-2">
        <div className="text-xs font-medium text-slate-500">
          {getCategoryLabel(tool.category)}
        </div>
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
        <span>Open tool</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}

export function ToolCardGrid({ tools }: { tools: ToolConfig[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
