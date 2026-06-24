import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "FileConvertHub",
  tagline:
    "Free online file, image, PDF, and text tools — all in one place.",
  description:
    "FileConvertHub offers free online tools to convert, compress, merge, and edit PDFs, images, and text. No signup required. Fast, secure, and easy to use.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://fileconverthub.com",
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
