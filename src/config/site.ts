import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "FileConvertHub",
  tagline: "Client-side file conversion and text utilities.",
  description:
    "Free, browser-based utilities to merge and compress PDFs, convert and resize images, count words, and clean text locally on your device.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://fileconverthub.vercel.app",
  email: "vilumamtechnologies@gmail.com",
};

export const navLinks = [
  { label: "PDF Tools", href: "/pdf-tools" },
  { label: "Image Tools", href: "/image-tools" },
  { label: "Text Tools", href: "/text-tools" },
  { label: "Guides", href: "/blog" },
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
    { label: "Guides & Articles", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
