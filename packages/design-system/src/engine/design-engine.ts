import type { GeneratedFile } from '@cef/core';
import { AccessibilityEngine } from '../accessibility/index.js';
import { BrandEngine } from '../branding/index.js';
import type { BrandIdentity, BrandInput } from '../branding/index.js';
import { IconEngine } from '../icons/index.js';
import { MotionEngine } from '../motion/index.js';
import { PatternLibrary } from '../patterns/index.js';
import { PresetManager } from '../presets/index.js';
import { ComponentRegistry, LayoutRegistry } from '../registry/index.js';
import { ResponsiveEngine } from '../responsive/index.js';
import { SpacingEngine } from '../spacing/index.js';
import { StyleTemplateBuilder } from '../templates/index.js';
import { ThemeEngine } from '../themes/index.js';
import type { ColorScheme } from '../themes/index.js';
import { TokenEngine } from '../tokens/index.js';
import type { DesignTokens } from '../tokens/index.js';
import { TypographyEngine } from '../typography/index.js';
import { DesignValidator } from '../validation/index.js';
import type { ValidationReport } from '../types/index.js';
import {
  BRAND_JSON_PATH,
  STYLE_TEMPLATE_PATH,
  TOKENS_CSS_PATH,
  TOKENS_JSON_PATH,
} from '../paths.js';

/**
 * The Design System facade — the single entry the CLI and generators depend on. It wires every
 * specialized engine and registry once and exposes them, plus a few composition helpers
 * (resolve tokens for a preset, build the style template, emit design files, validate). It holds
 * no styling logic itself; it composes, keeping each concern single-responsibility.
 */
export class DesignEngine {
  readonly tokens = new TokenEngine();
  readonly themes = new ThemeEngine();
  readonly brand = new BrandEngine();
  readonly components = new ComponentRegistry();
  readonly layouts = new LayoutRegistry();
  readonly motion = new MotionEngine();
  readonly typography = new TypographyEngine();
  readonly spacing = new SpacingEngine();
  readonly accessibility = new AccessibilityEngine();
  readonly responsive = new ResponsiveEngine();
  readonly icons = new IconEngine();
  readonly presets = new PresetManager();
  readonly patterns = new PatternLibrary();

  private readonly validator = new DesignValidator();
  private readonly styleBuilder = new StyleTemplateBuilder();

  /** The resolved token set: base, or base overlaid with a preset when one is named. */
  resolveTokens(presetId?: string): DesignTokens {
    if (presetId === undefined) {
      return this.tokens.base();
    }
    const preset = this.presets.get(presetId);
    return preset ? this.presets.apply(preset) : this.tokens.base();
  }

  /** The full CSS style template for a theme (and optional preset). */
  styleTemplate(themeId = 'base', presetId?: string): string {
    const theme = this.themes.get(themeId) ?? this.themes.baseTheme();
    return this.styleBuilder.build({ tokens: this.resolveTokens(presetId), theme });
  }

  buildBrand(input: BrandInput): BrandIdentity {
    return this.brand.generate(input);
  }

  validate(presetId?: string): ValidationReport {
    return this.validator.validate(this.resolveTokens(presetId));
  }

  /** The files written to `.cef/design/` for a theme, preset, and optional brand. */
  designFiles(
    options: {
      themeId?: string;
      presetId?: string;
      scheme?: ColorScheme;
      brand?: BrandInput;
    } = {},
  ): readonly GeneratedFile[] {
    const tokens = this.resolveTokens(options.presetId);
    const files: GeneratedFile[] = [
      { path: TOKENS_JSON_PATH, content: this.tokens.toJson(tokens) },
      { path: TOKENS_CSS_PATH, content: this.tokens.toCssVariables(tokens) },
      { path: STYLE_TEMPLATE_PATH, content: this.styleTemplate(options.themeId, options.presetId) },
    ];
    if (options.brand) {
      files.push({
        path: BRAND_JSON_PATH,
        content: this.brand.serialize(this.brand.generate(options.brand)),
      });
    }
    return files;
  }
}
