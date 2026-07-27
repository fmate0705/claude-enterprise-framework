import type { ProjectInput } from '../input.js';
import type { IndustryProfile } from '../industry/index.js';

export interface Persona {
  readonly name: string;
  readonly description: string;
  readonly goals: readonly string[];
  readonly painPoints: readonly string[];
  readonly motivations: readonly string[];
}

export interface LocalizationRequirement {
  readonly language: string;
  readonly country: string;
  readonly requirements: readonly string[];
}

export interface AudienceAnalysis {
  readonly personas: readonly Persona[];
  readonly userGoals: readonly string[];
  readonly painPoints: readonly string[];
  readonly motivations: readonly string[];
  readonly devices: readonly string[];
  readonly accessibilityExpectations: readonly string[];
  readonly localization: LocalizationRequirement;
}

/**
 * Derives the target audience from the industry profile and the project's locale: two archetypal
 * personas (a decision-maker and an end user), their goals and pain points, expected devices, and
 * localization requirements. Deterministic — the same industry and locale always yield the same
 * audience model.
 */
export class AudienceAnalyzer {
  analyze(input: ProjectInput, profile: IndustryProfile): AudienceAnalysis {
    const personas = this.personas(profile);
    return {
      personas,
      userGoals: this.unique(personas.flatMap((persona) => persona.goals)),
      painPoints: this.unique(personas.flatMap((persona) => persona.painPoints)),
      motivations: this.unique(personas.flatMap((persona) => persona.motivations)),
      devices: ['mobile', 'desktop', 'tablet'],
      accessibilityExpectations: [
        'Keyboard and screen-reader operability',
        'Sufficient color contrast (WCAG 2.2 AA)',
        'Respect for reduced-motion preferences',
      ],
      localization: this.localization(input),
    };
  }

  private personas(profile: IndustryProfile): readonly Persona[] {
    const conversions = profile.conversions;
    return [
      {
        name: 'The Decision Maker',
        description: `Evaluates ${profile.name.toLowerCase()} options and controls the ${conversions[0] ?? 'purchase'}.`,
        goals: [
          `Confirm ${profile.name.toLowerCase()} fit`,
          'Compare options',
          'Justify the choice',
        ],
        painPoints: ['Unclear value', 'Hidden costs', 'Weak proof'],
        motivations: profile.valuePropositions.slice(0, 2),
      },
      {
        name: 'The End User',
        description: `Uses the ${profile.name.toLowerCase()} offering day to day.`,
        goals: ['Accomplish the task quickly', 'Understand how it works', 'Get help when stuck'],
        painPoints: ['Friction and confusion', 'Slow pages', 'Inaccessible interfaces'],
        motivations: ['Ease of use', 'Reliability', 'Speed'],
      },
    ];
  }

  private localization(input: ProjectInput): LocalizationRequirement {
    const requirements: string[] = [`Primary language: ${input.targetLanguage}`];
    if (input.targetCountry.toUpperCase() === 'HU') {
      requirements.push('Hungarian legal pages required', 'Local formats (dates, currency HUF)');
    }
    if (isEuCountry(input.targetCountry)) {
      requirements.push('GDPR-compliant consent and privacy');
    }
    return { language: input.targetLanguage, country: input.targetCountry, requirements };
  }

  private unique(values: readonly string[]): readonly string[] {
    return [...new Set(values)];
  }
}

const EU_COUNTRIES = new Set([
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
]);

export function isEuCountry(country: string): boolean {
  return EU_COUNTRIES.has(country.toUpperCase());
}
