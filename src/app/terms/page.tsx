import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy | Secure File Processing",
  description:
    "Read the Privacy Policy for FileConvertHub. Learn how we protect your data, secure your files, and handle browser information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageContainer size="narrow">
      <header className="mb-8 space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground">
          Last Updated: October 2026
        </p>
      </header>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <p>
            At <strong>{siteConfig.name}</strong>, your privacy is our priority. 
            This Privacy Policy outlines the types of information that is collected 
            and recorded by our website and how we use it. We believe in transparency 
            and data minimization, ensuring that your digital workspace remains secure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">1. How We Handle Your Files</h2>
          <p>
            <strong>Local Browser Processing:</strong> The majority of our tools 
            (including text formatters and specific image utilities) operate entirely 
            within your web browser. This means your files never leave your device 
            and are never uploaded to our servers.
          </p>
          <p>
            <strong>Server Processing:</strong> For tools that require server-side 
            computation (such as complex PDF merging or heavy file conversions), 
            files are transmitted securely via SSL/TLS encryption. These files are 
            held strictly temporarily in RAM and are <strong>automatically and permanently 
            deleted</strong> immediately after the process is complete. We do not inspect, 
            copy, or store your uploaded documents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
          <p>
            We do not require you to register for an account to use our tools. The only 
            personal information we collect is what you voluntarily provide when you 
            communicate with us directly:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Contact Information:</strong> If you use our contact form or 
              email us, we may receive your name, email address, and the contents of 
              your message. This data is used solely to respond to your inquiry.
            </li>
            <li>
              <strong>Usage Data:</strong> Like most websites, we collect standard 
              log files. This includes internet protocol (IP) addresses, browser type, 
              Internet Service Provider (ISP), date and time stamps, and referring/exit pages. 
              This information is completely anonymous and is used to analyze trends and 
              administer the site.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">3. Cookies and Advertising</h2>
          <p>
            {siteConfig.name} uses cookies to store information about visitor preferences 
            and to optimize the user experience by customizing our web page content based on 
            visitors' browser types.
          </p>
          <p>
            <strong>Google AdSense & DoubleClick DART Cookie:</strong> 
            We use Google as a third-party vendor to serve advertisements to support our free tools. 
            Google uses cookies, known as DART cookies, to serve ads to our site visitors based upon 
            their visit to {siteConfig.name} and other sites on the internet. However, visitors may 
            choose to decline the use of DART cookies by visiting the Google ad and content network 
            Privacy Policy at:{" "}
            <a 
              href="https://policies.google.com/technologies/ads" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://policies.google.com/technologies/ads
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">4. Third-Party Privacy Policies</h2>
          <p>
            Our Privacy Policy does not apply to other advertisers or websites. Thus, 
            we are advising you to consult the respective Privacy Policies of these 
            third-party ad servers for more detailed information. It may include their 
            practices and instructions about how to opt out of certain options.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">5. Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree 
            to its Terms and Conditions.
          </p>
        </section>

        <section className="mt-8 rounded-xl bg-muted p-6">
          <h2 className="mb-2 text-xl font-bold text-foreground">Contact Us</h2>
          <p className="mb-0">
            If you have any questions or require more information about our Privacy Policy, 
            do not hesitate to contact us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-primary hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
