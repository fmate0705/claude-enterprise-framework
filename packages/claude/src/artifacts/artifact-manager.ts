import {
  type Artifact,
  type ArtifactIndex,
  type ArtifactKind,
  EMPTY_ARTIFACT_INDEX,
} from '../models/index.js';

export interface ArtifactInput {
  readonly path: string;
  readonly title?: string;
  readonly kind?: ArtifactKind;
  readonly engine?: string;
  readonly createdAt: string;
}

/**
 * Indexes every generated artifact by kind. Kind is inferred from the path when not given, using
 * deterministic rules, so the index can be rebuilt from a file list alone. The index is keyed by
 * path — re-adding the same path replaces its entry rather than duplicating it.
 */
export class ClaudeArtifactManager {
  add(index: ArtifactIndex, input: ArtifactInput): ArtifactIndex {
    const path = normalize(input.path);
    const kind = input.kind ?? this.classify(path);
    const artifact: Artifact = {
      id: path,
      kind,
      path,
      title: input.title ?? basename(path),
      createdAt: input.createdAt,
      engine: input.engine,
    };
    const others = index.artifacts.filter((existing) => existing.path !== path);
    return { artifacts: sortByPath([...others, artifact]) };
  }

  addAll(index: ArtifactIndex, inputs: readonly ArtifactInput[]): ArtifactIndex {
    return inputs.reduce((current, input) => this.add(current, input), index);
  }

  remove(index: ArtifactIndex, path: string): ArtifactIndex {
    const target = normalize(path);
    return { artifacts: index.artifacts.filter((artifact) => artifact.path !== target) };
  }

  byKind(index: ArtifactIndex, kind: ArtifactKind): readonly Artifact[] {
    return index.artifacts.filter((artifact) => artifact.kind === kind);
  }

  /** Counts artifacts per kind, omitting kinds with no artifacts. */
  countByKind(index: ArtifactIndex): ReadonlyMap<ArtifactKind, number> {
    const counts = new Map<ArtifactKind, number>();
    for (const artifact of index.artifacts) {
      counts.set(artifact.kind, (counts.get(artifact.kind) ?? 0) + 1);
    }
    return counts;
  }

  /** Infers an artifact kind from its path. Rules are ordered most- to least-specific. */
  classify(path: string): ArtifactKind {
    const lower = normalize(path).toLowerCase();
    const file = basename(lower);
    if (
      /(^|\/)dockerfile$/.test(lower) ||
      file.includes('docker-compose') ||
      file === '.dockerignore'
    ) {
      return 'docker';
    }
    if (lower.includes('/legal/') || /(terms|privacy|impressum|cookie|aszf|adatkezel)/.test(file)) {
      return 'legal';
    }
    if (lower.includes('/api/') || /\.(route|handler)\.(ts|js)$/.test(file)) {
      return 'api';
    }
    if (/\.(test|spec)\.(ts|tsx|js|jsx)$/.test(file)) {
      return 'test';
    }
    if (lower.endsWith('.prompt.md') || lower.includes('/prompts/')) {
      return 'prompt';
    }
    if (/\.(schema\.(ts|json)|prisma)$/.test(file) || file.includes('schema')) {
      return 'schema';
    }
    if (/\.(css|scss|sass)$/.test(file)) {
      return 'style';
    }
    if (/(^|\/)(page|layout)\.(tsx|jsx|ts|js)$/.test(lower) || lower.includes('/pages/')) {
      return 'page';
    }
    if (lower.includes('/components/') || /\.(tsx|jsx)$/.test(file)) {
      return 'component';
    }
    if (/\.(md|mdx)$/.test(file)) {
      return 'doc';
    }
    if (/\.(json|ya?ml|toml|env|config\.(ts|js|mjs))$/.test(file) || file.startsWith('.')) {
      return 'config';
    }
    return 'other';
  }

  empty(): ArtifactIndex {
    return EMPTY_ARTIFACT_INDEX;
  }
}

function normalize(path: string): string {
  return path.replace(/\\/g, '/').replace(/^\.\//, '');
}

function basename(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 1] ?? path;
}

function sortByPath(artifacts: readonly Artifact[]): readonly Artifact[] {
  return [...artifacts].sort((a, b) => a.path.localeCompare(b.path));
}
