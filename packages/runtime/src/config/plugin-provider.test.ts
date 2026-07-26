import { describe, expect, it } from 'vitest';
import { ExecutionPlanner } from '../graph/index.js';
import type { EnginePlugin } from '../interfaces/index.js';
import { CatalogPluginProvider, DEFAULT_ENGINE_CATALOG } from './index.js';

describe('CatalogPluginProvider', () => {
  const provider = new CatalogPluginProvider();

  it('exposes every catalog engine', () => {
    expect(provider.has('core')).toBe(true);
    expect(provider.has('commerce')).toBe(true);
    expect(provider.ids().length).toBe(DEFAULT_ENGINE_CATALOG.length);
  });

  it("surfaces each engine's declared dependencies", () => {
    expect(provider.get('commerce')?.dependsOn).toEqual(
      expect.arrayContaining(['core', 'security', 'validation']),
    );
    expect(provider.get('ai-seo')?.dependsOn).toContain('seo');
  });

  it('marks the floors', () => {
    for (const floor of ['core', 'security', 'performance', 'accessibility', 'legal']) {
      expect(provider.get(floor)?.floor).toBe(true);
    }
  });

  it('the full catalog forms a DAG (no cycles)', () => {
    const plugins = provider
      .ids()
      .map((id) => provider.get(id))
      .filter((plugin): plugin is EnginePlugin => plugin !== undefined);
    const plan = new ExecutionPlanner().plan(plugins);
    expect(plan.ok).toBe(true);
    if (plan.ok) {
      expect(plan.value.order.length).toBe(plugins.length);
    }
  });
});
