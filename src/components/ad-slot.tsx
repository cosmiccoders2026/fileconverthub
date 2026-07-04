import { cn } from "@/lib/cn";

interface AdSlotProps {
  variant?: "banner" | "sidebar" | "inline" | "rail";
  className?: string;
  label?: string;
}

export function AdSlot({
  variant = "inline",
  className,
  label = "Advertisement",
}: AdSlotProps) {
  const variantClasses = {
    banner: "h-24 md:h-28",
    sidebar: "h-64 md:h-80",
    inline: "h-32 md:h-36",
    rail: "h-96 min-h-[250px]",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 bg-muted/30",
        variantClasses[variant],
        className
      )}
      data-ad-slot={variant}
      aria-label={label}
    >
      <span className="text-xs text-muted-foreground/60">{label}</span>
    </div>
  );
}
