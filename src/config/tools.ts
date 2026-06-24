import type { ToolConfig } from "@/types";

export const tools: ToolConfig[] = [
  // PDF Tools
  {
    name: "Merge PDF",
    slug: "merge-pdf",
    category: "pdf",
    toolType: "file-upload",
    shortDescription: "Combine multiple PDF files into one document.",
    longDescription:
      "Merge PDF files online for free. Upload two or more PDF documents and combine them into a single file in the order you choose. No watermarks, no signup — just fast PDF merging in your browser.",
    seoTitle: "Merge PDF Online Free — Combine PDF Files",
    seoDescription:
      "Free online PDF merger. Combine multiple PDF files into one document instantly. No watermarks, no account required. Browser-based and secure.",
    keywords: ["merge pdf", "combine pdf", "pdf merger", "join pdf files"],
    faq: [
      {
        question: "How many PDFs can I merge?",
        answer:
          "You can merge as many PDF files as your device memory allows. Most users comfortably merge 10–20 files at once.",
      },
      {
        question: "Will the merged PDF have watermarks?",
        answer: "No. Your merged PDF is delivered without any watermarks or branding.",
      },
      {
        question: "Can I reorder files before merging?",
        answer:
          "Yes. Use the up and down controls to arrange files in your preferred order before merging.",
      },
    ],
    howToUseSteps: [
      "Click or drag PDF files into the upload area.",
      "Reorder files using the move buttons if needed.",
      "Click Merge PDF to combine all files.",
      "Download your merged PDF document.",
    ],
    whyUsePoints: [
      "Combine reports, invoices, or scanned documents in seconds.",
      "No software installation — works on any device with a browser.",
      "Files are processed locally for privacy.",
      "Free with no limits or watermarks.",
    ],
    relatedToolSlugs: ["compress-pdf", "pdf-to-jpg", "jpg-to-pdf"],
    privacyNote:
      "PDF files are processed in your browser and are not uploaded to our servers.",
    featured: true,
  },
  {
    name: "Compress PDF",
    slug: "compress-pdf",
    category: "pdf",
    toolType: "file-upload",
    shortDescription: "Reduce PDF file size while keeping documents readable.",
    longDescription:
      "Compress PDF files online to reduce file size for email, uploads, or storage. Our tool optimizes PDF structure to shrink files without destroying readability.",
    seoTitle: "Compress PDF Online Free — Reduce PDF File Size",
    seoDescription:
      "Free PDF compressor to reduce file size online. Optimize PDFs for email and sharing. No watermarks, browser-based processing.",
    keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "shrink pdf"],
    faq: [
      {
        question: "How much can PDF file size be reduced?",
        answer:
          "Results vary by content. PDFs with large images see the biggest reductions. Text-heavy PDFs may see smaller size changes.",
      },
      {
        question: "Will compression affect quality?",
        answer:
          "Our compression optimizes the PDF structure. Embedded images may be recompressed at a balanced quality level.",
      },
    ],
    howToUseSteps: [
      "Upload your PDF file.",
      "Choose a compression level.",
      "Click Compress PDF.",
      "Download the optimized file.",
    ],
    whyUsePoints: [
      "Send large PDFs via email without hitting size limits.",
      "Save storage space on your device or cloud drive.",
      "Faster uploads to forms and portals.",
    ],
    relatedToolSlugs: ["merge-pdf", "pdf-to-jpg", "jpg-to-pdf"],
    privacyNote:
      "Your PDF is processed in your browser and never stored on our servers.",
    featured: true,
  },
  {
    name: "JPG to PDF",
    slug: "jpg-to-pdf",
    category: "pdf",
    toolType: "file-upload",
    shortDescription: "Convert JPG and JPEG images into a PDF document.",
    longDescription:
      "Turn JPG photos into a PDF file online. Upload one or more images and create a single PDF document — perfect for sharing photos, scans, or receipts.",
    seoTitle: "JPG to PDF Online Free — Convert Images to PDF",
    seoDescription:
      "Convert JPG and JPEG images to PDF online for free. Combine multiple photos into one PDF. No watermarks, instant browser-based conversion.",
    keywords: ["jpg to pdf", "jpeg to pdf", "image to pdf", "photo to pdf"],
    faq: [
      {
        question: "Can I convert multiple JPG files to one PDF?",
        answer:
          "Yes. Upload multiple JPG or JPEG images and they will be combined into a single PDF with one image per page.",
      },
      {
        question: "What image formats are supported?",
        answer: "JPG and JPEG formats are supported for this tool.",
      },
    ],
    howToUseSteps: [
      "Upload JPG or JPEG images.",
      "Reorder images if needed.",
      "Click Convert to PDF.",
      "Download your PDF file.",
    ],
    whyUsePoints: [
      "Create photo albums or document scans as PDFs.",
      "Share multiple images as a single file.",
      "Works without any desktop software.",
    ],
    relatedToolSlugs: ["merge-pdf", "pdf-to-jpg", "compress-pdf"],
    privacyNote: "Images are processed locally in your browser.",
    featured: true,
  },
  {
    name: "PDF to JPG",
    slug: "pdf-to-jpg",
    category: "pdf",
    toolType: "file-upload",
    shortDescription: "Extract PDF pages as JPG images.",
    longDescription:
      "Convert PDF pages to JPG images online. Each page becomes a separate high-quality JPG file, downloadable individually or as a ZIP archive.",
    seoTitle: "PDF to JPG Online Free — Convert PDF Pages to Images",
    seoDescription:
      "Convert PDF to JPG online for free. Extract each page as a JPG image. No watermarks, browser-based, no signup required.",
    keywords: ["pdf to jpg", "pdf to jpeg", "convert pdf to image", "pdf to image"],
    faq: [
      {
        question: "What resolution are the JPG images?",
        answer:
          "Images are rendered at 2x scale for crisp output, suitable for most screen and print uses.",
      },
      {
        question: "Can I download all pages at once?",
        answer:
          "Yes. After conversion, download individual pages or use the download-all option for each page.",
      },
    ],
    howToUseSteps: [
      "Upload your PDF file.",
      "Wait for pages to be extracted.",
      "Preview converted JPG images.",
      "Download individual images or all pages.",
    ],
    whyUsePoints: [
      "Extract slides, diagrams, or scans from PDF documents.",
      "Use PDF content in image editors or presentations.",
      "Share individual pages without sending the full PDF.",
    ],
    relatedToolSlugs: ["jpg-to-pdf", "compress-pdf", "merge-pdf"],
    privacyNote: "PDF processing happens entirely in your browser.",
    featured: true,
  },

  // Image Tools
  {
    name: "PNG to JPG",
    slug: "png-to-jpg",
    category: "image",
    toolType: "file-upload",
    shortDescription: "Convert PNG images to JPG format.",
    longDescription:
      "Convert PNG files to JPG online for free. Reduce file size and ensure compatibility with platforms that prefer JPEG format. Adjustable quality settings included.",
    seoTitle: "PNG to JPG Converter Online Free",
    seoDescription:
      "Free PNG to JPG converter. Convert PNG images to JPEG online with quality control. Browser-based, no watermarks, instant results.",
    keywords: ["png to jpg", "png to jpeg", "convert png", "png converter"],
    faq: [
      {
        question: "Will transparency be preserved?",
        answer:
          "JPG does not support transparency. Transparent areas will be filled with a white background during conversion.",
      },
    ],
    howToUseSteps: [
      "Upload your PNG file.",
      "Adjust quality if desired.",
      "Click Convert to JPG.",
      "Download the converted image.",
    ],
    whyUsePoints: [
      "Smaller file sizes for web and email.",
      "Better compatibility with older systems.",
      "Instant conversion with no uploads to servers.",
    ],
    relatedToolSlugs: ["webp-to-jpg", "compress-image", "resize-image"],
    featured: true,
  },
  {
    name: "WebP to JPG",
    slug: "webp-to-jpg",
    category: "image",
    toolType: "file-upload",
    shortDescription: "Convert WebP images to JPG format.",
    longDescription:
      "Convert WebP images to JPG online. WebP is great for the web, but many apps need JPEG — this tool bridges that gap instantly.",
    seoTitle: "WebP to JPG Converter Online Free",
    seoDescription:
      "Convert WebP to JPG online for free. Fast browser-based conversion with quality control. No signup or watermarks.",
    keywords: ["webp to jpg", "webp to jpeg", "convert webp", "webp converter"],
    faq: [
      {
        question: "Why convert WebP to JPG?",
        answer:
          "Some email clients, design tools, and older software do not support WebP. JPG ensures universal compatibility.",
      },
    ],
    howToUseSteps: [
      "Upload your WebP image.",
      "Set output quality.",
      "Click Convert to JPG.",
      "Download the JPG file.",
    ],
    whyUsePoints: [
      "Use web-optimized images in any application.",
      "Share images with clients who need standard formats.",
      "Processed entirely in your browser.",
    ],
    relatedToolSlugs: ["png-to-jpg", "compress-image", "resize-image"],
    featured: true,
  },
  {
    name: "Resize Image",
    slug: "resize-image",
    category: "image",
    toolType: "file-upload",
    shortDescription: "Resize images to exact width and height dimensions.",
    longDescription:
      "Resize images online to specific pixel dimensions. Perfect for social media, thumbnails, profile pictures, and web optimization.",
    seoTitle: "Resize Image Online Free — Change Image Dimensions",
    seoDescription:
      "Free online image resizer. Set exact width and height in pixels. Supports PNG, JPG, WebP. Browser-based, no watermarks.",
    keywords: ["resize image", "image resizer", "change image size", "scale image"],
    faq: [
      {
        question: "Can I maintain aspect ratio?",
        answer:
          "Yes. Enable the maintain aspect ratio option to automatically calculate dimensions when you change width or height.",
      },
    ],
    howToUseSteps: [
      "Upload your image.",
      "Enter desired width and height.",
      "Toggle aspect ratio lock if needed.",
      "Click Resize and download.",
    ],
    whyUsePoints: [
      "Create perfectly sized images for social platforms.",
      "Reduce dimensions for faster page loads.",
      "No software needed — works on mobile and desktop.",
    ],
    relatedToolSlugs: ["compress-image", "png-to-jpg", "webp-to-jpg"],
    featured: true,
  },
  {
    name: "Compress Image",
    slug: "compress-image",
    category: "image",
    toolType: "file-upload",
    shortDescription: "Reduce image file size with adjustable quality.",
    longDescription:
      "Compress images online to reduce file size without visible quality loss. Control the compression level and see size reduction before downloading.",
    seoTitle: "Compress Image Online Free — Reduce Image File Size",
    seoDescription:
      "Free image compressor. Reduce JPG, PNG, and WebP file sizes online. Adjustable quality. Browser-based, no watermarks.",
    keywords: ["compress image", "reduce image size", "image compressor", "optimize image"],
    faq: [
      {
        question: "Which formats can be compressed?",
        answer: "JPG, PNG, and WebP images are supported.",
      },
      {
        question: "How much size reduction can I expect?",
        answer:
          "Depends on the original image and quality setting. High-resolution photos often see 40–70% reduction at balanced quality.",
      },
    ],
    howToUseSteps: [
      "Upload your image.",
      "Adjust the quality slider.",
      "Preview the estimated file size.",
      "Download the compressed image.",
    ],
    whyUsePoints: [
      "Speed up website loading times.",
      "Fit images within upload size limits.",
      "Save bandwidth when sharing photos.",
    ],
    relatedToolSlugs: ["resize-image", "png-to-jpg", "webp-to-jpg"],
    featured: true,
  },

  // Text Tools
  {
    name: "Word Counter",
    slug: "word-counter",
    category: "text",
    toolType: "text-input",
    shortDescription: "Count words, characters, sentences, and paragraphs instantly.",
    longDescription:
      "Free online word counter for writers, students, and content creators. Get real-time counts of words, characters, sentences, paragraphs, and reading time.",
    seoTitle: "Word Counter Online Free — Count Words & Characters",
    seoDescription:
      "Free word counter tool. Count words, characters, sentences, and paragraphs in real time. No signup, works instantly in your browser.",
    keywords: ["word counter", "character counter", "word count", "text counter"],
    faq: [
      {
        question: "How is reading time calculated?",
        answer:
          "Reading time is estimated at 200 words per minute, a standard average for adult readers.",
      },
    ],
    howToUseSteps: [
      "Paste or type your text in the input area.",
      "View live counts for words, characters, and more.",
      "Copy or edit your text as needed.",
    ],
    whyUsePoints: [
      "Meet essay and article word limits.",
      "Track content length for SEO and social posts.",
      "Instant results with zero loading time.",
    ],
    relatedToolSlugs: ["case-converter", "text-cleaner", "remove-duplicate-lines"],
    featured: true,
  },
  {
    name: "Case Converter",
    slug: "case-converter",
    category: "text",
    toolType: "text-input",
    shortDescription: "Convert text to uppercase, lowercase, title case, and more.",
    longDescription:
      "Change text case instantly — uppercase, lowercase, title case, sentence case, and alternating case. Perfect for formatting titles, headings, and data cleanup.",
    seoTitle: "Case Converter Online Free — Change Text Case",
    seoDescription:
      "Free case converter tool. Convert text to uppercase, lowercase, title case, and more. Instant browser-based formatting.",
    keywords: ["case converter", "uppercase", "lowercase", "title case", "text case"],
    faq: [
      {
        question: "What is title case?",
        answer:
          "Title case capitalizes the first letter of each word, commonly used for headlines and titles.",
      },
    ],
    howToUseSteps: [
      "Paste your text into the input field.",
      "Click the case style you want to apply.",
      "Copy the converted text from the output.",
    ],
    whyUsePoints: [
      "Fix inconsistent capitalization in documents.",
      "Format headings and titles quickly.",
      "Clean up data exported from spreadsheets.",
    ],
    relatedToolSlugs: ["word-counter", "text-cleaner", "remove-duplicate-lines"],
    featured: true,
  },
  {
    name: "Remove Duplicate Lines",
    slug: "remove-duplicate-lines",
    category: "text",
    toolType: "text-input",
    shortDescription: "Remove duplicate lines from text while preserving order.",
    longDescription:
      "Clean up lists, logs, and data by removing duplicate lines. Choose case-sensitive or case-insensitive matching and keep the first occurrence of each line.",
    seoTitle: "Remove Duplicate Lines Online Free",
    seoDescription:
      "Free tool to remove duplicate lines from text. Case-sensitive option available. Instant, browser-based, no signup.",
    keywords: ["remove duplicate lines", "deduplicate text", "unique lines", "text dedup"],
    faq: [
      {
        question: "Does it preserve line order?",
        answer:
          "Yes. The first occurrence of each line is kept and remaining duplicates are removed while maintaining original order.",
      },
    ],
    howToUseSteps: [
      "Paste text with duplicate lines.",
      "Choose case-sensitive matching if needed.",
      "Click Remove Duplicates.",
      "Copy the cleaned text.",
    ],
    whyUsePoints: [
      "Clean email lists and contact exports.",
      "Deduplicate log files and data dumps.",
      "Prepare unique keyword lists for SEO.",
    ],
    relatedToolSlugs: ["text-cleaner", "case-converter", "word-counter"],
    featured: true,
  },
  {
    name: "Text Cleaner",
    slug: "text-cleaner",
    category: "text",
    toolType: "text-input",
    shortDescription: "Clean up messy text — extra spaces, line breaks, and formatting.",
    longDescription:
      "Clean copied text by removing extra whitespace, normalizing line breaks, stripping special characters, and fixing common formatting issues from PDFs and web pages.",
    seoTitle: "Text Cleaner Online Free — Clean & Format Text",
    seoDescription:
      "Free text cleaner tool. Remove extra spaces, fix line breaks, and clean messy copied text. Instant browser-based processing.",
    keywords: ["text cleaner", "clean text", "remove extra spaces", "format text"],
    faq: [
      {
        question: "What does the text cleaner fix?",
        answer:
          "It removes extra spaces, trims lines, normalizes line breaks, and can strip non-printable characters from copied content.",
      },
    ],
    howToUseSteps: [
      "Paste messy or copied text.",
      "Select cleaning options.",
      "Click Clean Text.",
      "Copy the formatted result.",
    ],
    whyUsePoints: [
      "Fix text copied from PDFs and websites.",
      "Prepare content for publishing or coding.",
      "Remove invisible characters that cause issues.",
    ],
    relatedToolSlugs: ["remove-duplicate-lines", "case-converter", "word-counter"],
    featured: true,
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return tools.filter((t) => t.category === category);
}

export function getFeaturedTools(): ToolConfig[] {
  return tools.filter((t) => t.featured);
}

export function getRelatedTools(slugs: string[]): ToolConfig[] {
  return slugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolConfig => t !== undefined);
}

export function getAllToolSlugs(): string[] {
  return tools.map((t) => t.slug);
}
