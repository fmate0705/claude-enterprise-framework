import { describe, expect, it } from 'vitest';
import { CatalogPluginProvider } from '../config/index.js';
import { DependencyResolver } from './dependency-resolver.js';

describe('DependencyResolver', () => {
  const resolver = new DependencyResolver(new CatalogPluginProvider());

  it('always includes the floor engines, even when only core is requested', () => {
    const result = resolver.resolve(['core']);
    expect(result.ok).toBe(true);
    if (result.ok) {
      const ids = result.value.plugins.map((plugin) => plugin.id);
      for (const floor of ['security', 'performance', 'accessibility', 'legal']) {
        expect(ids).toContain(floor);
      }
    }
  });

  it('pulls in transitive dependencies (commerce → core, security, validation)', () => {
    const result = resolver.resolve(['commerce']);
    expect(result.ok).toBe(true);
    if (result.ok) {
      const ids = result.value.plugins.map((plugin) => plugin.id);
      expect(ids).toEqual(expect.arrayContaining(['commerce', 'core', 'security', 'validation']));
      expect(result.value.added).toContain('security');
      expect(result.value.added).toContain('validation');
    }
  });

  it('reports requested and auto-added engines separately', () => {
    const result = resolver.resolve(['seo']);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.requested).toEqual(['seo']);
      expect(result.value.added).not.toContain('seo');
      expect(result.value.added).toContain('core');
    }
  });

  it('errors with a descriptive code on an unknown engine', () => {
    const result = resolver.resolve(['does-not-exist']);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('PLUGIN_NOT_FOUND');
      expect(result.error.message).toContain('does-not-exist');
    }
  });
});
