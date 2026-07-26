import { describe, expect, it } from 'vitest';
import { ThemeEngine } from './theme-engine.js';

describe('ThemeEngine', () => {
  const engine = new ThemeEngine();

  it('generates the base theme plus every industry theme', () => {
    const ids = engine.ids();
    expect(ids).toContain('base');
    for (const industry of [
      'luxury',
      'corporate',
      'startup',
      'technology',
      'healthcare',
      'legal',
      'finance',
      'creative',
      'education',
    ]) {
      expect(ids).toContain(industry);
    }
  });

  it('resolves "system" to the base theme', () => {
    expect(engine.get('system')?.id).toBe('base');
  });

  it('provides both light and dark schemes for every theme', () => {
    for (const theme of engine.list()) {
      expect(theme.light.background).toMatch(/^#[0-9a-f]{6}$/i);
      expect(theme.dark.background).toMatch(/^#[0-9a-f]{6}$/i);
      expect(theme.light.background).not.toBe(theme.dark.background);
    }
  });

  it('serializes a scheme to semantic CSS variables', () => {
    const base = engine.baseTheme();
    const css = engine.toCssVariables(base, 'dark');
    expect(css).toContain(':root[data-theme="dark"]');
    expect(css).toContain('--cef-primary-foreground:');
  });

  it('carries a radius token override on industry themes', () => {
    expect(engine.get('luxury')?.tokenOverride?.radius?.md).toBeDefined();
  });
});
