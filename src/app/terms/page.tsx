import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "Simple privacy policy for FileConvertHub.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageContainer size="narrow">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Privacy Policy</h1>

      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          {siteConfig.name} respects your privacy and aims to keep file tools
          simple and safe.
        </p>

        <p>
          Most tools process files directly in your browser. We do not
          intentionally store your uploaded files.
        </p>

        <p>
          We do not require users to create an account to use the tools.
        </p>

        <p>
          If you contact us, we may use your name, email, and message only to
          reply to your request.
        </p>

        <p>
          Basic analytics or advertising services may use cookies to improve the
          website and show ads.
        </p>

        <p>
          For privacy questions, contact us at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-primary hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </PageContainer>
  );
}