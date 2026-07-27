import type { GeneratedFile } from '@cef/core';
import type { PagePlan } from '@cef/intelligence';
import { RouteMapper, type Route } from '../routing/index.js';
import { buildPageContent, type PageContent } from '../content/page-content.js';
import { contentExportName, contentImportPath } from '../content/naming.js';
import { pascalCase } from '../util.js';
import type { GenerationContext } from '../models/index.js';

export interface PageFile {
  readonly pageId: string;
  readonly route: Route;
  readonly file: GeneratedFile;
}

/**
 * Stage 4 builder. Generates one page per blueprint page — never inferring a page that is not in
 * the plan. Each page file opens with a doc block stating its purpose, audience, components, and
 * SEO/content/performance goals, then composes the shared primitives from the page's content model.
 */
export class PageBuilder {
  private readonly router = new RouteMapper();

  build(context: GenerationContext): readonly PageFile[] {
    const routes = this.router.map(context.blueprint.pages);
    return context.blueprint.pages.map((page) => {
      const route = routes.find((r) => r.pageId === page.id);
      const resolved = route ?? this.router.map([page])[0];
      return {
        pageId: page.id,
        route: resolved as Route,
        file: {
          path: `app/${(resolved as Route).dir ? `${(resolved as Route).dir}/` : ''}page.tsx`,
          content: this.page(context, page, resolved as Route),
        },
      };
    });
  }

  private page(context: GenerationContext, page: PagePlan, route: Route): string {
    if (route.isDynamic) {
      return this.dynamicPage(page);
    }
    const content = buildPageContent(context, page);
    const { imports, body } = this.compose(page, content);
    const componentName = `${pascalCase(page.id)}Page`;

    return [
      this.docBlock(context, page),
      `import type { Metadata } from 'next';`,
      ...imports,
      '',
      `export const metadata: Metadata = {`,
      `  title: ${JSON.stringify(page.name)},`,
      `  description: ${JSON.stringify(page.purpose)},`,
      `  alternates: { canonical: ${JSON.stringify(route.path)} },`,
      `};`,
      '',
      `export default function ${componentName}() {`,
      `  return (`,
      `    <>`,
      ...body.map((line) => `      ${line}`),
      `    </>`,
      `  );`,
      `}`,
      '',
    ].join('\n');
  }

  private compose(page: PagePlan, content: PageContent): { imports: string[]; body: string[] } {
    const constName = contentExportName(page.id);
    const importPath = contentImportPath(page.id);
    const imports: string[] = [`import { ${constName} } from '${importPath}';`];
    const body: string[] = [];
    const use = (statement: string): void => {
      if (!imports.includes(statement)) {
        imports.push(statement);
      }
    };

    if (content.hero) {
      use(`import { Hero } from '@/components/sections/hero';`);
      body.push(`<Hero {...${constName}.hero} />`);
    } else {
      use(`import { Section } from '@/components/ui/section';`);
      body.push(
        `<Section title={${JSON.stringify(page.name)}}>`,
        `  <p>{${constName}.intro}</p>`,
        `</Section>`,
      );
    }
    if (content.features.length > 0) {
      use(`import { FeatureGrid } from '@/components/sections/feature-grid';`);
      body.push(`<FeatureGrid title="What you get" items={${constName}.features} />`);
    }
    if (content.testimonials.length > 0) {
      use(`import { Testimonials } from '@/components/sections/testimonials';`);
      body.push(`<Testimonials items={${constName}.testimonials} />`);
    }
    if (content.faqs.length > 0) {
      use(`import { FAQ } from '@/components/sections/faq';`);
      body.push(`<FAQ items={${constName}.faqs} />`);
    }
    if (content.cta) {
      use(`import { CTA } from '@/components/sections/cta';`);
      body.push(`<CTA {...${constName}.cta} />`);
    }
    return { imports, body };
  }

  private dynamicPage(page: PagePlan): string {
    const componentName = `${pascalCase(page.id)}Page`;
    return [
      `import { Section } from '@/components/ui/section';`,
      '',
      `export default function ${componentName}({ params }: { params: { slug: string } }) {`,
      `  return (`,
      `    <Section title={params.slug}>`,
      `      <p>Detail page for {params.slug}. Populate from your data source.</p>`,
      `    </Section>`,
      `  );`,
      `}`,
      '',
    ].join('\n');
  }

  private docBlock(context: GenerationContext, page: PagePlan): string {
    const perf = context.blueprint.performance.coreWebVitals;
    const audience = context.blueprint.audience.personas.map((p) => p.name).join(', ');
    const schema = context.blueprint.seo.schemaRecommendations.find((s) => s.page === page.id);
    return [
      '/**',
      ` * Page: ${page.name}`,
      ` * Purpose: ${page.purpose}`,
      ` * Target audience: ${audience}`,
      ` * Required components: ${page.components.join(', ')}`,
      ` * SEO goals: importance ${page.seoImportance}${schema ? `, schema ${schema.schemaType}` : ''}`,
      ` * Content goals: ${page.sections.join(', ')}`,
      ` * Performance goals: LCP <= ${perf.lcpMs}ms, CLS <= ${perf.cls}, INP <= ${perf.inpMs}ms`,
      ' */',
    ].join('\n');
  }
}
