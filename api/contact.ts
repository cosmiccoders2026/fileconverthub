
import type { VercelRequest, VercelResponse } from "@vercel/node";

const RECIPIENT_EMAIL = "vilumamtechnologies@gmail.com";
const SENDER_EMAIL = "FileConvertHub <onboarding@resend.dev>";

const MAX_BODY_SIZE = 32 * 1024;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const rateLimits = new Map<
  string,
  { count: number; expiresAt: number }
>();

function setSecurityHeaders(res: VercelResponse) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store, max-age=0");
}

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

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Remove expired entries.
  for (const [key, value] of rateLimits.entries()) {
    if (now > value.expiresAt) {
      rateLimits.delete(key);
    }
  }

  const entry = rateLimits.get(ip);

  if (!entry || now > entry.expiresAt) {
    rateLimits.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW,
    });

    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count++;
  return false;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  setSecurityHeaders(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    // Check request size.
    const contentLength = Number(
      req.headers["content-length"] || 0
    );

    if (
      Number.isFinite(contentLength) &&
      contentLength > MAX_BODY_SIZE
    ) {
      return res.status(413).json({
        error: "Request body exceeds the maximum allowed size.",
      });
    }

    // Identify the client.
    const forwardedFor = req.headers["x-forwarded-for"];

    const ip =
      (Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : forwardedFor
      )?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "anonymous-client";

    if (isRateLimited(ip)) {
      res.setHeader("Retry-After", "600");

      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    // Parse request body.
    let payload: unknown;

    try {
      payload =
        typeof req.body === "string"
          ? JSON.parse(req.body)
          : req.body;
    } catch {
      return res.status(400).json({
        error: "Invalid JSON request body.",
      });
    }

    if (!payload || typeof payload !== "object") {
      return res.status(400).json({
        error: "Invalid request data.",
      });
    }

    const data = payload as Record<string, unknown>;

    const { name, email, subject, message, website } = data;

    // Honeypot spam protection.
    if (typeof website === "string" && website.trim()) {
      return res.status(200).json({ success: true });
    }

    // Validate required fields.
    if (
      ![name, email, subject, message].every(
        (value) =>
          typeof value === "string" &&
          value.trim().length > 0
      )
    ) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    const cleanName = (name as string).trim();
    const cleanEmail = (email as string).trim();
    const cleanSubject = (subject as string).trim();
    const cleanMessage = (message as string).trim();

    // Enforce maximum lengths.
    if (
      cleanName.length > 120 ||
      cleanEmail.length > 254 ||
      cleanSubject.length > 180 ||
      cleanMessage.length > 10000
    ) {
      return res.status(400).json({
        error: "One or more fields exceed the allowed length.",
      });
    }

    // Validate email.
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        error: "Please enter a valid email address.",
      });
    }

    // Check Resend configuration.
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return res.status(503).json({
        error: "Email delivery service is not configured.",
      });
    }

    // Send email through Resend.
    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          from: SENDER_EMAIL,
          to: [RECIPIENT_EMAIL],
          reply_to: cleanEmail,
          subject: `FileConvertHub: ${cleanSubject}`,

          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px">
              <h2>New FileConvertHub Inquiry</h2>

              <p>
                <strong>Name:</strong>
                ${escapeHtml(cleanName)}
              </p>

              <p>
                <strong>Email:</strong>
                ${escapeHtml(cleanEmail)}
              </p>

              <p>
                <strong>Subject:</strong>
                ${escapeHtml(cleanSubject)}
              </p>

              <hr />

              <h3>Message</h3>

              <p style="white-space:pre-wrap">
                ${escapeHtml(cleanMessage)}
              </p>
            </div>
          `,
        }),
      }
    );

    if (!resendResponse.ok) {
      return res.status(502).json({
        error: "Email delivery failed. Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });

  } catch {
    return res.status(500).json({
      error: "Failed to send your message. Please try again later.",
    });
  }
}
