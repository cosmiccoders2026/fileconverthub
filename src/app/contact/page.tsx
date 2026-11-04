import React, { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });

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
        setForm({ name: "", email: "", subject: "", message: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      // Fallback to mailto if API is unavailable
      const subject = encodeURIComponent(form.subject || `Inquiry from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("success");
    }
  };

  return (
    <PageContainer size="narrow" className="py-8 sm:py-12 space-y-10">
      <header className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Contact Support &amp; Team
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          Questions regarding in-browser document processing, error reports, or suggestions for new formatting utilities.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Left Column: Technical Guidelines & Inquiries */}
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-slate-900">
              Inquiry Categories
            </h2>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="rounded-md border border-slate-200 bg-white p-3 space-y-1">
                <strong className="text-slate-900 block font-semibold">
                  Technical Issues &amp; Browser Diagnostics
                </strong>
                <span>
                  Encountering an issue processing a specific file? Please include your operating system, browser version, and file extension.
                </span>
              </li>
              <li className="rounded-md border border-slate-200 bg-white p-3 space-y-1">
                <strong className="text-slate-900 block font-semibold">
                  Feature &amp; Tool Requests
                </strong>
                <span>
                  Suggest new client-side transformation routines, encoding formats, or string filters.
                </span>
              </li>
              <li className="rounded-md border border-slate-200 bg-white p-3 space-y-1">
                <strong className="text-slate-900 block font-semibold">
                  Privacy &amp; Security Verification
                </strong>
                <span>
                  Questions regarding local memory lifecycle and client-side processing behavior.
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 space-y-2">
            <h3 className="font-semibold text-slate-900">
              Direct Inquiries
            </h3>
            <p className="leading-relaxed">
              Prefer to send a direct message via email? You can contact us directly at:
            </p>
            <div className="flex items-center gap-2 pt-1 font-mono text-xs text-slate-800">
              <Mail className="h-4 w-4 text-slate-400" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-blue-600 hover:underline"
              >
                {siteConfig.email}
              </a>
            </div>
          </section>
        </div>

        {/* Right Column: Form */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-5">
          <h2 className="text-base font-semibold text-slate-900">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-medium text-slate-700">
                Full Name *
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                maxLength={120}
                placeholder="Jane Doe"
                disabled={status === "sending"}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-slate-700">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                maxLength={254}
                placeholder="jane@example.com"
                disabled={status === "sending"}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="subject" className="text-xs font-medium text-slate-700">
                Subject *
              </Label>
              <Input
                id="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
                maxLength={180}
                placeholder="e.g. PDF Merge memory question"
                disabled={status === "sending"}
              />
            </div>

            {/* Honeypot field for bot deterrence */}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="website">Do not fill this field</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs font-medium text-slate-700">
                Message *
              </Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                maxLength={10000}
                placeholder="Describe your question or issue in detail..."
                className="min-h-[120px]"
                disabled={status === "sending"}
              />
            </div>

            {status === "success" && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800"
              >
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Thank you. Your message has been received.</span>
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-800"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                <span>
                  Unable to deliver via contact API. Please email us directly at{" "}
                  <a href={`mailto:${siteConfig.email}`} className="font-semibold underline">
                    {siteConfig.email}
                  </a>.
                </span>
              </div>
            )}

            <Button
              type="submit"
              disabled={status === "sending"}
              className="w-full"
            >
              {status === "sending" ? "Sending..." : "Submit Inquiry"}
            </Button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
