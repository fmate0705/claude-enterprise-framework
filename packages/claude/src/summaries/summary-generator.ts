import { ClaudeCompressionEngine } from '../compression/index.js';
import type { ClaudeContextInput } from '../models/index.js';

/**
 * Produces a concise, human-readable project summary — the elevator pitch of the project's state.
 * It reuses the already-derived snapshot and roadmap rather than recomputing anything, keeping it
 * a pure projection with no duplicated logic.
 */
export class ClaudeSummaryGenerator {
  constructor(
    private readonly compression: ClaudeCompressionEngine = new ClaudeCompressionEngine(),
  ) {}

  generate(input: ClaudeContextInput): string {
    const { snapshot, roadmap } = input;
    const lines: string[] = [];
    lines.push(`# ${snapshot.name}`);
    lines.push('');
    if (snapshot.description !== undefined && snapshot.description.trim().length > 0) {
      lines.push(this.compression.summarize(snapshot.description, 240));
      lines.push('');
    }
    lines.push(
      `A ${snapshot.type} on ${snapshot.stack.framework} (${snapshot.stack.language}), ` +
        `${roadmap.completionPercent}% complete across ${roadmap.milestones.length} milestones.`,
    );
    lines.push('');
    lines.push(`- Capabilities: ${snapshot.capabilities.length}`);
    lines.push(`- Skills: ${snapshot.skills.length > 0 ? snapshot.skills.join(', ') : '—'}`);
    lines.push(`- MCPs: ${snapshot.mcp.length > 0 ? snapshot.mcp.join(', ') : '—'}`);
    if (roadmap.nextAction !== undefined) {
      lines.push('');
      lines.push(`Next: ${roadmap.nextAction}.`);
    }
    return `${lines.join('\n').trimEnd()}\n`;
  }
}
