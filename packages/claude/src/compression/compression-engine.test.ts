import { describe, expect, it } from 'vitest';
import { ClaudeCompressionEngine } from './compression-engine.js';

describe('ClaudeCompressionEngine', () => {
  const engine = new ClaudeCompressionEngine();

  it('collapses whitespace', () => {
    expect(engine.normalizeWhitespace('  a\n\n b   c ')).toBe('a b c');
  });

  it('summarizes on sentence boundaries and marks truncation', () => {
    const text =
      'First sentence is short. Second sentence adds detail. Third is extra padding here.';
    const summary = engine.summarize(text, 40);
    expect(summary.length).toBeLessThanOrEqual(41);
    expect(summary.endsWith('…')).toBe(true);
    expect(summary.startsWith('First sentence is short')).toBe(true);
  });

  it('leaves short text unchanged', () => {
    expect(engine.summarize('Short.', 160)).toBe('Short.');
  });

  it('removes consecutive duplicate lines', () => {
    expect(engine.dedupeLines('a\na\nb\nb\na')).toBe('a\nb\na');
  });

  it('compresses a capability to summary + reference', () => {
    const compressed = engine.compressCapability({
      id: 'seo',
      name: 'SEO',
      category: 'discoverability',
      summary: 'Metadata, canonical URLs, and structured data for discoverability.',
      tokenEstimate: 60,
    });
    expect(compressed.reference).toContain('modules/seo/');
    expect(compressed.tokenEstimate).toBeGreaterThan(0);
  });

  it('compresses a document, collapsing blank runs and duplicate lines', () => {
    const out = engine.compressDocument(['# A\n\n\n\ntext', '', '# A\n\n\n\ntext']);
    expect(out).not.toMatch(/\n{3,}/);
  });

  it('estimates tokens as roughly a quarter of the characters', () => {
    expect(engine.estimateTokens('12345678')).toBe(2);
    expect(engine.estimateTokens('')).toBe(0);
  });
});
