import type {
  DecisionRecord,
  IssueRecord,
  ProjectSnapshot,
  SessionState,
} from '../models/index.js';

/**
 * Derives architecture decisions and known issues from authoritative state, so memory never
 * becomes a second source of truth. Decisions come from the resolved stack and engines; issues
 * come from the session's recorded errors. Both are deterministic functions of their input.
 */
export class MemoryDeriver {
  deriveDecisions(snapshot: ProjectSnapshot): readonly DecisionRecord[] {
    const decisions: DecisionRecord[] = [];
    const { stack } = snapshot;

    decisions.push({
      id: 'framework',
      title: `Framework: ${stack.framework}`,
      rationale: 'Chosen at scaffold time; server-first rendering is the default.',
    });
    decisions.push({
      id: 'language',
      title: `Language: ${stack.language}`,
      rationale: 'Type safety is a non-negotiable; strict mode is on.',
    });
    decisions.push({
      id: 'package-manager',
      title: `Package manager: ${stack.packageManager}`,
      rationale: 'Reproducible installs from a committed lockfile.',
    });
    if (stack.deployment !== undefined) {
      decisions.push({
        id: 'deployment',
        title: `Deployment target: ${stack.deployment}`,
        rationale: 'Releases are reproducible and reversible.',
      });
    }
    if (stack.database !== undefined) {
      decisions.push({
        id: 'database',
        title: `Database: ${stack.database}`,
        rationale: 'Persistence chosen at scaffold time.',
      });
    }
    if (snapshot.engines.includes('architecture')) {
      decisions.push({
        id: 'server-first',
        title: 'Server-first architecture',
        rationale: 'Less client JavaScript, faster loads, secrets stay on the server.',
      });
    }
    return decisions;
  }

  deriveIssues(session: SessionState): readonly IssueRecord[] {
    return session.errors.map((error, index) => ({
      id: `issue-${index + 1}`,
      severity: 'major',
      text: error,
    }));
  }
}
