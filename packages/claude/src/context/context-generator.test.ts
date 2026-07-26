import { describe, expect, it } from 'vitest';
import { buildContextInput } from '../testing/fixtures.js';
import { ClaudeContextGenerator } from './context-generator.js';

describe('ClaudeContextGenerator', () => {
  const generator = new ClaudeContextGenerator();

  it('writes to the canonical context path with every required section', () => {
    const context = generator.generate(buildContextInput());
    expect(context.path).toBe('.cef/generated/context.md');
    for (const heading of [
      '## Project Summary',
      '## Architecture Summary',
      '## Current Progress',
      '## Enabled Engines',
      '## Enabled Capabilities',
      '## Framework Version & Technology Stack',
      '## Directory Overview',
      '## Coding Standards',
      '## Active Skills & MCPs',
      '## Current Milestone',
      '## Outstanding Tasks',
      '## Known Constraints',
      '## Open Decisions',
      '## Recent Changes',
      '## Next Recommended Action',
    ]) {
      expect(context.content).toContain(heading);
    }
  });

  it('references capability detail instead of inlining it', () => {
    const context = generator.generate(buildContextInput());
    expect(context.content).toContain('load on demand');
    expect(context.tokenEstimate).toBeGreaterThan(0);
  });

  it('is deterministic for the same input', () => {
    const input = buildContextInput();
    expect(generator.generate(input).content).toBe(generator.generate(input).content);
  });
});
