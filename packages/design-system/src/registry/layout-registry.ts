import { LAYOUT_CATALOG } from '../layouts/index.js';
import type { LayoutDescriptor, LayoutKind } from '../layouts/index.js';

/**
 * The layout registry — reusable page archetypes, each a sequence of approved component sections.
 * It exposes lookup and the component ids a layout references, so a layout's integrity can be
 * checked against the component registry.
 */
export class LayoutRegistry {
  private readonly byId: ReadonlyMap<string, LayoutDescriptor>;

  constructor(private readonly descriptors: readonly LayoutDescriptor[] = LAYOUT_CATALOG) {
    this.byId = new Map(descriptors.map((descriptor) => [descriptor.id, descriptor]));
  }

  all(): readonly LayoutDescriptor[] {
    return this.descriptors;
  }

  ids(): readonly LayoutKind[] {
    return this.descriptors.map((descriptor) => descriptor.id);
  }

  get(id: string): LayoutDescriptor | undefined {
    return this.byId.get(id);
  }

  size(): number {
    return this.descriptors.length;
  }

  /** The distinct component ids a layout references, in first-seen order. */
  componentsOf(id: string): readonly string[] {
    const layout = this.byId.get(id);
    if (!layout) {
      return [];
    }
    return [...new Set(layout.sections.map((section) => section.componentId))];
  }
}
