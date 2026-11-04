import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

const escapeHtml = (value: string) => {
  const entities: Record<string, string> = {
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (char) => entities[char]);
};

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { name, email, subject, message, website } = payload ?? {};

    // Honeypot field: bots often fill every field, while people do not see this input.
    if (typeof website === "string" && website.trim()) {
      return NextResponse.json({ success: true });
    }
    if (![name, email, subject, message].every((value) => typeof value === "string" && value.trim())) {
      return NextResponse.json({ error: "Name, email, subject, and message are required." }, { status: 400 });
    }
    const cleanName = name.trim().slice(0, 120);
    const cleanEmail = email.trim().slice(0, 254);
    const cleanSubject = subject.trim().slice(0, 180);
    const cleanMessage = message.trim().slice(0, 10000);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (process.env.RESEND_API_KEY) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "FileConvertHub <onboarding@resend.dev>",
          to: siteConfig.email,
          reply_to: cleanEmail,
          subject: `FileConvertHub: ${cleanSubject}`,
          html: `<p><strong>Name:</strong> ${escapeHtml(cleanName)}</p><p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p><p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p><p><strong>Message:</strong></p><p>${escapeHtml(cleanMessage).replace(/\r?\n/g, "<br>")}</p>`,
        }),
      });
      if (!response.ok) throw new Error("Resend API failed");
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
  }
}
