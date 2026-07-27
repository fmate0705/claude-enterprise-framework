import { dirname, resolve } from 'node:path';
import { isErr, ok } from '@cef/core';
import type { CefError, GeneratedFile, Result } from '@cef/core';
import type { Blueprint } from '@cef/intelligence';
import { NodeFileSystem } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { intelligenceRoot } from './assembler.js';
import { generateBlueprint } from './support.js';

const DIR_OPTION = {
  flags: '--dir <path>',
  description: 'project directory (default: current directory)',
};
const INPUT_OPTIONS = [
  DIR_OPTION,
  { flags: '--description <text>', description: 'override the project description' },
  { flags: '--country <code>', description: 'override the target country (e.g. HU)' },
  { flags: '--language <code>', description: 'override the target language' },
  { flags: '--budget <level>', description: 'lean | standard | premium' },
  { flags: '--timeline <level>', description: 'rush | normal | flexible' },
];

async function writeFiles(root: string, files: readonly GeneratedFile[]): Promise<void> {
  const fs = new NodeFileSystem();
  for (const file of files) {
    const outputPath = resolve(root, file.path);
    await fs.mkdir(dirname(outputPath));
    await fs.writeFile(outputPath, file.content);
  }
}

/** `cef analyze` — analyze the project and print the business, industry, and audience summary. */
export class AnalyzeCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'analyze',
    description: 'Analyze the project (industry, business, audience) without writing files.',
    options: INPUT_OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await generateBlueprint(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const b = loaded.value.blueprint;
    return ok({
      message: [
        `Analysis — ${b.input.projectName}`,
        `Industry:        ${b.business.industryName} (${b.industry.id}, score ${b.industry.score})`,
        `Business model:  ${b.business.businessModel}`,
        `Complexity:      ${b.business.complexity}`,
        `Positioning:     ${b.business.positioning}`,
        `Conversions:     ${b.business.conversions.join(', ')}`,
        `Trust signals:   ${b.business.trustSignals.join(', ')}`,
        '',
        `Audience:        ${b.audience.personas.map((p) => p.name).join(' · ')}`,
        `Devices:         ${b.audience.devices.join(', ')}`,
        `Localization:    ${b.audience.localization.requirements.join('; ')}`,
        '',
        `Planned:         ${b.pages.length} pages · ${b.features.features.length} features · ${b.integrations.length} integrations`,
        `Risks:           ${b.risks.length > 0 ? b.risks.map((r) => r.id).join(', ') : 'none'}`,
      ].join('\n'),
    });
  }
}

/** `cef blueprint` — generate the full implementation blueprint and write the seven output files. */
export class BlueprintCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'blueprint',
    description: 'Generate the implementation blueprint into .cef/generated/.',
    options: [
      ...INPUT_OPTIONS,
      { flags: '--print', description: 'print blueprint.json instead of writing' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await generateBlueprint(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const { engine, blueprint } = loaded.value;
    const files = engine.serialize(blueprint);

    if (input.options['print'] === true) {
      const json = files.find((file) => file.path.endsWith('blueprint.json'));
      return ok({ message: json?.content ?? '' });
    }

    await writeFiles(intelligenceRoot(input), files);
    const report = engine.validate(blueprint);
    const validation = report.ok
      ? 'Blueprint validation: passed.'
      : `Blueprint validation: ${report.issues.filter((i) => i.severity === 'error').length} error(s).`;
    return ok({
      message: [
        `✔ Wrote ${files.length} blueprint files:`,
        ...files.map((file) => `  ${file.path}`),
        '',
        validation,
      ].join('\n'),
    });
  }
}

/** `cef pages` — display the planned pages. */
export class PagesCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'pages',
    description: 'Display the planned pages and why each exists.',
    options: [...INPUT_OPTIONS, { flags: '--json', description: 'machine-readable JSON output' }],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await generateBlueprint(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const { pages } = loaded.value.blueprint;
    if (input.options['json'] === true) {
      return ok({ message: JSON.stringify({ pages }, null, 2) });
    }
    const rows = pages.map(
      (page) =>
        `  ${page.id.padEnd(16)} ${page.priority.padEnd(9)} seo:${page.seoImportance.padEnd(7)} ${page.purpose}`,
    );
    return ok({ message: `Pages (${pages.length}):\n${rows.join('\n')}` });
  }
}

/** `cef features` — display the feature matrix. */
export class FeaturesCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'features',
    description: 'Display the feature matrix with priority, complexity, and dependencies.',
    options: [...INPUT_OPTIONS, { flags: '--json', description: 'machine-readable JSON output' }],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await generateBlueprint(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const matrix = loaded.value.blueprint.features;
    if (input.options['json'] === true) {
      return ok({ message: JSON.stringify(matrix, null, 2) });
    }
    const rows = matrix.features.map(
      (feature) =>
        `  ${feature.id.padEnd(16)} ${feature.priority.padEnd(9)} ${feature.complexity.padEnd(7)} deps:${
          feature.dependencies.length > 0 ? feature.dependencies.join(',') : '—'
        }`,
    );
    return ok({ message: `Features (${matrix.features.length}):\n${rows.join('\n')}` });
  }
}

/** `cef seo` — display the SEO strategy. */
export class SeoCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'seo',
    description: 'Display the SEO strategy (keywords, clusters, schema).',
    options: INPUT_OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await generateBlueprint(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const seo = loaded.value.blueprint.seo;
    return ok({
      message: [
        'SEO strategy',
        `Primary keywords:   ${seo.primaryKeywords.join(', ')}`,
        `Secondary keywords: ${seo.secondaryKeywords.join(', ')}`,
        `Content clusters:   ${seo.contentClusters.map((c) => c.pillar).join(', ')}`,
        `Schema:             ${seo.schemaRecommendations.map((s) => `${s.page}:${s.schemaType}`).join(', ')}`,
        `Canonical:          ${seo.canonicalStrategy}`,
        `Meta:               ${seo.metaStrategy}`,
      ].join('\n'),
    });
  }
}

/** `cef audience` — display the target audience analysis. */
export class AudienceCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'audience',
    description: 'Display the target audience personas and expectations.',
    options: INPUT_OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await generateBlueprint(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const audience = loaded.value.blueprint.audience;
    const personas = audience.personas
      .map(
        (p) =>
          `  ${p.name}: ${p.description}\n    goals: ${p.goals.join(', ')}\n    pains: ${p.painPoints.join(', ')}`,
      )
      .join('\n');
    return ok({
      message: [
        'Audience',
        personas,
        '',
        `Devices:        ${audience.devices.join(', ')}`,
        `Accessibility:  ${audience.accessibilityExpectations.join('; ')}`,
        `Localization:   ${audience.localization.requirements.join('; ')}`,
      ].join('\n'),
    });
  }
}

/** Renders an implementation roadmap markdown from a blueprint (pages then features, by priority). */
export function renderBlueprintRoadmap(blueprint: Blueprint): string {
  const lines: string[] = [`# ${blueprint.input.projectName} — Implementation Roadmap`, ''];
  lines.push(`> Generated from the blueprint ${blueprint.generatedAt}.`, '');
  lines.push('## Pages');
  for (const page of blueprint.pages) {
    lines.push(`- [ ] **${page.name}** (${page.priority}) — ${page.purpose}`);
  }
  lines.push('', '## Features');
  for (const feature of blueprint.features.features) {
    lines.push(`- [ ] **${feature.name}** (${feature.priority}, ${feature.complexity})`);
  }
  lines.push('', '## Integrations');
  for (const integration of blueprint.integrations) {
    lines.push(`- [ ] ${integration.name} — ${integration.provider}`);
  }
  return `${lines.join('\n')}\n`;
}
