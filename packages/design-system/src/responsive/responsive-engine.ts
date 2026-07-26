import { baseTokens } from '../tokens/index.js';
import type { Breakpoints } from '../tokens/index.js';

/** The mobile-first breakpoint names, smallest first. `base` means "no media query". */
export const BREAKPOINT_ORDER = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export type BreakpointName = (typeof BREAKPOINT_ORDER)[number];

/** A value that varies by breakpoint, given mobile-first (each breakpoint inherits smaller ones). */
export type ResponsiveValue<T> = Partial<Record<BreakpointName, T>>;

/**
 * Owns responsive behavior deterministically: it resolves a responsive value for a breakpoint by
 * cascading from smaller breakpoints (mobile-first), and emits min-width media queries. The same
 * input always yields the same result, so layouts adapt predictably rather than ad hoc.
 */
export class ResponsiveEngine {
  private readonly breakpoints: Breakpoints;

  constructor(breakpoints: Breakpoints = baseTokens.breakpoints) {
    this.breakpoints = breakpoints;
  }

  order(): readonly BreakpointName[] {
    return BREAKPOINT_ORDER;
  }

  /** The min-width media query for a breakpoint; `base` has none. */
  mediaQuery(breakpoint: BreakpointName): string | undefined {
    if (breakpoint === 'base') {
      return undefined;
    }
    return `@media (min-width: ${this.breakpoints[breakpoint]}px)`;
  }

  /**
   * Resolves the effective value at `at` by taking the nearest defined value at or below it
   * (mobile-first cascade). Returns undefined when nothing is defined at or below `at`.
   */
  resolve<T>(value: ResponsiveValue<T>, at: BreakpointName): T | undefined {
    const target = BREAKPOINT_ORDER.indexOf(at);
    let resolved: T | undefined;
    for (let index = 0; index <= target; index += 1) {
      const name = BREAKPOINT_ORDER[index];
      if (name !== undefined && value[name] !== undefined) {
        resolved = value[name];
      }
    }
    return resolved;
  }

  /** True when a responsive value only uses defined breakpoint names. */
  isValid<T>(value: ResponsiveValue<T>): boolean {
    return Object.keys(value).every((key) => (BREAKPOINT_ORDER as readonly string[]).includes(key));
  }
}
