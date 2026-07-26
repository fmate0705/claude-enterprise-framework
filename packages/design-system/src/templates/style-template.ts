import { TokenEngine } from '../tokens/index.js';
import type { DesignTokens } from '../tokens/index.js';
import { ThemeEngine } from '../themes/index.js';
import type { Theme } from '../themes/index.js';

export interface StyleTemplateInput {
  readonly tokens: DesignTokens;
  readonly theme: Theme;
  readonly prefix?: string;
}

/**
 * Builds a complete CSS custom-property template — base tokens, light and dark semantic colors,
 * and a reduced-motion block — that a project's global stylesheet adopts verbatim. This is the
 * design system expressed as ready CSS variables; it is styling infrastructure, not page markup.
 */
export class StyleTemplateBuilder {
  constructor(
    private readonly tokenEngine: TokenEngine = new TokenEngine(),
    private readonly themeEngine: ThemeEngine = new ThemeEngine(),
  ) {}

  build(input: StyleTemplateInput): string {
    const prefix = input.prefix ?? '--cef';
    const blocks = [
      `/* CEF design tokens — generated, do not edit by hand. */`,
      this.tokenEngine.toCssVariables(input.tokens, prefix).trimEnd(),
      this.themeEngine.toCssVariables(input.theme, 'light', prefix).trimEnd(),
      this.themeEngine.toCssVariables(input.theme, 'dark', prefix).trimEnd(),
      REDUCED_MOTION_BLOCK.trimEnd(),
    ];
    return `${blocks.join('\n\n')}\n`;
  }
}

/** Honors prefers-reduced-motion globally — non-essential motion is neutralized. */
const REDUCED_MOTION_BLOCK = `@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;
