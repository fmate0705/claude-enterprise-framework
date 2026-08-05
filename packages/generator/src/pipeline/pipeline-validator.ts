import { issue, type StageIssue } from '../models/index.js';
import { StageRegistry } from './stage-registry.js';

export interface PipelineValidationReport {
  readonly ok: boolean;
  readonly issues: readonly StageIssue[];
}

/** The twelve stages the pipeline must contain, in order. */
const EXPECTED = [
  'architecture',
  'layout',
  'component',
  'page',
  'seo',
  'content',
  'asset',
  'deployment',
  'validation',
  'review',
  'repair',
  'export',
] as const;

/**
 * Validates that the pipeline itself is well-formed: it has exactly the expected stages, they are
 * unique, and they run in the required order (architecture first, export last). This guards the
 * pipeline's own integrity independently of any generation run.
 */
export class PipelineValidator {
  validate(registry: StageRegistry = new StageRegistry()): PipelineValidationReport {
    const ids = registry.ids();
    const issues: StageIssue[] = [];

    for (const expected of EXPECTED) {
      if (!ids.includes(expected)) {
        issues.push(issue('error', `Pipeline is missing the "${expected}" stage.`));
      }
    }
    if (ids[0] !== 'architecture') {
      issues.push(issue('error', 'The first stage must be architecture.'));
    }
    if (ids[ids.length - 1] !== 'export') {
      issues.push(issue('error', 'The last stage must be export.'));
    }
    if (new Set(ids).size !== ids.length) {
      issues.push(issue('error', 'Pipeline has duplicate stage ids.'));
    }

    return { ok: issues.every((i) => i.severity !== 'error'), issues };
  }
}
