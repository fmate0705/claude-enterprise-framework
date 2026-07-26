export type RuntimeLogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';
export type LogFields = Record<string, unknown>;

/** Structured, levelled logger. Every method accepts optional machine-readable fields. */
export interface RuntimeLogger {
  trace(message: string, fields?: LogFields): void;
  debug(message: string, fields?: LogFields): void;
  info(message: string, fields?: LogFields): void;
  warn(message: string, fields?: LogFields): void;
  error(message: string, fields?: LogFields): void;
}

const LEVEL_ORDER: Record<RuntimeLogLevel, number> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
};

export interface StructuredLoggerOptions {
  readonly level?: RuntimeLogLevel;
  /** Emit JSON lines (machine-readable) instead of pretty text (developer-friendly). */
  readonly json?: boolean;
  readonly sink?: (line: string) => void;
  readonly clock?: () => Date;
}

const formatValue = (value: unknown): string =>
  typeof value === 'string' ? value : JSON.stringify(value);

/** Default logger: JSON lines or pretty text, filtered by level, written to a sink. */
export class StructuredLogger implements RuntimeLogger {
  private readonly level: RuntimeLogLevel;
  private readonly json: boolean;
  private readonly sink: (line: string) => void;
  private readonly clock: () => Date;

  constructor(options: StructuredLoggerOptions = {}) {
    this.level = options.level ?? 'info';
    this.json = options.json ?? false;
    this.sink = options.sink ?? ((line) => process.stderr.write(`${line}\n`));
    this.clock = options.clock ?? (() => new Date());
  }

  trace(message: string, fields?: LogFields): void {
    this.write('trace', message, fields);
  }
  debug(message: string, fields?: LogFields): void {
    this.write('debug', message, fields);
  }
  info(message: string, fields?: LogFields): void {
    this.write('info', message, fields);
  }
  warn(message: string, fields?: LogFields): void {
    this.write('warn', message, fields);
  }
  error(message: string, fields?: LogFields): void {
    this.write('error', message, fields);
  }

  private write(level: RuntimeLogLevel, message: string, fields?: LogFields): void {
    if (LEVEL_ORDER[level] < LEVEL_ORDER[this.level]) {
      return;
    }
    if (this.json) {
      this.sink(
        JSON.stringify({ level, message, time: this.clock().toISOString(), ...(fields ?? {}) }),
      );
      return;
    }
    const entries = fields ? Object.entries(fields) : [];
    const suffix =
      entries.length > 0
        ? `  ${entries.map(([key, value]) => `${key}=${formatValue(value)}`).join(' ')}`
        : '';
    this.sink(`[${level.toUpperCase()}] ${message}${suffix}`);
  }
}

/** A logger that discards everything — useful in tests. */
export class SilentLogger implements RuntimeLogger {
  trace(): void {}
  debug(): void {}
  info(): void {}
  warn(): void {}
  error(): void {}
}
