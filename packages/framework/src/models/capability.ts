import type { ModuleDescriptor } from './module.js';

/** A prompt fragment contributed by an active module. */
export interface PromptFragment {
  readonly id: string;
  readonly name: string;
  readonly prompt: string;
}

/** A reference to a module's detailed specification, loaded lazily. */
export interface StandardReference {
  readonly id: string;
  readonly name: string;
  readonly specFile: string | undefined;
}

/**
 * The minimum framework knowledge resolved for a project: the active capability modules in
 * load order, plus the derived skills, MCPs, and prompt fragments. This is the compact,
 * token-optimized result the Runtime asks the Framework Loader to produce.
 */
export interface ResolvedFramework {
  readonly modules: readonly ModuleDescriptor[];
  readonly order: readonly string[];
  readonly capabilities: readonly string[];
  readonly skills: readonly string[];
  readonly mcp: readonly string[];
  readonly prompts: readonly PromptFragment[];
  readonly standards: readonly StandardReference[];
  readonly requestedEngines: readonly string[];
  readonly coveredEngines: readonly string[];
  readonly uncoveredEngines: readonly string[];
  readonly totalTokenEstimate: number;
}
