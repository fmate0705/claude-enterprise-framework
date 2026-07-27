import { describe, expect, it } from 'vitest';
import { GATES } from '../types/index.js';
import { cleanSite, reviewInput } from '../testing/fixtures.js';
import { QAEngine } from './qa-engine.js';

describe('QAEngine', () => {
  const qa = new QAEngine();

  it('runs all twelve gates in canonical order', () => {
    const gates = qa.run(reviewInput());
    expect(gates.map((g) => g.gate)).toEqual(GATES.map((g) => g.id));
  });

  it('passes the required craft gates for a clean site', () => {
    const gates = qa.run(reviewInput());
    for (const id of ['architecture', 'design', 'accessibility', 'seo']) {
      const gate = gates.find((g) => g.gate === id);
      expect(gate?.status, id).not.toBe('fail');
    }
  });

  it('is deterministic — the same site yields identical findings', () => {
    const a = qa.run(reviewInput());
    const b = qa.run(reviewInput());
    expect(a).toEqual(b);
  });

  it('fails accessibility when the skip link is missing', () => {
    const files = cleanSite();
    files.set('app/layout.tsx', '<html lang="hu"><main id="main"></main></html>\n');
    const gates = qa.run(reviewInput(files));
    expect(gates.find((g) => g.gate === 'accessibility')?.status).toBe('fail');
  });

  it('blocks content when lorem ipsum ships', () => {
    const files = cleanSite();
    files.set('content/home.ts', 'export const x = "lorem ipsum dolor";\n');
    const gates = qa.run(reviewInput(files));
    expect(gates.find((g) => g.gate === 'content')?.status).toBe('fail');
  });

  it('blocks security when a secret is committed', () => {
    const files = cleanSite();
    files.set('lib/config.ts', "const key = 'sk_live_ABCDEFGHIJKLMNOPQRSTUVWX';\n");
    const gates = qa.run(reviewInput(files));
    expect(gates.find((g) => g.gate === 'security')?.status).toBe('fail');
  });
});
