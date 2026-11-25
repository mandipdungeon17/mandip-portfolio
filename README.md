# Mandip Pandit — Portfolio

A premium, responsive engineering portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, and shadcn/ui-style primitives.

## Run locally

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and validate

```bash
npm run typecheck
npm run build
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel. Select Next.js as the framework; the defaults are already configured.
3. Deploy. No environment variables or external data services are required.

The GitHub insights panel reads only public profile, repository, and recent-event data from GitHub's REST API in the visitor's browser. If GitHub is unavailable or rate-limits the request, the panel reports that state and links directly to the profile.

## Content and assets

- Portfolio copy and verified project details live in `src/lib/data.ts`.
- The resume download is served from `public/Mandip-Pandit-Resume.pdf`.
- SEO metadata and the Person JSON-LD schema are in `src/app/layout.tsx`.
- Motion and interaction patterns are centralized in `src/components/portfolio.tsx`.
- Light-theme section styling, the recognition carousel, and the warehouse/banking scene animations live in `src/app/light.css`; animations respect reduced-motion preferences.
- The portfolio uses no remote image dependencies; project illustrations are rendered with CSS and inline SVG.

## Structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    portfolio.tsx
    ui/
      badge.tsx
      button.tsx
  lib/
    data.ts
    utils.ts
public/
  Mandip-Pandit-Resume.pdf
```

The warehouse dashboard and project mockups are visual studies only; their illustrative figures are not production telemetry.
