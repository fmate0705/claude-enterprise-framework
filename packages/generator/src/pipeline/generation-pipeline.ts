import { DesignEngine } from '@cef/design-system';
import type { Blueprint } from '@cef/intelligence';
import type {
  GenerationContext,
  GenerationOptions,
  GenerationSession,
  StageResult,
} from '../models/index.js';
import { PipelineRunner } from './pipeline-runner.js';
import { SilentLogger, type PipelineLogger } from './pipeline-logger.js';
import { StageRegistry } from './stage-registry.js';

export interface PipelineOptions {
  readonly registry?: StageRegistry;
  readonly logger?: PipelineLogger;
  readonly design?: DesignEngine;
}

/**
 * The generation pipeline facade — the single entry the CLI depends on. It resolves the design
 * tokens and theme for a blueprint, assembles the {@link GenerationContext}, and runs the stages.
 * It composes the runner and registry; the actual generation lives in the stages and builders,
 * keeping this a thin, deterministic coordinator (`ARCHITECTURE.md`, Phase 8).
 */
export class GenerationPipeline {
  private readonly registry: StageRegistry;
  private readonly runner: PipelineRunner;
  private readonly design: DesignEngine;

  constructor(options: PipelineOptions = {}) {
    this.registry = options.registry ?? new StageRegistry();
    this.runner = new PipelineRunner(this.registry, options.logger ?? new SilentLogger());
    this.design = options.design ?? new DesignEngine();
  }

  /** Builds a fresh generation context for a blueprint, resolving tokens and theme. */
  createContext(blueprint: Blueprint, options: GenerationOptions): GenerationContext {
    const theme = this.design.themes.get(options.themeId) ?? this.design.themes.baseTheme();
    return {
      blueprint,
      tokens: this.design.resolveTokens(options.presetId),
      theme,
      options,
      files: new Map<string, string>(),
      artifacts: [],
      results: [],
    };
  }

  /** Runs the full pipeline for a blueprint and returns the session. */
  generate(blueprint: Blueprint, options: GenerationOptions): GenerationSession {
    return this.runner.runAll(this.createContext(blueprint, options));
  }

  /** Runs the full pipeline against a prepared context (for reuse across partial runs). */
  run(context: GenerationContext): GenerationSession {
    return this.runner.runAll(context);
  }

  /** Runs a single stage against a prepared context, for individual reruns. */
  runStage(id: string, context: GenerationContext): StageResult | undefined {
    return this.runner.runStage(id, context);
  }

  stageIds(): readonly string[] {
    return this.registry.ids();
  }
}
