import type { GeneratedFile } from '@cef/core';
import type {
  Artifact,
  GenerationContext,
  GenerationReport,
  StageIssue,
  StageResult,
  StageState,
} from '../models/index.js';

export const REPORT_JSON_PATH = '.cef/generated/generation-report.json';
export const REPORT_MD_PATH = '.cef/generated/generation-report.md';

/**
 * Assembles the final generation report from the accumulated stage results and artifacts, and
 * renders it to JSON and Markdown. Used by the Export stage to write the report files and by the
 * runner to build the session's in-memory report — one source, two consumers.
 */
export class ExportReporter {
  buildReport(context: GenerationContext): GenerationReport {
    const stages: StageState[] = context.results.map((result) => this.state(result));
    const issues: StageIssue[] = context.results.flatMap((result) => result.issues);
    return {
      projectName: context.options.projectName,
      generatedAt: context.options.generatedAt,
      ok: issues.every((i) => i.severity !== 'error'),
      totalFiles: context.files.size,
      totalArtifacts: context.artifacts.length,
      stages,
      artifactsByKind: this.byKind(context.artifacts),
      issues,
    };
  }

  files(report: GenerationReport): readonly GeneratedFile[] {
    return [
      { path: REPORT_JSON_PATH, content: `${JSON.stringify(report, null, 2)}\n` },
      { path: REPORT_MD_PATH, content: this.markdown(report) },
    ];
  }

  private state(result: StageResult): StageState {
    return {
      stageId: result.stageId,
      stageName: result.stageName,
      status: result.status,
      summary: result.summary,
      fileCount: result.files.length,
      issueCount: result.issues.length,
    };
  }

  private byKind(artifacts: readonly Artifact[]): Readonly<Record<string, number>> {
    const counts: Record<string, number> = {};
    for (const artifact of artifacts) {
      counts[artifact.kind] = (counts[artifact.kind] ?? 0) + 1;
    }
    return counts;
  }

  private markdown(report: GenerationReport): string {
    const lines: string[] = [`# ${report.projectName} — Generation Report`, ''];
    lines.push(`> Generated ${report.generatedAt}. Status: ${report.ok ? 'OK' : 'FAILED'}.`, '');
    lines.push(`Total files: ${report.totalFiles} · Total artifacts: ${report.totalArtifacts}`, '');
    lines.push('## Stages');
    for (const stage of report.stages) {
      lines.push(
        `- **${stage.stageName}** — ${stage.status} (${stage.fileCount} files) — ${stage.summary}`,
      );
    }
    lines.push('', '## Artifacts by kind');
    for (const [kind, count] of Object.entries(report.artifactsByKind).sort()) {
      lines.push(`- ${kind}: ${count}`);
    }
    if (report.issues.length > 0) {
      lines.push('', '## Issues');
      for (const finding of report.issues) {
        lines.push(
          `- ${finding.severity}: ${finding.message}${finding.file ? ` (${finding.file})` : ''}`,
        );
      }
    }
    return `${lines.join('\n')}\n`;
  }
}
