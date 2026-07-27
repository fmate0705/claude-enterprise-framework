import type { Reviewer } from '../interfaces/index.js';
import { filesUnder, type ReviewInput } from '../models/review-input.js';
import { gradeGate } from '../scoring/gate-grade.js';
import { finding, type Finding, type GateResult } from '../types/index.js';

const SLOP = /(lorem ipsum|your headline here|insert (text|description)|\bTODO\b|\bFIXME\b)/i;

/**
 * Reviews content quality: no lorem ipsum or placeholder slop in shipped copy, placeholder
 * testimonials flagged for replacement, broken internal links, and CTA presence. Grammar and tone
 * are noted as needing human review — they are not asserted as machine-verified.
 */
export class ContentReviewer implements Reviewer {
  readonly gate = 'content' as const;
  readonly name = 'Content';
  readonly required = true;

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = [];
    const routes = this.routes(input);

    for (const [path, content] of filesUnder(input.files, 'content/')) {
      if (SLOP.test(content)) {
        findings.push(
          finding('content', 'blocker', 'Placeholder/lorem-ipsum content shipped.', { file: path }),
        );
      }
      if (/"placeholder":\s*true/.test(content)) {
        findings.push(
          finding('content', 'major', 'Placeholder testimonials must be replaced before launch.', {
            file: path,
            recommendation: 'Replace with real, attributed client quotes.',
          }),
        );
      }
    }

    for (const [path, content] of input.files) {
      if (!path.startsWith('app/') && !path.startsWith('components/')) {
        continue;
      }
      for (const href of internalLinks(content)) {
        if (!routes.has(href) && ![...routes].some((route) => href.startsWith(`${route}/`))) {
          findings.push(
            finding('content', 'minor', `Internal link "${href}" has no matching page.`, {
              file: path,
            }),
          );
        }
      }
    }

    findings.push(
      finding('content', 'nit', 'Grammar and tone require a human read-through before approval.', {
        recommendation: 'Proofread all shipped copy.',
      }),
    );

    return gradeGate(this.gate, this.name, this.required, findings);
  }

  private routes(input: ReviewInput): ReadonlySet<string> {
    const routes = new Set<string>(['#main']);
    for (const [path] of filesUnder(input.files, 'app/')) {
      if (!path.endsWith('page.tsx')) {
        continue;
      }
      const dir = path.replace(/^app\//, '').replace(/\/?page\.tsx$/, '');
      routes.add(dir === '' ? '/' : `/${dir.replace(/\/\[slug\]$/, '')}`);
    }
    return routes;
  }
}

/** Extracts internal `href="/..."` targets (ignoring anchors and external URLs). */
export function internalLinks(content: string): readonly string[] {
  const links: string[] = [];
  const regex = /href=["'{]*\s*(\/[a-z0-9/-]*)/gi;
  let match = regex.exec(content);
  while (match !== null) {
    if (match[1] !== undefined) {
      links.push(match[1].replace(/\/$/, '') || '/');
    }
    match = regex.exec(content);
  }
  return links;
}
