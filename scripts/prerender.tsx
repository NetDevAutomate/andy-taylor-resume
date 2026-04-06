/**
 * Post-build SSR prerender for andytaylor.dev.
 *
 * Renders the actual App component to HTML so hydrateRoot() can adopt
 * the existing DOM without replacing it (zero CLS).
 *
 * Usage: npx tsx scripts/prerender.tsx  (runs automatically via "npm run build")
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import React, { Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Routes, Route } from 'react-router-dom';
import Critters from 'critters';
import App from '../src/App.tsx';
import GlobalNav from '../src/GlobalNav.tsx';
import AboutPage from '../src/AboutPage.tsx';
import { seo } from '../src/i18n.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

/** Strip React 19 SSR-injected <link> tags from inside #root to prevent hydration mismatch */
function stripReactSSRTags(html: string): string {
  return html.replace(/<link[^>]*>/g, '');
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Read built index.html
// ---------------------------------------------------------------------------
const distDir = resolve(root, 'dist');
const indexPath = resolve(distDir, 'index.html');

let indexHtml: string;
try {
  indexHtml = readFileSync(indexPath, 'utf-8');
} catch {
  console.error('Error: dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------
let homeHtml: string;
try {
  homeHtml = stripReactSSRTags(renderToString(
    <StaticRouter location="/">
      <div>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Suspense>
      </div>
    </StaticRouter>
  ));
} catch (err) {
  console.error('[prerender] SSR failed for home, falling back to empty root:', err);
  homeHtml = '';
}

const injectedHome = indexHtml
  .replace('<div id="root"></div>', `<div id="root">${homeHtml}</div>`);

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------
let aboutHtml: string;
try {
  aboutHtml = stripReactSSRTags(renderToString(
    <StaticRouter location="/about">
      <GlobalNav />
      <div>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </div>
    </StaticRouter>
  ));
} catch (err) {
  console.error('[prerender] SSR failed for about, falling back to empty root:', err);
  aboutHtml = '';
}

const aboutPage = indexHtml
  .replace('<div id="root"></div>', `<div id="root">${aboutHtml}</div>`)
  .replace(/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="https://andytaylor.dev/about" />')
  .replace(/<meta property="og:url" content="[^"]*" \/>/, '<meta property="og:url" content="https://andytaylor.dev/about" />')
  .replace(/<meta property="og:type" content="[^"]*" \/>/, '<meta property="og:type" content="profile" />');

// ---------------------------------------------------------------------------
// Critical CSS inlining with Critters
// ---------------------------------------------------------------------------
const critters = new Critters({
  path: distDir,
  publicPath: '/',
  inlineFonts: false,
  preload: 'media',
  compress: true,
  reduceInlineStyles: true,
});

async function writePage(html: string, outputPath: string, label: string) {
  const dir = dirname(outputPath);
  mkdirSync(dir, { recursive: true });
  try {
    const processed = await critters.process(html);
    writeFileSync(outputPath, processed, 'utf-8');
    console.log(`[prerender] ${label} (with critical CSS)`);
  } catch {
    writeFileSync(outputPath, html, 'utf-8');
    console.log(`[prerender] ${label} (no critical CSS)`);
  }
}

async function inlineCriticalCSS() {
  await writePage(injectedHome, indexPath, 'Home: dist/index.html updated');
  await writePage(aboutPage, resolve(distDir, 'about', 'index.html'), 'About: dist/about/index.html created');
}

await inlineCriticalCSS();

// ---------------------------------------------------------------------------
// 404 page
// ---------------------------------------------------------------------------
const notFoundHtml = indexHtml
  .replace('<div id="root"></div>', `<div id="root"><div style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 1.5rem"><p style="font-size:6rem;font-weight:bold;color:var(--primary);margin-bottom:1rem;font-family:var(--font-display)">404</p><h1 style="font-size:1.5rem;font-weight:600;color:var(--foreground);margin-bottom:0.5rem">Page not found</h1><p style="color:var(--muted-foreground);margin-bottom:2rem;max-width:28rem">The page you're looking for doesn't exist or has been moved.</p><a href="/" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.75rem 1.5rem;border-radius:0.75rem;background:var(--primary);color:var(--primary-foreground);font-weight:500;text-decoration:none">← Back to home</a></div></div>`)
  .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, nofollow" />')
  .replace(/<title>[^<]*<\/title>/, '<title>404 — Page not found | andytaylor.dev</title>');

if (!notFoundHtml.includes('name="robots"')) {
  const withNoindex = notFoundHtml.replace('</head>', '<meta name="robots" content="noindex, nofollow" /></head>');
  writeFileSync(resolve(distDir, '404.html'), withNoindex, 'utf-8');
} else {
  writeFileSync(resolve(distDir, '404.html'), notFoundHtml, 'utf-8');
}
console.log('[prerender] 404: dist/404.html created');

// ---------------------------------------------------------------------------
// Hydration structure validation
// ---------------------------------------------------------------------------
function validateHydrationStructure(html: string, label: string) {
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/);
  if (!rootMatch || !rootMatch[1].trim()) return;
  const content = rootMatch[1];

  if (/<link\s/.test(content)) {
    console.error(`[hydration-check] FAIL ${label}: <link> tags found inside #root`);
    process.exit(1);
  }
}

validateHydrationStructure(injectedHome, 'home');
validateHydrationStructure(aboutPage, 'about');

console.log('[hydration-check] All pages pass structural validation');
console.log('[prerender] Done.');
