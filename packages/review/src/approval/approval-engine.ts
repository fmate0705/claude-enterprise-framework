import { cefError, err, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import { nextStates, transitionFor, type ApprovalState } from '../workflows/approval-workflow.js';

export interface TransitionContext {
  /** Whether the QA required gates currently pass. */
  readonly qaPassed: boolean;
  /** The human authorizing the transition, if any. Required for approval and release. */
  readonly actor: string | undefined;
}

/**
 * Drives the approval state machine. It only advances when explicitly asked, and it refuses any
 * transition whose guards are unmet — QA must pass to reach `qa-passed`, and a human actor must be
 * named to reach `approved` or `released`. Nothing here ever auto-approves a production release.
 */
export class ApprovalEngine {
  /** The states reachable from the current one. */
  options(from: ApprovalState): readonly ApprovalState[] {
    return nextStates(from);
  }

  advance(
    from: ApprovalState,
    to: ApprovalState,
    context: TransitionContext,
  ): Result<ApprovalState, CefError> {
    const transition = transitionFor(from, to);
    if (!transition) {
      return err(
        cefError('INVALID_TRANSITION', `Cannot move from "${from}" to "${to}".`, {
          hint: `Allowed next states: ${nextStates(from).join(', ') || 'none'}.`,
        }),
      );
    }
    if (transition.requiresQaPassed && !context.qaPassed) {
      return err(
        cefError('QA_NOT_PASSED', `"${to}" requires the QA gates to pass first.`, {
          hint: 'Run "cef qa" and resolve failing required gates.',
        }),
      );
    }
    if (transition.requiresHuman && (context.actor === undefined || context.actor.trim() === '')) {
      return err(
        cefError('HUMAN_REQUIRED', `"${to}" requires a human approver.`, {
          hint: 'Pass --by <name> to record who approved; releases are never automatic.',
        }),
      );
    }
    return ok(to);
  }
}
