import type { ModuleDescriptor } from '../models/index.js';

/** Resolves the union of skills the active modules require. */
export class SkillResolver {
  resolve(modules: readonly ModuleDescriptor[]): readonly string[] {
    return [...new Set(modules.flatMap((module) => module.metadata.skills))].sort();
  }
}
