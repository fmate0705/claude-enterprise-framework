import type { ProjectInput } from '../input.js';
import { isEuCountry } from '../audience/index.js';
import type { FeaturePlan } from '../features/index.js';

export interface LegalPage {
  readonly id: string;
  readonly name: string;
  readonly required: boolean;
  readonly reason: string;
}

export interface LegalPlan {
  readonly requiredPages: readonly LegalPage[];
  readonly gdprConsiderations: readonly string[];
  /** The mandatory professional-review disclaimer. */
  readonly disclaimer: string;
}

const DISCLAIMER =
  'Generated legal text is a draft only. It MUST be reviewed by a qualified legal professional ' +
  'before publication; CEF does not provide legal advice.';

/**
 * Determines the legal requirements for a project from its target country and features. It covers
 * the standard policies, GDPR for the EU, and the Hungarian-specific pages (Impresszum, ÁSZF,
 * Adatkezelési Tájékoztató, Cookie Tájékoztató). It always attaches the mandatory disclaimer that
 * generated legal text requires review by a qualified legal professional.
 */
export class LegalPlanner {
  plan(input: ProjectInput, features: readonly FeaturePlan[]): LegalPlan {
    const country = input.targetCountry.toUpperCase();
    const eu = isEuCountry(country);
    const collectsData = features.some((feature) =>
      ['contact-forms', 'authentication', 'payments', 'newsletter', 'analytics'].includes(
        feature.id,
      ),
    );
    const sellsOnline = features.some((feature) => feature.id === 'payments');

    const pages: LegalPage[] = [
      {
        id: 'privacy-policy',
        name: 'Privacy Policy',
        required: true,
        reason: 'Standard disclosure of data handling.',
      },
      {
        id: 'terms',
        name: 'Terms of Service',
        required: true,
        reason: 'Governs use of the site and services.',
      },
      {
        id: 'cookie-policy',
        name: 'Cookie Policy',
        required: collectsData,
        reason: 'Required where cookies or tracking are used.',
      },
    ];

    if (country === 'HU') {
      pages.push(
        {
          id: 'impresszum',
          name: 'Impresszum',
          required: true,
          reason: 'Hungarian law requires site operator identification.',
        },
        {
          id: 'aszf',
          name: 'ÁSZF (Általános Szerződési Feltételek)',
          required: sellsOnline,
          reason: 'Required for Hungarian online sales.',
        },
        {
          id: 'adatkezelesi-tajekoztato',
          name: 'Adatkezelési Tájékoztató',
          required: true,
          reason: 'Hungarian GDPR data-processing notice.',
        },
        {
          id: 'cookie-tajekoztato',
          name: 'Cookie Tájékoztató',
          required: collectsData,
          reason: 'Hungarian cookie notice.',
        },
      );
    }

    const gdpr = eu
      ? [
          'Lawful basis for each processing purpose.',
          'Explicit, granular cookie/consent management before non-essential tracking.',
          'Data subject rights (access, erasure, portability) documented.',
          'Data processing agreements with third-party processors.',
        ]
      : ['Follow applicable local data-protection law.'];

    return { requiredPages: pages, gdprConsiderations: gdpr, disclaimer: DISCLAIMER };
  }
}
