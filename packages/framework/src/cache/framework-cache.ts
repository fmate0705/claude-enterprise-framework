export interface CacheStats {
  readonly hits: number;
  readonly misses: number;
  readonly entries: number;
}

/**
 * An in-memory cache that avoids loading the same framework component twice. Detailed
 * specifications, and any other lazily-loaded document, are cached on first access.
 */
export class FrameworkCache {
  private readonly store = new Map<string, string>();
  private hits = 0;
  private misses = 0;

  has(key: string): boolean {
    return this.store.has(key);
  }

  /** Returns the cached value or loads, caches, and returns it. */
  async getOrLoad(key: string, load: () => Promise<string>): Promise<string> {
    const existing = this.store.get(key);
    if (existing !== undefined) {
      this.hits += 1;
      return existing;
    }
    this.misses += 1;
    const value = await load();
    this.store.set(key, value);
    return value;
  }

  clear(): void {
    this.store.clear();
    this.hits = 0;
    this.misses = 0;
  }

  stats(): CacheStats {
    return { hits: this.hits, misses: this.misses, entries: this.store.size };
  }
}
