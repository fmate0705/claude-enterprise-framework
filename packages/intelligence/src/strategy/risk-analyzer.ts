import type { BusinessAnalysis } from '../analysis/index.js';
import type { FeaturePlan } from '../features/index.js';
import type { ProjectInput } from '../input.js';
import type { LegalPlan } from '../legal/index.js';
import type { Severity } from '../types/index.js';

export interface Risk {
  readonly id: string;
  readonly description: string;
  readonly severity: Severity;
  readonly mitigation: string;
}

/**
 * Surfaces project risks by cross-checking scope against constraints: budget/timeline versus
 * complexity, high-complexity features, and unmet legal requirements. Each risk carries a
 * concrete mitigation so the plan is actionable rather than merely cautionary.
 */
export class RiskAnalyzer {
  analyze(
    input: ProjectInput,
    business: BusinessAnalysis,
    features: readonly FeaturePlan[],
    legal: LegalPlan,
  ): readonly Risk[] {
    const risks: Risk[] = [];

    if (business.complexity === 'high' && input.timeline === 'rush') {
      risks.push({
        id: 'timeline-scope',
        description: 'High complexity on a rushed timeline risks cut corners.',
        severity: 'error',
        mitigation: 'Descope to a phased MVP; ship the critical path first.',
      });
    }
    if (business.complexity === 'high' && input.budgetLevel === 'lean') {
      risks.push({
        id: 'budget-scope',
        description: 'Lean budget against high complexity risks incomplete quality.',
        severity: 'warning',
        mitigation:
          'Prioritize floors (accessibility, security, performance) and defer nice-to-haves.',
      });
    }

    const highComplexity = features.filter((feature) => feature.complexity === 'high');
    if (highComplexity.length >= 3) {
      risks.push({
        id: 'feature-load',
        description: `${highComplexity.length} high-complexity features increase integration risk.`,
        severity: 'warning',
        mitigation: 'Sequence high-complexity features across milestones; integrate incrementally.',
      });
    }

    if (features.some((feature) => feature.id === 'payments')) {
      risks.push({
        id: 'payments-compliance',
        description: 'Payments introduce PCI and security obligations.',
        severity: 'warning',
        mitigation: 'Use a hosted payment provider; never handle raw card data.',
      });
    }

    const unmetLegal = legal.requiredPages.filter((page) => page.required);
    if (unmetLegal.length > 0) {
      risks.push({
        id: 'legal-review',
        description: `${unmetLegal.length} legal pages require professional review before launch.`,
        severity: 'warning',
        mitigation: legal.disclaimer,
      });
    }

    return risks;
  }
}
