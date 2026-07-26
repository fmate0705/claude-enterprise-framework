import type { ValidationIssue, ValidationReport } from '../types/index.js';
import { CONTRAST_PAIRS, type ColorScheme, type Theme } from '../themes/types.js';
import { aaThreshold, aaaThreshold, contrastRatio, type TextSize } from './contrast.js';

export interface ContrastCheck {
  readonly foreground: string;
  readonly background: string;
  readonly ratio: number;
  readonly aa: boolean;
  readonly aaa: boolean;
}

/** A named accessibility requirement group, checked during component review. */
export interface AccessibilityChecklist {
  readonly id: string;
  readonly title: string;
  readonly requirements: readonly string[];
}

/**
 * Enforces WCAG 2.2 AA as the default floor. It computes exact contrast for a color pair, audits
 * every semantic pair in a theme scheme, and exposes the structured checklists (focus, ARIA,
 * keyboard, semantics, screen reader, reduced motion) that component review verifies.
 */
export class AccessibilityEngine {
  private static readonly CHECKLISTS: readonly AccessibilityChecklist[] = [
    {
      id: 'contrast',
      title: 'Contrast',
      requirements: [
        'Body text meets 4.5:1 against its background.',
        'Large text and UI meets at least 3:1.',
        'Meaning is never conveyed by color alone.',
      ],
    },
    {
      id: 'focus',
      title: 'Focus states',
      requirements: [
        'Every interactive element has a visible focus indicator.',
        'The focus ring uses a high-contrast token distinct from hover.',
        'Focus order follows the reading order.',
      ],
    },
    {
      id: 'aria',
      title: 'ARIA',
      requirements: [
        'Prefer semantic elements; add ARIA only to fill gaps.',
        'Icon-only controls carry an accessible name.',
        'Dynamic status is announced via a live region.',
      ],
    },
    {
      id: 'keyboard',
      title: 'Keyboard navigation',
      requirements: [
        'All functionality is operable by keyboard.',
        'Overlays trap and restore focus correctly.',
        'No keyboard traps outside intentional dialogs.',
      ],
    },
    {
      id: 'semantics',
      title: 'Semantic HTML',
      requirements: [
        'Landmarks (header, nav, main, footer) wrap the page.',
        'One h1 per page with headings in order.',
        'Controls use button and a, never div or span.',
      ],
    },
    {
      id: 'screen-reader',
      title: 'Screen reader support',
      requirements: [
        'Images have meaningful or intentionally empty alt text.',
        'Form fields have associated visible labels.',
        'Decorative elements are hidden from assistive tech.',
      ],
    },
    {
      id: 'reduced-motion',
      title: 'Reduced motion',
      requirements: [
        'Non-essential motion is removed under prefers-reduced-motion.',
        'Essential motion degrades to an instant or crossfade state.',
      ],
    },
  ];

  checklists(): readonly AccessibilityChecklist[] {
    return AccessibilityEngine.CHECKLISTS;
  }

  /** Exact contrast check for a foreground/background pair. */
  check(
    foreground: string,
    background: string,
    size: TextSize = 'normal',
  ): ContrastCheck | undefined {
    const ratio = contrastRatio(foreground, background);
    if (ratio === undefined) {
      return undefined;
    }
    return {
      foreground,
      background,
      ratio: Math.round(ratio * 100) / 100,
      aa: ratio >= aaThreshold(size),
      aaa: ratio >= aaaThreshold(size),
    };
  }

  /** Audits every required semantic pair in a theme scheme against AA. */
  auditTheme(theme: Theme, scheme: ColorScheme): ValidationReport {
    const colors = scheme === 'light' ? theme.light : theme.dark;
    const issues: ValidationIssue[] = [];
    for (const [foregroundRole, backgroundRole] of CONTRAST_PAIRS) {
      const foreground = colors[foregroundRole];
      const background = colors[backgroundRole];
      // Foreground/background body text uses the 4.5:1 floor.
      const check = this.check(foreground, background, 'normal');
      if (!check) {
        issues.push({
          severity: 'error',
          message: `Theme "${theme.id}" ${scheme}: cannot parse ${foregroundRole}/${backgroundRole}.`,
        });
        continue;
      }
      if (!check.aa) {
        issues.push({
          severity: 'error',
          message: `Theme "${theme.id}" ${scheme}: ${foregroundRole} on ${backgroundRole} is ${check.ratio}:1 (needs 4.5:1).`,
        });
      }
    }
    return { ok: issues.every((issue) => issue.severity !== 'error'), issues };
  }
}
