import type { PagePlan } from '@cef/intelligence';
import type { GenerationContext } from '../models/index.js';

export interface HeroContent {
  readonly title: string;
  readonly subtitle: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

export interface FeatureItem {
  readonly title: string;
  readonly description: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface TestimonialItem {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  /** Placeholder testimonials are explicitly flagged so they are never mistaken for real ones. */
  readonly placeholder: boolean;
}

export interface CtaContent {
  readonly title: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

/** The structured content for one page — the single model both the page and content builders read. */
export interface PageContent {
  readonly hero: HeroContent | undefined;
  readonly features: readonly FeatureItem[];
  readonly faqs: readonly FaqItem[];
  readonly testimonials: readonly TestimonialItem[];
  readonly cta: CtaContent | undefined;
}

/**
 * Derives a page's content model from the blueprint. Both the Content Builder (which serializes it
 * to a typed module) and the Page Builder (which renders it) call this, so page and content never
 * drift. Testimonials are explicit placeholders; nothing else is fabricated.
 */
export function buildPageContent(context: GenerationContext, page: PagePlan): PageContent {
  const components = new Set(page.components);
  const business = context.blueprint.business;
  const summary = context.blueprint.content.pageSummaries.find((s) => s.page === page.id);
  const primaryCta = summary?.primaryCta ?? 'Learn more';
  const ctaHref = context.blueprint.pages.some((p) => p.id === 'contact') ? '/contact' : '/';

  return {
    hero: components.has('hero')
      ? {
          title: page.id === 'home' ? (business.valuePropositions[0] ?? page.name) : page.name,
          subtitle: page.purpose,
          ctaLabel: primaryCta,
          ctaHref,
        }
      : undefined,
    features: components.has('features')
      ? business.valuePropositions.map((value) => ({
          title: capitalize(value),
          description: `How ${context.options.projectName} delivers ${value}.`,
        }))
      : [],
    faqs: components.has('faq') ? faqsFor(context, page) : [],
    testimonials: components.has('testimonials')
      ? [
          {
            quote: 'Placeholder testimonial — replace with a real, attributed client quote.',
            author: 'Placeholder Name',
            role: 'Placeholder Role',
            placeholder: true,
          },
          {
            quote: 'Placeholder testimonial — replace with a real, attributed client quote.',
            author: 'Placeholder Name',
            role: 'Placeholder Role',
            placeholder: true,
          },
        ]
      : [],
    cta: components.has('cta')
      ? {
          title: `Ready to get started with ${context.options.projectName}?`,
          ctaLabel: primaryCta,
          ctaHref,
        }
      : undefined,
  };
}

function faqsFor(context: GenerationContext, page: PagePlan): readonly FaqItem[] {
  const name = context.options.projectName;
  const audience = context.blueprint.audience.personas[0]?.name ?? 'you';
  return [
    { question: `What is ${name}?`, answer: `${page.purpose}` },
    {
      question: `Who is ${name} for?`,
      answer: `${name} serves ${audience.toLowerCase()} and the people they work with.`,
    },
    {
      question: 'How do I get started?',
      answer: `Reach out through the contact page and we will guide you from there.`,
    },
  ];
}

function capitalize(value: string): string {
  return value.length > 0 ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}
