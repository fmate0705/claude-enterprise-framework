import type { GeneratedFile } from '@cef/core';
import type { GenerationContext } from '../models/index.js';

export interface ImageSpec {
  readonly id: string;
  readonly kind: 'hero' | 'illustration' | 'product' | 'background' | 'marketing';
  /** Where the generated image should be written. */
  readonly target: string;
  /** The Higgsfield prompt, stored alongside the target so it can be regenerated. */
  readonly prompt: string;
  readonly alt: string;
}

/**
 * Stage 7 builder. Resolves the project's imagery as Higgsfield prompts rather than binary files —
 * deterministic prompts derived from the industry, positioning, and brand color, each paired with
 * its target path and alt text. The Higgsfield MCP consumes `prompts.json` to generate and cache
 * the actual images; the prompt is stored beside every image so it can always be regenerated.
 */
export class AssetBuilder {
  build(context: GenerationContext): readonly GeneratedFile[] {
    const specs = this.specs(context);
    return [
      { path: '.cef/assets/prompts.json', content: this.prompts(context, specs) },
      { path: 'public/images/README.md', content: this.readme(specs) },
    ];
  }

  /** The image specifications for the project, for the artifact registry and Higgsfield. */
  specs(context: GenerationContext): readonly ImageSpec[] {
    const industry = context.blueprint.business.industryName.toLowerCase();
    const color = context.theme.light.primary;
    const tone =
      context.blueprint.business.complexity === 'high' ? 'precise, technical' : 'warm, human';
    const style = `Professional ${tone} style, on-brand, accent color ${color}, no text, high resolution.`;

    return [
      {
        id: 'hero',
        kind: 'hero',
        target: 'public/images/hero.avif',
        prompt: `Hero image for a ${industry} website. ${style}`,
        alt: `${context.options.projectName} hero image`,
      },
      {
        id: 'background',
        kind: 'background',
        target: 'public/images/background.avif',
        prompt: `Subtle abstract background suited to a ${industry} brand. ${style}`,
        alt: '',
      },
      {
        id: 'illustration',
        kind: 'illustration',
        target: 'public/images/illustration.avif',
        prompt: `Brand illustration representing ${industry} services. ${style}`,
        alt: `${industry} illustration`,
      },
      {
        id: 'marketing',
        kind: 'marketing',
        target: 'public/images/marketing.avif',
        prompt: `Marketing visual for ${context.options.projectName}, a ${industry} brand. ${style}`,
        alt: `${context.options.projectName} marketing visual`,
      },
    ];
  }

  private prompts(context: GenerationContext, specs: readonly ImageSpec[]): string {
    return `${JSON.stringify(
      {
        tool: 'higgsfield',
        generatedAt: context.options.generatedAt,
        note: 'Run these prompts through the Higgsfield MCP to generate and cache the images.',
        images: specs,
      },
      null,
      2,
    )}\n`;
  }

  private readme(specs: readonly ImageSpec[]): string {
    const rows = specs.map((spec) => `- \`${spec.target}\` — ${spec.kind}: ${spec.prompt}`);
    return [
      '# Images',
      '',
      'These assets are generated from `.cef/assets/prompts.json` via the Higgsfield MCP.',
      'Each prompt is stored so an image can always be regenerated deterministically.',
      '',
      ...rows,
      '',
    ].join('\n');
  }
}
