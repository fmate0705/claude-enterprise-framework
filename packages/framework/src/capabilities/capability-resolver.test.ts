import { describe, expect, it } from 'vitest';
import { buildCatalog, moduleFiles } from '../testing/fixtures.js';
import { CapabilityResolver } from './capability-resolver.js';

const chain = {
  ...moduleFiles('a', { engines: ['ea'], priority: 100 }),
  ...moduleFiles('b', { engines: ['eb'], deps: ['a'], priority: 50 }),
  ...moduleFiles('c', { engines: ['ec'], deps: ['b'], priority: 10 }),
};

describe('CapabilityResolver', () => {
  it('resolves engines to modules and orders dependencies first', async () => {
    const catalog = await buildCatalog(chain);
    const result = new CapabilityResolver(catalog).resolveForEngines(['ec']);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.order).toEqual(['a', 'b', 'c']);
      expect(result.value.coveredEngines).toEqual(['ec']);
    }
  });

  it('reports engines with no covering module as uncovered', async () => {
    const catalog = await buildCatalog(chain);
    const result = new CapabilityResolver(catalog).resolveForEngines(['ea', 'nope']);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.uncoveredEngines).toContain('nope');
      expect(result.value.coveredEngines).toContain('ea');
    }
  });

  it('detects a circular dependency between modules', async () => {
    const cyclic = {
      ...moduleFiles('x', { engines: ['ex'], deps: ['y'] }),
      ...moduleFiles('y', { engines: ['ey'], deps: ['x'] }),
    };
    const catalog = await buildCatalog(cyclic);
    const result = new CapabilityResolver(catalog).resolveForEngines(['ex']);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('CIRCULAR_REFERENCE');
    }
  });
});
