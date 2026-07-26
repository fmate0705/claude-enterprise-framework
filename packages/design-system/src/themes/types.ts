import type { TokenOverride } from '../tokens/index.js';

export type ColorScheme = 'light' | 'dark';

export type ThemeCategory = 'base' | 'industry' | 'brand';

/** The semantic color roles a theme resolves for one color scheme. */
export interface SemanticColors {
  readonly background: string;
  readonly surface: string;
  readonly surfaceRaised: string;
  readonly foreground: string;
  /** Secondary/muted text. */
  readonly muted: string;
  readonly border: string;
  readonly primary: string;
  readonly primaryForeground: string;
  readonly accent: string;
  readonly accentForeground: string;
  readonly success: string;
  readonly warning: string;
  readonly danger: string;
  readonly info: string;
  readonly focus: string;
}

export type SemanticColorRole = keyof SemanticColors;

/** A theme: semantic colors for light and dark, plus optional token overrides (radius, type). */
export interface Theme {
  readonly id: string;
  readonly name: string;
  readonly category: ThemeCategory;
  readonly light: SemanticColors;
  readonly dark: SemanticColors;
  readonly tokenOverride: TokenOverride | undefined;
}

/** The foreground/background pairs that must meet WCAG AA for a scheme to be valid. */
export const CONTRAST_PAIRS: readonly (readonly [SemanticColorRole, SemanticColorRole])[] = [
  ['foreground', 'background'],
  ['foreground', 'surface'],
  ['muted', 'background'],
  ['primaryForeground', 'primary'],
  ['accentForeground', 'accent'],
];
