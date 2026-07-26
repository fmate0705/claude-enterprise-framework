import { dirname, resolve } from 'node:path';
import { cefError, err, isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import {
  FrameworkLoader,
  FrameworkValidator,
  KnowledgeSerializer,
  frameworkRoot,
  type FrameworkRegistry,
} from '@cef/framework';
import { ManifestLoader } from '@cef/runtime';
import { NodeFileSystem } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';

type Handler = (
  loader: FrameworkLoader,
  input: CommandInput,
) => Promise<Result<CommandOutput, CefError>>;

/**
 * `cef framework <action>` — inspect and manage the framework loader. Dispatch is a registry
 * lookup over action handlers; there is no switch statement.
 */
export class FrameworkCommand implements Command {
  private readonly fs = new NodeFileSystem();
  private readonly handlers = new Map<string, Handler>([
    ['info', (loader) => this.info(loader)],
    ['capabilities', (loader, input) => this.capabilities(loader, input)],
    ['search', (loader, input) => this.search(loader, input)],
    ['context', (loader, input) => this.context(loader, input)],
    ['validate', (loader) => this.validate(loader)],
  ]);

  readonly definition: CommandDefinition = {
    name: 'framework',
    description: 'Inspect the framework (info | capabilities | search | context | validate).',
    arguments: [
      { name: '<action>', description: 'info | capabilities | search | context | validate' },
      { name: '[query]', description: 'search keyword (for search)' },
    ],
    options: [
      { flags: '--dir <path>', description: 'project directory for context (default: cwd)' },
      { flags: '--category <category>', description: 'filter search by category' },
      { flags: '--framework <framework>', description: 'filter search by framework' },
      { flags: '--type <type>', description: 'filter search by project type' },
      { flags: '--json', description: 'machine-readable JSON output' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const action = input.args[0];
    const handler = action !== undefined ? this.handlers.get(action) : undefined;
    if (!handler) {
      return err(
        cefError('INVALID_INPUT', `Unknown framework action "${action ?? ''}".`, {
          hint: 'Use info | capabilities | search | context | validate.',
        }),
      );
    }
    const loader = new FrameworkLoader({ fs: this.fs, rootDir: frameworkRoot() });
    return handler(loader, input);
  }

  private async info(loader: FrameworkLoader): Promise<Result<CommandOutput, CefError>> {
    const discovered = await loader.discover();
    if (isErr(discovered)) {
      return discovered;
    }
    const registry = discovered.value;
    const tokens = registry.all().reduce((sum, m) => sum + m.metadata.tokenEstimate, 0);
    return ok({
      message: [
        'CEF Framework',
        `Modules: ${registry.size()}`,
        `Categories: ${registry.catalog.categories().join(', ')}`,
        `Total capability knowledge: ~${tokens} tokens (summaries loaded eagerly; specs on demand)`,
        `Location: ${frameworkRoot()}`,
      ].join('\n'),
    });
  }

  private async capabilities(
    loader: FrameworkLoader,
    input: CommandInput,
  ): Promise<Result<CommandOutput, CefError>> {
    const discovered = await loader.discover();
    if (isErr(discovered)) {
      return discovered;
    }
    if (input.options['json'] === true) {
      return ok({ message: new KnowledgeSerializer().frameworkIndex(discovered.value.catalog) });
    }
    const rows = discovered.value
      .all()
      .map(
        (m) =>
          `  ${m.metadata.id.padEnd(14)} ${m.metadata.category.padEnd(14)} ${m.metadata.capabilities.join(', ')}`,
      )
      .join('\n');
    return ok({ message: `Capabilities (${discovered.value.size()}):\n${rows}` });
  }

  private async search(
    loader: FrameworkLoader,
    input: CommandInput,
  ): Promise<Result<CommandOutput, CefError>> {
    const discovered = await loader.discover();
    if (isErr(discovered)) {
      return discovered;
    }
    const registry: FrameworkRegistry = discovered.value;
    const matches = registry.find({
      ...(typeof input.args[1] === 'string' ? { keyword: input.args[1] } : {}),
      ...(typeof input.options['category'] === 'string'
        ? { category: input.options['category'] }
        : {}),
      ...(typeof input.options['framework'] === 'string'
        ? { framework: input.options['framework'] }
        : {}),
      ...(typeof input.options['type'] === 'string' ? { projectType: input.options['type'] } : {}),
    });
    if (matches.length === 0) {
      return ok({ message: 'No matching framework modules.' });
    }
    const rows = matches
      .map((m) => `  ${m.metadata.id.padEnd(14)} ${m.metadata.description}`)
      .join('\n');
    return ok({ message: `Found ${matches.length}:\n${rows}` });
  }

  private async context(
    loader: FrameworkLoader,
    input: CommandInput,
  ): Promise<Result<CommandOutput, CefError>> {
    const root =
      typeof input.options['dir'] === 'string' ? resolve(input.options['dir']) : process.cwd();

    const manifestResult = await new ManifestLoader(this.fs).load(root);
    if (isErr(manifestResult)) {
      return manifestResult;
    }
    const manifest = manifestResult.value;
    const metaFramework = manifest.metadata?.['framework'];

    const generated = await loader.generateContext({
      projectName: manifest.project.name,
      projectType: manifest.project.type,
      framework: typeof metaFramework === 'string' ? metaFramework : 'unknown',
      frameworkVersion: manifest.frameworkVersion,
      engines: manifest.engines,
      skills: manifest.skills,
      mcp: manifest.mcp,
    });
    if (isErr(generated)) {
      return generated;
    }

    const outputPath = resolve(root, generated.value.path);
    await this.fs.mkdir(dirname(outputPath));
    await this.fs.writeFile(outputPath, generated.value.content);

    return ok({
      message:
        `✔ Wrote ${generated.value.path} (~${generated.value.tokenEstimate} tokens)\n` +
        `  Regenerate any time with "cef framework context".`,
    });
  }

  private async validate(loader: FrameworkLoader): Promise<Result<CommandOutput, CefError>> {
    const discovered = await loader.discover();
    if (isErr(discovered)) {
      return discovered;
    }
    const report = new FrameworkValidator().validate(discovered.value.catalog);
    if (report.issues.length === 0) {
      return ok({ message: '✔ Framework is valid — no issues found.' });
    }
    const lines = report.issues.map(
      (issue) => `  ${issue.severity === 'error' ? '✖' : '⚠'} ${issue.message}`,
    );
    if (!report.ok) {
      return err(
        cefError('VALIDATION_FAILED', `Framework validation failed:\n${lines.join('\n')}`, {
          hint: 'Fix the reported errors in the affected modules.',
        }),
      );
    }
    return ok({ message: `Framework valid with warnings:\n${lines.join('\n')}` });
  }
}
