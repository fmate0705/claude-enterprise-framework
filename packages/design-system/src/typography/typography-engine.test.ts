import { describe, expect, it } from 'vitest';
import { baseTokens } from '../tokens/index.js';
import { TYPE_RATIOS, TypographyEngine } from './typography-engine.js';

describe('TypographyEngine', () => {
  const engine = new TypographyEngine();

  it('builds a strictly increasing modular scale', () => {
    const scale = engine.buildScale(1, TYPE_RATIOS.majorThird);
    expect(engine.isMonotonic(scale)).toBe(true);
    expect(scale.base.sizeRem).toBe(1);
    expect(scale['7xl'].sizeRem).toBeGreaterThan(scale.base.sizeRem);
  });

  it('confirms the base token scale is monotonic', () => {
    expect(engine.isMonotonic(baseTokens.typography.scale)).toBe(true);
  });

  it('recommends real font pairings', () => {
    expect(engine.pairings().length).toBeGreaterThan(0);
    expect(engine.pairing('playfair-source')?.heading).toBe('Playfair Display');
  });
});
