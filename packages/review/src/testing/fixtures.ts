import { DesignEngine } from '@cef/design-system';
import { BlueprintGenerator, normalizeInput, type Blueprint } from '@cef/intelligence';
import type { ReviewInput } from '../models/review-input.js';

export const FIXED_TIMESTAMP = '2026-07-27T00:00:00.000Z';

export function legalBlueprint(): Blueprint {
  return new BlueprintGenerator().generate(
    normalizeInput({
      projectName: 'Acme Law',
      projectType: 'landing-page',
      description:
        'A law firm website offering legal services, intake, attorneys, and practice areas.',
      targetCountry: 'HU',
      targetLanguage: 'hu',
    }),
    FIXED_TIMESTAMP,
  );
}

/** A representative, clean generated-site file set for review tests (import-free for determinism). */
export function cleanSite(): Map<string, string> {
  return new Map<string, string>([
    ['package.json', '{ "dependencies": { "next": "^15.0.0" } }\n'],
    ['tsconfig.json', '{}\n'],
    [
      'next.config.mjs',
      "const c = { images: { formats: ['image/avif', 'image/webp'] } };\nexport default c;\n",
    ],
    ['app/layout.tsx', '<html lang="hu"><a href="#main">Skip</a><main id="main"></main></html>\n'],
    [
      'app/globals.css',
      ':root{--cef-space-4:1rem;--cef-text-base:1rem;--cef-color-primary-500:#3b82f6;--cef-primary:#1d4ed8;}\n@media (prefers-reduced-motion: reduce){*{}}\n',
    ],
    ['app/page.tsx', "export const metadata = { alternates: { canonical: '/' } };\n"],
    ['components/sections/hero.tsx', 'export function Hero(){return <h1>Title</h1>;}\n'],
    [
      'components/site/navbar.tsx',
      'export function Navbar(){return <nav aria-label="Primary">Acme Law</nav>;}\n',
    ],
    ['app/robots.ts', 'export default function robots(){return {};}\n'],
    ['app/sitemap.ts', 'export default function sitemap(){return [];}\n'],
    ['app/opengraph-image.tsx', 'export default function OG(){return null;}\n'],
    ['public/manifest.webmanifest', '{}\n'],
    ['public/schema.json', '{}\n'],
    ['public/llms.txt', '# Acme Law\n'],
    ['public/humans.txt', '/* TEAM */\n'],
    ['public/security.txt', 'Contact: mailto:security@example.com\n'],
    ['content/home.ts', 'export const homeContent = { intro: "Welcome" };\n'],
    ['app/legal/page.tsx', 'export default function Legal(){return null;}\n'],
    ['.env.example', 'NEXT_PUBLIC_SITE_URL=https://acme.law\n'],
    ['README.md', '# Acme Law\n'],
  ]);
}

export function reviewInput(files: Map<string, string> = cleanSite()): ReviewInput {
  const design = new DesignEngine();
  return {
    projectName: 'Acme Law',
    files,
    blueprint: legalBlueprint(),
    tokens: design.resolveTokens('premium'),
    theme: design.themes.get('legal') ?? design.themes.baseTheme(),
    reviewedAt: FIXED_TIMESTAMP,
  };
}
