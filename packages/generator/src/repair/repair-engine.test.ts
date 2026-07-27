import { describe, expect, it } from 'vitest';
import { legalBlueprint, legalOptions } from '../testing/fixtures.js';
import { GenerationPipeline } from '../pipeline/index.js';
import { RepairEngine } from './repair-engine.js';

describe('RepairEngine', () => {
  const pipeline = new GenerationPipeline();
  const engine = new RepairEngine();

  function context() {
    const ctx = pipeline.createContext(legalBlueprint(), legalOptions());
    pipeline.run(ctx);
    return ctx;
  }

  it('normalizes trailing whitespace and enforces a single final newline', () => {
    const ctx = context();
    ctx.files.set('lib/messy.ts', 'const a = 1;   \n\n\n');
    const result = engine.repair(ctx);
    const fixed = result.files.find((f) => f.path === 'lib/messy.ts');
    expect(fixed?.content).toBe('const a = 1;\n');
    expect(result.fixes.some((fix) => fix.file === 'lib/messy.ts')).toBe(true);
  });

  it('injects metadata into a page that lacks it', () => {
    const ctx = context();
    ctx.files.set('app/orphan/page.tsx', 'export default function Orphan() {\n  return null;\n}\n');
    const result = engine.repair(ctx);
    const fixed = result.files.find((f) => f.path === 'app/orphan/page.tsx');
    expect(fixed?.content).toContain('export const metadata');
  });

  it('makes no changes to an already-clean, well-formed project', () => {
    // The generated project is already normalized, so a repair pass finds nothing to change.
    const result = engine.repair(context());
    expect(result.files).toHaveLength(0);
  });
});
