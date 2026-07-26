/**
 * `@cef/runtime` — the CEF Runtime Engine.
 *
 * Reads a project's `.cef/` configuration, resolves the required engines, dependencies, skills,
 * and MCP integrations, produces a deterministic execution graph, and initializes plugins
 * through an explicit staged lifecycle. It orchestrates only — it never generates
 * (`ARCHITECTURE.md` §9).
 */
export const CEF_RUNTIME_VERSION = '0.0.0';

export * from './types/index.js';
export * from './models/index.js';
export * from './errors/index.js';
export * from './events/index.js';
export * from './logging/index.js';
export * from './interfaces/index.js';
export * from './config/index.js';
export * from './loaders/index.js';
export * from './resolvers/index.js';
export * from './graph/index.js';
export * from './validation/index.js';
export * from './pipeline/index.js';
export * from './core/index.js';
