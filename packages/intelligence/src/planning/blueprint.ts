import type { BusinessAnalysis } from '../analysis/index.js';
import type { AnalyticsPlan } from '../analytics/index.js';
import type { AudienceAnalysis } from '../audience/index.js';
import type { CompetitorProfile } from '../competitors/index.js';
import type { ContentStrategy } from '../content/index.js';
import type { FeatureMatrix } from '../features/index.js';
import type { IndustryId } from '../industry/index.js';
import type { ProjectInput } from '../input.js';
import type { Integration } from '../integrations/index.js';
import type { UserJourney } from '../journeys/index.js';
import type { LegalPlan } from '../legal/index.js';
import type { PagePlan } from '../pages/index.js';
import type { PerformancePlan } from '../performance/index.js';
import type { SEOStrategy } from '../seo/index.js';
import type { AccessibilityPlan, Recommendation, Risk } from '../strategy/index.js';

/** The classified industry, with confidence and runner-up sectors. */
export interface IndustrySummary {
  readonly id: IndustryId;
  readonly name: string;
  readonly score: number;
  readonly alternatives: readonly IndustryId[];
}

/**
 * The complete implementation blueprint — the structured answer to "what should be built and
 * why". It composes every analysis and plan into one immutable, serializable value. It contains
 * no code and no UI; it is the plan that precedes generation.
 */
export interface Blueprint {
  readonly generatedAt: string;
  readonly input: ProjectInput;
  readonly industry: IndustrySummary;
  readonly business: BusinessAnalysis;
  readonly audience: AudienceAnalysis;
  readonly competitor: CompetitorProfile;
  readonly pages: readonly PagePlan[];
  readonly features: FeatureMatrix;
  readonly integrations: readonly Integration[];
  readonly journeys: readonly UserJourney[];
  readonly content: ContentStrategy;
  readonly seo: SEOStrategy;
  readonly performance: PerformancePlan;
  readonly accessibility: AccessibilityPlan;
  readonly legal: LegalPlan;
  readonly analytics: AnalyticsPlan;
  readonly recommendations: readonly Recommendation[];
  readonly risks: readonly Risk[];
}
