export type ToolCategory = "pdf" | "image" | "text" | "ai-writing";

export type ToolType = "file-upload" | "text-input" | "ai-text";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolConfig {
  name: string;
  slug: string;
  category: ToolCategory;
  toolType: ToolType;
  shortDescription: string;
  longDescription: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  faq: FAQItem[];
  howToUseSteps: string[];
  whyUsePoints: string[];
  relatedToolSlugs: string[];
  privacyNote?: string;
  featured?: boolean;
}

export interface CategoryConfig {
  id: ToolCategory;
  displayName: string;
  route: string;
  intro: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  faq: FAQItem[];
  featuredToolSlugs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  relatedToolSlugs: string[];
  content: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  social?: {
    twitter?: string;
  };
}
