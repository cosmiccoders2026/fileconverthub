import React from "react";

export function HowToUseSection({
  steps,
  title = "How to Use This Tool",
}: {
  steps: string[];
  title?: string;
}) {
  return (
    <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
        {title}
      </h2>
      <ol className="space-y-2.5">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
            <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums shrink-0 pt-0.5">
              {String(index + 1).padStart(2, "0")}.
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
