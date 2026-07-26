import { describe, expect, it } from 'vitest';
import { ThemeEngine } from '../themes/index.js';
import { contrastRatio, meetsAA } from './contrast.js';
import { AccessibilityEngine } from './accessibility-engine.js';

describe('contrast math', () => {
  it('computes the maximal ratio for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });

  it('returns undefined for unparseable colors', () => {
    expect(contrastRatio('nope', '#ffffff')).toBeUndefined();
  });

  it('applies the AA floor', () => {
    expect(meetsAA('#767676', '#ffffff')).toBe(true); // 4.54:1
    expect(meetsAA('#999999', '#ffffff')).toBe(false); // 2.85:1
  });
});

describe('AccessibilityEngine', () => {
  const engine = new AccessibilityEngine();
  const themes = new ThemeEngine();

  it('reports AA and AAA for a pair', () => {
    const check = engine.check('#0f172a', '#ffffff');
    expect(check?.aa).toBe(true);
    expect(check?.aaa).toBe(true);
  });

  it('audits every generated theme as AA-conformant in both schemes', () => {
    for (const theme of themes.list()) {
      expect(engine.auditTheme(theme, 'light').ok).toBe(true);
      expect(engine.auditTheme(theme, 'dark').ok).toBe(true);
    }
  });

  it('exposes the required accessibility checklists', () => {
    const ids = engine.checklists().map((checklist) => checklist.id);
    expect(ids).toContain('contrast');
    expect(ids).toContain('focus');
    expect(ids).toContain('reduced-motion');
  });
});
