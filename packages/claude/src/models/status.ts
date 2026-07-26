/** The overall project status, rendered by `cef status`. */
export interface ProjectStatus {
  readonly frameworkVersion: string;
  readonly projectName: string;
  readonly projectType: string;
  readonly stackFramework: string;
  readonly completionPercent: number;
  readonly completedMilestones: number;
  readonly pendingMilestones: number;
  readonly capabilities: readonly string[];
  readonly skills: readonly string[];
  readonly mcp: readonly string[];
  readonly currentMilestone: string | undefined;
  readonly nextAction: string | undefined;
}
