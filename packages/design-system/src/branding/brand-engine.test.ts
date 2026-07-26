import { describe, expect, it } from 'vitest';
import { BrandEngine } from './brand-engine.js';

describe('BrandEngine', () => {
  const engine = new BrandEngine();

  it('generates a full brand identity from a theme and personality', () => {
    const brand = engine.generate({
      name: 'Northwind',
      themeId: 'luxury',
      personality: ['elegant', 'quiet'],
      pairingId: 'playfair-source',
    });
    expect(brand.typography.heading).toBe('Playfair Display');
    expect(brand.radiusStyle).toBe('sharp'); // luxury overrides radius to 0.25rem
    expect(brand.voiceTone.voice).toContain('Refined');
    expect(brand.motionStyle).toBe('restrained');
  });

  it('chooses expressive styling for bold personalities', () => {
    const brand = engine.generate({ name: 'Spark', personality: ['bold', 'playful'] });
    expect(brand.motionStyle).toBe('expressive');
    expect(brand.buttonStyle).toBe('solid');
  });

  it('serializes to pretty JSON', () => {
    const brand = engine.generate({ name: 'Acme' });
    expect(engine.serialize(brand)).toContain('"name": "Acme"');
  });
});
