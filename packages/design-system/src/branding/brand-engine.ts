import { IconEngine, type IconStyle } from '../icons/index.js';
import { ThemeEngine } from '../themes/index.js';
import { TypographyEngine } from '../typography/index.js';

export type RadiusStyle = 'sharp' | 'rounded' | 'pill';
export type ButtonStyle = 'solid' | 'soft' | 'outline';
export type MotionStyle = 'restrained' | 'balanced' | 'expressive';

export interface BrandInput {
  readonly name: string;
  /** Industry theme id (e.g. "legal"); falls back to the base theme. */
  readonly themeId?: string;
  readonly personality?: readonly string[];
  /** Typography pairing id from the {@link TypographyEngine}. */
  readonly pairingId?: string;
}

/** The structured brand identity stored at `.cef/design/brand.json`. */
export interface BrandIdentity {
  readonly name: string;
  readonly personality: readonly string[];
  readonly colors: {
    readonly primary: string;
    readonly accent: string;
  };
  readonly typography: {
    readonly heading: string;
    readonly body: string;
    readonly pairingId: string;
  };
  readonly radiusStyle: RadiusStyle;
  readonly buttonStyle: ButtonStyle;
  readonly iconStyle: IconStyle;
  readonly motionStyle: MotionStyle;
  readonly illustrationStyle: string;
  readonly photographyStyle: string;
  readonly voiceTone: {
    readonly voice: string;
    readonly tone: string;
  };
  readonly metadata: {
    readonly themeId: string;
    readonly generatedFrom: string;
  };
}

/** Where the brand identity is stored. */
export const BRAND_PATH = '.cef/design/brand.json';

/**
 * Generates a brand identity as structured metadata — colors, typography, radius/button/icon/
 * motion style, illustration and photography direction, and voice and tone — derived
 * deterministically from a theme and a personality. It is data, not visuals: the single record
 * every generated surface reads its brand from.
 */
export class BrandEngine {
  constructor(
    private readonly themes: ThemeEngine = new ThemeEngine(),
    private readonly typography: TypographyEngine = new TypographyEngine(),
    private readonly icons: IconEngine = new IconEngine(),
  ) {}

  generate(input: BrandInput): BrandIdentity {
    const theme = this.themes.get(input.themeId ?? 'base') ?? this.themes.baseTheme();
    const pairing = this.typography.pairing(input.pairingId ?? '') ?? this.typography.pairings()[0];
    const personality =
      input.personality && input.personality.length > 0
        ? input.personality
        : ['clear', 'trustworthy', 'modern'];
    const expressive = personality.some((trait) =>
      ['bold', 'playful', 'creative', 'expressive'].includes(trait.toLowerCase()),
    );

    return {
      name: input.name,
      personality,
      colors: { primary: theme.light.primary, accent: theme.light.accent },
      typography: {
        heading: pairing?.heading ?? 'Inter',
        body: pairing?.body ?? 'Inter',
        pairingId: pairing?.id ?? 'inter-inter',
      },
      radiusStyle: this.radiusStyle(theme.tokenOverride?.radius?.md),
      buttonStyle: expressive ? 'solid' : 'soft',
      iconStyle: this.icons.defaultStyle(),
      motionStyle: expressive ? 'expressive' : 'restrained',
      illustrationStyle: expressive ? 'Bold, geometric, brand-colored' : 'Minimal line work',
      photographyStyle: expressive ? 'Vivid, editorial' : 'Natural, documentary',
      voiceTone: this.voiceTone(personality),
      metadata: { themeId: theme.id, generatedFrom: 'cef design brand' },
    };
  }

  serialize(brand: BrandIdentity): string {
    return `${JSON.stringify(brand, null, 2)}\n`;
  }

  private radiusStyle(mediumRadius: string | undefined): RadiusStyle {
    if (mediumRadius === undefined) {
      return 'rounded';
    }
    if (mediumRadius === '0' || mediumRadius === '0.25rem') {
      return 'sharp';
    }
    if (mediumRadius === '1rem' || mediumRadius === '1.5rem') {
      return 'pill';
    }
    return 'rounded';
  }

  private voiceTone(personality: readonly string[]): { voice: string; tone: string } {
    const traits = personality.map((trait) => trait.toLowerCase());
    if (traits.includes('luxury') || traits.includes('elegant')) {
      return { voice: 'Refined and understated', tone: 'Confident, quiet, precise' };
    }
    if (traits.includes('bold') || traits.includes('playful')) {
      return { voice: 'Direct and energetic', tone: 'Warm, punchy, human' };
    }
    return { voice: 'Clear and professional', tone: 'Helpful, plain, trustworthy' };
  }
}
