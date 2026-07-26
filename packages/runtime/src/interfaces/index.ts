import type { Result } from '@cef/core';
import type { RuntimeError } from '../errors/index.js';
import type { RuntimeLogger } from '../logging/index.js';
import type { EngineProvides } from '../models/index.js';

/** The read-only execution context passed to a plugin's `initialize` hook. */
export interface ExecutionContext {
  readonly projectRoot: string;
  readonly logger: RuntimeLogger;
  readonly engines: readonly string[];
}

/**
 * The common interface every engine implements. The Runtime loads plugins through a
 * {@link PluginProvider} and never switches on ids (`ARCHITECTURE.md` §8.4). `initialize`
 * prepares a plugin but performs no generation — the Runtime orchestrates, it does not build.
 */
export interface EnginePlugin {
  readonly id: string;
  readonly floor: boolean;
  readonly dependsOn: readonly string[];
  readonly provides: EngineProvides;
  initialize(context: ExecutionContext): Promise<void> | void;
}

/** A source of engine-plugins. Swappable, so the catalog is data, not hardcoded logic. */
export interface PluginProvider {
  has(id: string): boolean;
  get(id: string): EnginePlugin | undefined;
  ids(): readonly string[];
}

/** A loader for one project artifact under `.cef/`. */
export interface Loader<T> {
  load(projectRoot: string): Promise<Result<T, RuntimeError>>;
}
