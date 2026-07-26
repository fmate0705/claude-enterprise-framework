import type { FrameworkCatalog } from '../catalog/index.js';
import type { ModuleDescriptor } from '../models/index.js';
import { FrameworkSearch, type SearchCriteria } from '../search/index.js';

/**
 * The searchable framework registry — the indexed result of discovery. Wraps the catalog and
 * exposes lookup and search over it.
 */
export class FrameworkRegistry {
  readonly catalog: FrameworkCatalog;
  readonly search: FrameworkSearch;

  constructor(catalog: FrameworkCatalog) {
    this.catalog = catalog;
    this.search = new FrameworkSearch(catalog);
  }

  all(): readonly ModuleDescriptor[] {
    return this.catalog.all();
  }

  get(id: string): ModuleDescriptor | undefined {
    return this.catalog.get(id);
  }

  find(criteria: SearchCriteria): readonly ModuleDescriptor[] {
    return this.search.search(criteria);
  }

  size(): number {
    return this.catalog.size();
  }
}
