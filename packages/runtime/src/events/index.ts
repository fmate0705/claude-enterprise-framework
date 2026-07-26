/** The strongly-typed lifecycle events emitted during a runtime boot. */
export type RuntimeEvent =
  | { readonly type: 'RuntimeStarted'; readonly projectRoot: string }
  | { readonly type: 'ConfigurationLoaded' }
  | { readonly type: 'ManifestLoaded'; readonly engines: number }
  | { readonly type: 'ProjectLoaded' }
  | { readonly type: 'ContextLoaded'; readonly present: boolean }
  | { readonly type: 'EnginesResolved'; readonly count: number }
  | { readonly type: 'PluginsResolved'; readonly order: readonly string[] }
  | { readonly type: 'SkillsResolved'; readonly skills: readonly string[] }
  | { readonly type: 'McpsResolved'; readonly mcp: readonly string[] }
  | { readonly type: 'ExecutionGraphCreated'; readonly nodes: number; readonly edges: number }
  | { readonly type: 'ValidationStarted' }
  | { readonly type: 'ValidationFinished'; readonly ok: boolean }
  | { readonly type: 'PluginsInitialized'; readonly count: number }
  | { readonly type: 'RuntimeReady' };

export type RuntimeEventType = RuntimeEvent['type'];
export type RuntimeEventOf<T extends RuntimeEventType> = Extract<RuntimeEvent, { type: T }>;
export type RuntimeEventHandler<T extends RuntimeEventType> = (event: RuntimeEventOf<T>) => void;

/** A minimal, strongly-typed event bus for lifecycle events. */
export class EventBus {
  private readonly handlers = new Map<RuntimeEventType, Set<(event: RuntimeEvent) => void>>();

  /** Subscribes to a specific event type. Returns an unsubscribe function. */
  on<T extends RuntimeEventType>(type: T, handler: RuntimeEventHandler<T>): () => void {
    let set = this.handlers.get(type);
    if (!set) {
      set = new Set();
      this.handlers.set(type, set);
    }
    const generic = handler as (event: RuntimeEvent) => void;
    set.add(generic);
    return () => {
      this.handlers.get(type)?.delete(generic);
    };
  }

  emit(event: RuntimeEvent): void {
    const set = this.handlers.get(event.type);
    if (!set) {
      return;
    }
    for (const handler of set) {
      handler(event);
    }
  }
}
