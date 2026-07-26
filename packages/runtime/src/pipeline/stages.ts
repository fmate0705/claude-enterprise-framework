import { err, ok } from '@cef/core';
import type { Result } from '@cef/core';
import type { RuntimeContext } from '../core/context.js';
import type {
  CapabilityManager,
  MCPManager,
  PluginManager,
  SkillManager,
} from '../core/managers.js';
import {
  PluginNotFoundError,
  RuntimeError,
  RuntimeInitializationFailedError,
  ValidationFailedError,
} from '../errors/index.js';
import type { ExecutionPlanner } from '../graph/index.js';
import type { Loader } from '../interfaces/index.js';
import type { Manifest, Project, ProjectContext, RuntimeConfiguration } from '../models/index.js';
import type { RuntimeValidator } from '../validation/index.js';
import type { PipelineStage } from './pipeline.js';

const requireField = <T>(
  value: T | undefined,
  stage: string,
  field: string,
): Result<T, RuntimeError> =>
  value === undefined
    ? err(new RuntimeInitializationFailedError(`${stage} (missing ${field})`))
    : ok(value);

export class BootStage implements PipelineStage {
  readonly name = 'boot';
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    context.events.emit({ type: 'RuntimeStarted', projectRoot: context.projectRoot });
    context.logger.info('Runtime boot started.', { projectRoot: context.projectRoot });
    return ok(undefined);
  }
}

export class LoadConfigurationStage implements PipelineStage {
  readonly name = 'load-configuration';
  constructor(private readonly loader: Loader<RuntimeConfiguration>) {}
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    const result = await this.loader.load(context.projectRoot);
    if (!result.ok) {
      return result;
    }
    context.configuration = result.value;
    context.events.emit({ type: 'ConfigurationLoaded' });
    return ok(undefined);
  }
}

export class LoadManifestStage implements PipelineStage {
  readonly name = 'load-manifest';
  constructor(private readonly loader: Loader<Manifest>) {}
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    const result = await this.loader.load(context.projectRoot);
    if (!result.ok) {
      return result;
    }
    context.manifest = result.value;
    context.events.emit({ type: 'ManifestLoaded', engines: result.value.engines.length });
    return ok(undefined);
  }
}

export class LoadProjectStage implements PipelineStage {
  readonly name = 'load-project';
  constructor(private readonly loader: Loader<Project>) {}
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    const result = await this.loader.load(context.projectRoot);
    if (!result.ok) {
      return result;
    }
    context.project = result.value;
    context.events.emit({ type: 'ProjectLoaded' });
    return ok(undefined);
  }
}

export class LoadContextStage implements PipelineStage {
  readonly name = 'load-context';
  constructor(private readonly loader: Loader<ProjectContext | undefined>) {}
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    const result = await this.loader.load(context.projectRoot);
    if (!result.ok) {
      return result;
    }
    if (result.value !== undefined) {
      context.projectContext = result.value;
    }
    context.events.emit({ type: 'ContextLoaded', present: result.value !== undefined });
    return ok(undefined);
  }
}

export class ResolveEnginesStage implements PipelineStage {
  readonly name = 'resolve-engines';
  constructor(private readonly plugins: PluginManager) {}
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    const manifest = requireField(context.manifest, this.name, 'manifest');
    if (!manifest.ok) {
      return manifest;
    }
    const resolved = this.plugins.resolve(manifest.value.engines);
    if (!resolved.ok) {
      return resolved;
    }
    context.plugins = resolved.value.plugins;
    context.addedEngines = resolved.value.added;
    context.events.emit({ type: 'EnginesResolved', count: resolved.value.plugins.length });
    return ok(undefined);
  }
}

export class ResolveDependenciesStage implements PipelineStage {
  readonly name = 'resolve-dependencies';
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    const plugins = requireField(context.plugins, this.name, 'plugins');
    if (!plugins.ok) {
      return plugins;
    }
    const present = new Set(plugins.value.map((plugin) => plugin.id));
    for (const plugin of plugins.value) {
      for (const dependency of plugin.dependsOn) {
        if (!present.has(dependency)) {
          return err(new PluginNotFoundError(dependency, plugin.id));
        }
      }
    }
    context.events.emit({ type: 'PluginsResolved', order: [...present].sort() });
    return ok(undefined);
  }
}

export class ResolveSkillsStage implements PipelineStage {
  readonly name = 'resolve-skills';
  constructor(private readonly skills: SkillManager) {}
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    const manifest = requireField(context.manifest, this.name, 'manifest');
    if (!manifest.ok) {
      return manifest;
    }
    const plugins = requireField(context.plugins, this.name, 'plugins');
    if (!plugins.ok) {
      return plugins;
    }
    context.skills = this.skills.resolve(manifest.value.skills, plugins.value);
    context.events.emit({ type: 'SkillsResolved', skills: context.skills });
    return ok(undefined);
  }
}

export class ResolveMcpsStage implements PipelineStage {
  readonly name = 'resolve-mcps';
  constructor(private readonly mcp: MCPManager) {}
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    const manifest = requireField(context.manifest, this.name, 'manifest');
    if (!manifest.ok) {
      return manifest;
    }
    const plugins = requireField(context.plugins, this.name, 'plugins');
    if (!plugins.ok) {
      return plugins;
    }
    context.mcp = this.mcp.resolve(manifest.value.mcp, plugins.value);
    context.events.emit({ type: 'McpsResolved', mcp: context.mcp });
    return ok(undefined);
  }
}

export class BuildExecutionGraphStage implements PipelineStage {
  readonly name = 'build-execution-graph';
  constructor(
    private readonly planner: ExecutionPlanner,
    private readonly capabilities: CapabilityManager,
  ) {}
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    const plugins = requireField(context.plugins, this.name, 'plugins');
    if (!plugins.ok) {
      return plugins;
    }
    const planned = this.planner.plan(plugins.value);
    if (!planned.ok) {
      return planned;
    }
    context.graph = planned.value.graph;
    context.order = planned.value.order;
    context.capabilities = this.capabilities.build(
      planned.value.order,
      context.skills ?? [],
      context.mcp ?? [],
    );
    context.events.emit({
      type: 'ExecutionGraphCreated',
      nodes: planned.value.graph.nodeCount(),
      edges: planned.value.graph.edgeCount(),
    });
    return ok(undefined);
  }
}

export class ValidateStage implements PipelineStage {
  readonly name = 'validate';
  constructor(private readonly validator: RuntimeValidator) {}
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    context.events.emit({ type: 'ValidationStarted' });
    const issues = this.validator.validate(context);
    context.events.emit({ type: 'ValidationFinished', ok: issues.length === 0 });
    if (issues.length > 0) {
      return err(new ValidationFailedError(issues));
    }
    return ok(undefined);
  }
}

export class InitializePluginsStage implements PipelineStage {
  readonly name = 'initialize-plugins';
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    const plugins = requireField(context.plugins, this.name, 'plugins');
    if (!plugins.ok) {
      return plugins;
    }
    const order = requireField(context.order, this.name, 'order');
    if (!order.ok) {
      return order;
    }
    const byId = new Map(plugins.value.map((plugin) => [plugin.id, plugin]));
    const executionContext = {
      projectRoot: context.projectRoot,
      logger: context.logger,
      engines: order.value,
    };
    let count = 0;
    for (const id of order.value) {
      const plugin = byId.get(id);
      if (!plugin) {
        return err(new PluginNotFoundError(id));
      }
      await plugin.initialize(executionContext);
      count += 1;
    }
    context.events.emit({ type: 'PluginsInitialized', count });
    return ok(undefined);
  }
}

export class ReadyStage implements PipelineStage {
  readonly name = 'ready';
  async run(context: RuntimeContext): Promise<Result<void, RuntimeError>> {
    context.events.emit({ type: 'RuntimeReady' });
    context.logger.info('Runtime ready.', { engines: context.order?.length ?? 0 });
    return ok(undefined);
  }
}
