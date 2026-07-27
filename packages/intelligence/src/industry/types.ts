/** The industry model. Industry profiles are the structured best-practice knowledge base every
 * planner draws from, so recommendations are deterministic rather than scraped or invented. */

export type IndustryId =
  | 'saas'
  | 'professional-services'
  | 'legal'
  | 'finance'
  | 'healthcare'
  | 'ecommerce'
  | 'education'
  | 'agency'
  | 'hospitality'
  | 'real-estate'
  | 'nonprofit'
  | 'generic';

export interface IndustryProfile {
  readonly id: IndustryId;
  readonly name: string;
  /** Keywords that classify a description into this industry. */
  readonly keywords: readonly string[];
  readonly businessModels: readonly string[];
  /** Page ids typically expected for this industry. */
  readonly typicalPages: readonly string[];
  /** Feature ids typically expected. */
  readonly typicalFeatures: readonly string[];
  readonly trustSignals: readonly string[];
  readonly seoTopics: readonly string[];
  /** How competitors in this space typically navigate. */
  readonly competitorNavigation: readonly string[];
  readonly contentOpportunities: readonly string[];
  /** Conversions this industry optimizes for. */
  readonly conversions: readonly string[];
  readonly valuePropositions: readonly string[];
}
