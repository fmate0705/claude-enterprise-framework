import type { Persona } from '../audience/index.js';
import type { PagePlan } from '../pages/index.js';

export type JourneyStageName = 'awareness' | 'consideration' | 'decision' | 'retention';

export interface JourneyStage {
  readonly stage: JourneyStageName;
  readonly goal: string;
  /** Page ids the persona touches at this stage (only pages that exist in the plan). */
  readonly touchpoints: readonly string[];
}

export interface UserJourney {
  readonly persona: string;
  readonly stages: readonly JourneyStage[];
}

/** Which page ids serve each journey stage, in preference order. */
const STAGE_PAGES: Readonly<Record<JourneyStageName, readonly string[]>> = {
  awareness: ['home', 'blog', 'resources', 'services', 'programs', 'menu'],
  consideration: [
    'services',
    'features',
    'pricing',
    'case-studies',
    'about',
    'faq',
    'portfolio',
    'work',
    'practice-areas',
    'courses',
    'listings',
    'products',
  ],
  decision: [
    'pricing',
    'contact',
    'checkout',
    'signup',
    'donate',
    'reservations',
    'appointments',
    'cart',
    'product-detail',
    'property-detail',
  ],
  retention: ['account', 'dashboard', 'docs', 'blog', 'admin'],
};

const STAGE_GOALS: Readonly<Record<JourneyStageName, string>> = {
  awareness: 'Discover the offering and understand the value',
  consideration: 'Evaluate the fit and compare options',
  decision: 'Commit — convert with confidence',
  retention: 'Return, succeed, and stay engaged',
};

const STAGE_ORDER: readonly JourneyStageName[] = [
  'awareness',
  'consideration',
  'decision',
  'retention',
];

/**
 * Plans a user journey per persona across the awareness → consideration → decision → retention
 * stages, mapping each stage to the pages that actually exist in the plan. Deterministic: given
 * the same personas and pages, the same journeys result.
 */
export class UserJourneyPlanner {
  plan(personas: readonly Persona[], pages: readonly PagePlan[]): readonly UserJourney[] {
    const present = new Set(pages.map((page) => page.id));
    return personas.map((persona) => ({
      persona: persona.name,
      stages: STAGE_ORDER.map((stage) => ({
        stage,
        goal: STAGE_GOALS[stage],
        touchpoints: STAGE_PAGES[stage].filter((id) => present.has(id)),
      })).filter((stage) => stage.touchpoints.length > 0),
    }));
  }
}
