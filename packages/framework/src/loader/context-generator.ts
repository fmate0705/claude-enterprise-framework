import {
  GENERATED_CONTEXT_PATH,
  type GeneratedContext,
  type ProjectContextInput,
  type ResolvedFramework,
} from '../models/index.js';

/**
 * Generates the compact, token-optimized `.cef/generated/context.md` — the primary context
 * file for Claude. It carries summaries and prompt fragments (cheap), and points to detailed
 * specifications that are loaded only on demand.
 */
export class ContextGenerator {
  generate(input: ProjectContextInput, resolved: ResolvedFramework): GeneratedContext {
    const lines: string[] = [];

    lines.push(`# ${input.projectName} — CEF Context`);
    lines.push('');
    lines.push(
      '> Generated, token-optimized context for Claude Code. Regenerate with `cef framework context`.',
    );
    lines.push('');

    lines.push('## Project');
    lines.push(`- Type: ${input.projectType}`);
    lines.push(`- Framework: ${input.framework} (framework version ${input.frameworkVersion})`);
    lines.push('');

    lines.push('## Active capabilities (load order)');
    for (const module of resolved.modules) {
      lines.push(
        `- **${module.metadata.name}** (${module.metadata.category}) — ${module.metadata.summary.trim()}`,
      );
    }
    lines.push('');

    lines.push('## Execution order');
    lines.push(resolved.order.join(' → '));
    lines.push('');

    if (resolved.skills.length > 0) {
      lines.push('## Active skills');
      lines.push(resolved.skills.join(', '));
      lines.push('');
    }
    if (resolved.mcp.length > 0) {
      lines.push('## Active MCP integrations');
      lines.push(resolved.mcp.join(', '));
      lines.push('');
    }

    lines.push('## Implementation guidance');
    for (const fragment of resolved.prompts) {
      lines.push(`- **${fragment.name}:** ${fragment.prompt}`);
    }
    lines.push('');

    lines.push('## Detailed specifications (load on demand)');
    for (const standard of resolved.standards) {
      const location = standard.specFile ? ` — modules/${standard.id}/${standard.specFile}` : '';
      lines.push(`- ${standard.name}${location}`);
    }
    lines.push('');

    if (input.outstandingTasks && input.outstandingTasks.length > 0) {
      lines.push('## Outstanding tasks');
      for (const task of input.outstandingTasks) {
        lines.push(`- [ ] ${task}`);
      }
      lines.push('');
    }

    lines.push('## Architecture summary');
    lines.push(
      `Server-first and token-optimized. Floors — accessibility, security, performance, legal — ` +
        `are non-negotiable. ${resolved.modules.length} capability modules active ` +
        `(~${resolved.totalTokenEstimate} tokens of capability knowledge; full specifications load on demand).`,
    );
    lines.push('');

    const content = lines.join('\n');
    return {
      content,
      path: GENERATED_CONTEXT_PATH,
      tokenEstimate: Math.ceil(content.length / 4),
    };
  }
}
