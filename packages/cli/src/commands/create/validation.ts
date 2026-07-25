import { cefError, err, ErrorCode, ok } from '@cef/core';
import type { FileSystem, ProjectSpec, Result } from '@cef/core';
import { projectSpecSchema } from './spec-schema.js';

/** Validation Layer: validates a resolved spec against the schema (`ARCHITECTURE.md` §11). */
export function validateSpec(spec: ProjectSpec): Result<ProjectSpec> {
  const parsed = projectSpecSchema.safeParse(spec);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const message = issue
      ? `${issue.path.join('.') || 'spec'}: ${issue.message}`
      : 'Invalid project specification.';
    return err(cefError(ErrorCode.InvalidInput, message));
  }
  return ok(parsed.data as ProjectSpec);
}

/** Ensures the target directory does not already contain a project. */
export async function validateTarget(fs: FileSystem, root: string): Promise<Result<void>> {
  if (!(await fs.exists(root))) {
    return ok(undefined);
  }
  if (!(await fs.isDirectory(root))) {
    return err(
      cefError(ErrorCode.TargetNotEmpty, `A file already exists at ${root}.`, {
        hint: 'Choose a different project name or target directory.',
      }),
    );
  }
  const entries = await fs.readdir(root);
  const meaningful = entries.filter((entry) => entry !== '.git' && entry !== '.DS_Store');
  if (meaningful.length > 0) {
    return err(
      cefError(ErrorCode.TargetNotEmpty, `Directory ${root} is not empty.`, {
        hint: 'Choose a new project name or an empty directory.',
      }),
    );
  }
  return ok(undefined);
}
