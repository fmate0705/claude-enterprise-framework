import type { ProjectInput } from '../input.js';
import { GENERIC_PROFILE, INDUSTRY_CATALOG } from './catalog.js';
import type { IndustryId, IndustryProfile } from './types.js';

export interface IndustryClassification {
  readonly profile: IndustryProfile;
  /** Keyword-match score behind the classification (0 = fell back to generic). */
  readonly score: number;
  /** The runner-up industries, for transparency. */
  readonly alternatives: readonly IndustryId[];
}

/**
 * Classifies a project into an industry by scoring its description, type, and notes against each
 * profile's keywords. Deterministic and dependency-free: the same text always yields the same
 * industry. Falls back to a general-business profile when nothing matches.
 */
export class IndustryAnalyzer {
  private readonly profiles: readonly IndustryProfile[];

  constructor(profiles: readonly IndustryProfile[] = INDUSTRY_CATALOG) {
    this.profiles = profiles;
  }

  profile(id: IndustryId): IndustryProfile | undefined {
    return this.profiles.find((profile) => profile.id === id);
  }

  classify(input: ProjectInput): IndustryClassification {
    const haystack = [
      input.description,
      input.projectType,
      input.notes ?? '',
      ...input.clientRequirements,
    ]
      .join(' ')
      .toLowerCase();

    const scored = this.profiles
      .filter((profile) => profile.id !== 'generic')
      .map((profile) => ({ profile, score: this.score(profile, haystack) }))
      .sort((a, b) => b.score - a.score || a.profile.id.localeCompare(b.profile.id));

    const best = scored[0];
    if (!best || best.score === 0) {
      return { profile: this.profile('generic') ?? GENERIC_PROFILE, score: 0, alternatives: [] };
    }

    return {
      profile: best.profile,
      score: best.score,
      alternatives: scored
        .slice(1)
        .filter((entry) => entry.score > 0)
        .slice(0, 2)
        .map((entry) => entry.profile.id),
    };
  }

  private score(profile: IndustryProfile, haystack: string): number {
    let score = 0;
    for (const keyword of profile.keywords) {
      if (haystack.includes(keyword)) {
        // Longer, more specific keywords weigh more.
        score += keyword.includes(' ') ? 3 : 2;
      }
    }
    return score;
  }
}
