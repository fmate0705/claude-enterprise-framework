import type { CefError, Result } from '@cef/core';

/** A raw, unparsed module manifest discovered from a source directory. */
export interface RawModuleSource {
  readonly sourceDir: string;
  /** The raw YAML text of the module's `module.yaml`. */
  readonly manifest: string;
}

/** Discovers module sources without hardcoded per-module paths (registry-based discovery). */
export interface ModuleProvider {
  discover(): Promise<Result<readonly RawModuleSource[], CefError>>;
}

/** Loads a module's lazily-fetched detailed specification. */
export interface DocumentLoader {
  loadSpec(moduleId: string): Promise<Result<string, CefError>>;
}
