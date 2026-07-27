import type { Reviewer } from '../interfaces/index.js';
import type { ReviewInput } from '../models/review-input.js';
import { gradeGate } from '../scoring/gate-grade.js';
import { finding, type Finding, type GateResult } from '../types/index.js';

/**
 * Reviews legal completeness against the blueprint's required legal pages (privacy, terms, cookie,
 * and the Hungarian Impresszum / ÁSZF / Adatkezelési Tájékoztató where applicable). It always
 * records that generated legal text requires review by a qualified legal professional — the review
 * never certifies legal sufficiency on its own.
 */
export class LegalReviewer implements Reviewer {
  readonly gate = 'legal' as const;
  readonly name = 'Legal';
  readonly required = true;

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = [];
    const hasLegalRoute = input.files.has('app/legal/page.tsx');

    if (!hasLegalRoute) {
      findings.push(finding('legal', 'blocker', 'No legal section is present in the site.'));
    }

    for (const page of input.blueprint.legal.requiredPages.filter((p) => p.required)) {
      const covered = [...input.files.keys()].some((path) => path.includes(`legal/${page.id}`));
      if (!covered) {
        findings.push(
          finding(
            'legal',
            'major',
            `Required legal page "${page.name}" is not individually generated.`,
            {
              recommendation: `Author the ${page.name} page: ${page.reason}`,
            },
          ),
        );
      }
    }

    findings.push(
      finding(
        'legal',
        'major',
        'Generated legal text requires review by a qualified legal professional.',
        {
          recommendation: input.blueprint.legal.disclaimer,
        },
      ),
    );

    return gradeGate(this.gate, this.name, this.required, findings);
  }
}
