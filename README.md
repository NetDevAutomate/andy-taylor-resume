# andytaylor.dev

> Personal CV/resume website for Andy Taylor — Senior Analytics Specialist Solutions Architect at AWS

[![Built with Claude Code](https://img.shields.io/badge/built%20with-Claude%20Code-blueviolet?style=flat-square)](https://claude.ai/code)

## Tech Stack

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS v4** (CSS-native config)
- **Motion** (animations)
- **Vercel** (hosting + prerender)
- SSR prerendering with critical CSS inlining
- JSON-LD structured data for SEO
- `llms.txt` for AI crawlers
- Dark/light mode

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build pipeline: TypeScript check → Vite bundle → sitemap generation → SSR prerender → validation.

## Deploy

Connected to Vercel for automatic deployments. Custom domain: `andytaylor.dev`.

## Attribution

This project is forked from [santifer.io](https://github.com/santifer/cv-santiago) by **Santiago Fernández de Valderrama Aparicio**. The original is an impressive interactive portfolio with AI chatbot, RAG, eval pipelines, and bilingual support. This fork strips it down to a clean English-only CV focused on cloud architecture and Infrastructure as Code.

## License

All rights reserved. The design and framework are credited to the original author above.
