import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { Git, Ports, Prompter, ProjectSpec } from '@cef/core';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';
import { ConsoleLogger, NodeFileSystem } from '../../adapters.js';
import { ProjectGenerator } from './generator.js';
import { DEFAULT_SPEC } from './spec-schema.js';

/** Ports for generation without git/prompts: those collaborators must not be touched. */
const guardedPorts = (): Ports => ({
  fs: new NodeFileSystem(),
  logger: new ConsoleLogger('error'),
  clock: { now: () => new Date('2026-01-01T00:00:00.000Z') },
  prompter: new Proxy({} as Prompter, {
    get() {
      throw new Error('prompter must not be used during generation');
    },
  }),
  git: new Proxy({} as Git, {
    get() {
      throw new Error('git must not be used when initGit is false');
    },
  }),
});

describe('ProjectGenerator (integration)', () => {
  let workdir: string;

  beforeAll(async () => {
    workdir = await mkdtemp(join(tmpdir(), 'cef-it-'));
  });

  afterAll(async () => {
    await rm(workdir, { recursive: true, force: true });
  });

  it('generates a complete, well-formed project on disk', async () => {
    const spec: ProjectSpec = { ...DEFAULT_SPEC, name: 'acme', initGit: false };
    const root = join(workdir, 'acme');

    const result = await new ProjectGenerator(guardedPorts()).generate(spec, {
      root,
      cefVersion: '0.0.0',
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.value.filesWritten).toBeGreaterThan(20);
    expect(result.value.gitInitialized).toBe(false);

    const manifest = parseYaml(await readFile(join(root, '.cef/manifest.yaml'), 'utf8')) as {
      project: { name: string };
      engines: string[];
      docker: { port: number };
    };
    expect(manifest.project.name).toBe('acme');
    expect(manifest.engines).toContain('core');
    expect(manifest.docker.port).toBe(3000);

    const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8')) as { name: string };
    expect(pkg.name).toBe('acme');

    const claude = await readFile(join(root, 'CLAUDE.md'), 'utf8');
    expect(claude).toContain('acme');
  });

  it('generates Hungarian legal drafts when the country is Hungary', async () => {
    const spec: ProjectSpec = {
      ...DEFAULT_SPEC,
      name: 'magyar',
      country: 'Hungary',
      initGit: false,
    };
    const root = join(workdir, 'magyar');

    await new ProjectGenerator(guardedPorts()).generate(spec, { root, cefVersion: '0.0.0' });

    const impresszum = await readFile(join(root, 'content/legal/impresszum.md'), 'utf8');
    expect(impresszum).toContain('Impresszum');
    expect(impresszum).toContain('NEM JOGI TANÁCS');
  });

  it('refuses to overwrite a non-empty target', async () => {
    const spec: ProjectSpec = { ...DEFAULT_SPEC, name: 'twice', initGit: false };
    const root = join(workdir, 'twice');
    const generator = new ProjectGenerator(guardedPorts());

    const first = await generator.generate(spec, { root, cefVersion: '0.0.0' });
    expect(first.ok).toBe(true);

    const second = await generator.generate(spec, { root, cefVersion: '0.0.0' });
    expect(second.ok).toBe(false);
    if (!second.ok) {
      expect(second.error.code).toBe('TARGET_NOT_EMPTY');
    }
  });
});
