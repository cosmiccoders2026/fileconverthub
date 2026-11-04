import React from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
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
    <div
      role="status"
      aria-live="polite"
      className={cn("rounded-md text-xs leading-normal", className)}
    >
      {status === "processing" && (
        <div className="flex items-center gap-2 border border-blue-200 bg-blue-50/70 p-3 text-blue-800">
          <Loader2 className="h-4 w-4 animate-spin shrink-0 text-blue-600" />
          <span>Processing locally in browser memory. Please keep this tab active...</span>
        </div>
      )}

      {status === "success" && (
        <div className="flex items-center gap-2 border border-emerald-200 bg-emerald-50/70 p-3 text-emerald-800">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>Operation completed successfully. Download initiated.</span>
        </div>
      )}

      {status === "error" && error && (
        <div className="flex items-start gap-2 border border-red-200 bg-red-50/70 p-3 text-red-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
