
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { siteConfig } from "../src/config/site";

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store, max-age=0",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

// Basic in-memory rate limiting.
// Note: serverless instances may have separate counters.
const rateLimits = new Map<
  string,
  { count: number; expiresAt: number }
>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || now > entry.expiresAt) {
    rateLimits.set(ip, {
      count: 1,
      expiresAt: now + 10 * 60 * 1000,
    });
    return false;
  }

  if (entry.count >= 5) return true;

  entry.count++;
  return false;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    const forwardedFor = req.headers["x-forwarded-for"];
    const ip =
      (Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : forwardedFor)?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      res.setHeader("Retry-After", "600");
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    const contentLength = Number(req.headers["content-length"] || 0);

    if (contentLength > 32 * 1024) {
      return res.status(413).json({
        error: "Message is too large.",
      });
    }

    const payload =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    if (!payload || typeof payload !== "object") {
      return res.status(400).json({
        error: "Invalid request.",
      });
    }

    const { name, email, subject, message, website } = payload;

    // Honeypot spam protection
    if (typeof website === "string" && website.trim()) {
      return res.status(200).json({ success: true });
    }

    if (
      ![name, email, subject, message].every(
        (value) =>
          typeof value === "string" && value.trim().length > 0
      )
    ) {
      return res.status(400).json({
        error: "Please complete all required fields.",
      });
    }

    const cleanName = name.trim().slice(0, 120);
    const cleanEmail = email.trim().slice(0, 254);
    const cleanSubject = subject.trim().slice(0, 180);
    const cleanMessage = message.trim().slice(0, 10000);

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        error: "Please enter a valid email address.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return res.status(503).json({
        error: "Email service is not configured.",
      });
    }

    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "FileConvertHub <onboarding@resend.dev>",
          to: [siteConfig.email],
          reply_to: cleanEmail,
          subject: `FileConvertHub: ${cleanSubject}`,
          html: `
            <h2>New FileConvertHub Inquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(cleanMessage).replace(/\r?\n/g, "<br>")}</p>
          `,
        }),
      }
    );

    if (!emailResponse.ok) {
      const providerError = await emailResponse.text();

      console.error(
        "Resend delivery error:",
        emailResponse.status,
        providerError
      );

      return res.status(502).json({
        error: "Email provider could not deliver your message.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your inquiry was sent successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return res.status(500).json({
      error: "Unable to send your message. Please try again later.",
    });
  }
}
