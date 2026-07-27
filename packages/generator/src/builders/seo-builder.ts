import type { GeneratedFile } from '@cef/core';
import { RouteMapper } from '../routing/index.js';
import type { GenerationContext } from '../models/index.js';

/**
 * Stage 5 builder. Generates every SEO artifact from the blueprint and routes: robots, sitemap,
 * web manifest, Organization JSON-LD, an Open Graph image route, and the AI/discovery files
 * (llms.txt, humans.txt, security.txt). Per-page title/description/canonical are emitted by the
 * Page Builder; this stage owns the site-wide artifacts.
 */
export class SEOBuilder {
  private readonly router = new RouteMapper();

  build(context: GenerationContext): readonly GeneratedFile[] {
    const routes = this.router.map(context.blueprint.pages).filter((route) => !route.isDynamic);
    const name = context.options.projectName;
    const themeColor = context.theme.light.primary;

    return [
      { path: 'app/robots.ts', content: ROBOTS },
      { path: 'app/sitemap.ts', content: this.sitemap(routes.map((r) => r.path)) },
      { path: 'app/opengraph-image.tsx', content: this.ogImage(name) },
      { path: 'public/manifest.webmanifest', content: this.manifest(name, themeColor) },
      { path: 'public/schema.json', content: this.schema(context) },
      { path: 'lib/seo/jsonld.ts', content: this.jsonLd(context) },
      {
        path: 'public/llms.txt',
        content: this.llms(
          context,
          routes.map((r) => r.path),
        ),
      },
      { path: 'public/humans.txt', content: this.humans(name) },
      { path: 'public/security.txt', content: SECURITY },
    ];
  }

  private sitemap(paths: readonly string[]): string {
    const entries = paths
      .map(
        (path) =>
          `    { url: \`\${siteUrl}${path === '/' ? '' : path}\`, lastModified: new Date() }`,
      )
      .join(',\n');
    return `import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
${entries},
  ];
}
`;
  }

  private ogImage(name: string): string {
    return `import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The default Open Graph / Twitter card image. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          color: '#ffffff',
          fontSize: 72,
          fontWeight: 600,
        }}
      >
        ${escapeJsxText(name)}
      </div>
    ),
    size,
  );
}
`;
  }

  private manifest(name: string, themeColor: string): string {
    return `${JSON.stringify(
      {
        name,
        short_name: name.slice(0, 12),
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: themeColor,
        icons: [],
      },
      null,
      2,
    )}\n`;
  }

  private schema(context: GenerationContext): string {
    return `${JSON.stringify(this.organization(context), null, 2)}\n`;
  }

  private jsonLd(context: GenerationContext): string {
    return `/** Organization JSON-LD. Render inside a <script type="application/ld+json"> in the layout. */
export const organizationJsonLd = ${JSON.stringify(this.organization(context), null, 2)} as const;
`;
  }

  private organization(context: GenerationContext): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: context.options.projectName,
      url: context.options.baseUrl,
      description: context.blueprint.business.positioning,
    };
  }

  private llms(context: GenerationContext, paths: readonly string[]): string {
    const lines = [
      `# ${context.options.projectName}`,
      '',
      `> ${context.blueprint.business.positioning}`,
      '',
      '## Pages',
      ...paths.map((path) => `- ${context.options.baseUrl}${path === '/' ? '' : path}`),
      '',
    ];
    return lines.join('\n');
  }

  private humans(name: string): string {
    return `/* TEAM */\n  Site: ${name}\n  Built with: Claude Enterprise Framework\n\n/* THANKS */\n  The open-source community.\n`;
  }
}

const ROBOTS = `import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: \`\${siteUrl}/sitemap.xml\`,
  };
}
`;

const SECURITY = `Contact: mailto:security@example.com
Preferred-Languages: en
Expires: 2027-01-01T00:00:00.000Z
`;

function escapeJsxText(value: string): string {
  return value.replace(/[{}<>]/g, (char) => `{'${char}'}`);
}
