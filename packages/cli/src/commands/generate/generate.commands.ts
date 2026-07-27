import { cefError, err, isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import type { GenerationReport, GenerationSession } from '@cef/generator';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { prepareGeneration, writeGeneratedFiles } from './assembler.js';

const GEN_OPTIONS = [
  { flags: '--dir <path>', description: 'project directory (default: current directory)' },
  { flags: '--theme <id>', description: 'design theme id (default: base)' },
  { flags: '--url <url>', description: 'public base URL for canonical/sitemap/OG' },
];

/** target → stage id for partial generation. */
const STAGE_FOR: Readonly<Record<string, string>> = {
  pages: 'page',
  components: 'component',
  seo: 'seo',
  assets: 'asset',
};

function reportLines(report: GenerationReport): string {
  const errors = report.issues.filter((i) => i.severity === 'error').length;
  const warnings = report.issues.filter((i) => i.severity === 'warning').length;
  return [
    `Report: ${report.ok ? 'OK' : 'FAILED'} — ${report.totalFiles} files, ${report.totalArtifacts} artifacts`,
    `Issues: ${errors} error(s), ${warnings} warning(s)`,
  ].join('\n');
}

/** `cef generate [pages|components|seo|assets]` — run the pipeline and write the output. */
export class GenerateCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'generate',
    description: 'Generate the site from the blueprint (optionally a single part).',
    arguments: [
      { name: '[target]', description: 'pages | components | seo | assets (default: all)' },
    ],
    options: GEN_OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const prepared = await prepareGeneration(input);
    if (isErr(prepared)) {
      return prepared;
    }
    const { root, pipeline, context } = prepared.value;
    const session = pipeline.run(context);
    const target = input.args[0];

    if (target === undefined) {
      const count = await writeGeneratedFiles(root, session.files);
      return ok({
        message: [`✔ Generated ${count} files under ${root}.`, reportLines(session.report)].join(
          '\n',
        ),
      });
    }

    const stageId = STAGE_FOR[target];
    if (!stageId) {
      return err(
        cefError('INVALID_INPUT', `Unknown generate target "${target}".`, {
          hint: 'Use pages | components | seo | assets, or omit for all.',
        }),
      );
    }
    const stageResult = session.results.find((r) => r.stageId === stageId);
    const count = await writeGeneratedFiles(root, stageResult?.files ?? []);
    return ok({ message: `✔ Regenerated ${target}: wrote ${count} files.` });
  }
}

/** `cef validate` — regenerate and report the pipeline's validation and review findings. */
export class ValidateCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'validate',
    description: 'Validate the generated site (accessibility, SEO, imports, routes, design).',
    options: GEN_OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const prepared = await prepareGeneration(input);
    if (isErr(prepared)) {
      return prepared;
    }
    const session = prepared.value.pipeline.run(prepared.value.context);
    const findings = session.results
      .filter((r) => r.stageId === 'validation' || r.stageId === 'review')
      .flatMap((r) => r.issues);
    if (findings.length === 0) {
      return ok({ message: '✔ Validation passed — no issues found.' });
    }
    const lines = findings.map(
      (f) => `  ${f.severity === 'error' ? '✖' : '⚠'} ${f.message}${f.file ? ` (${f.file})` : ''}`,
    );
    if (findings.some((f) => f.severity === 'error')) {
      return err(cefError('VALIDATION_FAILED', `Validation failed:\n${lines.join('\n')}`));
    }
    return ok({ message: `Validation passed with warnings:\n${lines.join('\n')}` });
  }
}

/** `cef repair` — apply the pipeline's automatic repairs and write the fixed files. */
export class RepairCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'repair',
    description: 'Apply automatic repairs (formatting, missing metadata) to the generated site.',
    options: GEN_OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const prepared = await prepareGeneration(input);
    if (isErr(prepared)) {
      return prepared;
    }
    const { root, pipeline, context } = prepared.value;
    const session = pipeline.run(context);
    const repair = session.results.find((r) => r.stageId === 'repair');
    const count = await writeGeneratedFiles(root, repair?.files ?? []);
    return ok({
      message: `✔ Repair complete — ${repair?.issues.length ?? 0} fix(es) across ${count} file(s).`,
    });
  }
}

/** `cef export` — write the final generation report. */
export class ExportCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'export',
    description: 'Generate the final report for the generated site.',
    options: GEN_OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const prepared = await prepareGeneration(input);
    if (isErr(prepared)) {
      return prepared;
    }
    const { root, pipeline, context } = prepared.value;
    const session: GenerationSession = pipeline.run(context);
    const exportStage = session.results.find((r) => r.stageId === 'export');
    await writeGeneratedFiles(root, exportStage?.files ?? []);
    return ok({
      message: [
        '✔ Wrote .cef/generated/generation-report.{json,md}.',
        reportLines(session.report),
      ].join('\n'),
    });
  }
}
