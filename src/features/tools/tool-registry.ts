import type { ComponentType } from "react";
import {
  MergePdfTool,
  CompressPdfTool,
  JpgToPdfTool,
  PdfToJpgTool,
} from "@/features/pdf/pdf-tools";
import {
  PngToJpgTool,
  WebpToJpgTool,
  ResizeImageTool,
  CompressImageTool,
} from "@/features/image/image-tools";
import {
  WordCounterTool,
  CaseConverterTool,
  RemoveDuplicateLinesTool,
  TextCleanerTool,
} from "@/features/text/text-tools";

export const toolRegistry: Record<string, ComponentType> = {
  "merge-pdf": MergePdfTool,
  "compress-pdf": CompressPdfTool,
  "jpg-to-pdf": JpgToPdfTool,
  "pdf-to-jpg": PdfToJpgTool,
  "png-to-jpg": PngToJpgTool,
  "webp-to-jpg": WebpToJpgTool,
  "resize-image": ResizeImageTool,
  "compress-image": CompressImageTool,
  "word-counter": WordCounterTool,
  "case-converter": CaseConverterTool,
  "remove-duplicate-lines": RemoveDuplicateLinesTool,
  "text-cleaner": TextCleanerTool,
};

export function getToolComponent(slug: string): ComponentType | null {
  return toolRegistry[slug] || null;
}
