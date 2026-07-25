/**
 * Ports — the injected boundary between the framework-agnostic core and the outside world
 * (`ARCHITECTURE.md` §18.5). Every port has a real implementation in `@cef/cli` and a fake
 * in tests, so the core is exercised without touching disk, a terminal, or git.
 */

/** Filesystem access, sandboxed by the caller to a project root. */
export interface FileSystem {
  exists(path: string): Promise<boolean>;
  isDirectory(path: string): Promise<boolean>;
  readdir(path: string): Promise<string[]>;
  readFile(path: string): Promise<string>;
  writeFile(path: string, content: string): Promise<void>;
  mkdir(path: string): Promise<void>;
}

export interface SelectOption<T> {
  readonly value: T;
  readonly label: string;
  readonly hint?: string;
}

/** Interactive prompting, modelled to be trivially fakeable in tests. */
export interface Prompter {
  intro(message: string): void;
  outro(message: string): void;
  note(message: string, title?: string): void;
  cancel(message: string): void;
  text(options: {
    message: string;
    placeholder?: string;
    defaultValue?: string;
    validate?: (value: string) => string | undefined;
  }): Promise<string>;
  select<T>(options: { message: string; options: SelectOption<T>[]; initialValue?: T }): Promise<T>;
  multiselect<T>(options: {
    message: string;
    options: SelectOption<T>[];
    initialValues?: T[];
    required?: boolean;
  }): Promise<T[]>;
  confirm(options: { message: string; initialValue?: boolean }): Promise<boolean>;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

/** Injected time source, so generated timestamps are deterministic under test. */
export interface Clock {
  now(): Date;
}

/** The minimum git surface the generator needs; never pushes. */
export interface Git {
  isAvailable(): Promise<boolean>;
  init(cwd: string): Promise<void>;
  add(cwd: string, pathspec: string): Promise<void>;
  commit(cwd: string, message: string): Promise<void>;
}

/** The aggregate of ports injected into command handlers and generators. */
export interface Ports {
  readonly fs: FileSystem;
  readonly prompter: Prompter;
  readonly logger: Logger;
  readonly clock: Clock;
  readonly git: Git;
}
