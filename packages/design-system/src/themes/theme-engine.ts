import { baseTokens } from '../tokens/index.js';
import type { ColorScale, ColorTokens, TokenOverride } from '../tokens/index.js';
import { contrastRatio } from '../accessibility/contrast.js';
import { PALETTES } from './palettes.js';
import type { PaletteName } from './palettes.js';
import type { ColorScheme, SemanticColors, Theme, ThemeCategory } from './types.js';

interface IndustrySpec {
  readonly id: string;
  readonly name: string;
  readonly palette: PaletteName | 'primary';
  readonly accent: string;
  readonly radius: TokenOverride['radius'];
}

/**
 * Generates themes deterministically from the base color scales. Every theme is built by mapping
 * neutral and brand scales onto the semantic roles for light and dark, so a theme never restates
 * raw colors — it selects a palette and inherits the rest. Base (light/dark/system) and a set of
 * industry themes are all produced the same way.
 */
export class ThemeEngine {
  private readonly colors: ColorTokens;

  private static readonly INDUSTRIES: readonly IndustrySpec[] = [
    {
      id: 'luxury',
      name: 'Luxury',
      palette: 'violet',
      accent: '#c8a951',
      radius: { md: '0.25rem' },
    },
    {
      id: 'corporate',
      name: 'Corporate',
      palette: 'primary',
      accent: '#0d9488',
      radius: { md: '0.375rem' },
    },
    {
      id: 'startup',
      name: 'Startup',
      palette: 'indigo',
      accent: '#f43f5e',
      radius: { md: '0.75rem' },
    },
    {
      id: 'technology',
      name: 'Technology',
      palette: 'indigo',
      accent: '#14b8a6',
      radius: { md: '0.5rem' },
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      palette: 'emerald',
      accent: '#06b6d4',
      radius: { md: '0.75rem' },
    },
    { id: 'legal', name: 'Legal', palette: 'navy', accent: '#b45309', radius: { md: '0.25rem' } },
    {
      id: 'finance',
      name: 'Finance',
      palette: 'navy',
      accent: '#059669',
      radius: { md: '0.375rem' },
    },
    {
      id: 'creative',
      name: 'Creative',
      palette: 'rose',
      accent: '#8b5cf6',
      radius: { md: '1rem' },
    },
    {
      id: 'education',
      name: 'Education',
      palette: 'teal',
      accent: '#f59e0b',
      radius: { md: '0.75rem' },
    },
  ];

  constructor(colors: ColorTokens = baseTokens.colors) {
    this.colors = colors;
  }

  /** All themes: base light, base dark, then the industry themes. */
  list(): readonly Theme[] {
    const base = this.baseTheme();
    return [base, ...ThemeEngine.INDUSTRIES.map((spec) => this.industryTheme(spec))];
  }

  ids(): readonly string[] {
    return this.list().map((theme) => theme.id);
  }

  get(id: string): Theme | undefined {
    if (id === 'system') {
      return this.baseTheme();
    }
    return this.list().find((theme) => theme.id === id);
  }

  /** The base theme carries both light and dark; "system" resolves to it and follows the OS. */
  baseTheme(): Theme {
    return this.buildTheme('base', 'Base', 'base', this.colors.primary, this.colors.primary['500']);
  }

  private industryTheme(spec: IndustrySpec): Theme {
    const scale = spec.palette === 'primary' ? this.colors.primary : PALETTES[spec.palette];
    const theme = this.buildTheme(spec.id, spec.name, 'industry', scale, spec.accent);
    return spec.radius ? { ...theme, tokenOverride: { radius: spec.radius } } : theme;
  }

  private buildTheme(
    id: string,
    name: string,
    category: ThemeCategory,
    primary: ColorScale,
    accent: string,
  ): Theme {
    return {
      id,
      name,
      category,
      light: this.lightScheme(primary, accent),
      dark: this.darkScheme(primary, accent),
      tokenOverride: undefined,
    };
  }

  private lightScheme(primary: ColorScale, accent: string): SemanticColors {
    const n = this.colors.neutral;
    return {
      background: this.colors.white,
      surface: n['50'],
      surfaceRaised: this.colors.white,
      foreground: n['900'],
      muted: n['600'],
      border: n['200'],
      primary: primary['600'],
      primaryForeground: this.readableOn(primary['600']),
      accent,
      accentForeground: this.readableOn(accent),
      success: this.colors.success['600'],
      warning: this.colors.warning['700'],
      danger: this.colors.danger['600'],
      info: this.colors.info['700'],
      focus: primary['500'],
    };
  }

  private darkScheme(primary: ColorScale, accent: string): SemanticColors {
    const n = this.colors.neutral;
    return {
      background: n['950'],
      surface: n['900'],
      surfaceRaised: n['800'],
      foreground: n['50'],
      muted: n['400'],
      border: n['800'],
      primary: primary['400'],
      primaryForeground: this.readableOn(primary['400']),
      accent,
      accentForeground: this.readableOn(accent),
      success: this.colors.success['400'],
      warning: this.colors.warning['400'],
      danger: this.colors.danger['400'],
      info: this.colors.info['400'],
      focus: primary['400'],
    };
  }

  /**
   * Picks the text color — near-black or white — with the higher contrast against `background`.
   * For any mid-tone accent one of the two always clears the AA 4.5:1 floor, so foreground text
   * on primary and accent surfaces is accessible by construction.
   */
  private readableOn(background: string): string {
    const onWhite = contrastRatio(this.colors.white, background) ?? 0;
    const onBlack = contrastRatio(this.colors.neutral['950'], background) ?? 0;
    return onBlack >= onWhite ? this.colors.neutral['950'] : this.colors.white;
  }

  /** Serializes a theme's scheme to semantic CSS custom properties. */
  toCssVariables(theme: Theme, scheme: ColorScheme, prefix = '--cef'): string {
    const colors = scheme === 'light' ? theme.light : theme.dark;
    const lines = Object.entries(colors).map(
      ([role, value]) => `  ${prefix}-${kebab(role)}: ${value};`,
    );
    const selector = scheme === 'dark' ? ':root[data-theme="dark"]' : ':root';
    return `${selector} {\n${lines.join('\n')}\n}\n`;
  }
}

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}
