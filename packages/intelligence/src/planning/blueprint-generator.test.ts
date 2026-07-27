import { describe, expect, it } from 'vitest';
import { FIXED_TIMESTAMP, legalInput, saasInput } from '../testing/fixtures.js';
import { BlueprintGenerator } from './blueprint-generator.js';

describe('BlueprintGenerator', () => {
  const generator = new BlueprintGenerator();

  it('produces a complete blueprint for a legal project', () => {
    const blueprint = generator.generate(legalInput(), FIXED_TIMESTAMP);
    expect(blueprint.industry.id).toBe('legal');
    expect(blueprint.pages.length).toBeGreaterThan(0);
    expect(blueprint.features.features.length).toBeGreaterThan(0);
    expect(blueprint.journeys.length).toBe(2);
    expect(blueprint.accessibility.level).toBe('WCAG 2.2 AA');
    expect(blueprint.performance.coreWebVitals.lcpMs).toBeGreaterThan(0);
  });

  it('includes Hungarian legal pages and the review disclaimer for a HU project', () => {
    const blueprint = generator.generate(legalInput(), FIXED_TIMESTAMP);
    const ids = blueprint.legal.requiredPages.map((page) => page.id);
    expect(ids).toContain('impresszum');
    expect(ids).toContain('adatkezelesi-tajekoztato');
    expect(blueprint.legal.disclaimer).toContain('qualified legal professional');
  });

  it('flags a timeline risk for a rushed, complex SaaS project', () => {
    const blueprint = generator.generate(saasInput(), FIXED_TIMESTAMP);
    expect(blueprint.risks.some((risk) => risk.id === 'timeline-scope')).toBe(true);
  });

  it('is fully deterministic', () => {
    const a = generator.generate(legalInput(), FIXED_TIMESTAMP);
    const b = generator.generate(legalInput(), FIXED_TIMESTAMP);
    expect(a).toEqual(b);
  });

  it('explains why each page exists', () => {
    const blueprint = generator.generate(legalInput(), FIXED_TIMESTAMP);
    for (const page of blueprint.pages) {
      expect(page.rationale.length).toBeGreaterThan(0);
    }
  });
});
