import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "Learn what information FileConvertHub processes, how browser-based tools handle files, and how contact requests are managed.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageContainer size="narrow">
      <header className="mb-10 space-y-3 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: November 4, 2026</p>
      </header>
      <div className="prose-custom space-y-8 text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">1. About this policy</h2>
          <p>This policy explains how {siteConfig.name} handles information when you visit the website, use its tools, or contact the team. The website does not require an account to use its current tools.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">2. Files and text entered into tools</h2>
          <p>The current PDF, image, and text utilities are implemented in the browser. Files selected for these tools are processed by the browser code on your device; the tools do not send those selected files to the contact API. Processing may use your device memory, and the browser may retain normal download history or temporary browser data.</p>
          <p>Do not submit confidential, regulated, or sensitive material unless you have assessed whether using a web-based tool is appropriate for your situation. You remain responsible for keeping your original files and checking converted output.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">3. Contact form information</h2>
          <p>If you contact us, the form sends the name, email address, subject, and message you provide to our contact API. When configured, the API uses Resend to deliver the message to {siteConfig.email}. The message is handled by that email delivery provider and may remain in the relevant mail systems. Do not include passwords or unnecessary sensitive information.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">4. Hosting, logs, and service providers</h2>
          <p>The website is deployed using Vercel. Hosting and infrastructure providers may process technical information such as IP address, request time, browser details, and server logs as part of delivering and securing the service. Their handling is governed by their own policies and service terms.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">5. Cookies, analytics, and advertising</h2>
          <p>The current source includes an AdSense publisher account identifier in site metadata, but this source alone does not establish that advertising or analytics scripts are actively running. If Google AdSense or analytics services are enabled, those providers may use cookies or similar technologies to deliver, measure, or personalize services according to their settings and policies. Review the relevant provider disclosures and your browser controls.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">6. Your choices</h2>
          <p>You can choose not to use a tool, avoid entering personal information, or contact us to ask about a message you have sent. Browser settings can be used to manage cookies and downloads. Deleting local browser data may remove locally held site data but does not delete email already delivered to a mailbox.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">7. Children and changes</h2>
          <p>The tools are general-purpose utilities and are not designed to collect personal information from children. We may update this policy when the website or its providers change. The revision date above indicates the latest policy update.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">8. Contact</h2>
          <p>For privacy questions, use the <a className="text-primary underline" href="/contact">contact page</a> or email <a className="text-primary underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
        </section>
      </div>
    </PageContainer>
  );
}
