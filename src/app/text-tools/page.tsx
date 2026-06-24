import type { Metadata } from "next";
import { CategoryPageContent, generateCategoryPage } from "@/components/pages/category-page";

export const metadata: Metadata =
  generateCategoryPage("/text-tools")?.metadata ?? { title: "Text Tools" };

export default function TextToolsPage() {
  return <CategoryPageContent route="/text-tools" />;
}
