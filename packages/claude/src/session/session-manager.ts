import type { Clock } from '@cef/core';
import { SESSION_CURRENT_PATH } from '../paths.js';
import {
  type GeneratedContext,
  type SessionEvent,
  type SessionEventKind,
  type SessionHistory,
  type SessionState,
  type SessionSummary,
} from '../models/index.js';
import { TokenEstimator } from '../compression/index.js';

/** A fixed clock, used when no real one is injected, so sessions are deterministic under test. */
class FixedClock implements Clock {
  constructor(private readonly instant = new Date('2026-01-01T00:00:00.000Z')) {}
  now(): Date {
    return this.instant;
  }
}

/**
 * Tracks a working session: the current milestone, completed work, files touched, commands run,
 * errors, and open questions. State transitions are pure — each returns a new {@link SessionState}
 * with a fresh `updatedAt` and an appended event — so history is reconstructable and testable.
 * Time comes from an injected {@link Clock}.
 */
export class ClaudeSessionManager {
  constructor(
    private readonly clock: Clock = new FixedClock(),
    private readonly tokens: TokenEstimator = new TokenEstimator(),
  ) {}

  start(id: string): SessionState {
    const at = this.iso();
    return {
      id,
      startedAt: at,
      updatedAt: at,
      currentMilestone: undefined,
      completedWork: [],
      filesModified: [],
      commandsExecuted: [],
      errors: [],
      openQuestions: [],
      events: [],
    };
  }

  recordCommand(state: SessionState, command: string): SessionState {
    return this.append(
      { ...state, commandsExecuted: unique([...state.commandsExecuted, command]) },
      'command',
      command,
    );
  }

  recordFileModified(state: SessionState, path: string): SessionState {
    return this.append(
      { ...state, filesModified: unique([...state.filesModified, path]) },
      'file-modified',
      path,
    );
  }

  recordCompletedWork(state: SessionState, description: string): SessionState {
    return this.append(
      { ...state, completedWork: unique([...state.completedWork, description]) },
      'milestone',
      description,
    );
  }

  recordError(state: SessionState, message: string): SessionState {
    return this.append({ ...state, errors: [...state.errors, message] }, 'error', message);
  }

  recordOpenQuestion(state: SessionState, question: string): SessionState {
    return this.append(
      { ...state, openQuestions: unique([...state.openQuestions, question]) },
      'note',
      question,
    );
  }

  setMilestone(state: SessionState, milestone: string): SessionState {
    return this.append({ ...state, currentMilestone: milestone }, 'milestone', milestone);
  }

  /** Appends this session to history as a compact summary. */
  appendToHistory(history: SessionHistory, state: SessionState): SessionHistory {
    const summary: SessionSummary = {
      id: state.id,
      startedAt: state.startedAt,
      endedAt: this.iso(),
      milestone: state.currentMilestone,
      commandCount: state.commandsExecuted.length,
      fileCount: state.filesModified.length,
      errorCount: state.errors.length,
    };
    const withoutCurrent = history.sessions.filter((session) => session.id !== state.id);
    return { sessions: [...withoutCurrent, summary] };
  }

  render(state: SessionState): GeneratedContext {
    const lines: string[] = [];
    lines.push('# Current Session');
    lines.push('');
    lines.push(`- Session: ${state.id}`);
    lines.push(`- Started: ${state.startedAt}`);
    lines.push(`- Updated: ${state.updatedAt}`);
    lines.push(`- Current milestone: ${state.currentMilestone ?? '—'}`);
    lines.push('');
    this.section(lines, 'Completed work', state.completedWork);
    this.section(lines, 'Files modified', state.filesModified);
    this.section(lines, 'Commands executed', state.commandsExecuted);
    this.section(lines, 'Errors encountered', state.errors);
    this.section(lines, 'Open questions', state.openQuestions);
    const content = `${lines.join('\n').trimEnd()}\n`;
    return { path: SESSION_CURRENT_PATH, content, tokenEstimate: this.tokens.estimate(content) };
  }

  private section(lines: string[], title: string, items: readonly string[]): void {
    lines.push(`## ${title}`);
    if (items.length === 0) {
      lines.push('- —');
    } else {
      for (const item of items) {
        lines.push(`- ${item}`);
      }
    }
    lines.push('');
  }

  private append(state: SessionState, kind: SessionEventKind, detail: string): SessionState {
    const at = this.iso();
    const event: SessionEvent = { kind, at, detail };
    return { ...state, updatedAt: at, events: [...state.events, event] };
  }

  private iso(): string {
    return this.clock.now().toISOString();
  }
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}
