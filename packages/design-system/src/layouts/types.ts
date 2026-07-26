/** Layout model: a page archetype expressed as an ordered list of composable sections, each
 * bound to an approved component. Layouts describe structure; they do not generate pages. */

export interface LayoutSection {
  readonly id: string;
  /** The approved component id that fills this section. */
  readonly componentId: string;
  /** The section's role in the page. */
  readonly role: string;
  readonly optional: boolean;
}

export type LayoutKind =
  | 'landing'
  | 'corporate'
  | 'saas'
  | 'dashboard'
  | 'portfolio'
  | 'documentation'
  | 'blog'
  | 'commerce'
  | 'admin'
  | 'authentication';

export interface LayoutDescriptor {
  readonly id: LayoutKind;
  readonly name: string;
  readonly description: string;
  readonly sections: readonly LayoutSection[];
}
