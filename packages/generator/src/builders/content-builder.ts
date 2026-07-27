import type { GeneratedFile } from '@cef/core';
import type { PagePlan } from '@cef/intelligence';
import { buildPageContent } from '../content/page-content.js';
import { contentExportName, contentFilePath } from '../content/naming.js';
import type { GenerationContext } from '../models/index.js';

/**
 * Stage 6 builder. Serializes each page's content model to a typed module the page imports —
 * headlines, descriptions, CTAs, features, FAQs, and clearly-flagged placeholder testimonials.
 * Content is derived from the blueprint's content strategy, so it stays in lockstep with the pages
 * (both call the same {@link buildPageContent}). Only testimonials are placeholders; nothing else
 * is fabricated.
 */
export class ContentBuilder {
  build(context: GenerationContext): readonly GeneratedFile[] {
    return context.blueprint.pages
      .filter((page) => !page.id.endsWith('-detail'))
      .map((page) => ({
        path: contentFilePath(page.id),
        content: this.module(context, page),
      }));
  }

  private module(context: GenerationContext, page: PagePlan): string {
    const content = buildPageContent(context, page);
    const object: Record<string, unknown> = { intro: page.purpose };
    if (content.hero) {
      object['hero'] = content.hero;
    }
    if (content.features.length > 0) {
      object['features'] = content.features;
    }
    if (content.testimonials.length > 0) {
      object['testimonials'] = content.testimonials;
    }
    if (content.faqs.length > 0) {
      object['faqs'] = content.faqs;
    }
    if (content.cta) {
      object['cta'] = content.cta;
    }

    return [
      `/** Content for the ${page.name} page. Generated from the blueprint content strategy. */`,
      `export const ${contentExportName(page.id)} = ${JSON.stringify(object, null, 2)} as const;`,
      '',
    ].join('\n');
  }
}
