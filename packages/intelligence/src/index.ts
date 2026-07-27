/**
 * `@cef/intelligence` — the Project Intelligence & Planning Engine.
 *
 * It understands *what* should be built. From a project input it analyzes the industry, business,
 * audience, and competitors, then plans pages, features, integrations, journeys, content, SEO,
 * performance, accessibility, legal, and analytics into one structured, deterministic blueprint
 * — machine- and human-readable — that explains why each page and feature exists
 * (`ARCHITECTURE.md`, Phase 7). It plans; it never generates code or UI.
 */
export const CEF_INTELLIGENCE_VERSION = '0.0.0';

export * from './paths.js';
export * from './types/index.js';
export * from './input.js';
export * from './industry/index.js';
export * from './analysis/index.js';
export * from './audience/index.js';
export * from './competitors/index.js';
export * from './pages/index.js';
export * from './features/index.js';
export * from './integrations/index.js';
export * from './journeys/index.js';
export * from './content/index.js';
export * from './seo/index.js';
export * from './performance/index.js';
export * from './legal/index.js';
export * from './analytics/index.js';
export * from './strategy/index.js';
export * from './serialization/index.js';
export * from './validation/index.js';
export * from './planning/index.js';
