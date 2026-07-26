import { readdir, readFile, stat } from 'node:fs/promises';
import type { FileSystem } from '@cef/core';

/** In-memory filesystem for tests, counting reads so lazy-loading and caching can be asserted. */
export class InMemoryFileSystem implements FileSystem {
  private readonly files = new Map<string, string>();
  private readonly dirs = new Set<string>();
  private readonly reads = new Map<string, number>();

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
    for (const file of [...this.files.keys(), ...this.dirs]) {
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
    const key = normalize(path);
    const content = this.files.get(key);
    if (content === undefined) {
      throw new Error(`ENOENT: ${path}`);
    }
    this.reads.set(key, (this.reads.get(key) ?? 0) + 1);
    return content;
  }

  async writeFile(path: string, content: string): Promise<void> {
    this.store(path, content);
  }

  async mkdir(path: string): Promise<void> {
    this.dirs.add(normalize(path));
  }

  /** How many times a path has been read — used to assert lazy loading and caching. */
  readCount(path: string): number {
    return this.reads.get(normalize(path)) ?? 0;
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

/** Read-only node filesystem for integration tests against the real modules directory. */
export class NodeReadOnlyFileSystem implements FileSystem {
  async exists(path: string): Promise<boolean> {
    try {
      await stat(path);
      return true;
    } catch {
      return false;
    }
  }
  async isDirectory(path: string): Promise<boolean> {
    try {
      return (await stat(path)).isDirectory();
    } catch {
      return false;
    }
  }
  async readdir(path: string): Promise<string[]> {
    return readdir(path);
  }
  async readFile(path: string): Promise<string> {
    return readFile(path, 'utf8');
  }
  async writeFile(): Promise<void> {
    throw new Error('NodeReadOnlyFileSystem is read-only.');
  }
  async mkdir(): Promise<void> {
    throw new Error('NodeReadOnlyFileSystem is read-only.');
  }
}

const normalize = (path: string): string => path.replace(/\\/g, '/').replace(/\/+$/, '');
const parent = (path: string): string => {
  const slash = path.lastIndexOf('/');
  return slash > 0 ? path.slice(0, slash) : '';
};
