import { cefError, err, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import { parse as parseYaml } from 'yaml';
import { FrameworkCatalog } from '../catalog/index.js';
import type { ModuleProvider } from '../interfaces/index.js';
import { moduleSchema, type ModuleDescriptor } from '../models/index.js';

/**
 * Builds a searchable {@link FrameworkCatalog} from discovered module sources: parse each
 * `module.yaml`, validate its metadata, and index it. Invalid metadata fails fast with a
 * descriptive error.
 */
export class FrameworkIndexer {
  constructor(private readonly provider: ModuleProvider) {}

  async index(): Promise<Result<FrameworkCatalog, CefError>> {
    const discovered = await this.provider.discover();
    if (!discovered.ok) {
      return discovered;
    }

    const descriptors: ModuleDescriptor[] = [];
    const seen = new Set<string>();
    for (const source of discovered.value) {
      let raw: unknown;
      try {
        raw = parseYaml(source.manifest);
      } catch (cause) {
        return err(
          cefError('INVALID_MODULE', `Failed to parse module manifest in ${source.sourceDir}.`, {
            cause,
          }),
        );
      }

      const parsed = moduleSchema.safeParse(raw);
      if (!parsed.success) {
        const issue = parsed.error.issues[0];
        const detail = issue ? `${issue.path.join('.') || 'root'}: ${issue.message}` : 'invalid';
        return err(cefError('INVALID_MODULE', `Invalid module in ${source.sourceDir}: ${detail}.`));
      }

      if (seen.has(parsed.data.id)) {
        return err(
          cefError('INVALID_MODULE', `Duplicate module id "${parsed.data.id}".`, {
            hint: 'Each module id must be unique across the framework.',
          }),
        );
      }
      seen.add(parsed.data.id);
      descriptors.push({ metadata: parsed.data, sourceDir: source.sourceDir });
    }

    return ok(new FrameworkCatalog(descriptors));
  }
}
