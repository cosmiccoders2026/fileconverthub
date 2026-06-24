import type { CategoryConfig } from "@/types";

export const categories: CategoryConfig[] = [
  {
    id: "pdf",
    displayName: "PDF Tools",
    route: "/pdf-tools",
    intro:
      "Work with PDF files online — merge, compress, convert to images, and create PDFs from JPG files. All tools run in your browser with no account required.",
    description:
      "Our free PDF tools help you merge multiple PDFs, reduce file size, convert PDF pages to JPG images, and turn JPG photos into PDF documents. Fast, private, and completely free.",
    seoTitle: "Free PDF Tools Online — Merge, Compress & Convert PDFs",
    seoDescription:
      "Free online PDF tools to merge, compress, convert PDF to JPG, and JPG to PDF. No signup, no watermarks. Fast and secure browser-based processing.",
    faq: [
      {
        question: "Are these PDF tools really free?",
        answer:
          "Yes. Every PDF tool on FileConvertHub is completely free with no hidden limits, watermarks, or account requirements.",
      },
      {
        question: "Is my PDF data secure?",
        answer:
          "Most PDF tools process files directly in your browser. Your documents are not uploaded to our servers unless you use an AI writing tool that requires server processing.",
      },
      {
        question: "Do converted PDFs have watermarks?",
        answer:
          "No. We never add watermarks or branding to your output files. Your documents remain exactly as you expect.",
      },
      {
        question: "What is the maximum file size?",
        answer:
          "File size limits depend on your device memory. For most users, files up to 50MB work well. Very large files may take longer to process.",
      },
    ],
    featuredToolSlugs: ["merge-pdf", "compress-pdf", "pdf-to-jpg", "jpg-to-pdf"],
  },
  {
    id: "image",
    displayName: "Image Tools",
    route: "/image-tools",
    intro:
      "Convert, resize, and compress images online. Support for PNG, JPG, WebP, and more — all processed in your browser for maximum privacy.",
    description:
      "Free image tools to convert PNG and WebP to JPG, resize images to exact dimensions, and compress photos without losing noticeable quality.",
    seoTitle: "Free Image Tools Online — Convert, Resize & Compress Images",
    seoDescription:
      "Free online image tools to convert PNG to JPG, WebP to JPG, resize images, and compress photos. Browser-based, no signup, no watermarks.",
    faq: [
      {
        question: "Where are my images processed?",
        answer:
          "All image tools run entirely in your browser using the Canvas API. Your images never leave your device.",
      },
      {
        question: "Will image quality be preserved?",
        answer:
          "Conversion and resize tools maintain quality based on your settings. The compress tool lets you choose a quality level to balance size and clarity.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "We support PNG, JPG, JPEG, WebP, and GIF for most tools. Output formats depend on the specific tool you use.",
      },
    ],
    featuredToolSlugs: [
      "png-to-jpg",
      "webp-to-jpg",
      "resize-image",
      "compress-image",
    ],
  },
  {
    id: "text",
    displayName: "Text Tools",
    route: "/text-tools",
    intro:
      "Instant text utilities for writers, students, and professionals. Count words, change case, clean formatting, and remove duplicate lines — all in real time.",
    description:
      "Free text tools that work instantly in your browser. No uploads, no delays. Perfect for editing documents, preparing content, and cleaning up copied text.",
    seoTitle: "Free Text Tools Online — Word Counter, Case Converter & More",
    seoDescription:
      "Free online text tools: word counter, case converter, duplicate line remover, and text cleaner. Instant, browser-based, no signup required.",
    faq: [
      {
        question: "Is my text stored anywhere?",
        answer:
          "No. Text tools process everything locally in your browser. We do not store, log, or transmit your text.",
      },
      {
        question: "Do text tools work offline?",
        answer:
          "Once the page loads, text tools work without an internet connection since all processing happens on your device.",
      },
    ],
    featuredToolSlugs: [
      "word-counter",
      "case-converter",
      "remove-duplicate-lines",
      "text-cleaner",
    ],
  },
];

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

export function getCategoryByRoute(route: string) {
  return categories.find((c) => c.route === route);
}
