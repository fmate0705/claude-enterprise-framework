import { CapabilityResolver } from '../capabilities/index.js';
import type { FrameworkCatalog } from '../catalog/index.js';

export interface ValidationIssue {
  readonly severity: 'error' | 'warning';
  readonly message: string;
}

export interface FrameworkValidationReport {
  readonly ok: boolean;
  readonly issues: readonly ValidationIssue[];
}

/**
 * Validates framework integrity: broken references, invalid/incomplete metadata, engine
 * coverage collisions, and circular references across the whole catalog.
 */
export class FrameworkValidator {
  validate(catalog: FrameworkCatalog): FrameworkValidationReport {
    const issues: ValidationIssue[] = [];
    const ids = new Set(catalog.ids());
    const engineOwners = new Map<string, string>();

    for (const module of catalog.all()) {
      const metadata = module.metadata;

      for (const dependency of metadata.dependsOn) {
        if (!ids.has(dependency)) {
          issues.push({
            severity: 'error',
            message: `Module "${metadata.id}" depends on unknown module "${dependency}".`,
          });
        }
      }

      if (metadata.summary.trim().length === 0) {
        issues.push({
          severity: 'warning',
          message: `Module "${metadata.id}" has an empty summary.`,
        });
      }
      if (metadata.prompt.trim().length === 0) {
        issues.push({
          severity: 'warning',
          message: `Module "${metadata.id}" has no prompt fragment.`,
        });
      }
      if (metadata.engines.length === 0 && metadata.capabilities.length === 0) {
        issues.push({
          severity: 'warning',
          message: `Module "${metadata.id}" declares no engines or capabilities.`,
        });
      }

      for (const engine of metadata.engines) {
        const owner = engineOwners.get(engine);
        if (owner && owner !== metadata.id) {
          issues.push({
            severity: 'warning',
            message: `Engine "${engine}" is claimed by both "${owner}" and "${metadata.id}".`,
          });
        } else {
          engineOwners.set(engine, metadata.id);
        }
      }
    }

    // Circular references: resolving every engine must succeed.
    const allEngines = [...new Set(catalog.all().flatMap((module) => module.metadata.engines))];
    const resolved = new CapabilityResolver(catalog).resolveForEngines(allEngines);
    if (!resolved.ok) {
      issues.push({ severity: 'error', message: resolved.error.message });
    }

    return { ok: issues.every((issue) => issue.severity !== 'error'), issues };
  }
}
