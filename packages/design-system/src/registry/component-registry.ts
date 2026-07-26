import { COMPONENT_CATALOG } from '../components/index.js';
import type { ComponentCategory, ComponentDescriptor, Framework } from '../components/index.js';

/** A component whose declared dependency is not in the registry. */
export interface UnresolvedDependency {
  readonly component: string;
  readonly missing: string;
}

/**
 * The centralized component registry — the single place components are looked up. Every generated
 * page draws its components from here; nothing is invented outside it. Lookups are indexed by id
 * and category, and dependency resolution is transitive and cycle-safe.
 */
export class ComponentRegistry {
  private readonly byId: ReadonlyMap<string, ComponentDescriptor>;

  constructor(private readonly descriptors: readonly ComponentDescriptor[] = COMPONENT_CATALOG) {
    this.byId = new Map(descriptors.map((descriptor) => [descriptor.id, descriptor]));
  }

  all(): readonly ComponentDescriptor[] {
    return this.descriptors;
  }

  ids(): readonly string[] {
    return this.descriptors.map((descriptor) => descriptor.id);
  }

  size(): number {
    return this.descriptors.length;
  }

  has(id: string): boolean {
    return this.byId.has(id);
  }

  get(id: string): ComponentDescriptor | undefined {
    return this.byId.get(id);
  }

  byCategory(category: ComponentCategory): readonly ComponentDescriptor[] {
    return this.descriptors.filter((descriptor) => descriptor.category === category);
  }

  byFramework(framework: Framework): readonly ComponentDescriptor[] {
    return this.descriptors.filter((descriptor) =>
      descriptor.supportedFrameworks.includes(framework),
    );
  }

  categories(): readonly ComponentCategory[] {
    return [...new Set(this.descriptors.map((descriptor) => descriptor.category))].sort();
  }

  /** The transitive set of dependency ids for a component, excluding itself. Cycle-safe. */
  dependenciesOf(id: string): readonly string[] {
    const resolved = new Set<string>();
    const visit = (current: string): void => {
      const descriptor = this.byId.get(current);
      if (!descriptor) {
        return;
      }
      for (const dependency of descriptor.dependencies) {
        if (!resolved.has(dependency)) {
          resolved.add(dependency);
          visit(dependency);
        }
      }
    };
    visit(id);
    resolved.delete(id);
    return [...resolved].sort();
  }

  /** Every declared dependency that is not registered. */
  unresolvedDependencies(): readonly UnresolvedDependency[] {
    const unresolved: UnresolvedDependency[] = [];
    for (const descriptor of this.descriptors) {
      for (const dependency of descriptor.dependencies) {
        if (!this.byId.has(dependency)) {
          unresolved.push({ component: descriptor.id, missing: dependency });
        }
      }
    }
    return unresolved;
  }
}
