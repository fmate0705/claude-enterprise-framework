import type { GenerationContext } from '../models/context.js';
import type { StageResult } from '../models/session.js';

/**
 * A pipeline stage: one independent, deterministic step that reads the {@link GenerationContext}
 * and returns a {@link StageResult}. Stages never mutate the context directly and never depend on
 * a later stage, so any stage can be rerun on its own and will reproduce its outputs
 * (`ARCHITECTURE.md`, Phase 8 — Pipeline Pattern).
 */
export interface PipelineStage {
  readonly id: string;
  readonly name: string;
  run(context: GenerationContext): StageResult;
}

/**
 * A builder produces a set of files for one concern (architecture, layout, components, …). Stages
 * delegate to builders; this is the Builder Pattern boundary that keeps generation logic out of
 * the pipeline mechanics.
 */
export interface Builder<T> {
  build(context: GenerationContext): T;
}
