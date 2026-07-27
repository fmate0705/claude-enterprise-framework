import { describe, expect, it } from 'vitest';
import { legalInput, saasInput } from '../testing/fixtures.js';
import { normalizeInput } from '../input.js';
import { IndustryAnalyzer } from './industry-analyzer.js';

describe('IndustryAnalyzer', () => {
  const analyzer = new IndustryAnalyzer();

  it('classifies a law firm as legal', () => {
    const result = analyzer.classify(legalInput());
    expect(result.profile.id).toBe('legal');
    expect(result.score).toBeGreaterThan(0);
  });

  it('classifies a SaaS platform as saas', () => {
    expect(analyzer.classify(saasInput()).profile.id).toBe('saas');
  });

  it('falls back to generic when nothing matches', () => {
    const result = analyzer.classify(
      normalizeInput({ projectName: 'Thing', description: 'zzz qqq' }),
    );
    expect(result.profile.id).toBe('generic');
    expect(result.score).toBe(0);
  });

  it('is deterministic', () => {
    const a = analyzer.classify(legalInput());
    const b = analyzer.classify(legalInput());
    expect(a.profile.id).toBe(b.profile.id);
    expect(a.score).toBe(b.score);
  });
});
