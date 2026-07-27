import type { Artifact, ArtifactKind } from '../models/index.js';

/**
 * Tracks every artifact the pipeline produces, keyed by path so re-running a stage replaces its
 * artifacts rather than duplicating them. Supports lookup by kind and by producing stage for the
 * generation report and the artifact-tracking requirement.
 */
export class ArtifactRegistry {
  private readonly byPath = new Map<string, Artifact>();

  add(artifact: Artifact): this {
    this.byPath.set(artifact.path, artifact);
    return this;
  }

  addAll(artifacts: readonly Artifact[]): this {
    for (const artifact of artifacts) {
      this.add(artifact);
    }
    return this;
  }

  all(): readonly Artifact[] {
    return [...this.byPath.values()];
  }

  byKind(kind: ArtifactKind): readonly Artifact[] {
    return this.all().filter((artifact) => artifact.kind === kind);
  }

  byStage(stage: string): readonly Artifact[] {
    return this.all().filter((artifact) => artifact.stage === stage);
  }

  counts(): Readonly<Record<string, number>> {
    const counts: Record<string, number> = {};
    for (const artifact of this.byPath.values()) {
      counts[artifact.kind] = (counts[artifact.kind] ?? 0) + 1;
    }
    return counts;
  }
}
