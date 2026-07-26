import { baseTokens } from '../tokens/index.js';
import type { SpacingTokens } from '../tokens/index.js';

/**
 * Owns spacing decisions: reading values off the scale, snapping an arbitrary value to the
 * nearest scale step, and checking whether a value is on-scale. Every margin, padding, and gap
 * resolves through here, so spacing never drifts to an off-scale literal.
 */
export class SpacingEngine {
  private readonly tokens: SpacingTokens;

  constructor(tokens: SpacingTokens = baseTokens.spacing) {
    this.tokens = tokens;
  }

  /** The scale steps as sorted [key, rem] pairs. */
  steps(): readonly (readonly [string, number])[] {
    return Object.entries(this.tokens.scale).sort((a, b) => a[1] - b[1]);
  }

  /** The rem value for a scale key, if it exists. */
  get(key: string): number | undefined {
    return this.tokens.scale[key];
  }

  /** True when `rem` matches a scale step exactly. */
  isOnScale(rem: number): boolean {
    return Object.values(this.tokens.scale).some((value) => value === rem);
  }

  /** The scale key whose value is closest to `rem`. */
  nearest(rem: number): string {
    let bestKey = '0';
    let bestDelta = Number.POSITIVE_INFINITY;
    for (const [key, value] of Object.entries(this.tokens.scale)) {
      const delta = Math.abs(value - rem);
      if (delta < bestDelta) {
        bestDelta = delta;
        bestKey = key;
      }
    }
    return bestKey;
  }

  /** Converts a scale step to pixels at a 16px root. */
  toPx(key: string): number | undefined {
    const rem = this.get(key);
    return rem === undefined ? undefined : rem * 16;
  }
}
