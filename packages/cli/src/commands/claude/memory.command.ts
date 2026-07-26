import { dirname, resolve } from 'node:path';
import { cefError, err, isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import type { MemoryDocument } from '@cef/claude';
import { NodeFileSystem } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { loadClaudeContext, projectRoot } from './support.js';
import type { ClaudeContext } from './support.js';

type Handler = (
  context: ClaudeContext,
  input: CommandInput,
) => Promise<Result<CommandOutput, CefError>>;

/**
 * `cef memory [update]` — display project memory, or synchronize it to disk. Dispatch is a
 * registry lookup over actions; there is no switch statement.
 */
export class MemoryCommand implements Command {
  private readonly fs = new NodeFileSystem();
  private readonly handlers = new Map<string, Handler>([
    ['show', (context) => this.show(context)],
    ['update', (context, input) => this.update(context, input)],
  ]);

  readonly definition: CommandDefinition = {
    name: 'memory',
    description: 'Display project memory, or "update" to synchronize it to disk.',
    arguments: [{ name: '[action]', description: 'update (default: show)' }],
    options: [
      { flags: '--dir <path>', description: 'project directory (default: current directory)' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const action = input.args[0] ?? 'show';
    const handler = this.handlers.get(action);
    if (!handler) {
      return err(
        cefError('INVALID_INPUT', `Unknown memory action "${action}".`, {
          hint: 'Use "cef memory" or "cef memory update".',
        }),
      );
    }
    const loaded = await loadClaudeContext(input);
    if (isErr(loaded)) {
      return loaded;
    }
    return handler(loaded.value, input);
  }

  private async show(context: ClaudeContext): Promise<Result<CommandOutput, CefError>> {
    const documents = this.render(context);
    const sections = documents.map((document) => `--- ${document.path} ---\n${document.content}`);
    return ok({ message: sections.join('\n').trimEnd() });
  }

  private async update(
    context: ClaudeContext,
    input: CommandInput,
  ): Promise<Result<CommandOutput, CefError>> {
    const root = projectRoot(input);
    const documents = this.render(context);
    for (const document of documents) {
      const outputPath = resolve(root, document.path);
      await this.fs.mkdir(dirname(outputPath));
      await this.fs.writeFile(outputPath, document.content);
    }
    return ok({ message: `✔ Synchronized ${documents.length} memory files under .cef/memory/.` });
  }

  private render(context: ClaudeContext): readonly MemoryDocument[] {
    return context.engine.buildMemory({
      snapshot: context.assembled.snapshot,
      roadmap: context.roadmap,
      session: context.assembled.session,
    });
  }
}
