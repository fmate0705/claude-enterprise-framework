import type { DerivedCapabilities, ProjectSpec } from '@cef/core';

/** Floors are always enabled and can never be removed (framework rule `OR-03`). */
const FLOOR_ENGINES = ['core', 'security', 'performance', 'accessibility', 'legal'] as const;
const PREMIUM_UI: readonly string[] = ['shadcn', 'magic-ui', 'aceternity', 'motion-primitives'];
const VISUAL_TYPES: readonly string[] = ['landing-page', 'marketing', 'portfolio', 'corporate'];

/**
 * Capability Factory: derives the engines, skills, and MCP servers a project needs from its
 * specification (`ARCHITECTURE.md` §8.3). Deterministic and side-effect-free — the same spec
 * always yields the same capabilities, sorted for stable output.
 */
export function deriveCapabilities(spec: ProjectSpec): DerivedCapabilities {
  const engines = new Set<string>(FLOOR_ENGINES);
  for (const always of ['platform', 'architecture', 'validation', 'deployment', 'docker']) {
    engines.add(always);
  }

  const isWeb = spec.projectType !== 'api';
  if (isWeb) {
    for (const web of ['design', 'experience', 'components', 'seo']) {
      engines.add(web);
    }
  }
  if (spec.animation !== 'none') {
    engines.add('motion');
  }
  if (spec.commerce || spec.projectType === 'ecommerce') {
    engines.add('commerce');
  }
  if (
    spec.blog ||
    spec.cms !== 'none' ||
    spec.projectType === 'blog' ||
    spec.projectType === 'documentation'
  ) {
    engines.add('content');
  }
  if (spec.generateAiSeo) {
    engines.add('ai-seo');
  }

  const skills = new Set<string>();
  if (isWeb) {
    for (const skill of ['taste', 'frontend-design', 'uiux-pro-max']) {
      skills.add(skill);
    }
  }
  if (PREMIUM_UI.includes(spec.uiLibrary)) {
    skills.add('emil-frontend-design');
  }
  if (spec.animation !== 'none') {
    skills.add('emil-motion');
  }

  const mcp = new Set<string>();
  if (isWeb) {
    mcp.add('chrome-devtools');
  }
  if (VISUAL_TYPES.includes(spec.projectType)) {
    mcp.add('higgsfield');
  }

  return {
    engines: [...engines].sort(),
    skills: [...skills].sort(),
    mcp: [...mcp].sort(),
  };
}
