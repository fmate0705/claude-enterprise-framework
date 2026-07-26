import { isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { loadClaudeContext } from './support.js';

/** `cef status` — display overall project status: progress, capabilities, skills, next action. */
export class StatusCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'status',
    description: 'Display overall project status.',
    options: [
      { flags: '--dir <path>', description: 'project directory (default: current directory)' },
      { flags: '--json', description: 'output machine-readable JSON' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await loadClaudeContext(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const { engine, contextInput } = loaded.value;
    const status = engine.buildStatus(contextInput);

    if (input.options['json'] === true) {
      return ok({ message: JSON.stringify(status, null, 2) });
    }
    return ok({ message: engine.renderStatus(status) });
  }
}
