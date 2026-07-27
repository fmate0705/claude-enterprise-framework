import type { ApprovalState } from '../workflows/approval-workflow.js';

export type FeedbackType = 'comment' | 'change-request' | 'accepted' | 'rejected';

export interface FeedbackEntry {
  readonly id: string;
  readonly author: string;
  readonly type: FeedbackType;
  readonly comment: string;
  readonly at: string;
}

export interface FeedbackLog {
  readonly entries: readonly FeedbackEntry[];
}

export interface ApprovalRecord {
  readonly state: ApprovalState;
  readonly actor: string;
  readonly at: string;
  readonly note: string | undefined;
}

export interface ApprovalLog {
  readonly records: readonly ApprovalRecord[];
}

export const EMPTY_FEEDBACK: FeedbackLog = { entries: [] };
export const EMPTY_APPROVALS: ApprovalLog = { records: [] };

/**
 * Manages client feedback and the approval record. Both logs are append-only: adding an entry
 * returns a new log rather than mutating the old one, so the client conversation and the approval
 * trail are an immutable, auditable history.
 */
export class FeedbackManager {
  addFeedback(log: FeedbackLog, entry: Omit<FeedbackEntry, 'id'>): FeedbackLog {
    const id = `fb-${log.entries.length + 1}`;
    return { entries: [...log.entries, { id, ...entry }] };
  }

  recordApproval(log: ApprovalLog, record: ApprovalRecord): ApprovalLog {
    return { records: [...log.records, record] };
  }

  requestedChanges(log: FeedbackLog): readonly FeedbackEntry[] {
    return log.entries.filter((entry) => entry.type === 'change-request');
  }

  serializeFeedback(log: FeedbackLog): string {
    return `${JSON.stringify(log, null, 2)}\n`;
  }

  serializeApprovals(log: ApprovalLog): string {
    return `${JSON.stringify(log, null, 2)}\n`;
  }

  /** Renders the client-facing feedback markdown. */
  renderFeedback(log: FeedbackLog): string {
    const lines = ['# Client Feedback', ''];
    if (log.entries.length === 0) {
      lines.push('No feedback recorded yet.');
      return `${lines.join('\n')}\n`;
    }
    for (const entry of log.entries) {
      lines.push(`- **[${entry.type}]** ${entry.author} (${entry.at}): ${entry.comment}`);
    }
    return `${lines.join('\n')}\n`;
  }
}
