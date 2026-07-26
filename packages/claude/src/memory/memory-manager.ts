import {
  MEMORY_FILE_IDS,
  MEMORY_FILE_PATHS,
  type MemoryDocument,
  type MemoryFileId,
  type ProjectSnapshot,
  type Roadmap,
  type SessionState,
} from '../models/index.js';
import { ClaudeCompressionEngine } from '../compression/index.js';
import { MemoryDeriver } from './memory-deriver.js';

export interface MemoryInput {
  readonly snapshot: ProjectSnapshot;
  readonly roadmap: Roadmap;
  readonly session: SessionState;
}

/**
 * Renders the seven project-memory documents as a projection of the snapshot, roadmap, and
 * session. Each file is concise and regenerated deterministically; the same input always yields
 * the same bytes, so memory never needs hand-editing and never drifts. Claude reads these; the
 * Runtime rewrites them on sync.
 */
export class ClaudeMemoryManager {
  constructor(
    private readonly compression: ClaudeCompressionEngine = new ClaudeCompressionEngine(),
    private readonly deriver: MemoryDeriver = new MemoryDeriver(),
  ) {}

  render(input: MemoryInput): readonly MemoryDocument[] {
    return MEMORY_FILE_IDS.map((id) => this.document(id, input));
  }

  private document(id: MemoryFileId, input: MemoryInput): MemoryDocument {
    const body = this.body(id, input);
    return { id, path: MEMORY_FILE_PATHS[id], content: `${body.trimEnd()}\n` };
  }

  private body(id: MemoryFileId, input: MemoryInput): string {
    switch (id) {
      case 'project':
        return this.project(input.snapshot);
      case 'architecture':
        return this.architecture(input.snapshot);
      case 'requirements':
        return this.requirements(input.snapshot);
      case 'decisions':
        return this.decisions(input.snapshot);
      case 'todos':
        return this.todos(input.roadmap);
      case 'known-issues':
        return this.knownIssues(input.session);
      case 'future':
        return this.future(input.roadmap);
    }
  }

  private project(snapshot: ProjectSnapshot): string {
    const { stack } = snapshot;
    const lines = [
      '# Project',
      '',
      `- Name: ${snapshot.name}`,
      `- Type: ${snapshot.type}`,
      `- CEF version: ${snapshot.cefVersion}`,
      `- Stack: ${stack.framework} · ${stack.language} · ${stack.packageManager}`,
    ];
    if (snapshot.description !== undefined && snapshot.description.trim().length > 0) {
      lines.push('', '## Summary', this.compression.summarize(snapshot.description, 280));
    }
    return lines.join('\n');
  }

  private architecture(snapshot: ProjectSnapshot): string {
    const lines = ['# Architecture', '', '## Execution order', snapshot.engines.join(' → '), ''];
    lines.push('## Active capabilities');
    for (const capability of snapshot.capabilities) {
      lines.push(`- **${capability.name}** — ${this.compression.summarize(capability.summary)}`);
    }
    if (snapshot.constraints.length > 0) {
      lines.push('', '## Non-negotiable constraints');
      for (const constraint of snapshot.constraints) {
        lines.push(`- ${constraint}`);
      }
    }
    if (snapshot.directories.length > 0) {
      lines.push('', '## Directory overview');
      for (const entry of snapshot.directories) {
        lines.push(`- \`${entry.path}\` — ${entry.purpose}`);
      }
    }
    return lines.join('\n');
  }

  private requirements(snapshot: ProjectSnapshot): string {
    const lines = ['# Requirements', ''];
    if (snapshot.capabilities.length === 0) {
      lines.push('No capabilities are enabled yet.');
      return lines.join('\n');
    }
    lines.push('The project MUST satisfy each active capability:');
    lines.push('');
    for (const capability of snapshot.capabilities) {
      lines.push(`- **${capability.name}**: ${this.compression.summarize(capability.summary)}`);
    }
    return lines.join('\n');
  }

  private decisions(snapshot: ProjectSnapshot): string {
    const decisions = this.deriver.deriveDecisions(snapshot);
    const lines = ['# Decisions', ''];
    for (const decision of decisions) {
      lines.push(`- **${decision.title}** — ${decision.rationale}`);
    }
    return lines.join('\n');
  }

  private todos(roadmap: Roadmap): string {
    const lines = ['# TODOs', ''];
    const active = roadmap.milestones.filter(
      (milestone) => milestone.status === 'in-progress' || milestone.status === 'upcoming',
    );
    const outstanding = active.filter((milestone) => milestone.tasks.some((task) => !task.done));
    if (outstanding.length === 0) {
      lines.push('All planned tasks are complete.');
      return lines.join('\n');
    }
    for (const milestone of outstanding) {
      lines.push(`## ${milestone.name}`);
      for (const task of milestone.tasks) {
        lines.push(`- [${task.done ? 'x' : ' '}] ${task.title}`);
      }
      lines.push('');
    }
    return lines.join('\n');
  }

  private knownIssues(session: SessionState): string {
    const issues = this.deriver.deriveIssues(session);
    const lines = ['# Known Issues', ''];
    if (issues.length === 0) {
      lines.push('No known issues.');
      return lines.join('\n');
    }
    for (const issue of issues) {
      lines.push(`- **${issue.severity}**: ${issue.text}`);
    }
    return lines.join('\n');
  }

  private future(roadmap: Roadmap): string {
    const lines = ['# Future', ''];
    const upcoming = roadmap.milestones.filter((milestone) => milestone.status === 'upcoming');
    if (upcoming.length === 0) {
      lines.push('No upcoming milestones — the roadmap is fully underway or complete.');
      return lines.join('\n');
    }
    lines.push('Planned, not yet started:');
    lines.push('');
    for (const milestone of upcoming) {
      lines.push(`- ${milestone.name}`);
    }
    return lines.join('\n');
  }
}
