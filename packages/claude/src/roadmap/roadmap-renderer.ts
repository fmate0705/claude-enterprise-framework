import { ROADMAP_PATH } from '../paths.js';
import type { GeneratedContext, Milestone, MilestoneStatus, Roadmap } from '../models/index.js';
import { TokenEstimator } from '../compression/index.js';

const STATUS_LABEL: Readonly<Record<MilestoneStatus, string>> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  blocked: 'Blocked',
  upcoming: 'Upcoming',
};

const STATUS_MARK: Readonly<Record<MilestoneStatus, string>> = {
  completed: '✔',
  'in-progress': '◐',
  blocked: '✖',
  upcoming: '○',
};

/** Renders a {@link Roadmap} to the `.cef/roadmap.md` markdown document. */
export class RoadmapRenderer {
  constructor(private readonly tokens: TokenEstimator = new TokenEstimator()) {}

  render(roadmap: Roadmap): GeneratedContext {
    const lines: string[] = [];
    lines.push('# Implementation Roadmap');
    lines.push('');
    lines.push(
      `**${roadmap.completionPercent}% complete** — ` +
        `${roadmap.completedCount} completed · ${roadmap.inProgressCount} in progress · ` +
        `${roadmap.blockedCount} blocked · ${roadmap.upcomingCount} upcoming.`,
    );
    lines.push('');
    if (roadmap.nextAction) {
      lines.push(`Next recommended action: **${roadmap.nextAction}**.`);
      lines.push('');
    }

    for (const group of ['in-progress', 'blocked', 'upcoming', 'completed'] as const) {
      const milestones = roadmap.milestones.filter((milestone) => milestone.status === group);
      if (milestones.length === 0) {
        continue;
      }
      lines.push(`## ${STATUS_LABEL[group]}`);
      for (const milestone of milestones) {
        lines.push(this.renderMilestone(milestone));
      }
      lines.push('');
    }

    const content = `${lines.join('\n').trimEnd()}\n`;
    return { path: ROADMAP_PATH, content, tokenEstimate: this.tokens.estimate(content) };
  }

  private renderMilestone(milestone: Milestone): string {
    const doneCount = milestone.tasks.filter((task) => task.done).length;
    const header = `- ${STATUS_MARK[milestone.status]} **${milestone.name}** (${doneCount}/${milestone.tasks.length})`;
    const tasks = milestone.tasks.map((task) => `  - [${task.done ? 'x' : ' '}] ${task.title}`);
    return [header, ...tasks].join('\n');
  }
}
