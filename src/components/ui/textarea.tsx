import * as React from "react";
import { cn } from "@/lib/cn";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
