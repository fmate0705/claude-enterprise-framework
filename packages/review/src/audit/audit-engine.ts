import type { Reviewer } from '../interfaces/index.js';
import type { ReviewInput } from '../models/review-input.js';
import type { GateResult } from '../types/index.js';
import {
  ArchitectureReviewer,
  DockerReviewer,
  DocumentationReviewer,
  TestingReviewer,
} from './structural-reviewers.js';

/**
 * The audit engine runs the structural gates — architecture, Docker, testing, and documentation —
 * that inspect the project's shape rather than its craft. It is a thin composition over the
 * structural reviewers so the QA engine can treat structural and craft gates uniformly.
 */
export class AuditEngine {
  private readonly reviewers: readonly Reviewer[] = [
    new ArchitectureReviewer(),
    new DockerReviewer(),
    new TestingReviewer(),
    new DocumentationReviewer(),
  ];

  audit(input: ReviewInput): readonly GateResult[] {
    return this.reviewers.map((reviewer) => reviewer.review(input));
  }

  gates(): readonly Reviewer[] {
    return this.reviewers;
  }
}
