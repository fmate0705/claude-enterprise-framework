import {
  ArchitectureBuilder,
  AssetBuilder,
  ComponentBuilder,
  ContentBuilder,
  LayoutBuilder,
  PageBuilder,
  SEOBuilder,
} from '../builders/index.js';
import { ExportReporter } from '../export/index.js';
import type { PipelineStage } from '../interfaces/index.js';
import type { ArtifactKind, GenerationContext, StageResult } from '../models/index.js';
import { QualityReviewer } from '../review/index.js';
import { RepairEngine } from '../repair/index.js';
import { GenerationValidator } from '../validation/index.js';
import { artifact, result } from './support.js';

/** Stage 1 — Architecture: the project skeleton, config, and token-seeded globals. */
export class ArchitectureStage implements PipelineStage {
  readonly id = 'architecture';
  readonly name = 'Architecture Builder';
  run(context: GenerationContext): StageResult {
    const files = new ArchitectureBuilder().build(context);
    return result(this, {
      files,
      artifacts: files.map((file) => artifact('config', file.path, this.id)),
      summary: `Project architecture from blueprint (${files.length} files).`,
    });
  }
}

/** Stage 2 — Layout: root layout, navigation, footer, container. */
export class LayoutStage implements PipelineStage {
  readonly id = 'layout';
  readonly name = 'Layout Builder';
  run(context: GenerationContext): StageResult {
    const files = new LayoutBuilder().build(context);
    return result(this, {
      files,
      artifacts: files.map((file) =>
        artifact(file.path.includes('layout') ? 'layout' : 'component', file.path, this.id),
      ),
      summary: `Shared shell and navigation (${files.length} files).`,
    });
  }
}

/** Stage 3 — Component: the reusable, deduplicated primitives pages compose. */
export class ComponentStage implements PipelineStage {
  readonly id = 'component';
  readonly name = 'Component Builder';
  run(context: GenerationContext): StageResult {
    const components = new ComponentBuilder().build(context);
    return result(this, {
      files: components.map((component) => component.file),
      artifacts: components.map((component) => artifact('component', component.file.path, this.id)),
      summary: `Reusable components (${components.length}).`,
    });
  }
}

/** Stage 4 — Page: one page per blueprint page, never inferred. */
export class PageStage implements PipelineStage {
  readonly id = 'page';
  readonly name = 'Page Builder';
  run(context: GenerationContext): StageResult {
    const pages = new PageBuilder().build(context);
    const artifacts = pages.flatMap((page) => [
      artifact('page', page.file.path, this.id),
      artifact('route', page.route.path, this.id),
    ]);
    return result(this, {
      files: pages.map((page) => page.file),
      artifacts,
      summary: `Pages composed from the blueprint (${pages.length}).`,
    });
  }
}

const SEO_KIND: Readonly<Record<string, ArtifactKind>> = {
  'public/schema.json': 'schema',
  'lib/seo/jsonld.ts': 'metadata',
  'app/opengraph-image.tsx': 'image',
};

/** Stage 5 — SEO: robots, sitemap, manifest, JSON-LD, OG image, AI/discovery files. */
export class SeoStage implements PipelineStage {
  readonly id = 'seo';
  readonly name = 'SEO Builder';
  run(context: GenerationContext): StageResult {
    const files = new SEOBuilder().build(context);
    return result(this, {
      files,
      artifacts: files.map((file) => artifact(SEO_KIND[file.path] ?? 'seo', file.path, this.id)),
      summary: `SEO and discovery artifacts (${files.length}).`,
    });
  }
}

/** Stage 6 — Content: typed content modules the pages import. */
export class ContentStage implements PipelineStage {
  readonly id = 'content';
  readonly name = 'Content Builder';
  run(context: GenerationContext): StageResult {
    const files = new ContentBuilder().build(context);
    return result(this, {
      files,
      artifacts: files.map((file) => artifact('content', file.path, this.id)),
      summary: `Content modules (${files.length}).`,
    });
  }
}

/** Stage 7 — Asset: Higgsfield image prompts and the asset manifest. */
export class AssetStage implements PipelineStage {
  readonly id = 'asset';
  readonly name = 'Asset Builder';
  run(context: GenerationContext): StageResult {
    const builder = new AssetBuilder();
    const files = builder.build(context);
    const images = builder.specs(context).map((spec) => artifact('image', spec.target, this.id));
    return result(this, {
      files,
      artifacts: [...files.map((file) => artifact('asset', file.path, this.id)), ...images],
      summary: `Image prompts and manifest (${images.length} images planned).`,
    });
  }
}

/** Stage 8 — Validation: accessibility, SEO, imports, routes, metadata, design tokens. */
export class ValidationStage implements PipelineStage {
  readonly id = 'validation';
  readonly name = 'Validation';
  run(context: GenerationContext): StageResult {
    const report = new GenerationValidator().validate(context);
    const errors = report.issues.filter((i) => i.severity === 'error').length;
    return result(this, {
      issues: report.issues,
      summary: report.ok ? 'Validation passed.' : `Validation found ${errors} error(s).`,
    });
  }
}

/** Stage 9 — Review: consistency, duplicate components, design integrity, architecture. */
export class ReviewStage implements PipelineStage {
  readonly id = 'review';
  readonly name = 'Review';
  run(context: GenerationContext): StageResult {
    const report = new QualityReviewer().review(context);
    return result(this, {
      issues: report.issues,
      summary: report.ok ? 'Review passed.' : `Review raised ${report.issues.length} item(s).`,
    });
  }
}

/** Stage 10 — Repair: safe, deterministic fixes (formatting, missing metadata). */
export class RepairStage implements PipelineStage {
  readonly id = 'repair';
  readonly name = 'Repair';
  run(context: GenerationContext): StageResult {
    const repair = new RepairEngine().repair(context);
    return result(this, {
      files: repair.files,
      issues: repair.fixes,
      summary: `Applied ${repair.fixes.length} fix(es) across ${repair.files.length} file(s).`,
    });
  }
}

/** Stage 11 — Export: the final generation report (JSON + Markdown). */
export class ExportStage implements PipelineStage {
  readonly id = 'export';
  readonly name = 'Export';
  run(context: GenerationContext): StageResult {
    const reporter = new ExportReporter();
    const files = reporter.files(reporter.buildReport(context));
    return result(this, {
      files,
      artifacts: files.map((file) => artifact('report', file.path, this.id)),
      summary: 'Generation report written.',
    });
  }
}

/** The eleven pipeline stages, in execution order. */
export function allStages(): readonly PipelineStage[] {
  return [
    new ArchitectureStage(),
    new LayoutStage(),
    new ComponentStage(),
    new PageStage(),
    new SeoStage(),
    new ContentStage(),
    new AssetStage(),
    new ValidationStage(),
    new ReviewStage(),
    new RepairStage(),
    new ExportStage(),
  ];
}
