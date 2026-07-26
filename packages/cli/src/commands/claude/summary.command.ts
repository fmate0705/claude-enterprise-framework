import { isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { loadClaudeContext } from './support.js';

/** `cef summary` — generate a concise, human-readable project summary. */
export class SummaryCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'summary',
    description: 'Generate a concise project summary.',
    options: [
      { flags: '--dir <path>', description: 'project directory (default: current directory)' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await loadClaudeContext(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const { engine, contextInput } = loaded.value;
    return ok({ message: engine.buildSummary(contextInput).trimEnd() });
  }
}
