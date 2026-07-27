import type { Reviewer } from '../interfaces/index.js';
import { filesUnder, type ReviewInput } from '../models/review-input.js';
import { gradeGate } from '../scoring/gate-grade.js';
import { finding, type Finding, type GateResult } from '../types/index.js';

/** Client-heavy libraries that, if imported broadly, indicate a bundle risk. */
const HEAVY = /from\s+'(moment|lodash|jquery|chart\.js|three)'/;

/**
 * Reviews performance posture: modern image formats configured, a server-first render strategy
 * (client boundaries justified, not the default), no obviously heavy client libraries, and the
 * Core Web Vitals targets carried in the plan. Deterministic checks over configuration and source.
 */
export class PerformanceReviewer implements Reviewer {
  readonly gate = 'performance' as const;
  readonly name = 'Performance';
  readonly required = true;

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = [];

    const nextConfig = input.files.get('next.config.mjs') ?? '';
    if (!/formats:\s*\[[^\]]*avif/.test(nextConfig)) {
      findings.push(
        finding('performance', 'major', 'Next image config does not enable AVIF.', {
          file: 'next.config.mjs',
          recommendation: "Set images.formats to ['image/avif', 'image/webp'].",
        }),
      );
    }

    for (const [path, content] of filesUnder(input.files, 'app/')) {
      if (path.endsWith('page.tsx') && /'use client'/.test(content)) {
        findings.push(
          finding('performance', 'minor', 'Page is a Client Component; prefer server-first.', {
            file: path,
            recommendation: 'Move interactivity to a small client leaf.',
          }),
        );
      }
    }

    for (const [path, content] of input.files) {
      if ((path.endsWith('.tsx') || path.endsWith('.ts')) && HEAVY.test(content)) {
        findings.push(
          finding('performance', 'major', 'A heavy client library is imported.', {
            file: path,
            recommendation: 'Replace with a lighter or platform alternative.',
          }),
        );
      }
    }

    const budget = input.blueprint.performance;
    if (budget.coreWebVitals.lcpMs > 2500) {
      findings.push(finding('performance', 'minor', 'Planned LCP target exceeds 2500ms.'));
    }

    return gradeGate(this.gate, this.name, this.required, findings);
  }
}
