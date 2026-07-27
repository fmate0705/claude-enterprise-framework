import { describe, expect, it } from 'vitest';
import { BlueprintGenerator } from '../planning/blueprint-generator.js';
import { FIXED_TIMESTAMP, legalInput } from '../testing/fixtures.js';
import { BlueprintSerializer } from './blueprint-serializer.js';

describe('BlueprintSerializer', () => {
  const blueprint = new BlueprintGenerator().generate(legalInput(), FIXED_TIMESTAMP);
  const serializer = new BlueprintSerializer();

  it('emits all seven blueprint files', () => {
    const paths = serializer.serialize(blueprint).map((file) => file.path);
    expect(paths).toEqual([
      '.cef/generated/blueprint.json',
      '.cef/generated/page-map.json',
      '.cef/generated/feature-matrix.json',
      '.cef/generated/project-plan.md',
      '.cef/generated/content-strategy.md',
      '.cef/generated/seo-strategy.md',
      '.cef/generated/performance-plan.md',
    ]);
  });

  it('produces valid JSON for the machine-readable files', () => {
    const files = serializer.serialize(blueprint);
    for (const file of files.filter((f) => f.path.endsWith('.json'))) {
      expect(() => JSON.parse(file.content)).not.toThrow();
    }
  });

  it('includes the legal review disclaimer in the project plan', () => {
    const plan = serializer.serialize(blueprint).find((f) => f.path.endsWith('project-plan.md'));
    expect(plan?.content).toContain('qualified legal professional');
  });

  it('is deterministic', () => {
    expect(serializer.serialize(blueprint)).toEqual(serializer.serialize(blueprint));
  });
});
