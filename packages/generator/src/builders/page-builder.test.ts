import { describe, expect, it } from 'vitest';
import { legalBlueprint, legalOptions } from '../testing/fixtures.js';
import { GenerationPipeline } from '../pipeline/index.js';
import { PageBuilder } from './page-builder.js';

describe('PageBuilder', () => {
  const pipeline = new GenerationPipeline();
  const blueprint = legalBlueprint();
  const context = pipeline.createContext(blueprint, legalOptions());
  const builder = new PageBuilder();

  it('generates exactly one page per blueprint page — never inferring extras', () => {
    const pages = builder.build(context);
    expect(pages.map((p) => p.pageId).sort()).toEqual(blueprint.pages.map((p) => p.id).sort());
  });

  it('opens each page with the required references', () => {
    for (const page of builder.build(context)) {
      const content = page.file.content;
      expect(content).toContain('Purpose:');
      expect(content).toContain('Target audience:');
      expect(content).toContain('Required components:');
      expect(content).toContain('Performance goals:');
    }
  });

  it('maps the home page to the root route with a hero and metadata', () => {
    const home = builder.build(context).find((p) => p.pageId === 'home');
    expect(home?.file.path).toBe('app/page.tsx');
    expect(home?.file.content).toContain('<Hero');
    expect(home?.file.content).toContain('export const metadata');
  });
});
