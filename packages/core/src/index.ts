/**
 * `@cef/core` — the runtime, plugin SDK, and domain types for the CEF CLI.
 *
 * The innermost layer of the architecture (`ARCHITECTURE.md` §5): it depends on nothing
 * outside itself and is consumed by every other package.
 */
export const CEF_CORE_VERSION = '0.0.0';

export * from './errors.js';
export * from './result.js';
export * from './container.js';
export * from './ports.js';
export * from './domain.js';
export * from './generation.js';
