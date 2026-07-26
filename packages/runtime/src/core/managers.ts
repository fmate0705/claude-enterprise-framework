import type { Result } from '@cef/core';
import type { RuntimeError } from '../errors/index.js';
import type { EnginePlugin, PluginProvider } from '../interfaces/index.js';
import type { Capability } from '../models/index.js';
import { DependencyResolver, type ResolvedEngines } from '../resolvers/index.js';

const unionSorted = (...lists: readonly (readonly string[])[]): string[] =>
  [...new Set(lists.flat())].sort();

/** Loads and resolves engine-plugins through the injected provider (registry-based, no switch). */
export class PluginManager {
  private readonly resolver: DependencyResolver;

  constructor(private readonly provider: PluginProvider) {
    this.resolver = new DependencyResolver(provider);
  }

  resolve(requested: readonly string[]): Result<ResolvedEngines, RuntimeError> {
    return this.resolver.resolve(requested);
  }

  available(): readonly string[] {
    return [...this.provider.ids()].sort();
  }
}

/** Resolves the Claude skills required by the manifest and the active engines. */
export class SkillManager {
  resolve(manifestSkills: readonly string[], plugins: readonly EnginePlugin[]): string[] {
    return unionSorted(manifestSkills, ...plugins.map((plugin) => plugin.provides.skills));
  }
}

/** Resolves the MCP integrations required by the manifest and the active engines. */
export class MCPManager {
  resolve(manifestMcp: readonly string[], plugins: readonly EnginePlugin[]): string[] {
    return unionSorted(manifestMcp, ...plugins.map((plugin) => plugin.provides.mcp));
  }
}

/** Aggregates the active engines, skills, and MCP integrations into one capability list. */
export class CapabilityManager {
  build(
    engines: readonly string[],
    skills: readonly string[],
    mcp: readonly string[],
  ): Capability[] {
    return [
      ...engines.map((id): Capability => ({ kind: 'engine', id, source: 'runtime' })),
      ...skills.map((id): Capability => ({ kind: 'skill', id, source: 'resolved' })),
      ...mcp.map((id): Capability => ({ kind: 'mcp', id, source: 'resolved' })),
    ];
  }
}
