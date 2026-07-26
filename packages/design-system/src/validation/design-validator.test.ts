import { describe, expect, it } from 'vitest';
import { baseTokens } from '../tokens/index.js';
import { DesignValidator } from './design-validator.js';

describe('DesignValidator', () => {
  const validator = new DesignValidator();

  it('passes the complete, default design system', () => {
    const report = validator.validate();
    expect(report.ok, JSON.stringify(report.issues)).toBe(true);
    expect(report.issues).toHaveLength(0);
  });

  it('flags non-positive grid columns', () => {
    const report = validator.validateTokens({ ...baseTokens, gridColumns: 0 });
    expect(report.ok).toBe(false);
  });

  it('flags a non-monotonic type scale', () => {
    const broken = {
      ...baseTokens,
      typography: {
        ...baseTokens.typography,
        scale: {
          ...baseTokens.typography.scale,
          '7xl': { sizeRem: 0.1, lineHeight: 1, trackingEm: 0 },
        },
      },
    };
    expect(validator.validateTypography(broken).ok).toBe(false);
  });

  it('flags breakpoints that do not strictly increase', () => {
    const broken = { ...baseTokens, breakpoints: { ...baseTokens.breakpoints, md: 640 } };
    expect(validator.validateResponsive(broken).ok).toBe(false);
  });
});
