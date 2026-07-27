import type { DesignTokens, Theme } from '@cef/design-system';
import type { Blueprint } from '@cef/intelligence';
import type { Artifact } from './types.js';
import type { StageResult } from './session.js';

/** How the pipeline should generate: identity, target framework, theme, and determinism inputs. */
export interface GenerationOptions {
  readonly projectName: string;
  readonly framework: string;
  readonly presetId: string | undefined;
  readonly themeId: string;
  readonly baseUrl: string;
  /** Injected so generated timestamps are deterministic. */
  readonly generatedAt: string;
}

/**
 * The working context threaded through every stage. It carries the immutable inputs (blueprint,
 * tokens, theme, options) and the growing set of generated files and artifacts. Stages read the
 * accumulated files and return new ones; the runner merges them back in, so a stage can be rerun
 * against the current context and deterministically reproduce its own outputs.
 */
export interface GenerationContext {
  readonly blueprint: Blueprint;
  readonly tokens: DesignTokens;
  readonly theme: Theme;
  readonly options: GenerationOptions;
  /** Accumulated generated files, path → content. Mutated by the runner between stages. */
  readonly files: Map<string, string>;
  /** Accumulated artifacts. Mutated by the runner between stages. */
  readonly artifacts: Artifact[];
  /** Results of completed stages so far, appended by the runner. The Export stage reads these. */
  readonly results: StageResult[];
}

/** A slug of the project name, safe for package names and file paths. */
export function projectSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'cef-app'
  );
}
