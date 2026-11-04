import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "Disclaimer",
  description: "Important information about conversion accuracy, file handling, and responsible use of FileConvertHub.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <PageContainer size="narrow">
      <header className="mb-10 space-y-3 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">Disclaimer</h1>
        <p className="text-sm text-muted-foreground">Last updated: November 4, 2026</p>
      </header>
      <div className="prose-custom space-y-6 text-muted-foreground">
        <section><h2 className="text-2xl font-semibold text-foreground">Conversion results</h2><p>{siteConfig.name} provides general-purpose file and text utilities. Conversion results can vary with source-file structure, format, browser, device memory, and selected settings. We do not guarantee that every output will be complete, error-free, or identical to the source.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">Verify important files</h2><p>Always open and inspect the downloaded result before submitting, publishing, printing, or relying on it. Check page order, formatting, image clarity, text, and file integrity. Keep a separate copy of the original file.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">Confidential information</h2><p>Although the current file utilities process selected content in your browser, no online service should be assumed suitable for every confidential or regulated document. Avoid using the website with sensitive files unless you have reviewed the <a className="text-primary underline" href="/privacy">Privacy Policy</a> and determined that the workflow is appropriate.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">No professional advice</h2><p>Information on this website is general educational material and is not legal, financial, medical, or other professional advice. Obtain qualified advice where a decision requires it.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">Third-party services</h2><p>Links to third-party websites or services are provided for convenience. We do not control their content, availability, or privacy practices.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">Contact</h2><p>Questions about this disclaimer can be sent to <a className="text-primary underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p></section>
      </div>
    </PageContainer>
  );
}
