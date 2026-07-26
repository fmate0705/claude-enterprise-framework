import type { EngineDefinition } from '../models/index.js';

const def = (
  id: string,
  tier: number,
  dependsOn: readonly string[],
  extra: {
    floor?: boolean;
    skills?: readonly string[];
    mcp?: readonly string[];
    description?: string;
  } = {},
): EngineDefinition => ({
  id,
  description: extra.description ?? id,
  floor: extra.floor ?? false,
  tier,
  dependsOn,
  provides: { skills: extra.skills ?? [], mcp: extra.mcp ?? [] },
});

/**
 * The default CEF engine catalog: the source of dependency truth the Runtime resolves
 * against. It is **data**, injected through a {@link PluginProvider}, so the Runtime engine
 * code stays framework-agnostic (`ARCHITECTURE.md` §8, KD-4). A future provider can source the
 * same shape from `@cef/framework` plugin manifests without changing the Runtime.
 */
export const DEFAULT_ENGINE_CATALOG: readonly EngineDefinition[] = [
  def('core', 1, [], { floor: true, description: 'Constitution and rule engine' }),
  def('architecture', 2, ['core'], { description: 'Structure and boundaries' }),
  def('platform', 3, ['architecture'], { description: 'Framework and tooling' }),
  def('security', 3, ['architecture'], { floor: true, description: 'Security and compliance' }),
  def('performance', 3, ['architecture'], { floor: true, description: 'Core Web Vitals budgets' }),
  def('validation', 3, ['core'], {
    mcp: ['chrome-devtools'],
    description: 'Automated verification',
  }),
  def('testing', 3, ['architecture'], { description: 'Test strategy' }),
  def('docker', 3, ['architecture'], { description: 'Reproducible containers' }),
  def('legal', 3, ['core'], { floor: true, description: 'Legal and disclosures' }),
  def('design', 3, ['core'], {
    skills: ['taste', 'frontend-design'],
    description: 'Design system',
  }),
  def('content', 3, ['core'], { description: 'Content operations' }),
  def('seo', 3, ['core'], { skills: ['seo-skill'], description: 'Search discoverability' }),
  def('assets', 3, ['core'], { mcp: ['higgsfield'], description: 'Brand imagery and assets' }),
  def('experience', 4, ['design'], { skills: ['uiux-pro-max'], description: 'UX and flow' }),
  def('components', 4, ['design'], {
    skills: ['emil-frontend-design'],
    description: 'Component system',
  }),
  def('motion', 4, ['design'], { skills: ['emil-motion'], description: 'Purposeful motion' }),
  def('accessibility', 4, ['design'], { floor: true, description: 'WCAG 2.2 AA conformance' }),
  def('frontend', 4, ['platform', 'design'], { description: 'Client implementation' }),
  def('deployment', 4, ['docker'], { description: 'Safe, reversible releases' }),
  def('commerce', 4, ['core', 'security', 'validation'], {
    description: 'Product, pricing, checkout',
  }),
  def('ai', 4, ['core', 'security'], { description: 'AI capabilities in built products' }),
  def('ai-seo', 5, ['seo'], { description: 'Answer-engine citability' }),
  def('operations', 5, ['deployment'], { description: 'Monitoring and maintenance' }),
];
