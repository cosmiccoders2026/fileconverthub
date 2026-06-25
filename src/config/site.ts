import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "FileConvertHub",
  tagline:
    "Free Online PDF, Image & Text Tools — Fast, Secure, No Signup",
  description:
    "Free online PDF, image, and text tools. Merge PDF, compress PDF, convert JPG to PDF, resize images, count words, clean text, and more with FileConvertHub.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://fileconverthub-final.vercel.app",
  email: "vilumamtechnologies@gmail.com",
};

export const navLinks = [
  { label: "PDF Tools", href: "/pdf-tools" },
  { label: "Image Tools", href: "/image-tools" },
  { label: "Text Tools", href: "/text-tools" },
  { label: "Blog", href: "/blog" },
];

export const footerLinks = {
  tools: [
    { label: "All Tools", href: "/tools" },
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Image Tools", href: "/image-tools" },
    { label: "Text Tools", href: "/text-tools" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
