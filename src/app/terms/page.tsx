import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "Terms and Conditions",
  description: "Read the terms governing use of FileConvertHub's online PDF, image, and text utilities.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageContainer size="narrow">
      <header className="mb-10 space-y-3 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">Terms and Conditions</h1>
        <p className="text-sm text-muted-foreground">Last updated: November 4, 2026</p>
      </header>
      <div className="prose-custom space-y-8 text-muted-foreground">
        <section><h2 className="text-2xl font-semibold text-foreground">1. Using the service</h2><p>These terms apply when you access {siteConfig.name}. By using the website, you agree to use it lawfully and responsibly. If you do not agree, do not use the service.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">2. Acceptable use</h2><p>You must not use the website to violate another person's rights, distribute unlawful material, interfere with the service, attempt unauthorized access, or introduce malicious code. You may only process files that you own or are authorized to use.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">3. Files and processing limits</h2><p>Tools operate within browser, device, file-format, and memory constraints. A file may fail because it is damaged, unsupported, protected, or too large for the available resources. A displayed selection limit is not a guarantee that every device can process the maximum number or size of files.</p><p>You are responsible for retaining original copies and verifying converted files before relying on them.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">4. Intellectual property</h2><p>You retain rights to content you provide. You are responsible for ensuring that your use of files and outputs complies with copyright, privacy, confidentiality, and other applicable laws. The website's name, design, and original site materials may not be copied or misrepresented without permission.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">5. Availability and changes</h2><p>We may update, suspend, or discontinue tools to maintain or improve the service. We do not guarantee uninterrupted availability, compatibility with every device, or permanent availability of a particular feature.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">6. Disclaimer and limitation</h2><p>The service is provided on an “as available” basis. To the extent permitted by applicable law, {siteConfig.name} disclaims warranties regarding accuracy, reliability, fitness for a particular purpose, and uninterrupted operation. We are not responsible for losses arising from reliance on unverified conversion output, subject to rights that cannot legally be excluded.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">7. Updates to these terms</h2><p>We may revise these terms as the service changes. Continued use after an updated version is published indicates acceptance of the revised terms, to the extent permitted by law.</p></section>
        <section><h2 className="text-2xl font-semibold text-foreground">8. Contact</h2><p>Questions about these terms can be sent through our <a className="text-primary underline" href="/contact">contact page</a> or to <a className="text-primary underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p></section>
      </div>
    </PageContainer>
  );
}
