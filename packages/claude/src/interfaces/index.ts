import type { FileSystem, GeneratedFile } from '@cef/core';
import type { BuiltPrompt } from '../models/prompt.js';
import type { ClaudeContextInput, GeneratedContext } from '../models/context.js';
import type { MemoryDocument } from '../models/memory.js';
import type { ProjectStatus } from '../models/status.js';
import type { ProjectSnapshot } from '../models/snapshot.js';
import type { Roadmap, RoadmapProgress } from '../models/roadmap.js';
import type { PromptRequest } from '../models/prompt.js';
import type { ValidationReport } from '../types/index.js';
import type { ClaudeValidationInput } from '../validation/context-validator.js';
import type { SyncInput, SyncPlan, SyncResult } from '../sync/sync-engine.js';
import type { ClaudeSessionManager } from '../session/session-manager.js';
import type { ClaudeArtifactManager } from '../artifacts/artifact-manager.js';

/** Construction options for the {@link ClaudeIntegration} facade. */
export interface ClaudeEngineOptions {
  /** Version label shown in status output (e.g. "2.0"). */
  readonly frameworkVersion?: string;
}

/**
 * The Claude Integration Engine's public contract — the single surface the CLI depends on.
 * Implementations compose the specialized generators and managers; every method is a pure
 * projection of its input except the two that touch the injected filesystem.
 */
export interface ClaudeIntegration {
  buildContext(input: ClaudeContextInput): GeneratedContext;
  buildRoadmap(snapshot: ProjectSnapshot, progress?: RoadmapProgress): Roadmap;
  renderRoadmap(roadmap: Roadmap): GeneratedContext;
  buildMemory(input: {
    snapshot: ProjectSnapshot;
    roadmap: Roadmap;
    session: ClaudeContextInput['session'];
  }): readonly MemoryDocument[];
  buildSummary(input: ClaudeContextInput): string;
  buildStatus(input: ClaudeContextInput): ProjectStatus;
  renderStatus(status: ProjectStatus): string;
  buildPrompt(request: PromptRequest): BuiltPrompt;
  validate(input: ClaudeValidationInput): ValidationReport;
  planSync(input: SyncInput): SyncPlan;
  applySync(fs: FileSystem, root: string, plan: SyncPlan): Promise<SyncResult>;
  readonly sessions: ClaudeSessionManager;
  readonly artifacts: ClaudeArtifactManager;
}

export type { GeneratedFile };
