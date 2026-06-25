import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import { JsonLd, websiteSchema, organizationSchema } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fileconverthub.vercel.app"),

  ...createMetadata({
    title: "FileConvertHub | Free Online PDF, Image & Text Tools",
    description:
      "Use FileConvertHub for free online PDF, image, and text tools. Merge PDF, compress PDF, convert JPG to PDF, PDF to JPG, PNG to JPG, resize images, count words, clean text, and more without signup.",
    keywords: [
      "FileConvertHub",
      "free file converter",
      "online file converter",
      "free online tools",
      "PDF tools online",
      "free PDF tools",
      "merge PDF online",
      "compress PDF online",
      "compress PDF free",
      "JPG to PDF converter",
      "convert JPG to PDF",
      "PDF to JPG converter",
      "convert PDF to JPG",
      "PNG to JPG converter",
      "WebP to JPG converter",
      "image converter online",
      "resize image online",
      "compress image online",
      "photo resizer online",
      "word counter online",
      "character counter",
      "case converter online",
      "uppercase lowercase converter",
      "text cleaner online",
      "remove duplicate lines",
      "free tools for students",
      "office file tools",
      "no signup file tools",
      "no watermark file converter",
      "browser based file tools",
    ],
  }),

  verification: {
    google: "FUVjP4N9UocMwWmrK23wJCfUcvsSGJvNlhnWQdyDSg0",
  },

  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={websiteSchema()} />
        <JsonLd data={organizationSchema()} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
