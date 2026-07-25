import type { Framework } from '@cef/core';
import { stringify as stringifyYaml } from 'yaml';
import type { TemplateContext } from '../context.js';
import { jsonFile } from './util.js';

const DEFAULT_PORT = 3000;

const BUILD_SYSTEMS: Record<Framework, string> = {
  nextjs: 'next',
  react: 'vite',
  astro: 'astro',
  remix: 'vite',
};

/** Canonical runtime execution order; the runtime config lists only the enabled subset. */
const EXECUTION_ORDER = [
  'core',
  'architecture',
  'platform',
  'design',
  'experience',
  'components',
  'motion',
  'content',
  'commerce',
  'seo',
  'ai-seo',
  'accessibility',
  'performance',
  'security',
  'legal',
  'docker',
  'deployment',
  'validation',
] as const;

/** `.cef/manifest.yaml` — the project's declared capabilities and metadata. */
export function manifestYaml(ctx: TemplateContext, generatedFiles: readonly string[]): string {
  const { spec, capabilities, cefVersion, createdAt } = ctx;
  const manifest = {
    frameworkVersion: 2,
    project: {
      name: spec.name,
      type: spec.projectType,
      created: createdAt,
      cefVersion,
    },
    engines: capabilities.engines,
    skills: capabilities.skills,
    mcp: capabilities.mcp,
    metadata: {
      framework: spec.framework,
      language: spec.language,
      packageManager: spec.packageManager,
      styling: spec.styling,
      uiLibrary: spec.uiLibrary,
      animation: spec.animation,
      database: spec.database,
      orm: spec.orm,
      authentication: spec.authentication,
      cms: spec.cms,
    },
    docker: {
      enabled: true,
      port: DEFAULT_PORT,
    },
    features: {
      adminPanel: spec.adminPanel,
      blog: spec.blog,
      commerce: spec.commerce,
      legalPages: spec.generateLegalPages,
      aiSeo: spec.generateAiSeo,
      githubActions: spec.generateGithubActions,
    },
    deployment: {
      target: spec.deploymentTarget,
    },
    languages: {
      primary: spec.primaryLanguage,
      additional: [...spec.additionalLanguages],
      country: spec.country,
    },
    generatedFiles: [...generatedFiles].sort(),
  };
  return stringifyYaml(manifest, { indent: 2 });
}

/** `.cef/project.json` — machine-readable project configuration. */
export function projectJson(ctx: TemplateContext): string {
  const { spec, cefVersion, createdAt } = ctx;
  return jsonFile({
    name: spec.name,
    framework: spec.framework,
    version: '0.1.0',
    createdDate: createdAt,
    cefVersion,
    packageManager: spec.packageManager,
    language: spec.language,
    buildSystem: BUILD_SYSTEMS[spec.framework],
    deployment: spec.deploymentTarget,
    database: spec.database,
    orm: spec.orm,
    cms: spec.cms,
    authentication: spec.authentication,
    features: {
      adminPanel: spec.adminPanel,
      blog: spec.blog,
      commerce: spec.commerce,
      legalPages: spec.generateLegalPages,
      aiSeo: spec.generateAiSeo,
      githubActions: spec.generateGithubActions,
      docker: true,
    },
  });
}

/** `.cef/runtime.json` — enabled runtime modules, plugin config, order, and pipeline. */
export function runtimeJson(ctx: TemplateContext): string {
  const enabled = new Set(ctx.capabilities.engines);
  const executionOrder = EXECUTION_ORDER.filter((engine) => enabled.has(engine));
  const plugins = Object.fromEntries(
    ctx.capabilities.engines.map((engine) => [engine, { enabled: true }]),
  );
  return jsonFile({
    frameworkVersion: 2,
    enabledModules: ctx.capabilities.engines,
    plugins,
    executionOrder,
    validationPipeline: [
      'build',
      'unit',
      'integration',
      'accessibility',
      'performance',
      'seo',
      'security',
      'docker',
    ],
  });
}

/** `.cef/memory.md` — the persistent project memory Claude Code reads and updates. */
export function memoryMd(ctx: TemplateContext): string {
  const { spec, createdAt } = ctx;
  const features = [
    spec.adminPanel ? 'admin panel' : null,
    spec.blog ? 'blog' : null,
    spec.commerce ? 'commerce' : null,
    spec.authentication !== 'none' ? `auth (${spec.authentication})` : null,
    spec.cms !== 'none' ? `CMS (${spec.cms})` : null,
  ].filter((value): value is string => value !== null);

  return `# Project Memory — ${spec.name}

> Persistent institutional memory for this project. Read before deciding; update after
> significant work. Managed with the CEF Memory Engine.

## Project summary

A **${spec.projectType}** built with **${spec.framework}** (${spec.language}).
Created ${createdAt} with CEF ${ctx.cefVersion}.
Primary language: ${spec.primaryLanguage}${
    spec.additionalLanguages.length > 0 ? `; also ${spec.additionalLanguages.join(', ')}` : ''
  }. Country: ${spec.country}.

## Architecture decisions

- Framework: **${spec.framework}**; styling: **${spec.styling}**; UI: **${spec.uiLibrary}**; animation: **${spec.animation}**.
- Data: **${spec.database}**${spec.orm !== 'none' ? ` via **${spec.orm}**` : ''}.
- Deployment target: **${spec.deploymentTarget}**; Docker enabled (port ${DEFAULT_PORT}).
- Enabled engines: ${ctx.capabilities.engines.join(', ')}.

## User requirements

- Project type: ${spec.projectType}.
- Features: ${features.length > 0 ? features.join(', ') : 'core site only'}.
- Legal pages: ${spec.generateLegalPages ? 'yes' : 'no'}; AI-SEO files: ${spec.generateAiSeo ? 'yes' : 'no'}.

## Outstanding tasks

- [ ] Install dependencies (\`${spec.packageManager} install\`).
- [ ] Implement the first page and core layout.
- [ ] Replace generated legal copy with reviewed, jurisdiction-correct text.

## Future ideas

- Capture ideas here as they arise, with the reason they matter.

## Known constraints

- Legal documents are generated as drafts and MUST be reviewed by a qualified legal
  professional before publication.
`;
}
