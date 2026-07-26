import { baseTokens } from '../tokens/index.js';
import type { TypeStep, TypographyTokens } from '../tokens/index.js';

/** A recommended, purpose-tested font pairing. */
export interface FontPairing {
  readonly id: string;
  readonly heading: string;
  readonly body: string;
  readonly personality: string;
}

/** Common modular-scale ratios, named. */
export const TYPE_RATIOS = {
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  goldenRatio: 1.618,
} as const;

export type TypeRatioName = keyof typeof TYPE_RATIOS;

/**
 * Owns typographic decisions: generating a modular scale from a base size and ratio, validating
 * that a scale is monotonic, and recommending proven font pairings. Sizes are computed, never
 * hand-picked per project, so type stays systematic.
 */
export class TypographyEngine {
  private static readonly PAIRINGS: readonly FontPairing[] = [
    {
      id: 'inter-inter',
      heading: 'Inter',
      body: 'Inter',
      personality: 'Neutral, modern, versatile',
    },
    {
      id: 'fraunces-inter',
      heading: 'Fraunces',
      body: 'Inter',
      personality: 'Editorial, warm, premium',
    },
    {
      id: 'playfair-source',
      heading: 'Playfair Display',
      body: 'Source Sans 3',
      personality: 'Luxury, elegant',
    },
    {
      id: 'space-grotesk-inter',
      heading: 'Space Grotesk',
      body: 'Inter',
      personality: 'Technical, contemporary',
    },
    {
      id: 'lora-inter',
      heading: 'Lora',
      body: 'Inter',
      personality: 'Trustworthy, legal, corporate',
    },
  ];

  /** Builds an 11-step scale (xs…7xl) from a base rem and a ratio, rounded to 3 decimals. */
  buildScale(baseRem = 1, ratio: number = TYPE_RATIOS.majorThird): TypographyTokens['scale'] {
    const steps: Array<keyof TypographyTokens['scale']> = [
      'xs',
      'sm',
      'base',
      'lg',
      'xl',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
      '6xl',
      '7xl',
    ];
    // `base` sits at index 2, so xs and sm step below it.
    const baseIndex = 2;
    const source = baseTokens.typography.scale;
    const entries = steps.map((name, index) => {
      const sizeRem = round(baseRem * ratio ** (index - baseIndex));
      const reference: TypeStep = source[name];
      return [name, { ...reference, sizeRem }] as const;
    });
    return Object.fromEntries(entries) as unknown as TypographyTokens['scale'];
  }

  /** True when the scale increases strictly from xs to 7xl. */
  isMonotonic(scale: TypographyTokens['scale']): boolean {
    const sizes = Object.values(scale).map((step) => step.sizeRem);
    return sizes.every((size, index) => index === 0 || size > (sizes[index - 1] ?? 0));
  }

  pairings(): readonly FontPairing[] {
    return TypographyEngine.PAIRINGS;
  }

  pairing(id: string): FontPairing | undefined {
    return TypographyEngine.PAIRINGS.find((pairing) => pairing.id === id);
  }

  /** The recommended body measure (characters per line). */
  measureCh(): { readonly min: number; readonly max: number } {
    return { min: 45, max: 75 };
  }
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}
