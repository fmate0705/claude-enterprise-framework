import type { ReleaseReadiness } from '../approval/release-validator.js';
import type { QualityScore } from '../scoring/score-calculator.js';
import type { GateResult } from '../types/index.js';
import type { ApprovalState } from '../workflows/approval-workflow.js';

/**
 * The aggregate outcome of a review: the graded gates, the computed scores, the current approval
 * state, and the release readiness. Immutable and fully derived from the {@link ReviewInput} plus
 * the workflow state, so a review is reproducible and its reports are deterministic.
 */
export interface ReviewResult {
  readonly projectName: string;
  readonly reviewedAt: string;
  readonly gates: readonly GateResult[];
  readonly score: QualityScore;
  readonly approvalState: ApprovalState;
  readonly release: ReleaseReadiness;
}
