import { describe, expect, it } from 'vitest';
import { EMPTY_ARTIFACT_INDEX, EMPTY_HISTORY, EMPTY_PROGRESS } from '../models/index.js';
import { InMemoryFileSystem } from '../testing/fs.js';
import { buildSession, buildSnapshot } from '../testing/fixtures.js';
import { ClaudeSyncEngine, type SyncInput } from './sync-engine.js';

function syncInput(): SyncInput {
  return {
    snapshot: buildSnapshot(),
    progress: EMPTY_PROGRESS,
    session: buildSession(),
    history: EMPTY_HISTORY,
    artifacts: EMPTY_ARTIFACT_INDEX,
    openDecisions: [],
    recentChanges: ['Scaffolded the project'],
    generatedAt: '2026-07-26T12:00:00.000Z',
  };
}

describe('ClaudeSyncEngine', () => {
  const engine = new ClaudeSyncEngine();

  it('plans context, seven memory files, roadmap, session, and indexes', () => {
    const plan = engine.plan(syncInput());
    const paths = plan.files.map((file) => file.path);
    expect(paths).toContain('.cef/generated/context.md');
    expect(paths).toContain('.cef/roadmap.md');
    expect(paths).toContain('.cef/session/current-session.md');
    expect(paths).toContain('.cef/session/history.json');
    expect(paths).toContain('.cef/session/active-context.json');
    expect(paths).toContain('.cef/artifacts/index.json');
    expect(paths.filter((path) => path.startsWith('.cef/memory/'))).toHaveLength(7);
  });

  it('is deterministic — same input yields identical files', () => {
    const a = engine.plan(syncInput());
    const b = engine.plan(syncInput());
    expect(a.files).toEqual(b.files);
  });

  it('writes every planned file under the project root', async () => {
    const fs = new InMemoryFileSystem();
    const plan = engine.plan(syncInput());
    const result = await engine.apply(fs, '/project', plan);
    expect(result.filesWritten).toBe(plan.files.length);
    expect(await fs.exists('/project/.cef/generated/context.md')).toBe(true);
    expect(await fs.exists('/project/.cef/memory/decisions.md')).toBe(true);
  });
});
