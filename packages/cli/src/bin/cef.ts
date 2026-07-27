#!/usr/bin/env node
import {
  ContextCommand,
  MemoryCommand,
  RoadmapCommand,
  StatusCommand,
  SummaryCommand,
  SyncCommand,
} from '../commands/claude/index.js';
import { CommandRegistry } from '../commands/command.js';
import { CreateCommand } from '../commands/create/index.js';
import { DesignCommand } from '../commands/design/index.js';
import {
  AnalyzeCommand,
  AudienceCommand,
  BlueprintCommand,
  FeaturesCommand,
  PagesCommand,
  SeoCommand,
} from '../commands/intelligence/index.js';
import { FrameworkCommand } from '../commands/framework/index.js';
import { RuntimeCommand } from '../commands/runtime/index.js';
import { composeContainer, Tokens } from '../di.js';
import { buildProgram } from '../program.js';
import { readCliVersion } from '../version.js';

/**
 * CLI entry point. Composes the DI container, registers commands, builds the Commander
 * program, and dispatches (`ARCHITECTURE.md` §9–§10). Adding a command is a `register` call;
 * there is no switch statement.
 */
async function main(): Promise<void> {
  const container = composeContainer();
  const ports = container.resolve(Tokens.Ports);
  const logger = container.resolve(Tokens.Logger);

  const registry = new CommandRegistry()
    .register(new CreateCommand(ports, readCliVersion()))
    .register(new RuntimeCommand())
    .register(new FrameworkCommand())
    .register(new ContextCommand())
    .register(new RoadmapCommand())
    .register(new MemoryCommand())
    .register(new SummaryCommand())
    .register(new SyncCommand())
    .register(new StatusCommand())
    .register(new DesignCommand())
    .register(new AnalyzeCommand())
    .register(new BlueprintCommand())
    .register(new PagesCommand())
    .register(new FeaturesCommand())
    .register(new SeoCommand())
    .register(new AudienceCommand());

  const program = buildProgram(registry, logger);
  await program.parseAsync(process.argv);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Unexpected error: ${message}\n`);
  process.exitCode = 1;
});
