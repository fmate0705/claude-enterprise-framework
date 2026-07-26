import type { CefError } from '@cef/core';

export const RuntimeErrorCode = {
  ManifestNotFound: 'MANIFEST_NOT_FOUND',
  InvalidManifest: 'INVALID_MANIFEST',
  ProjectNotFound: 'PROJECT_NOT_FOUND',
  InvalidProject: 'INVALID_PROJECT',
  ConfigurationInvalid: 'CONFIGURATION_INVALID',
  ContextCorrupted: 'CONTEXT_CORRUPTED',
  PluginNotFound: 'PLUGIN_NOT_FOUND',
  DependencyCycleDetected: 'DEPENDENCY_CYCLE_DETECTED',
  ValidationFailed: 'VALIDATION_FAILED',
  RuntimeInitializationFailed: 'RUNTIME_INITIALIZATION_FAILED',
} as const;

export type RuntimeErrorCode = (typeof RuntimeErrorCode)[keyof typeof RuntimeErrorCode];

/**
 * Base Runtime error. Extends `Error` and satisfies the core {@link CefError} shape, so it is
 * carried as a value in `Result` and rendered by the CLI's error handler.
 */
export class RuntimeError extends Error implements CefError {
  readonly code: string;
  readonly hint?: string;

  constructor(code: string, message: string, options: { hint?: string; cause?: unknown } = {}) {
    super(message, options.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = new.target.name;
    this.code = code;
    if (options.hint !== undefined) {
      this.hint = options.hint;
    }
  }
}

export class ManifestNotFoundError extends RuntimeError {
  constructor(path: string) {
    super(RuntimeErrorCode.ManifestNotFound, `No CEF manifest found at ${path}.`, {
      hint: 'Run "cef create" to scaffold a project, or run this command from a CEF project root.',
    });
  }
}

export class InvalidManifestError extends RuntimeError {
  constructor(detail: string, cause?: unknown) {
    super(RuntimeErrorCode.InvalidManifest, `The manifest is invalid: ${detail}`, {
      hint: 'Fix .cef/manifest.yaml so it matches the CEF manifest schema.',
      ...(cause !== undefined ? { cause } : {}),
    });
  }
}

export class ProjectNotFoundError extends RuntimeError {
  constructor(path: string) {
    super(RuntimeErrorCode.ProjectNotFound, `No project configuration found at ${path}.`, {
      hint: 'Expected .cef/project.json. Re-scaffold with "cef create" if it is missing.',
    });
  }
}

export class InvalidProjectError extends RuntimeError {
  constructor(detail: string, cause?: unknown) {
    super(RuntimeErrorCode.InvalidProject, `The project configuration is invalid: ${detail}`, {
      hint: 'Fix .cef/project.json so it matches the CEF project schema.',
      ...(cause !== undefined ? { cause } : {}),
    });
  }
}

export class ConfigurationInvalidError extends RuntimeError {
  constructor(detail: string, cause?: unknown) {
    super(
      RuntimeErrorCode.ConfigurationInvalid,
      `The runtime configuration is invalid: ${detail}`,
      {
        hint: 'Fix .cef/runtime.json so it matches the CEF runtime configuration schema.',
        ...(cause !== undefined ? { cause } : {}),
      },
    );
  }
}

export class ContextCorruptedError extends RuntimeError {
  constructor(detail: string, cause?: unknown) {
    super(RuntimeErrorCode.ContextCorrupted, `The project context is corrupted: ${detail}`, {
      hint: 'Delete or repair .cef/context.json; it is optional and safe to remove.',
      ...(cause !== undefined ? { cause } : {}),
    });
  }
}

export class PluginNotFoundError extends RuntimeError {
  constructor(id: string, requiredBy?: string) {
    const because = requiredBy ? ` (required by "${requiredBy}")` : '';
    super(RuntimeErrorCode.PluginNotFound, `Unknown engine "${id}"${because}.`, {
      hint: 'Remove it from .cef/manifest.yaml, or register it in the plugin catalog.',
    });
  }
}

export class DependencyCycleDetectedError extends RuntimeError {
  readonly cycle: readonly string[];
  constructor(cycle: readonly string[]) {
    super(
      RuntimeErrorCode.DependencyCycleDetected,
      `Dependency cycle detected: ${cycle.join(' -> ')}.`,
      { hint: 'Break the cycle in the affected engine dependencies.' },
    );
    this.cycle = cycle;
  }
}

export class ValidationFailedError extends RuntimeError {
  readonly issues: readonly string[];
  constructor(issues: readonly string[]) {
    super(RuntimeErrorCode.ValidationFailed, `Runtime validation failed: ${issues.join('; ')}.`, {
      hint: 'Resolve the reported issues and try again.',
    });
    this.issues = issues;
  }
}

export class RuntimeInitializationFailedError extends RuntimeError {
  constructor(stage: string, cause?: unknown) {
    super(
      RuntimeErrorCode.RuntimeInitializationFailed,
      `Runtime initialization failed at "${stage}".`,
      {
        hint: 'See the cause for details.',
        ...(cause !== undefined ? { cause } : {}),
      },
    );
  }
}
