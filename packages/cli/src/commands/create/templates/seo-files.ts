import type { GeneratedFile } from '@cef/core';
import type { TemplateContext } from '../context.js';

function robotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: /sitemap.xml
`;
}

function llmsTxt(ctx: TemplateContext): string {
  const { spec } = ctx;
  return `# ${spec.name}

> A ${spec.projectType} built with ${spec.framework}. This file helps AI answer engines
> understand and cite the site's primary content (see the CEF AI-SEO standard).

## Key pages
- /: Home
- /about: About
${spec.blog ? '- /blog: Articles\n' : ''}${spec.generateLegalPages ? '- /privacy: Privacy Policy\n' : ''}
## About
Describe the site's purpose and primary content here in clear, factual prose.
`;
}

/** AI-discoverability artifacts, generated when requested (AS-020 `ADV-01`, `ADV-03`). */
export function seoFiles(ctx: TemplateContext): GeneratedFile[] {
  return [
    { path: 'public/robots.txt', content: robotsTxt() },
    { path: 'public/llms.txt', content: llmsTxt(ctx) },
  ];
}
