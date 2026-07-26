/**
 * The `.cef/` on-disk layout the Claude Integration Engine reads and writes. Every path is
 * relative to the project root and forward-slashed, so generated artifacts are deterministic
 * across platforms. These constants are the single source of truth for the layout.
 */
export const CEF_DIR = '.cef';

/** The composite, token-optimized context Claude reads first. */
export const CONTEXT_PATH = '.cef/generated/context.md';

/** Project memory — concise, regenerated deterministically, never hand-edited. */
export const MEMORY_DIR = '.cef/memory';

/** Session tracking — the current session plus append-only history. */
export const SESSION_DIR = '.cef/session';
export const SESSION_CURRENT_PATH = '.cef/session/current-session.md';
export const SESSION_HISTORY_PATH = '.cef/session/history.json';
export const SESSION_ACTIVE_PATH = '.cef/session/active-context.json';

/** The implementation roadmap. */
export const ROADMAP_PATH = '.cef/roadmap.md';

/** The artifact index. */
export const ARTIFACTS_DIR = '.cef/artifacts';
export const ARTIFACT_INDEX_PATH = '.cef/artifacts/index.json';
