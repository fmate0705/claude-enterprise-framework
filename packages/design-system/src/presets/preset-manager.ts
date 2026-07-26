import { TokenEngine } from '../tokens/index.js';
import type { DesignTokens, TokenOverride } from '../tokens/index.js';
import { TYPE_RATIOS, TypographyEngine } from '../typography/index.js';
import type { RadiusStyle } from '../branding/index.js';
import { PRESET_CATALOG } from './catalog.js';
import type { DesignPreset } from './types.js';

type RadiusOverride = { readonly sm: string; readonly md: string; readonly lg: string };

const RADIUS_OVERRIDES: Readonly<Record<RadiusStyle, RadiusOverride>> = {
  sharp: { sm: '0.125rem', md: '0.25rem', lg: '0.375rem' },
  rounded: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem' },
  pill: { sm: '0.5rem', md: '1rem', lg: '1.5rem' },
};

/**
 * Resolves a design preset into concrete token overrides and applies them to a base token set.
 * A preset never restates the whole token set — it names a type ratio, a radius style, and a grid,
 * which map deterministically to overrides merged onto the base. This is how a project adopts a
 * coherent look without hard-coding values.
 */
export class PresetManager {
  constructor(
    private readonly tokenEngine: TokenEngine = new TokenEngine(),
    private readonly typography: TypographyEngine = new TypographyEngine(),
  ) {}

  list(): readonly DesignPreset[] {
    return PRESET_CATALOG;
  }

  ids(): readonly string[] {
    return PRESET_CATALOG.map((preset) => preset.id);
  }

  get(id: string): DesignPreset | undefined {
    return PRESET_CATALOG.find((preset) => preset.id === id);
  }

  /** Maps a preset's stylistic choices to a token override. */
  toOverride(preset: DesignPreset): TokenOverride {
    const ratio = TYPE_RATIOS[preset.typography.ratio];
    return {
      radius: RADIUS_OVERRIDES[preset.componentStyle.radius],
      typography: { scale: this.typography.buildScale(1, ratio) },
      gridColumns: preset.gridColumns,
    };
  }

  /** Applies a preset onto a base token set, returning the merged tokens. */
  apply(preset: DesignPreset, base: DesignTokens = this.tokenEngine.base()): DesignTokens {
    return this.tokenEngine.merge(base, this.toOverride(preset));
  }
}
