/**
 * `@cef/design-system` — the Design System & Component Engine.
 *
 * The single source of truth for every styling value and every component in a generated project:
 * strongly-typed design tokens, generated themes (light/dark/industry), brand identity as
 * structured metadata, a centralized component and layout registry, standardized motion,
 * WCAG AA accessibility auditing, deterministic responsive rules, and design presets — validated
 * as a whole. UI originates here; it is never random (`ARCHITECTURE.md`, Phase 6). This package
 * describes and validates the design system; it does not generate pages.
 */
export const CEF_DESIGN_SYSTEM_VERSION = '0.0.0';

export * from './paths.js';
export * from './types/index.js';
export * from './tokens/index.js';
export * from './typography/index.js';
export * from './spacing/index.js';
export * from './responsive/index.js';
export * from './motion/index.js';
export * from './icons/index.js';
export * from './accessibility/index.js';
export * from './themes/index.js';
export * from './branding/index.js';
export * from './components/index.js';
export * from './layouts/index.js';
export * from './registry/index.js';
export * from './presets/index.js';
export * from './patterns/index.js';
export * from './templates/index.js';
export * from './validation/index.js';
export * from './interfaces/index.js';
export * from './engine/index.js';
