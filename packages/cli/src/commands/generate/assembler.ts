import { dirname, resolve } from 'node:path';
import { isErr, ok } from '@cef/core';
import type { CefError, GeneratedFile, Result } from '@cef/core';
import {
  GenerationPipeline,
  RecordingLogger,
  type GenerationContext,
  type GenerationOptions,
} from '@cef/generator';
import { ProjectIntelligenceEngine } from '@cef/intelligence';
import { NodeFileSystem, SystemClock } from '../../adapters.js';
import type { CommandInput } from '../command.js';
import { loadProjectInput } from '../intelligence/assembler.js';

export interface GenerateContext {
  readonly root: string;
  readonly pipeline: GenerationPipeline;
  readonly logger: RecordingLogger;
  readonly context: GenerationContext;
}

/** Resolves the target project directory from `--dir`, defaulting to the working directory. */
export function generateRoot(input: CommandInput): string {
  return typeof input.options['dir'] === 'string' ? resolve(input.options['dir']) : process.cwd();
}

/**
 * Builds the blueprint from the project manifest, resolves generation options, and prepares a
 * generation context and pipeline. Every generate/validate/repair/export command starts here, so
 * they share one deterministic setup.
 */
export async function prepareGeneration(
  input: CommandInput,
): Promise<Result<GenerateContext, CefError>> {
  const loaded = await loadProjectInput(input);
  if (isErr(loaded)) {
    return loaded;
  }
  const projectInput = loaded.value;
  const generatedAt = new SystemClock().now().toISOString();
  const blueprint = new ProjectIntelligenceEngine().generate(projectInput, generatedAt);

  const options: GenerationOptions = {
    projectName: projectInput.projectName,
    framework: projectInput.framework,
    presetId: projectInput.designPreset,
    themeId: typeof input.options['theme'] === 'string' ? input.options['theme'] : 'base',
    baseUrl:
      typeof input.options['url'] === 'string' ? input.options['url'] : 'https://example.com',
    ...(typeof input.options['clientSlug'] === 'string'
      ? { deploySlug: input.options['clientSlug'] }
      : {}),
    generatedAt,
  };

  const logger = new RecordingLogger();
  const pipeline = new GenerationPipeline({ logger });
  const context = pipeline.createContext(blueprint, options);

  return ok({ root: generateRoot(input), pipeline, logger, context });
}

/** Writes generated files under the project root, creating directories as needed. */
export async function writeGeneratedFiles(
  root: string,
  files: readonly GeneratedFile[],
): Promise<number> {
  const fs = new NodeFileSystem();
  for (const file of files) {
    const outputPath = resolve(root, file.path);
    await fs.mkdir(dirname(outputPath));
    await fs.writeFile(outputPath, file.content);
  }
  return files.length;
}
