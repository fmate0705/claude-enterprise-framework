/**
 * The {@link ProjectSnapshot} is the single immutable input from which the Claude Integration
 * Engine derives context, memory, roadmap, summary, and status. Adapters (the CLI) map the
 * Runtime's execution session and the Framework Loader's resolved knowledge into this shape;
 * the engine itself never reads the manifest, the filesystem, or the framework directly. This
 * keeps the engine a pure, deterministic function of its input.
 */

/** An active capability module, summarized for context (details load on demand). */
export interface CapabilityRef {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly summary: string;
  /** Rough token cost of this capability's eager summary. */
  readonly tokenEstimate: number;
}

/** A pointer to a detailed specification, loaded only when a task needs it. */
export interface StandardRef {
  readonly id: string;
  readonly name: string;
  /** Location of the detailed spec, relative to the framework modules dir, if any. */
  readonly specPath: string | undefined;
}

/** A prompt fragment contributed by an active capability. */
export interface PromptFragmentRef {
  readonly id: string;
  readonly name: string;
  readonly prompt: string;
}

/** A directory in the generated project and what it holds. */
export interface DirectoryEntry {
  readonly path: string;
  readonly purpose: string;
}

/** The resolved technology stack. */
export interface TechnologyStack {
  readonly framework: string;
  readonly frameworkVersion: number;
  readonly language: string;
  readonly packageManager: string;
  readonly buildSystem: string | undefined;
  readonly deployment: string | undefined;
  readonly database: string | undefined;
}

/** An immutable description of the project at a point in time. */
export interface ProjectSnapshot {
  readonly name: string;
  readonly type: string;
  readonly description: string | undefined;
  readonly cefVersion: string;
  readonly stack: TechnologyStack;
  /** Engines in deterministic execution order. */
  readonly engines: readonly string[];
  /** Engines the Runtime auto-added to satisfy floors/dependencies. */
  readonly addedEngines: readonly string[];
  readonly capabilities: readonly CapabilityRef[];
  readonly skills: readonly string[];
  readonly mcp: readonly string[];
  readonly standards: readonly StandardRef[];
  readonly prompts: readonly PromptFragmentRef[];
  readonly directories: readonly DirectoryEntry[];
  /** Non-negotiable constraints (floors) the project must always satisfy. */
  readonly constraints: readonly string[];
  /** Total eager token cost of the active capability knowledge. */
  readonly capabilityTokenEstimate: number;
}
