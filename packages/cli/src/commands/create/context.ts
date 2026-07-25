import type { DerivedCapabilities, ProjectSpec } from '@cef/core';

/** Everything a template needs to render, resolved once before the template layer runs. */
export interface TemplateContext {
  readonly spec: ProjectSpec;
  readonly capabilities: DerivedCapabilities;
  readonly cefVersion: string;
  /** ISO-8601 creation timestamp, sourced from the injected clock (deterministic in tests). */
  readonly createdAt: string;
}
