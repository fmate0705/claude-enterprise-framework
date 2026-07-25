import { cefError, err, ErrorCode, isErr, ok } from '@cef/core';
import type { GenerationPlan, GenerationResult, Ports, ProjectSpec, Result } from '@cef/core';
import type { TemplateContext } from './context.js';
import { deriveCapabilities } from './factory.js';
import { PlanBuilder } from './plan-builder.js';
import { validateSpec, validateTarget } from './validation.js';
import { writePlan } from './writer.js';

export interface GenerateOptions {
  readonly root: string;
  readonly cefVersion: string;
}

/**
 * Generation Layer orchestrator (`ARCHITECTURE.md` §11). Composes the factory, builder,
 * validation, and filesystem layers behind one entry point, injected with {@link Ports}.
 */
export class ProjectGenerator {
  constructor(private readonly ports: Ports) {}

  /** Pure planning: validate the spec, derive capabilities, and assemble the plan. */
  buildPlan(spec: ProjectSpec, options: GenerateOptions): Result<GenerationPlan> {
    const validated = validateSpec(spec);
    if (isErr(validated)) {
      return validated;
    }
    const context: TemplateContext = {
      spec: validated.value,
      capabilities: deriveCapabilities(validated.value),
      cefVersion: options.cefVersion,
      createdAt: this.ports.clock.now().toISOString(),
    };
    return ok(new PlanBuilder(options.root, context).build());
  }

  /** Full generation: plan, verify the target, write, then optionally initialize git. */
  async generate(spec: ProjectSpec, options: GenerateOptions): Promise<Result<GenerationResult>> {
    const planned = this.buildPlan(spec, options);
    if (isErr(planned)) {
      return planned;
    }
    const plan = planned.value;

    const target = await validateTarget(this.ports.fs, plan.root);
    if (isErr(target)) {
      return target;
    }

    const written = await writePlan(this.ports.fs, plan);
    if (isErr(written)) {
      return written;
    }

    let gitInitialized = false;
    if (plan.initGit) {
      const git = await this.initGit(plan.root);
      if (isErr(git)) {
        this.ports.logger.warn(`Git initialization skipped: ${git.error.message}`);
      } else {
        gitInitialized = true;
      }
    }

    return ok({
      root: plan.root,
      directoriesCreated: written.value.directoriesCreated,
      filesWritten: written.value.filesWritten,
      gitInitialized,
    });
  }

  private async initGit(root: string): Promise<Result<void>> {
    if (!(await this.ports.git.isAvailable())) {
      return err(cefError(ErrorCode.GitUnavailable, 'git is not available on PATH.'));
    }
    try {
      await this.ports.git.init(root);
      await this.ports.git.add(root, '.');
      await this.ports.git.commit(root, 'chore: initial commit (scaffolded by CEF)');
      return ok(undefined);
    } catch (cause) {
      return err(
        cefError(ErrorCode.GitFailed, 'git commit failed (is git configured?).', { cause }),
      );
    }
  }
}
