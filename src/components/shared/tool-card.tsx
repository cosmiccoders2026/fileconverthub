import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ToolConfig } from "@/types";
import { getCategoryLabel } from "@/lib/utils";

export function ToolCard({ tool }: { tool: ToolConfig }) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="text-xs font-medium text-primary">
            {getCategoryLabel(tool.category)}
          </div>
          <CardTitle className="text-base">{tool.name}</CardTitle>
          <CardDescription>{tool.shortDescription}</CardDescription>
        </CardHeader>
      </Card>
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
