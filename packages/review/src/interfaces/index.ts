import type { GateId, GateResult } from '../types/index.js';
import type { ReviewInput } from '../models/review-input.js';

/**
 * A reviewer inspects the generated site for one quality gate and returns a scored, deterministic
 * {@link GateResult}. Reviewers never mutate the input and never approve anything — they only
 * assess. This is the SOLID boundary that lets the QA engine treat every gate uniformly.
 */
export interface Reviewer {
  readonly gate: GateId;
  readonly name: string;
  readonly required: boolean;
  review(input: ReviewInput): GateResult;
}
