import { GATES } from '../types/index.js';
import type { ReviewResult } from '../models/review-result.js';

export interface ValidationIssue {
  readonly severity: 'error' | 'warning';
  readonly message: string;
}

export interface ReviewValidationReport {
  readonly ok: boolean;
  readonly issues: readonly ValidationIssue[];
}

const APPROVED_STATES = new Set(['approved', 'ready-for-production', 'released']);

/**
 * Validates a review for internal consistency: all gates were run, the scores match the gates, no
 * required gate has an unresolved blocker, approvals exist when the workflow claims them, and the
 * release-readiness flag agrees with the gate results. It computes only from the review — a
 * deterministic self-check on the review's own integrity.
 */
export class ReviewValidator {
  validate(result: ReviewResult, approvalRecordCount = 0): ReviewValidationReport {
    const issues: ValidationIssue[] = [];

    // Completeness.
    const present = new Set(result.gates.map((gate) => gate.gate));
    for (const gate of GATES) {
      if (!present.has(gate.id)) {
        issues.push({ severity: 'error', message: `Review is missing the "${gate.id}" gate.` });
      }
    }

    // Score consistency.
    const recomputedOverall = average(result.gates.map((gate) => gate.score));
    if (recomputedOverall !== result.score.overall) {
      issues.push({
        severity: 'error',
        message: `Overall score ${result.score.overall} does not match the gates (${recomputedOverall}).`,
      });
    }

    // Outstanding issues on required gates.
    for (const gate of result.gates) {
      if (gate.required && gate.status === 'fail') {
        issues.push({ severity: 'error', message: `Required gate "${gate.name}" is failing.` });
      }
    }

    // Missing approvals.
    if (APPROVED_STATES.has(result.approvalState) && approvalRecordCount === 0) {
      issues.push({
        severity: 'warning',
        message: `State is "${result.approvalState}" but no approval record exists.`,
      });
    }

    // Release-readiness agreement.
    if (result.release.ready && !result.score.requiredPassed) {
      issues.push({
        severity: 'error',
        message: 'Marked release-ready while a required gate fails.',
      });
    }

    return { ok: issues.every((issue) => issue.severity !== 'error'), issues };
  }
}

function average(values: readonly number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}
