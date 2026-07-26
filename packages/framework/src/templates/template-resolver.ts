import type { ModuleDescriptor } from '../models/index.js';

export interface TemplateReference {
  readonly id: string;
  readonly name: string;
  readonly projectTypes: readonly string[];
  readonly frameworks: readonly string[];
}

/** Resolves which active modules apply to a given project type and framework. */
export class TemplateResolver {
  resolve(
    modules: readonly ModuleDescriptor[],
    projectType: string,
    framework: string,
  ): readonly TemplateReference[] {
    return modules
      .filter((module) => this.applies(module, projectType, framework))
      .map((module) => ({
        id: module.metadata.id,
        name: module.metadata.name,
        projectTypes: module.metadata.projectTypes,
        frameworks: module.metadata.frameworks,
      }));
  }

  private applies(module: ModuleDescriptor, projectType: string, framework: string): boolean {
    const { projectTypes, frameworks } = module.metadata;
    const typeOk =
      projectTypes.length === 0 ||
      projectTypes.includes('all') ||
      projectTypes.includes(projectType);
    const frameworkOk = frameworks.length === 0 || frameworks.includes(framework);
    return typeOk && frameworkOk;
  }
}
