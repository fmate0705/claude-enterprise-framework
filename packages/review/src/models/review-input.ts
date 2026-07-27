import type { DesignTokens, Theme } from '@cef/design-system';
import type { Blueprint } from '@cef/intelligence';

/**
 * The immutable input to every reviewer: the generated site (files as path → content), the
 * blueprint it was built from, and the resolved design tokens and theme. Reviews are a pure,
 * deterministic function of this input — the same site always yields the same findings and scores.
 */
export interface ReviewInput {
  readonly projectName: string;
  readonly files: ReadonlyMap<string, string>;
  readonly blueprint: Blueprint;
  readonly tokens: DesignTokens;
  readonly theme: Theme;
  readonly reviewedAt: string;
}

/** Files under a directory prefix, for reviewers that scan a subtree. */
export function filesUnder(
  files: ReadonlyMap<string, string>,
  prefix: string,
): readonly (readonly [string, string])[] {
  return [...files.entries()].filter(([path]) => path.startsWith(prefix));
}
