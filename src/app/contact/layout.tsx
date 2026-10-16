import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact Us | Support & Feedback | FileConvertHub",
  description:
    "Get in touch with the FileConvertHub support team. Whether you need technical assistance with our free PDF and image tools, have a feature request, or want to report a bug, we are here to help.",
  path: "/contact",
  keywords: [
    "contact FileConvertHub", 
    "customer support", 
    "file conversion help", 
    "technical assistance", 
    "report bug"
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
