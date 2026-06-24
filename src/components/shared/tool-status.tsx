"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function ToolStatus({
  status,
  error,
  className,
}: {
  status: "idle" | "processing" | "success" | "error";
  error?: string | null;
  className?: string;
}) {
  if (status === "idle") return null;

  return (
    <div className={cn("rounded-lg p-4 text-sm", className)}>
      {status === "processing" && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </div>
      )}
      {status === "success" && (
        <p className="text-green-600 dark:text-green-400">
          Done! Your file is ready to download.
        </p>
      )}
      {status === "error" && error && (
        <p className="text-destructive">{error}</p>
      )}
    </div>
  );
}
