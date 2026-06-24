import { ToolCardGrid } from "@/components/shared/tool-card";
import type { ToolConfig } from "@/types";

export function RelatedToolsSection({
  tools,
  title = "Related Tools",
}: {
  tools: ToolConfig[];
  title?: string;
}) {
  if (tools.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <ToolCardGrid tools={tools} />
    </section>
  );
}
