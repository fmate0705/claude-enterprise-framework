import type { IndustryProfile } from '../industry/index.js';

/**
 * A structured competitor profile — how sites in this space are typically built. It is generated
 * from the industry knowledge base, never scraped from live websites, so it reflects durable best
 * practices rather than any one competitor's choices.
 */
export interface CompetitorProfile {
  readonly typicalNavigation: readonly string[];
  readonly commonPageTypes: readonly string[];
  readonly trustElements: readonly string[];
  readonly industryFeatures: readonly string[];
  readonly seoTopics: readonly string[];
  readonly contentOpportunities: readonly string[];
}

/**
 * Builds a competitor profile from structured best practices. Per the specification it does not
 * scrape or fetch anything — it projects the industry profile into a competitor-shaped view so
 * planners can reason about expectations and content gaps.
 */
export class CompetitorAnalyzer {
  analyze(profile: IndustryProfile): CompetitorProfile {
    return {
      typicalNavigation: profile.competitorNavigation,
      commonPageTypes: profile.typicalPages,
      trustElements: profile.trustSignals,
      industryFeatures: profile.typicalFeatures,
      seoTopics: profile.seoTopics,
      contentOpportunities: profile.contentOpportunities,
    };
  }
}
