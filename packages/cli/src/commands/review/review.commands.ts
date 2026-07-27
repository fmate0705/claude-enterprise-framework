import { resolve } from 'node:path';
import { cefError, err, isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import {
  APPROVALS_PATH,
  ApprovalEngine,
  AuditEngine,
  FEEDBACK_PATH,
  FeedbackManager,
  type ApprovalState,
  type FeedbackType,
  type GateResult,
  type ReviewResult,
} from '@cef/review';
import { SystemClock } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { loadApprovals, prepareReview, writeFiles } from './assembler.js';

const OPTIONS = [
  { flags: '--dir <path>', description: 'project directory (default: current directory)' },
  { flags: '--theme <id>', description: 'design theme id (default: base)' },
  { flags: '--url <url>', description: 'public base URL used during regeneration' },
];

function gateTable(gates: readonly GateResult[]): string {
  const mark: Record<string, string> = { pass: '✔', warn: '⚠', fail: '✖' };
  return gates
    .map(
      (g) =>
        `  ${mark[g.status]} ${g.name.padEnd(20)} ${g.status.padEnd(5)} ${String(g.score).padStart(3)}/100 ${g.required ? '' : '(advisory)'}`,
    )
    .join('\n');
}

/** `cef review` — run the full review and write the five report files. */
export class ReviewCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'review',
    description: 'Run the full quality review and write the review reports.',
    options: OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const prepared = await prepareReview(input);
    if (isErr(prepared)) {
      return prepared;
    }
    const { root, engine, input: reviewInput, approvalState } = prepared.value;
    const result = engine.review(reviewInput, approvalState);
    await writeFiles(root, engine.reportFiles(result));
    return ok({
      message: [
        `Review — ${result.projectName} (${result.approvalState})`,
        gateTable(result.gates),
        `Overall ${result.score.overall}/100 · Readiness ${result.score.readiness}/100 · ${result.score.recommendation.toUpperCase()}`,
        `✔ Wrote reports to .cef/reports/. Generation does not imply approval.`,
      ].join('\n'),
    });
  }
}

/** `cef qa` — run the quality gates and fail if any required gate fails. */
export class QaCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'qa',
    description: 'Run the quality gates and report pass/fail.',
    options: OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const prepared = await prepareReview(input);
    if (isErr(prepared)) {
      return prepared;
    }
    const result = prepared.value.engine.review(prepared.value.input, prepared.value.approvalState);
    const failed = result.gates.filter((g) => g.required && g.status === 'fail');
    if (failed.length > 0) {
      return err(
        cefError(
          'QA_FAILED',
          `QA failed — ${failed.map((g) => g.name).join(', ')}:\n${gateTable(result.gates)}`,
        ),
      );
    }
    return ok({
      message: `QA passed (with ${countWarns(result)} warning(s)):\n${gateTable(result.gates)}`,
    });
  }
}

/** `cef audit` — run the structural gates (architecture, docker, testing, documentation). */
export class AuditCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'audit',
    description: 'Audit project structure (architecture, docker, testing, documentation).',
    options: OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const prepared = await prepareReview(input);
    if (isErr(prepared)) {
      return prepared;
    }
    const gates = new AuditEngine().audit(prepared.value.input);
    return ok({ message: `Structural audit:\n${gateTable(gates)}` });
  }
}

/** `cef score` — compute and display the quality scores. */
export class ScoreCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'score',
    description: 'Compute the overall quality and readiness scores.',
    options: OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const prepared = await prepareReview(input);
    if (isErr(prepared)) {
      return prepared;
    }
    const result = prepared.value.engine.review(prepared.value.input, prepared.value.approvalState);
    if (input.options['json'] === true) {
      return ok({ message: JSON.stringify(result.score, null, 2) });
    }
    const rows = Object.entries(result.score.byGate)
      .map(([gate, score]) => `  ${gate.padEnd(16)} ${score}/100`)
      .join('\n');
    return ok({
      message: [
        `Scores — ${result.projectName}`,
        rows,
        `Overall ${result.score.overall}/100 · Readiness ${result.score.readiness}/100`,
        `Recommendation: ${result.score.recommendation.toUpperCase()}`,
      ].join('\n'),
    });
  }
}

/** `cef release-check` — determine whether the project may be released. */
export class ReleaseCheckCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'release-check',
    description: 'Check whether the project is ready for production release.',
    options: OPTIONS,
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const prepared = await prepareReview(input);
    if (isErr(prepared)) {
      return prepared;
    }
    const result = prepared.value.engine.review(prepared.value.input, prepared.value.approvalState);
    if (result.release.ready) {
      return ok({ message: '✔ Release ready — all required gates pass and approval is recorded.' });
    }
    return err(
      cefError(
        'NOT_RELEASE_READY',
        `Not release ready:\n${result.release.blockers.map((b) => `  ✖ ${b}`).join('\n')}`,
        {
          hint: 'Resolve blockers, then run "cef approve --by <name>".',
        },
      ),
    );
  }
}

/** `cef approve` — advance the human-in-the-loop approval workflow (never automatic). */
export class ApproveCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'approve',
    description: 'Advance the approval workflow (requires --by for approval/release).',
    options: [
      ...OPTIONS,
      { flags: '--by <name>', description: 'the human approving this step' },
      { flags: '--to <state>', description: 'target state (default: next forward state)' },
      { flags: '--note <text>', description: 'an approval note' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const prepared = await prepareReview(input);
    if (isErr(prepared)) {
      return prepared;
    }
    const { root, engine, input: reviewInput, approvalState } = prepared.value;
    const result = engine.review(reviewInput, approvalState);
    const qaPassed = engine.qaPassed(result.gates);

    const approvalEngine = new ApprovalEngine();
    const to = this.targetState(input, approvalEngine, approvalState);
    if (!to) {
      return err(cefError('NO_NEXT_STATE', `No forward transition from "${approvalState}".`));
    }
    const actor = typeof input.options['by'] === 'string' ? input.options['by'] : undefined;
    const advanced = approvalEngine.advance(approvalState, to, { qaPassed, actor });
    if (isErr(advanced)) {
      return advanced;
    }

    const log = await loadApprovals(root);
    const manager = new FeedbackManager();
    const updated = manager.recordApproval(log, {
      state: advanced.value,
      actor: actor ?? 'system',
      at: new SystemClock().now().toISOString(),
      note: typeof input.options['note'] === 'string' ? input.options['note'] : undefined,
    });
    await writeFiles(root, [
      { path: APPROVALS_PATH, content: manager.serializeApprovals(updated) },
    ]);

    return ok({
      message: `✔ Approval advanced: ${approvalState} → ${advanced.value} (by ${actor ?? 'system'}).`,
    });
  }

  private targetState(
    input: CommandInput,
    engine: ApprovalEngine,
    from: ApprovalState,
  ): ApprovalState | undefined {
    if (typeof input.options['to'] === 'string') {
      return input.options['to'] as ApprovalState;
    }
    const options = engine.options(from).filter((state) => state !== 'revision-requested');
    return options[0];
  }
}

/** `cef feedback` — record a client feedback entry (immutable, append-only). */
export class FeedbackCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'feedback',
    description: 'Record client feedback (comment | change-request | accepted | rejected).',
    arguments: [{ name: '<comment>', description: 'the feedback text' }],
    options: [
      { flags: '--dir <path>', description: 'project directory (default: current directory)' },
      { flags: '--by <name>', description: 'the author of the feedback' },
      { flags: '--type <type>', description: 'comment | change-request | accepted | rejected' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const comment = input.args[0];
    if (comment === undefined) {
      return err(
        cefError('INVALID_INPUT', 'Provide the feedback comment.', {
          hint: 'cef feedback "…" --by <name>',
        }),
      );
    }
    const root =
      typeof input.options['dir'] === 'string' ? resolve(input.options['dir']) : process.cwd();
    const manager = new FeedbackManager();
    const { loadFeedback } = await import('./assembler.js');
    const log = await loadFeedback(root);
    const updated = manager.addFeedback(log, {
      author: typeof input.options['by'] === 'string' ? input.options['by'] : 'client',
      type: this.feedbackType(input.options['type']),
      comment,
      at: new SystemClock().now().toISOString(),
    });
    await writeFiles(root, [
      {
        path: FEEDBACK_PATH.replace('feedback.md', 'feedback.json'),
        content: manager.serializeFeedback(updated),
      },
      { path: FEEDBACK_PATH, content: manager.renderFeedback(updated) },
    ]);
    return ok({ message: `✔ Recorded feedback (${updated.entries.length} total).` });
  }

  private feedbackType(value: unknown): FeedbackType {
    return value === 'change-request' || value === 'accepted' || value === 'rejected'
      ? value
      : 'comment';
  }
}

function countWarns(result: ReviewResult): number {
  return result.gates.filter((g) => g.status === 'warn').length;
}
