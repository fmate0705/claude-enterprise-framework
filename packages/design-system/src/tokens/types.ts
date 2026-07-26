/**
 * Strongly-typed design token model. Tokens are the single source of truth for every styling
 * value in a generated project; components reference tokens by name and never hard-code values.
 * Every field here is a primitive or a named record so the whole set serializes losslessly to
 * JSON and to CSS custom properties.
 */

/** A 50–950 color scale, the standard Tailwind-style ramp. */
export interface ColorScale {
  readonly '50': string;
  readonly '100': string;
  readonly '200': string;
  readonly '300': string;
  readonly '400': string;
  readonly '500': string;
  readonly '600': string;
  readonly '700': string;
  readonly '800': string;
  readonly '900': string;
  readonly '950': string;
}

export type ColorScaleStep = keyof ColorScale;

export interface ColorTokens {
  readonly neutral: ColorScale;
  readonly primary: ColorScale;
  readonly success: ColorScale;
  readonly warning: ColorScale;
  readonly danger: ColorScale;
  readonly info: ColorScale;
  /** Absolute anchors, used sparingly. */
  readonly white: string;
  readonly black: string;
}

/** A single step on the type scale. */
export interface TypeStep {
  readonly sizeRem: number;
  readonly lineHeight: number;
  /** Letter-spacing in em; negative tightens. */
  readonly trackingEm: number;
}

export interface TypographyTokens {
  readonly families: {
    readonly sans: string;
    readonly serif: string;
    readonly mono: string;
  };
  readonly weights: {
    readonly regular: number;
    readonly medium: number;
    readonly semibold: number;
    readonly bold: number;
  };
  /** The modular scale, smallest to largest. */
  readonly scale: {
    readonly xs: TypeStep;
    readonly sm: TypeStep;
    readonly base: TypeStep;
    readonly lg: TypeStep;
    readonly xl: TypeStep;
    readonly '2xl': TypeStep;
    readonly '3xl': TypeStep;
    readonly '4xl': TypeStep;
    readonly '5xl': TypeStep;
    readonly '6xl': TypeStep;
    readonly '7xl': TypeStep;
  };
}

export type TypeStepName = keyof TypographyTokens['scale'];

/** Spacing steps keyed by scale index; each value is in rem. */
export interface SpacingTokens {
  readonly base: number;
  readonly scale: Readonly<Record<string, number>>;
}

export interface RadiusTokens {
  readonly none: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xl: string;
  readonly '2xl': string;
  readonly full: string;
}

export interface ElevationTokens {
  readonly none: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xl: string;
  readonly '2xl': string;
}

export interface MotionTokens {
  readonly durations: {
    readonly instant: number;
    readonly fast: number;
    readonly normal: number;
    readonly slow: number;
    readonly slower: number;
  };
  readonly easings: {
    readonly standard: string;
    readonly decelerate: string;
    readonly accelerate: string;
    readonly emphasized: string;
  };
}

export interface Breakpoints {
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
  readonly xl: number;
  readonly '2xl': number;
}

export interface ContainerWidths {
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
  readonly xl: number;
  readonly '2xl': number;
}

export interface IconSizes {
  readonly xs: number;
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
  readonly xl: number;
}

/** The complete token set. Themes and presets derive from this by overriding, never replacing. */
export interface DesignTokens {
  readonly colors: ColorTokens;
  readonly typography: TypographyTokens;
  readonly spacing: SpacingTokens;
  readonly radius: RadiusTokens;
  readonly elevation: ElevationTokens;
  readonly opacity: Readonly<Record<string, number>>;
  readonly motion: MotionTokens;
  readonly breakpoints: Breakpoints;
  readonly containers: ContainerWidths;
  readonly iconSizes: IconSizes;
  readonly gridColumns: number;
}
