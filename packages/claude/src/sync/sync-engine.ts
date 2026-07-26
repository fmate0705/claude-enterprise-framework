import type { FileSystem, GeneratedFile } from '@cef/core';
import { ARTIFACT_INDEX_PATH, SESSION_ACTIVE_PATH, SESSION_HISTORY_PATH } from '../paths.js';
import { ClaudeContextGenerator } from '../context/index.js';
import { ClaudeMemoryManager } from '../memory/index.js';
import { ClaudeRoadmapGenerator, RoadmapRenderer } from '../roadmap/index.js';
import { ClaudeSessionManager } from '../session/index.js';
import { ClaudeSerializer } from '../serialization/index.js';
import type {
  ArtifactIndex,
  ClaudeContextInput,
  ProjectSnapshot,
  Roadmap,
  RoadmapProgress,
  SessionHistory,
  SessionState,
} from '../models/index.js';

export interface SyncInput {
  readonly snapshot: ProjectSnapshot;
  readonly progress: RoadmapProgress;
  readonly session: SessionState;
  readonly history: SessionHistory;
  readonly artifacts: ArtifactIndex;
  readonly openDecisions: ClaudeContextInput['openDecisions'];
  readonly recentChanges: readonly string[];
  readonly generatedAt: string;
}

export interface SyncPlan {
  readonly files: readonly GeneratedFile[];
  readonly roadmap: Roadmap;
}

export interface SyncResult {
  readonly filesWritten: number;
  readonly paths: readonly string[];
}

/**
 * The synchronization engine. It composes every generator into a single deterministic plan of
 * files to write — context, memory, roadmap, session, and indexes — so that after any project
 * change one call rewrites every generated artifact consistently. It owns no generation logic of
 * its own; it only orchestrates, which is what keeps the outputs in sync and free of duplication.
 */
export class ClaudeSyncEngine {
  constructor(
    private readonly context = new ClaudeContextGenerator(),
    private readonly memory = new ClaudeMemoryManager(),
    private readonly roadmapGenerator = new ClaudeRoadmapGenerator(),
    private readonly roadmapRenderer = new RoadmapRenderer(),
    private readonly session = new ClaudeSessionManager(),
    private readonly serializer = new ClaudeSerializer(),
  ) {}

  plan(input: SyncInput): SyncPlan {
    const roadmap = this.roadmapGenerator.generate(input.snapshot, input.progress);
    const contextInput: ClaudeContextInput = {
      snapshot: input.snapshot,
      roadmap,
      session: input.session,
      artifacts: input.artifacts,
      openDecisions: input.openDecisions,
      recentChanges: input.recentChanges,
      generatedAt: input.generatedAt,
    };

    const files: GeneratedFile[] = [];

    const context = this.context.generate(contextInput);
    files.push({ path: context.path, content: context.content });

    for (const document of this.memory.render({
      snapshot: input.snapshot,
      roadmap,
      session: input.session,
    })) {
      files.push({ path: document.path, content: document.content });
    }

    const roadmapFile = this.roadmapRenderer.render(roadmap);
    files.push({ path: roadmapFile.path, content: roadmapFile.content });

    const currentSession = this.session.render(input.session);
    files.push({ path: currentSession.path, content: currentSession.content });

    files.push({
      path: SESSION_HISTORY_PATH,
      content: this.serializer.serializeHistory(input.history),
    });
    files.push({
      path: SESSION_ACTIVE_PATH,
      content: this.serializer.serializeActiveContext(input.snapshot, roadmap, input.session),
    });
    files.push({
      path: ARTIFACT_INDEX_PATH,
      content: this.serializer.serializeArtifacts(input.artifacts),
    });

    return { files, roadmap };
  }

  /** Writes a plan under `root`, creating directories as needed. */
  async apply(fs: FileSystem, root: string, plan: SyncPlan): Promise<SyncResult> {
    const paths: string[] = [];
    for (const file of plan.files) {
      const absolute = joinPath(root, file.path);
      await fs.mkdir(dirOf(absolute));
      await fs.writeFile(absolute, file.content);
      paths.push(file.path);
    }
    return { filesWritten: paths.length, paths };
  }
}

function joinPath(root: string, relative: string): string {
  const trimmedRoot = root.replace(/[\\/]+$/, '');
  return `${trimmedRoot}/${relative}`;
}

function dirOf(path: string): string {
  const normalized = path.replace(/\\/g, '/');
  const slash = normalized.lastIndexOf('/');
  return slash > 0 ? normalized.slice(0, slash) : normalized;
}
