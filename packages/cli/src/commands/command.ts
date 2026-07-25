import type { CefError, Result } from '@cef/core';

/** A single positional argument in a command's grammar. */
export interface CommandArgument {
  /** Commander argument spec, e.g. `<name>` (required) or `[name]` (optional). */
  readonly name: string;
  readonly description: string;
}

/** A single option/flag in a command's grammar. */
export interface CommandOption {
  /** Commander flags spec, e.g. `-t, --type <type>`. */
  readonly flags: string;
  readonly description: string;
  readonly defaultValue?: string | boolean;
}

export interface CommandDefinition {
  readonly name: string;
  readonly description: string;
  readonly arguments?: readonly CommandArgument[];
  readonly options?: readonly CommandOption[];
}

export interface CommandInput {
  readonly args: readonly string[];
  readonly options: Readonly<Record<string, unknown>>;
}

export interface CommandOutput {
  readonly message?: string;
}

/**
 * A command is one user intent, expressed as a use case. The Commander adapter is the only
 * thing that constructs {@link CommandInput}; commands never touch `process.argv`
 * (`ARCHITECTURE.md` §10, Command Pattern — no central switch).
 */
export interface Command {
  readonly definition: CommandDefinition;
  execute(input: CommandInput): Promise<Result<CommandOutput, CefError>>;
}

/** Holds the registered commands; dispatch is a lookup, never a switch statement. */
export class CommandRegistry {
  private readonly commands = new Map<string, Command>();

  register(command: Command): this {
    if (this.commands.has(command.definition.name)) {
      throw new Error(`Duplicate command registration: ${command.definition.name}`);
    }
    this.commands.set(command.definition.name, command);
    return this;
  }

  get(name: string): Command | undefined {
    return this.commands.get(name);
  }

  all(): Command[] {
    return [...this.commands.values()];
  }
}
