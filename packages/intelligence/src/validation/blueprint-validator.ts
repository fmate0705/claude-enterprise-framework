import { FEATURE_INTEGRATION_IDS } from '../integrations/index.js';
import type { Blueprint } from '../planning/blueprint.js';
import { report, type ValidationIssue, type ValidationReport } from '../types/index.js';

/**
 * Verifies a blueprint is complete and internally consistent: required pages and legal documents
 * are present, features resolve their dependencies and integrations, SEO is populated and points
 * at real pages, accessibility targets AA, and performance budgets are set. It computes only from
 * the blueprint, so it is deterministic and unit-testable.
 */
export class BlueprintValidator {
  validate(blueprint: Blueprint): ValidationReport {
    return report([
      ...this.checkPages(blueprint),
      ...this.checkFeatures(blueprint),
      ...this.checkIntegrations(blueprint),
      ...this.checkSeo(blueprint),
      ...this.checkAccessibility(blueprint),
      ...this.checkPerformance(blueprint),
      ...this.checkLegal(blueprint),
    ]);
  }

  private checkPages(blueprint: Blueprint): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const ids = new Set(blueprint.pages.map((page) => page.id));
    if (!ids.has('home')) {
      issues.push({ severity: 'error', message: 'Blueprint is missing a home page.' });
    }
    if (blueprint.pages.length === 0) {
      issues.push({ severity: 'error', message: 'Blueprint plans no pages.' });
    }
    for (const page of blueprint.pages) {
      if (page.components.length === 0) {
        issues.push({ severity: 'warning', message: `Page "${page.id}" plans no components.` });
      }
    }
    const hasConversion = blueprint.pages.some((page) =>
      [
        'contact',
        'pricing',
        'checkout',
        'signup',
        'donate',
        'reservations',
        'appointments',
      ].includes(page.id),
    );
    if (!hasConversion) {
      issues.push({
        severity: 'warning',
        message: 'No conversion page (contact/pricing/checkout) planned.',
      });
    }
    return issues;
  }

  private checkFeatures(blueprint: Blueprint): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const ids = new Set(blueprint.features.features.map((feature) => feature.id));
    for (const feature of blueprint.features.features) {
      for (const dependency of feature.dependencies) {
        if (!ids.has(dependency)) {
          issues.push({
            severity: 'error',
            message: `Feature "${feature.id}" depends on unplanned feature "${dependency}".`,
          });
        }
      }
    }
    return issues;
  }

  private checkIntegrations(blueprint: Blueprint): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const integrationFeatures = new Set(
      blueprint.integrations.flatMap((integration) => integration.requiredByFeatures),
    );
    for (const feature of blueprint.features.features) {
      if (FEATURE_INTEGRATION_IDS.has(feature.id) && !integrationFeatures.has(feature.id)) {
        issues.push({
          severity: 'error',
          message: `Feature "${feature.id}" needs an integration but none is planned.`,
        });
      }
    }
    return issues;
  }

  private checkSeo(blueprint: Blueprint): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    if (blueprint.seo.primaryKeywords.length === 0) {
      issues.push({ severity: 'warning', message: 'SEO strategy has no primary keywords.' });
    }
    const pageIds = new Set(blueprint.pages.map((page) => page.id));
    for (const recommendation of blueprint.seo.schemaRecommendations) {
      if (!pageIds.has(recommendation.page)) {
        issues.push({
          severity: 'error',
          message: `SEO schema references unplanned page "${recommendation.page}".`,
        });
      }
    }
    return issues;
  }

  private checkAccessibility(blueprint: Blueprint): ValidationIssue[] {
    if (blueprint.accessibility.level !== 'WCAG 2.2 AA') {
      return [{ severity: 'error', message: 'Accessibility target must be WCAG 2.2 AA.' }];
    }
    return [];
  }

  private checkPerformance(blueprint: Blueprint): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const cwv = blueprint.performance.coreWebVitals;
    if (cwv.lcpMs <= 0 || cwv.inpMs <= 0 || cwv.cls < 0) {
      issues.push({ severity: 'error', message: 'Core Web Vitals targets are not set.' });
    }
    if (blueprint.performance.jsBudgetKb <= 0) {
      issues.push({ severity: 'error', message: 'JS budget is not set.' });
    }
    return issues;
  }

  private checkLegal(blueprint: Blueprint): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const ids = new Set(blueprint.legal.requiredPages.map((page) => page.id));
    for (const required of ['privacy-policy', 'terms']) {
      if (!ids.has(required)) {
        issues.push({ severity: 'error', message: `Legal plan is missing "${required}".` });
      }
    }
    if (blueprint.input.targetCountry.toUpperCase() === 'HU' && !ids.has('impresszum')) {
      issues.push({ severity: 'error', message: 'Hungarian project is missing the Impresszum.' });
    }
    if (blueprint.legal.disclaimer.trim().length === 0) {
      issues.push({ severity: 'error', message: 'Legal plan is missing the review disclaimer.' });
    }
    return issues;
  }
}
