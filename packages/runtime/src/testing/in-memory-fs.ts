import type { FileSystem } from '@cef/core';

/**
 * An in-memory {@link FileSystem} for tests. Paths are normalized to forward slashes so it
 * behaves identically regardless of the host platform's separator.
 */
export class InMemoryFileSystem implements FileSystem {
  private readonly files = new Map<string, string>();
  private readonly dirs = new Set<string>();

  constructor(files: Record<string, string> = {}) {
    for (const [path, content] of Object.entries(files)) {
      this.store(path, content);
    }
  }

  async exists(path: string): Promise<boolean> {
    const key = normalize(path);
    return this.files.has(key) || this.dirs.has(key);
  }

  async isDirectory(path: string): Promise<boolean> {
    return this.dirs.has(normalize(path));
  }

  async readdir(path: string): Promise<string[]> {
    const prefix = `${normalize(path)}/`;
    const names = new Set<string>();
    for (const file of this.files.keys()) {
      if (file.startsWith(prefix)) {
        const first = file.slice(prefix.length).split('/')[0];
        if (first) {
          names.add(first);
        }
      }
    }
    return [...names];
  }

  async readFile(path: string): Promise<string> {
    const content = this.files.get(normalize(path));
    if (content === undefined) {
      throw new Error(`ENOENT: ${path}`);
    }
    return content;
  }

  async writeFile(path: string, content: string): Promise<void> {
    this.store(path, content);
  }

  async mkdir(path: string): Promise<void> {
    this.dirs.add(normalize(path));
  }

  private store(path: string, content: string): void {
    const key = normalize(path);
    this.files.set(key, content);
    let dir = parent(key);
    while (dir.length > 0) {
      this.dirs.add(dir);
      dir = parent(dir);
    }
  }
}

const normalize = (path: string): string => path.replace(/\\/g, '/').replace(/\/+$/, '');
const parent = (path: string): string => {
  const slash = path.lastIndexOf('/');
  return slash > 0 ? path.slice(0, slash) : '';
};
