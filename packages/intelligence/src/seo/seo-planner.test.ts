import { describe, expect, it } from 'vitest';
import { IndustryAnalyzer } from '../industry/index.js';
import { PagePlanner } from '../pages/index.js';
import { legalInput } from '../testing/fixtures.js';
import { SEOPlanner } from './seo-planner.js';

describe('SEOPlanner', () => {
  const planner = new SEOPlanner();
  const industry = new IndustryAnalyzer();
  const pagePlanner = new PagePlanner();

  const input = legalInput();
  const profile = industry.classify(input).profile;
  const pages = pagePlanner.plan(input, profile, []);

  it('derives primary keywords from the project and industry', () => {
    const seo = planner.plan(input, profile, pages);
    expect(seo.primaryKeywords.length).toBeGreaterThan(0);
    expect(seo.primaryKeywords).toContain('acme law');
  });

  it('recommends schema types only for planned pages', () => {
    const seo = planner.plan(input, profile, pages);
    const pageIds = new Set(pages.map((page) => page.id));
    for (const recommendation of seo.schemaRecommendations) {
      expect(pageIds.has(recommendation.page)).toBe(true);
    }
  });

  it('produces a canonical and meta strategy and structured-data plan', () => {
    const seo = planner.plan(input, profile, pages);
    expect(seo.canonicalStrategy.length).toBeGreaterThan(0);
    expect(seo.metaStrategy).toContain('60');
    expect(seo.structuredDataPlan.length).toBeGreaterThan(0);
  });

  it('never invents traffic numbers', () => {
    const seo = planner.plan(input, profile, pages);
    const serialized = JSON.stringify(seo);
    expect(serialized).not.toMatch(/\d+\s*(searches|visits|traffic|volume)/i);
  });
});
