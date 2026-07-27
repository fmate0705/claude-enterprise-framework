import { describe, expect, it } from 'vitest';
import { IndustryAnalyzer } from '../industry/index.js';
import { legalInput, saasInput } from '../testing/fixtures.js';
import { PagePlanner } from './page-planner.js';

describe('PagePlanner', () => {
  const planner = new PagePlanner();
  const industry = new IndustryAnalyzer();

  it('always includes home, contact, and legal', () => {
    const pages = planner.plan(legalInput(), industry.classify(legalInput()).profile, []);
    const ids = pages.map((page) => page.id);
    expect(ids).toContain('home');
    expect(ids).toContain('contact');
    expect(ids).toContain('legal');
  });

  it('adds auth pages when authentication is a feature', () => {
    const pages = planner.plan(saasInput(), industry.classify(saasInput()).profile, [
      'authentication',
    ]);
    const ids = pages.map((page) => page.id);
    expect(ids).toContain('login');
    expect(ids).toContain('signup');
  });

  it('gives every page a purpose, components, and a rationale', () => {
    const pages = planner.plan(legalInput(), industry.classify(legalInput()).profile, []);
    for (const page of pages) {
      expect(page.purpose.length).toBeGreaterThan(0);
      expect(page.components.length).toBeGreaterThan(0);
      expect(page.rationale.length).toBeGreaterThan(0);
    }
  });

  it('sorts home (critical) first', () => {
    const pages = planner.plan(legalInput(), industry.classify(legalInput()).profile, []);
    expect(pages[0]?.priority).toBe('critical');
  });
});
