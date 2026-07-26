import type { FileSystem } from '@cef/core';
import { CatalogPluginProvider } from '../config/index.js';
import { EventBus } from '../events/index.js';
import { ExecutionPlanner } from '../graph/index.js';
import type { PluginProvider } from '../interfaces/index.js';
import { StructuredLogger } from '../logging/index.js';
import type { RuntimeLogger } from '../logging/index.js';
import {
  ConfigurationLoader,
  ContextLoader,
  ManifestLoader,
  ProjectLoader,
} from '../loaders/index.js';
import { LifecycleManager } from '../pipeline/lifecycle-manager.js';
import type { RuntimePipeline } from '../pipeline/pipeline.js';
import { RuntimeValidator } from '../validation/index.js';
import type { RuntimeContext } from './context.js';
import { CapabilityManager, MCPManager, PluginManager, SkillManager } from './managers.js';

export interface RuntimeBootstrapOptions {
  readonly projectRoot: string;
  readonly fs: FileSystem;
  readonly provider?: PluginProvider;
  readonly logger?: RuntimeLogger;
  readonly events?: EventBus;
}

export interface AssembledRuntime {
  readonly context: RuntimeContext;
  readonly pipeline: RuntimePipeline;
}

/**
 * The composition root of the Runtime: wires loaders, managers, planner, and validator into a
 * {@link LifecycleManager} and produces a fresh {@link RuntimeContext} and pipeline for a boot.
 * Every collaborator is injectable, so the whole runtime is testable with fakes.
 */
export class RuntimeBootstrap {
  assemble(options: RuntimeBootstrapOptions): AssembledRuntime {
    const { fs, projectRoot } = options;
    const provider = options.provider ?? new CatalogPluginProvider();
    const logger = options.logger ?? new StructuredLogger();
    const events = options.events ?? new EventBus();

    const lifecycle = new LifecycleManager({
      manifestLoader: new ManifestLoader(fs),
      projectLoader: new ProjectLoader(fs),
      configurationLoader: new ConfigurationLoader(fs),
      contextLoader: new ContextLoader(fs),
      pluginManager: new PluginManager(provider),
      skillManager: new SkillManager(),
      mcpManager: new MCPManager(),
      capabilityManager: new CapabilityManager(),
      planner: new ExecutionPlanner(),
      validator: new RuntimeValidator(),
    });

    const context: RuntimeContext = { projectRoot, fs, logger, events, provider };
    return { context, pipeline: lifecycle.createPipeline() };
  }
}
