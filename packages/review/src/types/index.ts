/** Shared value types for the Review & Approval Engine. */

export type Severity = 'blocker' | 'major' | 'minor' | 'nit';
export type GateStatus = 'pass' | 'warn' | 'fail';

/** The twelve mandatory quality gates. */
export type GateId =
  | 'architecture'
  | 'design'
  | 'accessibility'
  | 'performance'
  | 'seo'
  | 'security'
  | 'content'
  | 'brand'
  | 'legal'
  | 'docker'
  | 'testing'
  | 'documentation';

export interface GateMeta {
  readonly id: GateId;
  readonly name: string;
  /** Required gates must pass for a production release; advisory gates only warn. */
  readonly required: boolean;
}

/**
 * Gate definitions in review order. The nine craft gates are required for production; Docker,
 * Testing, and Documentation are advisory here because the generation pipeline (Phase 8) does not
 * yet emit them — the review reports their absence as a recommendation rather than blocking.
 */
export const GATES: readonly GateMeta[] = [
  { id: 'architecture', name: 'Architecture', required: true },
  { id: 'design', name: 'Design', required: true },
  { id: 'accessibility', name: 'Accessibility', required: true },
  { id: 'performance', name: 'Performance', required: true },
  { id: 'seo', name: 'SEO', required: true },
  { id: 'security', name: 'Security', required: true },
  { id: 'content', name: 'Content', required: true },
  { id: 'brand', name: 'Brand Consistency', required: true },
  { id: 'legal', name: 'Legal', required: true },
  { id: 'docker', name: 'Docker', required: false },
  { id: 'testing', name: 'Testing', required: false },
  { id: 'documentation', name: 'Documentation', required: false },
];

/** A single review finding, anchored to a gate and (when applicable) a file. */
export interface Finding {
  readonly id: string;
  readonly gate: GateId;
  readonly severity: Severity;
  readonly message: string;
  readonly file: string | undefined;
  readonly recommendation: string | undefined;
}

/** The result of one gate's review. */
export interface GateResult {
  readonly gate: GateId;
  readonly name: string;
  readonly required: boolean;
  readonly status: GateStatus;
  /** 0–100 quality score for the gate. */
  readonly score: number;
  readonly findings: readonly Finding[];
  readonly summary: string;
}

let counter = 0;

/** Builds a finding with a stable, sequential id. Reset per review by {@link resetFindingIds}. */
export function finding(
  gate: GateId,
  severity: Severity,
  message: string,
  options: { file?: string; recommendation?: string } = {},
): Finding {
  counter += 1;
  return {
    id: `${gate}-${counter}`,
    gate,
    severity,
    message,
    file: options.file,
    recommendation: options.recommendation,
  };
}

export function resetFindingIds(): void {
  counter = 0;
}
