import type { ModuleDescriptor } from '../models/index.js';

const POLICY_CATEGORIES = new Set(['quality', 'compliance', 'security', 'foundation']);
const FLOOR_PRIORITY = 85;

export interface PolicyReference {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly floor: boolean;
}

/** Resolves the governance policies (floors and quality/compliance modules) that apply. */
export class PolicyResolver {
  resolve(modules: readonly ModuleDescriptor[]): readonly PolicyReference[] {
    return modules
      .filter((module) => POLICY_CATEGORIES.has(module.metadata.category))
      .map((module) => ({
        id: module.metadata.id,
        name: module.metadata.name,
        category: module.metadata.category,
        floor: module.metadata.priority >= FLOOR_PRIORITY,
      }));
  }
}
