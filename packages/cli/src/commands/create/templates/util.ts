/** Shared helpers for the template layer. */

/** Serializes a value as pretty JSON with a trailing newline. */
export const jsonFile = (value: unknown): string => `${JSON.stringify(value, null, 2)}\n`;

/** Returns a record with keys sorted, for deterministic output. */
export const sortedRecord = (record: Record<string, string>): Record<string, string> =>
  Object.fromEntries(Object.entries(record).sort(([a], [b]) => a.localeCompare(b)));
