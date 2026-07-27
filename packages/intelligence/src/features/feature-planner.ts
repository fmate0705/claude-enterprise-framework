import type { ProjectInput } from '../input.js';
import type { IndustryProfile } from '../industry/index.js';
import { PRIORITY_RANK, type Complexity, type Priority } from '../types/index.js';
import { FEATURE_CATALOG } from './feature-catalog.js';

export interface FeaturePlan {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly priority: Priority;
  readonly complexity: Complexity;
  readonly dependencies: readonly string[];
  readonly rationale: string;
}

export interface FeatureMatrix {
  readonly features: readonly FeaturePlan[];
}

/**
 * Generates the feature matrix by unioning three sources: the industry's typical features, features
 * signalled by the description and client requirements, and dependencies those features require.
 * Analytics is always included. Each feature carries its priority, complexity, dependencies, and
 * the reason it was selected — deterministically from the inputs.
 */
export class FeaturePlanner {
  plan(input: ProjectInput, profile: IndustryProfile): FeatureMatrix {
    const selected = new Map<string, string>(); // id -> rationale

    for (const id of profile.typicalFeatures) {
      selected.set(id, `Standard for ${profile.name.toLowerCase()}`);
    }
    selected.set('analytics', 'Always measure outcomes');

    const haystack = [
      input.description,
      input.notes ?? '',
      ...input.clientRequirements,
      ...input.businessGoals,
    ]
      .join(' ')
      .toLowerCase();
    for (const [id, definition] of Object.entries(FEATURE_CATALOG)) {
      if (definition.signals.some((signal) => haystack.includes(signal))) {
        selected.set(id, 'Requested in the project brief');
      }
    }

    // Pull in dependencies of selected features.
    for (const id of [...selected.keys()]) {
      for (const dependency of FEATURE_CATALOG[id]?.dependsOn ?? []) {
        if (!selected.has(dependency)) {
          selected.set(dependency, `Required by ${FEATURE_CATALOG[id]?.name ?? id}`);
        }
      }
    }

    const features = [...selected.entries()]
      .map(([id, rationale]) => this.toPlan(id, rationale, profile))
      .filter((plan): plan is FeaturePlan => plan !== undefined)
      .sort(
        (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || a.id.localeCompare(b.id),
      );

    return { features };
  }

  private toPlan(id: string, rationale: string, profile: IndustryProfile): FeaturePlan | undefined {
    const definition = FEATURE_CATALOG[id];
    if (!definition) {
      return undefined;
    }
    return {
      id,
      name: definition.name,
      category: definition.category,
      priority: this.priority(id, definition.complexity, profile),
      complexity: definition.complexity,
      dependencies: definition.dependsOn,
      rationale,
    };
  }

  private priority(id: string, complexity: Complexity, profile: IndustryProfile): Priority {
    if (
      profile.typicalFeatures.includes(id) &&
      (id === 'payments' || id === 'booking' || id === 'search')
    ) {
      return 'critical';
    }
    if (profile.typicalFeatures.includes(id)) {
      return 'high';
    }
    return complexity === 'high' ? 'medium' : 'low';
  }
}
