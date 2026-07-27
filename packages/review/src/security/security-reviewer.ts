import type { Reviewer } from '../interfaces/index.js';
import type { ReviewInput } from '../models/review-input.js';
import { gradeGate } from '../scoring/gate-grade.js';
import { finding, type Finding, type GateResult } from '../types/index.js';

/** Patterns that look like committed secrets. */
const SECRET_PATTERNS: readonly RegExp[] = [
  /(sk|pk)_(live|test)_[A-Za-z0-9]{16,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/,
  /(api[_-]?key|secret|password|token)\s*[:=]\s*['"][A-Za-z0-9]{16,}['"]/i,
];

/**
 * Inspects security posture: no committed secrets, an example env file present (real secrets stay
 * out of the repo), dependency versions pinned, and security headers configured. Missing headers
 * are a recommendation rather than a blocker at this stage, since the pipeline does not yet emit a
 * middleware; committed secrets are always a blocker.
 */
export class SecurityReviewer implements Reviewer {
  readonly gate = 'security' as const;
  readonly name = 'Security';
  readonly required = true;

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = [];

    for (const [path, content] of input.files) {
      if (path === '.env.example') {
        continue;
      }
      for (const pattern of SECRET_PATTERNS) {
        if (pattern.test(content)) {
          findings.push(
            finding('security', 'blocker', 'A possible secret is committed to source.', {
              file: path,
              recommendation: 'Move it to a server-only environment variable.',
            }),
          );
          break;
        }
      }
    }

    if (!input.files.has('.env.example')) {
      findings.push(
        finding('security', 'major', 'No .env.example documenting required configuration.', {
          recommendation: 'Add .env.example with non-secret placeholders.',
        }),
      );
    }

    const pkg = input.files.get('package.json');
    if (pkg && /['"][~^]?\*['"]/.test(pkg)) {
      findings.push(
        finding('security', 'major', 'A dependency version is unpinned ("*").', {
          file: 'package.json',
        }),
      );
    }

    const hasHeaders =
      input.files.has('middleware.ts') ||
      (input.files.get('next.config.mjs')?.includes('headers') ?? false);
    if (!hasHeaders) {
      findings.push(
        finding('security', 'major', 'No security headers (CSP, etc.) are configured.', {
          recommendation: 'Add security headers via next.config or middleware before production.',
        }),
      );
    }

    return gradeGate(this.gate, this.name, this.required, findings);
  }
}
