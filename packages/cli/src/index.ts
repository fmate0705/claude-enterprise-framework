/**
 * Public programmatic entry for `@cef/cli`.
 *
 * Exposes the command layer, DI composition root, and the project generator so the CLI can be
 * embedded or tested without spawning the binary (`ARCHITECTURE.md` §9–§10).
 */
export { readCliVersion } from './version.js';
export { composeContainer, Tokens } from './di.js';
export type { ComposeOptions } from './di.js';
export { CommandRegistry } from './commands/command.js';
export type {
  Command,
  CommandDefinition,
  CommandInput,
  CommandOutput,
} from './commands/command.js';
export { buildProgram } from './program.js';
export { CreateCommand, ProjectGenerator, deriveCapabilities } from './commands/create/index.js';
export { RuntimeCommand } from './commands/runtime/index.js';
export { FrameworkCommand } from './commands/framework/index.js';
export {
  NodeFileSystem,
  ClackPrompter,
  ConsoleLogger,
  SystemClock,
  GitCli,
  PromptCancelledError,
} from './adapters.js';
