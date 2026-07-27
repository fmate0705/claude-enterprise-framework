/**
 * `@cef/generator` — the Generation Pipeline & Website Builder.
 *
 * Converts a project blueprint into a production-ready Next.js application through eleven
 * independent, rerunnable stages: architecture, layout, components, pages, SEO, content, assets,
 * validation, review, repair, and export. Generation is deterministic — the same blueprint and
 * options always produce the same files — and every artifact is tracked. Pages are generated only
 * from the blueprint, never inferred (`ARCHITECTURE.md`, Phase 8). It builds the site; it does not
 * deploy it.
 */
export const CEF_GENERATOR_VERSION = '0.0.0';

export * from './util.js';
export * from './models/index.js';
export * from './interfaces/index.js';
export * from './routing/index.js';
export * from './content/page-content.js';
export * from './content/naming.js';
export * from './builders/index.js';
export * from './validation/index.js';
export * from './review/index.js';
export * from './repair/index.js';
export * from './export/index.js';
export * from './stages/index.js';
export * from './pipeline/index.js';
