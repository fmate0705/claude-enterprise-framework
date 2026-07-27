import type { PipelineStage } from '../interfaces/index.js';
import { allStages } from '../stages/index.js';

/**
 * Holds the pipeline's stages in execution order and exposes lookup by id, so a single stage can
 * be rerun on its own. Registration rejects duplicate ids to keep the pipeline well-formed.
 */
export class StageRegistry {
  private readonly order: PipelineStage[] = [];
  private readonly byId = new Map<string, PipelineStage>();

  constructor(stages: readonly PipelineStage[] = allStages()) {
    for (const stage of stages) {
      this.register(stage);
    }
  }

  register(stage: PipelineStage): this {
    if (this.byId.has(stage.id)) {
      throw new Error(`Duplicate stage id: ${stage.id}`);
    }
    this.byId.set(stage.id, stage);
    this.order.push(stage);
    return this;
  }

  all(): readonly PipelineStage[] {
    return this.order;
  }

  ids(): readonly string[] {
    return this.order.map((stage) => stage.id);
  }

  get(id: string): PipelineStage | undefined {
    return this.byId.get(id);
  }
}
