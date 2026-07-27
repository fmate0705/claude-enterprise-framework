import type { BusinessAnalysis } from '../analysis/index.js';
import type { FeaturePlan } from '../features/index.js';

export interface CoreWebVitalsTargets {
  /** Largest Contentful Paint, milliseconds. */
  readonly lcpMs: number;
  /** Cumulative Layout Shift, unitless. */
  readonly cls: number;
  /** Interaction to Next Paint, milliseconds. */
  readonly inpMs: number;
}

export interface PerformancePlan {
  readonly renderingStrategy: string;
  readonly imageStrategy: string;
  readonly cachingStrategy: string;
  readonly lazyLoading: readonly string[];
  readonly codeSplitting: readonly string[];
  readonly coreWebVitals: CoreWebVitalsTargets;
  readonly jsBudgetKb: number;
}

/**
 * Determines the performance plan from the project's complexity and features: rendering, image,
 * and caching strategies, lazy-loading and code-splitting rules, and hard Core Web Vitals targets.
 * The CWV targets are the "good" thresholds and are treated as budgets, not aspirations.
 */
export class PerformancePlanner {
  plan(business: BusinessAnalysis, features: readonly FeaturePlan[]): PerformancePlan {
    const interactive = features.some((feature) =>
      ['payments', 'authentication', 'search', 'admin', 'ai-features'].includes(feature.id),
    );
    return {
      renderingStrategy: interactive
        ? 'Server-first with client islands for interactive regions; stream slow data.'
        : 'Static generation (SSG) with incremental revalidation where content changes.',
      imageStrategy:
        'AVIF/WebP with explicit dimensions, responsive sizes, and a prioritized LCP image.',
      cachingStrategy: interactive
        ? 'Cache static shells at the edge; revalidate dynamic data with explicit TTLs.'
        : 'Aggressive edge caching with revalidation on content change.',
      lazyLoading: [
        'Lazy-load below-the-fold media.',
        'Defer non-critical scripts.',
        'Load heavy widgets (maps, charts) on interaction or when in view.',
      ],
      codeSplitting: [
        'Route-level code splitting by default.',
        'Dynamically import heavy, rarely-used components.',
        'Keep third-party scripts off the critical path.',
      ],
      coreWebVitals: { lcpMs: 2500, cls: 0.1, inpMs: 200 },
      jsBudgetKb:
        business.complexity === 'high' ? 200 : business.complexity === 'medium' ? 150 : 100,
    };
  }
}
