import { err, ok } from '@cef/core';
import type { Result } from '@cef/core';
import { DependencyCycleDetectedError, RuntimeError } from '../errors/index.js';

/**
 * A directed acyclic graph of engine execution. Nodes are engines; an edge `dependency → node`
 * means the dependency runs first. The graph is inspectable and produces a deterministic
 * topological order (`ARCHITECTURE.md` §16).
 */
export class ExecutionGraph {
  private readonly nodes = new Set<string>();
  private readonly dependents = new Map<string, Set<string>>();
  private readonly dependencies = new Map<string, Set<string>>();

  addNode(id: string): void {
    this.nodes.add(id);
    this.ensure(this.dependents, id);
    this.ensure(this.dependencies, id);
  }

  /** Records that `node` depends on `dependency` (dependency executes first). */
  addDependency(node: string, dependency: string): void {
    this.addNode(node);
    this.addNode(dependency);
    this.ensure(this.dependents, dependency).add(node);
    this.ensure(this.dependencies, node).add(dependency);
  }

  nodeIds(): readonly string[] {
    return [...this.nodes].sort();
  }

  dependenciesOf(id: string): readonly string[] {
    return [...(this.dependencies.get(id) ?? [])].sort();
  }

  nodeCount(): number {
    return this.nodes.size;
  }

  edgeCount(): number {
    let count = 0;
    for (const set of this.dependencies.values()) {
      count += set.size;
    }
    return count;
  }

  /** Kahn's algorithm — a deterministic topological order, or a cycle error. */
  topologicalOrder(): Result<readonly string[], RuntimeError> {
    const indegree = new Map<string, number>();
    for (const id of this.nodes) {
      indegree.set(id, this.dependencies.get(id)?.size ?? 0);
    }
    const ready = [...this.nodes].filter((id) => (indegree.get(id) ?? 0) === 0).sort();
    const order: string[] = [];

    while (ready.length > 0) {
      const id = ready.shift();
      if (id === undefined) {
        break;
      }
      order.push(id);
      for (const dependent of [...(this.dependents.get(id) ?? [])].sort()) {
        const next = (indegree.get(dependent) ?? 0) - 1;
        indegree.set(dependent, next);
        if (next === 0) {
          ready.push(dependent);
          ready.sort();
        }
      }
    }

    if (order.length !== this.nodes.size) {
      return err(new DependencyCycleDetectedError(this.findCycle()));
    }
    return ok(order);
  }

  /** A human-readable rendering of the graph for `cef runtime graph`. */
  render(): string {
    const order = this.topologicalOrder();
    const ids = order.ok ? order.value : this.nodeIds();
    return ids
      .map((id, index) => {
        const deps = this.dependenciesOf(id);
        const suffix = deps.length > 0 ? `  ← ${deps.join(', ')}` : '';
        return `${String(index + 1).padStart(2, ' ')}. ${id}${suffix}`;
      })
      .join('\n');
  }

  private ensure(map: Map<string, Set<string>>, key: string): Set<string> {
    let set = map.get(key);
    if (!set) {
      set = new Set();
      map.set(key, set);
    }
    return set;
  }

  private findCycle(): readonly string[] {
    const visited = new Set<string>();
    const stack: string[] = [];
    const inStack = new Set<string>();

    const dfs = (id: string): string[] | null => {
      visited.add(id);
      stack.push(id);
      inStack.add(id);
      for (const dependency of [...(this.dependencies.get(id) ?? [])].sort()) {
        if (inStack.has(dependency)) {
          return [...stack.slice(stack.indexOf(dependency)), dependency];
        }
        if (!visited.has(dependency)) {
          const found = dfs(dependency);
          if (found) {
            return found;
          }
        }
      }
      stack.pop();
      inStack.delete(id);
      return null;
    };

    for (const id of [...this.nodes].sort()) {
      if (!visited.has(id)) {
        const found = dfs(id);
        if (found) {
          return found;
        }
      }
    }
    return [...this.nodes];
  }
}
