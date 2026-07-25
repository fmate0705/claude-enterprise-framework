import { resolve } from 'node:path';
import { cefError, err, ErrorCode, isErr, ok } from '@cef/core';
import type { CefError, Ports, ProjectSpec, Result } from '@cef/core';
import { PromptCancelledError } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { ProjectGenerator } from './generator.js';
import { DEFAULT_SPEC } from './spec-schema.js';
import { runWizard } from './wizard.js';

/** A writable partial spec collected from CLI flags (drops `readonly` for assignment). */
type WritablePresets = { -readonly [K in keyof ProjectSpec]?: ProjectSpec[K] };

/**
 * `cef create` — scaffolds a new CEF project. Thin by design: it resolves the spec (via
 * flags and/or the wizard) and delegates all generation to {@link ProjectGenerator}.
 */
export class CreateCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'create',
    description: 'Create a new CEF project from an interactive wizard.',
    arguments: [{ name: '[name]', description: 'project name (lowercase, hyphenated)' }],
    options: [
      { flags: '-y, --yes', description: 'accept defaults and skip prompts' },
      { flags: '-t, --type <type>', description: 'project type' },
      { flags: '-f, --framework <framework>', description: 'framework' },
      { flags: '--pm <manager>', description: 'package manager' },
      { flags: '--dir <path>', description: 'target directory (default: ./<name>)' },
      { flags: '--no-git', description: 'do not initialize a git repository' },
      { flags: '--dry-run', description: 'print the plan without writing files' },
    ],
  };

  constructor(
    private readonly ports: Ports,
    private readonly cefVersion: string,
  ) {}

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const { options } = input;
    const useDefaults = options['yes'] === true;
    const dryRun = options['dryRun'] === true;

    const presets: WritablePresets = {};
    const nameArg = input.args[0];
    if (typeof nameArg === 'string') {
      presets.name = nameArg;
    }
    if (typeof options['type'] === 'string') {
      presets.projectType = options['type'] as ProjectSpec['projectType'];
    }
    if (typeof options['framework'] === 'string') {
      presets.framework = options['framework'] as ProjectSpec['framework'];
    }
    if (typeof options['pm'] === 'string') {
      presets.packageManager = options['pm'] as ProjectSpec['packageManager'];
    }
    if (options['git'] === false) {
      presets.initGit = false;
    }

    const specResult = await this.resolveSpec(useDefaults, presets);
    if (isErr(specResult)) {
      return specResult;
    }
    const spec = specResult.value;

    const root =
      typeof options['dir'] === 'string'
        ? resolve(options['dir'])
        : resolve(process.cwd(), spec.name);
    const generator = new ProjectGenerator(this.ports);

    if (dryRun) {
      const planned = generator.buildPlan(spec, { root, cefVersion: this.cefVersion });
      if (isErr(planned)) {
        return planned;
      }
      const plan = planned.value;
      const body = plan.files.map((file) => `  + ${file.path}`).join('\n');
      return ok({
        message:
          `Plan for "${spec.name}" — ${plan.files.length} files, ${plan.directories.length} ` +
          `directories at ${plan.root}:\n${body}`,
      });
    }

    const generated = await generator.generate(spec, { root, cefVersion: this.cefVersion });
    if (isErr(generated)) {
      return generated;
    }
    if (!useDefaults) {
      this.ports.prompter.outro(`Created ${spec.name}`);
    }

    const gitNote = generated.value.gitInitialized ? ', git initialized' : '';
    return ok({
      message:
        `✔ Created "${spec.name}" at ${generated.value.root}\n` +
        `  ${generated.value.filesWritten} files, ${generated.value.directoriesCreated} directories${gitNote}\n\n` +
        `Next steps:\n  cd ${spec.name}\n  ${spec.packageManager} install\n  ${spec.packageManager} run dev`,
    });
  }

  private async resolveSpec(
    useDefaults: boolean,
    presets: Partial<ProjectSpec>,
  ): Promise<Result<ProjectSpec, CefError>> {
    if (useDefaults) {
      if (presets.name === undefined) {
        return err(
          cefError(ErrorCode.InvalidInput, 'A project name is required with --yes.', {
            hint: 'Run: cef create <name> --yes',
          }),
        );
      }
      return ok({ ...DEFAULT_SPEC, ...presets, name: presets.name });
    }

    this.ports.prompter.intro('CEF — create a new project');
    try {
      return ok(await runWizard(this.ports.prompter, DEFAULT_SPEC, presets));
    } catch (error) {
      if (error instanceof PromptCancelledError) {
        this.ports.prompter.cancel('Cancelled.');
        return err(cefError(ErrorCode.Cancelled, 'Project creation cancelled.'));
      }
      throw error;
    }
  }
}
