import type { Metadata } from "next";
import { CategoryPageContent, generateCategoryPage } from "@/components/pages/category-page";

export const metadata: Metadata =
  generateCategoryPage("/image-tools")?.metadata ?? { title: "Image Tools" };

export default function ImageToolsPage() {
  return <CategoryPageContent route="/image-tools" />;
}
