import type { GeneratedFile } from '@cef/core';
import type { Blueprint } from '../planning/blueprint.js';
import {
  BLUEPRINT_JSON_PATH,
  CONTENT_STRATEGY_PATH,
  FEATURE_MATRIX_PATH,
  PAGE_MAP_PATH,
  PERFORMANCE_PLAN_PATH,
  PROJECT_PLAN_PATH,
  SEO_STRATEGY_PATH,
} from '../paths.js';

/**
 * Serializes a blueprint into the seven `.cef/generated/` outputs — machine-readable JSON for
 * tooling and human-readable Markdown for review. Rendering is deterministic; the same blueprint
 * always produces the same bytes.
 */
export class BlueprintSerializer {
  serialize(blueprint: Blueprint): readonly GeneratedFile[] {
    return [
      { path: BLUEPRINT_JSON_PATH, content: json(blueprint) },
      { path: PAGE_MAP_PATH, content: json({ pages: blueprint.pages }) },
      { path: FEATURE_MATRIX_PATH, content: json(blueprint.features) },
      { path: PROJECT_PLAN_PATH, content: this.projectPlan(blueprint) },
      { path: CONTENT_STRATEGY_PATH, content: this.contentStrategy(blueprint) },
      { path: SEO_STRATEGY_PATH, content: this.seoStrategy(blueprint) },
      { path: PERFORMANCE_PLAN_PATH, content: this.performancePlan(blueprint) },
    ];
  }

  private projectPlan(blueprint: Blueprint): string {
    const lines: string[] = [];
    lines.push(`# ${blueprint.input.projectName} — Implementation Plan`);
    lines.push('');
    lines.push(
      `> Generated ${blueprint.generatedAt}. Plan only — no code is generated in this phase.`,
    );
    lines.push('');
    lines.push('## Business');
    lines.push(`- Industry: ${blueprint.business.industryName}`);
    lines.push(`- Business model: ${blueprint.business.businessModel}`);
    lines.push(`- Complexity: ${blueprint.business.complexity}`);
    lines.push(`- Positioning: ${blueprint.business.positioning}`);
    lines.push('');
    lines.push('## Objectives');
    for (const objective of blueprint.business.objectives) {
      lines.push(`- ${objective}`);
    }
    lines.push('');
    lines.push(`## Pages (${blueprint.pages.length})`);
    for (const page of blueprint.pages) {
      lines.push(`- **${page.name}** (${page.priority}) — ${page.purpose}`);
    }
    lines.push('');
    lines.push(`## Features (${blueprint.features.features.length})`);
    for (const feature of blueprint.features.features) {
      lines.push(
        `- **${feature.name}** (${feature.priority}, ${feature.complexity}) — ${feature.rationale}`,
      );
    }
    lines.push('');
    lines.push('## Integrations');
    for (const integration of blueprint.integrations) {
      lines.push(`- ${integration.name} — ${integration.provider} (${integration.rationale})`);
    }
    lines.push('');
    lines.push('## Recommendations');
    for (const recommendation of blueprint.recommendations) {
      lines.push(
        `- **[${recommendation.priority}] ${recommendation.title}** — ${recommendation.detail}`,
      );
    }
    lines.push('');
    lines.push('## Risks');
    if (blueprint.risks.length === 0) {
      lines.push('- None identified.');
    }
    for (const risk of blueprint.risks) {
      lines.push(`- **${risk.severity}: ${risk.description}** → ${risk.mitigation}`);
    }
    lines.push('');
    lines.push('## Legal');
    for (const page of blueprint.legal.requiredPages) {
      lines.push(`- ${page.name}${page.required ? ' (required)' : ''} — ${page.reason}`);
    }
    lines.push('');
    lines.push(`> ${blueprint.legal.disclaimer}`);
    return `${lines.join('\n')}\n`;
  }

  private contentStrategy(blueprint: Blueprint): string {
    const content = blueprint.content;
    const lines: string[] = ['# Content Strategy', ''];
    lines.push(`Tone of voice: ${content.toneOfVoice}`);
    lines.push('');
    lines.push('## Content hierarchy');
    for (const item of content.contentHierarchy) {
      lines.push(`- ${item}`);
    }
    lines.push('', '## Page objectives');
    for (const summary of content.pageSummaries) {
      lines.push(`- **${summary.page}** — ${summary.objective} (CTA: ${summary.primaryCta})`);
    }
    lines.push('', '## CTA strategy', content.ctaStrategy);
    lines.push('', '## Trust-building');
    for (const item of content.trustStrategy) {
      lines.push(`- ${item}`);
    }
    lines.push('', '## Headline guidance');
    for (const item of content.headlineGuidance) {
      lines.push(`- ${item}`);
    }
    lines.push('', '## Internal linking');
    for (const item of content.internalLinkingRecommendations) {
      lines.push(`- ${item}`);
    }
    return `${lines.join('\n')}\n`;
  }

  private seoStrategy(blueprint: Blueprint): string {
    const seo = blueprint.seo;
    const lines: string[] = ['# SEO Strategy', ''];
    lines.push(`Primary keywords: ${seo.primaryKeywords.join(', ')}`);
    lines.push(`Secondary keywords: ${seo.secondaryKeywords.join(', ')}`);
    lines.push('', '## Content clusters');
    for (const cluster of seo.contentClusters) {
      lines.push(`- **${cluster.pillar}** → ${cluster.supporting.join(', ')}`);
    }
    lines.push('', '## Schema recommendations');
    for (const recommendation of seo.schemaRecommendations) {
      lines.push(`- ${recommendation.page}: ${recommendation.schemaType}`);
    }
    lines.push('', '## Internal linking plan');
    for (const item of seo.internalLinkingPlan) {
      lines.push(`- ${item}`);
    }
    lines.push('', `Canonical: ${seo.canonicalStrategy}`);
    lines.push(`Meta: ${seo.metaStrategy}`);
    return `${lines.join('\n')}\n`;
  }

  private performancePlan(blueprint: Blueprint): string {
    const perf = blueprint.performance;
    const lines: string[] = ['# Performance Plan', ''];
    lines.push(`Rendering: ${perf.renderingStrategy}`);
    lines.push(`Images: ${perf.imageStrategy}`);
    lines.push(`Caching: ${perf.cachingStrategy}`);
    lines.push('', '## Core Web Vitals targets');
    lines.push(`- LCP ≤ ${perf.coreWebVitals.lcpMs}ms`);
    lines.push(`- CLS ≤ ${perf.coreWebVitals.cls}`);
    lines.push(`- INP ≤ ${perf.coreWebVitals.inpMs}ms`);
    lines.push(`- JS budget ≤ ${perf.jsBudgetKb}KB`);
    lines.push('', '## Lazy loading');
    for (const item of perf.lazyLoading) {
      lines.push(`- ${item}`);
    }
    lines.push('', '## Code splitting');
    for (const item of perf.codeSplitting) {
      lines.push(`- ${item}`);
    }
    return `${lines.join('\n')}\n`;
  }
}

function json(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}
