import type { PagePlan } from '@cef/intelligence';

export interface Route {
  readonly pageId: string;
  readonly name: string;
  /** URL path, e.g. "/" or "/about" or "/products/[slug]". */
  readonly path: string;
  /** App Router directory relative to `app/`, e.g. "" or "about" or "products/[slug]". */
  readonly dir: string;
  readonly isDynamic: boolean;
}

/**
 * Maps blueprint pages to Next.js App Router routes deterministically. The home page is the root;
 * "*-detail" pages become dynamic segments; everything else is a lowercase, hyphenated segment.
 * Routing is derived only from planned pages — no route is ever invented.
 */
export class RouteMapper {
  map(pages: readonly PagePlan[]): readonly Route[] {
    return pages.map((page) => this.route(page));
  }

  private route(page: PagePlan): Route {
    if (page.id === 'home') {
      return { pageId: 'home', name: page.name, path: '/', dir: '', isDynamic: false };
    }
    if (page.id.endsWith('-detail')) {
      const base = page.id.replace(/-detail$/, '');
      const dir = `${base}/[slug]`;
      return { pageId: page.id, name: page.name, path: `/${dir}`, dir, isDynamic: true };
    }
    return {
      pageId: page.id,
      name: page.name,
      path: `/${page.id}`,
      dir: page.id,
      isDynamic: false,
    };
  }
}
