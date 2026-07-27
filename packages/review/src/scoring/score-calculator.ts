import type { GateId, GateResult } from '../types/index.js';

export type ReleaseRecommendation = 'ready' | 'conditional' | 'not-ready';

/** The computed quality scores across all gates plus the release recommendation. */
export interface QualityScore {
  /** Average of every gate's score, 0–100. */
  readonly overall: number;
  /** Average of the required gates' scores, 0–100 — the production readiness score. */
  readonly readiness: number;
  readonly byGate: Readonly<Record<string, number>>;
  /** True when no required gate is failing. */
  readonly requiredPassed: boolean;
  readonly recommendation: ReleaseRecommendation;
}

/**
 * Computes quality scores deterministically from the gate results: per-gate, overall, and a
 * readiness score over the required gates. The recommendation is `not-ready` if any required gate
 * fails, `conditional` if everything required passes but warnings remain, and `ready` only when
 * every gate is clean — a machine signal that still leaves the release decision to a human.
 */
export class ScoreCalculator {
  calculate(gates: readonly GateResult[]): QualityScore {
    const byGate: Record<string, number> = {};
    for (const gate of gates) {
      byGate[gate.gate] = gate.score;
    }

    const required = gates.filter((gate) => gate.required);
    const requiredPassed = required.every((gate) => gate.status !== 'fail');
    const overall = average(gates.map((gate) => gate.score));
    const readiness = average(required.map((gate) => gate.score));

    let recommendation: ReleaseRecommendation;
    if (!requiredPassed) {
      recommendation = 'not-ready';
    } else if (gates.some((gate) => gate.status !== 'pass')) {
      recommendation = 'conditional';
    } else {
      recommendation = 'ready';
    }

    return { overall, readiness, byGate, requiredPassed, recommendation };
  }

  /** The score for a single gate id, or 0 if absent. */
  gateScore(byGate: Readonly<Record<string, number>>, gate: GateId): number {
    return byGate[gate] ?? 0;
  }
}

function average(values: readonly number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}
