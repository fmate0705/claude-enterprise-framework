import { err, ok } from '@cef/core';
import type { Result } from '@cef/core';
import { PluginNotFoundError, RuntimeError } from '../errors/index.js';
import type { EnginePlugin, PluginProvider } from '../interfaces/index.js';

export interface ResolvedEngines {
  /** The transitive closure of requested engines, their dependencies, and the floors. */
  readonly plugins: readonly EnginePlugin[];
  readonly requested: readonly string[];
  /** Engines pulled in automatically (dependencies and floors not explicitly requested). */
  readonly added: readonly string[];
}

/**
 * Resolves the full set of engine-plugins a project needs: the requested engines, their
 * transitive dependencies, and the mandatory floors. Ordering and cycle detection are the
 * planner's job; this resolver computes the closure and fails fast on an unknown engine.
 */
export class DependencyResolver {
  constructor(private readonly provider: PluginProvider) {}

  resolve(requested: readonly string[]): Result<ResolvedEngines, RuntimeError> {
    const resolved = new Map<string, EnginePlugin>();
    const requestedSet = new Set(requested);
    const floors = this.provider.ids().filter((id) => this.provider.get(id)?.floor === true);
    const roots = [...new Set([...requested, ...floors])];

    const visit = (id: string, requiredBy?: string): RuntimeError | null => {
      if (resolved.has(id)) {
        return null;
      }
      const plugin = this.provider.get(id);
      if (!plugin) {
        return new PluginNotFoundError(id, requiredBy);
      }
      resolved.set(id, plugin);
      for (const dependency of plugin.dependsOn) {
        const error = visit(dependency, id);
        if (error) {
          return error;
        }
      }
      return null;
    };

    for (const id of roots) {
      const error = visit(id);
      if (error) {
        return err(error);
      }
    }

    const plugins = [...resolved.values()];
    const added = plugins
      .map((plugin) => plugin.id)
      .filter((id) => !requestedSet.has(id))
      .sort();
    return ok({ plugins, requested, added });
  }
}
