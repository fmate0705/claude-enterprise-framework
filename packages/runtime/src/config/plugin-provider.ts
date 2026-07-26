import type { EnginePlugin, ExecutionContext, PluginProvider } from '../interfaces/index.js';
import type { EngineDefinition, EngineProvides } from '../models/index.js';
import { DEFAULT_ENGINE_CATALOG } from './engine-catalog.js';

/** An {@link EnginePlugin} backed by a catalog definition. Its `initialize` is a no-op that logs. */
export class CatalogEnginePlugin implements EnginePlugin {
  constructor(private readonly definition: EngineDefinition) {}

  get id(): string {
    return this.definition.id;
  }
  get floor(): boolean {
    return this.definition.floor;
  }
  get dependsOn(): readonly string[] {
    return this.definition.dependsOn;
  }
  get provides(): EngineProvides {
    return this.definition.provides;
  }

  initialize(context: ExecutionContext): void {
    context.logger.debug(`Initialized engine "${this.id}".`, { engine: this.id });
  }
}

/** Provides engine-plugins from a catalog of definitions (default: the built-in CEF catalog). */
export class CatalogPluginProvider implements PluginProvider {
  private readonly plugins = new Map<string, EnginePlugin>();

  constructor(catalog: readonly EngineDefinition[] = DEFAULT_ENGINE_CATALOG) {
    for (const definition of catalog) {
      this.plugins.set(definition.id, new CatalogEnginePlugin(definition));
    }
  }

  has(id: string): boolean {
    return this.plugins.has(id);
  }

  get(id: string): EnginePlugin | undefined {
    return this.plugins.get(id);
  }

  ids(): readonly string[] {
    return [...this.plugins.keys()];
  }
}
