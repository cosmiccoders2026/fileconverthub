import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface MetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
  noIndex = false,
}: MetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function createArticleMetadata({
  title,
  description,
  path,
  publishedAt,
  author,
  tags = [],
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  author: string;
  tags?: string[];
}): Metadata {
  const base = createMetadata({
    title,
    description,
    path,
    keywords: tags,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: publishedAt,
      authors: [author],
      tags,
    },
  };
}
