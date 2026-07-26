/**
 * WCAG contrast math. These are the real formulas from WCAG 2.x: sRGB channel linearization,
 * relative luminance, and the (L1 + 0.05) / (L2 + 0.05) contrast ratio. No approximation and no
 * external dependency, so accessibility checks are exact and deterministic.
 */

export interface Rgb {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

/** Parses `#rgb` or `#rrggbb` (with or without leading `#`) to 0–255 channels. */
export function parseHex(hex: string): Rgb | undefined {
  const value = hex.trim().replace(/^#/, '');
  const expanded =
    value.length === 3
      ? value
          .split('')
          .map((char) => char + char)
          .join('')
      : value;
  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    return undefined;
  }
  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16),
  };
}

/** Linearizes one 0–255 channel per the sRGB transfer function. */
function linearize(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Relative luminance (0 = black, 1 = white) per WCAG. */
export function relativeLuminance(color: Rgb): number {
  return 0.2126 * linearize(color.r) + 0.7152 * linearize(color.g) + 0.0722 * linearize(color.b);
}

/** Contrast ratio between two hex colors, 1–21. Returns undefined if either fails to parse. */
export function contrastRatio(foreground: string, background: string): number | undefined {
  const fg = parseHex(foreground);
  const bg = parseHex(background);
  if (!fg || !bg) {
    return undefined;
  }
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export type TextSize = 'normal' | 'large';

/** The AA contrast floor: 4.5:1 for normal text, 3:1 for large text. */
export function aaThreshold(size: TextSize): number {
  return size === 'large' ? 3 : 4.5;
}

/** The AAA contrast floor: 7:1 for normal text, 4.5:1 for large text. */
export function aaaThreshold(size: TextSize): number {
  return size === 'large' ? 4.5 : 7;
}

/** Whether a foreground/background pair meets WCAG AA for the given text size. */
export function meetsAA(
  foreground: string,
  background: string,
  size: TextSize = 'normal',
): boolean {
  const ratio = contrastRatio(foreground, background);
  return ratio !== undefined && ratio >= aaThreshold(size);
}
