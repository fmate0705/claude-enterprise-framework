import { cefError, err, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import type { FrameworkCatalog } from '../catalog/index.js';
import type { ModuleDescriptor } from '../models/index.js';

export interface ResolvedModules {
  readonly modules: readonly ModuleDescriptor[];
  readonly order: readonly string[];
  readonly coveredEngines: readonly string[];
  readonly uncoveredEngines: readonly string[];
}

/**
 * Resolves the capability modules a set of engines needs: map each engine to its module, take
 * the transitive `dependsOn` closure, and order deterministically (dependencies first, higher
 * priority earlier among ready nodes). Detects circular references.
 */
export class CapabilityResolver {
  constructor(private readonly catalog: FrameworkCatalog) {}

  resolveForEngines(engineIds: readonly string[]): Result<ResolvedModules, CefError> {
    const selected = new Map<string, ModuleDescriptor>();
    const covered = new Set<string>();
    const uncovered = new Set<string>();
    const roots: string[] = [];

    for (const engine of engineIds) {
      const module = this.catalog.moduleForEngine(engine);
      if (module) {
        covered.add(engine);
        roots.push(module.metadata.id);
      } else {
        uncovered.add(engine);
      }
    }

    for (const id of roots) {
      const error = this.collect(id, selected);
      if (error) {
        return err(error);
      }
    }

    const ordered = this.order([...selected.values()]);
    if (!ordered.ok) {
      return ordered;
    }

    const modules = ordered.value
      .map((id) => selected.get(id))
      .filter((module): module is ModuleDescriptor => module !== undefined);

    return ok({
      modules,
      order: ordered.value,
      coveredEngines: [...covered].sort(),
      uncoveredEngines: [...uncovered].sort(),
    });
  }

  private collect(id: string, selected: Map<string, ModuleDescriptor>): CefError | null {
    if (selected.has(id)) {
      return null;
    }
    const module = this.catalog.get(id);
    if (!module) {
      return cefError('BROKEN_REFERENCE', `Module "${id}" is referenced but not registered.`, {
        hint: 'Register the module, or remove the dependency that requires it.',
      });
    }
    selected.set(id, module);
    for (const dependency of module.metadata.dependsOn) {
      const error = this.collect(dependency, selected);
      if (error) {
        return error;
      }
    }
    return null;
  }

  private order(modules: readonly ModuleDescriptor[]): Result<readonly string[], CefError> {
    const present = new Set(modules.map((module) => module.metadata.id));
    const indegree = new Map<string, number>();
    const dependents = new Map<string, string[]>();
    const priority = new Map<string, number>();

    for (const module of modules) {
      indegree.set(module.metadata.id, 0);
      dependents.set(module.metadata.id, []);
      priority.set(module.metadata.id, module.metadata.priority);
    }
    for (const module of modules) {
      for (const dependency of module.metadata.dependsOn) {
        if (present.has(dependency)) {
          indegree.set(module.metadata.id, (indegree.get(module.metadata.id) ?? 0) + 1);
          dependents.get(dependency)?.push(module.metadata.id);
        }
      }
    }

    const sortReady = (ready: string[]): void => {
      ready.sort((a, b) => (priority.get(b) ?? 0) - (priority.get(a) ?? 0) || a.localeCompare(b));
    };

    const ready = [...present].filter((id) => (indegree.get(id) ?? 0) === 0);
    sortReady(ready);
    const order: string[] = [];

    while (ready.length > 0) {
      const id = ready.shift();
      if (id === undefined) {
        break;
      }
      order.push(id);
      for (const dependent of dependents.get(id) ?? []) {
        const next = (indegree.get(dependent) ?? 0) - 1;
        indegree.set(dependent, next);
        if (next === 0) {
          ready.push(dependent);
          sortReady(ready);
        }
      }
    }

    if (order.length !== present.size) {
      return err(
        cefError('CIRCULAR_REFERENCE', 'Circular dependency detected among framework modules.', {
          hint: "Break the cycle in the affected modules' dependsOn.",
        }),
      );
    }
    return ok(order);
  }
}
