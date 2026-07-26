import { fileURLToPath } from 'node:url';

/**
 * `@cef/framework` — the CEF knowledge base as data, plus the Framework Loader & Capability
 * Engine. It discovers capability modules, indexes their metadata, resolves the minimum
 * knowledge a project needs, lazily loads details with caching, and generates a compact,
 * token-optimized project context (`ARCHITECTURE.md`, Phase 4).
 */
export const CEF_FRAMEWORK_VERSION = '0.0.0';

/**
 * The absolute filesystem path to the installed package root, where the framework data
 * (`framework.manifest.yaml` and the `modules/` directory) lives.
 */
export function frameworkRoot(): string {
  return fileURLToPath(new URL('..', import.meta.url));
}

export * from './types/index.js';
export * from './models/index.js';
export * from './interfaces/index.js';
export * from './providers/index.js';
export * from './catalog/index.js';
export * from './indexer/index.js';
export * from './registry/index.js';
export * from './search/index.js';
export * from './capabilities/index.js';
export * from './policies/index.js';
export * from './standards/index.js';
export * from './templates/index.js';
export * from './prompts/index.js';
export * from './skills/index.js';
export * from './mcp/index.js';
export * from './resolver/index.js';
export * from './cache/index.js';
export * from './serialization/index.js';
export * from './validation/index.js';
export * from './loader/index.js';
