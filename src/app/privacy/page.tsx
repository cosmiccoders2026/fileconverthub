import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy | Data Security & Legal",
  description:
    "Review the comprehensive Privacy Policy for FileConvertHub. We are committed to data minimization, browser-side file processing, and protecting your digital privacy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageContainer size="narrow">
      <header className="mb-10 space-y-4 border-b pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-sm font-medium text-muted-foreground">
          Effective Date: October 16, 2026
        </p>
      </header>

      <div className="space-y-10 text-muted-foreground leading-relaxed">
        {/* Introduction */}
        <section className="space-y-4">
          <p>
            Welcome to <strong>{siteConfig.name}</strong> ("we," "our," or "us"). We are committed 
            to protecting your personal information and your right to privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you visit 
            our website and use our free digital tools. 
          </p>
          <p>
            By accessing or using {siteConfig.name}, you signify that you have read, understood, 
            and agree to our collection, storage, use, and disclosure of your personal information 
            as described in this Privacy Policy.
          </p>
        </section>

        {/* File Processing (Most important for this type of site) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. How We Process and Protect Your Files</h2>
          <p>
            Because we provide file conversion and text manipulation tools, the security of your 
            documents is our highest priority. We practice strict data minimization:
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong className="text-foreground">Local (Browser-Side) Processing:</strong> Many 
              of our tools (including text formatters, word counters, and certain image resizers) 
              process your data entirely within your local web browser. In these cases, your files 
              and text <strong>never leave your device</strong> and are never transmitted to our servers.
            </li>
            <li>
              <strong className="text-foreground">Server-Side Processing:</strong> For tools requiring 
              heavy computation (like complex PDF merging), your files are uploaded via a secure, 
              encrypted SSL/TLS connection. 
            </li>
            <li>
              <strong className="text-foreground">Zero Retention Guarantee:</strong> Any files processed 
              on our servers are held in temporary memory solely for the duration of the conversion. 
              They are <strong>automatically and permanently deleted</strong> within 1 hour of processing. 
              We do not keep backups, nor do we inspect the contents of your files.
            </li>
          </ul>
        </section>

        {/* Data Collection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
          <p>
            We do not require account registration. The information we collect is extremely limited:
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong className="text-foreground">Voluntarily Provided Data:</strong> If you use our 
              contact form or email support, we collect your name, email address, and the contents of 
              your message to assist you.
            </li>
            <li>
              <strong className="text-foreground">Automated Device Data:</strong> When you visit our 
              website, our servers automatically record standard log data. This may include your IP address, 
              browser type, operating system, referring URLs, and interaction with our platform. This data 
              is anonymized and used for security and analytics.
            </li>
          </ul>
        </section>

        {/* Cookies and AdSense */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Cookies & Advertising (Google AdSense)</h2>
          <p>
            To keep {siteConfig.name} free for everyone, we use third-party advertising companies, 
            including Google AdSense, to serve ads when you visit our website. 
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              Google, as a third-party vendor, uses cookies (specifically the DART cookie) to serve 
              ads based on your prior visits to our website and other websites on the internet.
            </li>
            <li>
              You can opt out of personalized advertising by visiting Google's{" "}
              <a 
                href="https://adssettings.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Ads Settings
              </a>.
            </li>
          </ul>
        </section>

        {/* GDPR & CCPA Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">4. Your Privacy Rights (GDPR & CCPA)</h2>
          <p>
            Depending on your location, you may have specific rights regarding your personal data:
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong className="text-foreground">Right to Access & Deletion:</strong> You have the right 
              to request a copy of the personal data we hold about you (e.g., support emails) and request 
              its deletion.
            </li>
            <li>
              <strong className="text-foreground">California Residents (CCPA):</strong> We do not "sell" 
              your personal information as defined by the CCPA. 
            </li>
            <li>
              <strong className="text-foreground">EEA/UK Residents (GDPR):</strong> You have the right to 
              object to our processing of your personal data and to withdraw consent for non-essential cookies.
            </li>
          </ul>
        </section>

        {/* Children's Privacy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">5. Children's Privacy</h2>
          <p>
            Our website is not intended for children under the age of 13. We do not knowingly collect 
            personally identifiable information from children under 13. If a parent or guardian believes 
            that we have collected such information, please contact us immediately, and we will remove 
            it from our records.
          </p>
        </section>

        {/* Contact info */}
        <section className="mt-12 rounded-xl border bg-muted/50 p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">6. Contact Us</h2>
          <p className="mb-4">
            If you have questions, comments, or concerns about this Privacy Policy or our data 
            practices, please reach out to our privacy team:
          </p>
          <div className="flex flex-col space-y-2 text-sm">
            <span className="flex items-center gap-2">
              <strong className="text-foreground">Email:</strong>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-primary hover:underline"
              >
                {siteConfig.email}
              </a>
            </span>
            <span className="flex items-center gap-2">
              <strong className="text-foreground">Website:</strong>
              <a href="/" className="font-medium text-primary hover:underline">
                {siteConfig.url || "https://fileconverthub.vercel.app"}
              </a>
            </span>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
