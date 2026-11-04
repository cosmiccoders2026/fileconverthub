import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

const escapeHtml = (value: string) => {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (char) => entities[char]);
};

// In-memory sliding window rate limiter: max 5 requests per 10 minutes per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Clean up stale rate limit entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.expiresAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store, max-age=0",
};

export async function POST(request: NextRequest) {
  try {
    // 1. Client IP / identifier extraction for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous-client";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before submitting again." },
        { status: 429, headers: { ...SECURITY_HEADERS, "Retry-After": "600" } }
      );
    }

    // 2. Content-Length check to prevent denial of service via oversized body
    const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
    if (contentLength > 32 * 1024) {
      return NextResponse.json(
        { error: "Payload exceeds maximum allowed size (32 KB)." },
        { status: 413, headers: SECURITY_HEADERS }
      );
    }

    // 3. Parse JSON with safe try-catch
    let payload: any;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const { name, email, subject, message, website } = payload ?? {};

    // 4. Honeypot check: bots fill hidden fields, humans do not
    if (typeof website === "string" && website.trim()) {
      return NextResponse.json({ success: true }, { headers: SECURITY_HEADERS });
    }

    // 5. Strict type and presence validation
    if (
      ![name, email, subject, message].every(
        (value) => typeof value === "string" && value.trim().length > 0
      )
    ) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are all required." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const cleanName = name.trim().slice(0, 120);
    const cleanEmail = email.trim().slice(0, 254);
    const cleanSubject = subject.trim().slice(0, 180);
    const cleanMessage = message.trim().slice(0, 10000);

    // 6. Strict email syntax verification
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // 7. Resend provider dispatch
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

      if (!response.ok) {
        throw new Error("Resend dispatch returned non-200 status");
      }

      return NextResponse.json({ success: true }, { headers: SECURITY_HEADERS });
    }

    // If Resend API key is not configured in local/test environment
    return NextResponse.json(
      { error: "Email delivery service is currently not configured." },
      { status: 503, headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again later or email us directly." },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405, headers: { ...SECURITY_HEADERS, Allow: "POST" } }
  );
}
