import { describe, expect, it } from 'vitest';
import { deriveCapabilities } from './factory.js';
import { DEFAULT_SPEC } from './spec-schema.js';

describe('deriveCapabilities', () => {
  it('always includes the floor engines', () => {
    const { engines } = deriveCapabilities(DEFAULT_SPEC);
    for (const floor of ['core', 'security', 'performance', 'accessibility', 'legal']) {
      expect(engines).toContain(floor);
    }
  });

  it('enables the commerce engine for an e-commerce project', () => {
    expect(deriveCapabilities({ ...DEFAULT_SPEC, projectType: 'ecommerce' }).engines).toContain(
      'commerce',
    );
  });

  it('enables the commerce engine when the commerce feature is on', () => {
    expect(deriveCapabilities({ ...DEFAULT_SPEC, commerce: true }).engines).toContain('commerce');
  });

  it('omits the seo engine for an api project', () => {
    expect(deriveCapabilities({ ...DEFAULT_SPEC, projectType: 'api' }).engines).not.toContain(
      'seo',
    );
  });

  it('enables the content engine for a blog', () => {
    expect(deriveCapabilities({ ...DEFAULT_SPEC, blog: true }).engines).toContain('content');
  });

  it('omits the motion engine when animation is none', () => {
    expect(deriveCapabilities({ ...DEFAULT_SPEC, animation: 'none' }).engines).not.toContain(
      'motion',
    );
  });

  it('produces sorted, deterministic output', () => {
    const first = deriveCapabilities(DEFAULT_SPEC);
    const second = deriveCapabilities(DEFAULT_SPEC);
    expect(first).toEqual(second);
    expect(first.engines).toEqual([...first.engines].sort());
    expect(first.skills).toEqual([...first.skills].sort());
  });
});
