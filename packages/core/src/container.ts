/**
 * A minimal, explicit dependency-injection container (`ARCHITECTURE.md` KD-6).
 *
 * Token-based registration with constructor/factory injection and no decorators or
 * `reflect-metadata`. The phantom `_type` ties a token to its resolved type so
 * `register<A>` / `resolve<B>` mismatches are caught at compile time.
 */
export interface Token<T> {
  readonly key: symbol;
  readonly description: string;
  readonly _type?: T;
}

export function token<T>(description: string): Token<T> {
  return { key: Symbol(description), description };
}

type Factory<T> = (container: Container) => T;

interface Registration<T> {
  readonly factory: Factory<T>;
  readonly singleton: boolean;
  instance: T | undefined;
}

export class Container {
  private readonly registrations = new Map<symbol, Registration<unknown>>();

  register<T>(target: Token<T>, factory: Factory<T>, options: { singleton?: boolean } = {}): this {
    this.registrations.set(target.key, {
      factory: factory as Factory<unknown>,
      singleton: options.singleton ?? true,
      instance: undefined,
    });
    return this;
  }

  resolve<T>(target: Token<T>): T {
    const registration = this.registrations.get(target.key);
    if (!registration) {
      throw new Error(`No registration for token: ${target.description}`);
    }
    if (!registration.singleton) {
      return registration.factory(this) as T;
    }
    if (registration.instance === undefined) {
      registration.instance = registration.factory(this);
    }
    return registration.instance as T;
  }

  has<T>(target: Token<T>): boolean {
    return this.registrations.has(target.key);
  }
}
