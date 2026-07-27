import type { FeaturePlan } from '../features/index.js';

export interface Integration {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly provider: string;
  readonly rationale: string;
  readonly requiredByFeatures: readonly string[];
}

interface IntegrationOption {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly provider: string;
}

/** Maps a feature id to the integration it typically needs. */
const FEATURE_INTEGRATIONS: Readonly<Record<string, IntegrationOption>> = {
  payments: { id: 'payments-provider', name: 'Payments', category: 'commerce', provider: 'Stripe' },
  analytics: { id: 'analytics', name: 'Analytics', category: 'measurement', provider: 'Plausible' },
  newsletter: {
    id: 'email',
    name: 'Email / Newsletter',
    category: 'marketing',
    provider: 'Resend',
  },
  maps: { id: 'maps', name: 'Maps', category: 'location', provider: 'Google Maps' },
  authentication: {
    id: 'auth',
    name: 'Authentication',
    category: 'accounts',
    provider: 'Auth provider',
  },
  cms: { id: 'cms', name: 'Headless CMS', category: 'content', provider: 'Sanity' },
  booking: { id: 'scheduling', name: 'Scheduling', category: 'engagement', provider: 'Cal.com' },
  'ai-features': { id: 'ai', name: 'AI', category: 'intelligence', provider: 'Anthropic Claude' },
  search: { id: 'search', name: 'Search', category: 'discovery', provider: 'Built-in / Algolia' },
};

/** The feature ids that require a third-party integration — used by validation. */
export const FEATURE_INTEGRATION_IDS: ReadonlySet<string> = new Set(
  Object.keys(FEATURE_INTEGRATIONS),
);

/**
 * Determines the third-party integrations a project needs by mapping each planned feature to its
 * typical provider. Integrations are deduplicated and record which features require them, so the
 * plan traces every dependency back to a reason.
 */
export class IntegrationPlanner {
  plan(features: readonly FeaturePlan[]): readonly Integration[] {
    const byId = new Map<string, { option: IntegrationOption; features: string[] }>();

    for (const feature of features) {
      const option = FEATURE_INTEGRATIONS[feature.id];
      if (!option) {
        continue;
      }
      const entry = byId.get(option.id);
      if (entry) {
        entry.features.push(feature.id);
      } else {
        byId.set(option.id, { option, features: [feature.id] });
      }
    }

    return [...byId.values()]
      .map(({ option, features: requiredBy }) => ({
        id: option.id,
        name: option.name,
        category: option.category,
        provider: option.provider,
        rationale: `Needed for ${requiredBy.join(', ')}`,
        requiredByFeatures: requiredBy.sort(),
      }))
      .sort((a, b) => a.id.localeCompare(b.id));
  }
}
