/** Shared value types for the Claude Integration Engine. */

export type Severity = 'error' | 'warning';

/** A single validation finding, mirroring the framework/runtime validation shape. */
export interface ValidationIssue {
  readonly severity: Severity;
  readonly message: string;
}

/** The outcome of a validation pass. `ok` is false when any issue is an error. */
export interface ValidationReport {
  readonly ok: boolean;
  readonly issues: readonly ValidationIssue[];
}
