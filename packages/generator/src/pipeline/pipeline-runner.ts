import type { GeneratedFile } from '@cef/core';
import { ExportReporter } from '../export/index.js';
import type {
  Artifact,
  GenerationContext,
  GenerationSession,
  StageResult,
  StageState,
} from '../models/index.js';
import { ArtifactRegistry } from './artifact-registry.js';
import { SilentLogger, type PipelineLogger } from './pipeline-logger.js';
import { StageRegistry } from './stage-registry.js';

/**
 * Runs the pipeline. It executes stages in order, merging each result back into the context so the
 * next stage sees the accumulated files — and it can rerun a single stage in isolation against the
 * current context. State is tracked per stage; results are deterministic given the same context.
 */
export class PipelineRunner {
  private readonly reporter = new ExportReporter();

  constructor(
    private readonly registry: StageRegistry = new StageRegistry(),
    private readonly logger: PipelineLogger = new SilentLogger(),
  ) {}

  /** Runs every stage in order and returns the session. */
  runAll(context: GenerationContext): GenerationSession {
    for (const stage of this.registry.all()) {
      this.logger.stageStart(stage.id, stage.name);
      const stageResult = stage.run(context);
      this.apply(context, stageResult);
      this.logger.stageDone(stage.id, stageResult.status, stageResult.summary);
    }
    return this.session(context);
  }

  /** Runs one stage by id against the current context, for individual reruns. */
  runStage(id: string, context: GenerationContext): StageResult | undefined {
    const stage = this.registry.get(id);
    if (!stage) {
      return undefined;
    }
    this.logger.stageStart(stage.id, stage.name);
    const stageResult = stage.run(context);
    this.apply(context, stageResult);
    this.logger.stageDone(stage.id, stageResult.status, stageResult.summary);
    return stageResult;
  }

  private apply(context: GenerationContext, stageResult: StageResult): void {
    for (const file of stageResult.files) {
      context.files.set(file.path, file.content);
    }
    const registry = new ArtifactRegistry().addAll(context.artifacts).addAll(stageResult.artifacts);
    context.artifacts.splice(0, context.artifacts.length, ...registry.all());
    // Replace any prior result for this stage (supports reruns), preserving order.
    const existing = context.results.findIndex((r) => r.stageId === stageResult.stageId);
    if (existing >= 0) {
      context.results.splice(existing, 1, stageResult);
    } else {
      context.results.push(stageResult);
    }
  }

  private session(context: GenerationContext): GenerationSession {
    const states: StageState[] = context.results.map((stageResult) => ({
      stageId: stageResult.stageId,
      stageName: stageResult.stageName,
      status: stageResult.status,
      summary: stageResult.summary,
      fileCount: stageResult.files.length,
      issueCount: stageResult.issues.length,
    }));
    return {
      states,
      results: [...context.results],
      files: toFiles(context.files),
      artifacts: [...context.artifacts],
      report: this.reporter.buildReport(context),
    };
  }
}

function toFiles(files: ReadonlyMap<string, string>): readonly GeneratedFile[] {
  return [...files.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, content]) => ({ path, content }));
}

export type { Artifact };
