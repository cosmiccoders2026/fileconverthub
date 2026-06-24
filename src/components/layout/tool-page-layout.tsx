import { AdSlot } from "@/components/ads/ad-slot";
import { RelatedToolsSection } from "@/components/shared/related-tools";
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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left ad rail - desktop only */}
        <aside className="hidden lg:col-span-2 lg:block">
          <AdSlot variant="rail" className="sticky top-24" />
        </aside>

        {/* Main tool column */}
        <main className="lg:col-span-7 space-y-8">
          {children}
        </main>

        {/* Right rail - ads + related tools */}
        <aside className="lg:col-span-3 space-y-6">
          <AdSlot variant="sidebar" className="hidden lg:block sticky top-24" />
          {relatedTools.length > 0 && (
            <div className="hidden lg:block">
              <RelatedToolsSection tools={relatedTools} title="Related Tools" />
            </div>
          )}
        </aside>
      </div>

      {/* Mobile related tools */}
      {relatedTools.length > 0 && (
        <div className="mt-8 lg:hidden">
          <RelatedToolsSection tools={relatedTools} />
        </div>
      )}
    </div>
  );
}
