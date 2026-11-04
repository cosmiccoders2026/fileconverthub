declare module 'next' {
  export interface Metadata {
    title?: string | { default: string; template?: string };
    description?: string;
    keywords?: string[];
    alternates?: { canonical?: string };
    openGraph?: any;
    twitter?: any;
    robots?: any;
    verification?: any;
    other?: Record<string, string>;
    icons?: any;
    metadataBase?: URL;
  }

  export namespace MetadataRoute {
    export interface Robots {
      rules: {
        userAgent: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
      };
      sitemap?: string | string[];
      host?: string;
    }
    export interface SitemapItem {
      url: string;
      lastModified?: string | Date;
      changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
      priority?: number;
    }
    export type Sitemap = SitemapItem[];
  }
}

declare module 'next/navigation' {
  export function notFound(): never;
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
  };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module 'next/link' {
  import React, { AnchorHTMLAttributes } from 'react';
  export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    asChild?: boolean;
    replace?: boolean;
    scroll?: boolean;
  }
  const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
  export default Link;
}

declare module 'next/server' {
  export class NextRequest extends Request {}
  export class NextResponse extends Response {
    static json(body: any, init?: ResponseInit): NextResponse;
  }
}

declare module 'next/font/google' {
  export function Geist(options?: any): { variable: string };
  export function Geist_Mono(options?: any): { variable: string };
}
