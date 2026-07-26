import { describe, expect, it } from 'vitest';
import { EMPTY_HISTORY } from '../models/index.js';
import { FixedClock } from '../testing/fixtures.js';
import { ClaudeSessionManager } from './session-manager.js';

describe('ClaudeSessionManager', () => {
  const clock = new FixedClock(new Date('2026-07-26T12:00:00.000Z'));
  const manager = new ClaudeSessionManager(clock);

  it('starts a session with deterministic timestamps', () => {
    const state = manager.start('s1');
    expect(state.startedAt).toBe('2026-07-26T12:00:00.000Z');
    expect(state.updatedAt).toBe(state.startedAt);
    expect(state.events).toHaveLength(0);
  });

  it('records commands, files, and errors immutably', () => {
    const start = manager.start('s1');
    const withCommand = manager.recordCommand(start, 'cef context');
    expect(start.commandsExecuted).toHaveLength(0); // original unchanged
    expect(withCommand.commandsExecuted).toEqual(['cef context']);

    const withFile = manager.recordFileModified(withCommand, 'app/page.tsx');
    const withError = manager.recordError(withFile, 'Build failed');
    expect(withError.filesModified).toEqual(['app/page.tsx']);
    expect(withError.errors).toEqual(['Build failed']);
    expect(withError.events).toHaveLength(3);
  });

  it('deduplicates repeated commands and files', () => {
    let state = manager.start('s1');
    state = manager.recordCommand(state, 'cef sync');
    state = manager.recordCommand(state, 'cef sync');
    expect(state.commandsExecuted).toEqual(['cef sync']);
  });

  it('renders current-session markdown', () => {
    let state = manager.start('s1');
    state = manager.setMilestone(state, 'SEO capability');
    const rendered = manager.render(state);
    expect(rendered.path).toBe('.cef/session/current-session.md');
    expect(rendered.content).toContain('SEO capability');
  });

  it('appends a compact summary to history', () => {
    let state = manager.start('s1');
    state = manager.recordCommand(state, 'cef status');
    const history = manager.appendToHistory(EMPTY_HISTORY, state);
    expect(history.sessions).toHaveLength(1);
    expect(history.sessions[0]?.commandCount).toBe(1);
  });
});
