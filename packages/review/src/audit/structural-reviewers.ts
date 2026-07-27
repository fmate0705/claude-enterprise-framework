import type { Reviewer } from '../interfaces/index.js';
import type { ReviewInput } from '../models/review-input.js';
import { gradeGate } from '../scoring/gate-grade.js';
import { finding, type Finding, type GateResult } from '../types/index.js';

const CORE_FILES = ['package.json', 'tsconfig.json', 'app/layout.tsx', 'app/globals.css'];

/** Reviews the architecture gate: the core project files and resolvable local imports. */
export class ArchitectureReviewer implements Reviewer {
  readonly gate = 'architecture' as const;
  readonly name = 'Architecture';
  readonly required = true;

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = [];
    for (const path of CORE_FILES) {
      if (!input.files.has(path)) {
        findings.push(
          finding('architecture', 'blocker', `Missing core file "${path}".`, { file: path }),
        );
      }
    }
    for (const [path, content] of input.files) {
      if (!path.endsWith('.ts') && !path.endsWith('.tsx')) {
        continue;
      }
      for (const specifier of localImports(content)) {
        if (!resolves(specifier, input.files)) {
          findings.push(
            finding('architecture', 'blocker', `Unresolved import "${specifier}".`, { file: path }),
          );
        }
      }
    }
    return gradeGate(this.gate, this.name, this.required, findings);
  }
}

/** Reviews the Docker gate (advisory): a Dockerfile for reproducible builds. */
export class DockerReviewer implements Reviewer {
  readonly gate = 'docker' as const;
  readonly name = 'Docker';
  readonly required = false;

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = [];
    if (!input.files.has('Dockerfile')) {
      findings.push(
        finding('docker', 'major', 'No Dockerfile for a reproducible build.', {
          recommendation: 'Add a Dockerfile before production deployment.',
        }),
      );
    }
    return gradeGate(this.gate, this.name, this.required, findings);
  }
}

/** Reviews the Testing gate (advisory): the presence of automated tests. */
export class TestingReviewer implements Reviewer {
  readonly gate = 'testing' as const;
  readonly name = 'Testing';
  readonly required = false;

  review(input: ReviewInput): GateResult {
    const hasTests = [...input.files.keys()].some((path) => /\.(test|spec)\.(ts|tsx)$/.test(path));
    const findings: Finding[] = hasTests
      ? []
      : [
          finding('testing', 'major', 'No automated tests were generated.', {
            recommendation: 'Add behavior tests for critical paths before production.',
          }),
        ];
    return gradeGate(this.gate, this.name, this.required, findings);
  }
}

/** Reviews the Documentation gate (advisory): a project README. */
export class DocumentationReviewer implements Reviewer {
  readonly gate = 'documentation' as const;
  readonly name = 'Documentation';
  readonly required = false;

  review(input: ReviewInput): GateResult {
    const findings: Finding[] = input.files.has('README.md')
      ? []
      : [finding('documentation', 'major', 'No README documenting the project.')];
    return gradeGate(this.gate, this.name, this.required, findings);
  }
}

function localImports(content: string): readonly string[] {
  const specifiers: string[] = [];
  const regex = /from\s+'(@\/[^']+)'/g;
  let match = regex.exec(content);
  while (match !== null) {
    if (match[1] !== undefined) {
      specifiers.push(match[1]);
    }
    match = regex.exec(content);
  }
  return specifiers;
}

function resolves(specifier: string, files: ReadonlyMap<string, string>): boolean {
  const base = specifier.replace(/^@\//, '');
  return (
    files.has(`${base}.ts`) ||
    files.has(`${base}.tsx`) ||
    files.has(`${base}/index.ts`) ||
    files.has(`${base}/index.tsx`)
  );
}
