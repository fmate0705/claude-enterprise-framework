import { ok } from '@cef/core';
import type { Result } from '@cef/core';
import type { RuntimeContext } from '../core/context.js';
import type { RuntimeError } from '../errors/index.js';

/** One explicit step of the runtime lifecycle. */
export interface PipelineStage {
  readonly name: string;
  run(context: RuntimeContext): Promise<Result<void, RuntimeError>>;
}

/**
 * Runs an ordered list of {@link PipelineStage}s, stopping at the first failure. The order is
 * defined once, by whoever constructs the pipeline — never hardcoded across the codebase.
 */
export class RuntimePipeline {
  constructor(private readonly stages: readonly PipelineStage[]) {}

  stageNames(): readonly string[] {
    return this.stages.map((stage) => stage.name);
  }

  async execute(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    for (const stage of this.stages) {
      context.logger.trace(`Running stage.`, { stage: stage.name });
      const result = await stage.run(context);
      if (!result.ok) {
        context.logger.error(`Stage failed: ${result.error.message}`, {
          stage: stage.name,
          code: result.error.code,
        });
        return result;
      }
    }
    return ok(undefined);
  }
}
