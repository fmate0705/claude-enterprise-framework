import { describe, expect, it } from 'vitest';
import { EventBus } from '../events/index.js';
import type { RuntimeEventType } from '../events/index.js';
import { SilentLogger } from '../logging/index.js';
import { InMemoryFileSystem } from '../testing/in-memory-fs.js';
import { Runtime } from './runtime.js';

const projectFiles = (engines: readonly string[]): Record<string, string> => ({
  '/project/.cef/manifest.yaml': `frameworkVersion: 2
project:
  name: app
  type: landing-page
engines:
${engines.map((engine) => `  - ${engine}`).join('\n')}
skills:
  - taste
mcp:
  - chrome-devtools
`,
  '/project/.cef/project.json': JSON.stringify({ name: 'app', framework: 'nextjs' }),
  '/project/.cef/runtime.json': JSON.stringify({ frameworkVersion: 2, enabledModules: engines }),
});

const boot = (files: Record<string, string>, events?: EventBus) =>
  new Runtime().boot({
    projectRoot: '/project',
    fs: new InMemoryFileSystem(files),
    logger: new SilentLogger(),
    ...(events ? { events } : {}),
  });

describe('Runtime.boot (integration)', () => {
  it('boots a project into a ready session with a valid execution order', async () => {
    const result = await boot(projectFiles(['core', 'seo', 'commerce']));
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    const session = result.value;
    expect(session.status).toBe('ready');
    expect(session.engines).toEqual(
      expect.arrayContaining(['core', 'seo', 'commerce', 'security', 'validation']),
    );

    const position = (id: string): number => session.engines.indexOf(id);
    expect(position('core')).toBeLessThan(position('commerce'));
    expect(position('security')).toBeLessThan(position('commerce'));
    expect(position('validation')).toBeLessThan(position('commerce'));
  });

  it('resolves skills and MCPs from the manifest and the active engines', async () => {
    const result = await boot(projectFiles(['core', 'seo']));
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    const session = result.value;
    expect(session.skills).toContain('taste'); // from the manifest
    expect(session.skills).toContain('seo-skill'); // provided by the seo engine
    expect(session.mcp).toContain('chrome-devtools'); // manifest + validation engine
    expect(session.capabilities.length).toBe(
      session.engines.length + session.skills.length + session.mcp.length,
    );
  });

  it('emits lifecycle events in order, ending with RuntimeReady', async () => {
    const events = new EventBus();
    const seen: RuntimeEventType[] = [];
    const tracked: readonly RuntimeEventType[] = [
      'RuntimeStarted',
      'ManifestLoaded',
      'PluginsResolved',
      'ExecutionGraphCreated',
      'ValidationFinished',
      'RuntimeReady',
    ];
    for (const type of tracked) {
      events.on(type, (event) => seen.push(event.type));
    }

    const result = await boot(projectFiles(['core']), events);
    expect(result.ok).toBe(true);
    expect(seen[0]).toBe('RuntimeStarted');
    expect(seen.at(-1)).toBe('RuntimeReady');
    expect(seen).toContain('ExecutionGraphCreated');
    expect(seen).toContain('ValidationFinished');
  });

  it('fails at configuration first for a completely empty project (lifecycle order)', async () => {
    const result = await boot({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('CONFIGURATION_INVALID');
    }
  });

  it('fails with MANIFEST_NOT_FOUND when the manifest is missing', async () => {
    const result = await boot({
      '/project/.cef/runtime.json': JSON.stringify({ frameworkVersion: 2, enabledModules: [] }),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('MANIFEST_NOT_FOUND');
    }
  });
});
