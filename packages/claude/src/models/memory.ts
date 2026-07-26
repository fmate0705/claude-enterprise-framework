/**
 * Project memory model. Memory is a *projection* of authoritative state (the snapshot, the
 * roadmap, and the session), rendered to concise markdown files that Claude reads. It is never
 * a second source of truth: regenerating it from the same inputs always yields the same files,
 * which is what makes synchronization deterministic and hand-editing unnecessary.
 */

/** The seven memory documents, in canonical order. */
export const MEMORY_FILE_IDS = [
  'project',
  'architecture',
  'requirements',
  'decisions',
  'todos',
  'known-issues',
  'future',
] as const;

export type MemoryFileId = (typeof MEMORY_FILE_IDS)[number];

/** Maps a memory id to its file path under `.cef/memory/`. */
export const MEMORY_FILE_PATHS: Readonly<Record<MemoryFileId, string>> = {
  project: '.cef/memory/project.md',
  architecture: '.cef/memory/architecture.md',
  requirements: '.cef/memory/requirements.md',
  decisions: '.cef/memory/decisions.md',
  todos: '.cef/memory/todos.md',
  'known-issues': '.cef/memory/known-issues.md',
  future: '.cef/memory/future.md',
};

export interface MemoryDocument {
  readonly id: MemoryFileId;
  readonly path: string;
  readonly content: string;
}

/** A recorded architecture decision, derived from the resolved stack and engines. */
export interface DecisionRecord {
  readonly id: string;
  readonly title: string;
  readonly rationale: string;
}

/** A known issue, sourced from validation and session errors. */
export interface IssueRecord {
  readonly id: string;
  readonly severity: 'blocker' | 'major' | 'minor';
  readonly text: string;
}
