/** A minimal sink for pipeline progress, so the CLI can surface stage-by-stage output. */
export interface PipelineLogger {
  stageStart(id: string, name: string): void;
  stageDone(id: string, status: string, summary: string): void;
}

/** A logger that records events in memory; the CLI reads them or ignores them. */
export class RecordingLogger implements PipelineLogger {
  readonly events: string[] = [];
  stageStart(id: string, name: string): void {
    this.events.push(`▶ ${name} (${id})`);
  }
  stageDone(id: string, status: string, summary: string): void {
    this.events.push(
      `  ${status === 'completed' ? '✔' : status === 'failed' ? '✖' : '•'} ${summary}`,
    );
  }
}

/** A logger that discards everything — the default for tests. */
export class SilentLogger implements PipelineLogger {
  stageStart(): void {}
  stageDone(): void {}
}
