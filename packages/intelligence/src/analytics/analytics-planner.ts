import type { BusinessAnalysis } from '../analysis/index.js';
import { isEuCountry } from '../audience/index.js';
import type { ProjectInput } from '../input.js';

export interface AnalyticsPlan {
  readonly tools: readonly string[];
  /** Events worth tracking, derived from the business's conversions. */
  readonly events: readonly string[];
  readonly kpis: readonly string[];
  readonly consentRequirements: readonly string[];
}

/**
 * Plans measurement: privacy-respecting analytics tools, the events to track (derived from the
 * business conversions), the KPIs that matter, and the consent requirements for the target market.
 */
export class AnalyticsPlanner {
  plan(input: ProjectInput, business: BusinessAnalysis): AnalyticsPlan {
    const events = [
      'page_view',
      ...business.conversions.map((conversion) => this.eventName(conversion)),
      'cta_click',
      'form_submit',
    ];
    return {
      tools: ['Plausible or GA4 (privacy-configured)'],
      events: [...new Set(events)],
      kpis: [
        'Conversion rate on the primary CTA',
        'Bounce rate on key landing pages',
        'Core Web Vitals field data',
        ...business.conversions.map((conversion) => `${conversion} completions`),
      ],
      consentRequirements: isEuCountry(input.targetCountry)
        ? ['Consent required before loading non-essential analytics (EU/GDPR).']
        : ['Honor Do-Not-Track; disclose analytics in the privacy policy.'],
    };
  }

  private eventName(conversion: string): string {
    return conversion
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');
  }
}
