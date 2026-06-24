import { CheckCircle2 } from "lucide-react";

export function WhyUseSection({
  points,
  title = "Why Use This Tool",
}: {
  points: string[];
  title?: string;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li
            key={index}
            className="flex gap-3 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
