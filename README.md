# FileConvertHub

A Next.js App Router application providing browser-based PDF, image, and text utilities.

## Technology

- Next.js App Router and React
- TypeScript and Tailwind CSS
- Radix UI primitives and Lucide icons
- `pdf-lib` and `pdfjs-dist` for PDF operations
- Browser Canvas API for image processing

## Included features

- PDF tools: merge, compress, JPG-to-PDF, and PDF-to-JPG
- Image tools: PNG-to-JPG, WebP-to-JPG, resize, and compress, including sequential batch processing
- Text tools: word counter, case converter, duplicate-line remover, and text cleaner
- Searchable blog listing with category filters and individual article pages
- Canonical metadata, structured data helpers, dynamic sitemap, and robots.txt
- Separate About, Contact, Privacy, Terms, and Disclaimer pages
- Contact API using the existing Resend integration
- No database, account system, or user registration

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Set `NEXT_PUBLIC_APP_URL` to the canonical public origin for your deployment. Set `RESEND_API_KEY` in the Vercel project environment for contact email delivery. Do not expose this key in client-side code.

## Project structure

- `src/app/` — App Router pages, API route, sitemap, and robots route
- `src/components/` — Shared layout, tool, and UI components
- `src/config/` — Site, category, and tool registry
- `src/content/` — Blog articles
- `src/features/` — PDF, image, and text tool interfaces
- `src/services/` — Browser-side file processing
- `src/lib/` — Metadata, schema, and utility helpers
- `src/types/` — Shared TypeScript types

## File processing limits

The shared picker accepts files up to 100 MB each and multi-file selections up to 250 MB combined, with a maximum of 350 files where the operation supports batches. These are selection limits, not a promise that every device can process the maximum batch. Large files can exceed available browser memory. Image batches run sequentially and trigger individual downloads; the browser may ask permission to allow multiple downloads.

## Deployment

The project is intended for GitHub and Vercel deployment. Configure the environment variables in Vercel before enabling the contact form. Google verification files and the existing verification metadata are retained.

## License

Private — All rights reserved.
