import { mergeReports, type ValidationIssue, type ValidationReport } from '../types/index.js';
import { AccessibilityEngine } from '../accessibility/index.js';
import { MotionEngine } from '../motion/index.js';
import { TypographyEngine } from '../typography/index.js';
import { ThemeEngine } from '../themes/index.js';
import { ComponentRegistry, LayoutRegistry } from '../registry/index.js';
import { baseTokens } from '../tokens/index.js';
import type { DesignTokens } from '../tokens/index.js';

/**
 * Validates the integrity of the whole design system: tokens, themes, the component and layout
 * registries, responsive rules, accessibility, motion, and the type scale. Each check is exact
 * and deterministic; an error means the system would produce inconsistent or inaccessible UI.
 */
export class DesignValidator {
  constructor(
    private readonly themes: ThemeEngine = new ThemeEngine(),
    private readonly components: ComponentRegistry = new ComponentRegistry(),
    private readonly layouts: LayoutRegistry = new LayoutRegistry(),
    private readonly accessibility: AccessibilityEngine = new AccessibilityEngine(),
    private readonly motion: MotionEngine = new MotionEngine(),
    private readonly typography: TypographyEngine = new TypographyEngine(),
  ) {}

  /** Runs every check and merges the results. */
  validate(tokens: DesignTokens = baseTokens): ValidationReport {
    return mergeReports([
      this.validateTokens(tokens),
      this.validateThemes(),
      this.validateComponents(),
      this.validateLayouts(),
      this.validateResponsive(tokens),
      this.validateMotion(),
      this.validateTypography(tokens),
    ]);
  }

  validateTokens(tokens: DesignTokens = baseTokens): ValidationReport {
    const issues: ValidationIssue[] = [];
    if (tokens.spacing.base <= 0) {
      issues.push({ severity: 'error', message: 'Spacing base must be positive.' });
    }
    if (Object.keys(tokens.spacing.scale).length === 0) {
      issues.push({ severity: 'error', message: 'Spacing scale is empty.' });
    }
    if (tokens.gridColumns <= 0) {
      issues.push({ severity: 'error', message: 'Grid columns must be positive.' });
    }
    for (const [name, value] of Object.entries(tokens.opacity)) {
      if (value < 0 || value > 1) {
        issues.push({ severity: 'error', message: `Opacity "${name}" must be within 0–1.` });
      }
    }
    return report(issues);
  }

  validateThemes(): ValidationReport {
    const reports: ValidationReport[] = [];
    for (const theme of this.themes.list()) {
      reports.push(this.accessibility.auditTheme(theme, 'light'));
      reports.push(this.accessibility.auditTheme(theme, 'dark'));
    }
    return mergeReports(reports);
  }

  validateComponents(): ValidationReport {
    const issues: ValidationIssue[] = [];
    const seen = new Set<string>();
    for (const component of this.components.all()) {
      if (seen.has(component.id)) {
        issues.push({ severity: 'error', message: `Duplicate component id "${component.id}".` });
      }
      seen.add(component.id);
      if (component.variants.length === 0) {
        issues.push({ severity: 'error', message: `Component "${component.id}" has no variants.` });
      }
      if (!component.slots.some((slot) => slot.required)) {
        issues.push({
          severity: 'warning',
          message: `Component "${component.id}" has no required slot.`,
        });
      }
    }
    for (const { component, missing } of this.components.unresolvedDependencies()) {
      issues.push({
        severity: 'error',
        message: `Component "${component}" depends on unregistered "${missing}".`,
      });
    }
    return report(issues);
  }

  validateLayouts(): ValidationReport {
    const issues: ValidationIssue[] = [];
    for (const layout of this.layouts.all()) {
      if (layout.sections.length === 0) {
        issues.push({ severity: 'error', message: `Layout "${layout.id}" has no sections.` });
      }
      for (const componentId of this.layouts.componentsOf(layout.id)) {
        if (!this.components.has(componentId)) {
          issues.push({
            severity: 'error',
            message: `Layout "${layout.id}" references unknown component "${componentId}".`,
          });
        }
      }
    }
    return report(issues);
  }

  validateResponsive(tokens: DesignTokens = baseTokens): ValidationReport {
    const issues: ValidationIssue[] = [];
    const values = Object.values(tokens.breakpoints);
    for (let index = 1; index < values.length; index += 1) {
      const previous = values[index - 1] ?? 0;
      const current = values[index] ?? 0;
      if (current <= previous) {
        issues.push({
          severity: 'error',
          message: 'Breakpoints must strictly increase from sm to 2xl.',
        });
        break;
      }
    }
    return report(issues);
  }

  validateMotion(): ValidationReport {
    const issues: ValidationIssue[] = [];
    for (const preset of this.motion.presets()) {
      if (!this.motion.isWithinBudget(preset)) {
        issues.push({
          severity: 'error',
          message: `Motion preset "${preset.id}" exceeds the ${MotionEngine.BUDGET_MS}ms budget.`,
        });
      }
    }
    return report(issues);
  }

  validateTypography(tokens: DesignTokens = baseTokens): ValidationReport {
    if (!this.typography.isMonotonic(tokens.typography.scale)) {
      return report([{ severity: 'error', message: 'Type scale is not strictly increasing.' }]);
    }
    return report([]);
  }
}

function report(issues: readonly ValidationIssue[]): ValidationReport {
  return { ok: issues.every((issue) => issue.severity !== 'error'), issues };
}
