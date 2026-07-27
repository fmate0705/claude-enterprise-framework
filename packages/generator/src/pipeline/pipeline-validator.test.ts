import { describe, expect, it } from 'vitest';
import { PipelineValidator } from './pipeline-validator.js';
import { StageRegistry } from './stage-registry.js';
import { allStages } from '../stages/index.js';

describe('PipelineValidator', () => {
  const validator = new PipelineValidator();

  it('accepts the default, well-formed pipeline', () => {
    expect(validator.validate().ok).toBe(true);
  });

  it('rejects a pipeline missing a stage', () => {
    const withoutExport = allStages().filter((stage) => stage.id !== 'export');
    const report = validator.validate(new StageRegistry(withoutExport));
    expect(report.ok).toBe(false);
    expect(report.issues.some((i) => i.message.includes('export'))).toBe(true);
  });

  it('rejects duplicate stage registration at the registry level', () => {
    const [first] = allStages();
    expect(first).toBeDefined();
    if (first) {
      expect(() => new StageRegistry([first, first])).toThrow();
    }
  });
});
