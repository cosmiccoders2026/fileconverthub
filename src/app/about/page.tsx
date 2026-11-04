import React from "react";
import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "About FileConvertHub | Client-Side File Tools",
  description:
    "Learn about FileConvertHub — a browser-based utility platform for PDF manipulation, image conversion, and text processing without remote uploads.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageContainer size="narrow" className="py-8 sm:py-12 space-y-10">
      <header className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          About {siteConfig.name}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The engineering principles, architecture, and standards behind our client-side utility suite.
        </p>
      </header>

      <div className="space-y-10 text-sm text-slate-600 leading-relaxed">
        {/* Purpose */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Our Purpose
          </h2>
          <p>
            {siteConfig.name} was built to provide direct, reliable utilities for everyday document and image manipulation tasks. Typical online conversion tools often require uploading sensitive documents to third-party cloud servers, imposing wait times, watermarks, or account registration gates.
          </p>
          <p>
            We designed our utilities to execute directly in the user's web browser whenever possible. By executing processing in local memory through standard WebAssembly modules and HTML5 APIs, your documents remain private to your local hardware.
          </p>
        </section>

        {/* Technical Architecture */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Tool Categories &amp; Execution
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wide">
                PDF Utilities
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Merge documents, compress page streams, and extract page rasters locally using client-side JavaScript PDF parsing.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wide">
                Image Processing
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Convert formats between JPG, PNG, and WebP, scale dimensions with aspect-ratio locking, and compress image payloads via HTML5 Canvas.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wide">
                Text &amp; String Tools
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Word counts, character telemetry, case conversion, whitespace normalization, and duplicate line deduction with zero latency.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wide">
                Privacy Framework
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No storage databases for user documents. All temporary object URLs are freed upon download or session termination.
              </p>
            </div>
          </div>
        </section>

        {/* Guiding Principles */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Guiding Principles
          </h2>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-bold shrink-0">—</span>
              <span>
                <strong className="text-slate-900">Zero Mandatory Accounts:</strong> Every tool is available immediately without signing in, setting passwords, or providing personal credentials.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-bold shrink-0">—</span>
              <span>
                <strong className="text-slate-900">Unmodified Output:</strong> We never inject watermarks, custom stamps, or sponsored footers into your generated files.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 font-bold shrink-0">—</span>
              <span>
                <strong className="text-slate-900">Deterministic Behavior:</strong> Input files are transformed strictly according to user parameters with clear error messages when limits are reached.
              </span>
            </li>
          </ul>
        </section>

        {/* Contact info */}
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-2">
          <h2 className="text-sm font-semibold text-slate-900">
            Support &amp; Feedback
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            For technical support inquiries, bug reports, or feature suggestions, contact the maintainers at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-blue-600 hover:underline"
            >
              {siteConfig.email}
            </a>{" "}
            or use our{" "}
            <a href="/contact" className="font-medium text-blue-600 hover:underline">
              Contact Form
            </a>
            .
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
