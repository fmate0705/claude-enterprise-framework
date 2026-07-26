import { baseTokens } from '../tokens/index.js';
import type { MotionTokens } from '../tokens/index.js';

/** The categories of motion the system standardizes. */
export type MotionCategory =
  'micro-interaction' | 'page-transition' | 'scroll' | 'hover' | 'loading' | 'exit';

/** A named, reusable motion preset expressed in token references, not raw values. */
export interface MotionPreset {
  readonly id: string;
  readonly category: MotionCategory;
  readonly description: string;
  /** Token key into `motion.durations`. */
  readonly duration: keyof MotionTokens['durations'];
  /** Token key into `motion.easings`. */
  readonly easing: keyof MotionTokens['easings'];
  /** How this preset behaves when the user prefers reduced motion. */
  readonly reducedMotion: 'disable' | 'crossfade' | 'instant';
}

/** Motion libraries the system knows how to target (metadata only; no runtime dependency). */
export const MOTION_LIBRARIES = ['framer-motion', 'motion-one', 'gsap'] as const;
export type MotionLibrary = (typeof MOTION_LIBRARIES)[number];

/**
 * Standardizes motion: a fixed catalog of presets keyed to duration/easing tokens, all within the
 * performance budget and all with an explicit reduced-motion behavior. Admitting motion is a
 * lookup here, never an ad-hoc animation.
 */
export class MotionEngine {
  /** The maximum admissible duration for interface motion (ms). */
  static readonly BUDGET_MS = 600;

  private readonly tokens: MotionTokens;

  private static readonly PRESETS: readonly MotionPreset[] = [
    {
      id: 'button-press',
      category: 'micro-interaction',
      description: 'Tactile press feedback',
      duration: 'fast',
      easing: 'standard',
      reducedMotion: 'instant',
    },
    {
      id: 'fade-in',
      category: 'micro-interaction',
      description: 'Element fades in',
      duration: 'normal',
      easing: 'decelerate',
      reducedMotion: 'instant',
    },
    {
      id: 'page-fade',
      category: 'page-transition',
      description: 'Cross-page fade',
      duration: 'normal',
      easing: 'standard',
      reducedMotion: 'crossfade',
    },
    {
      id: 'reveal-on-scroll',
      category: 'scroll',
      description: 'Fade-and-rise as content enters',
      duration: 'slow',
      easing: 'decelerate',
      reducedMotion: 'disable',
    },
    {
      id: 'hover-lift',
      category: 'hover',
      description: 'Subtle elevation on hover',
      duration: 'fast',
      easing: 'standard',
      reducedMotion: 'disable',
    },
    {
      id: 'skeleton-pulse',
      category: 'loading',
      description: 'Loading placeholder pulse',
      duration: 'slower',
      easing: 'standard',
      reducedMotion: 'disable',
    },
    {
      id: 'exit-fade',
      category: 'exit',
      description: 'Element fades out on exit',
      duration: 'fast',
      easing: 'accelerate',
      reducedMotion: 'instant',
    },
  ];

  constructor(tokens: MotionTokens = baseTokens.motion) {
    this.tokens = tokens;
  }

  presets(): readonly MotionPreset[] {
    return MotionEngine.PRESETS;
  }

  byCategory(category: MotionCategory): readonly MotionPreset[] {
    return MotionEngine.PRESETS.filter((preset) => preset.category === category);
  }

  preset(id: string): MotionPreset | undefined {
    return MotionEngine.PRESETS.find((preset) => preset.id === id);
  }

  libraries(): readonly MotionLibrary[] {
    return MOTION_LIBRARIES;
  }

  /** The resolved duration (ms) for a preset. */
  durationMs(preset: MotionPreset): number {
    return this.tokens.durations[preset.duration];
  }

  /** True when a preset's duration is within the performance budget. */
  isWithinBudget(preset: MotionPreset): boolean {
    return this.durationMs(preset) <= MotionEngine.BUDGET_MS;
  }
}
