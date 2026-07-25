import { execFile } from 'node:child_process';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import * as clack from '@clack/prompts';
import type { Clock, FileSystem, Git, Logger, LogLevel, Prompter, SelectOption } from '@cef/core';

const execFileAsync = promisify(execFile);

/** Thrown by {@link ClackPrompter} when the user cancels a prompt (Ctrl-C). */
export class PromptCancelledError extends Error {
  constructor() {
    super('Prompt cancelled by the user.');
    this.name = 'PromptCancelledError';
  }
}

/** Node filesystem adapter for the {@link FileSystem} port. */
export class NodeFileSystem implements FileSystem {
  async exists(path: string): Promise<boolean> {
    try {
      await stat(path);
      return true;
    } catch {
      return false;
    }
  }

  async isDirectory(path: string): Promise<boolean> {
    try {
      return (await stat(path)).isDirectory();
    } catch {
      return false;
    }
  }

  async readdir(path: string): Promise<string[]> {
    return readdir(path);
  }

  async readFile(path: string): Promise<string> {
    return readFile(path, 'utf8');
  }

  async writeFile(path: string, content: string): Promise<void> {
    await writeFile(path, content, 'utf8');
  }

  async mkdir(path: string): Promise<void> {
    await mkdir(path, { recursive: true });
  }
}

/** Interactive prompter backed by `@clack/prompts`. */
export class ClackPrompter implements Prompter {
  intro(message: string): void {
    clack.intro(message);
  }

  outro(message: string): void {
    clack.outro(message);
  }

  note(message: string, title?: string): void {
    clack.note(message, title);
  }

  cancel(message: string): void {
    clack.cancel(message);
  }

  async text(options: {
    message: string;
    placeholder?: string;
    defaultValue?: string;
    validate?: (value: string) => string | undefined;
  }): Promise<string> {
    const result = await clack.text({
      message: options.message,
      ...(options.placeholder !== undefined ? { placeholder: options.placeholder } : {}),
      ...(options.defaultValue !== undefined ? { defaultValue: options.defaultValue } : {}),
      ...(options.validate ? { validate: (value) => options.validate?.(value) } : {}),
    });
    return this.unwrap(result);
  }

  async select<T>(options: {
    message: string;
    options: SelectOption<T>[];
    initialValue?: T;
  }): Promise<T> {
    // Cast at the adapter boundary: clack's `Option` type is stricter under
    // exactOptionalPropertyTypes than our structural equivalent.
    const params = {
      message: options.message,
      options: this.toClackOptions(options.options),
      ...(options.initialValue !== undefined ? { initialValue: options.initialValue } : {}),
    } as unknown as Parameters<typeof clack.select>[0];
    return this.unwrap(await clack.select(params)) as T;
  }

  async multiselect<T>(options: {
    message: string;
    options: SelectOption<T>[];
    initialValues?: T[];
    required?: boolean;
  }): Promise<T[]> {
    const params = {
      message: options.message,
      options: this.toClackOptions(options.options),
      ...(options.initialValues !== undefined ? { initialValues: options.initialValues } : {}),
      required: options.required ?? false,
    } as unknown as Parameters<typeof clack.multiselect>[0];
    return this.unwrap(await clack.multiselect(params)) as T[];
  }

  private toClackOptions<T>(
    options: SelectOption<T>[],
  ): Array<{ value: T; label: string; hint?: string }> {
    return options.map((option) => ({
      value: option.value,
      label: option.label,
      ...(option.hint !== undefined ? { hint: option.hint } : {}),
    }));
  }

  async confirm(options: { message: string; initialValue?: boolean }): Promise<boolean> {
    const result = await clack.confirm({
      message: options.message,
      ...(options.initialValue !== undefined ? { initialValue: options.initialValue } : {}),
    });
    return this.unwrap(result);
  }

  private unwrap<T>(result: T | symbol): T {
    if (clack.isCancel(result)) {
      throw new PromptCancelledError();
    }
    return result as T;
  }
}

/** Structured logger writing diagnostics to stderr, keeping stdout clean for output. */
export class ConsoleLogger implements Logger {
  private static readonly order: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
  };

  constructor(private readonly level: LogLevel = 'info') {}

  debug(message: string): void {
    this.write('debug', message);
  }
  info(message: string): void {
    this.write('info', message);
  }
  warn(message: string): void {
    this.write('warn', message);
  }
  error(message: string): void {
    this.write('error', message);
  }

  private write(level: LogLevel, message: string): void {
    if (ConsoleLogger.order[level] < ConsoleLogger.order[this.level]) {
      return;
    }
    process.stderr.write(`${message}\n`);
  }
}

/** Real time source. */
export class SystemClock implements Clock {
  now(): Date {
    return new Date();
  }
}

/** Git adapter over the `git` executable. Never pushes. */
export class GitCli implements Git {
  async isAvailable(): Promise<boolean> {
    try {
      await execFileAsync('git', ['--version']);
      return true;
    } catch {
      return false;
    }
  }

  async init(cwd: string): Promise<void> {
    await execFileAsync('git', ['init'], { cwd });
  }

  async add(cwd: string, pathspec: string): Promise<void> {
    await execFileAsync('git', ['add', pathspec], { cwd });
  }

  async commit(cwd: string, message: string): Promise<void> {
    await execFileAsync('git', ['commit', '-m', message], { cwd });
  }
}
