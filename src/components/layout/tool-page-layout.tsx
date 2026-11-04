import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import type { ToolConfig } from "@/types";

interface ToolPageLayoutProps {
  children: React.ReactNode;
  relatedTools?: ToolConfig[];
}

export function ToolPageLayout({
  children,
  relatedTools = [],
}: ToolPageLayoutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Primary Tool Workbench (Left 8 cols) */}
        <main className="lg:col-span-8 space-y-8">
          {children}
        </main>

        {/* Technical Rail (Right 4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Privacy & Engine Overview Box */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              <span>Browser Sandbox</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This utility runs locally within your browser tab. Your files and typed text remain on your device and are never transmitted to external cloud servers.
            </p>
            <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1">
              <div>· Engine: Client WebAssembly &amp; HTML5 Canvas</div>
              <div>· Per-file memory limit: 100 MB</div>
              <div>· Max batch selection: 350 files</div>
            </div>
          </div>

          {/* Related Tools Box */}
          {relatedTools.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                Related Utilities
              </h3>
              <ul className="space-y-2">
                {relatedTools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="group flex items-center justify-between rounded-md p-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <span className="font-medium truncate">{tool.name}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Category Hubs */}
          <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Tool Directories
            </h3>
            <div className="flex flex-col gap-1.5 text-xs">
              <Link href="/pdf-tools" className="text-slate-600 hover:text-blue-600 transition-colors">
                PDF Tools Hub →
              </Link>
              <Link href="/image-tools" className="text-slate-600 hover:text-blue-600 transition-colors">
                Image Tools Hub →
              </Link>
              <Link href="/text-tools" className="text-slate-600 hover:text-blue-600 transition-colors">
                Text Utilities Hub →
              </Link>
              <Link href="/tools" className="text-slate-600 hover:text-blue-600 transition-colors">
                All 12 Tools Index →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
