/**
 * `@cef/claude` — the Claude Integration & Context Engine.
 *
 * It turns a project's resolved state into a compact, deterministic context package for Claude
 * Code: one generated context file, concise project memory, session tracking, an implementation
 * roadmap, task-scoped prompt fragments, artifact tracking, and a synchronization engine that
 * keeps all of it current. It consumes a {@link ProjectSnapshot} mapped by the CLI from the
 * Runtime and Framework Loader; it never reads the manifest or filesystem itself
 * (`ARCHITECTURE.md`, Phase 5). It orchestrates context — it never generates websites.
 */
export const CEF_CLAUDE_VERSION = '0.0.0';

export * from './paths.js';
export * from './types/index.js';
export * from './models/index.js';
export * from './interfaces/index.js';
export * from './compression/index.js';
export * from './planner/index.js';
export * from './roadmap/index.js';
export * from './memory/index.js';
export * from './session/index.js';
export * from './artifacts/index.js';
export * from './serialization/index.js';
export * from './summaries/index.js';
export * from './context/index.js';
export * from './validation/index.js';
export * from './sync/index.js';
export * from './engine/index.js';
