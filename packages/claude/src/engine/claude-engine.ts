import type { Clock, FileSystem } from '@cef/core';
import { ClaudeCompressionEngine } from '../compression/index.js';
import { ClaudeContextGenerator } from '../context/index.js';
import { ClaudeMemoryManager } from '../memory/index.js';
import { ClaudeRoadmapGenerator, RoadmapRenderer } from '../roadmap/index.js';
import { ClaudePromptBuilder } from '../planner/index.js';
import { ClaudeSummaryGenerator, ClaudeStatusReporter } from '../summaries/index.js';
import { ClaudeSessionManager } from '../session/index.js';
import { ClaudeArtifactManager } from '../artifacts/index.js';
import { ClaudeSyncEngine } from '../sync/index.js';
import { ClaudeContextValidator } from '../validation/index.js';
import type { ClaudeValidationInput } from '../validation/index.js';
import type { SyncInput, SyncPlan, SyncResult } from '../sync/index.js';
import type { ClaudeEngineOptions, ClaudeIntegration } from '../interfaces/index.js';
import type {
  BuiltPrompt,
  ClaudeContextInput,
  GeneratedContext,
  MemoryDocument,
  ProjectSnapshot,
  ProjectStatus,
  PromptRequest,
  Roadmap,
  RoadmapProgress,
  SessionState,
} from '../models/index.js';
import type { ValidationReport } from '../types/index.js';

const DEFAULT_FRAMEWORK_VERSION = '2.0';

/**
 * The Claude Integration Engine facade. It wires the specialized generators and managers once and
 * exposes them behind {@link ClaudeIntegration}. It holds no generation logic itself — every
 * method delegates — which keeps each concern single-responsibility and independently testable
 * while giving the CLI one cohesive entry point.
 */
export class ClaudeEngine implements ClaudeIntegration {
  readonly sessions: ClaudeSessionManager;
  readonly artifacts: ClaudeArtifactManager;

  private readonly context: ClaudeContextGenerator;
  private readonly memory: ClaudeMemoryManager;
  private readonly roadmapGenerator: ClaudeRoadmapGenerator;
  private readonly roadmapRenderer: RoadmapRenderer;
  private readonly prompts: ClaudePromptBuilder;
  private readonly summaries: ClaudeSummaryGenerator;
  private readonly status: ClaudeStatusReporter;
  private readonly sync: ClaudeSyncEngine;
  private readonly validator: ClaudeContextValidator;

  constructor(clock?: Clock, options: ClaudeEngineOptions = {}) {
    const compression = new ClaudeCompressionEngine();
    this.context = new ClaudeContextGenerator(compression);
    this.memory = new ClaudeMemoryManager(compression);
    this.roadmapGenerator = new ClaudeRoadmapGenerator();
    this.roadmapRenderer = new RoadmapRenderer();
    this.prompts = new ClaudePromptBuilder();
    this.summaries = new ClaudeSummaryGenerator(compression);
    this.status = new ClaudeStatusReporter(options.frameworkVersion ?? DEFAULT_FRAMEWORK_VERSION);
    this.sessions = clock ? new ClaudeSessionManager(clock) : new ClaudeSessionManager();
    this.artifacts = new ClaudeArtifactManager();
    this.sync = new ClaudeSyncEngine(
      this.context,
      this.memory,
      this.roadmapGenerator,
      this.roadmapRenderer,
      this.sessions,
    );
    this.validator = new ClaudeContextValidator();
  }

  buildContext(input: ClaudeContextInput): GeneratedContext {
    return this.context.generate(input);
  }

  buildRoadmap(snapshot: ProjectSnapshot, progress?: RoadmapProgress): Roadmap {
    return progress
      ? this.roadmapGenerator.generate(snapshot, progress)
      : this.roadmapGenerator.generate(snapshot);
  }

  renderRoadmap(roadmap: Roadmap): GeneratedContext {
    return this.roadmapRenderer.render(roadmap);
  }

  buildMemory(input: {
    snapshot: ProjectSnapshot;
    roadmap: Roadmap;
    session: SessionState;
  }): readonly MemoryDocument[] {
    return this.memory.render(input);
  }

  buildSummary(input: ClaudeContextInput): string {
    return this.summaries.generate(input);
  }

  buildStatus(input: ClaudeContextInput): ProjectStatus {
    return this.status.report(input);
  }

  renderStatus(status: ProjectStatus): string {
    return this.status.render(status);
  }

  buildPrompt(request: PromptRequest): BuiltPrompt {
    return this.prompts.build(request);
  }

  validate(input: ClaudeValidationInput): ValidationReport {
    return this.validator.validate(input);
  }

  planSync(input: SyncInput): SyncPlan {
    return this.sync.plan(input);
  }

  applySync(fs: FileSystem, root: string, plan: SyncPlan): Promise<SyncResult> {
    return this.sync.apply(fs, root, plan);
  }
}
