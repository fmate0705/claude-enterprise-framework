import type { ButtonStyle, RadiusStyle } from '../branding/index.js';
import type { MotionStyle } from '../branding/index.js';
import type { TypeRatioName } from '../typography/index.js';

export type SpacingDensity = 'compact' | 'comfortable' | 'spacious';
export type ElevationStyle = 'flat' | 'subtle' | 'pronounced';
export type ColorStrategy = 'monochrome' | 'duotone' | 'vibrant' | 'muted';

/** A design preset: a coherent set of stylistic choices applied on top of the base tokens. */
export interface DesignPreset {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly typography: {
    readonly ratio: TypeRatioName;
    readonly pairingId: string;
  };
  readonly spacingDensity: SpacingDensity;
  readonly motionStyle: MotionStyle;
  readonly componentStyle: {
    readonly radius: RadiusStyle;
    readonly button: ButtonStyle;
    readonly elevation: ElevationStyle;
  };
  readonly gridColumns: number;
  readonly colorStrategy: ColorStrategy;
}
