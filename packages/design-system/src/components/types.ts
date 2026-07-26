/** The component metadata model. Descriptors are data — what a component is, its variants, slots,
 * and rules — not implementation. Pages are assembled from approved descriptors, never invented. */

export type ComponentCategory =
  | 'navigation'
  | 'hero'
  | 'content'
  | 'social-proof'
  | 'commerce'
  | 'form'
  | 'data'
  | 'media'
  | 'auth'
  | 'admin'
  | 'cta';

export type Complexity = 'low' | 'medium' | 'high';

export type Framework = 'nextjs' | 'react' | 'astro';

/** A named slot a component exposes for composition. */
export interface Slot {
  readonly name: string;
  readonly required: boolean;
  readonly description: string;
}

export interface ComponentDescriptor {
  readonly id: string;
  readonly name: string;
  readonly category: ComponentCategory;
  readonly description: string;
  readonly variants: readonly string[];
  readonly slots: readonly Slot[];
  /** Rules governing how the component may be composed and constrained. */
  readonly compositionRules: readonly string[];
  /** Other component ids this component composes or depends on. */
  readonly dependencies: readonly string[];
  readonly accessibilityNotes: readonly string[];
  readonly seoNotes: readonly string[];
  /** Whether the component supports motion, and which motion presets apply. */
  readonly animation: {
    readonly supported: boolean;
    readonly presets: readonly string[];
  };
  readonly responsiveBehaviour: string;
  readonly supportedFrameworks: readonly Framework[];
  readonly complexity: Complexity;
}
