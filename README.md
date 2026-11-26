# Mandip Pandit — Portfolio

A premium, responsive engineering portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, and shadcn/ui-style primitives.

## Run locally

Requires Node.js 22.12 or newer for Cloudflare builds.

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

## Deploy to Cloudflare Workers

The Worker and its `WORKER_SELF_REFERENCE` service binding must both be named
`mandip-portfolio`. The Wrangler configuration keeps them in sync.
For the existing Workers Builds project, set:

- Build command: `npm run build:cloudflare`
- Deploy command: `npm run deploy:cloudflare`
- Build environment: Node.js 22.12 or newer.

Push these changes and redeploy. The OpenNext build runs `next build` itself;
do not use `npm run build` alone as the Cloudflare build command.
To test locally with the Workers runtime, run `npm run preview:cloudflare`.
OpenNext recommends using WSL on Windows.

Once deployed, add `mandippandit.com` under the Worker's **Settings > Domains
& Routes > Add > Custom Domain**. The domain must be an active zone in the
same Cloudflare account. Follow Cloudflare's prompts for DNS and certificate
provisioning. Domain setup is separate from the Worker build and deployment.

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
