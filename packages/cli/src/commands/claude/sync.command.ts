import { isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import type { SyncInput } from '@cef/claude';
import { NodeFileSystem } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { loadClaudeContext, projectRoot } from './support.js';

/**
 * `cef sync` — regenerate and write every Claude artifact (context, memory, roadmap, session,
 * indexes) so they stay consistent with the project after a change.
 */
export class SyncCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'sync',
    description: 'Synchronize all generated Claude artifacts with the current project.',
    options: [
      { flags: '--dir <path>', description: 'project directory (default: current directory)' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await loadClaudeContext(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const { engine, assembled } = loaded.value;

    const session = engine.sessions.recordCommand(assembled.session, 'cef sync');
    const history = engine.sessions.appendToHistory(assembled.history, session);

    const plan: SyncInput = {
      snapshot: assembled.snapshot,
      progress: assembled.progress,
      session,
      history,
      artifacts: assembled.artifacts,
      openDecisions: assembled.openDecisions,
      recentChanges: assembled.recentChanges,
      generatedAt: assembled.generatedAt,
    };

    const syncPlan = engine.planSync(plan);
    const result = await engine.applySync(new NodeFileSystem(), projectRoot(input), syncPlan);

    return ok({
      message: [
        `✔ Synchronized ${result.filesWritten} files:`,
        ...result.paths.map((path) => `  ${path}`),
      ].join('\n'),
    });
  }
}
