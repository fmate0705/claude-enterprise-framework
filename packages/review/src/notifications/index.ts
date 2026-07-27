/** A notification emitted on review and approval events, so a host can surface them. */
export interface ReviewNotification {
  readonly kind: 'review-complete' | 'approval-changed' | 'revision-recorded' | 'released';
  readonly message: string;
}

/** A sink for review notifications. */
export interface Notifier {
  notify(notification: ReviewNotification): void;
}

/** Records notifications in memory; the CLI reads them. */
export class RecordingNotifier implements Notifier {
  readonly notifications: ReviewNotification[] = [];
  notify(notification: ReviewNotification): void {
    this.notifications.push(notification);
  }
}

/** Discards notifications — the default for tests. */
export class SilentNotifier implements Notifier {
  notify(): void {}
}
