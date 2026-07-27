import type { Finding, GateId, GateResult, GateStatus, Severity } from '../types/index.js';

/** Points deducted from a gate's score per finding severity. */
const PENALTY: Readonly<Record<Severity, number>> = {
  blocker: 40,
  major: 15,
  minor: 5,
  nit: 1,
};

/**
 * Grades a gate deterministically from its findings: the score starts at 100 and loses points by
 * severity; the status is a fail if any blocker is present, a warn if any major or minor remains,
 * and a pass otherwise. This single function keeps every reviewer's scoring consistent.
 */
export function gradeGate(
  gate: GateId,
  name: string,
  required: boolean,
  findings: readonly Finding[],
): GateResult {
  let score = 100;
  for (const item of findings) {
    score -= PENALTY[item.severity];
  }
  score = Math.max(0, Math.min(100, score));

  const status = statusOf(findings);
  return { gate, name, required, status, score, findings, summary: summarize(status, findings) };
}

function statusOf(findings: readonly Finding[]): GateStatus {
  if (findings.some((f) => f.severity === 'blocker')) {
    return 'fail';
  }
  if (findings.some((f) => f.severity === 'major' || f.severity === 'minor')) {
    return 'warn';
  }
  return 'pass';
}

function summarize(status: GateStatus, findings: readonly Finding[]): string {
  if (findings.length === 0) {
    return 'Passed with no findings.';
  }
  const counts = findings.reduce<Record<string, number>>((acc, f) => {
    acc[f.severity] = (acc[f.severity] ?? 0) + 1;
    return acc;
  }, {});
  const parts = Object.entries(counts).map(([severity, count]) => `${count} ${severity}`);
  return `${status.toUpperCase()} — ${parts.join(', ')}.`;
}
