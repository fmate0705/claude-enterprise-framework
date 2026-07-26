import { resolve } from 'node:path';
import { isErr, ok } from '@cef/core';
import type { CefError, Clock, FileSystem, Result } from '@cef/core';
import { FrameworkLoader, frameworkRoot } from '@cef/framework';
import type { ResolvedFramework } from '@cef/framework';
import { Runtime, SilentLogger } from '@cef/runtime';
import type { ExecutionSession } from '@cef/runtime';
import {
  ARTIFACT_INDEX_PATH,
  ClaudeArtifactManager,
  ClaudeSerializer,
  ClaudeSessionManager,
  EMPTY_ARTIFACT_INDEX,
  EMPTY_HISTORY,
  EMPTY_PROGRESS,
  SESSION_HISTORY_PATH,
  type ArtifactIndex,
  type CapabilityRef,
  type DecisionRecord,
  type DirectoryEntry,
  type ProjectSnapshot,
  type RoadmapProgress,
  type SessionHistory,
  type SessionState,
} from '@cef/claude';

/** Everything a Claude command needs, assembled once from the Runtime and Framework Loader. */
export interface AssembledProject {
  readonly root: string;
  readonly snapshot: ProjectSnapshot;
  readonly session: SessionState;
  readonly history: SessionHistory;
  readonly artifacts: ArtifactIndex;
  readonly progress: RoadmapProgress;
  readonly recentChanges: readonly string[];
  readonly openDecisions: readonly DecisionRecord[];
  readonly manifestEngines: readonly string[];
  readonly frameworkVersionLabel: string;
  readonly generatedAt: string;
}

const FLOOR_CONSTRAINTS: Readonly<Record<string, string>> = {
  accessibility: 'WCAG 2.2 AA',
  security: 'Security — defensible against hostile input',
  performance: 'Performance budget (Core Web Vitals)',
  legal: 'Legal compliance and required disclosures',
};

const DIRECTORY_PURPOSES: Readonly<Record<string, string>> = {
  app: 'Application routes and pages',
  src: 'Application source',
  components: 'Reusable UI components',
  lib: 'Shared utilities',
  public: 'Static assets',
  styles: 'Global styles and tokens',
  '.cef': 'CEF configuration, memory, and generated context',
  tests: 'Automated tests',
};

/**
 * Boots the Runtime for a project, resolves its framework knowledge, and maps both into the pure
 * {@link ProjectSnapshot} the Claude Integration Engine consumes. This adapter is the only place
 * that knows about the manifest and the Framework Loader; the engine stays decoupled from both.
 */
export class ClaudeProjectAssembler {
  private readonly artifactManager = new ClaudeArtifactManager();
  private readonly serializer = new ClaudeSerializer();

  constructor(
    private readonly fs: FileSystem,
    private readonly clock: Clock,
  ) {}

  async assemble(root: string): Promise<Result<AssembledProject, CefError>> {
    const booted = await new Runtime().boot({
      projectRoot: root,
      fs: this.fs,
      logger: new SilentLogger(),
    });
    if (isErr(booted)) {
      return booted;
    }
    const session = booted.value;

    const loader = new FrameworkLoader({ fs: this.fs, rootDir: frameworkRoot() });
    const resolved = await loader.resolveForEngines(session.engines);
    if (isErr(resolved)) {
      return resolved;
    }

    const snapshot = this.toSnapshot(session, resolved.value);
    const generatedAt = this.clock.now().toISOString();

    const history = await this.loadHistory(root);
    const artifacts = await this.loadArtifacts(root, session);
    const workSession = new ClaudeSessionManager(this.clock).start(this.sessionId(generatedAt));

    return ok({
      root,
      snapshot,
      session: workSession,
      history,
      artifacts,
      progress: EMPTY_PROGRESS,
      recentChanges: this.recentChanges(artifacts),
      openDecisions: [],
      manifestEngines: session.manifest.engines,
      frameworkVersionLabel: `${session.manifest.frameworkVersion}.0`,
      generatedAt,
    });
  }

  private toSnapshot(session: ExecutionSession, resolved: ResolvedFramework): ProjectSnapshot {
    const { manifest, project } = session;
    const description = manifest.metadata?.['description'];
    const capabilities: readonly CapabilityRef[] = resolved.modules.map((module) => ({
      id: module.metadata.id,
      name: module.metadata.name,
      category: module.metadata.category,
      summary: module.metadata.summary,
      tokenEstimate: module.metadata.tokenEstimate,
    }));

    return {
      name: manifest.project.name,
      type: manifest.project.type,
      description: typeof description === 'string' ? description : undefined,
      cefVersion: manifest.project.cefVersion ?? '0.0.0',
      stack: {
        framework: project.framework,
        frameworkVersion: manifest.frameworkVersion,
        language: project.language ?? 'typescript',
        packageManager: project.packageManager ?? 'pnpm',
        buildSystem: project.buildSystem,
        deployment: project.deployment,
        database: project.database,
      },
      engines: session.engines,
      addedEngines: session.addedEngines,
      capabilities,
      skills: session.skills,
      mcp: session.mcp,
      standards: resolved.standards.map((standard) => ({
        id: standard.id,
        name: standard.name,
        specPath: standard.specFile,
      })),
      prompts: resolved.prompts.map((prompt) => ({
        id: prompt.id,
        name: prompt.name,
        prompt: prompt.prompt,
      })),
      directories: this.directories(manifest.generatedFiles ?? []),
      constraints: this.constraints(session.engines),
      capabilityTokenEstimate: resolved.totalTokenEstimate,
    };
  }

  private constraints(engines: readonly string[]): readonly string[] {
    const constraints = engines
      .map((engine) => FLOOR_CONSTRAINTS[engine])
      .filter((constraint): constraint is string => constraint !== undefined);
    constraints.push('No placeholder or fabricated content');
    return [...new Set(constraints)];
  }

  private directories(generatedFiles: readonly string[]): readonly DirectoryEntry[] {
    const tops = new Set<string>();
    for (const file of generatedFiles) {
      const top = file.replace(/\\/g, '/').split('/')[0];
      if (top && !top.includes('.')) {
        tops.add(top);
      }
    }
    return [...tops]
      .sort()
      .map((path) => ({ path, purpose: DIRECTORY_PURPOSES[path] ?? 'Project files' }));
  }

  private recentChanges(artifacts: ArtifactIndex): readonly string[] {
    return artifacts.artifacts.slice(0, 6).map((artifact) => `Generated ${artifact.path}`);
  }

  private sessionId(generatedAt: string): string {
    return `session-${generatedAt.replace(/[:.]/g, '-')}`;
  }

  private async loadHistory(root: string): Promise<SessionHistory> {
    const path = resolve(root, SESSION_HISTORY_PATH);
    if (!(await this.fs.exists(path))) {
      return EMPTY_HISTORY;
    }
    return this.serializer.parseHistory(await this.fs.readFile(path));
  }

  private async loadArtifacts(root: string, session: ExecutionSession): Promise<ArtifactIndex> {
    const path = resolve(root, ARTIFACT_INDEX_PATH);
    let index = EMPTY_ARTIFACT_INDEX;
    if (await this.fs.exists(path)) {
      index = this.serializer.parseArtifacts(await this.fs.readFile(path));
    }
    const createdAt = session.manifest.project.created ?? this.clock.now().toISOString();
    const generated = session.manifest.generatedFiles ?? [];
    return this.artifactManager.addAll(
      index,
      generated.map((file) => ({ path: file, createdAt })),
    );
  }
}
