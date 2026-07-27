import { BusinessAnalyzer } from '../analysis/index.js';
import { AnalyticsPlanner } from '../analytics/index.js';
import { AudienceAnalyzer } from '../audience/index.js';
import { CompetitorAnalyzer } from '../competitors/index.js';
import { ContentPlanner } from '../content/index.js';
import { FeaturePlanner } from '../features/index.js';
import { IndustryAnalyzer } from '../industry/index.js';
import type { ProjectInput } from '../input.js';
import { IntegrationPlanner } from '../integrations/index.js';
import { UserJourneyPlanner } from '../journeys/index.js';
import { LegalPlanner } from '../legal/index.js';
import { PagePlanner } from '../pages/index.js';
import { PerformancePlanner } from '../performance/index.js';
import { SEOPlanner } from '../seo/index.js';
import { AccessibilityPlanner, RecommendationEngine, RiskAnalyzer } from '../strategy/index.js';
import type { Blueprint } from './blueprint.js';

/**
 * Orchestrates every analyzer and planner into a single {@link Blueprint}. It runs them in
 * dependency order — industry → business/audience/competitor → features → pages → the rest — and
 * threads each result into the next. The whole run is a pure function of the input and the
 * injected timestamp, so the same project always produces the same blueprint.
 */
export class BlueprintGenerator {
  constructor(
    private readonly industry = new IndustryAnalyzer(),
    private readonly business = new BusinessAnalyzer(),
    private readonly audience = new AudienceAnalyzer(),
    private readonly competitor = new CompetitorAnalyzer(),
    private readonly features = new FeaturePlanner(),
    private readonly pages = new PagePlanner(),
    private readonly integrations = new IntegrationPlanner(),
    private readonly journeys = new UserJourneyPlanner(),
    private readonly content = new ContentPlanner(),
    private readonly seo = new SEOPlanner(),
    private readonly performance = new PerformancePlanner(),
    private readonly accessibility = new AccessibilityPlanner(),
    private readonly legal = new LegalPlanner(),
    private readonly analytics = new AnalyticsPlanner(),
    private readonly recommendations = new RecommendationEngine(),
    private readonly risks = new RiskAnalyzer(),
  ) {}

  generate(input: ProjectInput, generatedAt: string): Blueprint {
    const classification = this.industry.classify(input);
    const profile = classification.profile;

    const business = this.business.analyze(input, classification);
    const audience = this.audience.analyze(input, profile);
    const competitor = this.competitor.analyze(profile);

    const matrix = this.features.plan(input, profile);
    const featureIds = matrix.features.map((feature) => feature.id);
    const pages = this.pages.plan(input, profile, featureIds);
    const integrations = this.integrations.plan(matrix.features);
    const journeys = this.journeys.plan(audience.personas, pages);

    const content = this.content.plan(business, profile, pages);
    const seo = this.seo.plan(input, profile, pages);
    const performance = this.performance.plan(business, matrix.features);
    const accessibility = this.accessibility.plan(audience, matrix.features);
    const legal = this.legal.plan(input, matrix.features);
    const analytics = this.analytics.plan(input, business);

    const recommendations = this.recommendations.recommend(input, business, pages, matrix);
    const risks = this.risks.analyze(input, business, matrix.features, legal);

    return {
      generatedAt,
      input,
      industry: {
        id: profile.id,
        name: profile.name,
        score: classification.score,
        alternatives: classification.alternatives,
      },
      business,
      audience,
      competitor,
      pages,
      features: matrix,
      integrations,
      journeys,
      content,
      seo,
      performance,
      accessibility,
      legal,
      analytics,
      recommendations,
      risks,
    };
  }
}
