import type { TemplateContext } from '../context.js';

export function claudeMd(ctx: TemplateContext): string {
  const { spec, capabilities } = ctx;
  return `# ${spec.name}

Project instructions for Claude Code. This is a **${spec.projectType}** built with
**${spec.framework}** (${spec.language}), scaffolded by the Claude Enterprise Framework (CEF).

## How this project is organized

- \`.cef/\` — CEF configuration and memory. Start here.
  - \`manifest.yaml\` — enabled engines, skills, MCP servers, and project metadata.
  - \`memory.md\` — persistent project memory. **Read it before making decisions; update it after significant work.**
  - \`project.json\` / \`runtime.json\` — machine-readable project and runtime configuration.
- \`app/\` — routes and pages. \`components/\` — reusable UI. \`features/\` — feature modules.
- \`lib/\` — utilities and clients. \`hooks/\` — React hooks. \`types/\` — shared types.
- \`content/\` — content and copy${spec.generateLegalPages ? ' (including legal pages under `content/legal/`)' : ''}. \`docs/\` — documentation.
- \`tests/\` — tests. \`docker/\` — container support. \`public/\` — static assets.

## Stack

- Framework: **${spec.framework}** · Language: **${spec.language}** · Package manager: **${spec.packageManager}**
- Styling: **${spec.styling}** · UI: **${spec.uiLibrary}** · Animation: **${spec.animation}**
- Data: **${spec.database}**${spec.orm !== 'none' ? ` (ORM: **${spec.orm}**)` : ''} · Auth: **${spec.authentication}** · CMS: **${spec.cms}**
- Deployment: **${spec.deploymentTarget}** · Docker: enabled (port 3000)

## Enabled CEF engines

${capabilities.engines.map((engine) => `- ${engine}`).join('\n')}

## Conventions

- Follow the enabled engines' standards. Accessibility (WCAG 2.2 AA), security, performance,
  and legal are **floors** — never trade them away.
- Prefer server-first rendering; keep client JavaScript minimal and justified.
- Every page ships its empty, loading, and error states. No placeholder content.
- Legal documents in this project are **drafts** and must be reviewed by a qualified legal
  professional before publication.

## Getting started

\`\`\`bash
${spec.packageManager} install
${spec.packageManager} run dev
\`\`\`
`;
}

export function readmeMd(ctx: TemplateContext): string {
  const { spec } = ctx;
  const run = spec.packageManager === 'npm' ? 'npm run' : spec.packageManager;
  return `# ${spec.name}

A ${spec.projectType} built with ${spec.framework} and ${spec.language}, scaffolded by the
Claude Enterprise Framework (CEF).

## Getting started

\`\`\`bash
${spec.packageManager} install
${run} dev
\`\`\`

The app runs on http://localhost:3000.

## Scripts

- \`${run} dev\` — start the development server
- \`${run} build\` — build for production
- \`${spec.framework === 'nextjs' || spec.framework === 'remix' ? `${run} start` : `${run} preview`}\` — run the production build

## Docker

\`\`\`bash
docker compose up --build
\`\`\`

## Project structure

This project follows the CEF conventions. See \`CLAUDE.md\` and \`.cef/manifest.yaml\` for the
enabled engines and configuration.

## Deployment

Target: **${spec.deploymentTarget}**. See \`.cef/project.json\` for the full configuration.
`;
}
