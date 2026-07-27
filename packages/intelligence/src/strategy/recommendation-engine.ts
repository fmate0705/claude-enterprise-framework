import type { BusinessAnalysis } from '../analysis/index.js';
import type { FeatureMatrix } from '../features/index.js';
import type { ProjectInput } from '../input.js';
import type { PagePlan } from '../pages/index.js';
import { PRIORITY_RANK, type Priority } from '../types/index.js';

export interface Recommendation {
  readonly id: string;
  readonly priority: Priority;
  readonly title: string;
  readonly detail: string;
}

/**
 * Synthesizes prioritized, cross-cutting recommendations from the assembled analysis and plans.
 * These are the "do this first" directives that tie the blueprint together — deterministic and
 * ordered by priority so the most important guidance leads.
 */
export class RecommendationEngine {
  recommend(
    input: ProjectInput,
    business: BusinessAnalysis,
    pages: readonly PagePlan[],
    matrix: FeatureMatrix,
  ): readonly Recommendation[] {
    const recommendations: Recommendation[] = [];
    const criticalPages = pages.filter((page) => page.priority === 'critical');

    recommendations.push({
      id: 'lead-value',
      priority: 'high',
      title: 'Lead with the strongest value proposition',
      detail: `Foreground "${business.valuePropositions[0] ?? 'the core benefit'}" on the home hero.`,
    });

    if (criticalPages.length > 0) {
      recommendations.push({
        id: 'critical-first',
        priority: 'critical',
        title: 'Build the critical path first',
        detail: `Ship ${criticalPages.map((page) => page.name).join(', ')} before secondary pages.`,
      });
    }

    recommendations.push({
      id: 'accessibility-first',
      priority: 'high',
      title: 'Build accessible components from the first line',
      detail: 'Meeting WCAG 2.2 AA up front is far cheaper than retrofitting it.',
    });

    recommendations.push({
      id: 'measure-early',
      priority: 'medium',
      title: 'Instrument analytics from day one',
      detail: `Track ${business.conversions[0] ?? 'the primary conversion'} to learn what works.`,
    });

    if (input.timeline === 'rush') {
      recommendations.push({
        id: 'phase-scope',
        priority: 'high',
        title: 'Phase the scope for the timeline',
        detail: 'Deliver a focused MVP of the critical path, then iterate.',
      });
    }

    const highComplexity = matrix.features.filter((feature) => feature.complexity === 'high');
    if (highComplexity.length > 0) {
      recommendations.push({
        id: 'sequence-complex',
        priority: 'medium',
        title: 'Sequence high-complexity features',
        detail: `Integrate ${highComplexity.map((feature) => feature.name).join(', ')} incrementally.`,
      });
    }

    return recommendations.sort(
      (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || a.id.localeCompare(b.id),
    );
  }
}
