import { join } from 'node:path';
import { err, ok } from '@cef/core';
import type { FileSystem, Result } from '@cef/core';
import { parse as parseYaml } from 'yaml';
import type { ZodError } from 'zod';
import {
  ConfigurationInvalidError,
  ContextCorruptedError,
  InvalidManifestError,
  InvalidProjectError,
  ManifestNotFoundError,
  ProjectNotFoundError,
  RuntimeError,
} from '../errors/index.js';
import type { Loader } from '../interfaces/index.js';
import {
  manifestSchema,
  projectContextSchema,
  projectSchema,
  runtimeConfigurationSchema,
  type Manifest,
  type Project,
  type ProjectContext,
  type RuntimeConfiguration,
} from '../models/index.js';

const CEF_DIR = '.cef';

const firstIssue = (error: ZodError): string => {
  const issue = error.issues[0];
  return issue ? `${issue.path.join('.') || 'root'}: ${issue.message}` : 'schema validation failed';
};

const parseJson = (raw: string): unknown => JSON.parse(raw) as unknown;

/** Reads and validates `.cef/manifest.yaml`. */
export class ManifestLoader implements Loader<Manifest> {
  constructor(private readonly fs: FileSystem) {}

  async load(projectRoot: string): Promise<Result<Manifest, RuntimeError>> {
    const path = join(projectRoot, CEF_DIR, 'manifest.yaml');
    if (!(await this.fs.exists(path))) {
      return err(new ManifestNotFoundError(path));
    }
    let raw: unknown;
    try {
      raw = parseYaml(await this.fs.readFile(path));
    } catch (cause) {
      return err(new InvalidManifestError('failed to parse YAML', cause));
    }
    const parsed = manifestSchema.safeParse(raw);
    return parsed.success
      ? ok(parsed.data)
      : err(new InvalidManifestError(firstIssue(parsed.error)));
  }
}

/** Reads and validates `.cef/project.json`. */
export class ProjectLoader implements Loader<Project> {
  constructor(private readonly fs: FileSystem) {}

  async load(projectRoot: string): Promise<Result<Project, RuntimeError>> {
    const path = join(projectRoot, CEF_DIR, 'project.json');
    if (!(await this.fs.exists(path))) {
      return err(new ProjectNotFoundError(path));
    }
    let raw: unknown;
    try {
      raw = parseJson(await this.fs.readFile(path));
    } catch (cause) {
      return err(new InvalidProjectError('failed to parse JSON', cause));
    }
    const parsed = projectSchema.safeParse(raw);
    return parsed.success
      ? ok(parsed.data)
      : err(new InvalidProjectError(firstIssue(parsed.error)));
  }
}

/** Reads and validates `.cef/runtime.json` (the RuntimeConfiguration). */
export class ConfigurationLoader implements Loader<RuntimeConfiguration> {
  constructor(private readonly fs: FileSystem) {}

  async load(projectRoot: string): Promise<Result<RuntimeConfiguration, RuntimeError>> {
    const path = join(projectRoot, CEF_DIR, 'runtime.json');
    if (!(await this.fs.exists(path))) {
      return err(new ConfigurationInvalidError(`missing ${path}`));
    }
    let raw: unknown;
    try {
      raw = parseJson(await this.fs.readFile(path));
    } catch (cause) {
      return err(new ConfigurationInvalidError('failed to parse JSON', cause));
    }
    const parsed = runtimeConfigurationSchema.safeParse(raw);
    return parsed.success
      ? ok(parsed.data)
      : err(new ConfigurationInvalidError(firstIssue(parsed.error)));
  }
}

/** Reads the optional `.cef/context.json`. Absent is valid; corrupt is an error. */
export class ContextLoader implements Loader<ProjectContext | undefined> {
  constructor(private readonly fs: FileSystem) {}

  async load(projectRoot: string): Promise<Result<ProjectContext | undefined, RuntimeError>> {
    const path = join(projectRoot, CEF_DIR, 'context.json');
    if (!(await this.fs.exists(path))) {
      return ok(undefined);
    }
    let raw: unknown;
    try {
      raw = parseJson(await this.fs.readFile(path));
    } catch (cause) {
      return err(new ContextCorruptedError('failed to parse JSON', cause));
    }
    const parsed = projectContextSchema.safeParse(raw);
    return parsed.success
      ? ok(parsed.data)
      : err(new ContextCorruptedError(firstIssue(parsed.error)));
  }
}
