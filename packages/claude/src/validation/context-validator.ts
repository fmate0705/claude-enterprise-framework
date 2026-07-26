import {
  MEMORY_FILE_IDS,
  type MemoryDocument,
  type ProjectSnapshot,
  type Roadmap,
  type SessionState,
} from '../models/index.js';
import type { ValidationIssue, ValidationReport } from '../types/index.js';

export interface ClaudeValidationInput {
  readonly snapshot: ProjectSnapshot;
  readonly roadmap: Roadmap;
  readonly session: SessionState;
  readonly memory: readonly MemoryDocument[];
  /** Engines declared in the manifest, for synchronization checks. */
  readonly manifestEngines: readonly string[];
  /** When the on-disk context was last generated, if it exists. */
  readonly contextGeneratedAt: string | undefined;
  /** The latest change to any source of the context (e.g. the session). */
  readonly latestChangeAt: string | undefined;
}

/**
 * Verifies that the generated Claude artifacts are internally consistent and in sync with the
 * project: memory completeness, roadmap arithmetic, manifest/snapshot agreement, context
 * freshness, and session integrity. It computes from the given state only — it does not read the
 * filesystem — so it is deterministic and unit-testable.
 */
export class ClaudeContextValidator {
  validate(input: ClaudeValidationInput): ValidationReport {
    const issues: ValidationIssue[] = [
      ...this.checkMemory(input.memory),
      ...this.checkRoadmap(input.roadmap),
      ...this.checkManifestSync(input.snapshot, input.manifestEngines),
      ...this.checkFreshness(input.contextGeneratedAt, input.latestChangeAt),
      ...this.checkSession(input.session, input.roadmap),
    ];
    return { ok: issues.every((issue) => issue.severity !== 'error'), issues };
  }

  private checkMemory(memory: readonly MemoryDocument[]): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const present = new Set(memory.map((document) => document.id));
    for (const id of MEMORY_FILE_IDS) {
      if (!present.has(id)) {
        issues.push({ severity: 'error', message: `Memory file "${id}" is missing.` });
      }
    }
    for (const document of memory) {
      if (document.content.trim().length === 0) {
        issues.push({ severity: 'error', message: `Memory file "${document.id}" is empty.` });
      }
    }
    return issues;
  }

  private checkRoadmap(roadmap: Roadmap): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const tasks = roadmap.milestones.flatMap((milestone) => milestone.tasks);
    const doneCount = tasks.filter((task) => task.done).length;
    const expected = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);
    if (expected !== roadmap.completionPercent) {
      issues.push({
        severity: 'error',
        message: `Roadmap completion is ${roadmap.completionPercent}% but tasks imply ${expected}%.`,
      });
    }
    const statusTotal =
      roadmap.completedCount +
      roadmap.inProgressCount +
      roadmap.blockedCount +
      roadmap.upcomingCount;
    if (statusTotal !== roadmap.milestones.length) {
      issues.push({
        severity: 'error',
        message: `Roadmap status counts (${statusTotal}) do not sum to milestones (${roadmap.milestones.length}).`,
      });
    }
    const openTaskTitles = new Set(tasks.filter((task) => !task.done).map((task) => task.title));
    if (roadmap.nextAction !== undefined && !openTaskTitles.has(roadmap.nextAction)) {
      issues.push({
        severity: 'warning',
        message: `Roadmap next action "${roadmap.nextAction}" does not match any open task.`,
      });
    }
    return issues;
  }

  private checkManifestSync(
    snapshot: ProjectSnapshot,
    manifestEngines: readonly string[],
  ): ValidationIssue[] {
    const snapshotSet = new Set(snapshot.engines);
    const manifestSet = new Set(manifestEngines);
    const issues: ValidationIssue[] = [];
    for (const engine of manifestSet) {
      if (!snapshotSet.has(engine)) {
        issues.push({
          severity: 'error',
          message: `Manifest engine "${engine}" is not present in the resolved snapshot.`,
        });
      }
    }
    return issues;
  }

  private checkFreshness(
    contextGeneratedAt: string | undefined,
    latestChangeAt: string | undefined,
  ): ValidationIssue[] {
    if (contextGeneratedAt === undefined) {
      return [{ severity: 'warning', message: 'No generated context found. Run "cef context".' }];
    }
    if (latestChangeAt !== undefined && contextGeneratedAt < latestChangeAt) {
      return [
        {
          severity: 'warning',
          message: 'Generated context is older than the latest change. Run "cef context".',
        },
      ];
    }
    return [];
  }

  private checkSession(session: SessionState, roadmap: Roadmap): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    if (session.updatedAt < session.startedAt) {
      issues.push({
        severity: 'error',
        message: 'Session updatedAt is earlier than startedAt.',
      });
    }
    if (session.currentMilestone !== undefined) {
      const names = new Set(roadmap.milestones.map((milestone) => milestone.name));
      if (!names.has(session.currentMilestone)) {
        issues.push({
          severity: 'warning',
          message: `Session milestone "${session.currentMilestone}" is not in the roadmap.`,
        });
      }
    }
    return issues;
  }
}
