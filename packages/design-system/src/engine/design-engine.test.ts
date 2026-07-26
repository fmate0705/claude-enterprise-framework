import { describe, expect, it } from 'vitest';
import { DesignEngine } from './design-engine.js';

describe('DesignEngine', () => {
  const engine = new DesignEngine();

  it('exposes every sub-engine and registry', () => {
    expect(engine.components.size()).toBeGreaterThanOrEqual(23);
    expect(engine.themes.list().length).toBeGreaterThan(0);
    expect(engine.presets.list().length).toBe(10);
    expect(engine.patterns.all().length).toBeGreaterThan(0);
  });

  it('resolves base tokens, and preset-overridden tokens', () => {
    expect(engine.resolveTokens().radius.md).toBe('0.5rem');
    expect(engine.resolveTokens('luxury').radius.md).toBe('0.25rem');
  });

  it('builds a complete style template with light, dark, and reduced-motion blocks', () => {
    const css = engine.styleTemplate('corporate', 'modern');
    expect(css).toContain(':root {');
    expect(css).toContain('data-theme="dark"');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('generates a brand identity as structured metadata', () => {
    const brand = engine.buildBrand({
      name: 'Acme',
      themeId: 'legal',
      personality: ['trustworthy'],
    });
    expect(brand.name).toBe('Acme');
    expect(brand.colors.primary).toMatch(/^#[0-9a-f]{6}$/i);
    expect(brand.voiceTone.voice.length).toBeGreaterThan(0);
    expect(brand.metadata.themeId).toBe('legal');
  });

  it('validates the whole system as consistent', () => {
    expect(engine.validate().ok).toBe(true);
  });

  it('emits the .cef/design files, including a brand file when requested', () => {
    const files = engine.designFiles({
      themeId: 'startup',
      presetId: 'bold',
      brand: { name: 'Acme' },
    });
    const paths = files.map((file) => file.path);
    expect(paths).toContain('.cef/design/tokens.json');
    expect(paths).toContain('.cef/design/tokens.css');
    expect(paths).toContain('.cef/design/styles.css');
    expect(paths).toContain('.cef/design/brand.json');
  });
});
