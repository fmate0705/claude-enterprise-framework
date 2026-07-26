import type {
  CapabilityManager,
  MCPManager,
  PluginManager,
  SkillManager,
} from '../core/managers.js';
import type { ExecutionPlanner } from '../graph/index.js';
import type { Loader } from '../interfaces/index.js';
import type { Manifest, Project, ProjectContext, RuntimeConfiguration } from '../models/index.js';
import type { RuntimeValidator } from '../validation/index.js';
import { RuntimePipeline } from './pipeline.js';
import {
  BootStage,
  BuildExecutionGraphStage,
  InitializePluginsStage,
  LoadConfigurationStage,
  LoadContextStage,
  LoadManifestStage,
  LoadProjectStage,
  ReadyStage,
  ResolveDependenciesStage,
  ResolveEnginesStage,
  ResolveMcpsStage,
  ResolveSkillsStage,
  ValidateStage,
} from './stages.js';

export interface LifecycleDependencies {
  readonly manifestLoader: Loader<Manifest>;
  readonly projectLoader: Loader<Project>;
  readonly configurationLoader: Loader<RuntimeConfiguration>;
  readonly contextLoader: Loader<ProjectContext | undefined>;
  readonly pluginManager: PluginManager;
  readonly skillManager: SkillManager;
  readonly mcpManager: MCPManager;
  readonly capabilityManager: CapabilityManager;
  readonly planner: ExecutionPlanner;
  readonly validator: RuntimeValidator;
}

/**
 * Owns the runtime lifecycle. The stage order is declared here, once, so it is never hardcoded
 * across the codebase (`ARCHITECTURE.md` §9). Reordering the lifecycle is a one-line change.
 */
export class LifecycleManager {
  constructor(private readonly deps: LifecycleDependencies) {}

  createPipeline(): RuntimePipeline {
    const d = this.deps;
    return new RuntimePipeline([
      new BootStage(),
      new LoadConfigurationStage(d.configurationLoader),
      new LoadManifestStage(d.manifestLoader),
      new LoadProjectStage(d.projectLoader),
      new LoadContextStage(d.contextLoader),
      new ResolveEnginesStage(d.pluginManager),
      new ResolveDependenciesStage(),
      new ResolveSkillsStage(d.skillManager),
      new ResolveMcpsStage(d.mcpManager),
      new BuildExecutionGraphStage(d.planner, d.capabilityManager),
      new ValidateStage(d.validator),
      new InitializePluginsStage(),
      new ReadyStage(),
    ]);
  }
}
