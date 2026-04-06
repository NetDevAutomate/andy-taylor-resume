/**
 * Post-prerender validation for SEO invariants.
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.app.json scripts/validate-prerender.ts
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')

type Severity = 'error' | 'warn'
interface Issue { severity: Severity; msg: string }

function validatePage(htmlPath: string, label: string): Issue[] {
  const issues: Issue[] = []

  if (!existsSync(htmlPath)) {
    issues.push({ severity: 'error', msg: `HTML not found: ${htmlPath}` })
    return issues
  }

  const html = readFileSync(htmlPath, 'utf-8')

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/)
  if (!titleMatch) {
    issues.push({ severity: 'error', msg: 'Title tag not found' })
  }

  // Description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)
  if (!descMatch) {
    issues.push({ severity: 'error', msg: 'Meta description not found' })
  }

  // Canonical
  if (!html.includes('rel="canonical"')) {
    issues.push({ severity: 'warn', msg: 'Canonical tag not found' })
  }

  // H1
  const h1s = html.match(/<h1[\s>]/g) || []
  if (h1s.length === 0) {
    issues.push({ severity: 'error', msg: 'No H1 found' })
  }

  // JSON-LD
  if (!html.includes('application/ld+json')) {
    issues.push({ severity: 'warn', msg: 'No JSON-LD structured data' })
  }

  return issues
}

console.log('\n[validate-prerender] Post-prerender SEO validation\n')

let totalErrors = 0
let totalWarnings = 0

function printIssues(issues: Issue[], label: string) {
  const errors = issues.filter(i => i.severity === 'error').length
  const warnings = issues.filter(i => i.severity === 'warn').length
  totalErrors += errors
  totalWarnings += warnings

  if (issues.length === 0) {
    console.log(`\x1b[32m✓\x1b[0m ${label} — clean`)
    return
  }

  const icon = errors > 0 ? '\x1b[31m✗\x1b[0m' : '\x1b[33m⚠\x1b[0m'
  console.log(`${icon} ${label} — ${errors} errors, ${warnings} warnings`)
  for (const issue of issues) {
    const prefix = issue.severity === 'error' ? '\x1b[31m  ERR\x1b[0m' : '\x1b[33m  WARN\x1b[0m'
    console.log(`${prefix}  ${issue.msg}`)
  }
}

// Validate pages
printIssues(validatePage(resolve(dist, 'index.html'), 'home'), 'Home')
printIssues(validatePage(resolve(dist, 'about', 'index.html'), 'about'), 'About')

// Check 404
if (existsSync(resolve(dist, '404.html'))) {
  console.log(`\x1b[32m✓\x1b[0m 404 page exists`)
} else {
  console.log(`\x1b[33m⚠\x1b[0m 404 page not found`)
  totalWarnings++
}

// Check llms.txt
if (existsSync(resolve(dist, 'llms.txt'))) {
  console.log(`\x1b[32m✓\x1b[0m llms.txt exists`)
} else {
  console.log(`\x1b[33m⚠\x1b[0m llms.txt not found`)
  totalWarnings++
}

// Check sitemap
if (existsSync(resolve(dist, 'sitemap.xml'))) {
  console.log(`\x1b[32m✓\x1b[0m sitemap.xml exists`)
} else {
  console.log(`\x1b[33m⚠\x1b[0m sitemap.xml not found`)
  totalWarnings++
}

console.log(`\nErrors: ${totalErrors} | Warnings: ${totalWarnings}\n`)

if (totalErrors > 0) {
  console.error('\x1b[31m✗ Prerender validation failed.\x1b[0m\n')
  process.exit(1)
}

console.log('\x1b[32m✓ Prerender validation passed.\x1b[0m\n')
