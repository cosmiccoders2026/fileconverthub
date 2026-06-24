import { cn } from "@/lib/cn";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function PageContainer({
  children,
  className,
  size = "default",
}: PageContainerProps) {
  const sizeClasses = {
    default: "max-w-5xl",
    narrow: "max-w-3xl",
    wide: "max-w-7xl",
  };

  return (
    <div
      className={cn(
        "container mx-auto px-4 py-8 md:py-12",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
