import { describe, expect, it } from 'vitest';
import { ClaudeMemoryManager } from '../memory/index.js';
import { ClaudeRoadmapGenerator } from '../roadmap/index.js';
import { buildSession, buildSnapshot } from '../testing/fixtures.js';
import { ClaudeContextValidator, type ClaudeValidationInput } from './context-validator.js';

describe('ClaudeContextValidator', () => {
  const validator = new ClaudeContextValidator();
  const snapshot = buildSnapshot();
  const roadmap = new ClaudeRoadmapGenerator().generate(snapshot);
  const session = buildSession();
  const memory = new ClaudeMemoryManager().render({ snapshot, roadmap, session });

  const base: ClaudeValidationInput = {
    snapshot,
    roadmap,
    session,
    memory,
    manifestEngines: snapshot.engines,
    contextGeneratedAt: '2026-07-26T12:00:00.000Z',
    latestChangeAt: '2026-07-26T12:00:00.000Z',
  };

  it('passes a consistent, fresh project', () => {
    const report = validator.validate(base);
    expect(report.ok).toBe(true);
    expect(report.issues).toHaveLength(0);
  });

  it('errors when a manifest engine is missing from the snapshot', () => {
    const report = validator.validate({ ...base, manifestEngines: [...snapshot.engines, 'ghost'] });
    expect(report.ok).toBe(false);
    expect(report.issues.some((issue) => issue.message.includes('ghost'))).toBe(true);
  });

  it('errors when a memory file is missing', () => {
    const report = validator.validate({ ...base, memory: memory.slice(0, 3) });
    expect(report.ok).toBe(false);
  });

  it('warns when the context is stale', () => {
    const report = validator.validate({
      ...base,
      contextGeneratedAt: '2026-07-26T11:00:00.000Z',
      latestChangeAt: '2026-07-26T12:00:00.000Z',
    });
    expect(report.ok).toBe(true); // freshness is a warning, not an error
    expect(report.issues.some((issue) => issue.severity === 'warning')).toBe(true);
  });

  it('warns when there is no generated context yet', () => {
    const report = validator.validate({ ...base, contextGeneratedAt: undefined });
    expect(report.issues.some((issue) => issue.message.includes('cef context'))).toBe(true);
  });
});
