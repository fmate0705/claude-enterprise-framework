import { describe, expect, it } from 'vitest';
import { BlueprintGenerator } from '../planning/blueprint-generator.js';
import { FIXED_TIMESTAMP, legalInput, saasInput } from '../testing/fixtures.js';
import { BlueprintValidator } from './blueprint-validator.js';

describe('BlueprintValidator', () => {
  const generator = new BlueprintGenerator();
  const validator = new BlueprintValidator();

  it('passes a generated legal blueprint', () => {
    const report = validator.validate(generator.generate(legalInput(), FIXED_TIMESTAMP));
    expect(report.ok, JSON.stringify(report.issues)).toBe(true);
  });

  it('passes a generated SaaS blueprint', () => {
    const report = validator.validate(generator.generate(saasInput(), FIXED_TIMESTAMP));
    expect(report.ok, JSON.stringify(report.issues)).toBe(true);
  });

  it('errors when the home page is removed', () => {
    const blueprint = generator.generate(legalInput(), FIXED_TIMESTAMP);
    const broken = { ...blueprint, pages: blueprint.pages.filter((page) => page.id !== 'home') };
    const report = validator.validate(broken);
    expect(report.ok).toBe(false);
    expect(report.issues.some((issue) => issue.message.includes('home'))).toBe(true);
  });

  it('errors when a HU project loses its Impresszum', () => {
    const blueprint = generator.generate(legalInput(), FIXED_TIMESTAMP);
    const broken = {
      ...blueprint,
      legal: {
        ...blueprint.legal,
        requiredPages: blueprint.legal.requiredPages.filter((page) => page.id !== 'impresszum'),
      },
    };
    expect(validator.validate(broken).ok).toBe(false);
  });
});
