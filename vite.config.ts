import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'security-and-api-handler',
        configureServer(server) {
          // 1. Inject security headers on all responses
          server.middlewares.use((req, res, next) => {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-Frame-Options', 'SAMEORIGIN');
            res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
            res.setHeader(
              'Permissions-Policy',
              'camera=(), microphone=(), geolocation=()'
            );
            next();
          });

          // 2. Contact API endpoint handler with validation & security controls
          server.middlewares.use('/api/contact', async (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('Cache-Control', 'no-store, max-age=0');

            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Allow', 'POST');
              res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
              return;
            }

            let body = '';
            let oversized = false;

            req.on('data', (chunk) => {
              body += chunk;
              if (body.length > 32 * 1024) {
                oversized = true;
                req.destroy();
              }
            });

            req.on('end', () => {
              if (oversized) {
                res.statusCode = 413;
                res.end(
                  JSON.stringify({
                    error: 'Payload exceeds maximum allowed size (32 KB).',
                  })
                );
                return;
              }

              try {
                const payload = JSON.parse(body || '{}');
                const { name, email, subject, message, website } = payload;

                // Honeypot check
                if (typeof website === 'string' && website.trim()) {
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true }));
                  return;
                }

                if (
                  ![name, email, subject, message].every(
                    (v) => typeof v === 'string' && v.trim().length > 0
                  )
                ) {
                  res.statusCode = 400;
                  res.end(
                    JSON.stringify({
                      error:
                        'Name, email, subject, and message are all required.',
                    })
                  );
                  return;
                }

                const emailRegex =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email.trim())) {
                  res.statusCode = 400;
                  res.end(
                    JSON.stringify({
                      error: 'Please enter a valid email address.',
                    })
                  );
                  return;
                }

                // If RESEND_API_KEY is configured in env, we can dispatch
                if (process.env.RESEND_API_KEY) {
                  fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                      from: 'FileConvertHub <onboarding@resend.dev>',
                      to: 'vilumamtechnologies@gmail.com',
                      reply_to: email.trim(),
                      subject: `FileConvertHub: ${subject.trim()}`,
                      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
                    }),
                  })
                    .then((resendRes) => {
                      if (!resendRes.ok) {
                        res.statusCode = 500;
                        res.end(
                          JSON.stringify({
                            error: 'Failed to send message via Resend.',
                          })
                        );
                      } else {
                        res.statusCode = 200;
                        res.end(JSON.stringify({ success: true }));
                      }
                    })
                    .catch(() => {
                      res.statusCode = 500;
                      res.end(
                        JSON.stringify({
                          error: 'Failed to connect to email provider.',
                        })
                      );
                    });
                  return;
                }

                // Dev/preview success response when Resend key is not set
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
              } catch {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({ error: 'Malformed JSON payload.' })
                );
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'next/link': path.resolve(__dirname, './src/lib/next-link.tsx'),
        'next/navigation': path.resolve(
          __dirname,
          './src/lib/next-navigation.ts'
        ),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
