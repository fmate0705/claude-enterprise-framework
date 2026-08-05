import { describe, expect, it } from 'vitest';
import { legalBlueprint, legalOptions } from '../testing/fixtures.js';
import { GenerationPipeline } from './generation-pipeline.js';

describe('GenerationPipeline', () => {
  const pipeline = new GenerationPipeline();
  const blueprint = legalBlueprint();
  const options = legalOptions();

  it('runs all twelve stages to completion', () => {
    const session = pipeline.generate(blueprint, options);
    expect(session.states.map((s) => s.stageId)).toEqual([
      'architecture',
      'layout',
      'component',
      'page',
      'seo',
      'content',
      'asset',
      'deployment',
      'validation',
      'review',
      'repair',
      'export',
    ]);
    expect(session.states.every((s) => s.status === 'completed')).toBe(true);
  });

  it('generates a coherent project with no validation errors', () => {
    const session = pipeline.generate(blueprint, options);
    expect(session.report.ok).toBe(true);
    expect(session.report.issues.filter((i) => i.severity === 'error')).toHaveLength(0);
    expect(session.files.length).toBeGreaterThan(30);
  });

  it('generates a page for every blueprint page and nothing more', () => {
    const session = pipeline.generate(blueprint, options);
    const pageArtifacts = session.artifacts.filter((a) => a.kind === 'page');
    expect(pageArtifacts).toHaveLength(blueprint.pages.length);
  });

  it('is deterministic — the same blueprint yields identical files', () => {
    const a = pipeline.generate(blueprint, options);
    const b = pipeline.generate(blueprint, options);
    expect(a.files).toEqual(b.files);
  });

  it('emits the core architecture, SEO, and asset artifacts', () => {
    const paths = new Set(pipeline.generate(blueprint, options).files.map((f) => f.path));
    for (const path of [
      'package.json',
      'app/layout.tsx',
      'app/globals.css',
      'app/page.tsx',
      'app/robots.ts',
      'app/sitemap.ts',
      'public/manifest.webmanifest',
      'public/llms.txt',
      '.cef/assets/prompts.json',
      '.cef/generated/generation-report.md',
    ]) {
      expect(paths.has(path), path).toBe(true);
    }
  });

  it('reruns a single stage against an existing context', () => {
    const context = pipeline.createContext(blueprint, options);
    pipeline.run(context);
    const before = context.files.size;
    const stageResult = pipeline.runStage('seo', context);
    expect(stageResult?.status).toBe('completed');
    expect(context.files.size).toBe(before); // rerun overwrites, does not add
  });
});
