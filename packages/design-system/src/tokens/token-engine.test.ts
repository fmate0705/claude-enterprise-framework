import { describe, expect, it } from 'vitest';
import { baseTokens } from './base-tokens.js';
import { TokenEngine } from './token-engine.js';

describe('TokenEngine', () => {
  const engine = new TokenEngine();

  it('exposes a complete base token set', () => {
    expect(baseTokens.gridColumns).toBe(12);
    expect(Object.keys(baseTokens.spacing.scale).length).toBeGreaterThan(0);
    expect(baseTokens.colors.primary['500']).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('deep-merges an override without mutating the base', () => {
    const merged = engine.merge(baseTokens, { radius: { md: '1rem' }, gridColumns: 16 });
    expect(merged.radius.md).toBe('1rem');
    expect(merged.radius.sm).toBe(baseTokens.radius.sm); // untouched leaf preserved
    expect(merged.gridColumns).toBe(16);
    expect(baseTokens.radius.md).toBe('0.5rem'); // base unchanged
  });

  it('serializes tokens to CSS custom properties', () => {
    const css = engine.toCssVariables(baseTokens);
    expect(css).toContain(':root {');
    expect(css).toContain('--cef-color-primary-500: #3b82f6;');
    expect(css).toContain('--cef-space-4: 1rem;');
    expect(css).toContain('--cef-grid-columns: 12;');
  });

  it('round-trips tokens through JSON', () => {
    const parsed = JSON.parse(engine.toJson(baseTokens));
    expect(parsed.gridColumns).toBe(12);
  });
});
