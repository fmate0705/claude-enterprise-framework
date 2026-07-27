/** The input to the Project Intelligence Engine — everything known about a project before any
 * planning happens. It is a plain, serializable value so analysis is a pure function of it. */

export type BudgetLevel = 'lean' | 'standard' | 'premium';
export type Timeline = 'rush' | 'normal' | 'flexible';

export interface ProjectInput {
  readonly projectName: string;
  readonly projectType: string;
  readonly description: string;
  readonly businessGoals: readonly string[];
  readonly clientRequirements: readonly string[];
  readonly framework: string;
  readonly designPreset: string;
  readonly targetCountry: string;
  readonly targetLanguage: string;
  readonly budgetLevel: BudgetLevel;
  readonly timeline: Timeline;
  readonly notes: string | undefined;
}

/** Fills a partial input with sensible, explicit defaults so callers can supply only what they know. */
export function normalizeInput(
  input: Partial<ProjectInput> & { projectName: string },
): ProjectInput {
  return {
    projectName: input.projectName,
    projectType: input.projectType ?? 'landing-page',
    description: input.description ?? '',
    businessGoals: input.businessGoals ?? [],
    clientRequirements: input.clientRequirements ?? [],
    framework: input.framework ?? 'nextjs',
    designPreset: input.designPreset ?? 'premium',
    targetCountry: input.targetCountry ?? 'US',
    targetLanguage: input.targetLanguage ?? 'en',
    budgetLevel: input.budgetLevel ?? 'standard',
    timeline: input.timeline ?? 'normal',
    notes: input.notes,
  };
}
