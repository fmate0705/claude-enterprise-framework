import { dirname, join } from 'node:path';
import { cefError, err, ok } from '@cef/core';
import type { ErrorCode as ErrorCodeType, FileSystem, GenerationPlan, Result } from '@cef/core';
import { ErrorCode } from '@cef/core';

export interface WriteOutcome {
  readonly directoriesCreated: number;
  readonly filesWritten: number;
}

/**
 * Filesystem Layer: materializes a {@link GenerationPlan} on disk (`ARCHITECTURE.md` §11).
 * The target is validated empty beforehand, so a write only ever creates fresh files; a
 * failure is surfaced as a `WRITE_FAILED` error rather than thrown.
 */
export async function writePlan(
  fs: FileSystem,
  plan: GenerationPlan,
): Promise<Result<WriteOutcome>> {
  try {
    await fs.mkdir(plan.root);
    for (const directory of plan.directories) {
      await fs.mkdir(join(plan.root, directory));
    }
    for (const file of plan.files) {
      const absolute = join(plan.root, file.path);
      await fs.mkdir(dirname(absolute));
      await fs.writeFile(absolute, file.content);
    }
    return ok({ directoriesCreated: plan.directories.length, filesWritten: plan.files.length });
  } catch (cause) {
    const code: ErrorCodeType = ErrorCode.WriteFailed;
    return err(
      cefError(code, 'Failed to write the project files.', {
        cause,
        hint: 'Check filesystem permissions and available space.',
      }),
    );
  }
}
