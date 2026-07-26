import { describe, expect, it } from 'vitest';
import { EMPTY_ARTIFACT_INDEX, EMPTY_HISTORY, EMPTY_PROGRESS } from '../models/index.js';
import { InMemoryFileSystem } from '../testing/fs.js';
import { FixedClock, buildContextInput, buildSnapshot } from '../testing/fixtures.js';
import { ClaudeEngine } from './claude-engine.js';

describe('ClaudeEngine', () => {
  const engine = new ClaudeEngine(new FixedClock(), { frameworkVersion: '2.0' });

  it('builds a context file for Claude to read first', () => {
    const context = engine.buildContext(buildContextInput());
    expect(context.path).toBe('.cef/generated/context.md');
    expect(context.content).toContain('CEF Context');
  });

  it('reports status with completion and milestone counts', () => {
    const status = engine.buildStatus(buildContextInput());
    expect(status.frameworkVersion).toBe('2.0');
    expect(status.completedMilestones + status.pendingMilestones).toBeGreaterThan(0);
    const rendered = engine.renderStatus(status);
    expect(rendered).toContain('Framework           CEF 2.0');
  });

  it('produces a task-scoped prompt', () => {
    const prompt = engine.buildPrompt({ categories: ['seo'], objective: 'Add metadata' });
    expect(prompt.text).toContain('## SEO');
    expect(prompt.text).toContain('Add metadata');
  });

  it('plans and applies a full sync to the filesystem', async () => {
    const fs = new InMemoryFileSystem();
    const plan = engine.planSync({
      snapshot: buildSnapshot(),
      progress: EMPTY_PROGRESS,
      session: engine.sessions.start('s1'),
      history: EMPTY_HISTORY,
      artifacts: EMPTY_ARTIFACT_INDEX,
      openDecisions: [],
      recentChanges: [],
      generatedAt: '2026-07-26T12:00:00.000Z',
    });
    const result = await engine.applySync(fs, '/project', plan);
    expect(result.filesWritten).toBe(plan.files.length);
    expect(await fs.exists('/project/.cef/roadmap.md')).toBe(true);
  });

  it('validates a freshly generated project as consistent', () => {
    const input = buildContextInput();
    const memory = engine.buildMemory({
      snapshot: input.snapshot,
      roadmap: input.roadmap,
      session: input.session,
    });
    const report = engine.validate({
      snapshot: input.snapshot,
      roadmap: input.roadmap,
      session: input.session,
      memory,
      manifestEngines: input.snapshot.engines,
      contextGeneratedAt: input.generatedAt,
      latestChangeAt: input.generatedAt,
    });
    expect(report.ok).toBe(true);
  });
});
