/** Shared value types for the Generation Pipeline. */

export type StageStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export type Severity = 'error' | 'warning';

/** The kinds of artifact the registry tracks. */
export type ArtifactKind =
  | 'config'
  | 'route'
  | 'page'
  | 'layout'
  | 'component'
  | 'content'
  | 'seo'
  | 'metadata'
  | 'schema'
  | 'asset'
  | 'image'
  | 'api'
  | 'docker'
  | 'legal'
  | 'report'
  | 'other';

/** A tracked output of the pipeline, tied to the stage that produced it. */
export interface Artifact {
  readonly id: string;
  readonly kind: ArtifactKind;
  readonly path: string;
  readonly stage: string;
}

/** A finding raised by a stage (validation, review, repair). */
export interface StageIssue {
  readonly severity: Severity;
  readonly message: string;
  /** The file the issue concerns, when applicable. */
  readonly file: string | undefined;
}

export function issue(severity: Severity, message: string, file?: string): StageIssue {
  return { severity, message, file: file ?? undefined };
}
