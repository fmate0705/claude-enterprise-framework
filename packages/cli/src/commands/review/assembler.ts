import { dirname, resolve } from 'node:path';
import { isErr, ok } from '@cef/core';
import type { CefError, GeneratedFile, Result } from '@cef/core';
import { DesignEngine } from '@cef/design-system';
import { GenerationPipeline } from '@cef/generator';
import { ProjectIntelligenceEngine } from '@cef/intelligence';
import {
  APPROVALS_PATH,
  EMPTY_APPROVALS,
  EMPTY_FEEDBACK,
  EMPTY_HISTORY,
  FEEDBACK_PATH,
  REVISION_HISTORY_PATH,
  ReviewEngine,
  type ApprovalLog,
  type ApprovalState,
  type FeedbackLog,
  type ReviewInput,
  type ReviewResult,
  type RevisionHistory,
} from '@cef/review';
import { NodeFileSystem, SystemClock } from '../../adapters.js';
import type { CommandInput } from '../command.js';
import { loadProjectInput } from '../intelligence/assembler.js';

export interface ReviewContext {
  readonly root: string;
  readonly input: ReviewInput;
  readonly engine: ReviewEngine;
  readonly approvalState: ApprovalState;
}

export function reviewRoot(input: CommandInput): string {
  return typeof input.options['dir'] === 'string' ? resolve(input.options['dir']) : process.cwd();
}

/** The persisted approval state, read from `.cef/client/approvals.json` (defaults to draft). */
async function readApprovalState(fs: NodeFileSystem, root: string): Promise<ApprovalState> {
  const path = resolve(root, APPROVALS_PATH);
  if (!(await fs.exists(path))) {
    return 'draft';
  }
  try {
    const log = JSON.parse(await fs.readFile(path)) as ApprovalLog;
    return log.records[log.records.length - 1]?.state ?? 'draft';
  } catch {
    return 'draft';
  }
}

/**
 * Regenerates the site deterministically from the project manifest and assembles the review input,
 * engine, and current approval state. Every review command starts here; regenerating (rather than
 * reading the working tree) keeps the review a pure function of the blueprint.
 */
export async function prepareReview(input: CommandInput): Promise<Result<ReviewContext, CefError>> {
  const loaded = await loadProjectInput(input);
  if (isErr(loaded)) {
    return loaded;
  }
  const projectInput = loaded.value;
  const generatedAt = new SystemClock().now().toISOString();
  const blueprint = new ProjectIntelligenceEngine().generate(projectInput, generatedAt);

  const design = new DesignEngine();
  const themeId = typeof input.options['theme'] === 'string' ? input.options['theme'] : 'base';
  const pipeline = new GenerationPipeline({ design });
  const context = pipeline.createContext(blueprint, {
    projectName: projectInput.projectName,
    framework: projectInput.framework,
    presetId: projectInput.designPreset,
    themeId,
    baseUrl:
      typeof input.options['url'] === 'string' ? input.options['url'] : 'https://example.com',
    generatedAt,
  });
  pipeline.run(context);

  const fs = new NodeFileSystem();
  const root = reviewRoot(input);
  const approvalState = await readApprovalState(fs, root);

  return ok({
    root,
    input: {
      projectName: projectInput.projectName,
      files: context.files,
      blueprint,
      tokens: context.tokens,
      theme: context.theme,
      reviewedAt: generatedAt,
    },
    engine: new ReviewEngine(),
    approvalState,
  });
}

/** Reads a JSON client-state file, returning the fallback on any error. */
export async function readJson<T>(root: string, path: string, fallback: T): Promise<T> {
  const fs = new NodeFileSystem();
  const abs = resolve(root, path);
  if (!(await fs.exists(abs))) {
    return fallback;
  }
  try {
    return JSON.parse(await fs.readFile(abs)) as T;
  } catch {
    return fallback;
  }
}

export function loadFeedback(root: string): Promise<FeedbackLog> {
  return readJson(root, FEEDBACK_PATH.replace('feedback.md', 'feedback.json'), EMPTY_FEEDBACK);
}
export function loadApprovals(root: string): Promise<ApprovalLog> {
  return readJson(root, APPROVALS_PATH, EMPTY_APPROVALS);
}
export function loadRevisions(root: string): Promise<RevisionHistory> {
  return readJson(root, REVISION_HISTORY_PATH, EMPTY_HISTORY);
}

export async function writeFiles(root: string, files: readonly GeneratedFile[]): Promise<void> {
  const fs = new NodeFileSystem();
  for (const file of files) {
    const outputPath = resolve(root, file.path);
    await fs.mkdir(dirname(outputPath));
    await fs.writeFile(outputPath, file.content);
  }
}

export type { ReviewResult };
