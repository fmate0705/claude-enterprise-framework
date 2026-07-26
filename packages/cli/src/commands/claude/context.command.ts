import { dirname, resolve } from 'node:path';
import { isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import { NodeFileSystem } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { loadClaudeContext, projectRoot } from './support.js';

/** `cef context` — generate the optimized, single-file Claude context and write it to disk. */
export class ContextCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'context',
    description: 'Generate the optimized Claude context (.cef/generated/context.md).',
    options: [
      { flags: '--dir <path>', description: 'project directory (default: current directory)' },
      { flags: '--print', description: 'print the context instead of writing it' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await loadClaudeContext(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const { engine, contextInput } = loaded.value;
    const context = engine.buildContext(contextInput);

    if (input.options['print'] === true) {
      return ok({ message: context.content });
    }

    const fs = new NodeFileSystem();
    const outputPath = resolve(projectRoot(input), context.path);
    await fs.mkdir(dirname(outputPath));
    await fs.writeFile(outputPath, context.content);

    return ok({
      message: `✔ Wrote ${context.path} (~${context.tokenEstimate} tokens). This is the file Claude reads first.`,
    });
  }
}
