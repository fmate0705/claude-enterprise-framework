import type { Milestone, ProjectSnapshot, RoadmapTask } from '../models/index.js';

/**
 * Divides a project's resolved engines into an ordered implementation plan: one milestone per
 * engine, each with a small, concrete task set. The plan is derived purely from the snapshot and
 * is deterministic — the same engines always produce the same milestones and task ids. Progress
 * is applied separately by the {@link ClaudeRoadmapGenerator}, so planning stays side-effect free.
 */
export class MilestonePlanner {
  /** Concrete task titles for engines whose work is well defined; others use a sensible default. */
  private static readonly TASK_TEMPLATES: Readonly<Record<string, readonly string[]>> = {
    core: ['Establish constitution and rules', 'Wire memory and decision log'],
    architecture: ['Define structure and boundaries', 'Record architecture decisions'],
    platform: ['Configure framework and tooling', 'Set up build pipeline'],
    design: ['Resolve design tokens', 'Define component variants'],
    frontend: ['Build page shells', 'Implement interactive components'],
    components: ['Build the component library', 'Document component states'],
    experience: ['Map primary user flows', 'Validate interaction patterns'],
    motion: ['Define motion tokens', 'Apply purposeful, reduced-motion-safe transitions'],
    accessibility: ['Audit semantics and focus order', 'Verify WCAG 2.2 AA conformance'],
    seo: ['Author metadata and canonical URLs', 'Emit structured data and sitemap'],
    'ai-seo': ['Structure content for answer engines', 'Publish llms.txt'],
    content: ['Draft real copy', 'Structure content for scanning'],
    performance: ['Set the performance budget', 'Optimize Core Web Vitals'],
    security: ['Validate inputs at boundaries', 'Set security headers and secrets policy'],
    testing: ['Write behavior tests for critical paths', 'Cover empty and error states'],
    validation: ['Run browser and responsive checks', 'Clear review blockers'],
    docker: ['Author the reproducible Dockerfile', 'Verify a clean build'],
    deployment: ['Configure the release pipeline', 'Verify rollback'],
    legal: ['Draft required legal pages', 'Confirm review by qualified counsel'],
    assets: ['Produce on-brand imagery', 'Optimize and size assets'],
    commerce: ['Model products and pricing', 'Implement secure checkout'],
    operations: ['Configure monitoring', 'Document runbooks'],
    ai: ['Integrate AI capabilities', 'Guard AI trust boundaries'],
  };

  plan(snapshot: ProjectSnapshot): readonly Milestone[] {
    return snapshot.engines.map((engine, index) => this.milestone(engine, index));
  }

  private milestone(engine: string, index: number): Milestone {
    const id = `m${String(index + 1).padStart(2, '0')}-${engine}`;
    const titles = MilestonePlanner.TASK_TEMPLATES[engine] ?? [
      `Plan ${humanize(engine)}`,
      `Implement ${humanize(engine)}`,
      `Review ${humanize(engine)}`,
    ];
    const tasks: readonly RoadmapTask[] = titles.map((title, taskIndex) => ({
      id: `${id}:${taskIndex}`,
      title,
      done: false,
    }));
    return {
      id,
      name: `${humanize(engine)} capability`,
      status: 'upcoming',
      engine,
      tasks,
    };
  }
}

/** Turns a kebab-case engine id into a Title Case label. */
export function humanize(id: string): string {
  return id
    .split(/[-_]/)
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
