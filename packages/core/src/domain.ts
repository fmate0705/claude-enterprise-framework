/**
 * The project domain model: the choices a user makes and the resolved specification a
 * generator consumes. Enums are `as const` string unions so they are both runtime values
 * (for wizard option lists and validation) and compile-time types.
 */

export const PROJECT_TYPES = [
  'landing-page',
  'corporate',
  'portfolio',
  'saas',
  'dashboard',
  'ecommerce',
  'blog',
  'documentation',
  'marketing',
  'api',
  'fullstack',
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const FRAMEWORKS = ['nextjs', 'react', 'astro', 'remix'] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const LANGUAGES = ['typescript', 'javascript'] as const;
export type Language = (typeof LANGUAGES)[number];

export const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const;
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export const STYLING = [
  'tailwind',
  'css-modules',
  'vanilla-extract',
  'styled-components',
  'none',
] as const;
export type Styling = (typeof STYLING)[number];

export const UI_LIBRARIES = [
  'shadcn',
  'radix',
  'magic-ui',
  'aceternity',
  'motion-primitives',
  'none',
] as const;
export type UiLibrary = (typeof UI_LIBRARIES)[number];

export const ANIMATION = ['framer-motion', 'motion-one', 'gsap', 'none'] as const;
export type Animation = (typeof ANIMATION)[number];

export const DATABASES = ['postgres', 'mysql', 'sqlite', 'mongodb', 'none'] as const;
export type Database = (typeof DATABASES)[number];

export const ORMS = ['prisma', 'drizzle', 'none'] as const;
export type Orm = (typeof ORMS)[number];

export const AUTH = ['next-auth', 'clerk', 'lucia', 'supabase', 'none'] as const;
export type Authentication = (typeof AUTH)[number];

export const CMS = ['sanity', 'contentful', 'payload', 'none'] as const;
export type Cms = (typeof CMS)[number];

export const DEPLOYMENT_TARGETS = [
  'vercel',
  'netlify',
  'docker',
  'node',
  'cloudflare',
  'aws',
] as const;
export type DeploymentTarget = (typeof DEPLOYMENT_TARGETS)[number];

/**
 * A fully-resolved project specification. Every wizard field has a concrete value here;
 * there are no optionals, so a generator never has to guess a default.
 */
export interface ProjectSpec {
  readonly name: string;
  readonly projectType: ProjectType;
  readonly framework: Framework;
  readonly language: Language;
  readonly packageManager: PackageManager;
  readonly styling: Styling;
  readonly uiLibrary: UiLibrary;
  readonly animation: Animation;
  readonly database: Database;
  readonly orm: Orm;
  readonly authentication: Authentication;
  readonly adminPanel: boolean;
  readonly cms: Cms;
  readonly blog: boolean;
  readonly commerce: boolean;
  readonly docker: boolean;
  readonly deploymentTarget: DeploymentTarget;
  readonly country: string;
  readonly primaryLanguage: string;
  readonly additionalLanguages: readonly string[];
  readonly generateLegalPages: boolean;
  readonly generateAiSeo: boolean;
  readonly generateGithubActions: boolean;
  readonly initGit: boolean;
}

/** Capabilities derived from a spec by the capability factory (engines/skills/MCPs). */
export interface DerivedCapabilities {
  readonly engines: readonly string[];
  readonly skills: readonly string[];
  readonly mcp: readonly string[];
}
