/**
 * `@cef/review` — the Review & Approval Engine.
 *
 * Inspects a generated site across twelve quality gates, scores it, surfaces weaknesses and
 * recommendations, tracks client feedback and immutable revisions, and drives a human-in-the-loop
 * approval workflow. Generation never implies approval: reviews are deterministic and transparent,
 * and no production release is ever auto-approved (`ARCHITECTURE.md`, Phase 9). It reviews and
 * gates; it does not deploy.
 */
export const CEF_REVIEW_VERSION = '0.0.0';

export * from './paths.js';
export * from './types/index.js';
export * from './models/index.js';
export * from './interfaces/index.js';
export * from './scoring/index.js';
export * from './design/index.js';
export * from './accessibility/index.js';
export * from './seo/index.js';
export * from './performance/index.js';
export * from './security/index.js';
export * from './content/index.js';
export * from './branding/index.js';
export * from './legal/index.js';
export * from './audit/index.js';
export * from './qa/index.js';
export * from './workflows/index.js';
export * from './approval/index.js';
export * from './feedback/index.js';
export * from './history/index.js';
export * from './notifications/index.js';
export * from './reports/index.js';
export * from './validation/index.js';
export * from './review/index.js';
