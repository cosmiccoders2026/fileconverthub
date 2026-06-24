# FileConvertHub

Free online file, image, PDF, and text tools — all in one place.

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Radix UI primitives)
- **pdf-lib** & **pdfjs-dist** for PDF processing
- Client-side Canvas API for image tools

## Features

- Production tools across PDF, image, and text categories
- Config-driven tool registry and category system
- SEO-first with metadata helpers, structured data, sitemap, and robots.txt
- No database, no auth, no watermarks
- Browser-based file processing for privacy
- Ad slot placeholders for monetization
- Mobile-first responsive design

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & API routes
├── components/           # Shared UI components
│   ├── ads/              # Ad slot placeholders
│   ├── layout/           # Navbar, footer, page layouts
│   ├── shared/           # Cards, breadcrumbs, etc.
│   └── ui/               # shadcn/ui primitives
├── config/               # Site, category, and tool configs
├── content/              # Blog content
├── features/             # Tool-specific UI components
│   ├── image/
│   ├── pdf/
│   ├── text/
│   └── tools/            # Tool registry
├── lib/                  # Utilities, metadata, schema helpers
├── services/             # Processing logic
└── types/                # TypeScript types
```

## Adding a New Tool

1. Add tool config to `src/config/tools.ts`
2. Create tool UI component in `src/features/{category}/`
3. Register in `src/features/tools/tool-registry.ts`
4. The tool page at `/tools/[slug]` is automatically generated

## Environment Variables

See `.env.example` for all configuration options.

## License

Private — All rights reserved.
