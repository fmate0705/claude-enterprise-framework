import { dirname, resolve } from 'node:path';
import { isErr, ok } from '@cef/core';
import type { CefError, Result } from '@cef/core';
import { NodeFileSystem } from '../../adapters.js';
import type { Command, CommandDefinition, CommandInput, CommandOutput } from '../command.js';
import { intelligenceRoot } from '../intelligence/assembler.js';
import { generateBlueprint, renderBlueprintRoadmap } from '../intelligence/index.js';
import { loadClaudeContext, projectRoot } from './support.js';

/**
 * `cef roadmap` — display the milestone roadmap from the Claude context; `cef roadmap generate`
 * derives an implementation roadmap from the intelligence blueprint and writes it to
 * `.cef/generated/roadmap.md`. `--write` persists the displayed roadmap to `.cef/roadmap.md`.
 */
export class RoadmapCommand implements Command {
  readonly definition: CommandDefinition = {
    name: 'roadmap',
    description: 'Display the roadmap, or "generate" one from the blueprint.',
    arguments: [{ name: '[action]', description: 'generate (default: show)' }],
    options: [
      { flags: '--dir <path>', description: 'project directory (default: current directory)' },
      { flags: '--write', description: 'also write .cef/roadmap.md (show mode)' },
    ],
  };

  async execute(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    if (input.args[0] === 'generate') {
      return this.generate(input);
    }
    return this.show(input);
  }

  private async show(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await loadClaudeContext(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const { engine, roadmap } = loaded.value;
    const rendered = engine.renderRoadmap(roadmap);

    if (input.options['write'] === true) {
      const fs = new NodeFileSystem();
      const outputPath = resolve(projectRoot(input), rendered.path);
      await fs.mkdir(dirname(outputPath));
      await fs.writeFile(outputPath, rendered.content);
    }

    return ok({ message: rendered.content });
  }

  private async generate(input: CommandInput): Promise<Result<CommandOutput, CefError>> {
    const loaded = await generateBlueprint(input);
    if (isErr(loaded)) {
      return loaded;
    }
    const content = renderBlueprintRoadmap(loaded.value.blueprint);
    const path = '.cef/generated/roadmap.md';
    const fs = new NodeFileSystem();
    const outputPath = resolve(intelligenceRoot(input), path);
    await fs.mkdir(dirname(outputPath));
    await fs.writeFile(outputPath, content);
    return ok({ message: `✔ Generated ${path} from the blueprint.` });
  }
}
