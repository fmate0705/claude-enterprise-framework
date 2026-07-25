/**
 * The generation plan: a declarative description of what a generator will create, produced
 * before anything touches disk. Building the plan first makes generation inspectable
 * (`--dry-run`), conflict-checkable, and testable without a filesystem (`ARCHITECTURE.md` §11).
 */

export interface GeneratedFile {
  /** Path relative to the plan root, using forward slashes. */
  readonly path: string;
  readonly content: string;
}

export interface GenerationPlan {
  /** Absolute path to the target project directory. */
  readonly root: string;
  /** Directories to create, relative to root, forward-slashed. */
  readonly directories: readonly string[];
  /** Files to write, relative to root. */
  readonly files: readonly GeneratedFile[];
  /** Whether to initialize a git repository and make the first commit after writing. */
  readonly initGit: boolean;
}

/** The outcome of a completed generation, for reporting. */
export interface GenerationResult {
  readonly root: string;
  readonly directoriesCreated: number;
  readonly filesWritten: number;
  readonly gitInitialized: boolean;
}
