import { resolve } from 'node:path';
import { isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import {
  normalizeInput,
  type BudgetLevel,
  type ProjectInput,
  type Timeline,
} from '@cef/intelligence';
import { ManifestLoader } from '@cef/runtime';
import { NodeFileSystem } from '../../adapters.js';
import type { CommandInput } from '../command.js';

/** Resolves the target project directory from `--dir`, defaulting to the working directory. */
export function intelligenceRoot(input: CommandInput): string {
  return typeof input.options['dir'] === 'string' ? resolve(input.options['dir']) : process.cwd();
}

/**
 * Builds a {@link ProjectInput} for the intelligence engine from the project's manifest, letting
 * CLI flags override individual fields. This adapter is the only place that reads the manifest;
 * the engine stays a pure function of the input it receives.
 */
export async function loadProjectInput(
  input: CommandInput,
): Promise<Result<ProjectInput, CefError>> {
  const root = intelligenceRoot(input);
  const manifestResult = await new ManifestLoader(new NodeFileSystem()).load(root);
  if (isErr(manifestResult)) {
    return manifestResult;
  }
  const manifest = manifestResult.value;
  const metadata = manifest.metadata ?? {};

  const enabledFeatures = manifest.features
    ? Object.entries(manifest.features)
        .filter(([, on]) => on)
        .map(([id]) => id)
    : [];

  const projectInput = normalizeInput({
    projectName: manifest.project.name,
    projectType: manifest.project.type,
    description: str(input.options['description']) ?? str(metadata['description']) ?? '',
    businessGoals: arr(metadata['businessGoals']),
    clientRequirements: enabledFeatures,
    framework: str(metadata['framework']) ?? 'nextjs',
    designPreset: str(metadata['designPreset']) ?? manifest.project.type,
    targetCountry: str(input.options['country']) ?? manifest.languages?.country ?? 'US',
    targetLanguage: str(input.options['language']) ?? manifest.languages?.primary ?? 'en',
    budgetLevel: budget(str(input.options['budget']) ?? str(metadata['budget'])),
    timeline: timeline(str(input.options['timeline']) ?? str(metadata['timeline'])),
    ...(str(metadata['notes']) !== undefined ? { notes: str(metadata['notes']) } : {}),
  });

  return ok(projectInput);
}

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function arr(value: unknown): readonly string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function budget(value: string | undefined): BudgetLevel {
  return value === 'lean' || value === 'premium' ? value : 'standard';
}

function timeline(value: string | undefined): Timeline {
  return value === 'rush' || value === 'flexible' ? value : 'normal';
}
