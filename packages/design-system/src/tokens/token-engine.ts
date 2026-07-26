import { baseTokens } from './base-tokens.js';
import type { ColorScale, DesignTokens } from './types.js';

/** A recursive partial of the token set — the shape themes and presets override with. */
export type TokenOverride = DeepPartial<DesignTokens>;

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

const SCALE_STEPS: readonly (keyof ColorScale)[] = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
];

/**
 * Owns the token set: it merges overrides onto the base (how themes and presets derive), and
 * serializes tokens to CSS custom properties and JSON. Merging is a deep, immutable overlay —
 * overrides replace only the leaves they name, so a theme never has to restate the whole set.
 */
export class TokenEngine {
  base(): DesignTokens {
    return baseTokens;
  }

  /** Deep-merges an override onto a base token set, returning a new set. */
  merge(base: DesignTokens, override: TokenOverride): DesignTokens {
    return mergeDeep(base, override) as DesignTokens;
  }

  toJson(tokens: DesignTokens): string {
    return `${JSON.stringify(tokens, null, 2)}\n`;
  }

  /** Flattens the token set to CSS custom properties under `:root`. */
  toCssVariables(tokens: DesignTokens, prefix = '--cef'): string {
    const lines = this.cssLines(tokens, prefix);
    return `:root {\n${lines.map((line) => `  ${line}`).join('\n')}\n}\n`;
  }

  private cssLines(tokens: DesignTokens, prefix: string): readonly string[] {
    const lines: string[] = [];
    const push = (name: string, value: string | number): void => {
      lines.push(`${prefix}-${name}: ${value};`);
    };

    for (const [family, scale] of Object.entries(tokens.colors)) {
      if (typeof scale === 'string') {
        push(`color-${family}`, scale);
        continue;
      }
      for (const step of SCALE_STEPS) {
        push(`color-${family}-${step}`, scale[step]);
      }
    }

    push('font-sans', tokens.typography.families.sans);
    push('font-serif', tokens.typography.families.serif);
    push('font-mono', tokens.typography.families.mono);
    for (const [name, weight] of Object.entries(tokens.typography.weights)) {
      push(`weight-${name}`, weight);
    }
    for (const [name, step] of Object.entries(tokens.typography.scale)) {
      push(`text-${name}`, `${step.sizeRem}rem`);
      push(`leading-${name}`, step.lineHeight);
    }

    for (const [name, value] of Object.entries(tokens.spacing.scale)) {
      push(`space-${name.replace('.', '_')}`, `${value}rem`);
    }
    for (const [name, value] of Object.entries(tokens.radius)) {
      push(`radius-${name}`, value);
    }
    for (const [name, value] of Object.entries(tokens.elevation)) {
      push(`shadow-${name}`, value);
    }
    for (const [name, value] of Object.entries(tokens.opacity)) {
      push(`opacity-${name}`, value);
    }
    for (const [name, value] of Object.entries(tokens.motion.durations)) {
      push(`duration-${name}`, `${value}ms`);
    }
    for (const [name, value] of Object.entries(tokens.motion.easings)) {
      push(`ease-${name}`, value);
    }
    for (const [name, value] of Object.entries(tokens.breakpoints)) {
      push(`bp-${name}`, `${value}px`);
    }
    for (const [name, value] of Object.entries(tokens.containers)) {
      push(`container-${name}`, `${value}px`);
    }
    for (const [name, value] of Object.entries(tokens.iconSizes)) {
      push(`icon-${name}`, `${value}px`);
    }
    push('grid-columns', tokens.gridColumns);

    return lines;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeDeep(base: unknown, override: unknown): unknown {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) {
      continue;
    }
    result[key] = key in base ? mergeDeep(base[key], value) : value;
  }
  return result;
}
