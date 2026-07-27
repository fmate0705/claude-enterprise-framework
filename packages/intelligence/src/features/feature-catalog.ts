import type { Complexity } from '../types/index.js';

export interface FeatureDefinition {
  readonly name: string;
  readonly category: string;
  readonly complexity: Complexity;
  /** Other feature ids this feature depends on. */
  readonly dependsOn: readonly string[];
  /** Description phrases that signal this feature in a project description or requirements. */
  readonly signals: readonly string[];
}

/** The catalog of features the planner can recommend, with complexity and dependencies. */
export const FEATURE_CATALOG: Readonly<Record<string, FeatureDefinition>> = {
  'contact-forms': {
    name: 'Contact Forms',
    category: 'engagement',
    complexity: 'low',
    dependsOn: [],
    signals: ['contact', 'inquiry', 'form', 'lead'],
  },
  search: {
    name: 'Search',
    category: 'discovery',
    complexity: 'medium',
    dependsOn: [],
    signals: ['search', 'find', 'lookup'],
  },
  filtering: {
    name: 'Filtering',
    category: 'discovery',
    complexity: 'medium',
    dependsOn: [],
    signals: ['filter', 'facet', 'sort'],
  },
  authentication: {
    name: 'Authentication',
    category: 'accounts',
    complexity: 'high',
    dependsOn: [],
    signals: ['login', 'account', 'sign up', 'signup', 'auth', 'member'],
  },
  cms: {
    name: 'CMS',
    category: 'content',
    complexity: 'medium',
    dependsOn: [],
    signals: ['cms', 'blog', 'content management', 'editor'],
  },
  payments: {
    name: 'Payments',
    category: 'commerce',
    complexity: 'high',
    dependsOn: ['authentication'],
    signals: ['payment', 'checkout', 'subscription', 'billing', 'buy', 'purchase'],
  },
  booking: {
    name: 'Booking',
    category: 'engagement',
    complexity: 'medium',
    dependsOn: [],
    signals: ['book', 'appointment', 'reservation', 'schedule'],
  },
  maps: {
    name: 'Maps',
    category: 'engagement',
    complexity: 'low',
    dependsOn: [],
    signals: ['map', 'location', 'directions', 'nearby'],
  },
  newsletter: {
    name: 'Newsletter',
    category: 'marketing',
    complexity: 'low',
    dependsOn: [],
    signals: ['newsletter', 'email list', 'subscribe'],
  },
  analytics: {
    name: 'Analytics',
    category: 'measurement',
    complexity: 'low',
    dependsOn: [],
    signals: ['analytics', 'tracking', 'metrics'],
  },
  admin: {
    name: 'Admin',
    category: 'operations',
    complexity: 'high',
    dependsOn: ['authentication'],
    signals: ['admin', 'dashboard', 'back office', 'manage'],
  },
  localization: {
    name: 'Localization',
    category: 'reach',
    complexity: 'medium',
    dependsOn: [],
    signals: ['localization', 'multi-language', 'translate', 'i18n', 'multilingual'],
  },
  'ai-features': {
    name: 'AI Features',
    category: 'intelligence',
    complexity: 'high',
    dependsOn: [],
    signals: ['ai', 'chatbot', 'assistant', 'recommendation', 'generative'],
  },
};
