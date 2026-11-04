import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Sanitizes download filenames to prevent directory traversal, control character injection,
 * and malformed file names on client operating systems.
 */
export function sanitizeFilename(filename: string, fallback = "download"): string {
  if (!filename || typeof filename !== "string") return fallback;
  // Strip control characters and null bytes
  let clean = filename.replace(/[\x00-\x1f\x7f]/g, "");
  // Replace path separators and reserved shell/filesystem characters
  clean = clean.replace(/[/\\?%*:|"<>]/g, "_").replace(/\.\.+/g, ".");
  // Trim whitespace and leading/trailing dots
  clean = clean.trim().replace(/^\.+/, "");
  // Bound max filename length
  if (clean.length > 200) {
    const extIndex = clean.lastIndexOf(".");
    const ext = extIndex !== -1 ? clean.slice(extIndex) : "";
    clean = clean.slice(0, 190) + ext;
  }
  return clean || fallback;
}

export function downloadBlob(blob: Blob, filename: string) {
  const safeName = sanitizeFilename(filename);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = safeName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getCategoryRoute(category: string): string {
  const routes: Record<string, string> = {
    pdf: "/pdf-tools",
    image: "/image-tools",
    text: "/text-tools",
    "ai-writing": "/ai-writing-tools",
  };
  return routes[category] || "/tools";
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    pdf: "PDF Tools",
    image: "Image Tools",
    text: "Text Tools",
    "ai-writing": "AI Writing Tools",
  };
  return labels[category] || "Tools";
}
