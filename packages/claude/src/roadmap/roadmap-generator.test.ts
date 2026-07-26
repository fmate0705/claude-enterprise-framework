import { describe, expect, it } from 'vitest';
import { buildSnapshot } from '../testing/fixtures.js';
import { ClaudeRoadmapGenerator } from './roadmap-generator.js';
import { RoadmapRenderer } from './roadmap-renderer.js';

describe('ClaudeRoadmapGenerator', () => {
  const generator = new ClaudeRoadmapGenerator();
  const snapshot = buildSnapshot();

  it('plans one milestone per engine, all upcoming with no progress', () => {
    const roadmap = generator.generate(snapshot);
    expect(roadmap.milestones).toHaveLength(snapshot.engines.length);
    expect(roadmap.completionPercent).toBe(0);
    expect(roadmap.upcomingCount).toBe(snapshot.engines.length);
    expect(roadmap.nextAction).toBeDefined();
  });

  it('marks a milestone completed when all its tasks are done and computes percent', () => {
    const plan = generator.generate(snapshot);
    const first = plan.milestones[0];
    expect(first).toBeDefined();
    if (!first) {
      return;
    }
    const roadmap = generator.generate(snapshot, {
      doneTaskIds: first.tasks.map((task) => task.id),
      activeMilestoneId: undefined,
      blockedMilestoneIds: [],
    });
    expect(roadmap.milestones[0]?.status).toBe('completed');
    expect(roadmap.completedCount).toBe(1);
    expect(roadmap.completionPercent).toBeGreaterThan(0);
    // The next action is the first open task in the next milestone.
    expect(roadmap.nextAction).not.toBe(first.tasks[0]?.title);
  });

  it('honors blocked milestones and skips them when choosing the next action', () => {
    const plan = generator.generate(snapshot);
    const firstId = plan.milestones[0]?.id;
    const secondTitle = plan.milestones[1]?.tasks[0]?.title;
    expect(firstId).toBeDefined();
    const roadmap = generator.generate(snapshot, {
      doneTaskIds: [],
      activeMilestoneId: undefined,
      blockedMilestoneIds: firstId ? [firstId] : [],
    });
    expect(roadmap.blockedCount).toBe(1);
    expect(roadmap.nextAction).toBe(secondTitle);
  });

  it('renders a roadmap document with a completion header', () => {
    const roadmap = generator.generate(snapshot);
    const rendered = new RoadmapRenderer().render(roadmap);
    expect(rendered.path).toBe('.cef/roadmap.md');
    expect(rendered.content).toContain('% complete');
    expect(rendered.tokenEstimate).toBeGreaterThan(0);
  });
});
