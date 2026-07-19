import { describe, expect, it } from 'vitest';
import { readCliVersion } from './version.js';

describe('readCliVersion', () => {
  it('returns the CLI package version as a semver string', () => {
    expect(readCliVersion()).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
