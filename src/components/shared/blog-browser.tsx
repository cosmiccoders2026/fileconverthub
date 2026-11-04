import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

function readingMinutes(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export function BlogBrowser({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags))).sort()],
    [posts]
  );

  const filtered = useMemo(
    () =>
      posts.filter((post) => {
        const matchesCategory =
          category === "All" || post.tags.includes(category);
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          [post.title, post.description, ...post.tags]
            .join(" ")
            .toLowerCase()
            .includes(q);
        return matchesCategory && matchesQuery;
      }),
    [posts, query, category]
  );

  return (
    <section className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search guides by title, format, or keyword..."
            className="h-10 pl-9 pr-4 text-sm"
          />
        </div>

        {/* Clean Segmented Filter Controls */}
        <div
          className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-lg"
          aria-label="Filter guides by topic"
        >
          {categories.map((item) => {
            const isActive = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={isActive}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs text-slate-500">
        <span>
          <strong className="font-semibold text-slate-800 tabular-nums">
            {filtered.length}
          </strong>{" "}
          {filtered.length === 1 ? "article" : "articles"}
        </span>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-blue-600 hover:underline"
          >
            Clear search
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:bg-slate-50/50"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{post.tags[0]}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{readingMinutes(post.content)} min</span>
                </div>

                <h2 className="text-base font-semibold leading-snug text-slate-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Read guide →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-12 text-center space-y-2">
          <p className="text-sm font-medium text-slate-800">
            No matching articles found
          </p>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or selecting "All" categories.
          </p>
        </div>
      )}
    </section>
  );
}
