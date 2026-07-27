import type { GeneratedFile } from '@cef/core';
import type { ProjectInput } from '../input.js';
import { BlueprintSerializer } from '../serialization/index.js';
import type { ValidationReport } from '../types/index.js';
import { BlueprintValidator } from '../validation/index.js';
import type { Blueprint } from './blueprint.js';
import { BlueprintGenerator } from './blueprint-generator.js';

/**
 * The Project Intelligence Engine facade — the single entry the CLI depends on. It generates a
 * blueprint from a project input, serializes it to the `.cef/generated/` files, and validates it.
 * It composes the generator, serializer, and validator; it holds no planning logic itself and,
 * per the specification, never generates code or UI.
 */
export class ProjectIntelligenceEngine {
  constructor(
    private readonly generator = new BlueprintGenerator(),
    private readonly serializer = new BlueprintSerializer(),
    private readonly validator = new BlueprintValidator(),
  ) {}

  /** Produces the complete implementation blueprint. `generatedAt` is injected for determinism. */
  generate(input: ProjectInput, generatedAt: string = new Date().toISOString()): Blueprint {
    return this.generator.generate(input, generatedAt);
  }

  /** Serializes a blueprint into the seven machine- and human-readable output files. */
  serialize(blueprint: Blueprint): readonly GeneratedFile[] {
    return this.serializer.serialize(blueprint);
  }

  validate(blueprint: Blueprint): ValidationReport {
    return this.validator.validate(blueprint);
  }
}
