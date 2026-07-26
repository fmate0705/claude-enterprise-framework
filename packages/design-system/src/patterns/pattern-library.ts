import type { LayoutKind } from '../layouts/index.js';

/** A composition pattern: a proven page recipe binding a layout to the components it emphasizes. */
export interface CompositionPattern {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly layout: LayoutKind;
  /** Component ids this pattern leads with, in order of prominence. */
  readonly emphasis: readonly string[];
}

/**
 * A library of proven composition patterns. Patterns describe how approved components are arranged
 * for a given intent, so page assembly starts from a known-good recipe rather than an improvisation.
 */
export class PatternLibrary {
  private static readonly PATTERNS: readonly CompositionPattern[] = [
    {
      id: 'hero-led-landing',
      name: 'Hero-led landing',
      description: 'Lead with the value proposition, then prove and convert.',
      layout: 'landing',
      emphasis: ['hero', 'features', 'testimonials', 'cta'],
    },
    {
      id: 'proof-heavy-saas',
      name: 'Proof-heavy SaaS',
      description: 'Foreground social proof and pricing for a product-led site.',
      layout: 'saas',
      emphasis: ['hero', 'logos', 'testimonials', 'pricing'],
    },
    {
      id: 'trust-corporate',
      name: 'Trust corporate',
      description: 'Credibility-forward layout for established companies.',
      layout: 'corporate',
      emphasis: ['hero', 'stats', 'team', 'cta'],
    },
    {
      id: 'editorial-blog',
      name: 'Editorial blog',
      description: 'Readable, article-first listing and reading experience.',
      layout: 'blog',
      emphasis: ['blog-card', 'hero'],
    },
    {
      id: 'storefront',
      name: 'Storefront',
      description: 'Product-forward commerce with social proof.',
      layout: 'commerce',
      emphasis: ['commerce', 'testimonials'],
    },
    {
      id: 'docs-reference',
      name: 'Docs reference',
      description: 'Persistent navigation with scannable answers.',
      layout: 'documentation',
      emphasis: ['admin', 'faq'],
    },
  ];

  all(): readonly CompositionPattern[] {
    return PatternLibrary.PATTERNS;
  }

  get(id: string): CompositionPattern | undefined {
    return PatternLibrary.PATTERNS.find((pattern) => pattern.id === id);
  }

  byLayout(layout: LayoutKind): readonly CompositionPattern[] {
    return PatternLibrary.PATTERNS.filter((pattern) => pattern.layout === layout);
  }
}
