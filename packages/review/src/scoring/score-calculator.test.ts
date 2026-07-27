import { describe, expect, it } from 'vitest';
import { QAEngine } from '../qa/index.js';
import { cleanSite, reviewInput } from '../testing/fixtures.js';
import { ScoreCalculator } from './score-calculator.js';

describe('ScoreCalculator', () => {
  const calculator = new ScoreCalculator();
  const qa = new QAEngine();

  it('computes overall and readiness as gate averages', () => {
    const gates = qa.run(reviewInput());
    const score = calculator.calculate(gates);
    const expectedOverall = Math.round(gates.reduce((sum, g) => sum + g.score, 0) / gates.length);
    expect(score.overall).toBe(expectedOverall);
    expect(score.requiredPassed).toBe(true);
  });

  it('recommends not-ready when a required gate fails', () => {
    const files = cleanSite();
    files.delete('app/layout.tsx'); // breaks accessibility + architecture
    const score = calculator.calculate(qa.run(reviewInput(files)));
    expect(score.recommendation).toBe('not-ready');
    expect(score.requiredPassed).toBe(false);
  });

  it('recommends conditional when required gates pass but warnings remain', () => {
    const score = calculator.calculate(qa.run(reviewInput()));
    expect(score.recommendation).toBe('conditional');
  });
});
