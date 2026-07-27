import type { GeneratedFile } from '@cef/core';
import type {
  Artifact,
  ArtifactKind,
  StageIssue,
  StageResult,
  StageStatus,
} from '../models/index.js';
import type { PipelineStage } from '../interfaces/index.js';

/** Builds an artifact record keyed by its path. */
export function artifact(kind: ArtifactKind, path: string, stage: string): Artifact {
  return { id: path, kind, path, stage };
}

/** Constructs a stage result, marking it failed when any error issue is present. */
export function result(
  stage: PipelineStage,
  parts: {
    files?: readonly GeneratedFile[];
    artifacts?: readonly Artifact[];
    issues?: readonly StageIssue[];
    summary: string;
    status?: StageStatus;
  },
): StageResult {
  const issues = parts.issues ?? [];
  const status: StageStatus =
    parts.status ?? (issues.some((i) => i.severity === 'error') ? 'failed' : 'completed');
  return {
    stageId: stage.id,
    stageName: stage.name,
    status,
    files: parts.files ?? [],
    artifacts: parts.artifacts ?? [],
    issues,
    summary: parts.summary,
  };
}
