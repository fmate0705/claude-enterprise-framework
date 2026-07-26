import { describe, expect, it } from 'vitest';
import { ExecutionGraph } from './execution-graph.js';

describe('ExecutionGraph', () => {
  it('produces a deterministic topological order', () => {
    const graph = new ExecutionGraph();
    graph.addDependency('b', 'a');
    graph.addDependency('c', 'b');
    const order = graph.topologicalOrder();
    expect(order.ok).toBe(true);
    if (order.ok) {
      expect(order.value).toEqual(['a', 'b', 'c']);
    }
  });

  it('orders every dependency before its dependents', () => {
    const graph = new ExecutionGraph();
    graph.addDependency('commerce', 'core');
    graph.addDependency('commerce', 'security');
    graph.addDependency('security', 'core');
    const order = graph.topologicalOrder();
    expect(order.ok).toBe(true);
    if (order.ok) {
      const position = (id: string): number => order.value.indexOf(id);
      expect(position('core')).toBeLessThan(position('security'));
      expect(position('security')).toBeLessThan(position('commerce'));
    }
  });

  it('detects a cycle and reports it', () => {
    const graph = new ExecutionGraph();
    graph.addDependency('a', 'b');
    graph.addDependency('b', 'a');
    const order = graph.topologicalOrder();
    expect(order.ok).toBe(false);
    if (!order.ok) {
      expect(order.error.code).toBe('DEPENDENCY_CYCLE_DETECTED');
    }
  });

  it('counts nodes and edges', () => {
    const graph = new ExecutionGraph();
    graph.addDependency('b', 'a');
    graph.addDependency('c', 'a');
    expect(graph.nodeCount()).toBe(3);
    expect(graph.edgeCount()).toBe(2);
  });

  it('renders an inspectable view', () => {
    const graph = new ExecutionGraph();
    graph.addDependency('b', 'a');
    const rendered = graph.render();
    expect(rendered).toContain('a');
    expect(rendered).toContain('b');
  });
});
