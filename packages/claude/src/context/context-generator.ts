import { CONTEXT_PATH } from '../paths.js';
import { ClaudeCompressionEngine } from '../compression/index.js';
import { MEMORY_FILE_PATHS } from '../models/index.js';
import type { ClaudeContextInput, GeneratedContext } from '../models/index.js';

/**
 * Generates the composite, token-optimized `.cef/generated/context.md` — the single file Claude
 * reads to start work. It carries summaries, references, and metadata rather than verbose
 * documentation: capability detail is pointed at (loaded on demand), memory is linked, and the
 * whole document is de-duplicated by the compression engine. Generation is pure and deterministic.
 */
export class ClaudeContextGenerator {
  constructor(
    private readonly compression: ClaudeCompressionEngine = new ClaudeCompressionEngine(),
  ) {}

  generate(input: ClaudeContextInput): GeneratedContext {
    const { snapshot } = input;
    const sections: string[] = [];

    sections.push(
      [
        `# ${snapshot.name} — CEF Context`,
        '',
        `> Generated ${input.generatedAt}. Token-optimized context for Claude Code — regenerate with \`cef context\`.`,
      ].join('\n'),
    );

    sections.push(this.projectSummary(input));
    sections.push(this.architectureSummary(input));
    sections.push(this.currentProgress(input));
    sections.push(this.enabledEngines(input));
    sections.push(this.enabledCapabilities(input));
    sections.push(this.frameworkVersionAndStack(input));
    sections.push(this.directoryOverview(input));
    sections.push(this.codingStandards(input));
    sections.push(this.activeSkillsAndMcp(input));
    sections.push(this.currentMilestone(input));
    sections.push(this.outstandingTasks(input));
    sections.push(this.knownConstraints(input));
    sections.push(this.openDecisions(input));
    sections.push(this.recentChanges(input));
    sections.push(this.nextRecommendedAction(input));

    const content = `${this.compression.compressDocument(sections)}\n`;
    return {
      path: CONTEXT_PATH,
      content,
      tokenEstimate: this.compression.estimateTokens(content),
    };
  }

  private projectSummary(input: ClaudeContextInput): string {
    const { snapshot } = input;
    const lines = ['## Project Summary', `- Name: ${snapshot.name}`, `- Type: ${snapshot.type}`];
    if (snapshot.description !== undefined && snapshot.description.trim().length > 0) {
      lines.push(`- Summary: ${this.compression.summarize(snapshot.description, 220)}`);
    }
    return lines.join('\n');
  }

  private architectureSummary(input: ClaudeContextInput): string {
    const { snapshot } = input;
    return [
      '## Architecture Summary',
      `Server-first, token-optimized. ${snapshot.capabilities.length} capability modules active; ` +
        `floors (accessibility, security, performance, legal) are non-negotiable. ` +
        `Full memory: \`${MEMORY_FILE_PATHS.architecture}\`.`,
    ].join('\n');
  }

  private currentProgress(input: ClaudeContextInput): string {
    const { roadmap } = input;
    return [
      '## Current Progress',
      `${roadmap.completionPercent}% complete — ${roadmap.completedCount} completed, ` +
        `${roadmap.inProgressCount} in progress, ${roadmap.blockedCount} blocked, ` +
        `${roadmap.upcomingCount} upcoming.`,
    ].join('\n');
  }

  private enabledEngines(input: ClaudeContextInput): string {
    const { snapshot } = input;
    const added =
      snapshot.addedEngines.length > 0 ? ` (auto-added: ${snapshot.addedEngines.join(', ')})` : '';
    return ['## Enabled Engines', `${snapshot.engines.join(' → ')}${added}`].join('\n');
  }

  private enabledCapabilities(input: ClaudeContextInput): string {
    const { snapshot } = input;
    const lines = ['## Enabled Capabilities'];
    if (snapshot.capabilities.length === 0) {
      lines.push('None.');
      return lines.join('\n');
    }
    for (const compressed of this.compression.compressCapabilities(snapshot.capabilities)) {
      lines.push(`- **${compressed.id}** — ${compressed.summary} · ${compressed.reference}`);
    }
    return lines.join('\n');
  }

  private frameworkVersionAndStack(input: ClaudeContextInput): string {
    const { stack } = input.snapshot;
    const rows = [
      `- Framework: ${stack.framework} (framework version ${stack.frameworkVersion})`,
      `- Language: ${stack.language}`,
      `- Package manager: ${stack.packageManager}`,
    ];
    if (stack.buildSystem !== undefined) {
      rows.push(`- Build: ${stack.buildSystem}`);
    }
    if (stack.deployment !== undefined) {
      rows.push(`- Deployment: ${stack.deployment}`);
    }
    if (stack.database !== undefined) {
      rows.push(`- Database: ${stack.database}`);
    }
    return ['## Framework Version & Technology Stack', ...rows].join('\n');
  }

  private directoryOverview(input: ClaudeContextInput): string {
    const { directories } = input.snapshot;
    const lines = ['## Directory Overview'];
    if (directories.length === 0) {
      lines.push('Not yet scaffolded.');
      return lines.join('\n');
    }
    for (const entry of directories) {
      lines.push(`- \`${entry.path}\` — ${entry.purpose}`);
    }
    return lines.join('\n');
  }

  private codingStandards(input: ClaudeContextInput): string {
    const lines = ['## Coding Standards'];
    if (input.snapshot.prompts.length === 0) {
      lines.push('Follow the CEF constitution and rule engines.');
      return lines.join('\n');
    }
    for (const prompt of input.snapshot.prompts) {
      lines.push(`- **${prompt.name}:** ${this.compression.summarize(prompt.prompt, 200)}`);
    }
    return lines.join('\n');
  }

  private activeSkillsAndMcp(input: ClaudeContextInput): string {
    const { snapshot } = input;
    return [
      '## Active Skills & MCPs',
      `- Skills: ${list(snapshot.skills)}`,
      `- MCPs: ${list(snapshot.mcp)}`,
    ].join('\n');
  }

  private currentMilestone(input: ClaudeContextInput): string {
    const active = input.roadmap.milestones.find((milestone) => milestone.status === 'in-progress');
    const name = input.session.currentMilestone ?? active?.name ?? '—';
    return ['## Current Milestone', name].join('\n');
  }

  private outstandingTasks(input: ClaudeContextInput): string {
    const tasks = input.roadmap.milestones
      .filter((milestone) => milestone.status === 'in-progress' || milestone.status === 'upcoming')
      .flatMap((milestone) => milestone.tasks.filter((task) => !task.done))
      .slice(0, 10);
    const lines = ['## Outstanding Tasks'];
    if (tasks.length === 0) {
      lines.push('None — all planned tasks are complete.');
      return lines.join('\n');
    }
    for (const task of tasks) {
      lines.push(`- [ ] ${task.title}`);
    }
    return lines.join('\n');
  }

  private knownConstraints(input: ClaudeContextInput): string {
    const { constraints } = input.snapshot;
    const lines = ['## Known Constraints'];
    if (constraints.length === 0) {
      lines.push('Standard CEF floors apply.');
      return lines.join('\n');
    }
    for (const constraint of constraints) {
      lines.push(`- ${constraint}`);
    }
    return lines.join('\n');
  }

  private openDecisions(input: ClaudeContextInput): string {
    const lines = ['## Open Decisions'];
    if (input.openDecisions.length === 0) {
      lines.push('None open.');
      return lines.join('\n');
    }
    for (const decision of input.openDecisions) {
      lines.push(`- **${decision.title}** — ${decision.rationale}`);
    }
    return lines.join('\n');
  }

  private recentChanges(input: ClaudeContextInput): string {
    const lines = ['## Recent Changes'];
    if (input.recentChanges.length === 0) {
      lines.push('No changes recorded this session.');
      return lines.join('\n');
    }
    for (const change of input.recentChanges.slice(0, 8)) {
      lines.push(`- ${change}`);
    }
    return lines.join('\n');
  }

  private nextRecommendedAction(input: ClaudeContextInput): string {
    return [
      '## Next Recommended Action',
      input.roadmap.nextAction ??
        'Review completed work and certify against the Definition of Done.',
    ].join('\n');
  }
}

function list(values: readonly string[]): string {
  return values.length > 0 ? values.join(', ') : '—';
}
