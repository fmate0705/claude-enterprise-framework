import type { FileSystem } from '@cef/core';
import type { EventBus } from '../events/index.js';
import type { ExecutionGraph } from '../graph/index.js';
import type { EnginePlugin, PluginProvider } from '../interfaces/index.js';
import type { RuntimeLogger } from '../logging/index.js';
import type {
  Capability,
  Manifest,
  Project,
  ProjectContext,
  RuntimeConfiguration,
} from '../models/index.js';

/**
 * The working context threaded through the pipeline stages. It is created fresh for each boot
 * and never shared globally; stages populate its fields as the lifecycle advances. This is
 * local, per-boot state — not global mutable state.
 */
export interface RuntimeContext {
  readonly projectRoot: string;
  readonly fs: FileSystem;
  readonly logger: RuntimeLogger;
  readonly events: EventBus;
  readonly provider: PluginProvider;

  manifest?: Manifest;
  project?: Project;
  configuration?: RuntimeConfiguration;
  projectContext?: ProjectContext;
  plugins?: readonly EnginePlugin[];
  order?: readonly string[];
  addedEngines?: readonly string[];
  skills?: readonly string[];
  mcp?: readonly string[];
  graph?: ExecutionGraph;
  capabilities?: readonly Capability[];
}

/**
 * The immutable result of a successful boot — the "Ready" state. This is what `Runtime.boot`
 * returns and what the inspection commands read.
 */
export interface ExecutionSession {
  readonly status: 'ready';
  readonly projectRoot: string;
  readonly manifest: Manifest;
  readonly project: Project;
  readonly configuration: RuntimeConfiguration;
  readonly context: ProjectContext | undefined;
  /** Engines in deterministic execution order. */
  readonly engines: readonly string[];
  readonly addedEngines: readonly string[];
  readonly skills: readonly string[];
  readonly mcp: readonly string[];
  readonly capabilities: readonly Capability[];
  readonly graph: ExecutionGraph;
}
