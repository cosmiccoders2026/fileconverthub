import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

function readingMinutes(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:bg-slate-50/50"
    >
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(post.content)} min read</span>
          {post.tags[0] && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-slate-600 font-medium">{post.tags[0]}</span>
            </>
          )}
        </div>

        <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
          {post.title}
        </h3>

        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {post.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>By {post.author}</span>
        <span className="font-medium text-blue-600 group-hover:underline">Read article →</span>
      </div>
    </Link>
  );
}

export function BlogCardGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
