import type { ModuleDescriptor, PromptFragment } from '../models/index.js';

/** Resolves the modular prompt fragments of the active modules — only the relevant ones. */
export class PromptResolver {
  resolve(modules: readonly ModuleDescriptor[]): readonly PromptFragment[] {
    return modules
      .filter((module) => module.metadata.prompt.trim().length > 0)
      .map((module) => ({
        id: module.metadata.id,
        name: module.metadata.name,
        prompt: module.metadata.prompt.trim(),
      }));
  }
}
