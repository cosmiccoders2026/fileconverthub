import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { blogPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Dynamically generate SEO metadata for each specific blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | ${siteConfig.name} Blog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Generate Article Structured Data for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`, // Ensure you have a logo.png in your public folder
      },
    },
  };

  return (
    <PageContainer size="narrow">
      {/* Inject JSON-LD into the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto w-full max-w-3xl">
        <header className="mb-10 flex flex-col items-start gap-4 border-b pb-8">
          <time
            dateTime={post.publishedAt}
            className="text-sm font-medium text-muted-foreground"
          >
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground">{post.summary}</p>
        </header>

        {/* Replace this with your actual MDX or Markdown renderer component */}
        <div className="prose prose-neutral dark:prose-invert md:prose-lg max-w-none">
          <p>
            <em>
              Note: Integrate your markdown/MDX content here. If you are using next-mdx-remote 
              or a similar library, render the compiled source inside this div.
            </em>
          </p>
          
          {/* Example of how text content naturally flows for AdSense readability */}
          <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        </div>
      </article>
    </PageContainer>
  );
}

// Generate static params for all blog posts at build time (highly recommended for performance/SEO)
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
