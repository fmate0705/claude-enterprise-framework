import { describe, expect, it } from 'vitest';
import { CEF_CORE_VERSION } from './index.js';

describe('@cef/core', () => {
  it('exposes a semver-shaped version constant', () => {
    expect(CEF_CORE_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
