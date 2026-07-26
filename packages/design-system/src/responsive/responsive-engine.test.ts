import { describe, expect, it } from 'vitest';
import { ResponsiveEngine } from './responsive-engine.js';

describe('ResponsiveEngine', () => {
  const engine = new ResponsiveEngine();

  it('cascades mobile-first, inheriting smaller breakpoints', () => {
    const value = { base: 1, md: 2, xl: 4 };
    expect(engine.resolve(value, 'base')).toBe(1);
    expect(engine.resolve(value, 'sm')).toBe(1); // inherits base
    expect(engine.resolve(value, 'md')).toBe(2);
    expect(engine.resolve(value, 'lg')).toBe(2); // inherits md
    expect(engine.resolve(value, 'xl')).toBe(4);
    expect(engine.resolve(value, '2xl')).toBe(4); // inherits xl
  });

  it('emits min-width media queries, and none for base', () => {
    expect(engine.mediaQuery('base')).toBeUndefined();
    expect(engine.mediaQuery('md')).toBe('@media (min-width: 768px)');
  });

  it('rejects unknown breakpoint names', () => {
    expect(engine.isValid({ base: 1, md: 2 })).toBe(true);
    expect(engine.isValid({ base: 1, huge: 2 } as never)).toBe(false);
  });

  it('is deterministic — same input, same resolution', () => {
    const value = { base: 'a', lg: 'b' };
    expect(engine.resolve(value, 'xl')).toBe(engine.resolve(value, 'xl'));
  });
});
