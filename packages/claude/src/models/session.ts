/**
 * Session tracking model. A session records what happened during one stretch of work so a
 * later session — or a compacted context — can resume without rediscovery. All timestamps are
 * ISO-8601 strings produced from an injected clock, so sessions are deterministic under test.
 */

export type SessionEventKind = 'command' | 'file-modified' | 'error' | 'note' | 'milestone';

export interface SessionEvent {
  readonly kind: SessionEventKind;
  readonly at: string;
  readonly detail: string;
}

export interface SessionState {
  readonly id: string;
  readonly startedAt: string;
  readonly updatedAt: string;
  readonly currentMilestone: string | undefined;
  readonly completedWork: readonly string[];
  readonly filesModified: readonly string[];
  readonly commandsExecuted: readonly string[];
  readonly errors: readonly string[];
  readonly openQuestions: readonly string[];
  readonly events: readonly SessionEvent[];
}

/** A compact record of a past session, appended to history when a session ends. */
export interface SessionSummary {
  readonly id: string;
  readonly startedAt: string;
  readonly endedAt: string | undefined;
  readonly milestone: string | undefined;
  readonly commandCount: number;
  readonly fileCount: number;
  readonly errorCount: number;
}

export interface SessionHistory {
  readonly sessions: readonly SessionSummary[];
}

export const EMPTY_HISTORY: SessionHistory = { sessions: [] };
