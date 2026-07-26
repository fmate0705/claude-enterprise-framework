import type { GeneratedFile } from '@cef/core';
import type { AccessibilityEngine } from '../accessibility/index.js';
import type { BrandEngine, BrandIdentity, BrandInput } from '../branding/index.js';
import type { IconEngine } from '../icons/index.js';
import type { MotionEngine } from '../motion/index.js';
import type { PatternLibrary } from '../patterns/index.js';
import type { PresetManager } from '../presets/index.js';
import type { ComponentRegistry, LayoutRegistry } from '../registry/index.js';
import type { ResponsiveEngine } from '../responsive/index.js';
import type { SpacingEngine } from '../spacing/index.js';
import type { ThemeEngine, ColorScheme } from '../themes/index.js';
import type { DesignTokens, TokenEngine } from '../tokens/index.js';
import type { TypographyEngine } from '../typography/index.js';
import type { ValidationReport } from '../types/index.js';

/**
 * The Design System's public contract — the single surface the CLI and generators depend on.
 * It exposes each specialized engine and registry, plus the composition helpers that resolve
 * tokens, build the style template, generate a brand, validate, and emit the `.cef/design/` files.
 */
export interface DesignSystemFacade {
  readonly tokens: TokenEngine;
  readonly themes: ThemeEngine;
  readonly brand: BrandEngine;
  readonly components: ComponentRegistry;
  readonly layouts: LayoutRegistry;
  readonly motion: MotionEngine;
  readonly typography: TypographyEngine;
  readonly spacing: SpacingEngine;
  readonly accessibility: AccessibilityEngine;
  readonly responsive: ResponsiveEngine;
  readonly icons: IconEngine;
  readonly presets: PresetManager;
  readonly patterns: PatternLibrary;

  resolveTokens(presetId?: string): DesignTokens;
  styleTemplate(themeId?: string, presetId?: string): string;
  buildBrand(input: BrandInput): BrandIdentity;
  validate(presetId?: string): ValidationReport;
  designFiles(options?: {
    themeId?: string;
    presetId?: string;
    scheme?: ColorScheme;
    brand?: BrandInput;
  }): readonly GeneratedFile[];
}
