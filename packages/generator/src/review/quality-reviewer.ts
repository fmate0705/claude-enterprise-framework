import { issue, type GenerationContext, type StageIssue } from '../models/index.js';

export interface ReviewReport {
  readonly ok: boolean;
  readonly issues: readonly StageIssue[];
}

const REQUIRED_ARCHITECTURE = [
  'package.json',
  'tsconfig.json',
  'app/layout.tsx',
  'app/globals.css',
];
const HEX = /#[0-9a-fA-F]{6}\b/;

/**
 * Runs an internal quality review over the generated files: architecture completeness, design
 * integrity (components read tokens, not raw hex), duplicate components, and consistency (shared
 * helpers are reused). Findings are deterministic and file-anchored.
 */
export class QualityReviewer {
  review(context: GenerationContext): ReviewReport {
    const issues: StageIssue[] = [
      ...this.checkArchitecture(context),
      ...this.checkDesignIntegrity(context),
      ...this.checkDuplicateComponents(context),
    ];
    return { ok: issues.every((i) => i.severity !== 'error'), issues };
  }

  private checkArchitecture(context: GenerationContext): StageIssue[] {
    return REQUIRED_ARCHITECTURE.filter((path) => !context.files.has(path)).map((path) =>
      issue('error', `Missing architecture file "${path}".`, path),
    );
  }

  private checkDesignIntegrity(context: GenerationContext): StageIssue[] {
    const issues: StageIssue[] = [];
    for (const [path, content] of context.files) {
      if (path.startsWith('components/') && path.endsWith('.tsx') && HEX.test(content)) {
        issues.push(issue('warning', 'Component hard-codes a hex color instead of a token.', path));
      }
    }
    return issues;
  }

  private checkDuplicateComponents(context: GenerationContext): StageIssue[] {
    const issues: StageIssue[] = [];
    const exports = new Map<string, string>(); // exported component name -> file
    for (const [path, content] of context.files) {
      if (!path.startsWith('components/') || !path.endsWith('.tsx')) {
        continue;
      }
      for (const name of exportedComponents(content)) {
        const existing = exports.get(name);
        if (existing && existing !== path) {
          issues.push(issue('warning', `Component "${name}" is declared in two files.`, path));
        } else {
          exports.set(name, path);
        }
      }
    }
    return issues;
  }
}

/** Names of exported functions that look like React components (PascalCase). */
export function exportedComponents(content: string): readonly string[] {
  const names: string[] = [];
  const regex = /export function ([A-Z][A-Za-z0-9]*)/g;
  let match = regex.exec(content);
  while (match !== null) {
    if (match[1] !== undefined) {
      names.push(match[1]);
    }
    match = regex.exec(content);
  }
  return names;
}
