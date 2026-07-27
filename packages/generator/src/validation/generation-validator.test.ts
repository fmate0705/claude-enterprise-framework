import { describe, expect, it } from 'vitest';
import { legalBlueprint, legalOptions } from '../testing/fixtures.js';
import { GenerationPipeline } from '../pipeline/index.js';
import { GenerationValidator, importSpecifiers } from './generation-validator.js';

describe('GenerationValidator', () => {
  const pipeline = new GenerationPipeline();
  const validator = new GenerationValidator();

  function generatedContext() {
    const context = pipeline.createContext(legalBlueprint(), legalOptions());
    pipeline.run(context);
    return context;
  }

  it('passes a fully generated project', () => {
    const report = validator.validate(generatedContext());
    expect(report.ok, JSON.stringify(report.issues)).toBe(true);
  });

  it('flags an unresolved local import', () => {
    const context = generatedContext();
    context.files.set('components/broken.tsx', `import { X } from '@/does/not/exist';\n`);
    const report = validator.validate(context);
    expect(report.ok).toBe(false);
    expect(report.issues.some((i) => i.message.includes('Unresolved import'))).toBe(true);
  });

  it('flags a missing SEO artifact', () => {
    const context = generatedContext();
    context.files.delete('app/robots.ts');
    expect(validator.validate(context).ok).toBe(false);
  });

  it('extracts import specifiers, ignoring non-imports', () => {
    const specs = importSpecifiers(`import { a } from '@/x';\nimport b from 'next/link';\n`);
    expect(specs).toEqual(['@/x', 'next/link']);
  });
});
