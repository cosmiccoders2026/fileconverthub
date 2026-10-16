import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "About FileConvertHub | Free PDF, Image & Text Tools",
  description:
    "Learn about FileConvertHub — your trusted, free online platform for secure PDF processing, image conversion, and text formatting. No signup, no watermarks.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageContainer size="narrow">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
        About {siteConfig.name}
      </h1>

      <div className="space-y-8 text-muted-foreground leading-relaxed text-lg">
        {/* Mission Statement */}
        <section>
          <p>
            Welcome to <strong>{siteConfig.name}</strong>, your all-in-one digital workspace 
            designed to simplify everyday file management. We are a dedicated online platform 
            created to help users seamlessly work with PDFs, images, and text formats. Our 
            mission is to make common file tasks quick, clean, and entirely accessible from 
            any modern web browser—without the friction of expensive software subscriptions 
            or heavy application downloads.
          </p>
        </section>

        {/* Detailed Tool Offerings (Great for SEO Keywords) */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-foreground">Comprehensive Tools We Offer</h2>
          <p className="mb-4">
            Whether you are a student formatting a research paper, a professional managing 
            business documents, or a developer formatting code text, FileConvertHub provides 
            a versatile suite of browser-based utilities:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground mb-2">📄 PDF Utilities</h3>
              <p className="text-sm">Seamlessly merge multiple PDFs, compress large documents for email, and manipulate pages securely.</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground mb-2">🖼️ Image Processing</h3>
              <p className="text-sm">Convert between popular image formats (JPG, PNG, WebP), resize dimensions, and optimize image files for web use.</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground mb-2">📝 Text & String Tools</h3>
              <p className="text-sm">Count words and characters, convert text cases, remove duplicate lines, and clean up messy formatting instantly.</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground mb-2">⚡ Developer Utilities</h3>
              <p className="text-sm">Quick access formatting tools designed to speed up daily workflows and data cleanup.</p>
            </div>
          </div>
        </section>

        {/* Core Values / Approach */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-foreground">Our Core Philosophy</h2>
          <p className="mb-4">
            We believe that basic digital tools should be treated as a public utility—free, 
            reliable, and easy to use. {siteConfig.name} operates on four foundational pillars:
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong className="text-foreground">Frictionless Experience:</strong> Simple, intuitive interfaces. Choose a tool, upload or paste your content, and get your results instantly.
            </li>
            <li>
              <strong className="text-foreground">Zero Barriers:</strong> No user accounts, no mandatory sign-ups, and absolutely no hidden paywalls. 
            </li>
            <li>
              <strong className="text-foreground">Professional Quality:</strong> Output files are never branded or stamped with watermarks. Your documents remain yours.
            </li>
            <li>
              <strong className="text-foreground">Uncompromising Privacy:</strong> We prioritize your data security. Many of our tools process files locally within your browser. For tools requiring server processing, files are encrypted during transit and automatically permanently deleted from our servers immediately after processing.
            </li>
          </ul>
        </section>

        {/* Why Free / AdSense Trust Signal */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-foreground">Why We Built It & How It Stays Free</h2>
          <p className="mb-4">
            File tasks are often small but incredibly time-consuming. We built {siteConfig.name} 
            to eliminate the frustration of jumping between a dozen different ad-cluttered, 
            slow websites just to resize an image or merge a PDF. 
          </p>
          <p>
            To keep our servers running and continue offering these premium-grade tools to students, 
            creatives, and professionals worldwide at no cost, our platform is supported by carefully 
            selected, non-intrusive advertising. This ensures we can maintain high-speed infrastructure 
            and add new tools regularly without ever charging our users.
          </p>
        </section>

        {/* Contact Info */}
        <section className="rounded-xl bg-muted p-6">
          <h2 className="mb-2 text-xl font-bold text-foreground">Get in Touch</h2>
          <p className="mb-0">
            We are constantly looking to improve and expand our toolkit. For technical support, 
            business inquiries, or tool suggestions, please reach out to us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-primary hover:underline"
            >
              {siteConfig.email}
            </a>{" "}
            or visit our{" "}
            <a href="/contact" className="font-medium text-primary hover:underline">
              Contact Page
            </a>
            .
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
