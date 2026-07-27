import type { GeneratedFile } from '@cef/core';
import type { ReviewResult } from '../models/review-result.js';
import {
  ISSUES_PATH,
  QUALITY_SCORE_PATH,
  RECOMMENDATIONS_PATH,
  RELEASE_CHECKLIST_PATH,
  REVIEW_REPORT_PATH,
} from '../paths.js';
import type { Finding, GateResult } from '../types/index.js';

const MARK: Readonly<Record<string, string>> = { pass: '✔', warn: '⚠', fail: '✖' };

/**
 * Generates the five review reports — a human-readable review, the quality score, the raw issues,
 * the recommendations, and the release checklist. Rendering is deterministic; the same review
 * always produces the same reports, which is what makes the reporting auditable.
 */
export class ReviewReportGenerator {
  generate(result: ReviewResult): readonly GeneratedFile[] {
    return [
      { path: REVIEW_REPORT_PATH, content: this.reviewReport(result) },
      { path: QUALITY_SCORE_PATH, content: this.qualityScore(result) },
      { path: ISSUES_PATH, content: this.issues(result) },
      { path: RECOMMENDATIONS_PATH, content: this.recommendations(result) },
      { path: RELEASE_CHECKLIST_PATH, content: this.releaseChecklist(result) },
    ];
  }

  private reviewReport(result: ReviewResult): string {
    const lines: string[] = [`# ${result.projectName} — Review Report`, ''];
    lines.push(`> Reviewed ${result.reviewedAt}. Generation does not imply approval.`, '');
    lines.push(
      `**Overall ${result.score.overall}/100 · Readiness ${result.score.readiness}/100 · ` +
        `Recommendation: ${result.score.recommendation.toUpperCase()}**`,
      '',
    );
    lines.push('## Quality gates', '');
    lines.push('| Gate | Required | Status | Score |', '| --- | --- | --- | --- |');
    for (const gate of result.gates) {
      lines.push(
        `| ${gate.name} | ${gate.required ? 'yes' : 'advisory'} | ${MARK[gate.status]} ${gate.status} | ${gate.score} |`,
      );
    }
    lines.push('', '## Findings', '');
    const findings = this.allFindings(result.gates);
    if (findings.length === 0) {
      lines.push('No findings.');
    }
    for (const item of findings) {
      lines.push(
        `- **[${item.severity}] ${item.gate}** — ${item.message}${item.file ? ` (${item.file})` : ''}`,
      );
    }
    lines.push('', `Approval state: **${result.approvalState}**.`);
    return `${lines.join('\n')}\n`;
  }

  private qualityScore(result: ReviewResult): string {
    return `${JSON.stringify(
      {
        projectName: result.projectName,
        reviewedAt: result.reviewedAt,
        overall: result.score.overall,
        readiness: result.score.readiness,
        recommendation: result.score.recommendation,
        requiredPassed: result.score.requiredPassed,
        byGate: result.score.byGate,
        gateStatus: Object.fromEntries(result.gates.map((gate) => [gate.gate, gate.status])),
      },
      null,
      2,
    )}\n`;
  }

  private issues(result: ReviewResult): string {
    return `${JSON.stringify({ issues: this.allFindings(result.gates) }, null, 2)}\n`;
  }

  private recommendations(result: ReviewResult): string {
    const lines: string[] = [`# ${result.projectName} — Recommendations`, ''];
    const withRecs = this.allFindings(result.gates).filter((f) => f.recommendation !== undefined);
    if (withRecs.length === 0) {
      lines.push('No outstanding recommendations.');
      return `${lines.join('\n')}\n`;
    }
    for (const gate of result.gates) {
      const recs = withRecs.filter((f) => f.gate === gate.gate);
      if (recs.length === 0) {
        continue;
      }
      lines.push(`## ${gate.name}`);
      for (const rec of recs) {
        lines.push(`- ${rec.recommendation} _(${rec.severity})_`);
      }
      lines.push('');
    }
    return `${lines.join('\n')}\n`;
  }

  private releaseChecklist(result: ReviewResult): string {
    const lines: string[] = [`# ${result.projectName} — Release Checklist`, ''];
    for (const gate of result.gates) {
      const box = gate.status === 'fail' ? ' ' : 'x';
      const tag = gate.required ? '' : ' _(advisory)_';
      lines.push(`- [${box}] ${gate.name}${tag} — ${gate.status} (${gate.score}/100)`);
    }
    lines.push(
      '',
      `- [${result.approvalState === 'draft' ? ' ' : 'x'}] Human review underway (${result.approvalState})`,
    );
    lines.push(`- [${result.release.ready ? 'x' : ' '}] Release ready`);
    if (result.release.blockers.length > 0) {
      lines.push('', '## Blockers');
      for (const blocker of result.release.blockers) {
        lines.push(`- ${blocker}`);
      }
    }
    return `${lines.join('\n')}\n`;
  }

  private allFindings(gates: readonly GateResult[]): readonly Finding[] {
    return gates.flatMap((gate) => gate.findings);
  }
}
