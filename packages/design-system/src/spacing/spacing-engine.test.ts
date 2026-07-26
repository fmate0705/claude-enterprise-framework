import { describe, expect, it } from 'vitest';
import { SpacingEngine } from './spacing-engine.js';

describe('SpacingEngine', () => {
  const engine = new SpacingEngine();

  it('reads values off the scale', () => {
    expect(engine.get('4')).toBe(1);
    expect(engine.get('nope')).toBeUndefined();
  });

  it('detects on- and off-scale values', () => {
    expect(engine.isOnScale(1)).toBe(true);
    expect(engine.isOnScale(1.1)).toBe(false);
  });

  it('snaps an arbitrary value to the nearest scale step', () => {
    expect(engine.nearest(1.1)).toBe('4'); // 1rem is closest
    expect(engine.nearest(0.6)).toBe('2'); // 0.5rem is closest
  });

  it('converts a step to pixels at a 16px root', () => {
    expect(engine.toPx('4')).toBe(16);
  });
});
