/** Shared value types for the Project Intelligence Engine. */

export type Severity = 'error' | 'warning';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Complexity = 'low' | 'medium' | 'high';

/** A single validation finding, mirroring the shape used across CEF packages. */
export interface ValidationIssue {
  readonly severity: Severity;
  readonly message: string;
}

export interface ValidationReport {
  readonly ok: boolean;
  readonly issues: readonly ValidationIssue[];
}

export function report(issues: readonly ValidationIssue[]): ValidationReport {
  return { ok: issues.every((issue) => issue.severity !== 'error'), issues };
}

/** Orders priorities high-to-low for deterministic sorting. */
export const PRIORITY_RANK: Readonly<Record<Priority, number>> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};
