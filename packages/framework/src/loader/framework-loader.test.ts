import { describe, expect, it } from 'vitest';
import { frameworkRoot } from '../index.js';
import { InMemoryFileSystem, NodeReadOnlyFileSystem } from '../testing/fs.js';
import { moduleFiles } from '../testing/fixtures.js';
import { FrameworkLoader } from './framework-loader.js';

const fixture = {
  ...moduleFiles('a', { engines: ['ea'], priority: 100 }),
  ...moduleFiles('b', { engines: ['eb'], deps: ['a'], skills: ['taste'] }),
};

describe('FrameworkLoader', () => {
  it('discovers and indexes modules', async () => {
    const loader = new FrameworkLoader({ fs: new InMemoryFileSystem(fixture), rootDir: '/fw' });
    const registry = await loader.discover();
    expect(registry.ok).toBe(true);
    if (registry.ok) {
      expect(registry.value.size()).toBe(2);
      expect(registry.value.get('a')).toBeDefined();
    }
  });

  it('lazy-loads specifications and caches them (nothing loaded until requested)', async () => {
    const fs = new InMemoryFileSystem(fixture);
    const loader = new FrameworkLoader({ fs, rootDir: '/fw' });
    await loader.discover();

    // Discovery reads module.yaml, not spec.md.
    expect(fs.readCount('/fw/modules/a/spec.md')).toBe(0);

    const first = await loader.loadSpec('a');
    expect(first.ok).toBe(true);
    expect(fs.readCount('/fw/modules/a/spec.md')).toBe(1);

    const second = await loader.loadSpec('a');
    expect(second.ok).toBe(true);
    // Served from cache — not read a second time.
    expect(fs.readCount('/fw/modules/a/spec.md')).toBe(1);
    expect(loader.getCache().stats().hits).toBeGreaterThanOrEqual(1);
  });

  it('generates a compact, token-optimized project context', async () => {
    const loader = new FrameworkLoader({ fs: new InMemoryFileSystem(fixture), rootDir: '/fw' });
    const result = await loader.generateContext({
      projectName: 'demo',
      projectType: 'landing-page',
      framework: 'nextjs',
      frameworkVersion: 2,
      engines: ['ea', 'eb'],
      skills: [],
      mcp: [],
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.path).toBe('.cef/generated/context.md');
      expect(result.value.content).toContain('demo');
      expect(result.value.content).toContain('Execution order');
      expect(result.value.tokenEstimate).toBeGreaterThan(0);
    }
  });

  it('discovers the real framework modules from disk and resolves capabilities', async () => {
    const loader = new FrameworkLoader({
      fs: new NodeReadOnlyFileSystem(),
      rootDir: frameworkRoot(),
    });
    const registry = await loader.discover();
    expect(registry.ok).toBe(true);
    if (!registry.ok) {
      return;
    }
    expect(registry.value.size()).toBeGreaterThanOrEqual(14);

    const resolved = await loader.resolveForEngines(['seo', 'commerce']);
    expect(resolved.ok).toBe(true);
    if (resolved.ok) {
      expect(resolved.value.order).toContain('foundation');
      expect(resolved.value.order).toContain('commerce');
      expect(resolved.value.skills).toContain('seo-skill');
      const position = (id: string): number => resolved.value.order.indexOf(id);
      expect(position('foundation')).toBeLessThan(position('commerce'));
    }
  });
});
