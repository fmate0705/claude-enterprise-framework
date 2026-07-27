import { describe, expect, it } from 'vitest';
import { ApprovalEngine } from './approval-engine.js';

describe('ApprovalEngine', () => {
  const engine = new ApprovalEngine();

  it('allows draft → internal-review with no guards', () => {
    const result = engine.advance('draft', 'internal-review', {
      qaPassed: false,
      actor: undefined,
    });
    expect(result.ok).toBe(true);
  });

  it('rejects an illegal transition', () => {
    const result = engine.advance('draft', 'released', { qaPassed: true, actor: 'Jo' });
    expect(result.ok).toBe(false);
  });

  it('requires QA to pass before qa-passed', () => {
    expect(
      engine.advance('internal-review', 'qa-passed', { qaPassed: false, actor: undefined }).ok,
    ).toBe(false);
    expect(
      engine.advance('internal-review', 'qa-passed', { qaPassed: true, actor: undefined }).ok,
    ).toBe(true);
  });

  it('requires a human actor to approve — never auto-approves', () => {
    expect(
      engine.advance('client-review', 'approved', { qaPassed: true, actor: undefined }).ok,
    ).toBe(false);
    expect(
      engine.advance('client-review', 'approved', { qaPassed: true, actor: 'Client' }).ok,
    ).toBe(true);
  });

  it('requires a human actor to release', () => {
    expect(
      engine.advance('ready-for-production', 'released', { qaPassed: true, actor: undefined }).ok,
    ).toBe(false);
    expect(
      engine.advance('ready-for-production', 'released', { qaPassed: true, actor: 'Owner' }).ok,
    ).toBe(true);
  });

  it('supports the revision loop', () => {
    expect(
      engine.advance('internal-review', 'revision-requested', { qaPassed: false, actor: undefined })
        .ok,
    ).toBe(true);
    expect(
      engine.advance('revision-requested', 'internal-review', { qaPassed: false, actor: undefined })
        .ok,
    ).toBe(true);
  });
});
