import { MilestonePlanner } from '../planner/milestone-planner.js';
import {
  EMPTY_PROGRESS,
  type Milestone,
  type MilestoneStatus,
  type ProjectSnapshot,
  type Roadmap,
  type RoadmapProgress,
  type RoadmapTask,
} from '../models/index.js';

/**
 * Generates the implementation roadmap by overlaying recorded progress onto a freshly planned
 * set of milestones. Planning is deterministic (from the snapshot); progress carries which tasks
 * are done, which milestone is active, and which are blocked. Deriving status and percentages
 * this way means regenerating the roadmap never loses progress and never drifts from the plan.
 */
export class ClaudeRoadmapGenerator {
  constructor(private readonly planner: MilestonePlanner = new MilestonePlanner()) {}

  generate(snapshot: ProjectSnapshot, progress: RoadmapProgress = EMPTY_PROGRESS): Roadmap {
    const done = new Set(progress.doneTaskIds);
    const blocked = new Set(progress.blockedMilestoneIds);

    const milestones = this.planner
      .plan(snapshot)
      .map((milestone) => this.applyProgress(milestone, done, blocked, progress.activeMilestoneId));

    const allTasks = milestones.flatMap((milestone) => milestone.tasks);
    const doneCount = allTasks.filter((task) => task.done).length;
    const completionPercent =
      allTasks.length === 0 ? 0 : Math.round((doneCount / allTasks.length) * 100);

    const counts = this.countByStatus(milestones);
    const nextAction = this.firstActionableTask(milestones);

    return {
      milestones,
      completionPercent,
      completedCount: counts.completed,
      inProgressCount: counts['in-progress'],
      blockedCount: counts.blocked,
      upcomingCount: counts.upcoming,
      nextAction,
    };
  }

  private applyProgress(
    milestone: Milestone,
    done: ReadonlySet<string>,
    blocked: ReadonlySet<string>,
    activeMilestoneId: string | undefined,
  ): Milestone {
    const tasks: readonly RoadmapTask[] = milestone.tasks.map((task) => ({
      ...task,
      done: done.has(task.id),
    }));
    return {
      ...milestone,
      tasks,
      status: this.statusOf(milestone.id, tasks, blocked, activeMilestoneId),
    };
  }

  private statusOf(
    milestoneId: string,
    tasks: readonly RoadmapTask[],
    blocked: ReadonlySet<string>,
    activeMilestoneId: string | undefined,
  ): MilestoneStatus {
    if (blocked.has(milestoneId)) {
      return 'blocked';
    }
    const doneCount = tasks.filter((task) => task.done).length;
    if (tasks.length > 0 && doneCount === tasks.length) {
      return 'completed';
    }
    if (doneCount > 0 || milestoneId === activeMilestoneId) {
      return 'in-progress';
    }
    return 'upcoming';
  }

  private countByStatus(milestones: readonly Milestone[]): Record<MilestoneStatus, number> {
    const counts: Record<MilestoneStatus, number> = {
      completed: 0,
      'in-progress': 0,
      blocked: 0,
      upcoming: 0,
    };
    for (const milestone of milestones) {
      counts[milestone.status] += 1;
    }
    return counts;
  }

  /** The first not-done task in the first non-blocked, non-completed milestone. */
  private firstActionableTask(milestones: readonly Milestone[]): string | undefined {
    for (const milestone of milestones) {
      if (milestone.status === 'blocked' || milestone.status === 'completed') {
        continue;
      }
      const next = milestone.tasks.find((task) => !task.done);
      if (next) {
        return next.title;
      }
    }
    return undefined;
  }
}
