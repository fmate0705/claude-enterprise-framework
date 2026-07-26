import { describe, expect, it } from 'vitest';
import { MEMORY_FILE_IDS } from '../models/index.js';
import { ClaudeRoadmapGenerator } from '../roadmap/index.js';
import { buildSession, buildSnapshot } from '../testing/fixtures.js';
import { ClaudeMemoryManager } from './memory-manager.js';

describe('ClaudeMemoryManager', () => {
  const manager = new ClaudeMemoryManager();
  const snapshot = buildSnapshot();
  const roadmap = new ClaudeRoadmapGenerator().generate(snapshot);
  const session = buildSession();

  it('renders all seven memory files, none empty', () => {
    const docs = manager.render({ snapshot, roadmap, session });
    expect(docs.map((doc) => doc.id)).toEqual([...MEMORY_FILE_IDS]);
    for (const doc of docs) {
      expect(doc.content.trim().length).toBeGreaterThan(0);
      expect(doc.path.startsWith('.cef/memory/')).toBe(true);
    }
  });

  it('is deterministic — same input, same bytes', () => {
    const a = manager.render({ snapshot, roadmap, session });
    const b = manager.render({ snapshot, roadmap, session });
    expect(a).toEqual(b);
  });

  it('derives decisions from the resolved stack', () => {
    const decisions = manager
      .render({ snapshot, roadmap, session })
      .find((d) => d.id === 'decisions');
    expect(decisions?.content).toContain('Framework: nextjs');
    expect(decisions?.content).toContain('Server-first architecture');
  });

  it('reports no known issues when the session has no errors', () => {
    const issues = manager
      .render({ snapshot, roadmap, session })
      .find((doc) => doc.id === 'known-issues');
    expect(issues?.content).toContain('No known issues');
  });
});
