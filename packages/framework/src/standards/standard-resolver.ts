import type { ModuleDescriptor, StandardReference } from '../models/index.js';

/** Resolves references to the active modules' detailed specifications (loaded on demand). */
export class StandardResolver {
  resolve(modules: readonly ModuleDescriptor[]): readonly StandardReference[] {
    return modules.map((module) => ({
      id: module.metadata.id,
      name: module.metadata.name,
      specFile: module.metadata.specFile,
    }));
  }
}
