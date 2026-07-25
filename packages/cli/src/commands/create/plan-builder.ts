import type { GeneratedFile, GenerationPlan } from '@cef/core';
import type { TemplateContext } from './context.js';
import * as templates from './templates/index.js';

/** The base directory skeleton every CEF project receives. */
const BASE_DIRECTORIES = [
  'app',
  'components',
  'features',
  'lib',
  'hooks',
  'types',
  'styles',
  'public',
  'content',
  'docs',
  'tests',
  'scripts',
  'docker',
  '.claude',
  '.cef',
] as const;

/**
 * Builder that assembles a {@link GenerationPlan} from a spec and the template layer
 * (`ARCHITECTURE.md` §11). Pure: it computes the plan without touching disk, so it is
 * inspectable (`--dry-run`) and testable.
 */
export class PlanBuilder {
  private readonly directories = new Set<string>(BASE_DIRECTORIES);
  private readonly files: GeneratedFile[] = [];

  constructor(
    private readonly root: string,
    private readonly ctx: TemplateContext,
  ) {}

  build(): GenerationPlan {
    // Root configuration.
    this.add('package.json', templates.packageJson(this.ctx));
    this.add('tsconfig.json', templates.tsconfigJson());
    this.add('eslint.config.js', templates.eslintConfig());
    this.add('.prettierrc', templates.prettierRc());
    this.add('.editorconfig', templates.editorConfig());
    this.add('.gitignore', templates.gitignore());

    // Documentation for humans and Claude Code.
    this.add('CLAUDE.md', templates.claudeMd(this.ctx));
    this.add('README.md', templates.readmeMd(this.ctx));

    // Docker — always generated (PORT 3000).
    this.add('Dockerfile', templates.dockerfile(this.ctx));
    this.add('docker-compose.yml', templates.dockerCompose(this.ctx));
    this.add('.env', templates.envFile(this.ctx));
    this.add('.env.example', templates.envExample(this.ctx));

    // CEF metadata (manifest is added last — it lists every generated file).
    this.add('.cef/project.json', templates.projectJson(this.ctx));
    this.add('.cef/runtime.json', templates.runtimeJson(this.ctx));
    this.add('.cef/memory.md', templates.memoryMd(this.ctx));

    if (this.ctx.spec.generateLegalPages) {
      for (const file of templates.legalFiles(this.ctx)) {
        this.addFile(file);
      }
    }
    if (this.ctx.spec.generateAiSeo) {
      for (const file of templates.seoFiles(this.ctx)) {
        this.addFile(file);
      }
    }
    if (this.ctx.spec.generateGithubActions) {
      this.addFile(templates.githubActions(this.ctx));
      this.directories.add('.github/workflows');
    }

    this.ensureGitkeeps();

    const generatedPaths = this.files
      .filter((file) => !file.path.endsWith('.gitkeep'))
      .map((file) => file.path)
      .concat('.cef/manifest.yaml');
    this.add('.cef/manifest.yaml', templates.manifestYaml(this.ctx, generatedPaths));

    return {
      root: this.root,
      directories: [...this.directories].sort(),
      files: this.files,
      initGit: this.ctx.spec.initGit,
    };
  }

  private add(path: string, content: string): void {
    this.files.push({ path, content });
  }

  private addFile(file: GeneratedFile): void {
    this.files.push(file);
  }

  /** Adds a `.gitkeep` to any skeleton directory that would otherwise be empty. */
  private ensureGitkeeps(): void {
    const dirsWithFiles = new Set<string>();
    for (const file of this.files) {
      const slash = file.path.lastIndexOf('/');
      if (slash > 0) {
        dirsWithFiles.add(file.path.slice(0, slash));
      }
    }
    for (const dir of this.directories) {
      const populated = [...dirsWithFiles].some(
        (withFile) => withFile === dir || withFile.startsWith(`${dir}/`),
      );
      if (!populated) {
        this.add(`${dir}/.gitkeep`, '');
      }
    }
  }
}
