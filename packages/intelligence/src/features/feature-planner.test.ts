import { describe, expect, it } from 'vitest';
import { IndustryAnalyzer } from '../industry/index.js';
import { legalInput, saasInput } from '../testing/fixtures.js';
import { FeaturePlanner } from './feature-planner.js';

describe('FeaturePlanner', () => {
  const planner = new FeaturePlanner();
  const industry = new IndustryAnalyzer();

  it('always includes analytics', () => {
    const matrix = planner.plan(legalInput(), industry.classify(legalInput()).profile);
    expect(matrix.features.map((f) => f.id)).toContain('analytics');
  });

  it('detects requested features from the description and pulls in their dependencies', () => {
    const matrix = planner.plan(saasInput(), industry.classify(saasInput()).profile);
    const ids = matrix.features.map((f) => f.id);
    expect(ids).toContain('payments'); // "subscription billing"
    expect(ids).toContain('authentication'); // dependency of payments + "authentication"
    expect(ids).toContain('search');
  });

  it('resolves every feature dependency within the matrix', () => {
    const matrix = planner.plan(saasInput(), industry.classify(saasInput()).profile);
    const ids = new Set(matrix.features.map((f) => f.id));
    for (const feature of matrix.features) {
      for (const dependency of feature.dependencies) {
        expect(ids.has(dependency), `${feature.id} → ${dependency}`).toBe(true);
      }
    }
  });

  it('orders features by priority', () => {
    const matrix = planner.plan(saasInput(), industry.classify(saasInput()).profile);
    const ranks = matrix.features.map((f) => f.priority);
    // critical/high come before low
    expect(ranks.indexOf('critical')).toBeLessThanOrEqual(ranks.lastIndexOf('low'));
  });
});
