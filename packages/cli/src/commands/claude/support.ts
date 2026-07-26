import { resolve } from 'node:path';
import { isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import { ClaudeEngine } from '@cef/claude';
import type { ClaudeContextInput, Roadmap } from '@cef/claude';
import { NodeFileSystem, SystemClock } from '../../adapters.js';
import type { CommandInput } from '../command.js';
import { ClaudeProjectAssembler, type AssembledProject } from './assembler.js';

/** The assembled project plus the engine and the derived context input the commands share. */
export interface ClaudeContext {
  readonly assembled: AssembledProject;
  readonly engine: ClaudeEngine;
  readonly roadmap: Roadmap;
  readonly contextInput: ClaudeContextInput;
}

/** Resolves the target project directory from `--dir`, defaulting to the working directory. */
export function projectRoot(input: CommandInput): string {
  return typeof input.options['dir'] === 'string' ? resolve(input.options['dir']) : process.cwd();
}

/**
 * Boots the Runtime, resolves the framework, and builds the Claude engine, roadmap, and context
 * input in one step. Every Claude command starts here, so they stay thin adapters over the engine.
 */
export async function loadClaudeContext(
  input: CommandInput,
): Promise<Result<ClaudeContext, CefError>> {
  const fs = new NodeFileSystem();
  const clock = new SystemClock();
  const assembler = new ClaudeProjectAssembler(fs, clock);

  const assembledResult = await assembler.assemble(projectRoot(input));
  if (isErr(assembledResult)) {
    return assembledResult;
  }
  const assembled = assembledResult.value;

  const engine = new ClaudeEngine(clock, {
    frameworkVersion: assembled.frameworkVersionLabel,
  });
  const roadmap = engine.buildRoadmap(assembled.snapshot, assembled.progress);
  const contextInput: ClaudeContextInput = {
    snapshot: assembled.snapshot,
    roadmap,
    session: assembled.session,
    artifacts: assembled.artifacts,
    openDecisions: assembled.openDecisions,
    recentChanges: assembled.recentChanges,
    generatedAt: assembled.generatedAt,
  };

  return ok({ assembled, engine, roadmap, contextInput });
}
