import { describe, expect, it } from 'vitest';
import { ClaudePromptBuilder } from './prompt-builder.js';

describe('ClaudePromptBuilder', () => {
  const builder = new ClaudePromptBuilder();

  it('includes only the requested fragments', () => {
    const built = builder.build({ categories: ['seo', 'accessibility'], objective: undefined });
    expect(built.fragments.map((fragment) => fragment.category)).toEqual(['seo', 'accessibility']);
    expect(built.text).toContain('## SEO');
    expect(built.text).toContain('## Accessibility');
    expect(built.text).not.toContain('## Motion');
  });

  it('deduplicates repeated categories', () => {
    const built = builder.build({ categories: ['seo', 'seo'], objective: undefined });
    expect(built.fragments).toHaveLength(1);
  });

  it('prepends the objective when given', () => {
    const built = builder.build({ categories: ['frontend'], objective: 'Build the hero' });
    expect(built.text.startsWith('## Objective\nBuild the hero')).toBe(true);
    expect(built.tokenEstimate).toBeGreaterThan(0);
  });

  it('exposes the full catalog in canonical order', () => {
    expect(builder.catalog().map((fragment) => fragment.category)).toEqual([
      'architecture',
      'seo',
      'frontend',
      'motion',
      'accessibility',
      'docker',
      'testing',
      'performance',
    ]);
  });
});
