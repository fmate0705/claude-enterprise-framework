import { AccessibilityReviewer } from '../accessibility/index.js';
import { AuditEngine } from '../audit/index.js';
import { BrandReviewer } from '../branding/index.js';
import { ContentReviewer } from '../content/index.js';
import { DesignReviewer } from '../design/index.js';
import { LegalReviewer } from '../legal/index.js';
import { PerformanceReviewer } from '../performance/index.js';
import { SEOReviewer } from '../seo/index.js';
import { SecurityReviewer } from '../security/index.js';
import type { Reviewer } from '../interfaces/index.js';
import type { ReviewInput } from '../models/review-input.js';
import { GATES, resetFindingIds, type GateResult } from '../types/index.js';

/**
 * The QA engine runs every quality gate over the generated site and returns the results in the
 * canonical gate order. It resets finding ids at the start of each run so the same site always
 * yields identical findings — deterministic reviews are the foundation of transparent reporting.
 */
export class QAEngine {
  private readonly craft: readonly Reviewer[] = [
    new DesignReviewer(),
    new AccessibilityReviewer(),
    new SEOReviewer(),
    new PerformanceReviewer(),
    new SecurityReviewer(),
    new ContentReviewer(),
    new BrandReviewer(),
    new LegalReviewer(),
  ];
  private readonly audit = new AuditEngine();

  run(input: ReviewInput): readonly GateResult[] {
    resetFindingIds();
    const results = [
      ...this.craft.map((reviewer) => reviewer.review(input)),
      ...this.audit.audit(input),
    ];
    return GATES.map((gate) => results.find((result) => result.gate === gate.id)).filter(
      (result): result is GateResult => result !== undefined,
    );
  }
}
