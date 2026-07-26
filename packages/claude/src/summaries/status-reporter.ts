import type { ClaudeContextInput, ProjectStatus } from '../models/index.js';

/**
 * Builds and renders the overall project status. `report` projects a {@link ProjectStatus} from
 * the context input; `render` formats it as the human-readable status block. Kept separate so the
 * structured status can also feed JSON output without re-deriving it.
 */
export class ClaudeStatusReporter {
  constructor(private readonly frameworkVersion: string) {}

  report(input: ClaudeContextInput): ProjectStatus {
    const { snapshot, roadmap, session } = input;
    const active = roadmap.milestones.find((milestone) => milestone.status === 'in-progress');
    return {
      frameworkVersion: this.frameworkVersion,
      projectName: snapshot.name,
      projectType: snapshot.type,
      stackFramework: snapshot.stack.framework,
      completionPercent: roadmap.completionPercent,
      completedMilestones: roadmap.completedCount,
      pendingMilestones: roadmap.inProgressCount + roadmap.blockedCount + roadmap.upcomingCount,
      capabilities: snapshot.capabilities.map((capability) => capability.name),
      skills: snapshot.skills,
      mcp: snapshot.mcp,
      currentMilestone: session.currentMilestone ?? active?.name,
      nextAction: roadmap.nextAction,
    };
  }

  render(status: ProjectStatus): string {
    const lines: string[] = [];
    lines.push(`Framework           CEF ${status.frameworkVersion}`);
    lines.push(`Project             ${status.projectName}`);
    lines.push(`Type                ${status.projectType}`);
    lines.push(`Stack               ${status.stackFramework}`);
    lines.push(`Progress            ${status.completionPercent}%`);
    lines.push(`Completed           ${status.completedMilestones}`);
    lines.push(`Pending             ${status.pendingMilestones}`);
    lines.push(`Capabilities        ${join(status.capabilities)}`);
    lines.push(`Skills              ${join(status.skills)}`);
    lines.push(`MCPs                ${join(status.mcp)}`);
    lines.push(`Current milestone   ${status.currentMilestone ?? '—'}`);
    lines.push(`Next action         ${status.nextAction ?? '—'}`);
    return lines.join('\n');
  }
}

function join(values: readonly string[]): string {
  return values.length > 0 ? values.join(', ') : '—';
}
