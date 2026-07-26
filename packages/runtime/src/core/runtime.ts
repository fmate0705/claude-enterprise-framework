import { err, isErr, ok } from '@cef/core';
import type { FileSystem, Result } from '@cef/core';
import { RuntimeError, RuntimeInitializationFailedError } from '../errors/index.js';
import type { EventBus } from '../events/index.js';
import type { PluginProvider } from '../interfaces/index.js';
import type { RuntimeLogger } from '../logging/index.js';
import type { RuntimePipeline } from '../pipeline/pipeline.js';
import { RuntimeBootstrap } from './bootstrap.js';
import type { ExecutionSession, RuntimeContext } from './context.js';

export interface RuntimeOptions {
  readonly projectRoot: string;
  readonly fs: FileSystem;
  readonly provider?: PluginProvider;
  readonly logger?: RuntimeLogger;
  readonly events?: EventBus;
}

/**
 * The Runtime facade. Assembles the pipeline, runs the lifecycle deterministically, and returns
 * an immutable {@link ExecutionSession} on success. It orchestrates only — it never generates.
 */
export class Runtime {
  constructor(private readonly bootstrap: RuntimeBootstrap = new RuntimeBootstrap()) {}

  async boot(options: RuntimeOptions): Promise<Result<ExecutionSession, RuntimeError>> {
    const { context, pipeline } = this.bootstrap.assemble(options);
    const executed = await this.execute(context, pipeline);
    if (isErr(executed)) {
      return executed;
    }
    return this.buildSession(context);
  }

  private async execute(
    context: RuntimeContext,
    pipeline: RuntimePipeline,
  ): Promise<Result<void, RuntimeError>> {
    try {
      return await pipeline.execute(context);
    } catch (cause) {
      return err(new RuntimeInitializationFailedError('pipeline', cause));
    }
  }

  private buildSession(context: RuntimeContext): Result<ExecutionSession, RuntimeError> {
    if (
      !context.manifest ||
      !context.project ||
      !context.configuration ||
      !context.order ||
      !context.graph ||
      !context.capabilities
    ) {
      return err(new RuntimeInitializationFailedError('assemble-session'));
    }
    return ok({
      status: 'ready',
      projectRoot: context.projectRoot,
      manifest: context.manifest,
      project: context.project,
      configuration: context.configuration,
      context: context.projectContext,
      engines: context.order,
      addedEngines: context.addedEngines ?? [],
      skills: context.skills ?? [],
      mcp: context.mcp ?? [],
      capabilities: context.capabilities,
      graph: context.graph,
    });
  }
}
