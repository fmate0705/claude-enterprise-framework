import type { GeneratedFile } from '@cef/core';
import { ReleaseValidator } from '../approval/index.js';
import type { ReviewInput, ReviewResult } from '../models/index.js';
import { QAEngine } from '../qa/index.js';
import { ReviewReportGenerator } from '../reports/index.js';
import { ScoreCalculator } from '../scoring/index.js';
import type { GateResult } from '../types/index.js';
import type { ApprovalState } from '../workflows/index.js';

/**
 * The Review Engine facade — the single entry the CLI depends on. It runs every quality gate,
 * computes the scores, evaluates release readiness against the workflow state, and renders the
 * reports. It composes the QA engine, scorer, release validator, and reporter; it holds no review
 * logic itself and never approves anything — approval is a separate, human-driven step.
 */
export class ReviewEngine {
  constructor(
    private readonly qa = new QAEngine(),
    private readonly scorer = new ScoreCalculator(),
    private readonly releaseValidator = new ReleaseValidator(),
    private readonly reporter = new ReviewReportGenerator(),
  ) {}

  /** Runs the full review for the given site and workflow state. */
  review(input: ReviewInput, approvalState: ApprovalState = 'draft'): ReviewResult {
    const gates = this.qa.run(input);
    const score = this.scorer.calculate(gates);
    const release = this.releaseValidator.validate(gates, score, approvalState);
    return {
      projectName: input.projectName,
      reviewedAt: input.reviewedAt,
      gates,
      score,
      approvalState,
      release,
    };
  }

  /** Renders the five review report files. */
  reportFiles(result: ReviewResult): readonly GeneratedFile[] {
    return this.reporter.generate(result);
  }

  /** True when every required gate passes — the precondition for advancing past internal review. */
  qaPassed(gates: readonly GateResult[]): boolean {
    return gates.filter((gate) => gate.required).every((gate) => gate.status !== 'fail');
  }
}
