import type { ModuleDescriptor } from '../models/index.js';

/** An immutable collection of discovered capability modules with fast lookups. */
export class FrameworkCatalog {
  private readonly byId = new Map<string, ModuleDescriptor>();
  private readonly engineIndex = new Map<string, string>();

  constructor(private readonly descriptors: readonly ModuleDescriptor[]) {
    for (const descriptor of descriptors) {
      this.byId.set(descriptor.metadata.id, descriptor);
      for (const engine of descriptor.metadata.engines) {
        if (!this.engineIndex.has(engine)) {
          this.engineIndex.set(engine, descriptor.metadata.id);
        }
      }
    }
  }

  all(): readonly ModuleDescriptor[] {
    return this.descriptors;
  }

  ids(): readonly string[] {
    return [...this.byId.keys()].sort();
  }

  get(id: string): ModuleDescriptor | undefined {
    return this.byId.get(id);
  }

  has(id: string): boolean {
    return this.byId.has(id);
  }

  /** The module that covers a given engine id, if any. */
  moduleForEngine(engineId: string): ModuleDescriptor | undefined {
    const moduleId = this.engineIndex.get(engineId);
    return moduleId ? this.byId.get(moduleId) : undefined;
  }

  categories(): readonly string[] {
    return [...new Set(this.descriptors.map((descriptor) => descriptor.metadata.category))].sort();
  }

  size(): number {
    return this.byId.size;
  }
}
