import { describe, expect, it } from 'vitest';
import { BusinessAnalyzer } from '../analysis/index.js';
import { IndustryAnalyzer } from '../industry/index.js';
import { PagePlanner } from '../pages/index.js';
import { legalInput } from '../testing/fixtures.js';
import { ContentPlanner } from './content-planner.js';

describe('ContentPlanner', () => {
  const planner = new ContentPlanner();
  const industry = new IndustryAnalyzer();
  const business = new BusinessAnalyzer();
  const pagePlanner = new PagePlanner();

  const input = legalInput();
  const classification = industry.classify(input);
  const analysis = business.analyze(input, classification);
  const pages = pagePlanner.plan(input, classification.profile, []);

  it('summarizes every page with an objective and a CTA', () => {
    const content = planner.plan(analysis, classification.profile, pages);
    expect(content.pageSummaries).toHaveLength(pages.length);
    for (const summary of content.pageSummaries) {
      expect(summary.objective.length).toBeGreaterThan(0);
      expect(summary.primaryCta.length).toBeGreaterThan(0);
    }
  });

  it('derives a trust strategy from the industry', () => {
    const content = planner.plan(analysis, classification.profile, pages);
    expect(content.trustStrategy.length).toBeGreaterThan(0);
  });

  it('provides tone of voice and headline guidance', () => {
    const content = planner.plan(analysis, classification.profile, pages);
    expect(content.toneOfVoice.length).toBeGreaterThan(0);
    expect(content.headlineGuidance.length).toBeGreaterThan(0);
  });
});
