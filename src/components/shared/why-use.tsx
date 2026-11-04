import React from "react";

export function WhyUseSection({
  points,
  title = "Key Specifications & Advantages",
}: {
  points: string[];
  title?: string;
}) {
  return (
    <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
        {title}
      </h2>
      <ul className="space-y-2.5">
        {points.map((point, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed"
          >
            <span className="text-blue-600 font-bold shrink-0 leading-none pt-1">
              —
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
