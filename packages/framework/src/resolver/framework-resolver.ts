import { isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import { CapabilityResolver } from '../capabilities/index.js';
import type { FrameworkCatalog } from '../catalog/index.js';
import { MCPResolver } from '../mcp/index.js';
import type { ResolvedFramework } from '../models/index.js';
import { PromptResolver } from '../prompts/index.js';
import { SkillResolver } from '../skills/index.js';
import { StandardResolver } from '../standards/index.js';

/**
 * Composes the capability resolver with the prompt, skill, MCP, and standard resolvers into
 * one {@link ResolvedFramework} — the compact knowledge the Runtime asks for.
 */
export class FrameworkResolver {
  private readonly prompts = new PromptResolver();
  private readonly skills = new SkillResolver();
  private readonly mcp = new MCPResolver();
  private readonly standards = new StandardResolver();

  resolve(
    catalog: FrameworkCatalog,
    engineIds: readonly string[],
  ): Result<ResolvedFramework, CefError> {
    const resolved = new CapabilityResolver(catalog).resolveForEngines(engineIds);
    if (isErr(resolved)) {
      return resolved;
    }
    const modules = resolved.value.modules;
    const capabilities = [
      ...new Set(modules.flatMap((module) => module.metadata.capabilities)),
    ].sort();
    const totalTokenEstimate = modules.reduce(
      (sum, module) => sum + module.metadata.tokenEstimate,
      0,
    );

    return ok({
      modules,
      order: resolved.value.order,
      capabilities,
      skills: this.skills.resolve(modules),
      mcp: this.mcp.resolve(modules),
      prompts: this.prompts.resolve(modules),
      standards: this.standards.resolve(modules),
      requestedEngines: engineIds,
      coveredEngines: resolved.value.coveredEngines,
      uncoveredEngines: resolved.value.uncoveredEngines,
      totalTokenEstimate,
    });
  }
}
