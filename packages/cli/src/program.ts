import { Command as Commander } from 'commander';
import { isErr } from '@cef/core';
import type { Logger } from '@cef/core';
import type { CommandRegistry } from './commands/command.js';
import { readCliVersion } from './version.js';

/**
 * Builds the Commander program from the {@link CommandRegistry}. Commander lives only in this
 * outermost adapter; each registered command is declared generically, so adding a command
 * requires no change here (`ARCHITECTURE.md` §10).
 */
export function buildProgram(registry: CommandRegistry, logger: Logger): Commander {
  const program = new Commander();
  program
    .name('cef')
    .description(
      'Claude Enterprise Framework — scaffold, validate, review, and ship premium sites.',
    )
    .version(readCliVersion(), '-v, --version', 'print the CLI version');

  for (const command of registry.all()) {
    const declared = program
      .command(command.definition.name)
      .description(command.definition.description);

    for (const argument of command.definition.arguments ?? []) {
      declared.argument(argument.name, argument.description);
    }
    for (const option of command.definition.options ?? []) {
      if (option.defaultValue !== undefined) {
        declared.option(option.flags, option.description, option.defaultValue);
      } else {
        declared.option(option.flags, option.description);
      }
    }

    declared.action(async (...actionArgs: unknown[]) => {
      // Commander invokes: (arg1, …, argN, options, commandInstance).
      const options = (actionArgs.at(-2) ?? {}) as Record<string, unknown>;
      const positionals = actionArgs.slice(0, -2).filter((a): a is string => typeof a === 'string');
      const result = await command.execute({ args: positionals, options });
      if (isErr(result)) {
        logger.error(`✖ ${result.error.message}`);
        if (result.error.hint) {
          logger.error(`  ${result.error.hint}`);
        }
        process.exitCode = 1;
        return;
      }
      if (result.value.message) {
        process.stdout.write(`${result.value.message}\n`);
      }
    });
  }

  program.showHelpAfterError('(add --help for usage)');
  return program;
}
