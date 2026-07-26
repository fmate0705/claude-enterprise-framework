/** The implementation roadmap model: milestones, their tasks, and derived progress. */

export type MilestoneStatus = 'completed' | 'in-progress' | 'blocked' | 'upcoming';

export interface RoadmapTask {
  readonly id: string;
  readonly title: string;
  readonly done: boolean;
}

export interface Milestone {
  readonly id: string;
  readonly name: string;
  readonly status: MilestoneStatus;
  /** The capability/engine this milestone realizes, when it maps to one. */
  readonly engine: string | undefined;
  readonly tasks: readonly RoadmapTask[];
}

export interface Roadmap {
  readonly milestones: readonly Milestone[];
  /** 0–100, derived from completed tasks over total tasks. */
  readonly completionPercent: number;
  readonly completedCount: number;
  readonly inProgressCount: number;
  readonly blockedCount: number;
  readonly upcomingCount: number;
  /** The first actionable task title, or undefined when everything is done. */
  readonly nextAction: string | undefined;
}

/**
 * Progress overlaid onto a freshly planned roadmap: which tasks are done, which milestone is
 * active, and which milestones are blocked. This is how prior progress survives regeneration.
 */
export interface RoadmapProgress {
  readonly doneTaskIds: readonly string[];
  readonly activeMilestoneId: string | undefined;
  readonly blockedMilestoneIds: readonly string[];
}

export const EMPTY_PROGRESS: RoadmapProgress = {
  doneTaskIds: [],
  activeMilestoneId: undefined,
  blockedMilestoneIds: [],
};
