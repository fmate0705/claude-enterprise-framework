import type { ProjectInput } from '../input.js';
import type { IndustryClassification } from '../industry/index.js';
import type { Complexity } from '../types/index.js';

export interface BusinessAnalysis {
  readonly industry: string;
  readonly industryName: string;
  readonly businessModel: string;
  readonly objectives: readonly string[];
  readonly trustSignals: readonly string[];
  readonly conversions: readonly string[];
  readonly valuePropositions: readonly string[];
  readonly positioning: string;
  readonly complexity: Complexity;
}

const HIGH_COMPLEXITY_TYPES = new Set(['saas', 'dashboard', 'ecommerce', 'admin', 'web-app']);
const LOW_COMPLEXITY_TYPES = new Set(['landing-page', 'portfolio', 'one-pager']);

/**
 * Determines the business dimensions of a project from its input and industry classification:
 * model, objectives, trust signals, conversions, value propositions, positioning, and a
 * complexity estimate. Every output is derived deterministically — no guessing beyond the inputs.
 */
export class BusinessAnalyzer {
  analyze(input: ProjectInput, classification: IndustryClassification): BusinessAnalysis {
    const profile = classification.profile;
    return {
      industry: profile.id,
      industryName: profile.name,
      businessModel: this.businessModel(input, profile.businessModels),
      objectives: this.objectives(input, profile.conversions),
      trustSignals: profile.trustSignals,
      conversions: profile.conversions,
      valuePropositions:
        input.businessGoals.length > 0
          ? this.mergeUnique(profile.valuePropositions, [])
          : profile.valuePropositions,
      positioning: this.positioning(input, profile.name),
      complexity: this.complexity(input),
    };
  }

  private businessModel(input: ProjectInput, models: readonly string[]): string {
    const notes = `${input.description} ${input.notes ?? ''}`.toLowerCase();
    const matched = models.find((model) => notes.includes(model));
    return matched ?? models[0] ?? 'service';
  }

  private objectives(input: ProjectInput, conversions: readonly string[]): readonly string[] {
    if (input.businessGoals.length > 0) {
      return input.businessGoals;
    }
    return conversions.map((conversion) => `Drive ${conversion}`);
  }

  private positioning(input: ProjectInput, industryName: string): string {
    const budget =
      input.budgetLevel === 'premium'
        ? 'a premium, high-craft'
        : input.budgetLevel === 'lean'
          ? 'a focused, efficient'
          : 'a professional';
    return `${input.projectName} is positioned as ${budget} ${industryName.toLowerCase()} presence.`;
  }

  private complexity(input: ProjectInput): Complexity {
    let score = 0;
    if (HIGH_COMPLEXITY_TYPES.has(input.projectType)) {
      score += 2;
    } else if (!LOW_COMPLEXITY_TYPES.has(input.projectType)) {
      score += 1;
    }
    if (input.clientRequirements.length >= 5) {
      score += 1;
    }
    if (input.budgetLevel === 'premium') {
      score += 1;
    }
    if (this.hasHeavyFeatureSignals(input)) {
      score += 1;
    }
    if (score >= 3) {
      return 'high';
    }
    return score >= 1 ? 'medium' : 'low';
  }

  private hasHeavyFeatureSignals(input: ProjectInput): boolean {
    const haystack = [input.description, input.notes ?? '', ...input.clientRequirements]
      .join(' ')
      .toLowerCase();
    return [
      'payment',
      'subscription',
      'authentication',
      'checkout',
      'dashboard',
      'admin',
      'booking',
    ].some((signal) => haystack.includes(signal));
  }

  private mergeUnique(a: readonly string[], b: readonly string[]): readonly string[] {
    return [...new Set([...a, ...b])];
  }
}
