/** Modular prompt model: Claude receives only the fragments relevant to the current task. */

/** The prompt fragment categories the builder knows how to assemble. */
export const PROMPT_CATEGORIES = [
  'architecture',
  'seo',
  'frontend',
  'motion',
  'accessibility',
  'docker',
  'testing',
  'performance',
] as const;

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];

export interface PromptFragment {
  readonly category: PromptCategory;
  readonly title: string;
  readonly body: string;
}

/** A request for a task-scoped prompt: only these categories are included. */
export interface PromptRequest {
  readonly categories: readonly PromptCategory[];
  /** Optional task description prepended as the objective. */
  readonly objective: string | undefined;
}

/** The assembled prompt: the selected fragments, the rendered text, and its token cost. */
export interface BuiltPrompt {
  readonly fragments: readonly PromptFragment[];
  readonly text: string;
  readonly tokenEstimate: number;
}
