import type { Clock } from '@cef/core';
import type {
  ClaudeContextInput,
  ProjectSnapshot,
  Roadmap,
  SessionState,
} from '../models/index.js';
import { EMPTY_ARTIFACT_INDEX } from '../models/index.js';
import { ClaudeRoadmapGenerator } from '../roadmap/index.js';
import { ClaudeSessionManager } from '../session/index.js';

/** A clock fixed to a known instant, so generated timestamps are deterministic. */
export class FixedClock implements Clock {
  constructor(private readonly instant = new Date('2026-07-26T12:00:00.000Z')) {}
  now(): Date {
    return this.instant;
  }
}

/** Builds a representative snapshot; overrides are shallow-merged. */
export function buildSnapshot(overrides: Partial<ProjectSnapshot> = {}): ProjectSnapshot {
  return {
    name: 'Acme Law',
    type: 'landing-page',
    description: 'A premium law-firm website with intake and case studies.',
    cefVersion: '2.0.0',
    stack: {
      framework: 'nextjs',
      frameworkVersion: 2,
      language: 'typescript',
      packageManager: 'pnpm',
      buildSystem: 'turbo',
      deployment: 'vercel',
      database: undefined,
    },
    engines: ['core', 'architecture', 'design', 'seo', 'accessibility', 'performance'],
    addedEngines: ['accessibility'],
    capabilities: [
      {
        id: 'foundation',
        name: 'Foundation',
        category: 'foundation',
        summary: 'Constitution and rules.',
        tokenEstimate: 40,
      },
      {
        id: 'seo',
        name: 'SEO',
        category: 'discoverability',
        summary: 'Metadata, canonical URLs, structured data, sitemap.',
        tokenEstimate: 60,
      },
    ],
    skills: ['taste', 'seo-skill'],
    mcp: ['chrome-devtools'],
    standards: [{ id: 'seo', name: 'SEO', specPath: 'modules/seo/spec.md' }],
    prompts: [
      { id: 'seo', name: 'SEO', prompt: 'Every page needs unique metadata and a canonical URL.' },
    ],
    directories: [
      { path: 'app', purpose: 'Next.js App Router routes' },
      { path: 'components', purpose: 'Reusable UI components' },
    ],
    constraints: ['WCAG 2.2 AA', 'Performance budget', 'Security', 'Legal compliance'],
    capabilityTokenEstimate: 100,
    ...overrides,
  };
}

/** Builds a session state at a fixed instant. */
export function buildSession(clock: Clock = new FixedClock()): SessionState {
  return new ClaudeSessionManager(clock).start('session-1');
}

/** Assembles a full context input from a snapshot, deriving the roadmap. */
export function buildContextInput(
  snapshot: ProjectSnapshot = buildSnapshot(),
  session: SessionState = buildSession(),
): ClaudeContextInput {
  const roadmap: Roadmap = new ClaudeRoadmapGenerator().generate(snapshot);
  return {
    snapshot,
    roadmap,
    session,
    artifacts: EMPTY_ARTIFACT_INDEX,
    openDecisions: [],
    recentChanges: ['Scaffolded the project', 'Enabled SEO capability'],
    generatedAt: '2026-07-26T12:00:00.000Z',
  };
}
