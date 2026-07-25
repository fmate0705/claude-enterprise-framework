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
import type { Prompter, ProjectSpec, SelectOption } from '@cef/core';
import { projectNameSchema } from './spec-schema.js';

const prettify = (value: string): string => {
  if (value === 'none') {
    return 'None';
  }
  return value
    .split('-')
    .map((word) => {
      const first = word.charAt(0);
      return first ? first.toUpperCase() + word.slice(1) : word;
    })
    .join(' ');
};

const toOptions = <T extends string>(values: readonly T[]): SelectOption<T>[] =>
  values.map((value) => ({ value, label: prettify(value) }));

const parseLocales = (input: string): string[] =>
  input
    .split(/[\s,]+/)
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

/**
 * Prompt Layer: collects a full {@link ProjectSpec} interactively. Any field supplied in
 * `presets` (from a CLI flag) skips its prompt; every other field is asked, pre-selected
 * from `base` (`ARCHITECTURE.md` §11).
 */
export async function runWizard(
  prompter: Prompter,
  base: ProjectSpec,
  presets: Partial<ProjectSpec>,
): Promise<ProjectSpec> {
  const select = async <T extends string>(
    preset: T | undefined,
    message: string,
    values: readonly T[],
    initialValue: T,
  ): Promise<T> => {
    if (preset !== undefined) {
      return preset;
    }
    return prompter.select<T>({ message, options: toOptions(values), initialValue });
  };

  const confirm = async (
    preset: boolean | undefined,
    message: string,
    initialValue: boolean,
  ): Promise<boolean> => {
    if (preset !== undefined) {
      return preset;
    }
    return prompter.confirm({ message, initialValue });
  };

  const name =
    presets.name ??
    (await prompter.text({
      message: 'Project name',
      placeholder: 'my-app',
      defaultValue: base.name,
      validate: (value) =>
        projectNameSchema.safeParse(value).success
          ? undefined
          : 'Use lowercase letters, digits, and hyphens (e.g. "law-firm").',
    }));

  const projectType = await select(
    presets.projectType,
    'Project type',
    PROJECT_TYPES,
    base.projectType,
  );
  const framework = await select(presets.framework, 'Framework', FRAMEWORKS, base.framework);
  const language = await select(presets.language, 'Language', LANGUAGES, base.language);
  const packageManager = await select(
    presets.packageManager,
    'Package manager',
    PACKAGE_MANAGERS,
    base.packageManager,
  );
  const styling = await select(presets.styling, 'Styling', STYLING, base.styling);
  const uiLibrary = await select(presets.uiLibrary, 'UI library', UI_LIBRARIES, base.uiLibrary);
  const animation = await select(presets.animation, 'Animation', ANIMATION, base.animation);
  const database = await select(presets.database, 'Database', DATABASES, base.database);
  const orm = await select(presets.orm, 'ORM', ORMS, base.orm);
  const authentication = await select(
    presets.authentication,
    'Authentication',
    AUTH,
    base.authentication,
  );
  const cms = await select(presets.cms, 'CMS', CMS, base.cms);
  const deploymentTarget = await select(
    presets.deploymentTarget,
    'Deployment target',
    DEPLOYMENT_TARGETS,
    base.deploymentTarget,
  );

  const adminPanel = await confirm(presets.adminPanel, 'Include an admin panel?', base.adminPanel);
  const blog = await confirm(presets.blog, 'Include a blog?', base.blog);
  const commerce = await confirm(presets.commerce, 'Include commerce?', base.commerce);
  const docker = presets.docker ?? true;

  const country =
    presets.country ??
    (await prompter.text({
      message: 'Country',
      placeholder: 'Hungary',
      defaultValue: base.country,
    }));
  const primaryLanguage =
    presets.primaryLanguage ??
    (await prompter.text({
      message: 'Primary language (locale)',
      placeholder: 'en',
      defaultValue: base.primaryLanguage,
    }));
  const additionalLanguages = presets.additionalLanguages
    ? [...presets.additionalLanguages]
    : parseLocales(
        await prompter.text({
          message: 'Additional languages (comma-separated, optional)',
          placeholder: 'hu, de',
          defaultValue: base.additionalLanguages.join(', '),
        }),
      );

  const generateLegalPages = await confirm(
    presets.generateLegalPages,
    'Generate legal pages?',
    base.generateLegalPages,
  );
  const generateAiSeo = await confirm(
    presets.generateAiSeo,
    'Generate AI-SEO files?',
    base.generateAiSeo,
  );
  const generateGithubActions = await confirm(
    presets.generateGithubActions,
    'Generate GitHub Actions workflow?',
    base.generateGithubActions,
  );
  const initGit = await confirm(presets.initGit, 'Initialize a git repository?', base.initGit);

  return {
    name,
    projectType,
    framework,
    language,
    packageManager,
    styling,
    uiLibrary,
    animation,
    database,
    orm,
    authentication,
    adminPanel,
    cms,
    blog,
    commerce,
    docker,
    deploymentTarget,
    country,
    primaryLanguage,
    additionalLanguages,
    generateLegalPages,
    generateAiSeo,
    generateGithubActions,
    initGit,
  };
}
