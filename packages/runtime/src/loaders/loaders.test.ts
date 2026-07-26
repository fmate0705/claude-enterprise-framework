import { describe, expect, it } from 'vitest';
import { InMemoryFileSystem } from '../testing/in-memory-fs.js';
import { ConfigurationLoader, ContextLoader, ManifestLoader, ProjectLoader } from './index.js';

const ROOT = '/project';
const VALID_MANIFEST = `frameworkVersion: 2
project:
  name: app
  type: landing-page
engines:
  - core
  - seo
`;

describe('ManifestLoader', () => {
  it('loads a valid manifest', async () => {
    const fs = new InMemoryFileSystem({ '/project/.cef/manifest.yaml': VALID_MANIFEST });
    const result = await new ManifestLoader(fs).load(ROOT);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.engines).toEqual(['core', 'seo']);
      expect(result.value.project.name).toBe('app');
    }
  });

  it('errors with MANIFEST_NOT_FOUND when absent', async () => {
    const result = await new ManifestLoader(new InMemoryFileSystem()).load(ROOT);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('MANIFEST_NOT_FOUND');
    }
  });

  it('errors with INVALID_MANIFEST on a schema violation', async () => {
    const fs = new InMemoryFileSystem({ '/project/.cef/manifest.yaml': 'frameworkVersion: two\n' });
    const result = await new ManifestLoader(fs).load(ROOT);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('INVALID_MANIFEST');
    }
  });
});

describe('ProjectLoader and ConfigurationLoader', () => {
  it('loads a valid project.json', async () => {
    const fs = new InMemoryFileSystem({
      '/project/.cef/project.json': JSON.stringify({ name: 'app', framework: 'nextjs' }),
    });
    const result = await new ProjectLoader(fs).load(ROOT);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.framework).toBe('nextjs');
    }
  });

  it('loads a valid runtime.json', async () => {
    const fs = new InMemoryFileSystem({
      '/project/.cef/runtime.json': JSON.stringify({
        frameworkVersion: 2,
        enabledModules: ['core'],
      }),
    });
    const result = await new ConfigurationLoader(fs).load(ROOT);
    expect(result.ok).toBe(true);
  });

  it('errors with CONFIGURATION_INVALID when runtime.json is missing', async () => {
    const result = await new ConfigurationLoader(new InMemoryFileSystem()).load(ROOT);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('CONFIGURATION_INVALID');
    }
  });
});

describe('ContextLoader', () => {
  it('treats a missing context as an empty success', async () => {
    const result = await new ContextLoader(new InMemoryFileSystem()).load(ROOT);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBeUndefined();
    }
  });

  it('errors with CONTEXT_CORRUPTED on invalid JSON', async () => {
    const fs = new InMemoryFileSystem({ '/project/.cef/context.json': '{ not json' });
    const result = await new ContextLoader(fs).load(ROOT);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('CONTEXT_CORRUPTED');
    }
  });
});
