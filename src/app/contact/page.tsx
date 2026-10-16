"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      // Fallback to mailto if API fails or network error occurs
      const subject = encodeURIComponent(`Contact from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("success");
    }
  };

  return (
    <PageContainer size="narrow">
      <header className="mb-10 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Contact Our Team
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We are committed to providing the best free online digital utilities. 
          Whether you are experiencing an issue with a PDF conversion, have a 
          suggestion for a new text tool, or have a business inquiry, our team 
          is ready to assist you.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Left Column: Trust Signals & Info (Crucial for AdSense) */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">How Can We Help?</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex flex-col">
                <strong className="text-foreground">🛠️ Technical Support</strong>
                <span>Having trouble with a tool? Let us know the details of your browser and the file type.</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-foreground">💡 Feature Requests</strong>
                <span>Need a specific formatting tool? We actively build tools based on user feedback.</span>
              </li>
              <li className="flex flex-col">
                <strong className="text-foreground">🔒 Privacy Inquiries</strong>
                <span>Questions about our secure, browser-based processing or data handling practices.</span>
              </li>
            </ul>
          </section>

          <section className="rounded-xl bg-muted p-6 text-sm text-muted-foreground">
            <h3 className="mb-2 font-semibold text-foreground text-base">Support Expectations</h3>
            <p className="mb-4">
              We aim to respond to all inquiries within <strong>24-48 business hours</strong>. 
            </p>
            <p>
              <em>Note: Because we prioritize your privacy and process most files locally in your browser, we do not store your files on our servers and cannot help you recover lost documents.</em>
            </p>
          </section>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-foreground">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Your name"
                disabled={status === "sending"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="you@example.com"
                disabled={status === "sending"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                placeholder="How can we help?"
                className="min-h-[150px]"
                disabled={status === "sending"}
              />
            </div>

            {status === "success" && (
              <div className="rounded bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/50 dark:text-green-400">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            
            {status === "error" && (
              <div className="rounded bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-400">
                Something went wrong. Please email us directly at{" "}
                <a href={`mailto:${siteConfig.email}`} className="font-semibold underline">
                  {siteConfig.email}
                </a>
              </div>
            )}

            <Button type="submit" disabled={status === "sending"} className="w-full">
              {status === "sending" ? "Sending Message..." : "Send Message"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Prefer direct email? Reach us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-primary hover:underline">
              {siteConfig.email}
            </a>
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
