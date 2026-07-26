import type { RuntimeContext } from '../core/context.js';

/**
 * Validates the assembled runtime state before it is declared ready: the manifest and
 * configuration are loaded, every requested engine and every floor is in the execution graph,
 * and the graph covers exactly the resolved plugins.
 */
export class RuntimeValidator {
  validate(context: RuntimeContext): readonly string[] {
    const issues: string[] = [];

    if (!context.manifest) {
      issues.push('manifest was not loaded');
    }
    if (!context.configuration) {
      issues.push('runtime configuration was not loaded');
    }
    if (!context.plugins || !context.order || !context.graph) {
      issues.push('execution graph was not built');
      return issues;
    }

    const order = new Set(context.order);
    if (context.manifest) {
      for (const engine of context.manifest.engines) {
        if (!order.has(engine)) {
          issues.push(`manifest engine "${engine}" is missing from the execution graph`);
        }
      }
    }

    const floors = context.provider.ids().filter((id) => context.provider.get(id)?.floor === true);
    for (const floor of floors) {
      if (!order.has(floor)) {
        issues.push(`floor "${floor}" is missing from the execution graph`);
      }
    }

    if (context.graph.nodeCount() !== context.plugins.length) {
      issues.push('graph node count does not match the resolved plugin count');
    }

    return issues;
  }
}
