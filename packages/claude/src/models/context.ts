import type { ArtifactIndex } from './artifact.js';
import type { DecisionRecord } from './memory.js';
import type { Roadmap } from './roadmap.js';
import type { SessionState } from './session.js';
import type { ProjectSnapshot } from './snapshot.js';

/**
 * The aggregate input to context, summary, and status generation. It composes the project
 * snapshot with the derived roadmap, the active session, the artifact index, and a few
 * cross-cutting facts (recent changes, open decisions). Assembling these once and passing them
 * as one immutable value is what keeps generation a pure function and prevents any generator
 * from reaching outside its input.
 */
export interface ClaudeContextInput {
  readonly snapshot: ProjectSnapshot;
  readonly roadmap: Roadmap;
  readonly session: SessionState;
  readonly artifacts: ArtifactIndex;
  /** Decisions to surface as "Open Decisions" (unresolved) in the context. */
  readonly openDecisions: readonly DecisionRecord[];
  /** Human-readable recent changes, newest first. */
  readonly recentChanges: readonly string[];
  /** ISO timestamp the context was generated, for freshness checks. */
  readonly generatedAt: string;
}

/** The generated context file, ready to write, with its token cost. */
export interface GeneratedContext {
  readonly path: string;
  readonly content: string;
  readonly tokenEstimate: number;
}
