import { join } from 'node:path';
import { cefError, err, ok } from '@cef/core';
import type { CefError, FileSystem, Result } from '@cef/core';
import type { ModuleProvider, RawModuleSource } from '../interfaces/index.js';

/**
 * Discovers capability modules by scanning the framework's `modules/` directory. No module
 * ids are hardcoded — whatever module directories exist (each with a `module.yaml`) are
 * discovered (Framework Discovery, Phase 4).
 */
export class FileSystemModuleProvider implements ModuleProvider {
  constructor(
    private readonly fs: FileSystem,
    private readonly rootDir: string,
    private readonly modulesDirName = 'modules',
  ) {}

  async discover(): Promise<Result<readonly RawModuleSource[], CefError>> {
    const modulesDir = join(this.rootDir, this.modulesDirName);
    if (!(await this.fs.exists(modulesDir))) {
      return err(
        cefError('FRAMEWORK_MODULES_NOT_FOUND', `No modules directory found at ${modulesDir}.`, {
          hint: 'Ensure @cef/framework ships its modules/ directory.',
        }),
      );
    }

    const entries = [...(await this.fs.readdir(modulesDir))].sort();
    const sources: RawModuleSource[] = [];
    for (const entry of entries) {
      const sourceDir = join(modulesDir, entry);
      if (!(await this.fs.isDirectory(sourceDir))) {
        continue;
      }
      const manifestPath = join(sourceDir, 'module.yaml');
      if (!(await this.fs.exists(manifestPath))) {
        continue;
      }
      sources.push({ sourceDir, manifest: await this.fs.readFile(manifestPath) });
    }
    return ok(sources);
  }
}
