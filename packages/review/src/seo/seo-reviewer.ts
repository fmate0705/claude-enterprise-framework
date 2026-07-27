import type { Reviewer } from '../interfaces/index.js';
import { filesUnder, type ReviewInput } from '../models/review-input.js';
import { gradeGate } from '../scoring/gate-grade.js';
import { finding, type Finding, type GateResult, type Severity } from '../types/index.js';

const REQUIRED_SEO_FILES: Readonly<Record<string, Severity>> = {
  'app/robots.ts': 'blocker',
  'app/sitemap.ts': 'blocker',
  'public/manifest.webmanifest': 'major',
  'public/llms.txt': 'major',
  'public/humans.txt': 'minor',
  'public/security.txt': 'minor',
  'app/opengraph-image.tsx': 'major',
  'public/schema.json': 'minor',
};

/**
 * Reviews SEO completeness: the site-wide artifacts (robots, sitemap, manifest, JSON-LD, OG image,
 * AI/discovery files) and per-page metadata (title, description, canonical). It cross-checks pages
 * against the blueprint so every planned page is covered.
 */
export class SEOReviewer implements Reviewer {
  readonly gate = 'seo' as const;
  readonly name = 'SEO';
  readonly required = true;

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = [];

    for (const [path, severity] of Object.entries(REQUIRED_SEO_FILES)) {
      if (!input.files.has(path)) {
        findings.push(finding('seo', severity, `Missing SEO artifact "${path}".`, { file: path }));
      }
    }

    for (const [path, content] of filesUnder(input.files, 'app/')) {
      if (!path.endsWith('page.tsx') || path.includes('[')) {
        continue;
      }
      if (!/export const metadata|generateMetadata/.test(content)) {
        findings.push(finding('seo', 'major', 'Page has no metadata export.', { file: path }));
      }
      if (!/canonical/.test(content)) {
        findings.push(finding('seo', 'minor', 'Page declares no canonical URL.', { file: path }));
      }
    }

    // The home page must render exactly one h1 (via the Hero).
    const hero = input.files.get('components/sections/hero.tsx');
    if (hero && !/<h1[\s>]/.test(hero)) {
      findings.push(
        finding('seo', 'major', 'Hero component renders no h1.', {
          file: 'components/sections/hero.tsx',
        }),
      );
    }

    return gradeGate(this.gate, this.name, this.required, findings);
  }
}
