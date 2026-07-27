import { describe, expect, it } from 'vitest';
import { EMPTY_HISTORY, RevisionManager } from './revision-manager.js';

describe('RevisionManager', () => {
  const manager = new RevisionManager();

  it('records revisions with sequential numbers and rollback points', () => {
    const first = manager.record(EMPTY_HISTORY, {
      changedFiles: ['app/page.tsx'],
      reason: 'Initial',
      author: 'CEF',
      approvalState: 'draft',
      at: '2026-07-27T00:00:00.000Z',
    });
    const second = manager.record(first, {
      changedFiles: ['app/about/page.tsx'],
      reason: 'Client change',
      author: 'CEF',
      approvalState: 'revision-requested',
      at: '2026-07-27T01:00:00.000Z',
    });
    expect(first.revisions[0]?.number).toBe(1);
    expect(first.revisions[0]?.rollbackPoint).toBe('initial');
    expect(second.revisions[1]?.number).toBe(2);
    expect(second.revisions[1]?.rollbackPoint).toBe('1');
  });

  it('is immutable — recording does not mutate the prior history', () => {
    const first = manager.record(EMPTY_HISTORY, {
      changedFiles: [],
      reason: 'r',
      author: 'a',
      approvalState: 'draft',
      at: 't',
    });
    manager.record(first, {
      changedFiles: [],
      reason: 'r2',
      author: 'a',
      approvalState: 'draft',
      at: 't2',
    });
    expect(first.revisions).toHaveLength(1); // unchanged
    expect(EMPTY_HISTORY.revisions).toHaveLength(0);
  });
});
