/** The approval workflow states, in lifecycle order. */
export const APPROVAL_STATES = [
  'draft',
  'internal-review',
  'qa-passed',
  'client-review',
  'revision-requested',
  'approved',
  'ready-for-production',
  'released',
] as const;

export type ApprovalState = (typeof APPROVAL_STATES)[number];

/** A permitted transition, with any guard it requires. */
export interface Transition {
  readonly from: ApprovalState;
  readonly to: ApprovalState;
  /** Whether the QA gates must have passed to take this transition. */
  readonly requiresQaPassed: boolean;
  /** Whether a human actor must authorize this transition (human-in-the-loop). */
  readonly requiresHuman: boolean;
}

/**
 * The allowed transitions. Reaching `qa-passed` requires the QA gates to pass; reaching `approved`
 * and `released` requires a human actor. There is no transition that advances to approval or
 * release automatically — production approval is always human-in-the-loop.
 */
export const TRANSITIONS: readonly Transition[] = [
  { from: 'draft', to: 'internal-review', requiresQaPassed: false, requiresHuman: false },
  { from: 'internal-review', to: 'qa-passed', requiresQaPassed: true, requiresHuman: false },
  {
    from: 'internal-review',
    to: 'revision-requested',
    requiresQaPassed: false,
    requiresHuman: false,
  },
  { from: 'qa-passed', to: 'client-review', requiresQaPassed: false, requiresHuman: false },
  { from: 'client-review', to: 'approved', requiresQaPassed: true, requiresHuman: true },
  {
    from: 'client-review',
    to: 'revision-requested',
    requiresQaPassed: false,
    requiresHuman: false,
  },
  {
    from: 'revision-requested',
    to: 'internal-review',
    requiresQaPassed: false,
    requiresHuman: false,
  },
  { from: 'approved', to: 'ready-for-production', requiresQaPassed: true, requiresHuman: false },
  { from: 'ready-for-production', to: 'released', requiresQaPassed: true, requiresHuman: true },
];

export function transitionFor(from: ApprovalState, to: ApprovalState): Transition | undefined {
  return TRANSITIONS.find((transition) => transition.from === from && transition.to === to);
}

export function nextStates(from: ApprovalState): readonly ApprovalState[] {
  return TRANSITIONS.filter((transition) => transition.from === from).map((t) => t.to);
}
