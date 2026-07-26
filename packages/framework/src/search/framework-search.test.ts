import { describe, expect, it } from 'vitest';
import { buildCatalog, moduleFiles } from '../testing/fixtures.js';
import { FrameworkSearch } from './framework-search.js';

const files = {
  ...moduleFiles('seo', {
    category: 'discoverability',
    tags: ['metadata', 'sitemap'],
    frameworks: ['nextjs', 'astro'],
    projectTypes: ['landing-page'],
  }),
  ...moduleFiles('frontend', {
    category: 'interface',
    tags: ['ui', 'tokens'],
    frameworks: ['nextjs', 'react'],
    projectTypes: ['all'],
  }),
};

const ids = (matches: readonly { metadata: { id: string } }[]): string[] =>
  matches.map((match) => match.metadata.id);

describe('FrameworkSearch', () => {
  it('searches by keyword', async () => {
    const search = new FrameworkSearch(await buildCatalog(files));
    expect(ids(search.search({ keyword: 'metadata' }))).toEqual(['seo']);
  });

  it('searches by category', async () => {
    const search = new FrameworkSearch(await buildCatalog(files));
    expect(ids(search.search({ category: 'interface' }))).toEqual(['frontend']);
  });

  it('searches by framework', async () => {
    const search = new FrameworkSearch(await buildCatalog(files));
    expect(ids(search.search({ framework: 'astro' }))).toEqual(['seo']);
  });

  it('searches by tag', async () => {
    const search = new FrameworkSearch(await buildCatalog(files));
    expect(ids(search.search({ tag: 'ui' }))).toEqual(['frontend']);
  });

  it('returns everything for an empty query', async () => {
    const search = new FrameworkSearch(await buildCatalog(files));
    expect(search.search({}).length).toBe(2);
  });
});
