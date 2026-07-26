import { ok } from '@cef/core';
import type { Result } from '@cef/core';
import type { RuntimeError } from '../errors/index.js';
import type { EnginePlugin } from '../interfaces/index.js';
import { ExecutionGraph } from './execution-graph.js';

export interface ExecutionPlan {
  readonly graph: ExecutionGraph;
  readonly order: readonly string[];
}

/** Builds an {@link ExecutionGraph} from resolved plugins and derives the execution order. */
export class ExecutionPlanner {
  plan(plugins: readonly EnginePlugin[]): Result<ExecutionPlan, RuntimeError> {
    const graph = new ExecutionGraph();
    const present = new Set(plugins.map((plugin) => plugin.id));

    for (const plugin of plugins) {
      graph.addNode(plugin.id);
      for (const dependency of plugin.dependsOn) {
        if (present.has(dependency)) {
          graph.addDependency(plugin.id, dependency);
        }
      }
    }

    const order = graph.topologicalOrder();
    if (!order.ok) {
      return order;
    }
    return ok({ graph, order: order.value });
  }
}
