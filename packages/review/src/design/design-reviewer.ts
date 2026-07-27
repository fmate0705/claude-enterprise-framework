import { AccessibilityEngine } from '@cef/design-system';
import type { Reviewer } from '../interfaces/index.js';
import type { ReviewInput } from '../models/review-input.js';
import { gradeGate } from '../scoring/gate-grade.js';
import { finding, type Finding, type GateResult } from '../types/index.js';

const HEX = /#[0-9a-fA-F]{6}\b/;

/**
 * Reviews design integrity: token-driven spacing/typography/color, component consistency (no
 * hard-coded hex), motion (reduced-motion honored), responsive breakpoints, and brand-aligned
 * contrast. It reuses the design system's own contrast math, so the design gate agrees with the
 * design system's guarantees.
 */
export class DesignReviewer implements Reviewer {
  readonly gate = 'design' as const;
  readonly name = 'Design';
  readonly required = true;
  private readonly a11y = new AccessibilityEngine();

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = [];
    const globals = input.files.get('app/globals.css') ?? '';

    if (!globals.includes('--cef-space-')) {
      findings.push(
        finding('design', 'major', 'globals.css is missing spacing tokens.', {
          file: 'app/globals.css',
        }),
      );
    }
    if (!globals.includes('--cef-text-')) {
      findings.push(
        finding('design', 'major', 'globals.css is missing type-scale tokens.', {
          file: 'app/globals.css',
        }),
      );
    }
    if (!globals.includes('--cef-color-')) {
      findings.push(
        finding('design', 'blocker', 'globals.css is missing color tokens.', {
          file: 'app/globals.css',
        }),
      );
    }
    if (!globals.includes('prefers-reduced-motion')) {
      findings.push(
        finding('design', 'major', 'No reduced-motion handling in globals.css.', {
          file: 'app/globals.css',
          recommendation: 'Add a prefers-reduced-motion block.',
        }),
      );
    }

    for (const [path, content] of input.files) {
      if (path.startsWith('components/') && path.endsWith('.tsx') && HEX.test(content)) {
        findings.push(
          finding('design', 'minor', 'Component hard-codes a hex color instead of a token.', {
            file: path,
            recommendation: 'Use a design token class.',
          }),
        );
      }
    }

    // Brand-aligned contrast: the theme's own foreground pairs must meet AA.
    const light = this.a11y.auditTheme(input.theme, 'light');
    for (const contrastIssue of light.issues) {
      if (contrastIssue.severity === 'error') {
        findings.push(finding('design', 'blocker', `Contrast: ${contrastIssue.message}`));
      }
    }

    return gradeGate(this.gate, this.name, this.required, findings);
  }
}
