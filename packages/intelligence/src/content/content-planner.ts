import type { BusinessAnalysis } from '../analysis/index.js';
import type { IndustryProfile } from '../industry/index.js';
import type { PagePlan } from '../pages/index.js';

export interface PageSummary {
  readonly page: string;
  readonly objective: string;
  readonly primaryCta: string;
}

export interface ContentStrategy {
  readonly contentHierarchy: readonly string[];
  readonly pageSummaries: readonly PageSummary[];
  readonly ctaStrategy: string;
  readonly trustStrategy: readonly string[];
  readonly toneOfVoice: string;
  readonly headlineGuidance: readonly string[];
  readonly sectionObjectives: readonly string[];
  readonly internalLinkingRecommendations: readonly string[];
}

/**
 * Produces the content strategy from the business analysis and page plan: a content hierarchy,
 * per-page objectives and CTAs, a trust-building plan, tone of voice, and headline guidance. It
 * derives everything from analysis — it does not write the actual copy.
 */
export class ContentPlanner {
  plan(
    business: BusinessAnalysis,
    profile: IndustryProfile,
    pages: readonly PagePlan[],
  ): ContentStrategy {
    const primaryConversion = business.conversions[0] ?? 'contact';
    return {
      contentHierarchy: pages
        .filter((page) => page.priority === 'critical' || page.priority === 'high')
        .map((page) => page.name),
      pageSummaries: pages.map((page) => ({
        page: page.id,
        objective: page.purpose,
        primaryCta: this.ctaFor(page.id, primaryConversion),
      })),
      ctaStrategy: `One primary CTA per page, all leading toward "${primaryConversion}".`,
      trustStrategy: profile.trustSignals,
      toneOfVoice: this.tone(business),
      headlineGuidance: [
        'Lead with the benefit, not the feature.',
        'Be specific and concrete; avoid generic superlatives.',
        'Keep the primary headline to one clear idea.',
      ],
      sectionObjectives: [
        'Each section advances the visitor toward the conversion.',
        'Front-load the value; prove it with real evidence.',
        'Remove any section that does not serve a stated goal.',
      ],
      internalLinkingRecommendations: [
        'Navigation exposes the top-priority pages.',
        'Contextual links connect related content.',
        'Every page offers a next step toward conversion.',
      ],
    };
  }

  private ctaFor(pageId: string, primaryConversion: string): string {
    const map: Readonly<Record<string, string>> = {
      home: `Start — ${primaryConversion}`,
      pricing: 'Choose a plan',
      contact: 'Send message',
      checkout: 'Complete purchase',
      signup: 'Create account',
      donate: 'Donate now',
      reservations: 'Reserve',
      appointments: 'Book appointment',
    };
    return map[pageId] ?? 'Learn more';
  }

  private tone(business: BusinessAnalysis): string {
    if (business.complexity === 'high') {
      return 'Clear and authoritative — technical where needed, never jargon for its own sake.';
    }
    return 'Warm, plain, and confident — human and specific.';
  }
}
