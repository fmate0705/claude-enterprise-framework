import { Container, token } from '@cef/core';
import type { Clock, FileSystem, Git, Logger, LogLevel, Ports, Prompter } from '@cef/core';
import { ClackPrompter, ConsoleLogger, GitCli, NodeFileSystem, SystemClock } from './adapters.js';

/** DI tokens for every injectable service (`ARCHITECTURE.md` §19). */
export const Tokens = {
  FileSystem: token<FileSystem>('FileSystem'),
  Prompter: token<Prompter>('Prompter'),
  Logger: token<Logger>('Logger'),
  Clock: token<Clock>('Clock'),
  Git: token<Git>('Git'),
  Ports: token<Ports>('Ports'),
} as const;

export interface ComposeOptions {
  readonly logLevel?: LogLevel;
  /** Inject a fake prompter (tests) or a headless one (non-interactive runs). */
  readonly prompter?: Prompter;
}

/**
 * The composition root — the single place concrete adapters are bound to ports
 * (`ARCHITECTURE.md` §19). Everything else depends only on interfaces.
 */
export function composeContainer(options: ComposeOptions = {}): Container {
  const container = new Container();
  container.register(Tokens.FileSystem, () => new NodeFileSystem());
  container.register(Tokens.Prompter, () => options.prompter ?? new ClackPrompter());
  container.register(Tokens.Logger, () => new ConsoleLogger(options.logLevel ?? 'info'));
  container.register(Tokens.Clock, () => new SystemClock());
  container.register(Tokens.Git, () => new GitCli());
  container.register(Tokens.Ports, (c) => ({
    fs: c.resolve(Tokens.FileSystem),
    prompter: c.resolve(Tokens.Prompter),
    logger: c.resolve(Tokens.Logger),
    clock: c.resolve(Tokens.Clock),
    git: c.resolve(Tokens.Git),
  }));
  return container;
}
