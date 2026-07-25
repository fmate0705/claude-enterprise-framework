import type { FileSystem } from '@cef/core';
import { isErr, isOk } from '@cef/core';
import { describe, expect, it } from 'vitest';
import { DEFAULT_SPEC } from './spec-schema.js';
import { validateSpec, validateTarget } from './validation.js';

const fakeFs = (overrides: Partial<FileSystem> = {}): FileSystem => ({
  exists: async () => false,
  isDirectory: async () => true,
  readdir: async () => [],
  readFile: async () => '',
  writeFile: async () => undefined,
  mkdir: async () => undefined,
  ...overrides,
});

describe('validateSpec', () => {
  it('accepts a valid spec', () => {
    expect(isOk(validateSpec({ ...DEFAULT_SPEC, name: 'law-firm' }))).toBe(true);
  });

  it('rejects an invalid project name', () => {
    const result = validateSpec({ ...DEFAULT_SPEC, name: 'Bad Name!' });
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error.code).toBe('INVALID_INPUT');
    }
  });
});

describe('validateTarget', () => {
  it('accepts a non-existent target', async () => {
    expect(isOk(await validateTarget(fakeFs({ exists: async () => false }), '/x'))).toBe(true);
  });

  it('accepts a directory containing only .git', async () => {
    const fs = fakeFs({ exists: async () => true, readdir: async () => ['.git'] });
    expect(isOk(await validateTarget(fs, '/x'))).toBe(true);
  });

  it('rejects a non-empty directory', async () => {
    const fs = fakeFs({ exists: async () => true, readdir: async () => ['index.html'] });
    const result = await validateTarget(fs, '/x');
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error.code).toBe('TARGET_NOT_EMPTY');
    }
  });

  it('rejects a target that is a file', async () => {
    const fs = fakeFs({ exists: async () => true, isDirectory: async () => false });
    expect(isErr(await validateTarget(fs, '/x'))).toBe(true);
  });
});
