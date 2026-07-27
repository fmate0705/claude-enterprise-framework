import { BlueprintGenerator, normalizeInput, type Blueprint } from '@cef/intelligence';
import type { GenerationOptions } from '../models/index.js';

export const FIXED_TIMESTAMP = '2026-07-27T00:00:00.000Z';

/** A generated blueprint for a Hungarian legal project, used across the generator tests. */
export function legalBlueprint(): Blueprint {
  return new BlueprintGenerator().generate(
    normalizeInput({
      projectName: 'Acme Law',
      projectType: 'landing-page',
      description:
        'A law firm website offering legal services with client intake, attorneys, and practice areas.',
      targetCountry: 'HU',
      targetLanguage: 'hu',
      budgetLevel: 'premium',
    }),
    FIXED_TIMESTAMP,
  );
}

/** Generation options paired with {@link legalBlueprint}. */
export function legalOptions(): GenerationOptions {
  return {
    projectName: 'Acme Law',
    framework: 'nextjs',
    presetId: 'premium',
    themeId: 'legal',
    baseUrl: 'https://acme.law',
    generatedAt: FIXED_TIMESTAMP,
  };
}
