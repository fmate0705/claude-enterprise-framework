import type { FrameworkCatalog } from '../catalog/index.js';
import { FrameworkIndexer } from '../indexer/index.js';
import { FileSystemModuleProvider } from '../providers/index.js';
import { InMemoryFileSystem } from './fs.js';

export interface ModOptions {
  engines?: string[];
  deps?: string[];
  priority?: number;
  category?: string;
  skills?: string[];
  mcp?: string[];
  capabilities?: string[];
  projectTypes?: string[];
  frameworks?: string[];
  tags?: string[];
}

const seq = (values?: string[]): string => `[${(values ?? []).join(', ')}]`;

/** Builds a valid module.yaml for a fixture module. */
export function moduleYaml(id: string, opts: ModOptions = {}): string {
  return [
    `id: ${id}`,
    `name: ${id}`,
    'version: 1.0.0',
    `category: ${opts.category ?? 'test'}`,
    `priority: ${opts.priority ?? 50}`,
    `description: ${id} module`,
    `engines: ${seq(opts.engines ?? [id])}`,
    `capabilities: ${seq(opts.capabilities ?? [id])}`,
    `dependsOn: ${seq(opts.deps)}`,
    `skills: ${seq(opts.skills)}`,
    `mcp: ${seq(opts.mcp)}`,
    `projectTypes: ${seq(opts.projectTypes)}`,
    `frameworks: ${seq(opts.frameworks)}`,
    `tags: ${seq(opts.tags)}`,
    `summary: Summary of ${id}`,
    `prompt: Prompt of ${id}`,
    'specFile: spec.md',
    '',
  ].join('\n');
}

/** Builds the on-disk files (module.yaml + spec.md) for a fixture module under /fw/modules. */
export function moduleFiles(id: string, opts?: ModOptions): Record<string, string> {
  return {
    [`/fw/modules/${id}/module.yaml`]: moduleYaml(id, opts),
    [`/fw/modules/${id}/spec.md`]: `Detailed specification of ${id}.`,
  };
}

/** Indexes a set of fixture files into a catalog. */
export async function buildCatalog(files: Record<string, string>): Promise<FrameworkCatalog> {
  const fs = new InMemoryFileSystem(files);
  const indexed = await new FrameworkIndexer(new FileSystemModuleProvider(fs, '/fw')).index();
  if (!indexed.ok) {
    throw new Error(indexed.error.message);
  }
  return indexed.value;
}
