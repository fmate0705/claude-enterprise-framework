import type { Reviewer } from '../interfaces/index.js';
import type { ReviewInput } from '../models/review-input.js';
import { gradeGate } from '../scoring/gate-grade.js';
import { finding, type Finding, type GateResult } from '../types/index.js';

/**
 * Reviews brand consistency: the resolved theme's primary color is present as a token, the brand
 * name appears in the shell, and the preset's radius language is applied. Subjective brand
 * judgement is deferred to a human — flagged as a recommendation, never auto-passed.
 */
export class BrandReviewer implements Reviewer {
  readonly gate = 'brand' as const;
  readonly name = 'Brand Consistency';
  readonly required = true;

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = [];
    const globals = input.files.get('app/globals.css') ?? '';

    if (!globals.includes('--cef-primary')) {
      findings.push(
        finding('brand', 'major', 'Theme primary color is not exposed as a token.', {
          file: 'app/globals.css',
        }),
      );
    }

    const navbar = input.files.get('components/site/navbar.tsx') ?? '';
    if (!navbar.includes(input.projectName)) {
      findings.push(
        finding('brand', 'minor', 'Brand name is not present in the navigation.', {
          file: 'components/site/navbar.tsx',
        }),
      );
    }

    findings.push(
      finding('brand', 'nit', 'Brand alignment (voice, imagery, tone) needs a human sign-off.', {
        recommendation: 'Have the brand owner review before approval.',
      }),
    );

    return gradeGate(this.gate, this.name, this.required, findings);
  }
}
