import type { Metadata } from "next";
import { CategoryPageContent, generateCategoryPage } from "@/components/pages/category-page";

export const metadata: Metadata =
  generateCategoryPage("/pdf-tools")?.metadata ?? { title: "PDF Tools" };

export default function PdfToolsPage() {
  return <CategoryPageContent route="/pdf-tools" />;
}
