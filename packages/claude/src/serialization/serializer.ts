import {
  EMPTY_ARTIFACT_INDEX,
  EMPTY_HISTORY,
  type ArtifactIndex,
  type ProjectSnapshot,
  type Roadmap,
  type SessionHistory,
  type SessionState,
} from '../models/index.js';

/**
 * The `active-context.json` payload: a compact, machine-readable snapshot of what a session is
 * working on right now. It duplicates nothing — every field is projected from existing state —
 * and exists so tooling can resume without parsing markdown.
 */
export interface ActiveContext {
  readonly project: string;
  readonly type: string;
  readonly framework: string;
  readonly currentMilestone: string | undefined;
  readonly completionPercent: number;
  readonly nextAction: string | undefined;
  readonly updatedAt: string;
}

/**
 * Serializes and parses the JSON artifacts (`history.json`, `active-context.json`, the artifact
 * index). Parsing is defensive: malformed or absent JSON yields a well-defined empty value rather
 * than throwing, so a corrupt optional file never breaks a command.
 */
export class ClaudeSerializer {
  serializeHistory(history: SessionHistory): string {
    return this.json(history);
  }

  parseHistory(raw: string): SessionHistory {
    const value = this.tryParse(raw);
    if (value && Array.isArray((value as { sessions?: unknown }).sessions)) {
      return value as SessionHistory;
    }
    return EMPTY_HISTORY;
  }

  serializeArtifacts(index: ArtifactIndex): string {
    return this.json(index);
  }

  parseArtifacts(raw: string): ArtifactIndex {
    const value = this.tryParse(raw);
    if (value && Array.isArray((value as { artifacts?: unknown }).artifacts)) {
      return value as ArtifactIndex;
    }
    return EMPTY_ARTIFACT_INDEX;
  }

  serializeActiveContext(
    snapshot: ProjectSnapshot,
    roadmap: Roadmap,
    session: SessionState,
  ): string {
    const active: ActiveContext = {
      project: snapshot.name,
      type: snapshot.type,
      framework: snapshot.stack.framework,
      currentMilestone: session.currentMilestone,
      completionPercent: roadmap.completionPercent,
      nextAction: roadmap.nextAction,
      updatedAt: session.updatedAt,
    };
    return this.json(active);
  }

  private json(value: unknown): string {
    return `${JSON.stringify(value, null, 2)}\n`;
  }

  private tryParse(raw: string): unknown {
    try {
      return JSON.parse(raw);
    } catch {
      return undefined;
    }
  }
}
