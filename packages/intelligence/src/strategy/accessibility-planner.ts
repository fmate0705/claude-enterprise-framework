import type { AudienceAnalysis } from '../audience/index.js';
import type { FeaturePlan } from '../features/index.js';

export interface AccessibilityPlan {
  /** The conformance target; AA is the CEF floor. */
  readonly level: 'WCAG 2.2 AA';
  readonly requirements: readonly string[];
  /** Extra requirements implied by specific features. */
  readonly featureRequirements: readonly string[];
}

/**
 * Plans accessibility to the WCAG 2.2 AA floor, plus any feature-specific requirements (forms,
 * auth, tables, maps). Accessibility is never optional or a later pass — it is planned up front.
 */
export class AccessibilityPlanner {
  plan(audience: AudienceAnalysis, features: readonly FeaturePlan[]): AccessibilityPlan {
    const featureRequirements: string[] = [];
    const ids = new Set(features.map((feature) => feature.id));
    if (ids.has('contact-forms') || ids.has('authentication') || ids.has('booking')) {
      featureRequirements.push('Forms: visible labels, tied inline errors, correct input types.');
    }
    if (ids.has('search') || ids.has('filtering')) {
      featureRequirements.push(
        'Search/filter: keyboard operable, results announced via live region.',
      );
    }
    if (ids.has('maps')) {
      featureRequirements.push('Maps: provide a text/address alternative to the interactive map.');
    }
    if (ids.has('payments')) {
      featureRequirements.push('Checkout: fully keyboard operable, errors never color-only.');
    }

    return {
      level: 'WCAG 2.2 AA',
      requirements: [
        'Semantic landmarks and one h1 per page with ordered headings.',
        'All interactive elements keyboard operable with visible focus.',
        '4.5:1 body contrast; meaning never by color alone.',
        'Meaningful alt text; decorative images hidden from assistive tech.',
        'Honor prefers-reduced-motion.',
        ...audience.accessibilityExpectations,
      ],
      featureRequirements,
    };
  }
}
