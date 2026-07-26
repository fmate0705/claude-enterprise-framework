import type { ModuleDescriptor } from '../models/index.js';

/** Resolves the union of MCP integrations the active modules require. */
export class MCPResolver {
  resolve(modules: readonly ModuleDescriptor[]): readonly string[] {
    return [...new Set(modules.flatMap((module) => module.metadata.mcp))].sort();
  }
}
