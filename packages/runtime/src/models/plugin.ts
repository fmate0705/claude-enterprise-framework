/** Skills and MCP integrations an engine contributes when active. */
export interface EngineProvides {
  readonly skills: readonly string[];
  readonly mcp: readonly string[];
}

/**
 * A data-driven definition of an engine-plugin: its dependencies, whether it is a floor, and
 * what it provides. The catalog of these is the source of dependency truth the Runtime
 * resolves against; the Runtime never switches on engine ids (`ARCHITECTURE.md` §8).
 */
export interface EngineDefinition {
  readonly id: string;
  readonly description: string;
  readonly floor: boolean;
  readonly tier: number;
  readonly dependsOn: readonly string[];
  readonly provides: EngineProvides;
}

export type CapabilityKind = 'engine' | 'skill' | 'mcp';

/** An active capability in a booted runtime, with the source that requested it. */
export interface Capability {
  readonly kind: CapabilityKind;
  readonly id: string;
  readonly source: string;
}
