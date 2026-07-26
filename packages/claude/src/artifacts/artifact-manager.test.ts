import { describe, expect, it } from 'vitest';
import { EMPTY_ARTIFACT_INDEX } from '../models/index.js';
import { ClaudeArtifactManager } from './artifact-manager.js';

describe('ClaudeArtifactManager', () => {
  const manager = new ClaudeArtifactManager();
  const at = '2026-07-26T12:00:00.000Z';

  it('classifies artifacts from their paths', () => {
    expect(manager.classify('Dockerfile')).toBe('docker');
    expect(manager.classify('app/legal/privacy/page.tsx')).toBe('legal');
    expect(manager.classify('app/api/contact/route.ts')).toBe('api');
    expect(manager.classify('components/Button.test.tsx')).toBe('test');
    expect(manager.classify('app/page.tsx')).toBe('page');
    expect(manager.classify('components/Card.tsx')).toBe('component');
    expect(manager.classify('prisma/schema.prisma')).toBe('schema');
    expect(manager.classify('styles/globals.css')).toBe('style');
    expect(manager.classify('README.md')).toBe('doc');
    expect(manager.classify('tsconfig.json')).toBe('config');
  });

  it('adds artifacts and replaces on duplicate path', () => {
    let index = manager.add(EMPTY_ARTIFACT_INDEX, { path: 'app/page.tsx', createdAt: at });
    index = manager.add(index, { path: 'app/page.tsx', title: 'Home', createdAt: at });
    expect(index.artifacts).toHaveLength(1);
    expect(index.artifacts[0]?.title).toBe('Home');
  });

  it('indexes by kind and counts', () => {
    const index = manager.addAll(EMPTY_ARTIFACT_INDEX, [
      { path: 'components/A.tsx', createdAt: at },
      { path: 'components/B.tsx', createdAt: at },
      { path: 'Dockerfile', createdAt: at },
    ]);
    expect(manager.byKind(index, 'component')).toHaveLength(2);
    expect(manager.countByKind(index).get('docker')).toBe(1);
  });

  it('removes an artifact by path', () => {
    let index = manager.add(EMPTY_ARTIFACT_INDEX, { path: 'a.ts', createdAt: at });
    index = manager.remove(index, 'a.ts');
    expect(index.artifacts).toHaveLength(0);
  });
});
