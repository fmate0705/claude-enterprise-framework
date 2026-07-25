/**
 * The framework-wide error model. Expected failures are represented as values
 * (`Result`), not thrown; a `CefError` carries a stable machine code, a human message,
 * and an optional actionable hint (`ARCHITECTURE.md` KD-9).
 */
export interface CefError {
  readonly code: string;
  readonly message: string;
  readonly hint?: string;
  readonly cause?: unknown;
}

/** Stable error codes. Extend deliberately; consumers may switch on these. */
export const ErrorCode = {
  InvalidInput: 'INVALID_INPUT',
  TargetNotEmpty: 'TARGET_NOT_EMPTY',
  WriteFailed: 'WRITE_FAILED',
  GitUnavailable: 'GIT_UNAVAILABLE',
  GitFailed: 'GIT_FAILED',
  Cancelled: 'CANCELLED',
  Unexpected: 'UNEXPECTED',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Constructs a `CefError`. Optional fields are only attached when provided, so the shape
 * stays compatible with `exactOptionalPropertyTypes`.
 */
export function cefError(
  code: string,
  message: string,
  options: { hint?: string; cause?: unknown } = {},
): CefError {
  return {
    code,
    message,
    ...(options.hint !== undefined ? { hint: options.hint } : {}),
    ...(options.cause !== undefined ? { cause: options.cause } : {}),
  };
}
