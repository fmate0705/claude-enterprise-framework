/** Artifact tracking model: every file the framework generates is indexed by kind. */

export type ArtifactKind =
  | 'component'
  | 'page'
  | 'api'
  | 'docker'
  | 'legal'
  | 'schema'
  | 'prompt'
  | 'config'
  | 'doc'
  | 'test'
  | 'style'
  | 'other';

export const ARTIFACT_KINDS: readonly ArtifactKind[] = [
  'component',
  'page',
  'api',
  'docker',
  'legal',
  'schema',
  'prompt',
  'config',
  'doc',
  'test',
  'style',
  'other',
];

export interface Artifact {
  readonly id: string;
  readonly kind: ArtifactKind;
  readonly path: string;
  readonly title: string;
  readonly createdAt: string;
  readonly engine: string | undefined;
}

export interface ArtifactIndex {
  readonly artifacts: readonly Artifact[];
}

export const EMPTY_ARTIFACT_INDEX: ArtifactIndex = { artifacts: [] };
