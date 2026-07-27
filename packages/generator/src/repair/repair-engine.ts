import type { GeneratedFile } from '@cef/core';
import { issue, type GenerationContext, type StageIssue } from '../models/index.js';

export interface RepairResult {
  /** Files whose content changed, ready to be written back. */
  readonly files: readonly GeneratedFile[];
  readonly fixes: readonly StageIssue[];
}

/**
 * Automatically repairs safe, deterministic issues across the generated file set: normalizes
 * formatting (trailing whitespace and a single final newline) and injects minimal metadata into
 * any page that lacks it. It only makes changes it can make safely and reports each one; it never
 * rewrites logic.
 */
export class RepairEngine {
  repair(context: GenerationContext): RepairResult {
    const files: GeneratedFile[] = [];
    const fixes: StageIssue[] = [];

    for (const [path, content] of context.files) {
      let next = content;

      if (this.needsMetadata(path, next)) {
        next = this.injectMetadata(next);
        fixes.push(issue('warning', 'Injected missing page metadata.', path));
      }

      const formatted = this.normalizeFormatting(next);
      if (formatted !== content) {
        if (formatted !== next) {
          fixes.push(issue('warning', 'Normalized formatting.', path));
        }
        files.push({ path, content: formatted });
      }
    }

    return { files, fixes };
  }

  private normalizeFormatting(content: string): string {
    const trimmed = content
      .split('\n')
      .map((line) => line.replace(/[ \t]+$/, ''))
      .join('\n');
    return `${trimmed.replace(/\n+$/, '')}\n`;
  }

  private needsMetadata(path: string, content: string): boolean {
    return (
      path.startsWith('app/') &&
      path.endsWith('page.tsx') &&
      !path.includes('[') &&
      !/export const metadata|generateMetadata/.test(content)
    );
  }

  private injectMetadata(content: string): string {
    const metadata = `import type { Metadata } from 'next';\n\nexport const metadata: Metadata = { title: 'Page' };\n\n`;
    return `${metadata}${content}`;
  }
}
