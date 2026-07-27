import { isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import { ProjectIntelligenceEngine, type Blueprint, type ProjectInput } from '@cef/intelligence';
import { SystemClock } from '../../adapters.js';
import type { CommandInput } from '../command.js';
import { loadProjectInput } from './assembler.js';

export interface IntelligenceContext {
  readonly engine: ProjectIntelligenceEngine;
  readonly projectInput: ProjectInput;
  readonly blueprint: Blueprint;
}

/** Loads the project input and generates the blueprint — the shared start of every command. */
export async function generateBlueprint(
  input: CommandInput,
): Promise<Result<IntelligenceContext, CefError>> {
  const loaded = await loadProjectInput(input);
  if (isErr(loaded)) {
    return loaded;
  }
  const engine = new ProjectIntelligenceEngine();
  const blueprint = engine.generate(loaded.value, new SystemClock().now().toISOString());
  return ok({ engine, projectInput: loaded.value, blueprint });
}
