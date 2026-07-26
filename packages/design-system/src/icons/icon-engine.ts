import { baseTokens } from '../tokens/index.js';
import type { IconSizes } from '../tokens/index.js';

/** Icon sets the system can target (one set per project, for consistency). */
export const ICON_SETS = ['lucide', 'radix-icons', 'heroicons'] as const;
export type IconSet = (typeof ICON_SETS)[number];

export interface IconStyle {
  readonly set: IconSet;
  /** Stroke width in px for line icons. */
  readonly strokeWidth: number;
  /** Default size token key. */
  readonly defaultSize: keyof IconSizes;
}

/**
 * Owns iconography consistency: one icon set, one stroke width, and sizes drawn from the token
 * scale. Ad-hoc icon sizes are rejected so icons stay uniform across the product.
 */
export class IconEngine {
  private readonly sizes: IconSizes;

  private static readonly DEFAULT_STYLE: IconStyle = {
    set: 'lucide',
    strokeWidth: 2,
    defaultSize: 'md',
  };

  constructor(sizes: IconSizes = baseTokens.iconSizes) {
    this.sizes = sizes;
  }

  sets(): readonly IconSet[] {
    return ICON_SETS;
  }

  defaultStyle(): IconStyle {
    return IconEngine.DEFAULT_STYLE;
  }

  /** The pixel size for a size token key. */
  sizePx(key: keyof IconSizes): number {
    return this.sizes[key];
  }

  /** True when a pixel size matches a size token exactly. */
  isTokenSize(px: number): boolean {
    return Object.values(this.sizes).some((value) => value === px);
  }
}
