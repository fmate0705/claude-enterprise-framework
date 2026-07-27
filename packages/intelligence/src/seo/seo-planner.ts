import type { ProjectInput } from '../input.js';
import type { IndustryProfile } from '../industry/index.js';
import type { PagePlan } from '../pages/index.js';

export interface ContentCluster {
  readonly pillar: string;
  readonly supporting: readonly string[];
}

export interface SchemaRecommendation {
  readonly page: string;
  readonly schemaType: string;
}

export interface SEOStrategy {
  readonly primaryKeywords: readonly string[];
  readonly secondaryKeywords: readonly string[];
  readonly contentClusters: readonly ContentCluster[];
  readonly schemaRecommendations: readonly SchemaRecommendation[];
  readonly internalLinkingPlan: readonly string[];
  readonly canonicalStrategy: string;
  readonly metaStrategy: string;
  readonly structuredDataPlan: readonly string[];
}

/** Maps a page id to the JSON-LD schema type it should emit. */
const PAGE_SCHEMA: Readonly<Record<string, string>> = {
  home: 'Organization',
  about: 'AboutPage',
  services: 'Service',
  'practice-areas': 'Service',
  pricing: 'Offer',
  products: 'Product',
  'product-detail': 'Product',
  blog: 'Blog',
  faq: 'FAQPage',
  contact: 'ContactPage',
  'case-studies': 'Article',
  courses: 'Course',
  team: 'Person',
  attorneys: 'Person',
};

/**
 * Generates the SEO strategy from the industry's topics, the project's own keywords, and the page
 * plan. Keywords come from the description and industry — never invented traffic numbers — and
 * schema recommendations are derived per page type. Deterministic and honest.
 */
export class SEOPlanner {
  plan(input: ProjectInput, profile: IndustryProfile, pages: readonly PagePlan[]): SEOStrategy {
    const descriptiveTerms = this.terms(input.description);
    const primary = this.unique([
      input.projectName.toLowerCase(),
      ...descriptiveTerms.slice(0, 3),
      profile.name.toLowerCase(),
    ]).slice(0, 5);

    const secondary = this.unique([...profile.seoTopics, ...descriptiveTerms.slice(3, 8)]).slice(
      0,
      8,
    );

    const clusters: ContentCluster[] = profile.seoTopics.slice(0, 3).map((pillar) => ({
      pillar,
      supporting: profile.contentOpportunities.slice(0, 3),
    }));

    const schemaRecommendations = pages
      .map((page) => {
        const schemaType = PAGE_SCHEMA[page.id];
        return schemaType ? { page: page.id, schemaType } : undefined;
      })
      .filter((entry): entry is SchemaRecommendation => entry !== undefined);

    return {
      primaryKeywords: primary,
      secondaryKeywords: secondary,
      contentClusters: clusters,
      schemaRecommendations,
      internalLinkingPlan: [
        'Link the home page to every top-priority page with descriptive anchors.',
        'Link supporting content back to its pillar page.',
        'Cross-link related services, features, or products.',
        'Every page links to a conversion page.',
      ],
      canonicalStrategy:
        'Each page self-canonicalizes to its absolute URL; no cross-page canonicals.',
      metaStrategy: 'Unique title (≤60 chars) and description (≤160 chars) per page, keyword-led.',
      structuredDataPlan: this.unique(schemaRecommendations.map((entry) => entry.schemaType)),
    };
  }

  /** Extracts meaningful lowercase terms from free text, dropping stop words and short tokens. */
  private terms(text: string): readonly string[] {
    const stop = new Set([
      'the',
      'a',
      'an',
      'and',
      'or',
      'for',
      'to',
      'of',
      'in',
      'on',
      'with',
      'that',
      'this',
      'our',
      'we',
      'is',
      'are',
      'be',
      'by',
      'as',
      'at',
      'from',
      'your',
      'you',
    ]);
    return this.unique(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((word) => word.length > 3 && !stop.has(word)),
    );
  }

  private unique(values: readonly string[]): readonly string[] {
    return [...new Set(values.filter((value) => value.length > 0))];
  }
}
