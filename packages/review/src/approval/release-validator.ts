import type { QualityScore } from '../scoring/score-calculator.js';
import type { GateResult } from '../types/index.js';
import type { ApprovalState } from '../workflows/approval-workflow.js';

export interface ReleaseReadiness {
  readonly ready: boolean;
  /** The reasons a release is blocked; empty when ready. */
  readonly blockers: readonly string[];
  readonly recommendation: QualityScore['recommendation'];
}

/**
 * Determines whether a release may proceed. A release is ready only when every required gate
 * passes and a human has advanced the workflow to at least `approved` — automated scores never
 * grant approval on their own. It reports every blocker transparently.
 */
export class ReleaseValidator {
  validate(
    gates: readonly GateResult[],
    score: QualityScore,
    state: ApprovalState,
  ): ReleaseReadiness {
    const blockers: string[] = [];

    for (const gate of gates) {
      if (gate.required && gate.status === 'fail') {
        blockers.push(`Required gate "${gate.name}" is failing.`);
      }
    }

    const approvedStates: readonly ApprovalState[] = [
      'approved',
      'ready-for-production',
      'released',
    ];
    if (!approvedStates.includes(state)) {
      blockers.push(`Awaiting human approval (current state: ${state}).`);
    }

    return { ready: blockers.length === 0, blockers, recommendation: score.recommendation };
  }
}
