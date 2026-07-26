import type { FrameworkCatalog } from '../catalog/index.js';
import type { ResolvedFramework } from '../models/index.js';

interface GraphEdge {
  readonly from: string;
  readonly to: string;
}

/** Serializes framework knowledge structures to JSON for export and tooling. */
export class KnowledgeSerializer {
  /** The full framework index: every module's metadata summary. */
  frameworkIndex(catalog: FrameworkCatalog): string {
    return this.json(
      catalog.all().map((module) => ({
        id: module.metadata.id,
        name: module.metadata.name,
        version: module.metadata.version,
        category: module.metadata.category,
        priority: module.metadata.priority,
        engines: module.metadata.engines,
        capabilities: module.metadata.capabilities,
        dependsOn: module.metadata.dependsOn,
        tokenEstimate: module.metadata.tokenEstimate,
        tags: module.metadata.tags,
      })),
    );
  }

  /** The capability dependency graph for a resolved project. */
  capabilityGraph(resolved: ResolvedFramework): string {
    const nodes = resolved.modules.map((module) => module.metadata.id);
    const nodeSet = new Set(nodes);
    const edges: GraphEdge[] = resolved.modules.flatMap((module) =>
      module.metadata.dependsOn
        .filter((dependency) => nodeSet.has(dependency))
        .map((dependency) => ({ from: dependency, to: module.metadata.id })),
    );
    return this.json({ nodes, edges, order: resolved.order });
  }

  /** The full knowledge graph across the whole catalog. */
  knowledgeGraph(catalog: FrameworkCatalog): string {
    const nodes = catalog.all().map((module) => module.metadata.id);
    const edges: GraphEdge[] = catalog.all().flatMap((module) =>
      module.metadata.dependsOn.map((dependency) => ({
        from: dependency,
        to: module.metadata.id,
      })),
    );
    return this.json({ nodes, edges });
  }

  /** The resolved execution context (order, capabilities, skills, MCP). */
  executionContext(resolved: ResolvedFramework): string {
    return this.json({
      order: resolved.order,
      capabilities: resolved.capabilities,
      skills: resolved.skills,
      mcp: resolved.mcp,
      totalTokenEstimate: resolved.totalTokenEstimate,
    });
  }

  /** A snapshot of what a manifest's engines resolved to. */
  manifestSnapshot(resolved: ResolvedFramework): string {
    return this.json({
      requestedEngines: resolved.requestedEngines,
      coveredEngines: resolved.coveredEngines,
      uncoveredEngines: resolved.uncoveredEngines,
      modules: resolved.order,
    });
  }

  private json(value: unknown): string {
    return JSON.stringify(value, null, 2);
  }
}
