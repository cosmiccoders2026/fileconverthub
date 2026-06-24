import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "About FileConvertHub",
  description:
    "Learn about FileConvertHub — a free online platform for PDF, image, and text tools. No signup, no watermarks, and simple browser-based processing.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageContainer size="narrow">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        About {siteConfig.name}
      </h1>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          {siteConfig.name} is a simple online tool platform created to help
          users work with PDFs, images, and text more easily. The goal is to
          make common file tasks quick, clean, and accessible from any modern
          browser.
        </p>

        <h2 className="text-xl font-semibold text-foreground">What We Offer</h2>
        <p>
          FileConvertHub provides practical tools such as PDF merging, PDF
          compression, image conversion, image resizing, word counting, case
          conversion, duplicate line removal, and text cleaning. These tools are
          designed for students, professionals, and everyday users who need
          simple file utilities without complicated steps.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Our Approach</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Simple to use</strong> — choose
            a tool, upload or paste your content, and download or copy the
            result.
          </li>
          <li>
            <strong className="text-foreground">No signup required</strong> —
            users can access tools without creating an account.
          </li>
          <li>
            <strong className="text-foreground">No watermarks</strong> — output
            files are not branded with FileConvertHub.
          </li>
          <li>
            <strong className="text-foreground">Privacy focused</strong> — many
            tools are designed to process files directly in the browser whenever
            possible.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">Why We Built It</h2>
        <p>
          File tasks are often small but time-consuming. FileConvertHub was built
          to reduce that effort by keeping useful tools in one place with a
          clean interface and straightforward workflow.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
        <p>
          For questions, feedback, or suggestions, contact us at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-primary hover:underline"
          >
            {siteConfig.email}
          </a>{" "}
          or visit our{" "}
          <a href="/contact" className="text-primary hover:underline">
            contact page
          </a>
          .
        </p>
      </div>
    </PageContainer>
  );
}