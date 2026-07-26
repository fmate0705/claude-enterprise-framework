import { TokenEstimator } from '../compression/index.js';
import {
  PROMPT_CATEGORIES,
  type BuiltPrompt,
  type PromptCategory,
  type PromptFragment,
  type PromptRequest,
} from '../models/index.js';

/**
 * Assembles task-scoped prompts from a fixed catalog of fragments. Claude receives only the
 * fragments relevant to the current task, never a monolithic prompt. The catalog is concise,
 * concrete guidance drawn from the framework's floors and standards — real content, not filler.
 */
export class ClaudePromptBuilder {
  private static readonly CATALOG: Readonly<Record<PromptCategory, PromptFragment>> = {
    architecture: {
      category: 'architecture',
      title: 'Architecture',
      body:
        'Server-first by default; reach for the client only where interaction requires it. One ' +
        'responsibility per module. Read memory before deciding; record significant decisions.',
    },
    seo: {
      category: 'seo',
      title: 'SEO',
      body:
        'Every public page: unique title and description, one canonical URL, valid JSON-LD, Open ' +
        'Graph and Twitter tags, one h1 with ordered headings, and a sitemap entry.',
    },
    frontend: {
      category: 'frontend',
      title: 'Frontend',
      body:
        'Build from design tokens and shared components. Prefer Server Components; justify every ' +
        'client boundary and useEffect. Handle empty, loading, and error states.',
    },
    motion: {
      category: 'motion',
      title: 'Motion',
      body:
        'Admit motion only when it communicates state, hierarchy, or continuity. Keep it within ' +
        'budget (≤300ms, standard easing) and honor prefers-reduced-motion.',
    },
    accessibility: {
      category: 'accessibility',
      title: 'Accessibility',
      body:
        'WCAG 2.2 AA is a floor. Use semantic elements, reachable focus, visible focus rings, ' +
        'accessible names, and 4.5:1 body contrast. Never signal by color alone.',
    },
    docker: {
      category: 'docker',
      title: 'Docker',
      body:
        'Define the environment as code. The production image must build reproducibly from a ' +
        'clean checkout, identically in CI and locally.',
    },
    testing: {
      category: 'testing',
      title: 'Testing',
      body:
        'Test observable behavior, not internals. Cover critical paths plus empty, error, and ' +
        'boundary cases. Keep tests deterministic — control time and network.',
    },
    performance: {
      category: 'performance',
      title: 'Performance',
      body:
        'Core Web Vitals and bundle size are hard budgets. Split and defer non-critical JS, ' +
        'optimize and size images, and swap fonts. Over budget is not done.',
    },
  };

  constructor(private readonly tokens: TokenEstimator = new TokenEstimator()) {}

  /** Returns the fragment for every known category, in canonical order. */
  catalog(): readonly PromptFragment[] {
    return PROMPT_CATEGORIES.map((category) => ClaudePromptBuilder.CATALOG[category]);
  }

  build(request: PromptRequest): BuiltPrompt {
    const seen = new Set<PromptCategory>();
    const fragments: PromptFragment[] = [];
    for (const category of request.categories) {
      if (!seen.has(category)) {
        seen.add(category);
        fragments.push(ClaudePromptBuilder.CATALOG[category]);
      }
    }

    const sections: string[] = [];
    if (request.objective !== undefined && request.objective.trim().length > 0) {
      sections.push(`## Objective\n${request.objective.trim()}`);
    }
    for (const fragment of fragments) {
      sections.push(`## ${fragment.title}\n${fragment.body}`);
    }
    const text = sections.join('\n\n');
    return { fragments, text, tokenEstimate: this.tokens.estimate(text) };
  }
}
