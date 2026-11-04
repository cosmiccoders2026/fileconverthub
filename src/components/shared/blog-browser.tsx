 "use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { BlogPost } from "@/types";

function readingMinutes(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export function BlogBrowser({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags))).sort()], [posts]);
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesCategory = category === "All" || post.tags.includes(category);
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [post.title, post.description, ...post.tags].join(" ").toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  }), [posts, query, category]);

  return (
    <section className="space-y-8">
      <div className="mx-auto max-w-2xl space-y-4">
        <label className="relative block">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guides and topics..." className="h-12 pl-10" />
        </label>
        <div className="flex flex-wrap justify-center gap-2" aria-label="Filter articles by category">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${category === item ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground" aria-live="polite">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</p>
      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, index) => (
            <article key={post.slug} className={`flex h-full flex-col rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md ${index === 0 && !query && category === "All" ? "md:col-span-2 lg:col-span-2" : ""}`}>
              <div className="mb-4 flex flex-wrap gap-2">{post.tags.slice(0, 2).map((tag) => <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{tag}</span>)}</div>
              <h2 className="text-xl font-semibold leading-snug"><Link className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{post.description}</p>
              <div className="mt-6 flex items-center justify-between gap-3 border-t pt-4 text-xs text-muted-foreground">
                <time dateTime={post.publishedAt}>{new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                <span>{readingMinutes(post.content)} min read</span>
              </div>
            </article>
          ))}
        </div>
      ) : <p className="rounded-xl border p-8 text-center text-muted-foreground">No articles match that search. Try another phrase or category.</p>}
    </section>
  );
}
