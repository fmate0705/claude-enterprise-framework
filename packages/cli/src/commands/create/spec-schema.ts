import {
  ANIMATION,
  AUTH,
  CMS,
  DATABASES,
  DEPLOYMENT_TARGETS,
  FRAMEWORKS,
  LANGUAGES,
  ORMS,
  PACKAGE_MANAGERS,
  PROJECT_TYPES,
  STYLING,
  UI_LIBRARIES,
} from '@cef/core';
import type { ProjectSpec } from '@cef/core';
import { z } from 'zod';

/** Builds a zod enum from a readonly string-union constant while keeping literal types. */
const enumOf = <T extends string>(values: readonly T[]): z.ZodEnum<[T, ...T[]]> =>
  z.enum(values as unknown as [T, ...T[]]);

export const projectNameSchema = z
  .string()
  .trim()
  .min(1, 'A project name is required.')
  .max(64, 'Keep the project name under 64 characters.')
  .regex(
    /^[a-z0-9][a-z0-9-]*$/,
    'Use lowercase letters, digits, and hyphens only (e.g. "law-firm").',
  );

/** The authoritative schema for a fully-resolved project specification. */
export const projectSpecSchema = z.object({
  name: projectNameSchema,
  projectType: enumOf(PROJECT_TYPES),
  framework: enumOf(FRAMEWORKS),
  language: enumOf(LANGUAGES),
  packageManager: enumOf(PACKAGE_MANAGERS),
  styling: enumOf(STYLING),
  uiLibrary: enumOf(UI_LIBRARIES),
  animation: enumOf(ANIMATION),
  database: enumOf(DATABASES),
  orm: enumOf(ORMS),
  authentication: enumOf(AUTH),
  adminPanel: z.boolean(),
  cms: enumOf(CMS),
  blog: z.boolean(),
  commerce: z.boolean(),
  docker: z.boolean(),
  deploymentTarget: enumOf(DEPLOYMENT_TARGETS),
  country: z.string().trim().min(1),
  primaryLanguage: z.string().trim().min(1),
  additionalLanguages: z.array(z.string().trim().min(1)),
  generateLegalPages: z.boolean(),
  generateAiSeo: z.boolean(),
  generateGithubActions: z.boolean(),
  initGit: z.boolean(),
});

/**
 * The defaults used for every field not answered interactively (the `--yes` path and the
 * baseline the wizard pre-selects). A complete `ProjectSpec`, so the type checker guarantees
 * no field is forgotten.
 */
export const DEFAULT_SPEC: ProjectSpec = {
  name: 'my-app',
  projectType: 'landing-page',
  framework: 'nextjs',
  language: 'typescript',
  packageManager: 'pnpm',
  styling: 'tailwind',
  uiLibrary: 'shadcn',
  animation: 'framer-motion',
  database: 'none',
  orm: 'none',
  authentication: 'none',
  adminPanel: false,
  cms: 'none',
  blog: false,
  commerce: false,
  docker: true,
  deploymentTarget: 'vercel',
  country: 'United States',
  primaryLanguage: 'en',
  additionalLanguages: [],
  generateLegalPages: true,
  generateAiSeo: true,
  generateGithubActions: true,
  initGit: true,
};
