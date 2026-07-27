import { normalizeInput, type ProjectInput } from '../input.js';

/** A representative legal-industry, Hungarian, premium project input for tests. */
export function legalInput(overrides: Partial<ProjectInput> = {}): ProjectInput {
  return normalizeInput({
    projectName: 'Acme Law',
    projectType: 'landing-page',
    description:
      'A law firm website offering legal services with client intake, attorneys, and practice areas.',
    targetCountry: 'HU',
    targetLanguage: 'hu',
    budgetLevel: 'premium',
    timeline: 'normal',
    ...overrides,
  });
}

/** A representative SaaS project input for tests. */
export function saasInput(overrides: Partial<ProjectInput> = {}): ProjectInput {
  return normalizeInput({
    projectName: 'Flowdesk',
    projectType: 'saas',
    description:
      'A SaaS platform with subscription billing, user authentication, search, and a dashboard.',
    targetCountry: 'US',
    targetLanguage: 'en',
    budgetLevel: 'standard',
    timeline: 'rush',
    ...overrides,
  });
}

export const FIXED_TIMESTAMP = '2026-07-27T00:00:00.000Z';
