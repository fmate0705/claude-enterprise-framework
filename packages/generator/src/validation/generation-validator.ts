import { DesignValidator } from '@cef/design-system';
import { RouteMapper } from '../routing/index.js';
import { issue, type GenerationContext, type StageIssue } from '../models/index.js';

export interface GenerationValidationReport {
  readonly ok: boolean;
  readonly issues: readonly StageIssue[];
}

/** Node built-ins and packages that resolve from node_modules — not local files. */
const EXTERNAL =
  /^(next|next\/.+|react|react-dom|clsx|tailwind-merge|class-variance-authority|lucide-react|@radix-ui\/.+)$/;

/**
 * Validates the generated file set structurally: local imports resolve, every planned route has a
 * page, pages carry metadata, the SEO and env artifacts exist, and the accessibility scaffolding
 * (skip link, main landmark, lang, reduced motion) is present. Design tokens are validated by the
 * design system's own validator. It reads only the accumulated files, so it is deterministic.
 */
export class GenerationValidator {
  private readonly router = new RouteMapper();
  private readonly design = new DesignValidator();

  validate(context: GenerationContext): GenerationValidationReport {
    const files = context.files;
    const issues: StageIssue[] = [
      ...this.checkImports(files),
      ...this.checkRoutes(context),
      ...this.checkMetadata(context, files),
      ...this.checkSeo(files),
      ...this.checkAccessibility(files),
      ...this.checkEnv(files),
    ];
    for (const finding of this.design.validate(context.tokens).issues) {
      issues.push(issue(finding.severity, `design: ${finding.message}`));
    }
    return { ok: issues.every((i) => i.severity !== 'error'), issues };
  }

  private checkImports(files: ReadonlyMap<string, string>): StageIssue[] {
    const issues: StageIssue[] = [];
    for (const [path, content] of files) {
      if (!path.endsWith('.ts') && !path.endsWith('.tsx')) {
        continue;
      }
      for (const specifier of importSpecifiers(content)) {
        if (EXTERNAL.test(specifier) || !specifier.startsWith('@/')) {
          continue;
        }
        if (!this.resolves(specifier, files)) {
          issues.push(issue('error', `Unresolved import "${specifier}".`, path));
        }
      }
    }
    return issues;
  }

  private resolves(specifier: string, files: ReadonlyMap<string, string>): boolean {
    const base = specifier.replace(/^@\//, '');
    return (
      files.has(`${base}.ts`) ||
      files.has(`${base}.tsx`) ||
      files.has(`${base}/index.ts`) ||
      files.has(`${base}/index.tsx`)
    );
  }

  private checkRoutes(context: GenerationContext): StageIssue[] {
    const issues: StageIssue[] = [];
    for (const route of this.router.map(context.blueprint.pages)) {
      const path = `app/${route.dir ? `${route.dir}/` : ''}page.tsx`;
      if (!context.files.has(path)) {
        issues.push(issue('error', `Missing page for route "${route.path}".`, path));
      }
    }
    return issues;
  }

  private checkMetadata(
    context: GenerationContext,
    files: ReadonlyMap<string, string>,
  ): StageIssue[] {
    const issues: StageIssue[] = [];
    for (const route of this.router.map(context.blueprint.pages)) {
      if (route.isDynamic) {
        continue;
      }
      const path = `app/${route.dir ? `${route.dir}/` : ''}page.tsx`;
      const content = files.get(path);
      if (content && !/export const metadata|generateMetadata/.test(content)) {
        issues.push(issue('warning', `Page "${route.path}" has no metadata.`, path));
      }
    }
    return issues;
  }

  private checkSeo(files: ReadonlyMap<string, string>): StageIssue[] {
    const required = [
      'app/robots.ts',
      'app/sitemap.ts',
      'public/manifest.webmanifest',
      'public/llms.txt',
    ];
    return required
      .filter((path) => !files.has(path))
      .map((path) => issue('error', `Missing SEO artifact "${path}".`, path));
  }

  private checkAccessibility(files: ReadonlyMap<string, string>): StageIssue[] {
    const issues: StageIssue[] = [];
    const layout = files.get('app/layout.tsx');
    if (layout) {
      if (!layout.includes('#main')) {
        issues.push(issue('error', 'Root layout has no skip link.', 'app/layout.tsx'));
      }
      if (!/<html lang=/.test(layout)) {
        issues.push(issue('error', 'Root layout does not set html lang.', 'app/layout.tsx'));
      }
    }
    const globals = files.get('app/globals.css');
    if (globals && !globals.includes('prefers-reduced-motion')) {
      issues.push(
        issue('warning', 'globals.css has no reduced-motion handling.', 'app/globals.css'),
      );
    }
    return issues;
  }

  private checkEnv(files: ReadonlyMap<string, string>): StageIssue[] {
    return files.has('.env.example')
      ? []
      : [issue('warning', 'Missing .env.example.', '.env.example')];
  }
}

/** Extracts every `from '...'` module specifier in a source file. */
export function importSpecifiers(content: string): readonly string[] {
  const specifiers: string[] = [];
  const regex = /from\s+'([^']+)'/g;
  let match = regex.exec(content);
  while (match !== null) {
    if (match[1] !== undefined) {
      specifiers.push(match[1]);
    }
    match = regex.exec(content);
  }
  return specifiers;
}
