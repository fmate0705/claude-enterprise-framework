import type { FrameworkCatalog } from '../catalog/index.js';
import type { ModuleDescriptor, ModuleMetadata } from '../models/index.js';

export interface SearchCriteria {
  readonly keyword?: string;
  readonly capability?: string;
  readonly projectType?: string;
  readonly framework?: string;
  readonly category?: string;
  readonly tag?: string;
}

/** Searches the framework catalog by capability, project type, framework, keyword, category, or tag. */
export class FrameworkSearch {
  constructor(private readonly catalog: FrameworkCatalog) {}

  search(criteria: SearchCriteria): readonly ModuleDescriptor[] {
    const keyword = criteria.keyword?.trim().toLowerCase();
    return this.catalog.all().filter((descriptor) => {
      const metadata = descriptor.metadata;
      if (
        criteria.capability &&
        metadata.id !== criteria.capability &&
        !metadata.capabilities.includes(criteria.capability)
      ) {
        return false;
      }
      if (
        criteria.projectType &&
        !(
          metadata.projectTypes.includes('all') ||
          metadata.projectTypes.includes(criteria.projectType)
        )
      ) {
        return false;
      }
      if (
        criteria.framework &&
        metadata.frameworks.length > 0 &&
        !metadata.frameworks.includes(criteria.framework)
      ) {
        return false;
      }
      if (criteria.category && metadata.category !== criteria.category) {
        return false;
      }
      if (criteria.tag && !metadata.tags.includes(criteria.tag)) {
        return false;
      }
      if (keyword && keyword.length > 0 && !this.matchesKeyword(metadata, keyword)) {
        return false;
      }
      return true;
    });
  }

  private matchesKeyword(metadata: ModuleMetadata, keyword: string): boolean {
    const haystack = [
      metadata.id,
      metadata.name,
      metadata.description,
      metadata.summary,
      metadata.category,
      ...metadata.tags,
      ...metadata.capabilities,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(keyword);
  }
}
