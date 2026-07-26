import { describe, expect, it } from 'vitest';
import { PresetManager } from './preset-manager.js';

describe('PresetManager', () => {
  const manager = new PresetManager();

  it('provides every required preset', () => {
    for (const id of [
      'minimal',
      'premium',
      'luxury',
      'enterprise',
      'modern',
      'editorial',
      'bold',
      'elegant',
      'tech',
      'creative',
    ]) {
      expect(manager.get(id), id).toBeDefined();
    }
  });

  it('applies a preset onto the base tokens by overriding, not replacing', () => {
    const preset = manager.get('luxury');
    expect(preset).toBeDefined();
    if (!preset) {
      return;
    }
    const tokens = manager.apply(preset);
    // Radius overridden to the "sharp" style; colors inherited from base.
    expect(tokens.radius.md).toBe('0.25rem');
    expect(tokens.colors.primary['500']).toBe('#3b82f6');
    // Type scale rebuilt to the preset's ratio, still monotonic.
    expect(tokens.typography.scale['7xl'].sizeRem).toBeGreaterThan(
      tokens.typography.scale.base.sizeRem,
    );
  });

  it('is deterministic — same preset yields the same tokens', () => {
    const preset = manager.get('bold');
    expect(preset).toBeDefined();
    if (preset) {
      expect(manager.apply(preset)).toEqual(manager.apply(preset));
    }
  });
});
