import { describe, expect, it } from 'vitest';
import { exportedComponents } from '../review/quality-reviewer.js';
import { legalBlueprint, legalOptions } from '../testing/fixtures.js';
import { GenerationPipeline } from '../pipeline/index.js';
import { ComponentBuilder } from './component-builder.js';

describe('ComponentBuilder', () => {
  const pipeline = new GenerationPipeline();
  const context = pipeline.createContext(legalBlueprint(), legalOptions());
  const builder = new ComponentBuilder();

  it('emits one file per component id (no duplicates)', () => {
    const components = builder.build(context);
    const ids = components.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('never declares the same component in two files', () => {
    const seen = new Map<string, string>();
    for (const component of builder.build(context)) {
      for (const name of exportedComponents(component.file.content)) {
        expect(seen.has(name), `${name} duplicated`).toBe(false);
        seen.set(name, component.file.path);
      }
    }
  });

  it('components read tokens, not raw hex colors', () => {
    for (const component of builder.build(context)) {
      expect(/#[0-9a-fA-F]{6}\b/.test(component.file.content), component.id).toBe(false);
    }
  });
});
