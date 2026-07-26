import { join } from 'node:path';
import { cefError, err, isErr, ok } from '@cef/core';
import type { CefError, FileSystem, Result } from '@cef/core';
import { FrameworkCache } from '../cache/index.js';
import { FrameworkIndexer } from '../indexer/index.js';
import type { ModuleProvider } from '../interfaces/index.js';
import type { GeneratedContext, ProjectContextInput, ResolvedFramework } from '../models/index.js';
import { FileSystemModuleProvider } from '../providers/index.js';
import { FrameworkRegistry } from '../registry/index.js';
import { FrameworkResolver } from '../resolver/index.js';
import { ContextGenerator } from './context-generator.js';

export interface FrameworkLoaderOptions {
  readonly fs: FileSystem;
  readonly rootDir: string;
  readonly provider?: ModuleProvider;
  readonly cache?: FrameworkCache;
}

/**
 * The Framework Loader — transforms the CEF knowledge base into the minimum executable
 * knowledge a project needs. Discovery is done once and memoized; detailed specs are loaded
 * lazily and cached; nothing is loaded until requested (`ARCHITECTURE.md`, Phase 4).
 */
export class FrameworkLoader {
  private readonly fs: FileSystem;
  private readonly provider: ModuleProvider;
  private readonly cache: FrameworkCache;
  private readonly resolver = new FrameworkResolver();
  private registry: FrameworkRegistry | undefined;

  constructor(options: FrameworkLoaderOptions) {
    this.fs = options.fs;
    this.provider = options.provider ?? new FileSystemModuleProvider(options.fs, options.rootDir);
    this.cache = options.cache ?? new FrameworkCache();
  }

  /** Discovers and indexes modules once, memoizing the registry. */
  async discover(): Promise<Result<FrameworkRegistry, CefError>> {
    if (this.registry) {
      return ok(this.registry);
    }
    const indexed = await new FrameworkIndexer(this.provider).index();
    if (isErr(indexed)) {
      return indexed;
    }
    this.registry = new FrameworkRegistry(indexed.value);
    return ok(this.registry);
  }

  /** Resolves the minimum framework knowledge for a set of engines. */
  async resolveForEngines(
    engineIds: readonly string[],
  ): Promise<Result<ResolvedFramework, CefError>> {
    const discovered = await this.discover();
    if (isErr(discovered)) {
      return discovered;
    }
    return this.resolver.resolve(discovered.value.catalog, engineIds);
  }

  /** Lazily loads a module's detailed specification, cached after the first read. */
  async loadSpec(moduleId: string): Promise<Result<string, CefError>> {
    const discovered = await this.discover();
    if (isErr(discovered)) {
      return discovered;
    }
    const module = discovered.value.get(moduleId);
    if (!module) {
      return err(cefError('MODULE_NOT_FOUND', `Unknown module "${moduleId}".`));
    }
    const specFile = module.metadata.specFile;
    if (!specFile) {
      return err(cefError('NO_SPEC', `Module "${moduleId}" has no detailed specification.`));
    }
    const path = join(module.sourceDir, specFile);
    try {
      const content = await this.cache.getOrLoad(`spec:${moduleId}`, () => this.fs.readFile(path));
      return ok(content);
    } catch (cause) {
      return err(
        cefError('BROKEN_REFERENCE', `Failed to load the spec for "${moduleId}" at ${path}.`, {
          cause,
        }),
      );
    }
  }

  /** Generates the compact, token-optimized project context package. */
  async generateContext(input: ProjectContextInput): Promise<Result<GeneratedContext, CefError>> {
    const resolved = await this.resolveForEngines(input.engines);
    if (isErr(resolved)) {
      return resolved;
    }
    return ok(new ContextGenerator().generate(input, resolved.value));
  }

  getCache(): FrameworkCache {
    return this.cache;
  }
}
