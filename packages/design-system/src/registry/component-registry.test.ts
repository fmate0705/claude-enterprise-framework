import { describe, expect, it } from 'vitest';
import { ComponentRegistry } from './component-registry.js';
import { LayoutRegistry } from './layout-registry.js';

describe('ComponentRegistry', () => {
  const registry = new ComponentRegistry();

  it('registers every supported component with required metadata', () => {
    for (const id of [
      'hero',
      'navbar',
      'footer',
      'card',
      'testimonials',
      'pricing',
      'timeline',
      'faq',
      'features',
      'gallery',
      'contact',
      'form',
      'blog-card',
      'cta',
      'stats',
      'logos',
      'team',
      'dashboard-widget',
      'table',
      'chart',
      'auth',
      'commerce',
      'admin',
    ]) {
      const component = registry.get(id);
      expect(component, id).toBeDefined();
      expect(component?.variants.length).toBeGreaterThan(0);
      expect(component?.slots.length).toBeGreaterThan(0);
      expect(component?.compositionRules.length).toBeGreaterThan(0);
      expect(component?.supportedFrameworks.length).toBeGreaterThan(0);
    }
  });

  it('has no unresolved component dependencies', () => {
    expect(registry.unresolvedDependencies()).toHaveLength(0);
  });

  it('resolves transitive dependencies', () => {
    const deps = registry.dependenciesOf('commerce');
    expect(deps).toContain('button');
    expect(deps).toContain('card');
    expect(deps).not.toContain('commerce');
  });

  it('filters by category', () => {
    expect(registry.byCategory('commerce').map((c) => c.id)).toContain('pricing');
  });
});

describe('LayoutRegistry', () => {
  const layouts = new LayoutRegistry();
  const components = new ComponentRegistry();

  it('provides every required layout', () => {
    for (const id of [
      'landing',
      'corporate',
      'saas',
      'dashboard',
      'portfolio',
      'documentation',
      'blog',
      'commerce',
      'admin',
      'authentication',
    ]) {
      expect(layouts.get(id), id).toBeDefined();
    }
  });

  it('references only registered components', () => {
    for (const layout of layouts.all()) {
      for (const componentId of layouts.componentsOf(layout.id)) {
        expect(components.has(componentId), `${layout.id} → ${componentId}`).toBe(true);
      }
    }
  });
});
