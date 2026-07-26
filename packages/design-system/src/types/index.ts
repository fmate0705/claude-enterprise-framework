/** Shared value types for the Design System Engine. */

export type Severity = 'error' | 'warning';

/** A single validation finding, mirroring the framework/runtime/claude validation shape. */
export interface ValidationIssue {
  readonly severity: Severity;
  readonly message: string;
}

/** The outcome of a validation pass. `ok` is false when any issue is an error. */
export interface ValidationReport {
  readonly ok: boolean;
  readonly issues: readonly ValidationIssue[];
}

/** Merges several reports into one, preserving order. */
export function mergeReports(reports: readonly ValidationReport[]): ValidationReport {
  const issues = reports.flatMap((report) => report.issues);
  return { ok: issues.every((issue) => issue.severity !== 'error'), issues };
}
