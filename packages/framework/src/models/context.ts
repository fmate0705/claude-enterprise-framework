/** Inputs for generating the optimized project context (from the manifest / runtime). */
export interface ProjectContextInput {
  readonly projectName: string;
  readonly projectType: string;
  readonly framework: string;
  readonly frameworkVersion: number;
  /** Engines in execution order (from the manifest or a runtime boot). */
  readonly engines: readonly string[];
  readonly skills: readonly string[];
  readonly mcp: readonly string[];
  readonly outstandingTasks?: readonly string[];
}

/** The generated, token-optimized project context package. */
export interface GeneratedContext {
  /** The markdown content of `.cef/generated/context.md`. */
  readonly content: string;
  /** The path, relative to the project root, where it should be written. */
  readonly path: string;
  /** A rough token estimate of the generated context. */
  readonly tokenEstimate: number;
}

export const GENERATED_CONTEXT_PATH = '.cef/generated/context.md';
