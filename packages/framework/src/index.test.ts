import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { frameworkRoot } from './index.js';

describe('@cef/framework', () => {
  it('locates its own package root', () => {
    expect(existsSync(frameworkRoot())).toBe(true);
  });

  it('ships a framework manifest declaring a framework version', () => {
    const manifest = readFileSync(join(frameworkRoot(), 'framework.manifest.yaml'), 'utf8');
    expect(manifest).toMatch(/frameworkVersion:\s*\d+/);
  });
});
