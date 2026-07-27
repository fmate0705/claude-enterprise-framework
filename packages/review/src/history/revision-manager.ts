import type { ApprovalState } from '../workflows/approval-workflow.js';

export interface Revision {
  readonly number: number;
  readonly changedFiles: readonly string[];
  readonly reason: string;
  readonly author: string;
  readonly approvalState: ApprovalState;
  /** The revision number to roll back to, or "initial" for the first revision. */
  readonly rollbackPoint: string;
  readonly at: string;
}

export interface RevisionHistory {
  readonly revisions: readonly Revision[];
}

export const EMPTY_HISTORY: RevisionHistory = { revisions: [] };

export interface RevisionInput {
  readonly changedFiles: readonly string[];
  readonly reason: string;
  readonly author: string;
  readonly approvalState: ApprovalState;
  readonly at: string;
}

/**
 * Maintains an immutable, append-only revision history. Recording a revision returns a new history
 * with the next sequential number and a rollback point pointing at the prior revision; earlier
 * revisions are never altered, so the trail is a durable, auditable record.
 */
export class RevisionManager {
  record(history: RevisionHistory, input: RevisionInput): RevisionHistory {
    const number = history.revisions.length + 1;
    const previous = history.revisions[history.revisions.length - 1];
    const revision: Revision = {
      number,
      changedFiles: [...input.changedFiles],
      reason: input.reason,
      author: input.author,
      approvalState: input.approvalState,
      rollbackPoint: previous ? String(previous.number) : 'initial',
      at: input.at,
    };
    return { revisions: [...history.revisions, revision] };
  }

  latest(history: RevisionHistory): Revision | undefined {
    return history.revisions[history.revisions.length - 1];
  }

  serialize(history: RevisionHistory): string {
    return `${JSON.stringify(history, null, 2)}\n`;
  }
}
