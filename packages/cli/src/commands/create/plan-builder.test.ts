import type { ProjectSpec } from '@cef/core';
import { describe, expect, it } from 'vitest';
import type { TemplateContext } from './context.js';
import { deriveCapabilities } from './factory.js';
import { PlanBuilder } from './plan-builder.js';
import { DEFAULT_SPEC } from './spec-schema.js';

const context = (overrides: Partial<ProjectSpec> = {}): TemplateContext => {
  const spec: ProjectSpec = { ...DEFAULT_SPEC, name: 'test-app', ...overrides };
  return {
    spec,
    capabilities: deriveCapabilities(spec),
    cefVersion: '0.0.0',
    createdAt: '2026-01-01T00:00:00.000Z',
  };
};

const pathsOf = (overrides: Partial<ProjectSpec> = {}): string[] =>
  new PlanBuilder('/tmp/project', context(overrides)).build().files.map((file) => file.path);

describe('PlanBuilder', () => {
  it('includes the required config, docs, docker, and CEF metadata files', () => {
    const paths = pathsOf();
    const required = [
      'package.json',
      'tsconfig.json',
      'eslint.config.js',
      '.prettierrc',
      '.editorconfig',
      '.gitignore',
      'CLAUDE.md',
      'README.md',
      'Dockerfile',
      'docker-compose.yml',
      '.env',
      '.cef/manifest.yaml',
      '.cef/project.json',
      '.cef/runtime.json',
      '.cef/memory.md',
    ];
    for (const file of required) {
      expect(paths).toContain(file);
    }
  });

  it('creates the base directory skeleton', () => {
    const { directories } = new PlanBuilder('/tmp/project', context()).build();
    for (const dir of ['app', 'components', 'features', 'lib', 'content', '.cef', '.claude']) {
      expect(directories).toContain(dir);
    }
  });

  it('omits legal files when they are not requested', () => {
    expect(pathsOf({ generateLegalPages: false }).some((p) => p.startsWith('content/legal/'))).toBe(
      false,
    );
    expect(pathsOf({ generateLegalPages: true }).some((p) => p.startsWith('content/legal/'))).toBe(
      true,
    );
  });

  it('includes the GitHub Actions workflow only when requested', () => {
    expect(pathsOf({ generateGithubActions: true })).toContain('.github/workflows/ci.yml');
    expect(pathsOf({ generateGithubActions: false })).not.toContain('.github/workflows/ci.yml');
  });

  it('records the generated files in the manifest', () => {
    const plan = new PlanBuilder('/tmp/project', context()).build();
    const manifest = plan.files.find((file) => file.path === '.cef/manifest.yaml');
    expect(manifest?.content).toContain('generatedFiles:');
    expect(manifest?.content).toContain('CLAUDE.md');
  });
});
