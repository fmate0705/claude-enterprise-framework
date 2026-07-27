import type { ProjectInput } from '../input.js';
import type { IndustryProfile } from '../industry/index.js';
import { PRIORITY_RANK, type Priority } from '../types/index.js';
import { PAGE_CATALOG, type SeoImportance } from './page-catalog.js';

/** A planned page: why it exists and what it is built from. */
export interface PagePlan {
  readonly id: string;
  readonly name: string;
  readonly purpose: string;
  readonly priority: Priority;
  readonly seoImportance: SeoImportance;
  readonly sections: readonly string[];
  readonly components: readonly string[];
  readonly dependencies: readonly string[];
  readonly rationale: string;
}

/** Feature ids that imply additional pages beyond the industry's typical set. */
const FEATURE_PAGES: Readonly<Record<string, readonly string[]>> = {
  authentication: ['login', 'signup'],
  payments: ['pricing'],
  cms: ['blog'],
  admin: ['admin', 'dashboard'],
  booking: ['contact'],
};

/**
 * Determines the required pages for a project by combining the industry's typical pages, the
 * planned features, and the mandatory legal page. Each page carries its purpose, priority, SEO
 * importance, sections, components, and the reason it exists — so the plan explains itself.
 */
export class PagePlanner {
  plan(
    input: ProjectInput,
    profile: IndustryProfile,
    featureIds: readonly string[],
  ): readonly PagePlan[] {
    const ids = new Set<string>(profile.typicalPages);
    ids.add('home');
    ids.add('contact');
    ids.add('legal');
    for (const feature of featureIds) {
      for (const page of FEATURE_PAGES[feature] ?? []) {
        ids.add(page);
      }
    }

    const plans = [...ids]
      .map((id) => this.toPlan(id, profile))
      .filter((plan): plan is PagePlan => plan !== undefined);

    return plans.sort(
      (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || a.id.localeCompare(b.id),
    );
  }

  private toPlan(id: string, profile: IndustryProfile): PagePlan | undefined {
    const definition = PAGE_CATALOG[id];
    if (!definition) {
      return undefined;
    }
    const dependencies = id === 'home' ? [] : ['home'];
    return {
      id,
      name: definition.name,
      purpose: definition.purpose,
      priority: definition.priority,
      seoImportance: definition.seoImportance,
      sections: definition.sections,
      components: definition.components,
      dependencies,
      rationale: `Expected for ${profile.name.toLowerCase()}: ${definition.purpose.toLowerCase()}`,
    };
  }
}
