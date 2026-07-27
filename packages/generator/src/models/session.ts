import type { GeneratedFile } from '@cef/core';
import type { Artifact, ArtifactKind, StageIssue, StageStatus } from './types.js';

/** The result a single stage returns: its status, the files and artifacts it produced, and issues. */
export interface StageResult {
  readonly stageId: string;
  readonly stageName: string;
  readonly status: StageStatus;
  readonly files: readonly GeneratedFile[];
  readonly artifacts: readonly Artifact[];
  readonly issues: readonly StageIssue[];
  readonly summary: string;
}

/** The recorded state of one stage within a run. */
export interface StageState {
  readonly stageId: string;
  readonly stageName: string;
  readonly status: StageStatus;
  readonly summary: string;
  readonly fileCount: number;
  readonly issueCount: number;
}

/** The final report: what was generated, tracked by stage and artifact kind. */
export interface GenerationReport {
  readonly projectName: string;
  readonly generatedAt: string;
  readonly ok: boolean;
  readonly totalFiles: number;
  readonly totalArtifacts: number;
  readonly stages: readonly StageState[];
  readonly artifactsByKind: Readonly<Record<string, number>>;
  readonly issues: readonly StageIssue[];
}

/** The outcome of a pipeline run: per-stage state, all files and artifacts, and the report. */
export interface GenerationSession {
  readonly states: readonly StageState[];
  readonly results: readonly StageResult[];
  readonly files: readonly GeneratedFile[];
  readonly artifacts: readonly Artifact[];
  readonly report: GenerationReport;
}

export type { ArtifactKind };
