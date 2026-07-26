import { describe, expect, it } from 'vitest';
import { MotionEngine } from './motion-engine.js';

describe('MotionEngine', () => {
  const engine = new MotionEngine();

  it('covers every motion category', () => {
    for (const category of [
      'micro-interaction',
      'page-transition',
      'scroll',
      'hover',
      'loading',
      'exit',
    ] as const) {
      expect(engine.byCategory(category).length).toBeGreaterThan(0);
    }
  });

  it('keeps every preset within the performance budget', () => {
    for (const preset of engine.presets()) {
      expect(engine.isWithinBudget(preset), preset.id).toBe(true);
      expect(engine.durationMs(preset)).toBeLessThanOrEqual(MotionEngine.BUDGET_MS);
    }
  });

  it('assigns a reduced-motion behavior to every preset', () => {
    for (const preset of engine.presets()) {
      expect(['disable', 'crossfade', 'instant']).toContain(preset.reducedMotion);
    }
  });

  it('lists the supported motion libraries', () => {
    expect(engine.libraries()).toContain('framer-motion');
  });
});
