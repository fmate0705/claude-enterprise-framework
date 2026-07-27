import { describe, expect, it } from 'vitest';
import { reviewInput } from '../testing/fixtures.js';
import { ReviewValidator } from '../validation/index.js';
import { ReviewEngine } from './review-engine.js';

describe('ReviewEngine', () => {
  const engine = new ReviewEngine();

  it('produces a scored review across all gates', () => {
    const result = engine.review(reviewInput(), 'draft');
    expect(result.gates).toHaveLength(12);
    expect(result.score.overall).toBeGreaterThan(0);
    expect(result.score.overall).toBeLessThanOrEqual(100);
  });

  it('never marks a draft release-ready — human approval is required', () => {
    const result = engine.review(reviewInput(), 'draft');
    expect(result.release.ready).toBe(false);
    expect(result.release.blockers.some((b) => b.includes('approval'))).toBe(true);
  });

  it('marks release-ready only once required gates pass and a human has approved', () => {
    const result = engine.review(reviewInput(), 'approved');
    expect(result.score.requiredPassed).toBe(true);
    expect(result.release.ready).toBe(true);
  });

  it('renders the five report files', () => {
    const result = engine.review(reviewInput(), 'draft');
    const paths = engine.reportFiles(result).map((f) => f.path);
    expect(paths).toEqual([
      '.cef/reports/review-report.md',
      '.cef/reports/quality-score.json',
      '.cef/reports/issues.json',
      '.cef/reports/recommendations.md',
      '.cef/reports/release-checklist.md',
    ]);
  });

  it('passes its own internal validation', () => {
    const result = engine.review(reviewInput(), 'draft');
    expect(new ReviewValidator().validate(result).ok).toBe(true);
  });
});
