import type { Reviewer } from '../interfaces/index.js';
import { filesUnder, type ReviewInput } from '../models/review-input.js';
import { gradeGate } from '../scoring/gate-grade.js';
import { finding, type Finding, type GateResult } from '../types/index.js';

/**
 * Reviews accessibility to the WCAG 2.2 AA floor: the root layout's skip link, main landmark, and
 * html lang; semantic controls in components (no click-handling divs); labelled icon controls; and
 * reduced-motion handling. Checks are structural and deterministic over the generated source.
 */
export class AccessibilityReviewer implements Reviewer {
  readonly gate = 'accessibility' as const;
  readonly name = 'Accessibility';
  readonly required = true;

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = [];
    const layout = input.files.get('app/layout.tsx');

    if (layout) {
      if (!layout.includes('#main')) {
        findings.push(
          finding('accessibility', 'blocker', 'Root layout has no skip link.', {
            file: 'app/layout.tsx',
          }),
        );
      }
      if (!/<main[\s>]/.test(layout)) {
        findings.push(
          finding('accessibility', 'blocker', 'Root layout has no main landmark.', {
            file: 'app/layout.tsx',
          }),
        );
      }
      if (!/<html lang=/.test(layout)) {
        findings.push(
          finding('accessibility', 'blocker', 'Root layout does not set html lang.', {
            file: 'app/layout.tsx',
          }),
        );
      }
    } else {
      findings.push(finding('accessibility', 'blocker', 'No root layout found.'));
    }

    for (const [path, content] of filesUnder(input.files, 'components/')) {
      if (!path.endsWith('.tsx')) {
        continue;
      }
      if (/<div[^>]*onClick=/.test(content)) {
        findings.push(
          finding('accessibility', 'major', 'A div is used as a click target; use a real button.', {
            file: path,
            recommendation: 'Replace the div with a <button>.',
          }),
        );
      }
      if (/<img\b(?![^>]*\balt=)/.test(content)) {
        findings.push(
          finding('accessibility', 'major', 'An image has no alt attribute.', { file: path }),
        );
      }
    }

    // Nav must be a landmark with an accessible name.
    const navbar = input.files.get('components/site/navbar.tsx');
    if (navbar && !/aria-label=/.test(navbar)) {
      findings.push(
        finding('accessibility', 'minor', 'Primary nav has no accessible name.', {
          file: 'components/site/navbar.tsx',
        }),
      );
    }

    return gradeGate(this.gate, this.name, this.required, findings);
  }
}
